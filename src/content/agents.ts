/* The /agents page. Four pieces of data:
   SEATS  — the desks an agent can sit at, credit side and sales side. Every
            agent is the same five layers; only the labels change.
   WANTS  — what someone can ask an agent to take off their desk, what it
            looks like the morning after, and what it saves. Minutes are per
            file, hours are per month. They are MARGINAL, not absolute:
            `tat` carries the whole data-gathering saving and the wants that
            overlap it are scored only for what they add on top, so ticking
            everything cannot inflate the total. Deliberately conservative,
            and the arithmetic is shown on screen, because a saving we can't
            defend is worse than no number at all.
   READY  — the agents someone can start from instead of a blank form.
   PLANS  — how it is bought once they have built one.

   TODO(Vikas): the savings in WANTS and every figure in PLANS are
   placeholders. Confirm both before launch. */

export type Seat = {
  id: string
  label: string
  short: string
  sees: string[]
  /** the five this desk is asked; the only ones it is shown */
  does: WantId[]
  cannot: string[]
  actsIn: string[]
  handsBack: string
}

export const SEATS: Seat[] = [
  {
    id: 'uw',
    label: 'Underwriter',
    short: 'Decides the file',
    sees: ['Credit bureaus', 'Account Aggregator', 'GSTN · MCA21', 'Your LOS'],
    does: ['tat', 'onepull', 'thinfile', 'fraud', 'mis'],
    cannot: ['Sanction above your delegation matrix', 'Decide without reason codes', 'Skip the Key Fact Statement'],
    actsIn: ['The file screen', 'The credit note'],
    handsBack: 'A scored file with the reasons written out, and the three it will not call.',
  },
  {
    id: 'credit',
    label: 'Credit Officer',
    short: 'Works the file',
    sees: ['The file queue', 'Account Aggregator', 'GSTN', 'Field photographs'],
    does: ['onepull', 'pd', 'tat', 'thinfile', 'fraud'],
    cannot: ['Approve its own deviation', 'Close a PD without the officer’s sign-off'],
    actsIn: ['The file screen', 'The branch tablet'],
    handsBack: 'The file with the gaps named, and the PD written up before you reach the office.',
  },
  {
    id: 'verify',
    label: 'Verification Officer',
    short: 'Proves who they are',
    sees: ['KYC records', 'Device and address graph', 'CERSAI', 'Field photographs'],
    does: ['fraud', 'onepull', 'pd', 'inspect', 'tat'],
    cannot: ['Tag fraud without the 21-day SCN', 'Hold a document past its DPDP consent'],
    actsIn: ['The verification queue', 'The field app'],
    handsBack: 'The cluster, not the case: who else shares this device, address or account.',
  },
  {
    id: 'collections',
    label: 'Collections Manager',
    short: 'Brings the money back',
    sees: ['The ledger', 'NACH returns', 'Promise-to-pay history', 'Field GPS logs'],
    does: ['stress', 'field', 'followup', 'mis', 'inspect'],
    cannot: ['Call outside 8am–7pm', 'Contact a third party', 'Act without DRA certification'],
    actsIn: ['The dialler', 'The field officer app', 'WhatsApp'],
    handsBack: 'Tomorrow’s route, ordered by who will actually pay.',
  },
  {
    id: 'sales',
    label: 'Sales Manager',
    short: 'Carries the target',
    sees: ['The lead book', 'The funnel by stage', 'Officer activity', 'Disbursal ledger'],
    does: ['deck', 'pipeline', 'productivity', 'followup', 'target'],
    cannot: ['Quote a rate', 'Promise a sanction', 'Contact a lead who has opted out'],
    actsIn: ['The sales dashboard', 'WhatsApp', 'Your inbox'],
    handsBack: 'The month’s deck written from the ledger, and the three officers who need help.',
  },
  {
    id: 'branch',
    label: 'Branch Manager',
    short: 'Runs the counter',
    sees: ['Branch pipeline', 'Turnaround by stage', 'The exception log', 'Officer activity'],
    does: ['tat', 'followup', 'productivity', 'pipeline', 'deck'],
    cannot: ['Override a credit decision', 'Act without an audit entry'],
    actsIn: ['The branch dashboard', 'The morning huddle'],
    handsBack: 'What is stuck at this branch this morning, and who it is waiting on.',
  },
]

/* `node` is the short name used on the flywheel rim; a sentence will not fit
   there. `brief` is the line this want puts in tomorrow morning's message.
   `perFile` is minutes saved on each file; `perMonth` is hours saved a month
   regardless of volume. A want has one or the other, never both. */
export type Want = {
  id: string
  label: string
  node: string
  brief: string
  /** credit side or sales side, so the list can be read at a glance */
  side: 'credit' | 'sales'
  module: string | null
  perFile?: number
  perMonth?: number
}

