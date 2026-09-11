import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Counter, Item, Stagger } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

/* Four benefits — copy per the founders' corrections brief (benefit 5 removed). */

export function Benefits() {
  return (
    <Section className="bg-bg2/60">
      <Container>
        <SectionHead
          eyebrow="Why Saralya"
          title={
            <>
              Organization level-up.
              <br />
              <span className="text-accent">Transforming operations. Elevating experience. Minimizing risk.</span>
            </>
          }
          className="max-w-3xl"
        />

        <Stagger className="grid gap-4 md:grid-cols-12">
          <Item className="md:col-span-7">
            <Card
              title="Built ground-up for Digital Lending."
              body="Trained on BFSI data, not a generic model."
            >
              <Bars />
            </Card>
          </Item>
          <Item className="md:col-span-5">
            <Card title="Approve loans through STP in under 5 minutes." body="Application to sanction, no manual touch.">
              <Stopwatch />
            </Card>
          </Item>
          <Item className="md:col-span-5">
            <Card title="Works with existing systems." body="Keep your CBS and LOS. Saralya plugs in beside them.">
              <Plugs />
            </Card>
          </Item>
          <Item className="md:col-span-7">
            <Card title="Compliance is the architecture." body="600+ RBI and DPDP checks on every loan.">
              <Checks />
            </Card>
          </Item>
        </Stagger>
      </Container>
    </Section>
  )
}

function Card({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-[190px] overflow-hidden bg-gradient-to-b from-wash2 to-white">{children}</div>
      <div className="p-6 pt-5">
        <div className="text-[19px] font-extrabold tracking-[-0.02em] leading-snug">{title}</div>
        <p className="mt-2 text-[14px] text-muted">{body}</p>
      </div>
    </div>
  )
}

/* --- mini visuals --------------------------------------------------------- */

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
      <div className="absolute left-0 top-3 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-accent shadow-sm">
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
              <stop offset="0" stopColor="#7f63ff" />
              <stop offset="1" stopColor="#c034e8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="display text-[26px] tabular-nums">
              <Counter to={4} />:<Counter to={12} duration={1.8} />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">min · sec</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Plugs() {
  const systems = ['FinnOne', 'Lentra', 'Finflux', 'Your CBS']
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 px-6">
      <div className="grid gap-2">
        {systems.map((s, i) => (
          <motion.div
            key={s}
            className="rounded-xl bg-white px-3 py-1.5 font-mono text-[11px] text-ink2 shadow-sm"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <svg width="60" height="140" className="overflow-visible">
        {systems.map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${17 + i * 35} C 30 ${17 + i * 35}, 30 70, 60 70`}
            fill="none"
            stroke="var(--color-accent3)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>
      <motion.div
        className="grid size-16 place-items-center rounded-2xl bg-ink text-[11px] font-extrabold text-white shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
      >
        Saralya
      </motion.div>
    </div>
  )
}

function Checks() {
  const items = ['MD-FRM · 21-day SCN', 'DLD 2025 · KFS delivered', 'DPDP · consent logged', 'KYC MD · CKYC matched', 'CRILC · NBS-9 mapped']
  return (
    <div className="absolute inset-0 px-6 pt-5">
      <div className="absolute right-6 top-4 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-green shadow-sm">
        <Counter to={600} suffix="+ checks" />
      </div>
      <div className="space-y-1.5">
        {items.map((t, i) => (
          <motion.div
            key={t}
            className="flex items-center gap-2 text-[12.5px] font-medium text-ink2"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12 }}
          >
            <motion.span
              className="grid size-4 place-items-center rounded-full bg-green text-white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check className="size-2.5" strokeWidth={3.5} />
            </motion.span>
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
