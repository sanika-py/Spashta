import { handle, json, readJson } from '@backend/lib/http'
import { parseDecisionInput } from '@backend/services/decision-service'
import { composeExplanation, generateForDecision, getExplanation } from '@backend/services/explanation-service'
import { getDecision } from '@backend/services/decision-service'
import { appendAuditEntry } from '@backend/services/audit-service'
import { requireString } from '@backend/lib/validation'

/**
 * POST /api/explanations — generate an explanation.
 *
 * Two shapes are accepted:
 *  - `{ decisionId }` regenerates for a stored decision (audited).
 *  - a full decision payload runs a dry preview without persisting anything.
 */
export const createExplanationHandler = handle(async (request: Request) => {
  const body = await readJson(request)

  if (typeof body.decisionId === 'string') {
    const decision = getDecision(requireString(body, 'decisionId', { maxLength: 64 }))
    return json({ data: generateForDecision(decision), persisted: true }, 201)
  }

  const input = parseDecisionInput(body)
  const preview = composeExplanation('preview', input)
  return json({ data: preview, persisted: false })
})

/** GET /api/explanations/[id] */
export const getExplanationHandler = handle((_request: Request, id: string) => {
  return json({ data: getExplanation(id) })
})

/** POST /api/explanations/[id]/deliver — records that the customer was actually told. */
export const deliverExplanationHandler = handle(async (request: Request, id: string) => {
  const explanation = getExplanation(id)
  const body = await readJson(request)
  const channel = requireString(body, 'channel', { maxLength: 24 })
  const entry = appendAuditEntry({
    decisionId: explanation.decisionId,
    action: 'explanation.delivered',
    actor: requireString(body, 'actor', { maxLength: 80 }),
    detail: `Explanation ${explanation.id} delivered over ${channel} in ${explanation.language}.`,
  })

  return json({ data: entry }, 201)
})
