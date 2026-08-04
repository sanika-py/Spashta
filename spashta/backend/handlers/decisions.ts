import {
  DECISION_DOMAINS,
  DECISION_OUTCOMES,
  getDecision,
  listDecisions,
  parseDecisionInput,
  recordDecision,
} from '@backend/services/decision-service'
import { generateForDecision, getExplanationForDecision } from '@backend/services/explanation-service'
import { badRequest, handle, json, readJson } from '@backend/lib/http'
import { parseLimit } from '@backend/lib/validation'
import type { DecisionDomain, DecisionOutcome } from '@backend/domain/types'

function readFilter<T extends string>(
  url: URL,
  key: string,
  allowed: readonly T[],
): T | undefined {
  const raw = url.searchParams.get(key)
  if (raw === null) return undefined
  if (!allowed.includes(raw as T)) {
    throw badRequest(`"${key}" must be one of: ${allowed.join(', ')}.`)
  }
  return raw as T
}

/** GET /api/decisions — filtered, newest first. */
export const listDecisionsHandler = handle((request: Request) => {
  const url = new URL(request.url)
  const decisions = listDecisions({
    domain: readFilter<DecisionDomain>(url, 'domain', DECISION_DOMAINS),
    outcome: readFilter<DecisionOutcome>(url, 'outcome', DECISION_OUTCOMES),
    limit: parseLimit(url.searchParams.get('limit'), 20, 100),
  })

  return json({ data: decisions, count: decisions.length })
})

/**
 * POST /api/decisions — record a decision and, unless `explain: false`,
 * immediately generate its explanation.
 */
export const createDecisionHandler = handle(async (request: Request) => {
  const body = await readJson(request)
  const shouldExplain = body.explain !== false
  const input = parseDecisionInput(body)
  const decision = recordDecision(input)
  const explanation = shouldExplain ? generateForDecision(decision) : null

  return json({ data: { decision: getDecision(decision.id), explanation } }, 201)
})

/** GET /api/decisions/[id] — the decision plus its explanation, if any. */
export const getDecisionHandler = handle((_request: Request, id: string) => {
  const decision = getDecision(id)
  return json({ data: { decision, explanation: getExplanationForDecision(id) } })
})
