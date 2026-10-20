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
  { id: 'fraud', label: 'Fraud shows up after disbursal', stage: 1, module: 'M3', next: { to: '/demo', label: 'Watch a decision run' }, does: 'Links applicants by phone, device, address and bank account, and flags the cluster before disbursal.', tip: 'Link applicants by phone, device, address and bank account. Most application fraud is a cluster, not a person: and build the 21-day SCN step in before you need it.' },
  { id: 'stress', label: 'Stress shows up at DPD 30, not day 1', stage: 2, module: 'M2', does: 'Watches the first failed NACH and the skipped GST filing, and tags SMA-0 on day 1.', tip: 'Watch the bounce, not the bucket. A first failed NACH or a skipped GST filing is the earliest signal you already own.' },
  { id: 'field', label: 'Field collections are a black box', stage: 3, module: 'M5', does: 'Routes the day by promise-to-pay date, and logs every visit with time and location.', tip: 'Log every visit with time and location, and route the day by promise-to-pay date: not by who shouted loudest.' },
  { id: 'mis', label: 'Portfolio MIS is a month-end spreadsheet', stage: 4, module: 'M2', does: 'Cuts the book by vintage and writes the roll-rate pack before anyone asks for it.', tip: 'Cut the book by vintage, not by product. Cohorts show trouble two quarters before totals do.' },
  { id: 'inspect', label: 'Inspection prep takes weeks', stage: 5, module: 'M3', next: { to: '/about#readiness', label: 'Tick your six inspection checks' }, does: 'Generates CRILC and NBS-9 from the ledger, and names what is still missing.', tip: 'Generate CRILC and NBS-9 from the ledger, never retype them. An immutable audit trail is the first thing an inspector asks for.' },
  { id: 'core', label: 'Core system won’t talk to anything', stage: 0, module: null, next: { to: '/technology', label: 'See how it plugs into your core' }, does: 'Reads your core through an API layer beside it, one product line at a time.', tip: 'Don’t rip out the core. Put an API layer beside it and move one product line at a time.' },
] as const
export type ChallengeId = (typeof CHALLENGES)[number]['id']

export const BOOK_SIZES = ['Under ₹100 Cr', '₹100–500 Cr', '₹500–2,000 Cr', '₹2,000 Cr+'] as const

/* The two chips every role sees after its own questions. */
export type Starter = { q: string; a: string; link?: { to: string; label: string }; note?: true }
export const STARTERS: Starter[] = [
  { q: 'Get a note for my NBFC', a: '', note: true },
  { q: 'Write to us', a: 'The founders read every message and reply the same day.', link: { to: `mailto:${CONTACT_EMAIL}?subject=Question%20from%20the%20website`, label: 'Email the founders' } },
]

/* Who is asking, in the order the lead set: the lender first, then the
   people around the loan. Each role carries the questions that seat asks
   most, and nothing shows until one is picked.

   TODO(Vikas): the borrower, DSA and learning answers are general lending
   information written here, not founder-approved copy. Read them before
   launch. */
