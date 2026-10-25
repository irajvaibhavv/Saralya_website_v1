import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
/* Board pack produced by the monthly review agent: four views a CEO or CRO
   reads on the 1st. Tabs auto-advance until the user picks one. All figures are
   illustrative. */

const TABS = [
  { id: 'vintage', label: 'Vintage', head: 'Which cohort is aging badly.', module: 'Saral Drishti' },
  { id: 'roll', label: 'Roll-rate', head: 'Where the book is sliding.', module: 'Saral Drishti' },
  { id: 'watch', label: 'Early warning', head: 'Stress flagged on day 1.', module: 'Saral Drishti' },
  { id: 'recover', label: 'Recovery', head: 'Which strategy is working.', module: 'Saral Samadhan' },
]

export function BoardPack({ every = 5200 }: { every?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!inView || held || reduce) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % TABS.length), every)
    return () => clearInterval(id)
  }, [inView, held, reduce, every])

  const tab = TABS[active]

  return (
        <div ref={ref} className="w-full">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setActive(i)
                  setHeld(true)
                }}
                className={`relative rounded-full px-4 py-2 text-small font-semibold transition-colors ${
                  i === active ? 'text-ink' : 'text-white/75 hover:text-white'
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="board-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl bg-white p-5 shadow-lg md:p-7">
            <div className="flex items-start justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-h3 font-extrabold tracking-[-0.02em] md:text-stat"
                >
                  {tab.head}
                </motion.h3>
              </AnimatePresence>
              <Link
                to="/products"
                className="group hidden shrink-0 items-center gap-1 font-mono text-label uppercase tracking-[0.1em] text-hint hover:text-accent sm:flex"
              >
                {tab.module} <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-6 min-h-[356px]">
              <AnimatePresence mode="wait">
                <motion.div key={tab.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {active === 0 && <Vintage />}
                  {active === 1 && <RollRate />}
                  {active === 2 && <Watch />}
                  {active === 3 && <Recover />}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-6 font-mono text-label uppercase tracking-[0.12em] text-hint">Sample board pack · illustrative figures</p>
          </div>
        </div>
  )
}

const SPRING = { type: 'spring', stiffness: 120, damping: 20 } as const

/* 1: vintage curves — cumulative 90+ DPD by months on book, one line per
   disbursal cohort. Curves follow a power law below 1: delinquency builds fast,
   then flattens. */
const MOB = 12
const Y_MAX = 4
const curve = (peak: number) => Array.from({ length: MOB + 1 }, (_, m) => peak * (m / MOB) ** 0.78)

const COHORTS = [
  { m: 'Apr', peak: 0.9 },
  { m: 'May', peak: 1.3 },
  { m: 'Jun', peak: 1.7 },
  { m: 'Jul', peak: 3.6, hot: true },
]

function Vintage() {
  const reduce = useReducedMotion()
  /* viewBox units: the chart scales, the type does not */
  const W = 640
  const H = 220
  const PAD = { l: 34, r: 62, t: 10, b: 26 }
  const x = (m: number) => PAD.l + (m / MOB) * (W - PAD.l - PAD.r)
  const y = (v: number) => PAD.t + (1 - v / Y_MAX) * (H - PAD.t - PAD.b)
  const path = (vals: number[]) => vals.map((v, m) => `${m ? 'L' : 'M'}${x(m).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[220px] w-full" role="img" aria-label="Cumulative 90+ DPD by disbursal cohort">
        {/* the grid, in percent */}
        {[1, 2, 3, 4].map((g) => (
          <g key={g}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} className="stroke-line" strokeWidth="1" strokeDasharray="3 5" />
            <text x={PAD.l - 8} y={y(g) + 3.5} textAnchor="end" className="fill-hint font-mono text-[10px]">
              {g}%
            </text>
          </g>
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} className="stroke-line2" strokeWidth="1" />
        {[3, 6, 9, 12].map((m) => (
          <text key={m} x={x(m)} y={H - 8} textAnchor="middle" className="fill-hint font-mono text-[10px]">
            {m}
          </text>
        ))}
        <text x={PAD.l} y={H - 8} textAnchor="start" className="fill-hint font-mono text-[10px]">
          months on book
        </text>

        {COHORTS.map((c, i) => {
          const vals = curve(c.peak)
          const end = vals[MOB]
          return (
            <g key={c.m}>
              <motion.path
                d={path(vals)}
                fill="none"
                strokeWidth={c.hot ? 2.6 : 1.8}
                strokeLinecap="round"
                className={c.hot ? 'stroke-red' : 'stroke-accent/45'}
                initial={reduce ? undefined : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: 'easeOut' }}
              />
              <motion.circle
                cx={x(MOB)}
                cy={y(end)}
                r={c.hot ? 4 : 3}
                className={c.hot ? 'fill-red' : 'fill-accent/60'}
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.12 }}
              />
              <motion.text
                x={x(MOB) + 9}
                y={y(end) + 3.5}
                className={`font-mono text-[11px] ${c.hot ? 'fill-red font-bold' : 'fill-muted'}`}
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95 + i * 0.12 }}
              >
                {c.m} {end.toFixed(1)}%
              </motion.text>
            </g>
          )
        })}
      </svg>

      <p className="mt-4 text-small leading-relaxed text-muted">
        The <span className="font-semibold text-red">July cohort</span> is rolling 4× the April book at the same age, and it
        parted from the pack by month three, a quarter before the totals showed it.
      </p>
    </div>
  )
}

