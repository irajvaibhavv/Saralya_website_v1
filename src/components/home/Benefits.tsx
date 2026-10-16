import { motion } from 'motion/react'
import { Counter, Item, Stagger } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Two benefits: copy per the founders' corrections brief. The cards that
   named other companies' systems, and the compliance one, came out on the
   lead's instruction. */

export function Benefits() {
  return (
    <Section>
      <Container>
        <SectionHead
          eyebrow="Why Saralya"
          title="What changes on day one."
        />

        <Stagger className="grid gap-4 md:grid-cols-12">
          <Item className="md:col-span-6">
            <Card
              title="Built ground-up for Digital Lending."
              body="Trained on BFSI data, not a generic model."
            >
              <Ridge />
            </Card>
          </Item>
          <Item className="md:col-span-6">
            <Card title="Approve loans through STP in under 5 minutes." body="Application to sanction, no manual touch.">
              <Stopwatch />
            </Card>
          </Item>
        </Stagger>
      </Container>
    </Section>
  )
}

function Card({ title, body, children }: { title: string; body?: string; children: React.ReactNode }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-[190px] overflow-hidden bg-gradient-to-b from-wash2 to-white">{children}</div>
      <div className="p-6 pt-5">
        <div className="text-h3 font-extrabold tracking-[-0.02em] leading-snug">{title}</div>
        {body && <p className="mt-2 text-body text-muted">{body}</p>}
      </div>
    </div>
  )
}

/* Mini visuals. */

/** a gaussian, sampled across the width, as an SVG path */
const bell = (mu: number, sd: number, h: number, w = 240, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = (i / n) * w
    const y = h - Math.exp(-((x - mu) ** 2) / (2 * sd ** 2)) * h
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

/* The whole score distribution, one ridge per disbursal cohort: a model
   trained on this book can separate them, and July sits left of the pack.
   Illustrative figures. */
const RIDGES = [
  { k: 'Sep', mu: 168, sd: 30 },
  { k: 'Aug', mu: 152, sd: 32 },
  { k: 'Jul', mu: 120, sd: 38 },
  { k: 'Jun', mu: 142, sd: 30 },
]

function Ridge() {
  return (
    <div className="absolute inset-0 px-6 pt-11">
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-2.5 py-1 font-mono text-label text-accent shadow-sm">
        BFSI-trained
      </div>
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

function Stopwatch() {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative">
        <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
          <circle cx="66" cy="66" r={r} fill="none" stroke="var(--color-line)" strokeWidth="10" />
          <motion.circle
            cx="66"
            cy="66"
            r={r}
            fill="none"
            stroke="url(#sw)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * 0.16 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <defs>
            <linearGradient id="sw" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#107a66" />
              <stop offset="1" stopColor="#4cc3a5" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="display text-stat tabular-nums">
              <Counter to={4} />:<Counter to={12} duration={1.8} />
            </div>
            <div className="font-mono text-label uppercase tracking-[0.08em] text-hint">min · sec</div>
          </div>
        </div>
      </div>
    </div>
  )
}

