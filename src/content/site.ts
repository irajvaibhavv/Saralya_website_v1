import {
  Activity,
  FileCheck2,
  PhoneCall,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

/* Site-wide copy and contact details. Keep claims to what has been approved for
   publication. */

export const CONTACT_EMAIL = 'info@saralya.in'

export type Module = {
  code: string
  tag: string
  name: string
  short: string
  body: string
  icon: LucideIcon
  img: string
  color: string
  bar: string
  wash: string
}

export const MODULES: Module[] = [
  {
    code: 'M1',
    tag: 'Origination',
    name: 'Saral Profile',
    short: 'Score and sanction in minutes.',
    body: 'Configurable BRE for SME, MSME, LAP, MFI JLG and unsecured retail. Bureau pulls, Account Aggregator, GSTN, MCA21 and CERSAI, all native.',
    icon: FileCheck2,
    img: '/img/agreement.jpg',
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
  },
  {
    code: 'M2',
    tag: 'Early warning & analytics',
    name: 'Saral Drishti',
    short: 'See stress on day 1, not day 31.',
    body: 'A deterioration index fed by AA, GST velocity, bureau activity at other lenders and behaviour, with vintage, roll-rate and board packs cut from the same ledger.',
    icon: Activity,
    img: '/img/kirana.jpg',
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
  },
  {
    code: 'M3',
    tag: 'Fraud & compliance',
    name: 'Saral Trust',
    short: 'Catch fraud before it books.',
    body: 'Real-time application and transaction fraud signals, network analysis across applicant clusters, and the compliance checks an inspector asks for, mapped to the regimes they come from.',
    icon: ScanSearch,
    img: '/img/scrutiny.jpg',
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
  },
  {
    code: 'M4',
    tag: 'Field & branch',
    name: 'Saral Mitra',
    short: 'The officer’s companion in the field.',
    body: 'A branch and field officer app: AI-assisted personal discussion, the day routed by promise-to-pay date, and every visit logged with time, location and outcome.',
    icon: PhoneCall,
    img: '/img/rider.jpg',
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
  },
  {
    code: 'M5',
    tag: 'Collections & resolution',
    name: 'Saral Samadhan',
    short: 'Strategy-led, not bucket-led.',
    body: 'Bucket-strategy collections with an RPC-first dialler, skip-tracing, settlement workflows and automated Section 138 / SARFAESI preparation from the ledger.',
    icon: ShieldCheck,
    img: '/img/ledger.jpg',
    color: 'text-accent',
    bar: 'bg-accent',
    wash: 'bg-wash',
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
