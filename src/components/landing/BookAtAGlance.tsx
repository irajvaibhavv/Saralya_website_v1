import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Three charts, three different jobs, because one chart type repeated is how
   a dashboard starts looking generic:
     funnel   — magnitude down an ordered pipeline  → sequential teal
     buckets  — state of the book                   → status palette, reserved
     vintage  — change over time, four cohorts      → small multiples, one hue

   Sequential ramp is monotonic in lightness and was run through the palette
   validator (CVD and normal-vision separation both pass). Every mark is
   direct-labelled, which is what the contrast warning on the lightest steps
   obliges. Figures are illustrative — a sample book, not a customer's. */

const RAMP = ['#8fdcc6', '#35b296', '#0f7563', '#12384a']

const FUNNEL = [
  { stage: 'Applications', n: 10000 },
  { stage: 'Data complete', n: 9240 },
  { stage: 'Policy pass', n: 6180 },
  { stage: 'Sanctioned', n: 4420 },
  { stage: 'Disbursed', n: 4105 },
]

/* status, not identity: these mean healthy / watch / stressed */
const BUCKETS = [
  { label: 'Current', pct: 86.0, tone: 'var(--color-green)' },
  { label: '1–30 DPD', pct: 9.0, tone: 'var(--color-amber)' },
  { label: '31–60 DPD', pct: 3.2, tone: 'var(--color-red)' },
  { label: '60+ DPD', pct: 1.8, tone: 'var(--color-ink2)' },
]

/* 90+ DPD %, at 3 / 6 / 9 / 12 months on book */
const VINTAGE = [
  { cohort: 'FY24 Q1', pts: [0.3, 0.9, 1.6, 2.1] },
  { cohort: 'FY24 Q2', pts: [0.4, 1.1, 2.2, 3.4] },
  { cohort: 'FY24 Q3', pts: [0.2, 0.6, 1.1, 1.5] },
  { cohort: 'FY24 Q4', pts: [0.2, 0.5, 0.9, 1.2] },
]

const inr = (n: number) => n.toLocaleString('en-IN')

function Panel({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-line">
      <div className="eyebrow text-accent">{label}</div>
      <h3 className="mt-2 text-h3 font-medium leading-snug">{title}</h3>
      <div className="mt-6 flex-1">{children}</div>
    </div>
  )
}

/* 1 — the pipeline. Ordered magnitude, so one hue stepped light to dark. */
function Funnel() {
  const [hot, setHot] = useState<number | null>(null)
  const max = FUNNEL[0].n
  return (
    <div className="space-y-3">
      {FUNNEL.map((f, i) => {
        const pct = (f.n / max) * 100
        return (
          <div key={f.stage} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} className="group cursor-default">
            <div className="flex items-baseline justify-between gap-3 text-small">
              <span className="text-ink2">{f.stage}</span>
              <span className="font-mono tabular-nums text-muted">
                {inr(f.n)}
                {hot === i && i > 0 && <span className="ml-2 text-hint">{Math.round((f.n / FUNNEL[i - 1].n) * 100)}% of prior</span>}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-bg2">
              <motion.div
                data-bar={f.stage}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left rounded-full transition-opacity"
                style={{ width: `${pct}%`, background: RAMP[Math.min(i, RAMP.length - 1)], opacity: hot === null || hot === i ? 1 : 0.45 }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* 2 — where the book sits. State, so the reserved status palette, and each
       segment carries a label so colour is never doing the work alone. */
function Buckets() {
  const [hot, setHot] = useState<number | null>(null)
  return (
    <div>
      <div className="flex h-9 w-full gap-[2px] overflow-hidden rounded-lg">
        {BUCKETS.map((b, i) => (
          <motion.div
            key={b.label}
            data-seg={b.label}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHot(i)}
            onMouseLeave={() => setHot(null)}
            style={{ width: `${b.pct}%`, background: b.tone, opacity: hot === null || hot === i ? 1 : 0.4 }}
            className="h-full shrink-0 origin-left rounded-[3px] transition-opacity"
            title={`${b.label} · ${b.pct}%`}
          />
        ))}
      </div>
      <dl className="mt-5 space-y-2.5">
        {BUCKETS.map((b, i) => (
          <div key={b.label} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} className="flex items-center gap-2.5 text-small">
            <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: b.tone }} />
            <dt className="flex-1 text-ink2">{b.label}</dt>
            <dd className="font-mono tabular-nums text-muted">{b.pct.toFixed(1)}%</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* 3 — four cohorts. Small multiples rather than four lines on one axis: the
       comparison survives without asking colour to carry four identities. */
function Vintage() {
  const reduce = useReducedMotion()
  const max = 3.6
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-6">
      {VINTAGE.map((v, k) => {
        const last = v.pts[v.pts.length - 1]
        const d = v.pts.map((p, i) => `${(i / (v.pts.length - 1)) * 100},${34 - (p / max) * 30}`).join(' ')
        return (
          <div key={v.cohort}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-label uppercase tracking-[0.1em] text-hint">{v.cohort}</span>
              <span className="font-mono text-small tabular-nums font-medium" style={{ color: last > 2.5 ? 'var(--color-red)' : 'var(--color-accent)' }}>
                {last.toFixed(1)}%
              </span>
            </div>
            <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="mt-2 h-10 w-full overflow-visible" aria-label={`${v.cohort}: ${last}% at 12 months`}>
              <line x1="0" y1="34" x2="100" y2="34" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <motion.polyline
                points={d}
                fill="none"
                stroke={last > 2.5 ? 'var(--color-red)' : 'var(--color-accent)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? undefined : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.9, delay: k * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>
        )
      })}
      <p className="col-span-2 text-small leading-relaxed text-hint">90+ DPD, at 3 / 6 / 9 / 12 months on book. Q2 is the cohort to ask about.</p>
    </div>
  )
}

export function BookAtAGlance() {
  return (
    <Section className="border-t border-line bg-bg">
      <Container>
        <SectionHead
          eyebrow="The first of the month"
          title={
            <>
              Your whole book, <span className="text-accent">read out loud</span>.
            </>
          }
        />
        <Stagger className="grid gap-5 lg:grid-cols-3" gap={0.08}>
          <Item>
            <Panel label="Funnel" title="Where applications fall out.">
              <Funnel />
            </Panel>
          </Item>
          <Item>
            <Panel label="Roll-rate" title="Where the book sits today.">
              <Buckets />
            </Panel>
          </Item>
          <Item>
            <Panel label="Vintage" title="Which cohort is ageing badly.">
              <Vintage />
            </Panel>
          </Item>
        </Stagger>
        <FadeIn>
          <p className="mt-5 text-small text-hint">Illustrative figures from a sample book, not a customer's.</p>
        </FadeIn>
      </Container>
    </Section>
  )
}
