import type { ChallengeId } from './saral-ai'

/* The /agents page. Three pieces of data:
   SEATS  — the architecture, one column per desk. Every agent is the same
            five layers; only the labels change.
   WORK   — what each flow looks like the morning after, and what it saves.
            Minutes are per file, hours are per month. They are MARGINAL, not
            absolute: `tat` carries the whole data-gathering saving and the
            flows that overlap it are scored only for what they add on top,
            so ticking everything cannot inflate the total. Deliberately
            conservative, and the arithmetic is shown on screen, because a
            saving we can't defend is worse than no number at all.
   READY  — the six agents someone can start from instead of a blank form. */

export type Seat = {
  id: string
  label: string
  short: string
  sees: string[]
  does: ChallengeId[]
  cannot: string[]
  actsIn: string[]
  handsBack: string
}

export const SEATS: Seat[] = [
  {
    id: 'uw',
    label: 'Underwriter',
    short: 'Decides the file',
    sees: ['CIBIL · Experian · CRIF', 'Account Aggregator', 'GSTN · MCA21', 'Your LOS'],
    does: ['tat', 'tabs', 'fraud'],
    cannot: ['Sanction above your delegation matrix', 'Decide without reason codes', 'Skip the Key Fact Statement'],
    actsIn: ['The file screen', 'The credit note'],
    handsBack: 'A scored file with the reasons written out, and the three it will not call.',
  },
  {
    id: 'rm',
    label: 'Relationship Manager',
    short: 'Faces the customer',
    sees: ['Bureau summary', 'Account Aggregator', 'GSTN', 'Your product policy'],
    does: ['tat', 'tabs'],
    cannot: ['Quote a rate', 'Issue a sanction letter', 'Ask for a document already on file'],
    actsIn: ['WhatsApp', 'The branch tablet'],
    handsBack: 'An in-principle answer while the customer is still at the counter.',
  },
  {
    id: 'verify',
    label: 'Verification Officer',
    short: 'Proves who they are',
    sees: ['KYC records', 'Device and address graph', 'CERSAI', 'Field photographs'],
    does: ['fraud', 'tabs'],
    cannot: ['Tag fraud without the 21-day SCN', 'Hold a document past its DPDP consent'],
    actsIn: ['The verification queue', 'The field app'],
    handsBack: 'The cluster, not the case: who else shares this device, address or account.',
  },
  {
    id: 'collections',
    label: 'Collections Manager',
    short: 'Brings the money back',
    sees: ['The ledger', 'NACH returns', 'Promise-to-pay history', 'Call recordings', 'Field GPS logs'],
    does: ['stress', 'field', 'mis'],
    cannot: ['Call outside 8am–7pm', 'Contact a third party', 'Act without DRA certification'],
    actsIn: ['The dialler', 'The field officer app', 'WhatsApp'],
    handsBack: 'Tomorrow’s route, ordered by who will actually pay.',
  },
  {
    id: 'legal',
    label: 'Legal Officer',
    short: 'Runs the notices',
    sees: ['The ledger', 'Notice history', 'SARFAESI timeline', 'Section 138 triggers'],
    does: ['inspect', 'fraud', 'stress'],
    cannot: ['File before the 21-day SCN closes', 'Shorten the demand notice period'],
    actsIn: ['The notice queue', 'The legal pack'],
    handsBack: 'Every notice due this week, drafted, with the clock on each one.',
  },
  {
    id: 'ops',
    label: 'Operations',
    short: 'Keeps it running',
    sees: ['Your core', 'The LOS', 'The disbursal queue', 'The exception log'],
    does: ['core', 'tabs', 'tat'],
    cannot: ['Write to the ledger', 'Override an exception on its own', 'Act without an audit entry'],
    actsIn: ['The exception queue', 'The ops dashboard'],
    handsBack: 'The exceptions only, with everything that cleared itself already gone.',
  },
]

/* `node` is the short name used on the flywheel rim; a sentence will not
   fit there. `brief` is the line this flow puts in tomorrow morning's message.
   `perFile` is minutes saved on each file; `perMonth` is hours saved a month
   regardless of volume. A flow has one or the other, never both. */
export const WORK: Record<ChallengeId, { node: string; brief: string; perFile?: number; perMonth?: number }> = {
  tat: { node: 'Turnaround', brief: '14 files scored overnight. 11 cleared policy, 3 need your eyes.', perFile: 30 },
  tabs: { node: 'One pull', brief: 'Bureau, bank, GST and MCA pulled on one consent. Nothing to open.', perFile: 8 },
  fraud: { node: 'Cluster check', brief: 'Two applicants share a device with a written-off account. Held, SCN drafted.', perFile: 10 },
  stress: { node: 'Early warning', brief: 'Sharma Traders missed a NACH and skipped a GST filing. Tagged SMA-0 on day 1.', perMonth: 25 },
  field: { node: 'Route planner', brief: 'Today’s route: 9 visits, ordered by promise-to-pay. Two are due a call first.', perMonth: 40 },
  mis: { node: 'Board pack', brief: 'The board pack is written. The FY24 Q3 cohort is rolling 1.8× faster than Q2.', perMonth: 32 },
  inspect: { node: 'Returns filer', brief: 'CRILC and NBS-9 generated from the ledger. Four KFS documents are missing.', perMonth: 45 },
  core: { node: 'Core bridge', brief: 'Reading your core live. No migration, nothing retyped.' },
}

export const VOLUMES = [100, 500, 2000, 10000] as const

export const READY: { name: string; img: string; seat: string; line: string }[] = [
  { name: 'Underwriting agent', img: '/img/workshop.jpg', seat: 'uw', line: 'Scores a thin-file MSME on cash flow, not only on a bureau score.' },
  { name: 'Early-warning agent', img: '/img/borrower.jpg', seat: 'collections', line: 'Catches the missed NACH long before the bucket does.' },
  { name: 'Collections agent', img: '/img/street.jpg', seat: 'collections', line: 'Routes the day by promise-to-pay and logs every visit with time and place.' },
  { name: 'Inspection agent', img: '/img/files.jpg', seat: 'legal', line: 'Generates CRILC and NBS-9 from the ledger instead of retyping them.' },
  { name: 'Verification agent', img: '/img/shopfront.jpg', seat: 'verify', line: 'Links applicants by phone, device, address and bank account.' },
  { name: 'Portfolio agent', img: '/img/meeting.jpg', seat: 'ops', line: 'Cuts the book by vintage and writes the board pack on schedule.' },
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
