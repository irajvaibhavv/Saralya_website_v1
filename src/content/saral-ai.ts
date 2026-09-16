import { CONTACT_EMAIL } from './site'

/* Saral AI: the landing-page chat. Starter questions with scripted answers,
   plus the guided diagnostic that ends in a note. Scripted today; the
   free-text box is the seam where the model plugs in. */

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
  { id: 'tat', label: 'Turnaround is days, not minutes', stage: 0, module: 'M1', next: { to: '/demo', label: 'Watch a decision in minutes' }, tip: 'Decide on data first, verify later. Bureau + AA + GSTN in one pull covers most of the file; push physical checks post-sanction on small tickets.' },
  { id: 'tabs', label: 'Bureau, GST and bank data live in five tabs', stage: 0, module: 'M1', tip: 'One consent, one pull. Account Aggregator already covers all nine FI types: stop asking borrowers for PDF statements.' },
  { id: 'fraud', label: 'Fraud shows up after disbursal', stage: 1, module: 'M2', next: { to: '/demo', label: 'Watch a decision run' }, tip: 'Link applicants by phone, device, address and bank account. Most application fraud is a cluster, not a person: and build the 21-day SCN step in before you need it.' },
  { id: 'stress', label: 'Stress shows up at DPD 30, not day 1', stage: 2, module: 'M3', tip: 'Watch the bounce, not the bucket. A first failed NACH or a skipped GST filing is the earliest signal you already own.' },
  { id: 'field', label: 'Field collections are a black box', stage: 3, module: 'M4', tip: 'Log every visit with time and location, and route the day by promise-to-pay date: not by who shouted loudest.' },
  { id: 'mis', label: 'Portfolio MIS is a month-end spreadsheet', stage: 4, module: 'M5', tip: 'Cut the book by vintage, not by product. Cohorts show trouble two quarters before totals do.' },
  { id: 'inspect', label: 'Inspection prep takes weeks', stage: 5, module: 'M6', next: { to: '/home#readiness', label: 'Tick your six inspection checks' }, tip: 'Generate CRILC and NBS-9 from the ledger, never retype them. An immutable audit trail is the first thing an inspector asks for.' },
  { id: 'core', label: 'Core system won’t talk to anything', stage: 0, module: null, next: { to: '/technology', label: 'See how it plugs into your core' }, tip: 'Don’t rip out the core. Put an API layer beside it and move one product line at a time.' },
] as const
export type ChallengeId = (typeof CHALLENGES)[number]['id']

export const BOOK_SIZES = ['Under ₹100 Cr', '₹100–500 Cr', '₹500–2,000 Cr', '₹2,000 Cr+'] as const

/* The two chips every role sees after its own questions. */
export type Starter = { q: string; a: string; link?: { to: string; label: string }; note?: true }
export const STARTERS: Starter[] = [
  { q: 'Get a note for my NBFC', a: '', note: true },
  { q: 'Talk to a human', a: 'The founders read every message and reply the same day.', link: { to: `mailto:${CONTACT_EMAIL}?subject=Question%20from%20the%20website`, label: 'Write to us' } },
]

/* The first thing Saral asks is who you are. Each role gets the questions
   people in that seat ask most, and maps to a department so the guided note
   can skip a step. */
