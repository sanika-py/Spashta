import type { AuditAction } from '@backend/domain/types'
import { badRequest, handle, json } from '@backend/lib/http'
import { parseLimit } from '@backend/lib/validation'
import { AUDIT_ACTIONS, listAuditEntries, verifyAuditChain } from '@backend/services/audit-service'

/** GET /api/audit-log — newest first, filterable by decision or action. */
export const listAuditHandler = handle((request: Request) => {
  const url = new URL(request.url)
  const rawAction = url.searchParams.get('action')

  if (rawAction !== null && !AUDIT_ACTIONS.includes(rawAction as AuditAction)) {
    throw badRequest(`"action" must be one of: ${AUDIT_ACTIONS.join(', ')}.`)
  }

  const entries = listAuditEntries({
    decisionId: url.searchParams.get('decisionId') ?? undefined,
    action: (rawAction as AuditAction | null) ?? undefined,
    limit: parseLimit(url.searchParams.get('limit'), 50, 200),
  })

  return json({ data: entries, count: entries.length, integrity: verifyAuditChain() })
})
