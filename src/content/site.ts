import {
  Activity,
  BarChart3,
  Cloud,
  Cpu,
  FileCheck2,
  Lock,
  PhoneCall,
  Plug,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

/* Copy is sourced from saralya.in and the founder-approved corrections brief
   (see CLAUDE.md → Content sources). Keep claims to what appears there. */

export const CONTACT_EMAIL = 'vishal@saralya.in'

export type Module = {
  code: string
  tag: string
  name: string
  short: string
  body: string
  icon: LucideIcon
  color: string
  bar: string
  wash: string
  points: string[]
}

export const MODULES: Module[] = [
  {
    code: 'M1',
    tag: 'Origination',
    name: 'Saral Appraisal',
    short: 'Score and sanction in minutes.',
    body: 'Configurable BRE for SME, MSME, LAP, MFI JLG and unsecured retail. Bureau pulls, Account Aggregator, GSTN, MCA21 and CERSAI — native.',
    icon: FileCheck2,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['CIBIL · Experian · CRIF', 'AA — all 9 ReBIT FI types', 'GSTN · MCA21 · CERSAI'],
  },
  {
    code: 'M2',
    tag: 'Fraud',
    name: 'Saral Screen',
    short: 'Catch fraud before it books.',
    body: 'Real-time application and transaction fraud signals. Network analysis across applicant clusters. 21-day SCN workflow built in.',
    icon: ScanSearch,
    color: 'text-red',
    bar: 'bg-red',
    wash: 'bg-red-w',
    points: ['Real-time signals', 'Cluster network analysis', 'SBI vs. Rajesh Agarwal compliant'],
  },
  {
    code: 'M3',
    tag: 'Early warning',
    name: 'Saral Watch',
    short: 'See stress on day 1, not day 31.',
    body: 'Post-disbursement deterioration index fed by AA, GST velocity, bureau activity on other lenders and behavioural data.',
    icon: Activity,
    color: 'text-amber',
    bar: 'bg-amber',
    wash: 'bg-amber-w',
    points: ['SMA-0 tagging at day 1', 'GST velocity + AA feeds', 'Cross-lender bureau activity'],
  },
  {
    code: 'M4',
    tag: 'Collections',
    name: 'Saral Recover',
    short: 'Strategy-led, not bucket-led.',
    body: 'Bucket-strategy collections with an RPC-first dialler, a DRA-trained field officer app, skip-tracing and automated Section 138 / SARFAESI prep.',
    icon: PhoneCall,
    color: 'text-blue',
    bar: 'bg-blue',
    wash: 'bg-blue-w',
    points: ['RPC-first dialler', 'Field officer app', 'Sec 138 / SARFAESI prep'],
  },
  {
    code: 'M5',
    tag: 'Analytics',
    name: 'Saral Insight',
    short: 'Board-ready, auto-generated.',
    body: 'Vintage analysis, roll-rate dashboards, peer-cohort benchmarking and customer LTV — daily, weekly and quarterly reports without a data team.',
    icon: BarChart3,
    color: 'text-purple',
    bar: 'bg-purple',
    wash: 'bg-purple-w',
    points: ['Vintage + roll-rate', 'Peer-cohort benchmarks', 'Board packs on schedule'],
  },
  {
    code: 'M6',
    tag: 'Compliance',
    name: 'Saral Comply',
    short: 'Inspection pack in 4 clicks.',
    body: '600+ checks mapped to RBI MD-FRM, DLD 2025, KYC MD, DPDP and PMLA. CRILC, NBS-9 and DNBS returns pre-mapped. CIMS-ready.',
    icon: ShieldCheck,
    color: 'text-green',
    bar: 'bg-green',
    wash: 'bg-green-w',
    points: ['600+ mapped checks', 'CRILC · NBS-9 · DNBS', 'CIMS-ready'],
  },
]

export const INTEGRATIONS = [
  'CIBIL',
  'Experian',
  'CRIF',
  'Equifax',
  'Account Aggregator',
  'NPCI',
  'NACH',
  'UPI',
  'CIMS',
  'CERSAI',
  'CKYC',
  'GSTN',
  'MCA21',
  'FinnOne',
  'Lentra',
  'Finflux',
  'AllCloud',
]

export const PILLARS: { title: string; sub: string; icon: LucideIcon; points: string[] }[] = [
  {
    title: 'API-first & cloud-native',
    sub: 'Architecture',
    icon: Cloud,
    points: [
      'Microservices with clean REST + webhooks',
      'Multi-tenant with strict workspace isolation',
      'Indian data residency — AWS Mumbai, DR Hyderabad',
      '99.95% SLA · < 200 ms p95 latency',
    ],
  },
  {
    title: 'Banking-aware models',
    sub: 'Data & AI',
    icon: Cpu,
    points: [
      'Tuned on RBI Master Directions, IRAC norms, IBC and SARFAESI',
      'Anonymised Indian banking corpus',
      'Inference inside India — no customer data leaves your tenant',
      'Explainable risk scoring for credit officer review',
    ],
  },
  {
    title: 'Built for inspection',
    sub: 'Security',
    icon: Lock,
    points: [
      'AES-256 at rest · TLS 1.3 in transit',
      'RBAC with field-level masking and maker-checker',
      'SSO + MFA · SOC 2 Type II in progress',
      'Immutable audit log · inspection pack in 4 clicks',
    ],
  },
  {
    title: 'Plugs into what you have',
    sub: 'Integrations',
    icon: Plug,
    points: [
      'CIBIL · Experian · CRIF · Equifax',
      'Account Aggregator — all 9 ReBIT FI types',
      'NPCI · NACH · UPI · CIMS · CERSAI · CKYC · GSTN · MCA21',
      'Connectors for FinnOne, Lentra, Finflux, AllCloud and others',
    ],
  },
]

export const COMPLIANCE = [
  { tag: 'RBI alignment', title: 'MD-FRM (Jul 2024)', body: 'Fraud Risk Management Directions, including the 21-day Show-Cause Notice workflow per the SC ruling in SBI vs. Rajesh Agarwal.' },
  { tag: 'RBI alignment', title: 'DLD 2025', body: 'Digital Lending Directions. LSP contracts, DLA registration on CIMS, KFS delivery, fund-flow rules, cooling-off period.' },
  { tag: 'RBI alignment', title: '90-day NPA · Apr 2026', body: 'Base Layer NBFCs transitioning to 90-day NPA recognition. Reporting and dashboards already pre-aligned.' },
  { tag: 'Data protection', title: 'DPDP Act 2023', body: 'Notice, consent, purpose limitation and data principal rights. Workspace data isolated. Right to erasure honoured at the row level.' },
  { tag: 'Security', title: 'AES-256 · TLS 1.3', body: 'Encryption at rest and in transit. RBAC with field-level masking. Maker-checker on sensitive operations. SSO and MFA available.' },
  { tag: 'Audit', title: 'Immutable trail', body: 'Every mutation logged with actor, timestamp and before/after state. Inspection-ready in 4 clicks.' },
]

export const CONVICTIONS = [
  {
    n: '01',
    title: 'Compliance is architecture, not a feature.',
    body: 'RBI MD-FRM, DLD 2025, DPDP, the SBI vs. Rajesh Agarwal SCN ruling — these belong in the foundation. Bolting them on later is what creates inspection observations.',
  },
  {
    n: '02',
    title: 'Lending tech should be a utility, not a data centre.',
    body: 'A small bank or NBFC should not need a ₹2 Cr capex decision to get modern infrastructure. Pay per loan changes who gets to compete.',
  },
  {
    n: '03',
    title: 'Modular beats monolith for the middle layer.',
    body: 'Plug a single module into your existing core, or run the full stack. Either way, you keep your core banking, your CBS and your relationships intact.',
  },
]

export const FOUNDERS = [
  {
    initials: 'VC',
    name: 'Vikas Chaudhary',
    role: 'Co-founder & CTO',
    line: 'IIT Delhi · 24+ years in banking technology',
    body: 'Vikas has spent his career inside the engine room of Indian banking. Before Saralya, he led platform engineering at Sopra Banking, Renovite and FIS, shipping core banking systems and payment switches across 200+ Indian banks — PSU, private and cooperative.',
    points: [
      'Has personally signed off on RBI inspection responses for Tier-1 and Tier-2 deployments',
      'Architects the platform stack, integration layer and compliance backbone',
      'Knows what a payment switch does at 2 AM on the night of a public holiday',
    ],
  },
  {
    initials: 'VG',
    name: 'Vishal Gupta',
    role: 'Co-founder & CEO',
    line: 'Second-time founder · Banking + payments operator',
    body: 'Vishal previously founded OneStack, building core banking systems and payment switches for cooperative banks and NBFCs. Earlier roles at Nando’s India and Baxter Healthcare gave him the operating discipline to translate banking complexity into a product middle-layer NBFCs can actually buy.',
    points: [
      'Has written and filed RBI returns. Knows what an inspection observation costs in the next ALCO.',
      'Owns product, GTM and customer relationships',
      'Believes the next ten years of Indian credit are written outside the metros',
    ],
  },
]

/* ---------------------------------------------------------------------------
   Saral AI — the guided diagnostic on the home page. Scripted today; the
   free-text box is the seam where the model plugs in.
   --------------------------------------------------------------------------- */

/* `first` = the challenges this department feels first; they lead the list
   and `ask` is the question in their words. */
export const DEPARTMENTS = [
  { id: 'credit', label: 'Credit / Risk', ask: 'Where does a file lose the most time today?', first: ['tat', 'tabs', 'fraud'] },
  { id: 'collections', label: 'Collections', ask: 'What do you find out too late?', first: ['stress', 'field', 'mis'] },
  { id: 'tech', label: 'Tech / Product', ask: 'What are you being asked to build that you shouldn’t have to?', first: ['core', 'tabs', 'tat'] },
  { id: 'compliance', label: 'Compliance', ask: 'What would an inspector ask about first?', first: ['inspect', 'fraud', 'stress'] },
  { id: 'leadership', label: 'CEO / Leadership', ask: 'What’s between you and the next ₹100 Cr of book?', first: ['tat', 'stress', 'mis'] },
  { id: 'other', label: 'Investor / Just curious', ask: '', first: [] },
] as const
export type DeptId = (typeof DEPARTMENTS)[number]['id']

export const STAGES = ['Appraise', 'Screen', 'Watch', 'Recover', 'Report', 'Comply'] as const

/* Each challenge maps to a lifecycle stage, a module, and one vendor-neutral
   tip the visitor can act on without buying anything. */
export const CHALLENGES = [
  { id: 'tat', label: 'Turnaround is days, not minutes', stage: 0, module: 'M1', next: { to: '/home#numbers', label: 'Run your own book' }, tip: 'Decide on data first, verify later. Bureau + AA + GSTN in one pull covers most of the file; push physical checks post-sanction on small tickets.' },
  { id: 'tabs', label: 'Bureau, GST and bank data live in five tabs', stage: 0, module: 'M1', tip: 'One consent, one pull. Account Aggregator already covers all nine FI types — stop asking borrowers for PDF statements.' },
  { id: 'fraud', label: 'Fraud shows up after disbursal', stage: 1, module: 'M2', next: { to: '/demo', label: 'Watch a decision run' }, tip: 'Link applicants by phone, device, address and bank account. Most application fraud is a cluster, not a person — and build the 21-day SCN step in before you need it.' },
  { id: 'stress', label: 'Stress shows up at DPD 30, not day 1', stage: 2, module: 'M3', tip: 'Watch the bounce, not the bucket. A first failed NACH or a skipped GST filing is the earliest signal you already own.' },
  { id: 'field', label: 'Field collections are a black box', stage: 3, module: 'M4', tip: 'Log every visit with time and location, and route the day by promise-to-pay date — not by who shouted loudest.' },
  { id: 'mis', label: 'Portfolio MIS is a month-end spreadsheet', stage: 4, module: 'M5', tip: 'Cut the book by vintage, not by product. Cohorts show trouble two quarters before totals do.' },
  { id: 'inspect', label: 'Inspection prep takes weeks', stage: 5, module: 'M6', next: { to: '/home#readiness', label: 'Tick your six inspection checks' }, tip: 'Generate CRILC and NBS-9 from the ledger, never retype them. An immutable audit trail is the first thing an inspector asks for.' },
  { id: 'core', label: 'Core system won’t talk to anything', stage: 0, module: null, next: { to: '/technology', label: 'See how it plugs into your core' }, tip: 'Don’t rip out the core. Put an API layer beside it and move one product line at a time.' },
] as const
export type ChallengeId = (typeof CHALLENGES)[number]['id']

export const BOOK_SIZES = ['Under ₹100 Cr', '₹100–500 Cr', '₹500–2,000 Cr', '₹2,000 Cr+'] as const

/* What Saral AI speaks — shown as a strip under the landing card. Every item is
   a regulation, ruling or rail already named elsewhere on the site. */
export const SARAL_AI_TOPICS = ['RBI MD-FRM 2024', 'DLD 2025 · KFS', 'DPDP 2023', 'SMA-0 tagging', 'CRILC · NBS-9', 'Account Aggregator', 'GSTN · MCA21', 'CERSAI', 'NPCI · CIMS', 'SBI vs. Rajesh Agarwal', 'JLG · LAP · MSME']

/* What the NBFC's first 30 days look like — the onboarding journey. */
export const ONBOARDING = [
  { day: 'Day 1', title: '20-minute walkthrough', body: 'On your book, your products, your core. No deck.' },
  { day: 'Week 1', title: 'Sandbox on your data', body: 'A sample file from your core, decisions back through one API.' },
  { day: 'Day 30', title: 'Pilot on one product line', body: 'Live decisions on one product. Pay per loan, cancel any time.' },
] as const
