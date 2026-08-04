import { createHash, randomUUID } from 'node:crypto'
import { seedDecisions } from '@backend/data/seed'
import type { AuditEntry, Decision, Explanation } from '@backend/domain/types'

/**
 * Process-local mock store. Deliberately swappable: every service talks to this
 * module rather than to a client, so moving to Postgres means reimplementing
 * this file only.
 *
 * Because this lives in memory, writes reset on redeploy and are not shared
 * across serverless instances.
 */
interface Store {
  decisions: Map<string, Decision>
  explanations: Map<string, Explanation>
  audit: AuditEntry[]
}

const globalRef = globalThis as typeof globalThis & { __spashtaStore?: Store }

function createStore(): Store {
  const store: Store = {
    decisions: new Map(),
    explanations: new Map(),
    audit: [],
  }

  for (const decision of seedDecisions) {
    store.decisions.set(decision.id, decision)
    store.audit.push(
      buildAuditEntry(store, {
        decisionId: decision.id,
        action: 'decision.recorded',
        actor: 'system:seed',
        detail: `${decision.domain} decision recorded with outcome ${decision.outcome}.`,
        at: decision.createdAt,
      }),
    )
  }

  return store
}

export function getStore(): Store {
  if (!globalRef.__spashtaStore) {
    globalRef.__spashtaStore = createStore()
  }
  return globalRef.__spashtaStore
}

export const newId = (prefix: string) => `${prefix}_${randomUUID().replace(/-/g, '').slice(0, 12)}`

/** Chains each audit entry to the previous one so tampering is detectable. */
export function buildAuditEntry(
  store: Store,
  input: {
    decisionId: string
    action: AuditEntry['action']
    actor: string
    detail: string
    at?: string
  },
): AuditEntry {
  const previousHash = store.audit.at(-1)?.hash ?? null
  const at = input.at ?? new Date().toISOString()
  const id = newId('aud')
  const hash = createHash('sha256')
    .update([previousHash ?? 'genesis', id, input.decisionId, input.action, input.actor, at].join('|'))
    .digest('hex')

  return {
    id,
    decisionId: input.decisionId,
    action: input.action,
    actor: input.actor,
    at,
    hash,
    previousHash,
    detail: input.detail,
  }
}
