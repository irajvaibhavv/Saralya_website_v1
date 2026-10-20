/* The agents we run, one tab each: what the agent does, and the screen it
   does it on. The screen is a mock built from this data — a stand-in until
   the recordings of the real apps arrive.

   TODO(Vishal): swap each `screen` for the recording of that agent once the
   videos exist; the phone frame takes a video the same way it takes rows. */

export type Screen = {
  /** what the app calls itself in the status row */
  app: string
  title: string
  sub: string
  /** the work, top to bottom: done, running, or still waiting */
  rows: { label: string; state: 'done' | 'live' | 'wait' }[]
  /** what the agent says while it works */
  says: string
  /** the agent's own name on the bar */
  agent: string
  /** the call the agent makes, drawn as the dial the live demo draws */
  verdict?: { call: string; score: number; of: number }
}

export type UseCase = {
  id: string
  tab: string
  title: string
  points: string[]
  screen: Screen
  /** this agent's work is a board pack, so it is drawn wide, not on a phone */
  board?: true
}

export const USE_CASES: UseCase[] = [
  {
    id: 'decision',
    tab: 'Decision agent',
    title: 'Decide the file while the borrower is still at the counter',
    points: [
      'Pulls bureau, Account Aggregator and GSTN on one consent, in one run',
      'Scores against the policy for that product, not a single generic cut-off',
      'Writes the reason codes that decided it, every time it decides',
      'Escalates what it cannot sign, to the person whose signature it needs',
    ],
    screen: {
      app: 'Saral Profile',
      title: 'Application 4821',
      sub: 'Scored in 00:46 · ₹8,00,000 · LAP',
      rows: [
        { label: 'Bureau pulled', state: 'done' },
        { label: 'Bank statements over AA', state: 'done' },
        { label: 'GST filings read', state: 'live' },
        { label: 'Policy engine · 14 rules', state: 'wait' },
      ],
      says: 'Thin bureau file, twelve months of clean cash flow.',
      agent: 'Decision agent',
      verdict: { call: 'Approve · STP', score: 742, of: 850 },
    },
  },
  {
    id: 'analytics',
    tab: 'Analytics agent',
    title: 'Read the whole book before the first meeting of the day',
    points: [
      'Cuts the portfolio by bucket, vintage, product, branch and ticket size',
      'Tracks SMA-0 / 1 / 2 and NPA movement against last month, not last year',
      'Names the cohorts ageing faster than the rest, with the accounts behind them',
      'Writes the review pack on the first, before anyone asks for it',
    ],
    screen: {
      app: 'Saral Drishti',
      title: 'Portfolio quality',
      sub: 'October · ₹412 Cr book · 9,180 accounts',
      rows: [
        { label: 'Current · 86.0%', state: 'done' },
        { label: 'SMA-0 · 9.0%', state: 'done' },
        { label: 'SMA-1 · 3.2%', state: 'live' },
        { label: 'Roll-rate pack', state: 'wait' },
      ],
      says: 'FY24 Q2 is ageing twice as fast as the rest. Eleven accounts carry most of it.',
      agent: 'Analytics agent',
    },
  },
  {
    id: 'monthly',
    tab: 'Monthly review agent',
    title: 'Write the monthly review before anyone asks for it',
    points: [
      'Reads the ledger on the 1st and builds the pack from it, not from a template',
      'Puts the vintage curves, the roll rates and the early warnings on one page',
      'Says which cohort parted from the pack, and in which month it happened',
      'Keeps the same four views every month, so the board compares like with like',
    ],
    board: true,
    screen: {
      app: 'Saral Drishti',
      title: 'Monthly review · October',
      sub: 'Board pack · four views',
      rows: [
        { label: 'Vintage curves', state: 'done' },
        { label: 'Roll-rate', state: 'done' },
        { label: 'Early warning', state: 'live' },
        { label: 'Recovery', state: 'wait' },
      ],
      says: 'The July cohort is rolling four times the April book at the same age.',
      agent: 'Monthly review agent',
    },
  },
  {
    id: 'onboarding',
    tab: 'Onboarding agent',
    title: 'Walk a borrower from the first tap to a complete file',
    points: [
      'Takes identity, address and bank in one consented run, in the borrower’s language',
      'Puts the Key Fact Statement in front of them before anything is signed',
      'Sees the field being retyped and the form being abandoned, and answers there',
      'Hands off to a branch officer with everything already gathered',
    ],
    screen: {
      app: 'Borrower app',
      title: 'Complete your KYC',
      sub: 'Step 2 of 4 · about 3 minutes left',
      rows: [
        { label: 'Basic details', state: 'done' },
        { label: 'PAN verification', state: 'live' },
        { label: 'Bank account over AA', state: 'wait' },
        { label: 'Address confirmation', state: 'wait' },
      ],
      says: 'I have filled your address from the Aadhaar record. Is that still where you live?',
      agent: 'Onboarding agent',
    },
  },
  {
    id: 'underwriting',
    tab: 'Underwriting agent',
    title: 'Underwrite the thin file on cash flow, not on a bureau score',
    points: [
      'Reads twelve months of bank data for turnover, seasonality and bounces',
      'Checks the GST filings against what the application claims',
      'Applies the obligation cap and the deviations your policy allows',
      'Leaves the working behind it, so a reviewer can follow the call',
    ],
    screen: {
      app: 'Saral Profile',
      title: 'MSME · thin file',
      sub: 'No bureau depth · 14 months of banking',
      rows: [
        { label: 'Turnover ₹1.9 Cr · verified', state: 'done' },
        { label: 'Bounces · 2 in 12 months', state: 'done' },
        { label: 'GST vs declared · matched', state: 'live' },
        { label: 'Obligation cap · 48% FOIR', state: 'wait' },
      ],
      says: 'Cash flow carries this file. Recommending ₹18L against a declared ₹25L, with the reason recorded.',
      agent: 'Underwriting agent',
    },
  },
  {
    id: 'fieldpd',
    tab: 'Field PD agent',
    title: 'Run the personal discussion, and write it up on the spot',
    points: [
      'Runs the discussion as a conversation, with a face and a name, not a form',
      'Probes the answer that does not add up instead of recording it',
      'Attaches the premises, the stock, the time and the location',
      'Leaves a PD note ready before the officer is back at the branch',
    ],
    screen: {
      app: 'Saral Saarthi · PD',
      title: 'Personal discussion',
      sub: 'Kirana · Meerut · 11:20 am',
      rows: [
        { label: 'Identity confirmed on video', state: 'done' },
        { label: 'Premises and stock captured', state: 'done' },
        { label: 'Income questions', state: 'live' },
        { label: 'PD note', state: 'wait' },
      ],
      says: 'You said ₹60,000 a month, but the bank credits read ₹41,000. Which months are the cash sales?',
      agent: 'Field PD agent',
    },
  },
]
