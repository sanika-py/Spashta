# Spashta

# Spashta

**Spashta** ("clear" / "explicit" in Hindi) turns opaque model decisions — loan
approvals, KYC/onboarding checks, fraud flags, insurance claims — into short,
plain-language explanations in the customer's own language, checked against
Indian regulatory requirements (RBI, SEBI, IRDAI) and written to a
tamper-evident audit log.

It ships as a single Next.js app: a marketing/product site plus a JSON API
backend that takes a model's decision and SHAP-style feature attributions and
produces a customer-facing explanation, a compliance checklist, and an
auditable record — without retraining or replacing the underlying model.

## Why

- Indian regulators (RBI, SEBI, IRDAI) increasingly require lenders, brokers,
  and insurers to give customers an intelligible, written reason for adverse
  automated decisions — not just a score.
- Most explainability tooling stops at English, model-level reporting. Spashta
  works per-decision, in **10 Indian languages**, and maps each explanation to
  the specific regulatory clause it satisfies.
- Every decision, explanation, and delivery event is written to a hash-chained
  audit log so an auditor can verify nothing was edited or deleted after the
  fact.

## How it works

1. **Bring your model.** Keep whatever scorecard, GBM, or neural net is
   already in production — no retraining required.
2. **Feed in per-decision SHAP-style attributions.** Feature-level
   contributions computed at inference time.
3. **Plain-language generation.** A deterministic phrase-frame stage turns the
   top attributions into a short, non-technical explanation in the customer's
   language (the frames are the source of truth, so output can never
   contradict the underlying attributions; an LLM fluency pass sits on top of
   this in production).
4. **Compliance check + audit log.** The explanation is checked against the
   regulator's clause checklist (RBI / SEBI / IRDAI) and every step — decision
   recorded, explanation generated, explanation delivered — is appended to an
   immutable, hash-chained audit trail.

## Project structure

```
.
├── frontend/                  Next.js app (marketing site + API routes)
│   ├── app/
│   │   ├── page.tsx            Marketing homepage
│   │   ├── platform/page.tsx   Product/platform page
│   │   └── api/health/route.ts Only wired API route so far (see below)
│   ├── components/             Site sections (hero, how-it-works, use-cases, ui/*)
│   └── lib/site-data.ts        Copy/content for the marketing site
│
└── backend/                   Framework-agnostic domain logic, imported via
                                the `@backend/*` path alias
    ├── domain/types.ts         Core types: Decision, Explanation, AuditEntry, etc.
    ├── config/
    │   ├── languages.ts         10 supported languages + the phrasebook used
    │   │                        to compose explanations
    │   └── regulators.ts        RBI / SEBI / IRDAI clause-level requirements
    ├── data/
    │   ├── store.ts             In-memory, process-local data store
    │   │                        (swap this file out to back onto Postgres etc.)
    │   └── seed.ts               Illustrative seed decisions
    ├── services/
    │   ├── decision-service.ts    Validate + record decisions
    │   ├── explanation-service.ts Compose explanations, run compliance checks,
    │   │                          score fidelity
    │   ├── audit-service.ts       Append + verify the hash-chained audit log
    │   └── language-service.ts    Language lookup / Accept-Language resolution
    ├── handlers/                 Thin HTTP handlers (decisions, explanations,
    │                             languages, audit, health) — return
    │                             `Response` objects, framework-agnostic
    └── lib/                      Shared HTTP + validation helpers
```

## API

Only `GET /api/health` is currently wired up as a Next.js route
(`frontend/app/api/health/route.ts`). The rest of the handlers in
`backend/handlers/` are implemented and ready to mount as routes — wire each
one up under `frontend/app/api/<path>/route.ts` and export the corresponding
handler:

| Method | Path                              | Handler                        | Description |
|--------|------------------------------------|---------------------------------|-------------|
| GET    | `/api/health`                     | `healthHandler`                | Liveness + store counts + audit chain integrity |
| GET    | `/api/decisions`                  | `listDecisionsHandler`         | List decisions, filterable by `domain`, `outcome`, `limit` |
| POST   | `/api/decisions`                  | `createDecisionHandler`        | Record a decision; generates its explanation unless `explain: false` |
| GET    | `/api/decisions/:id`              | `getDecisionHandler`           | Fetch a decision plus its explanation |
| POST   | `/api/explanations`               | `createExplanationHandler`     | Regenerate for a stored `decisionId`, or dry-run a full decision payload |
| GET    | `/api/explanations/:id`           | `getExplanationHandler`        | Fetch a generated explanation |
| POST   | `/api/explanations/:id/deliver`   | `deliverExplanationHandler`    | Record that the explanation was actually communicated to the customer |
| GET    | `/api/languages`                  | `listLanguagesHandler`         | List supported languages; resolves best match from `Accept-Language` |
| GET    | `/api/audit-log`                  | `listAuditHandler`             | List audit entries, filterable by `decisionId`/`action`, with chain integrity |

### Domain model highlights

- **Decision domains:** `onboarding`, `credit`, `fraud`, `claims`
- **Outcomes:** `approved`, `rejected`, `manual_review`, `flagged`
- **Regulators:** `RBI`, `SEBI`, `IRDAI`, each mapped to its own clause-level
  checklist in `backend/config/regulators.ts`
- **Languages:** `en`, `hi`, `ta`, `bn`, `mr`, `te` (live), `kn`, `gu`, `pa`,
  `ml` (pilot) — see `backend/config/languages.ts`
- **Audit log:** each entry is SHA-256-hashed together with the previous
  entry's hash, so `verifyAuditChain()` can detect any edit, insertion, or
  deletion after the fact

> Note: `backend/data/store.ts` is an **in-memory, process-local mock store**.
> Data resets on redeploy and isn't shared across serverless instances — swap
> that one file for a real database client to persist data in production.

## Getting started

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev      # start the dev server (Next.js app in ./frontend)
```

Other scripts (defined at the repo root, targeting `./frontend`):

```bash
pnpm build    # production build
pnpm start    # start the production server
pnpm lint     # eslint
```

The app talks to the backend package via the `@backend/*` path alias
configured in `frontend/tsconfig.json`, so route handlers under
`frontend/app/api/**/route.ts` can import directly from `backend/`.

## Tech stack

- **Next.js 16** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS 4** + shadcn/ui components
- Framework-agnostic domain/service layer in `backend/`, built on the Web
  `Request`/`Response` API so it isn't tied to Next.js

## Disclaimer

The regulatory clause references in `backend/config/regulators.ts` are
illustrative and intended to demonstrate how a compliance checklist could map
to explanation output. They should be reviewed by qualified counsel before
being relied on in a production compliance workflow.
