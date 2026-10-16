import { motion } from 'motion/react'
import { Container, Section, SectionHead } from '../components/ui/Section'

/* TEMPORARY: /lab — candidate charts for the "Built ground-up for Digital
   Lending" card, in the real card frame. Charts a credit team reads, none
   of them a bar. Pick one; this file, its route in App.tsx and the rest go.

   Every figure is illustrative. */

const EASE = [0.22, 1, 0.36, 1] as const
/** a gaussian, sampled across the width, as an SVG polyline */
const bell = (mu: number, sd: number, h: number, w = 240, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = (i / n) * w
    const y = h - Math.exp(-((x - mu) ** 2) / (2 * sd ** 2)) * h
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

export function Lab() {
  const charts: [string, React.ReactNode][] = [
    ['01 · Gains curve, against a generic model', <Gains key="1" />],
    ['02 · KS separation — good files from bad', <KS key="2" />],
    ['03 · Where the book flows', <Sankey key="3" />],
    ['04 · Score distribution, cohort by cohort', <Ridge key="4" />],
    ['05 · The book over twelve months', <Stream key="5" />],
    ['06 · The line it draws', <Boundary key="6" />],
  ]
  return (
    <Section>
      <Container>
        <SectionHead
          eyebrow="Lab · temporary"
          title={
            <>
              Six charts, <span className="text-accent">no bars</span>.
            </>
          }
          lede="Same card, same size, real chart types. Tell me a number."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {charts.map(([label, node]) => (
            <div key={label} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line">
              <div className="relative h-[190px] overflow-hidden bg-gradient-to-b from-wash2 to-white">{node}</div>
              <div className="p-6 pt-5">
                <div className="font-mono text-label uppercase tracking-[0.12em] text-accent">{label}</div>
                <div className="mt-2 text-h3 font-extrabold leading-snug tracking-[-0.02em]">Built ground-up for Digital Lending.</div>
                <p className="mt-2 text-body text-muted">Trained on BFSI data, not a generic model.</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Badge({ children = 'BFSI-trained' }: { children?: string }) {
  return (
    <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-2.5 py-1 font-mono text-label text-accent shadow-sm">
      {children}
    </div>
  )
}

/* 01 — the canonical model chart: what share of the defaults you catch in
   the riskiest slice of the book. The diagonal is random; a generic model
   barely beats it. */
function Gains() {
  const W = 250
  const H = 112
  const curve = (k: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = i / 40
      const y = 1 - (1 - x) ** k
      return `${i ? 'L' : 'M'}${(x * W).toFixed(1)} ${(H - y * H).toFixed(1)}`
    }).join(' ')

  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox={`0 0 ${W} ${H + 16}`} className="h-[132px] w-full">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H - g * H} y2={H - g * H} className="stroke-line" strokeWidth="1" strokeDasharray="2 5" />
        ))}
        <line x1="0" y1={H} x2={W} y2={H} className="stroke-line2" strokeWidth="1" />
        {/* random */}
        <line x1="0" y1={H} x2={W} y2="0" className="stroke-ink2/25" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* a general model */}
        <motion.path
          d={curve(2)}
          fill="none"
          strokeWidth="1.8"
          className="stroke-ink2/45"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        />
        {/* ours */}
        <motion.path
          d={curve(7)}
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="stroke-accent"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
        />
        <text x={W * 0.3} y={H - 0.78 * H - 6} className="fill-accent font-mono text-[9px] font-bold">
          ours
        </text>
        <text x={W * 0.54} y={H - 0.46 * H + 12} className="fill-muted font-mono text-[9px]">
          general model
        </text>
        <text x="0" y={H + 13} className="fill-hint font-mono text-[9px]">
          riskiest 10%
        </text>
        <text x={W} y={H + 13} textAnchor="end" className="fill-hint font-mono text-[9px]">
          whole book
        </text>
      </svg>
    </div>
  )
}

/* 02 — the separation itself: where the good files sit against the bad */
function KS() {
  const W = 240
  const H = 80
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="h-[132px] w-full">
        <line x1="0" y1={H} x2={W} y2={H} className="stroke-line2" strokeWidth="1" />
        <motion.path
          d={`${bell(78, 30, H)} L ${W} ${H} L 0 ${H} Z`}
          className="fill-red/15 stroke-red"
          strokeWidth="1.6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.path
          d={`${bell(168, 34, H)} L ${W} ${H} L 0 ${H} Z`}
          className="fill-accent/20 stroke-accent"
          strokeWidth="2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.line
          x1="123"
          x2="123"
          y1="4"
          y2={H}
          className="stroke-ink"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />
        <text x="123" y="0" dy="10" textAnchor="middle" className="fill-ink font-mono text-[9px] font-bold">
          cut-off
        </text>
        <text x="50" y={H + 14} textAnchor="middle" className="fill-red font-mono text-[9px]">
          defaults
        </text>
        <text x="186" y={H + 14} textAnchor="middle" className="fill-accent font-mono text-[9px]">
          good files
        </text>
      </svg>
    </div>
  )
}