/* 2: roll rates — where each delinquency bucket moved this month */
const FLOWS = [
  { from: 'Current', cured: 0, held: 94, fwd: 6 },
  { from: 'SMA-0', cured: 31, held: 30, fwd: 39 },
  { from: 'SMA-1', cured: 18, held: 20, fwd: 62 },
  { from: 'SMA-2', cured: 9, held: 8, fwd: 83 },
]

function RollRate() {
  return (
    <div>
      <div className="space-y-4">
        {FLOWS.map((r, i) => (
          <div key={r.from}>
            <div className="flex items-baseline justify-between font-mono text-label">
              <span className="text-ink2">{r.from}</span>
              <span className={r.fwd > 50 ? 'font-bold text-red' : 'text-hint'}>{r.fwd}% forward</span>
            </div>
            <div className="mt-2 flex h-3 gap-0.5 overflow-hidden rounded-full">
              {([
                ['bg-green', r.cured],
                ['bg-accent/35', r.held],
                ['bg-red', r.fwd],
              ] as const).map(([tone, pct], n) =>
                pct === 0 ? null : (
                  <motion.span
                    key={tone}
                    className={`h-full ${tone} ${n === 0 ? 'rounded-l-full' : ''} ${n === 2 ? 'rounded-r-full' : ''}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ ...SPRING, delay: i * 0.08 + n * 0.04 }}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-label text-muted">
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-green" /> Cured
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-accent/35" /> Held
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-red" /> Rolled forward
        </span>
      </div>
    </div>
  )
}

/* 3: early warning — the book as a grid, stressed accounts highlighted */
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
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-label text-muted">
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

/* 4: recovery rate by collection strategy */
function Recover() {
  const R = 34
  const C = 2 * Math.PI * R
  const arcs = [
    { label: 'Dialler', pct: 72, tone: 'stroke-accent' },
    { label: 'Field visit', pct: 54, tone: 'stroke-accent3' },
    { label: 'Legal', pct: 31, tone: 'stroke-ink2' },
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
            <span className="absolute inset-0 grid place-items-center text-lede font-extrabold tabular-nums">{a.pct}%</span>
          </div>
          <span className="font-mono text-label uppercase tracking-[0.1em] text-hint">{a.label}</span>
        </div>
      ))}
    </div>
  )
}
