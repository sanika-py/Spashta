import { createHash } from 'node:crypto'
import { buildAuditEntry, getStore } from '@backend/data/store'
import type { AuditAction, AuditEntry } from '@backend/domain/types'

export const AUDIT_ACTIONS = [
  'decision.recorded',
  'explanation.generated',
  'explanation.delivered',
  'explanation.reviewed',
] as const satisfies readonly AuditAction[]

export interface ListAuditQuery {
  decisionId?: string
  action?: AuditAction
  limit: number
}

export function listAuditEntries(query: ListAuditQuery): AuditEntry[] {
  return getStore()
    .audit.filter((entry) => !query.decisionId || entry.decisionId === query.decisionId)
    .filter((entry) => !query.action || entry.action === query.action)
    .slice()
    .reverse()
    .slice(0, query.limit)
}

export function appendAuditEntry(input: {
  decisionId: string
  action: AuditAction
  actor: string
  detail: string
}): AuditEntry {
  const store = getStore()
  const entry = buildAuditEntry(store, input)
  store.audit.push(entry)
  return entry
}

/**
 * Recomputes the hash chain to prove no entry was edited or removed.
 * This is what an auditor runs before trusting an export.
 */
export function verifyAuditChain(): {
  valid: boolean
  entries: number
  brokenAt: string | null
} {
  const entries = getStore().audit
  let previousHash: string | null = null

  for (const entry of entries) {
    const expected = createHash('sha256')
      .update(
        [previousHash ?? 'genesis', entry.id, entry.decisionId, entry.action, entry.actor, entry.at].join(
          '|',
        ),
      )
      .digest('hex')

    if (entry.previousHash !== previousHash || entry.hash !== expected) {
      return { valid: false, entries: entries.length, brokenAt: entry.id }
    }
    previousHash = entry.hash
  }

  return { valid: true, entries: entries.length, brokenAt: null }
}
