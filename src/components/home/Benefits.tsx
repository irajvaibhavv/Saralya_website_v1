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
          lede="Organization level-up. Transforming operations. Elevating experience. Minimizing risk."
        />

        <Stagger className="grid gap-4 md:grid-cols-12">
          <Item className="md:col-span-6">
            <Card
              title="Built ground-up for Digital Lending."
              body="Trained on BFSI data, not a generic model."
            >
              <Radar />
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

/* What a model trained on this book knows, against one trained on the open
   web: the same five axes, two very different shapes. Illustrative. */
const AXES = ['Credit policy', 'Collections', 'RBI circulars', 'NBFC filings', 'Vernacular']
const OURS = [0.95, 0.86, 0.98, 0.82, 0.9]
const GENERAL = [0.42, 0.3, 0.22, 0.26, 0.34]

function Radar() {
  /* a pentagon, starting at twelve o'clock */
  const C = { x: 112, y: 84 }
  const R = 56
  const at = (i: number, k: number) => {
    const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2
    return [C.x + Math.cos(a) * R * k, C.y + Math.sin(a) * R * k] as const
  }
  const shape = (vals: number[]) => vals.map((v, i) => at(i, v).map((n) => n.toFixed(1)).join(' ')).join(' L ')

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 224 168" className="size-full" role="img" aria-label="What the model knows, against a general model">
        {/* the web */}
        {[0.33, 0.66, 1].map((k) => (
          <polygon
            key={k}
            points={AXES.map((_, i) => at(i, k).join(',')).join(' ')}
            fill="none"
            className="stroke-line"
            strokeWidth="1"
          />
        ))}
        {AXES.map((_, i) => (
          <line key={i} x1={C.x} y1={C.y} x2={at(i, 1)[0]} y2={at(i, 1)[1]} className="stroke-line" strokeWidth="1" />
        ))}

        {/* a general model */}
        <motion.path
          d={`M ${shape(GENERAL)} Z`}
          className="fill-ink2/10 stroke-ink2/40"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${C.x}px ${C.y}px` }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* ours */}
        <motion.path
          d={`M ${shape(OURS)} Z`}
          className="fill-accent/20 stroke-accent"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${C.x}px ${C.y}px` }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        {OURS.map((v, i) => {
          const [x, y] = at(i, v)
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              className="fill-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75 + i * 0.05 }}
            />
          )
        })}

        {/* the axes, named */}
        {AXES.map((label, i) => {
          const [x, y] = at(i, 1.26)
          return (
            <text
              key={label}
              x={x}
              y={y + 3}
              textAnchor={x > C.x + 6 ? 'start' : x < C.x - 6 ? 'end' : 'middle'}
              className="fill-hint font-mono text-[8px] uppercase tracking-[0.08em]"
            >
              {label}
            </text>
          )
        })}
      </svg>

      <div className="absolute left-0 top-3 rounded-full bg-white px-2.5 py-1 font-mono text-label text-accent shadow-sm">
        BFSI-trained
      </div>
      <div className="absolute bottom-2 right-3 flex gap-3 font-mono text-[9px] text-hint">
        <span className="flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-accent" /> Ours
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-ink2/40" /> General model
        </span>
      </div>
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

