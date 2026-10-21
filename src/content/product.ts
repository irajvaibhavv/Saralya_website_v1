/* The product page, as the lead designed it: the operating system, the
   problem it answers, the five agents around one borrower profile, and the
   PQM view each desk gets.

   Every word here is the lead's own draft, ported from his HTML.

   TODO(Vikas): two figures carry claims we have not verified — the CML is
   described as trained on "6 mn anonymised loans", and the back-test line
   says "18% more approvals at the same loss rate" on one NBFC's 2021–24
   applications. Both need a source before launch. Dashboard numbers are
   marked as sample data on the page itself. */

/* status tone → how a chip reads. Status only, never identity. */
export type Tone = 'good' | 'warn' | 'critical' | 'info' | 'neutral'

/* ── the stack, as the hero draws it ──────────────────────────────────── */
export const DECISIONS = ['Approve', 'Price', 'Verify', 'Disburse', 'Collect']
export const SYSTEMS = ['Core banking', 'LOS / LMS', 'Bureau', 'Account Aggregator', 'Excel & WhatsApp']
export const LAYER = ['Credit Machine Learning models (CML)', 'AI agents']

/* ── the three cards under the hero ───────────────────────────────────── */
export const MODULES: { name: string; state: string }[] = [
  { name: 'Onboarding', state: 'Live' },
  { name: 'Underwriting', state: 'Live' },
  { name: 'EWS', state: 'In development' },
  { name: 'Collections', state: 'Live' },
]

export const SIGNALS = [
  { k: 'Primary', v: 'Bureau + GST' },
  { k: 'Alternate', v: 'Bank statements' },
  { k: 'Behaviour', v: 'Voice & intent' },
]

/* ── who is looking, and what their PQM shows ─────────────────────────── */
export type Kpi = { k: string; v: string; d: string; tone: Tone }
export type Row = { k: string; n: number; v: string; tone?: Tone; chip?: boolean }
export type Trow = { id: string; p: string; amt: string; s: string; tone: Tone }

export type Persona = {
  role: string
  hint: string
  view: string
  period: string
  kpis: Kpi[]
  chart:
    | { type: 'plan'; title: string; cols: { m: string; h: number; p: number }[] }
    | { type: 'rows'; title: string; rows: Row[] }
    | { type: 'table'; title: string; trows: Trow[] }
  insight: string
}