export const ROLES: { id: string; label: string; asks: string; dept: DeptId; hello: string; qs: Starter[] }[] = [
  {
    id: 'nbfc',
    label: 'Bank / NBFC',
    asks: 'Files, score, collections',
    dept: 'credit',
    hello: 'Lenders ask me about turnaround, thin files, early stress and inspection.',
    qs: [
      {
        q: 'Here is my sheet — run the monthly PQM',
        a: 'Drop the MIS or collections sheet into the box above. It comes back as a portfolio read: disbursals and collections for the month, roll-rates between buckets, the branches and products moving against the book, and what changed since last month — then portfolio quality on top: bucket and vintage, SMA-0 / 1 / 2 and NPA movement, and the cohorts ageing faster than the rest.',
        link: { to: '/about#board', label: 'See a monthly review' },
      },
      {
        q: 'Do a performance review of my team',
        a: 'By officer and by branch: files touched, time per stage, approval and conversion rates, collections against promise-to-pay. The point is a coaching conversation that names a stage, not a month-end number.',
        link: { to: '/products#M2', label: 'Saral Drishti' },
      },
      {
        q: 'Help me build a credit policy',
        a: 'Start from the product: ticket size, tenor, the income evidence you will accept, the obligation cap, the bureau and cash-flow cut-offs, and the deviations you will allow and who signs them. Each rule is written so it can fire on a file and carry a reason code when it does.',
        link: { to: '/products#M1', label: 'Saral Profile' },
      },
      {
        q: 'How do I underwrite a thin-file MSME?',
        a: 'On cash flow, not on bureau alone. Twelve months of Account Aggregator bank data and GST filings give turnover, seasonality and bounce history, which says more than a bureau score does.',
        link: { to: '/products#M1', label: 'Saral Profile' },
      },
      {
        q: 'How do I know an account is slipping before DPD 30?',
        a: 'SMA-0 is the first special-mention bucket: overdue up to 30 days. Tag it the day the account slips. A first NACH bounce or a missed GST filing is your earliest signal, and lenders who wait for DPD 30 are already a month late.',
        link: { to: '/products#M2', label: 'Saral Drishti' },
      },
      {
        q: 'Why was a file I would have approved rejected?',
        a: 'Every decision comes back with reason codes naming the rules that fired. If a thin bureau file is the reason, adding Account Aggregator and GST data usually turns it into a scored file instead of a rejection.',
        link: { to: '/demo', label: 'See the reason codes' },
      },
      {
        q: 'What must happen before I tag a file as fraud?',
        a: 'A show-cause notice and 21 days for the borrower to respond, under RBI’s MD-FRM 2024 after SBI vs. Rajesh Agarwal. Tag first and notify later, and the classification does not stand.',
        link: { to: '/products#M3', label: 'The 21-day SCN workflow' },
      },
      {
        q: 'How long does inspection prep take?',
        a: 'Weeks, when CRILC and NBS-9 are retyped. Generate them from the ledger instead, with an immutable audit trail behind them: that is the first thing an inspector asks for.',
        link: { to: '/about#readiness', label: 'Tick your six inspection checks' },
      },
    ],
  },
  {
    id: 'borrower',
    label: 'Borrower',
    asks: 'Eligibility, score, documents',
    dept: 'other',
    hello: 'Borrowers ask me how much they can get, and why a score moved.',
    qs: [
      {
        q: 'My salary is ₹65,000 a month with a ₹9,000 car EMI. How much home loan can I get?',
        a: 'Most lenders cap all your EMIs together at 50–60% of take-home pay. On ₹65,000 that is roughly ₹32,000–₹39,000, less the ₹9,000 you already pay, so about ₹23,000–₹30,000 of new EMI. At prevailing home-loan rates over 20 years that is broadly ₹25–35 lakh, before the lender’s own policy and the property valuation.',
      },
      {
        q: 'My CIBIL score dropped by 40 points. What could have caused it?',
        a: 'Usually one of four things: a payment reported late, card usage above about 30% of the limit, several loan enquiries in a short window, or an old account closed along with the history behind it. The report names the account that moved, and an error can be disputed with the bureau.',
      },
      {
        q: 'What documents do I need for a home loan as a salaried employee?',
        a: 'Identity and address proof, three months of salary slips, six to twelve months of bank statements, Form 16 or the last two years’ returns, and the property papers. Statements shared over Account Aggregator come straight from your bank, so there is nothing to scan.',
      },
      {
        q: 'Why was my loan application rejected?',
        a: 'Ask the lender for the reason, in writing. The common ones are obligations above the income cap, a thin or damaged bureau file, income that cannot be evidenced, and an address or employment that could not be verified.',
      },
    ],
  },
  {
    id: 'dsa',
    label: 'DSA / advisor',
    asks: 'Files, rejections, turnaround',
    dept: 'other',
    hello: 'DSAs and advisors ask me what makes a file clear the first time.',
    qs: [
      {
        q: 'Which files get rejected most often, and why?',
        a: 'Files where income cannot be evidenced, where obligations cross the lender’s cap, and where the bureau record and the application disagree. Fix the evidence before the file goes in and most of those turn into questions rather than rejections.',
      },
      {
        q: 'How fast can my client get an answer?',
        a: 'Where the lender decides on data — bureau, Account Aggregator and GST on one consent — an in-principle answer takes minutes. The days usually go to collecting paper, not to deciding.',
        link: { to: '/demo', label: 'Watch a decision run' },
      },
      {
        q: 'How do I prepare a thin-file MSME case?',
        a: 'Lead with cash flow: twelve months of bank data, the GST filings, and the bounce history. A clean statement of turnover and seasonality carries a case that a bureau score alone will not.',
      },
      {
        q: 'What does the lender see that I do not?',
        a: 'The rules that fired on the file and the reason codes behind them. Ask for the reason on every rejection; it tells you what to fix on the next one.',
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learning',
    asks: 'How lending works',
    dept: 'other',
    hello: 'Here to learn how lending works? Start anywhere.',
    qs: [
      {
        q: 'What does an NBFC actually do?',
        a: 'It lends without being a bank: no current or savings accounts, and no public deposits for most of them, so it funds itself from banks and the markets and lends on. RBI regulates it in layers — base, middle, upper — under Scale Based Regulation.',
      },
      {
        q: 'How is a loan application underwritten?',
        a: 'Four questions in order: who is the applicant, what do they earn, what do they already owe, and what happens if they stop paying. Identity and bureau answer the first and third, bank and GST data the second, collateral or guarantee the fourth.',
      },
      {
        q: 'What is Account Aggregator?',
        a: 'An RBI-licensed way to share your own financial data with your consent: the bank sends it straight to the lender, for a stated purpose and a stated period, and you can revoke it. Nine kinds of financial information are covered.',
      },
      {
        q: 'What do DPD and SMA mean?',
        a: 'DPD is days past due. SMA is the special-mention bucket before an account turns bad: SMA-0 up to 30 days overdue, SMA-1 to 60, SMA-2 to 90. Past 90 days it is an NPA.',
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



