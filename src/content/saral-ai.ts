import { CONTACT_EMAIL } from './site'

/* ---------------------------------------------------------------------------
   Saral AI: the landing-page chat. Starter questions with scripted answers,
   plus the guided diagnostic that ends in a note. Scripted today; the
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

/* Starter questions on the landing chat. Scripted answers built from the
   same facts the rest of the site states; the model takes over when wired. */
export const STARTERS: { q: string; a: string; link?: { to: string; label: string }; note?: true }[] = [
  {
    q: 'RBI guidelines for digital lending',
    a: 'The Digital Lending Directions 2025 come down to three things a lender must be able to show: a Key Fact Statement on every digital loan, every lending app registered on CIMS, and borrower consent logged under DPDP with erasure honoured. MD-FRM 2024 adds a 21-day show-cause notice before any fraud tagging, per SBI vs. Rajesh Agarwal.',
    link: { to: '/technology#compliance', label: 'How Saralya builds these in' },
  },
  {
    q: 'Improve collection efficiency',
    a: 'Three things move the needle fastest: route the day by promise-to-pay date instead of by bucket, log every field visit with time and location, and treat the first NACH bounce as the signal: it is weeks ahead of DPD 30.',
    link: { to: '/products#M4', label: 'Saral Recover' },
  },
  {
    q: 'Credit risk models',
    a: 'A good decision pulls bureau, Account Aggregator (all nine FI types), GSTN and MCA21 in one go, then runs a rule engine configured per product: SME, MSME, LAP, MFI JLG, unsecured retail. Verify after sanction on small tickets, not before.',
    link: { to: '/demo', label: 'Watch a decision run' },
  },
  {
    q: 'Integrations with core banking',
    a: 'Keep the core. Saralya sits beside FinnOne, Lentra, Finflux or AllCloud as an API layer (REST and webhooks, multi-tenant, hosted in AWS Mumbai) and you move one product line at a time.',
    link: { to: '/technology', label: 'The architecture' },
  },
  { q: 'Get a note for my NBFC', a: '', note: true },
  { q: 'Talk to a human', a: 'The founders read every message and reply the same day.', link: { to: `mailto:${CONTACT_EMAIL}?subject=Question%20from%20the%20website`, label: 'Write to us' } },
  /* below the fold of the chip list; reachable from the rolling strip */
  {
    q: 'What is SMA-0 and when do I tag it?',
    a: 'SMA-0 is the first special-mention bucket: principal or interest overdue up to 30 days. Tag it the day the account slips. A first NACH bounce or a missed GST filing is your earliest signal, and lenders who wait for DPD 30 are already a month late.',
    link: { to: '/products#M3', label: 'Saral Watch' },
  },
  {
    q: 'What does DPDP mean for my loan files?',
    a: 'Under the DPDP Act 2023 every borrower consent has to be logged, purpose-bound and revocable, and an erasure request has to be honoured row by row, not by deleting a whole file. Inspectors ask for the consent trail before they ask for the credit file.',
    link: { to: '/technology#compliance', label: 'How it is built in' },
  },
  {
    q: 'How does Account Aggregator change KYC?',
    a: 'One consent replaces a folder of PDFs. Account Aggregator covers all nine ReBIT financial-information types: bank statements, deposits, mutual funds, GST returns and more: pulled directly with the borrower’s consent, so the file is decided on data, not on what was uploaded.',
    link: { to: '/products#M1', label: 'Saral Appraisal' },
  },
  {
    q: 'What is the 21-day show-cause rule?',
    a: 'After SBI vs. Rajesh Agarwal, RBI’s MD-FRM 2024 requires a lender to issue a show-cause notice and give the borrower 21 days to respond before classifying an account as fraud. Tag first and notify later, and the classification does not stand.',
    link: { to: '/products#M2', label: 'Saral Screen' },
  },
]

/* What the NBFC's first 30 days look like: the onboarding journey. */
export const ONBOARDING = [
  { day: 'Day 1', title: '20-minute walkthrough', body: 'On your book, your products, your core. No deck.' },
  { day: 'Week 1', title: 'Sandbox on your data', body: 'A sample file from your core, decisions back through one API.' },
  { day: 'Day 30', title: 'Pilot on one product line', body: 'Live decisions on one product. Pay per loan, cancel any time.' },
] as const