export const PERSONAS: Persona[] = [
  {
    role: 'CEO & Owners',
    hint: 'Growth, margin, risk',
    view: 'Business health',
    period: 'Sep 2026',
    kpis: [
      { k: 'AUM', v: '₹1,240 Cr', d: '+18% YoY', tone: 'good' },
      { k: 'Disbursals', v: '₹86 Cr', d: '92% of plan', tone: 'warn' },
      { k: 'NIM', v: '7.9%', d: '−0.3 pts QoQ', tone: 'warn' },
      { k: 'Gross NPA', v: '2.1%', d: '−0.2 pts QoQ', tone: 'good' },
    ],
    chart: {
      type: 'plan',
      title: 'Disbursals vs plan · ₹ Cr',
      cols: [
        { m: 'Apr', h: 78, p: 80 },
        { m: 'May', h: 81, p: 82 },
        { m: 'Jun', h: 84, p: 85 },
        { m: 'Jul', h: 80, p: 88 },
        { m: 'Aug', h: 88, p: 92 },
        { m: 'Sep', h: 86, p: 94 },
      ],
    },
    insight: 'Disbursals 8% behind plan. Indore and Nagpur drive the gap.',
  },
  {
    role: 'CRO',
    hint: 'Risk before it rolls',
    view: 'Portfolio risk',
    period: 'Sep 2026',
    kpis: [
      { k: 'Gross NPA', v: '2.1%', d: '−0.2 pts QoQ', tone: 'good' },
      { k: 'SMA-1 + SMA-2', v: '3.6%', d: '+0.4 pts MoM', tone: 'warn' },
      { k: '0→30 roll-forward', v: '14.2%', d: '+1.8 pts MoM', tone: 'warn' },
      { k: 'Early warnings', v: '38', d: 'new this week', tone: 'critical' },
    ],
    chart: {
      type: 'rows',
      title: 'Where the book sits today',
      rows: [
        { k: 'Current', n: 88.2, v: '88.2%', tone: 'good', chip: true },
        { k: 'SMA-0', n: 6.1, v: '6.1%', tone: 'warn', chip: true },
        { k: 'SMA-1', n: 2.4, v: '2.4%', tone: 'warn', chip: true },
        { k: 'SMA-2', n: 1.2, v: '1.2%', tone: 'warn', chip: true },
        { k: 'NPA', n: 2.1, v: '2.1%', tone: 'critical', chip: true },
      ],
    },
    insight: 'FY25 Q2 cohort is ageing worst: 3.4% at 90+ DPD.',
  },
  {
    role: 'CBO',
    hint: 'Funnel and TAT',
    view: 'Growth and funnel',
    period: 'Sep 2026',
    kpis: [
      { k: 'Logins', v: '2,140', d: '+6% MoM', tone: 'good' },
      { k: 'Login to disbursal', v: '6.4 days', d: 'target 4 days', tone: 'warn' },
      { k: 'Approval rate', v: '62%', d: '+2 pts MoM', tone: 'good' },
      { k: 'Disbursed', v: '1,180 files', d: '₹86 Cr', tone: 'neutral' },
    ],
    chart: {
      type: 'rows',
      title: 'September funnel',
      rows: [
        { k: 'Leads', n: 5200, v: '5,200' },
        { k: 'Logins', n: 2140, v: '2,140' },
        { k: 'Sanctioned', n: 1330, v: '1,330' },
        { k: 'Disbursed', n: 1180, v: '1,180' },
      ],
    },
    insight: '41% of drop-offs are files waiting on documents.',
  },
  {
    role: 'CCO',
    hint: 'Recovery and cost to collect',
    view: 'Collections and recovery',
    period: 'Sep 2026',
    kpis: [
      { k: 'Collection efficiency', v: '96.4%', d: '−0.8 pts MoM', tone: 'warn' },
      { k: 'Bounce rate', v: '11.8%', d: '+1.1 pts MoM', tone: 'warn' },
      { k: 'Cost per ₹100 collected', v: '₹1.15', d: '−₹0.20 QoQ', tone: 'good' },
      { k: 'Self-cure rate', v: '38%', d: 'no visit needed', tone: 'good' },
    ],
    chart: {
      type: 'rows',
      title: 'Resolved this month, by bucket',
      rows: [
        { k: 'SMA-0', n: 78, v: '78%', tone: 'warn', chip: true },
        { k: 'SMA-1', n: 52, v: '52%', tone: 'warn', chip: true },
        { k: 'SMA-2', n: 31, v: '31%', tone: 'warn', chip: true },
        { k: 'NPA', n: 9, v: '9%', tone: 'critical', chip: true },
      ],
    },
    insight: 'Indore SMA-1 cures fell 9 pts. Move callers there first.',
  },
  {
    role: 'Underwriting teams',
    hint: 'Today’s queue, pre-read',
    view: 'Today’s credit queue',
    period: '19 Oct 2026',
    kpis: [
      { k: 'Files in queue', v: '48', d: '7 need judgement', tone: 'info' },
      { k: 'Time per file', v: '38 min', d: '−12 min vs Aug', tone: 'good' },
      { k: 'Rework', v: '6%', d: 'files sent back', tone: 'warn' },
      { k: 'SLA breaches', v: '3', d: 'past 24 hours', tone: 'critical' },
    ],
    chart: {
      type: 'table',
      title: 'Needs your judgement · oldest first',
      trows: [
        { id: 'APP/SRT/2026/005134', p: 'LAP', amt: '₹28.0 L', s: 'Deviation note drafted', tone: 'info' },
        { id: 'APP/IDR/2026/005120', p: 'Business loan', amt: '₹9.5 L', s: 'Bank statement short', tone: 'warn' },
        { id: 'APP/NGP/2026/005141', p: 'Home loan', amt: '₹31.5 L', s: 'Name mismatch', tone: 'critical' },
        { id: 'APP/JPR/2026/004812', p: 'LAP', amt: '₹42.0 L', s: 'Ready to decide', tone: 'good' },
      ],
    },
    insight: '41 of 48 files pre-read. 7 need your judgement.',
  },
  {
    role: 'FOS teams',
    hint: 'Visits, rework, CAC',
    view: 'Field productivity',
    period: 'Sep 2026',
    kpis: [
      { k: 'Files per FOS', v: '14 / month', d: 'target 20', tone: 'warn' },
      { k: 'Visits per file', v: '2.6', d: 'target 1.5', tone: 'warn' },
      { k: 'Rework', v: '18%', d: 'files sent back', tone: 'critical' },
      { k: 'CAC per file', v: '₹4,200', d: '+9% QoQ', tone: 'warn' },
    ],
    chart: {
      type: 'rows',
      title: 'Where field time goes',
      rows: [
        { k: 'Repeat visits', n: 41, v: '41%', tone: 'warn' },
        { k: 'Document rework', n: 27, v: '27%', tone: 'warn' },
        { k: 'Travel', n: 20, v: '20%' },
        { k: 'With the customer', n: 12, v: '12%', tone: 'good' },
      ],
    },
    insight: 'Repeat visits eat about ₹1,700 of the ₹4,200 CAC per file.',
  },
  {
    role: 'Collection teams',
    hint: 'Who to call first',
    view: 'Collections today',
    period: '19 Oct 2026',
    kpis: [
      { k: 'Bounced EMIs', v: '212', d: 'sorted by channel', tone: 'neutral' },
      { k: 'Promises kept', v: '64%', d: '+5 pts MoM', tone: 'good' },
      { k: 'Field visits', v: '21', d: 'planned today', tone: 'info' },
      { k: 'Visits per collector', v: '7 / day', d: 'target 10', tone: 'warn' },
    ],
    chart: {
      type: 'rows',
      title: 'Best channel for each bounced EMI',
      rows: [
        { k: 'WhatsApp reminder', n: 141, v: '141' },
        { k: 'Phone call', n: 50, v: '50' },
        { k: 'Field visit', n: 21, v: '21', tone: 'warn' },
      ],
    },
    insight: 'Start with the 21 field visits: ₹1.9 Cr overdue.',
  },
]

