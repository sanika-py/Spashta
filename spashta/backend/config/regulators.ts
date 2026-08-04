import type { RegulatorBody } from '@backend/domain/types'

export const REGULATOR_BODIES = ['RBI', 'SEBI', 'IRDAI'] as const satisfies readonly RegulatorBody[]

export interface RegulatorRequirement {
  id: string
  clause: string
  requirement: string
}

/**
 * Clause-level requirements each generated explanation is checked against.
 * Clause references are illustrative and should be reviewed by counsel before
 * being relied on in production.
 */
export const regulatorRequirements: Record<RegulatorBody, RegulatorRequirement[]> = {
  RBI: [
    {
      id: 'rbi.reason_disclosed',
      clause: 'RBI Model Risk Management — adverse action disclosure',
      requirement: 'An adverse outcome must be accompanied by a written reason for the borrower.',
    },
    {
      id: 'rbi.model_documented',
      clause: 'RBI Model Risk Management — model documentation',
      requirement: 'The model identifier and version behind the decision must be recorded.',
    },
    {
      id: 'rbi.language_accessible',
      clause: 'RBI Fair Practices Code — customer communication',
      requirement: 'The reason must be given in a language the customer understands.',
    },
  ],
  SEBI: [
    {
      id: 'sebi.ai_disclosed',
      clause: 'SEBI AI/ML governance — disclosure of automated use',
      requirement: 'Use of an automated model in the decision must be disclosed.',
    },
    {
      id: 'sebi.log_retained',
      clause: 'SEBI AI/ML governance — decision log retention',
      requirement: 'A retrievable log entry must exist for every automated decision.',
    },
    {
      id: 'sebi.accountable_owner',
      clause: 'SEBI AI/ML governance — accountability',
      requirement: 'An accountable internal owner must be attached to the decision.',
    },
  ],
  IRDAI: [
    {
      id: 'irdai.written_reason',
      clause: 'IRDAI claims guidance — repudiation reasoning',
      requirement: 'Repudiation or loading requires an intelligible written reason.',
    },
    {
      id: 'irdai.policyholder_notified',
      clause: 'IRDAI claims guidance — policyholder communication',
      requirement: 'The reason must be communicated to the policyholder, not just filed.',
    },
    {
      id: 'irdai.grievance_route',
      clause: 'IRDAI grievance redressal',
      requirement: 'The communication must state how to escalate or appeal.',
    },
  ],
}