export const ROLES: { id: string; label: string; dept: DeptId; hello: string; qs: Starter[] }[] = [
  {
    id: 'rm',
    label: 'Relationship Manager',
    dept: 'credit',
    hello: 'Relationship managers mostly ask me about speed and paperwork.',
    qs: [
      {
        q: 'How fast can I give a customer an in-principle answer?',
        a: 'Minutes, when the file is decided on data. One consent pulls bureau, Account Aggregator and GSTN together, the rule engine decides, and the Key Fact Statement goes out with the sanction. On small tickets, physical checks move to after sanction.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
      {
        q: 'What documents do I still have to collect?',
        a: 'Far fewer. Account Aggregator covers all nine ReBIT FI types with one consent, so bank statements and GST returns arrive as data, not PDFs. PAN and Aadhaar for KYC, plus whatever your product policy adds on top.',
        link: { to: '/products#M1', label: 'Saral Appraisal' },
      },
      {
        q: 'Why do good customers get rejected?',
        a: 'Usually because a rule fired on a thin bureau file. Adding AA cash flows and GST filings to the decision gives a thin-file MSME a real score, and the reason codes tell you which rule to revisit.',
        link: { to: '/demo', label: 'See the reason codes' },
      },
      {
        q: 'Where is my file stuck right now?',
        a: 'Every file carries its stage and who it is waiting on, so the answer is a lookup, not a phone call. Turnaround by stage is one of the first numbers the MIS shows.',
        link: { to: '/products#M5', label: 'Saral Insight' },
      },
    ],
  },
  {
    id: 'verify',
    label: 'Verification Officer',
    dept: 'credit',
    hello: 'Verification officers ask me about forged documents and linked applicants.',
    qs: [
      {
        q: 'How do I catch a fake bank statement?',
        a: 'Stop accepting them. Statements pulled over Account Aggregator come from the bank, so there is nothing to forge. For what still arrives as a PDF, cross-check it against GST turnover and bureau enquiries.',
        link: { to: '/products#M2', label: 'Saral Screen' },
      },
      {
        q: 'Can one applicant be linked to another?',
        a: 'Yes, and that is the point of screening. Applicants are linked by phone, device, address and bank account, because most application fraud is a cluster of files, not one person.',
        link: { to: '/products#M2', label: 'Cluster network analysis' },
      },
      {
        q: 'What must happen before I tag a file as fraud?',
        a: 'A show-cause notice and 21 days for the borrower to respond, under RBI’s MD-FRM 2024 after SBI vs. Rajesh Agarwal. Tag first and notify later, and the classification does not stand.',
        link: { to: '/products#M2', label: 'The 21-day SCN workflow' },
      },
      {
        q: 'Do I still need a physical visit?',
        a: 'On small tickets, after sanction rather than before. Data covers most of the file; keep the visit for high-value or secured loans and log it with time and location.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
    ],
  },
  {
    id: 'uw',
    label: 'Underwriter',
    dept: 'credit',
    hello: 'Underwriters ask me what goes into the score and how to handle thin files.',
    qs: [
      {
        q: 'Which data goes into the decision?',
        a: 'Bureau, Account Aggregator (all nine FI types), GSTN and MCA21 in one pull, then a rule engine configured per product: SME, MSME, LAP, MFI JLG, unsecured retail. Every decision comes back with reason codes.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
      {
        q: 'How do I underwrite a thin-file MSME?',
        a: 'On cash flow, not on bureau alone. Twelve months of AA bank data and GST filings give turnover, seasonality and bounce history, which says more than a bureau score does.',
        link: { to: '/products#M1', label: 'Saral Appraisal' },
      },
      {
        q: 'Can I change the rules without a release?',
        a: 'Yes. The rule engine is configured per product, so a policy change is a config change, and every decision records which rules decided it.',
        link: { to: '/technology', label: 'The architecture' },
      },
      {
        q: 'What has to be in the Key Fact Statement?',
        a: 'APR, every charge, the repayment schedule and the cooling-off period, on every digital loan, before the borrower signs. Generate it from the sanction terms so it can never disagree with the ledger.',
        link: { to: '/technology#compliance', label: 'How it is built in' },
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal Officer',
    dept: 'compliance',
    hello: 'Legal teams ask me about DPDP, fraud classification and what an inspector reads.',
    qs: [
      {
        q: 'What does DPDP mean for our loan files?',
        a: 'Under the DPDP Act 2023 every borrower consent has to be logged, purpose-bound and revocable, and an erasure request has to be honoured row by row, not by deleting a whole file. Inspectors ask for the consent trail before they ask for the credit file.',
        link: { to: '/technology#compliance', label: 'How it is built in' },
      },
      {
        q: 'When can we classify an account as fraud?',
        a: 'After a show-cause notice and 21 days for the borrower to respond. RBI’s MD-FRM 2024 codified SBI vs. Rajesh Agarwal; tag first and notify later, and the classification does not stand.',
        link: { to: '/products#M2', label: 'Saral Screen' },
      },
      {
        q: 'What do the Digital Lending Directions ask for?',
        a: 'Three things a lender must be able to show: a Key Fact Statement on every digital loan, every lending app registered on CIMS, and borrower consent logged under DPDP with erasure honoured. LSP contracts and fund-flow rules sit underneath.',
        link: { to: '/technology#compliance', label: 'DLD 2025 mapping' },
      },
      {
        q: 'Will our audit trail hold up in an inspection?',
        a: 'Only if it is immutable. Every decision, consent and override is written once with who, what and when, so the trail an inspector reads is the same one the system ran on.',
        link: { to: '/products#M6', label: 'Saral Comply' },
      },
    ],
  },
  {
    id: 'ops',
    label: 'Operations Team',
    dept: 'tech',
    hello: 'Operations teams ask me about the core system, go-live and where the data sits.',
    qs: [
      {
        q: 'Will this replace our core system?',
        a: 'No. Keep the core. Saralya sits beside FinnOne, Lentra, Finflux or AllCloud as an API layer (REST and webhooks, multi-tenant) and you move one product line at a time.',
        link: { to: '/technology', label: 'The architecture' },
      },
      {
        q: 'How long does go-live take?',
        a: 'Day 1 is a 20-minute walkthrough on your book. Week 1 is a sandbox on a sample file from your core. Day 30 is a pilot on one product line, paid per loan, cancel any time.',
        link: { to: '/home#readiness', label: 'The six readiness checks' },
      },
      {
        q: 'Can it run alongside Excel for a while?',
        a: 'Yes. Most NBFCs we meet still run parts of the book on Excel. Move one product line over; the rest keeps running exactly as it does today.',
        link: { to: '/products', label: 'The six modules' },
      },
      {
        q: 'Where does our data live?',
        a: 'AWS Mumbai, with disaster recovery in Hyderabad. Inference runs inside India and no customer data leaves your tenant.',
        link: { to: '/technology', label: 'Data residency' },
      },
    ],
  },
  {
    id: 'collections',
    label: 'Collections Manager',
    dept: 'collections',
    hello: 'Collections managers ask me about early signals and the field day.',
    qs: [
      {
        q: 'How do I know an account is slipping before DPD 30?',
        a: 'SMA-0 is the first special-mention bucket: overdue up to 30 days. Tag it the day the account slips. A first NACH bounce or a missed GST filing is your earliest signal, and lenders who wait for DPD 30 are already a month late.',
        link: { to: '/products#M3', label: 'Saral Watch' },
      },
      {
        q: 'Which accounts should I call first?',
        a: 'The ones with a fresh signal: a bounced NACH, a skipped GST filing, a bureau enquiry with another lender. Rank by signal and promise-to-pay date, not by bucket.',
        link: { to: '/products#M3', label: 'The deterioration index' },
      },
      {
        q: 'How should I plan the field day?',
        a: 'Route it by promise-to-pay date, not by who shouted loudest. Every visit is logged with time, location, outcome and the next promise, so the day’s report writes itself.',
        link: { to: '/products#M4', label: 'Saral Recover' },
      },
      {
        q: 'What happens when an account goes legal?',
        a: 'Section 138 and SARFAESI prep is generated from the ledger, with the notice history attached, instead of being assembled by hand at the end of the quarter.',
        link: { to: '/products#M4', label: 'Sec 138 / SARFAESI prep' },
      },
    ],
  },
]
export type RoleId = (typeof ROLES)[number]['id']

/* What the NBFC's first 30 days look like: the onboarding journey. */
export const ONBOARDING = [
  { day: 'Day 1', title: '20-minute walkthrough', body: 'On your book, your products, your core. No deck.' },
  { day: 'Week 1', title: 'Sandbox on your data', body: 'A sample file from your core, decisions back through one API.' },
  { day: 'Day 30', title: 'Pilot on one product line', body: 'Live decisions on one product. Pay per loan, cancel any time.' },
] as const
