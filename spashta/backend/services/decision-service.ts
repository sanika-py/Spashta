import { buildAuditEntry, getStore, newId } from '@backend/data/store'
import type {
  Decision,
  DecisionDomain,
  DecisionInput,
  DecisionOutcome,
  FeatureAttribution,
} from '@backend/domain/types'
import { badRequest, notFound } from '@backend/lib/http'
import { requireArray, requireEnum, requireNumberInRange, requireString } from '@backend/lib/validation'
import { LANGUAGE_CODES } from '@backend/config/languages'
import { REGULATOR_BODIES } from '@backend/config/regulators'

export const DECISION_DOMAINS = [
  'onboarding',
  'credit',
  'fraud',
  'claims',
] as const satisfies readonly DecisionDomain[]

export const DECISION_OUTCOMES = [
  'approved',
  'rejected',
  'manual_review',
  'flagged',
] as const satisfies readonly DecisionOutcome[]

function parseAttributions(raw: unknown[]): FeatureAttribution[] {
  return raw.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
      throw badRequest(`attributions[${index}] must be an object.`)
    }
    const item = entry as Record<string, unknown>
    const contribution = item.contribution

    if (typeof contribution !== 'number' || !Number.isFinite(contribution)) {
      throw badRequest(`attributions[${index}].contribution must be a number.`)
    }
    if (contribution < -1 || contribution > 1) {
      throw badRequest(`attributions[${index}].contribution must be between -1 and 1.`)
    }

    const value = item.value
    if (value !== undefined && typeof value !== 'string' && typeof value !== 'number') {
      throw badRequest(`attributions[${index}].value must be a string or number.`)
    }

    return {
      feature: requireString(item, 'feature', { maxLength: 80 }),
      label: requireString(item, 'label', { maxLength: 160 }),
      contribution,
      value,
    }
  })
}

/** Validates an untrusted request body into a DecisionInput. */
export function parseDecisionInput(body: Record<string, unknown>): DecisionInput {
  return {
    domain: requireEnum(body, 'domain', DECISION_DOMAINS),
    outcome: requireEnum(body, 'outcome', DECISION_OUTCOMES),
    score: requireNumberInRange(body, 'score', 0, 1),
    modelId: requireString(body, 'modelId', { maxLength: 80 }),
    modelVersion: requireString(body, 'modelVersion', { maxLength: 40 }),
    attributions: parseAttributions(requireArray(body, 'attributions', { min: 1, max: 40 })),
    language: requireEnum(body, 'language', LANGUAGE_CODES),
    regulator: requireEnum(body, 'regulator', REGULATOR_BODIES),
    subjectRef: requireString(body, 'subjectRef', { maxLength: 64 }),
  }
}

export interface ListDecisionsQuery {
  domain?: DecisionDomain
  outcome?: DecisionOutcome
  limit: number
}

export function listDecisions(query: ListDecisionsQuery): Decision[] {
  return [...getStore().decisions.values()]
    .filter((decision) => !query.domain || decision.domain === query.domain)
    .filter((decision) => !query.outcome || decision.outcome === query.outcome)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, query.limit)
}

export function getDecision(id: string): Decision {
  const decision = getStore().decisions.get(id)
  if (!decision) throw notFound(`No decision found with id "${id}".`)
  return decision
}

export function recordDecision(input: DecisionInput, actor = 'system:api'): Decision {
  const store = getStore()
  const decision: Decision = {
    id: newId('dec'),
    createdAt: new Date().toISOString(),
    domain: input.domain,
    outcome: input.outcome,
    score: input.score,
    modelId: input.modelId,
    modelVersion: input.modelVersion,
    subjectRef: input.subjectRef,
    language: input.language,
    regulator: input.regulator,
    attributions: input.attributions,
    explanationId: null,
  }

  store.decisions.set(decision.id, decision)
  store.audit.push(
    buildAuditEntry(store, {
      decisionId: decision.id,
      action: 'decision.recorded',
      actor,
      detail: `${decision.domain} decision recorded with outcome ${decision.outcome}.`,
    }),
  )

  return decision
}
