import {
  Activity,
  BarChart3,
  FileCheck2,
  PhoneCall,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

/* Copy is sourced from saralya.in and the founder-approved corrections brief
   (see CLAUDE.md → Content sources). Keep claims to what appears there. */

export const CONTACT_EMAIL = 'info@saralya.in'

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
    body: 'Configurable BRE for SME, MSME, LAP, MFI JLG and unsecured retail. Bureau pulls, Account Aggregator, GSTN, MCA21 and CERSAI, all native.',
    icon: FileCheck2,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['CIBIL · Experian · CRIF', 'AA: all 9 ReBIT FI types', 'GSTN · MCA21 · CERSAI'],
  },
  {
    code: 'M2',
    tag: 'Fraud',
    name: 'Saral Screen',
    short: 'Catch fraud before it books.',
    body: 'Real-time application and transaction fraud signals. Network analysis across applicant clusters. 21-day SCN workflow built in.',
    icon: ScanSearch,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['Real-time signals', 'Cluster network analysis', 'SBI vs. Rajesh Agarwal compliant'],
  },
  {
    code: 'M3',
    tag: 'Early warning',
    name: 'Saral Watch',
    short: 'See stress on day 1, not day 31.',
    body: 'Post-disbursement deterioration index fed by AA, GST velocity, bureau activity on other lenders and behavioural data.',
    icon: Activity,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['SMA-0 tagging at day 1', 'GST velocity + AA feeds', 'Cross-lender bureau activity'],
  },
  {
    code: 'M4',
    tag: 'Collections',
    name: 'Saral Recover',
    short: 'Strategy-led, not bucket-led.',
    body: 'Bucket-strategy collections with an RPC-first dialler, a DRA-trained field officer app, skip-tracing and automated Section 138 / SARFAESI prep.',
    icon: PhoneCall,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['RPC-first dialler', 'Field officer app', 'Sec 138 / SARFAESI prep'],
  },
  {
    code: 'M5',
    tag: 'Analytics',
    name: 'Saral Insight',
    short: 'Board-ready, auto-generated.',
    body: 'Vintage analysis, roll-rate dashboards, peer-cohort benchmarking and customer LTV. Daily, weekly and quarterly reports without a data team.',
    icon: BarChart3,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['Vintage + roll-rate', 'Peer-cohort benchmarks', 'Board packs on schedule'],
  },
  {
    code: 'M6',
    tag: 'Compliance',
    name: 'Saral Comply',
    short: 'Inspection pack in 4 clicks.',
    body: '600+ checks mapped to RBI MD-FRM, DLD 2025, KYC MD, DPDP and PMLA. CRILC, NBS-9 and DNBS returns pre-mapped. CIMS-ready.',
    icon: ShieldCheck,
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
    points: ['600+ mapped checks', 'CRILC · NBS-9 · DNBS', 'CIMS-ready'],
  },
]

export const CONVICTIONS = [
  {
    n: '01',
    title: 'Compliance is architecture, not a feature.',
    body: 'RBI MD-FRM, DLD 2025, DPDP, the SBI vs. Rajesh Agarwal SCN ruling. These belong in the foundation. Bolting them on later is what creates inspection observations.',
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