/* ── the five agents, around one profile ──────────────────────────────── */
export type Agent = {
  no: number
  name: string
  role: string
  /** the lead's own colour per agent, kept from his design */
  color: string
  soft: string
  status: string
  tone: Tone
  does: string
  kpis: string[]
  /** where the node and its labels sit on the ring, in % */
  at: { x: number; y: number }
  label: { x: number; y: number }
  arc: { x: number; y: number }
}

export const AGENTS: Agent[] = [
  {
    no: 1,
    name: 'Saral Profile',
    role: 'Onboarding · like your sales officer',
    color: '#17775f',
    soft: 'rgba(23,119,95,0.18)',
    status: 'Live',
    tone: 'good',
    does: 'Fills the application with the borrower by voice, no typing.',
    kpis: ['Fewer repeat visits', 'Lower CAC'],
    at: { x: 50, y: 14.29 },
    label: { x: 50, y: 22.7 },
    arc: { x: 74.7, y: 16.1 },
  },
  {
    no: 2,
    name: 'Saral Drishti',
    role: 'Credit signals · like your credit analyst',
    color: '#1e6fa8',
    soft: 'rgba(30,111,168,0.18)',
    status: 'Live',
    tone: 'good',
    does: 'Scores the risk with the CML, and shows the reasons.',
    kpis: ['Faster credit decisions', 'Explainable approvals'],
    at: { x: 83.96, y: 38.96 },
    label: { x: 83.96, y: 47.4 },
    arc: { x: 89.9, y: 63 },
  },
  {
    no: 3,
    name: 'Saral Trust',
    role: 'Personal discussion · like your field investigator',
    color: '#3b4fb8',
    soft: 'rgba(59,79,184,0.18)',
    status: 'Live',
    tone: 'good',
    does: 'Tests the borrower’s story against their data. Some files skip the field visit.',
    kpis: ['Fewer field visits', 'More files per officer'],
    at: { x: 71, y: 78.89 },
    label: { x: 71, y: 87.3 },
    arc: { x: 50, y: 92 },
  },
  {
    no: 4,
    name: 'Saral Mitra',
    role: 'Borrower co-pilot · on the borrower’s phone',
    color: '#b0500c',
    soft: 'rgba(176,80,12,0.18)',
    status: 'In development',
    tone: 'info',
    does: 'Helps the borrower in their own language, and flags stress early.',
    kpis: ['Repeat loans', 'Early warnings'],
    at: { x: 29, y: 78.89 },
    label: { x: 29, y: 87.3 },
    arc: { x: 10.1, y: 63 },
  },
  {
    no: 5,
    name: 'Saral Samadhan',
    role: 'Collections · like your collections officer',
    color: '#8a6d12',
    soft: 'rgba(138,109,18,0.2)',
    status: 'Live',
    tone: 'good',
    does: 'Sends each overdue account to the channel most likely to recover it.',
    kpis: ['Collection efficiency', 'Lower cost to collect'],
    at: { x: 16.04, y: 38.96 },
    label: { x: 16.04, y: 47.4 },
    arc: { x: 25.3, y: 16.1 },
  },
]

