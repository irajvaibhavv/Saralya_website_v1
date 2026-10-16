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

/* Each challenge maps to a lifecycle stage, a module, one vendor-neutral tip
   the visitor can act on without buying anything, and `does`: the same thing
   written as the work an agent takes off their desk (used by the Agents
   section). */
export const CHALLENGES = [
  { id: 'tat', label: 'Turnaround is days, not minutes', stage: 0, module: 'M1', next: { to: '/demo', label: 'Watch a decision in minutes' }, does: 'Pulls bureau, Account Aggregator and GSTN on one consent, and puts a scored file on your desk.', tip: 'Decide on data first, verify later. Bureau + AA + GSTN in one pull covers most of the file; push physical checks post-sanction on small tickets.' },
  { id: 'tabs', label: 'Bureau, GST and bank data live in five tabs', stage: 0, module: 'M1', does: 'Collapses five tabs into one file view: bureau, bank, GST, MCA.', tip: 'One consent, one pull. Account Aggregator already covers all nine FI types: stop asking borrowers for PDF statements.' },
  { id: 'fraud', label: 'Fraud shows up after disbursal', stage: 1, module: 'M2', next: { to: '/demo', label: 'Watch a decision run' }, does: 'Links applicants by phone, device, address and bank account, and flags the cluster before disbursal.', tip: 'Link applicants by phone, device, address and bank account. Most application fraud is a cluster, not a person: and build the 21-day SCN step in before you need it.' },
  { id: 'stress', label: 'Stress shows up at DPD 30, not day 1', stage: 2, module: 'M3', does: 'Watches the first failed NACH and the skipped GST filing, and tags SMA-0 on day 1.', tip: 'Watch the bounce, not the bucket. A first failed NACH or a skipped GST filing is the earliest signal you already own.' },
  { id: 'field', label: 'Field collections are a black box', stage: 3, module: 'M4', does: 'Routes the day by promise-to-pay date, and logs every visit with time and location.', tip: 'Log every visit with time and location, and route the day by promise-to-pay date: not by who shouted loudest.' },
  { id: 'mis', label: 'Portfolio MIS is a month-end spreadsheet', stage: 4, module: 'M5', does: 'Cuts the book by vintage and writes the roll-rate pack before anyone asks for it.', tip: 'Cut the book by vintage, not by product. Cohorts show trouble two quarters before totals do.' },
  { id: 'inspect', label: 'Inspection prep takes weeks', stage: 5, module: 'M6', next: { to: '/home#readiness', label: 'Tick your six inspection checks' }, does: 'Generates CRILC and NBS-9 from the ledger, and names what is still missing.', tip: 'Generate CRILC and NBS-9 from the ledger, never retype them. An immutable audit trail is the first thing an inspector asks for.' },
  { id: 'core', label: 'Core system won’t talk to anything', stage: 0, module: null, next: { to: '/technology', label: 'See how it plugs into your core' }, does: 'Reads your core through an API layer beside it, one product line at a time.', tip: 'Don’t rip out the core. Put an API layer beside it and move one product line at a time.' },
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
    id: 'credit',
    label: 'Credit Officer',
    dept: 'credit',
    hello: 'Credit officers ask me what a file still needs and why one got rejected.',
    qs: [
      {
        q: 'What does this file still need before I recommend it?',
        a: 'The system says so on the file itself: which pulls came back, which rule is waiting, and what a human still has to sign. One consent covers bureau, Account Aggregator and GSTN, so what is left is usually policy, not paperwork.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
      {
        q: 'How much of the personal discussion can I do on data?',
        a: 'Most of the income and obligation questions are already answered by AA cash flows and GST filings. Keep the visit for what data cannot see: the premises, the stock, the people. Record it with time and location so it sits in the file, not in a diary.',
        link: { to: '/products#M1', label: 'Saral Appraisal' },
      },
      {
        q: 'Why was a file I would have approved rejected?',
        a: 'Every decision comes back with reason codes naming the rules that fired. If a thin bureau file is the reason, adding AA and GST data usually turns it into a scored file instead of a rejection.',
        link: { to: '/demo', label: 'See the reason codes' },
      },
      {
        q: 'When should I raise a deviation?',
        a: 'When the file fails a rule you can justify in writing. Record the reason against the rule, not beside it: deviations that carry their own reason are the ones that survive an audit.',
        link: { to: '/products#M6', label: 'Saral Comply' },
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
    id: 'collections',
    label: 'Collection Manager',
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
  {
    id: 'sales',
    label: 'Sales Manager',
    dept: 'leadership',
    hello: 'Sales managers ask me about turnaround, drop-off and what their team can promise.',
    qs: [
      {
        q: 'How do I cut turnaround for my team?',
        a: 'Turnaround is mostly waiting, not working. Decide on data at the counter, move physical checks to after sanction on small tickets, and the days a file spends in a queue collapse into minutes of actual work.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
      {
        q: 'What can my officer tell a customer on the spot?',
        a: 'An in-principle answer, with the Key Fact Statement attached: amount, APR, every charge and the schedule. A customer who leaves the counter with a number does not go shopping with a competitor.',
        link: { to: '/products#M1', label: 'Saral Appraisal' },
      },
      {
        q: 'Where is my team losing applications?',
        a: 'Funnel by stage says it plainly: where files stall, which document request loses people, which branch converts. It is the same data the credit MIS runs on, cut by officer instead of by cohort.',
        link: { to: '/products#M5', label: 'Saral Insight' },
      },
      {
        q: 'How do I know which officer needs help?',
        a: 'By files touched, time per stage and what each one converts, not by the month-end number. A productivity view per officer makes a coaching conversation specific instead of general.',
        link: { to: '/products#M5', label: 'Saral Insight' },
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



