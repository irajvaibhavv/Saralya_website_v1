import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Section, SectionHead } from '../ui/Section'

/* The monthly-review view: four things a CEO/CRO actually opens on the 1st.
   Tabs auto-advance until the visitor takes over. Figures are illustrative. */

const TABS = [
  { id: 'vintage', label: 'Vintage', head: 'Which cohort is aging badly.', module: 'Saral Insight' },
  { id: 'roll', label: 'Roll-rate', head: 'Where the book is sliding.', module: 'Saral Insight' },
  { id: 'watch', label: 'Early warning', head: 'Stress flagged on day 1.', module: 'Saral Watch' },
  { id: 'recover', label: 'Recovery', head: 'Which strategy is working.', module: 'Saral Recover' },
]

export function BoardReview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!inView || held || reduce) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % TABS.length), 5200)
    return () => clearInterval(id)
  }, [inView, held, reduce])

  const tab = TABS[active]

  return (
    <Section id="board">
      <Container>
        <SectionHead
          eyebrow="Monthly review"
          title={
            <>
              What lands on your desk on the 1st.
            </>
          }
          lede="No data team. No ticket to IT."
        />
        <div ref={ref} className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setActive(i)
                  setHeld(true)
                }}
                className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  i === active ? 'text-white' : 'text-ink2 hover:text-ink'
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="board-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:p-9">
            <div className="flex items-start justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[19px] font-extrabold tracking-[-0.02em] md:text-[22px]"
                >
                  {tab.head}
                </motion.h3>
              </AnimatePresence>
              <Link
                to="/products"
                className="group hidden shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-hint hover:text-accent sm:flex"
              >
                {tab.module} <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-7 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div key={tab.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {active === 0 && <Vintage />}
                  {active === 1 && <RollRate />}
                  {active === 2 && <Watch />}
                  {active === 3 && <Recover />}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">Sample board pack · illustrative figures</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

const SPRING = { type: 'spring', stiffness: 120, damping: 20 } as const

/* 1: vintage: 90+ DPD by disbursal cohort */
function Vintage() {
  const cohorts = [
    { m: 'Apr', v: 18 },
    { m: 'May', v: 26 },
    { m: 'Jun', v: 34 },
    { m: 'Jul', v: 72 },
    { m: 'Aug', v: 41 },
    { m: 'Sep', v: 29 },
  ]
  return (
    <div className="flex h-[220px] items-end gap-3 sm:gap-5">
      {cohorts.map((c, i) => {
        const hot = c.v > 60
        return (
          <div key={c.m} className="flex flex-1 flex-col items-center gap-2">
            <span className={`font-mono text-[11px] ${hot ? 'font-bold text-red' : 'text-hint'}`}>{(c.v / 20).toFixed(1)}%</span>
            <motion.div
              className={`w-full rounded-t-lg ${hot ? 'bg-red' : 'bg-accent/35'}`}
              initial={{ height: 0 }}
              animate={{ height: `${c.v * 2}px` }}
              transition={{ ...SPRING, delay: i * 0.06 }}
            />
            <span className="font-mono text-[11px] text-hint">{c.m}</span>
          </div>
        )
      })}
    </div>
  )
}

/* 2: roll-rate: how much of each bucket held */
function RollRate() {
  const rows = [
    { from: 'Current', pct: 94, tone: 'bg-green' },
    { from: 'SMA-0', pct: 61, tone: 'bg-amber' },
    { from: 'SMA-1', pct: 38, tone: 'bg-amber' },
    { from: 'SMA-2', pct: 17, tone: 'bg-red' },
  ]
  return (
    <div className="space-y-5">
      {rows.map((r, i) => (
        <div key={r.from}>
          <div className="flex items-baseline justify-between font-mono text-[11.5px]">
            <span className="text-ink2">{r.from} → held</span>
            <span className="font-bold">{r.pct}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-bg2">
            <motion.div
              className={`h-full rounded-full ${r.tone}`}
              initial={{ width: 0 }}
              animate={{ width: `${r.pct}%` }}
              transition={{ ...SPRING, delay: i * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* 3: early warning: the book as a grid, stressed accounts light up */
function Watch() {
  const flags = new Set([7, 13, 29, 34, 51, 62, 68])
  const warn = new Set([4, 19, 41, 56])
  return (
    <div>
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
        {Array.from({ length: 72 }, (_, i) => (
          <motion.span
            key={i}
            className={`aspect-square rounded-[5px] ${flags.has(i) ? 'bg-red' : warn.has(i) ? 'bg-amber' : 'bg-bg2'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.008, duration: 0.3 }}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-red" />7 flagged SMA-0
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-amber" />4 watchlist
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-bg2" />61 healthy
        </span>
      </div>
    </div>
  )
}

/* 4: recovery: resolution rate by strategy */
function Recover() {
  const R = 34
  const C = 2 * Math.PI * R
  const arcs = [
    { label: 'Dialler', pct: 72, tone: 'stroke-accent' },
    { label: 'Field visit', pct: 54, tone: 'stroke-blue' },
    { label: 'Legal', pct: 31, tone: 'stroke-purple' },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-10 py-4 sm:gap-16">
      {arcs.map((a, i) => (
        <div key={a.label} className="flex flex-col items-center gap-3">
          <div className="relative size-24">
            <svg viewBox="0 0 80 80" className="size-full -rotate-90">
              <circle cx="40" cy="40" r={R} fill="none" strokeWidth="8" className="stroke-bg2" />
              <motion.circle
                cx="40"
                cy="40"
                r={R}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className={a.tone}
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset: C * (1 - a.pct / 100) }}
                transition={{ ...SPRING, delay: i * 0.1 }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[17px] font-extrabold tabular-nums">{a.pct}%</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-hint">{a.label}</span>
        </div>
      ))}
    </div>
  )
}