/** what travels along each arc, in the same order as the agents */
export const ARC_LABELS = ['Application', 'Risk brief', 'Lender decides', 'Early warning', 'Repayment outcomes']

/** the five arcs of the ring, drawn on a 560 × 560 board */
export const ARC_PATHS = [
  'M328.4 85.9 A200 200 0 0 1 449.6 174.0',
  'M479.5 266.0 A200 200 0 0 1 433.2 408.6',
  'M354.9 465.4 A200 200 0 0 1 205.1 465.4',
  'M126.8 408.6 A200 200 0 0 1 80.5 266.0',
  'M110.4 174.0 A200 200 0 0 1 231.6 85.9',
]

/* ── the lifecycle, one engine ────────────────────────────────────────── */
export const STAGES: { name: string; how: string; chip: string; tone: Tone }[] = [
  { name: 'Source', how: 'WhatsApp, by voice', chip: 'Onboarding · Live', tone: 'good' },
  { name: 'Acquire', how: 'Borrower app, by voice', chip: 'Onboarding · Live', tone: 'good' },
  { name: 'Underwrite', how: 'CML score + AI-guided PD', chip: 'CML · Live', tone: 'good' },
  { name: 'Disburse', how: 'You decide', chip: 'Your decision', tone: 'neutral' },
  { name: 'Engage & monitor', how: 'Signals after disbursal', chip: 'Engagement · In development', tone: 'info' },
  { name: 'Collect', how: 'Next-best action', chip: 'Collections · Live', tone: 'good' },
]

/* ── the problem, and what fixes it ───────────────────────────────────── */
export const PROBLEMS = [
  { n: '01', t: 'You can’t measure your field.', kind: 'blanks' as const },
  { n: '02', t: 'Every decision runs on people.', kind: 'chain' as const },
  { n: '03', t: 'Your best judgement walks out the door.', kind: 'leaves' as const },
  { n: '04', t: 'Six versions of the truth.', kind: 'truths' as const },
]

export const BLANKS = ['Time per file', 'Rework %', 'Error rate', 'CAC per file']
export const CHAIN = ['Lead', 'Login', 'Credit', 'Ops', 'Payout']
export const LEAVES = ['Policy exceptions', 'Local market sense', 'Fraud patterns']
export const TRUTHS = [
  { k: 'LOS', v: '₹1,236 Cr' },
  { k: 'Excel', v: '₹1,241 Cr' },
  { k: 'MIS deck', v: '₹1,229 Cr' },
  { k: 'Core', v: '₹1,238 Cr' },
  { k: 'WhatsApp', v: '₹1,244 Cr' },
  { k: 'Email', v: '₹1,233 Cr' },
]

export const PRESSURES = [
  {
    t: 'Pressure on NIM',
    chips: ['Funding stays costly', 'Banks undercut on price', 'RBI watches pricing'],
    body: 'Control what you can: cost to serve and credit losses.',
    kind: 'nim' as const,
  },
  { t: 'Unit economics under pressure', chips: [], body: '', kind: 'unit' as const },
  { t: 'Scaling gets harder', chips: [], body: 'Double the book, double the team.', kind: 'scale' as const },
]

export const FIXES = [
  { problem: 'Field unmeasured', fix: 'Every file and visit tracked', kpi: 'Productivity ↑' },
  { problem: 'Decisions run on people', fix: 'Agents prepare, people decide', kpi: 'Margin ↑' },
  { problem: 'Judgement leaves with people', fix: 'Judgement built into the CML', kpi: 'Risk ↓' },
  { problem: 'Six versions of the truth', fix: 'One borrower profile, one number', kpi: 'Engagement ↑' },
]