/* 03 — a sankey: what each bucket did this month, by weight of flow */
const LINKS = [
  { from: 0, to: 0, w: 15, tone: 'stroke-accent/50' },
  { from: 0, to: 1, w: 4, tone: 'stroke-amber/60' },
  { from: 1, to: 1, w: 6, tone: 'stroke-amber/60' },
  { from: 1, to: 2, w: 9, tone: 'stroke-red/60' },
  { from: 2, to: 2, w: 11, tone: 'stroke-red/60' },
  { from: 2, to: 0, w: 5, tone: 'stroke-accent/50' },
]
const NODES = ['Current', 'SMA', 'NPA risk']

function Sankey() {
  const y = (i: number) => 18 + i * 38
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox="0 0 250 108" className="h-[132px] w-full">
        {LINKS.map((l, i) => (
          <motion.path
            key={i}
            d={`M70 ${y(l.from)} C 130 ${y(l.from)}, 130 ${y(l.to)}, 190 ${y(l.to)}`}
            fill="none"
            strokeWidth={l.w}
            strokeLinecap="round"
            className={l.tone}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
          />
        ))}
        {NODES.map((n, i) => (
          <g key={n}>
            <rect x="60" y={y(i) - 13} width="6" height="26" rx="3" className="fill-ink" />
            <rect x="194" y={y(i) - 13} width="6" height="26" rx="3" className="fill-ink" />
            <text x="54" y={y(i) + 3} textAnchor="end" className="fill-muted font-mono text-[9px]">
              {n}
            </text>
            <text x="206" y={y(i) + 3} className="fill-muted font-mono text-[9px]">
              {n}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* 04 — a ridgeline: the whole score distribution, one cohort per ridge */
const RIDGES = [
  { k: 'Sep', mu: 168, sd: 30 },
  { k: 'Aug', mu: 152, sd: 32 },
  { k: 'Jul', mu: 120, sd: 38 },
  { k: 'Jun', mu: 142, sd: 30 },
]

function Ridge() {
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox="0 0 250 122" className="h-[132px] w-full">
        {RIDGES.map((r, i) => (
          <g key={r.k} transform={`translate(26, ${i * 26})`}>
            <motion.path
              d={`${bell(r.mu, r.sd, 34, 224)} L 224 34 L 0 34 Z`}
              className={i === 2 ? 'fill-red/20 stroke-red' : 'fill-accent/15 stroke-accent/70'}
              strokeWidth="1.5"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
            />
            <text x="-6" y="31" textAnchor="end" className={`font-mono text-[9px] ${i === 2 ? 'fill-red font-bold' : 'fill-hint'}`}>
              {r.k}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* 05 — a streamgraph: the shape of the book, month by month */
const BANDS = [
  { tone: 'fill-accent/70', amp: 16, base: 26, ph: 0 },
  { tone: 'fill-accent/40', amp: 10, base: 18, ph: 1.2 },
  { tone: 'fill-amber/50', amp: 7, base: 11, ph: 2.4 },
  { tone: 'fill-red/45', amp: 5, base: 7, ph: 3.6 },
]

function Stream() {
  const W = 250
  const N = 40
  let floor = Array.from({ length: N + 1 }, () => 100)
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox="0 0 250 108" className="h-[132px] w-full">
        {BANDS.map((b, bi) => {
          const top = floor.map((f, i) => f - (b.base + Math.sin(i / 5 + b.ph) * (b.amp / 2)))
          const d =
            top.map((t, i) => `${i ? 'L' : 'M'}${((i / N) * W).toFixed(1)} ${t.toFixed(1)}`).join(' ') +
            ' ' +
            floor
              .map((_, i) => `L${(((N - i) / N) * W).toFixed(1)} ${floor[N - i].toFixed(1)}`)
              .join(' ') +
            ' Z'
          floor = top
          return (
            <motion.path
              key={bi}
              d={d}
              className={b.tone}
              initial={{ opacity: 0, scaleY: 0.6 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: '125px 100px' }}
              transition={{ duration: 0.6, delay: 0.1 + bi * 0.1, ease: EASE }}
            />
          )
        })}
        <text x="0" y="106" className="fill-hint font-mono text-[9px]">
          Apr
        </text>
        <text x={W} y="106" textAnchor="end" className="fill-hint font-mono text-[9px]">
          Mar
        </text>
      </svg>
    </div>
  )
}

/* 06 — the decision boundary, drawn through the book it was trained on */
function Boundary() {
  const pts = Array.from({ length: 80 }, (_, i) => {
    const a = i * 2.39996
    const r = Math.sqrt(i / 80)
    const x = 125 + Math.cos(a) * r * 108
    const y = 56 + Math.sin(a) * r * 42
    /* above the curve is approved, below it is not */
    const line = 70 - (x - 125) * 0.26
    return { x, y, bad: y > line + 4 }
  })
  const curve = 'M8 92 C 70 74, 150 58, 242 26'
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <Badge />
      <svg viewBox="0 0 250 112" className="h-[132px] w-full">
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.bad ? 2.6 : 2.2}
            className={p.bad ? 'fill-red/70' : 'fill-accent/60'}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.008 }}
          />
        ))}
        <motion.path
          d={curve}
          fill="none"
          strokeWidth="2"
          strokeDasharray="5 4"
          className="stroke-ink"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <text x="246" y="18" textAnchor="end" className="fill-accent font-mono text-[9px]">
          approve
        </text>
        <text x="4" y="108" className="fill-red font-mono text-[9px]">
          decline
        </text>
      </svg>
    </div>
  )
}
