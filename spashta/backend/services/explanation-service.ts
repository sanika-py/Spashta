import { phrasebook } from '@backend/config/languages'
import { regulatorRequirements } from '@backend/config/regulators'
import { buildAuditEntry, getStore, newId } from '@backend/data/store'
import type {
  ComplianceCheck,
  Decision,
  DecisionInput,
  Explanation,
  ExplanationReason,
  FeatureAttribution,
} from '@backend/domain/types'
import { notFound } from '@backend/lib/http'

const MAX_REASONS = 3

/**
 * Ranks attributions by absolute contribution and turns the top few into
 * plain-language reasons.
 *
 * This is the deterministic template stage. In production an LLM pass runs on
 * top of these frames for fluency, but the frames stay the source of truth so
 * the output can never contradict the attributions.
 */
function toReasons(
  attributions: FeatureAttribution[],
  language: DecisionInput['language'],
): ExplanationReason[] {
  const phrases = phrasebook[language]

  return [...attributions]
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, MAX_REASONS)
    .map((attribution) => {
      const direction = attribution.contribution >= 0 ? 'positive' : 'negative'
      const observed = attribution.value === undefined ? '' : ` (${attribution.value})`
      const verdict = direction === 'positive' ? phrases.helped : phrases.hurt

      return {
        label: attribution.label,
        text: `${attribution.label}${observed} — ${verdict}.`,
        direction,
        weight: Number(Math.abs(attribution.contribution).toFixed(3)),
      }
    })
}

function toNextSteps(decision: DecisionInput): string[] {
  switch (decision.outcome) {
    case 'rejected':
      return [
        'Ask for a free copy of the factors used in this decision.',
        'Re-apply once the main factor above has changed.',
        'Escalate to the grievance officer if you believe a factor is wrong.',
      ]
    case 'manual_review':
      return [
        'Upload a clearer copy of the document that did not match.',
        'A reviewer will respond within 2 working days.',
      ]
    case 'flagged':
      return [
        'Confirm the transfer from your registered device to release the hold.',
        'Call the helpline immediately if you did not start this transfer.',
      ]
    case 'approved':
      return ['No action needed. Your sanction letter has been sent.']
  }
}

/** Runs the generated explanation against the clause checklist for its regulator. */
function runChecks(
  decision: DecisionInput,
  reasons: ExplanationReason[],
  summary: string,
): ComplianceCheck[] {
  const requirements = regulatorRequirements[decision.regulator]

  return requirements.map((requirement) => {
    let passed = true
    let note: string | undefined

    switch (requirement.id) {
      case 'rbi.reason_disclosed':
      case 'irdai.written_reason':
        passed = reasons.length > 0 && summary.trim().length > 0
        if (!passed) note = 'No reason could be derived from the supplied attributions.'
        break
      case 'rbi.model_documented':
      case 'sebi.ai_disclosed':
        passed = Boolean(decision.modelId && decision.modelVersion)
        if (!passed) note = 'Model identifier or version missing.'
        break
      case 'rbi.language_accessible':
        passed = decision.language in phrasebook
        if (!passed) note = 'Requested language is not supported yet.'
        break
      default:
        passed = true
    }

    return {
      id: requirement.id,
      requirement: requirement.requirement,
      clause: requirement.clause,
      passed,
      note,
    }
  })
}

/**
 * How much of the model's total attributed weight the explanation actually
 * surfaces — a proxy for faithfulness that a reviewer can sanity-check.
 */
function computeFidelity(
  attributions: FeatureAttribution[],
  reasons: ExplanationReason[],
): number {
  const total = attributions.reduce((sum, item) => sum + Math.abs(item.contribution), 0)
  if (total === 0) return 0
  const covered = reasons.reduce((sum, reason) => sum + reason.weight, 0)
  return Number(Math.min(covered / total, 1).toFixed(3))
}

export function composeExplanation(decisionId: string, input: DecisionInput): Explanation {
  const phrases = phrasebook[input.language]
  const reasons = toReasons(input.attributions, input.language)
  const headline = phrases[input.outcome]
  const summary = `${headline} ${phrases.because} ${reasons.map((r) => r.text).join(' ')}`.trim()

  return {
    id: newId('exp'),
    decisionId,
    language: input.language,
    headline,
    summary,
    reasons,
    nextSteps: toNextSteps(input),
    fidelity: computeFidelity(input.attributions, reasons),
    regulator: input.regulator,
    checks: runChecks(input, reasons, summary),
    generatedAt: new Date().toISOString(),
  }
}

/** Generates and persists an explanation for an already-recorded decision. */
export function generateForDecision(decision: Decision, actor = 'system:api'): Explanation {
  const store = getStore()
  const explanation = composeExplanation(decision.id, {
    domain: decision.domain,
    outcome: decision.outcome,
    score: decision.score,
    modelId: decision.modelId,
    modelVersion: decision.modelVersion,
    attributions: decision.attributions,
    language: decision.language,
    regulator: decision.regulator,
    subjectRef: decision.subjectRef,
  })

  store.explanations.set(explanation.id, explanation)
  store.decisions.set(decision.id, { ...decision, explanationId: explanation.id })
  store.audit.push(
    buildAuditEntry(store, {
      decisionId: decision.id,
      action: 'explanation.generated',
      actor,
      detail: `Explanation ${explanation.id} generated in ${explanation.language} with fidelity ${explanation.fidelity}.`,
    }),
  )

  return explanation
}

export function getExplanation(id: string): Explanation {
  const explanation = getStore().explanations.get(id)
  if (!explanation) throw notFound(`No explanation found with id "${id}".`)
  return explanation
}

export function getExplanationForDecision(decisionId: string): Explanation | null {
  return (
    [...getStore().explanations.values()].find(
      (explanation) => explanation.decisionId === decisionId,
    ) ?? null
  )
}
