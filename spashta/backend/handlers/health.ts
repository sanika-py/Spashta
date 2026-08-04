import { getStore } from '@backend/data/store'
import { handle, json } from '@backend/lib/http'
import { verifyAuditChain } from '@backend/services/audit-service'

/** GET /api/health — liveness plus a quick integrity read on the audit chain. */
export const healthHandler = handle(() => {
  const store = getStore()

  return json({
    status: 'ok',
    service: 'spashta-backend',
    store: 'in-memory',
    counts: {
      decisions: store.decisions.size,
      explanations: store.explanations.size,
      auditEntries: store.audit.length,
    },
    auditIntegrity: verifyAuditChain().valid,
    checkedAt: new Date().toISOString(),
  })
})