export const WANTS = [
  { id: 'tat', side: 'credit', module: 'M1', label: 'Turnaround is days, not minutes', node: 'Turnaround', brief: '14 files scored overnight. 11 cleared policy, 3 need your eyes.', perFile: 30 },
  { id: 'onepull', side: 'credit', module: 'M1', label: 'Bureau, bank and GST live in five tabs', node: 'One pull', brief: 'Bureau, bank, GST and MCA pulled on one consent. Nothing to open.', perFile: 8 },
  { id: 'thinfile', side: 'credit', module: 'M1', label: 'Thin-file MSMEs get rejected', node: 'Cash-flow score', brief: 'Four thin-file applicants scored on 12 months of cash flow. Two clear policy.', perFile: 12 },
  { id: 'pd', side: 'credit', module: 'M4', label: 'The PD gets written up hours after the visit', node: 'PD write-up', brief: 'Yesterday’s three visits are written up, with the photographs and the location on each.', perFile: 20 },
  { id: 'fraud', side: 'credit', module: 'M3', label: 'Fraud shows up after disbursal', node: 'Cluster check', brief: 'Two applicants share a device with a written-off account. Held, SCN drafted.', perFile: 10 },
  { id: 'stress', side: 'credit', module: 'M2', label: 'Stress shows up at DPD 30, not day 1', node: 'Early warning', brief: 'Sharma Traders missed a NACH and skipped a GST filing. Tagged SMA-0 on day 1.', perMonth: 25 },
  { id: 'field', side: 'credit', module: 'M5', label: 'Field collections are a black box', node: 'Route planner', brief: 'Today’s route: 9 visits, ordered by promise-to-pay. Two are due a call first.', perMonth: 40 },
  { id: 'inspect', side: 'credit', module: 'M3', label: 'Inspection prep takes weeks', node: 'Returns filer', brief: 'CRILC and NBS-9 generated from the ledger. Four KFS documents are missing.', perMonth: 45 },
  { id: 'mis', side: 'credit', module: 'M2', label: 'Portfolio MIS is a month-end spreadsheet', node: 'Board pack', brief: 'The board pack is written. The FY24 Q3 cohort is rolling 1.8× faster than Q2.', perMonth: 32 },
  { id: 'deck', side: 'sales', module: 'M2', label: 'The monthly target deck eats a week', node: 'Target deck', brief: 'October’s deck is built from the ledger: target, achieved, by officer, by branch. Yours to edit.', perMonth: 24 },
  { id: 'pipeline', side: 'sales', module: 'M2', label: 'Nobody can say where the pipeline is stuck', node: 'Funnel read', brief: 'The funnel by stage: 38 files waiting on one document, 11 on a site visit.', perMonth: 18 },
  { id: 'productivity', side: 'sales', module: 'M2', label: 'I cannot see which officer needs help', node: 'Officer scorecard', brief: 'Files touched, time per stage and conversion, by officer. Three are stalling at the same step.', perMonth: 16 },
  { id: 'followup', side: 'sales', module: 'M1', label: 'Leads go cold before anyone calls back', node: 'Follow-up queue', brief: 'Today’s callbacks, ordered by how warm the lead still is. Nine were about to lapse.', perFile: 6 },
  { id: 'target', side: 'sales', module: 'M2', label: 'Targets are set on last month’s feeling', node: 'Target model', brief: 'Next month’s target by branch, from the last four months of conversion, not from a guess.', perMonth: 12 },
] as const satisfies readonly Want[]

export type WantId = (typeof WANTS)[number]['id']

export const VOLUMES = [100, 500, 2000, 10000] as const

export const READY: { name: string; img: string; seat: string; line: string }[] = [
  { name: 'Underwriting agent', img: '/img/workshop.jpg', seat: 'uw', line: 'Scores a thin-file MSME on cash flow, not only on a bureau score.' },
  { name: 'Field PD agent', img: '/img/kirana.jpg', seat: 'credit', line: 'Writes up the personal discussion from the visit, with photographs and location.' },
  { name: 'Early-warning agent', img: '/img/borrower.jpg', seat: 'collections', line: 'Catches the missed NACH long before the bucket does.' },
  { name: 'Collections agent', img: '/img/street.jpg', seat: 'collections', line: 'Routes the day by promise-to-pay and logs every visit with time and place.' },
  { name: 'Target-deck agent', img: '/img/desk-review.jpg', seat: 'sales', line: 'Builds the month’s sales deck from the ledger, by officer and by branch.' },
  { name: 'Pipeline agent', img: '/img/handshake.jpg', seat: 'sales', line: 'Says where files are stuck, and which lead is about to go cold.' },
  { name: 'Productivity agent', img: '/img/floor.jpg', seat: 'branch', line: 'Scores the desk, not the month: files touched, time per stage, conversion.' },
  { name: 'Verification agent', img: '/img/scrutiny.jpg', seat: 'verify', line: 'Links applicants by phone, device, address and bank account.' },
  { name: 'Inspection agent', img: '/img/files.jpg', seat: 'uw', line: 'Generates CRILC and NBS-9 from the ledger instead of retyping them.' },
]

/* How an agent is bought once it has been built. Indicative only — the real
   number depends on the book, which is why every tier ends in a conversation. */
export const PLANS = [
  {
    id: 'pilot',
    name: 'Pilot',
    price: 'Pay per loan',
    note: '30 days, one product line',
    best: false,
    includes: ['One agent, one desk', 'Your data in a sandbox', 'Cancel any time', 'No core migration'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'From ₹1.5L a month',
    note: 'For a single lending business',
    best: true,
    includes: ['Up to five agents', 'Live on your core', 'Monthly review with us', 'Support within one working day'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'On your book',
    note: 'Multi-product, multi-state',
    best: false,
    includes: ['Unlimited agents', 'Private tenant, your keys', 'Audit trail built for inspection', 'A named engineer'],
  },
]

/* The regimes an agent is held to. No list of cores, bureaus or vendors:
   naming third parties implies a partnership nobody has verified, and the
   founders have struck that before. */
export const SEALS = [
  'RBI MD-FRM 2024',
  'RBI DLD 2025',
  '90-day NPA · Apr 2026',
  'DPDP Act 2023',
  'AES-256 · TLS 1.3',
  'Immutable audit trail',
]
