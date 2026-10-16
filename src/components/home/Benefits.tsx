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
              <Bars />
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

function Bars() {
  const heights = [38, 56, 44, 70, 62, 84, 74, 96, 88, 100]
  return (
    <div className="absolute inset-x-8 bottom-0 flex h-[150px] items-end gap-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-lg bg-gradient-to-t from-accent to-accent3"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: 0.45 + (i / heights.length) * 0.55 }}
        />
      ))}
      <div className="absolute left-0 top-3 rounded-full bg-white px-2.5 py-1 font-mono text-label text-accent shadow-sm">
        BFSI-trained
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

