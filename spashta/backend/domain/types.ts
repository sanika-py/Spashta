/**
 * Core Spashta domain vocabulary.
 * Shared by services, handlers and (via `@backend/*`) the frontend.
 */

export type RegulatorBody = 'RBI' | 'SEBI' | 'IRDAI'

export type DecisionDomain = 'onboarding' | 'credit' | 'fraud' | 'claims'

export type DecisionOutcome = 'approved' | 'rejected' | 'manual_review' | 'flagged'

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'bn'
  | 'mr'
  | 'te'
  | 'kn'
  | 'gu'
  | 'pa'
  | 'ml'

export interface Language {
  code: LanguageCode
  /** Name in the language itself, e.g. हिन्दी */
  endonym: string
  /** English name, e.g. Hindi */
  englishName: string
  script: string
  /** Whether plain-language generation is live or still in pilot. */
  status: 'live' | 'pilot'
}

/** A single SHAP-style feature attribution coming out of the customer's model. */
export interface FeatureAttribution {
  /** Machine-readable feature key, e.g. `dpd_last_12m`. */
  feature: string
  /** Human label used when writing the explanation. */
  label: string
  /** Signed contribution to the score. Negative pushes toward rejection. */
  contribution: number
  /** Optional observed value, rendered into the explanation when present. */
  value?: string | number
}

export interface DecisionInput {
  domain: DecisionDomain
  outcome: DecisionOutcome
  /** Model score, normalised 0–1. */
  score: number
  modelId: string
  modelVersion: string
  attributions: FeatureAttribution[]
  language: LanguageCode
  regulator: RegulatorBody
  /** Pseudonymous customer reference. Never a raw PAN/Aadhaar. */
  subjectRef: string
}

export interface ExplanationReason {
  label: string
  /** Plain-language sentence for the customer. */
  text: string
  /** Direction the factor pushed the decision. */
  direction: 'positive' | 'negative'
  weight: number
}

export interface ComplianceCheck {
  id: string
  requirement: string
  clause: string
  passed: boolean
  note?: string
}

export interface Explanation {
  id: string
  decisionId: string
  language: LanguageCode
  headline: string
  summary: string
  reasons: ExplanationReason[]
  nextSteps: string[]
  /** 0–1 confidence that the explanation faithfully reflects the attributions. */
  fidelity: number
  regulator: RegulatorBody
  checks: ComplianceCheck[]
  generatedAt: string
}

export interface Decision {
  id: string
  createdAt: string
  domain: DecisionDomain
  outcome: DecisionOutcome
  score: number
  modelId: string
  modelVersion: string
  subjectRef: string
  language: LanguageCode
  regulator: RegulatorBody
  attributions: FeatureAttribution[]
  explanationId: string | null
}

export type AuditAction =
  | 'decision.recorded'
  | 'explanation.generated'
  | 'explanation.delivered'
  | 'explanation.reviewed'

export interface AuditEntry {
  id: string
  decisionId: string
  action: AuditAction
  actor: string
  at: string
  /** Hash chaining the entry to the previous one, making the log tamper-evident. */
  hash: string
  previousHash: string | null
  detail: string
}
