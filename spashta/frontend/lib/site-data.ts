export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Compliance', href: '#compliance' },
  { label: 'Pricing', href: '#pricing' },
]

export const heroStats = [
  {
    value: '17%',
    label: 'YoY credit growth',
    detail: 'More automated lending decisions every quarter.',
  },
  {
    value: '8–11%',
    label: 'of health claims rejected today',
    detail: 'Almost none come with a plain-language reason.',
  },
  {
    value: '22',
    label: 'scheduled Indian languages',
    detail: 'Explanations in the language the customer reads.',
  },
  {
    value: '3 → 1',
    label: 'regulators, one explanation layer',
    detail: 'RBI, SEBI and IRDAI mapped to a single output.',
  },
]

export const useCases = [
  {
    id: 'onboarding',
    eyebrow: 'Onboarding',
    title: 'KYC and identity risk scoring, explained at signup.',
    body: 'Tell an applicant why they were routed to manual review before they abandon the funnel.',
    icon: 'onboarding' as const,
  },
  {
    id: 'credit',
    eyebrow: 'Credit',
    title: 'Loan approval and rejection reasons a customer can actually read.',
    body: 'Turn feature attributions into three sentences in Hindi, Tamil or Marathi.',
    icon: 'credit' as const,
  },
  {
    id: 'fraud',
    eyebrow: 'Fraud',
    title: 'Flag, freeze, or clear — with a reason a compliance officer can defend.',
    body: 'Every intervention carries the evidence that triggered it, in writing.',
    icon: 'fraud' as const,
  },
  {
    id: 'compliance',
    eyebrow: 'Compliance',
    title: 'Every decision logged, checklisted, and export-ready for an audit.',
    body: 'Immutable per-decision records with the regulator clause attached.',
    icon: 'compliance' as const,
  },
]

export const steps = [
  {
    number: '01',
    title: 'Your model',
    body: 'Keep the scorecard, GBM or neural net you already run in production. No retraining.',
  },
  {
    number: '02',
    title: 'SHAP explainability',
    body: 'Per-decision feature attributions computed at inference time, not sampled after the fact.',
  },
  {
    number: '03',
    title: 'Plain language',
    body: 'Claude converts attributions into a short, non-technical explanation in the customer’s language.',
  },
  {
    number: '04',
    title: 'Checklist + audit log',
    body: 'The explanation is checked against the relevant clause and written to an immutable log.',
  },
]

export const comparisonRows = [
  {
    dimension: 'Language coverage',
    global: 'English only',
    spashta: '22 scheduled Indian languages',
  },
  {
    dimension: 'Regulator mapping',
    global: 'US / EU frameworks (ECOA, GDPR)',
    spashta: 'RBI, SEBI and IRDAI clause-level mapping',
  },
  {
    dimension: 'Per-decision audit trail',
    global: 'Model-level reporting, sampled',
    spashta: 'Every single decision, immutable',
  },
  {
    dimension: 'Pricing model',
    global: 'Enterprise licence, annual floor',
    spashta: 'Per-decision, starts at pilot volume',
  },
  {
    dimension: 'Deployment',
    global: 'Vendor cloud, data leaves the country',
    spashta: 'VPC or on-prem, data stays in India',
  },
]

export const globalTools = ['Zest AI', 'FICO', 'DataRobot']

export const regulators = [
  {
    body: 'RBI',
    title: 'Model Risk Management Guidance',
    summary:
      'Lenders must document how a model reaches a decision and be able to explain adverse outcomes to the borrower.',
  },
  {
    body: 'SEBI',
    title: 'Algorithmic Trading & AI Governance',
    summary:
      'Firms deploying AI must disclose its use, retain decision logs, and remain accountable for automated outputs.',
  },
  {
    body: 'IRDAI',
    title: 'Claims & Underwriting Guidance',
    summary:
      'Repudiation and loading decisions require a written, intelligible reason communicated to the policyholder.',
  },
]

export const languages = [
  'हिन्दी — Hindi',
  'தமிழ் — Tamil',
  'বাংলা — Bengali',
  'मराठी — Marathi',
  'తెలుగు — Telugu',
  'English',
]

export const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Explanation engine', href: '#product' },
      { label: 'Audit log', href: '#compliance' },
      { label: 'Language coverage', href: '#pricing' },
      { label: 'Platform', href: '/platform' },
    ],
  },
  {
    heading: 'Compliance',
    links: [
      { label: 'RBI mapping', href: '#compliance' },
      { label: 'SEBI mapping', href: '#compliance' },
      { label: 'IRDAI mapping', href: '#compliance' },
      { label: 'Data residency', href: '#compliance' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Book a demo', href: '#demo' },
      { label: 'Contact', href: '#demo' },
    ],
  },
]
