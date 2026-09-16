import { AlertTriangle, Check, FileText, Play, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ClosingCta } from '../components/layout/ClosingCta'
import { PageHero } from '../components/layout/PageHero'
import { FadeIn } from '../components/ui/Reveal'
import { Container } from '../components/ui/Section'

const LOAD_STEPS = [
  'Fetching CIBIL bureau report…',
  'Pulling GST filing history…',
  'Analysing 6 months of bank statements…',
  'Running risk model…',
  'Checking fraud & EWS signals…',
]

const BANDS = [
  { key: 'Risk band', value: 'Prime', tone: 'text-accent', bar: 'bg-accent', pct: 82 },
  { key: 'GST health', value: 'Regular filer', tone: 'text-accent', bar: 'bg-accent', pct: 88 },
  { key: 'Bank behaviour', value: 'Moderate', tone: 'text-amber', bar: 'bg-amber', pct: 64 },
]

type Phase = 'empty' | 'loading' | 'report'

const R = 54
const C = 2 * Math.PI * R

export function Demo() {
  const [phase, setPhase] = useState<Phase>('empty')
  const [activeStep, setActiveStep] = useState(-1)
  const [score, setScore] = useState(0)
  const [bands, setBands] = useState(false)
  const timers = useRef<number[]>([])
  const raf = useRef(0)

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      cancelAnimationFrame(raf.current)
    },
    [],
  )

  const reset = () => {
    timers.current.forEach(clearTimeout)
    cancelAnimationFrame(raf.current)
    setPhase('empty')
    setActiveStep(-1)
    setScore(0)
    setBands(false)
  }

  const run = () => {
    reset()
    setPhase('loading')
    LOAD_STEPS.forEach((_, i) => timers.current.push(window.setTimeout(() => setActiveStep(i), i * 620)))
    timers.current.push(
      window.setTimeout(() => {
        setActiveStep(LOAD_STEPS.length)
        setPhase('report')
        const t0 = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200)
          setScore(Math.round(742 * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
        timers.current.push(window.setTimeout(() => setBands(true), 150))
      }, LOAD_STEPS.length * 620 + 500),
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Live demo"
        title={
          <>
            Run a decision.
            <br />
            <span className="text-accent">Watch the report build.</span>
          </>
        }
        lede="Sample data pre-loaded. Hit run."
      />

      <Container className="pb-8">
        <FadeIn>
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg lg:grid-cols-[360px_1fr]">
            {/* form */}
            <div className="border-b border-line p-7 lg:border-b-0 lg:border-r">
              <div className="text-[18px] font-extrabold tracking-[-0.02em]">New application</div>
              <div className="mb-6 text-[13px] text-muted">Sample data pre-loaded.</div>
              <Field label="Applicant name" defaultValue="Rahul Kumar" />
              <Field label="Loan amount (₹)" defaultValue="4,20,000" />
              <label className="mb-4 block">
                <span className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-hint">Product type</span>
                <select className="w-full rounded-xl bg-bg px-3.5 py-2.5 text-[14px] font-medium outline-none ring-accent/40 focus:ring-2" defaultValue="MSME · Working capital">
                  <option>MSME · Working capital</option>
                  <option>Retail · Personal loan</option>
                  <option>SME · Term loan</option>
                  <option>Micro · Business loan</option>
                </select>
              </label>
              <Field label="City" defaultValue="Coimbatore" />
              <div className="mt-6 flex gap-2">
                <button
                  onClick={run}
                  disabled={phase === 'loading'}
                  className="demo-run group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-[15px] font-bold text-white transition hover:bg-accent2 hover:shadow-glow disabled:opacity-60"
                >
                  <Play className="size-4 fill-current" />
                  {phase === 'report' ? 'Run again' : 'Run decision'}
                </button>
                {phase !== 'empty' && (
                  <button onClick={reset} aria-label="Reset" className="grid size-12 place-items-center rounded-full bg-bg text-muted hover:text-ink">
                    <RotateCcw className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {/* output */}
            <div className="relative min-h-[520px] bg-bg/60 p-7 md:p-9">
              <AnimatePresence mode="wait">
                {phase === 'empty' && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex h-full min-h-[440px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-16 place-items-center rounded-3xl bg-white text-hint shadow-sm">
                      <FileText className="size-7" />
                    </span>
                    <div className="mt-5 text-[18px] font-extrabold">No decision yet</div>
                    <div className="mt-1 max-w-xs text-[14px] text-muted">Hit "Run decision" to fetch and score this application.</div>
                  </motion.div>
                )}

                {phase === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative mx-auto flex h-full min-h-[440px] max-w-sm flex-col justify-center gap-3"
                  >
                    {LOAD_STEPS.map((label, i) => {
                      const done = i < activeStep
                      const now = i === activeStep
                      return (
                        <motion.div
                          key={label}
                          animate={{ opacity: done || now ? 1 : 0.35, x: 0 }}
                          className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                        >
                          <span className={`grid size-6 place-items-center rounded-full ${done ? 'bg-accent text-white' : 'bg-bg'}`}>
                            {done ? (
                              <Check className="size-3.5" strokeWidth={3} />
                            ) : now ? (
                              <span className="size-3.5 animate-spin rounded-full border-2 border-line border-t-accent" />
                            ) : null}
                          </span>
                          <span className={`text-[14px] font-medium ${done || now ? 'text-ink' : 'text-muted'}`}>{label}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}

                {phase === 'report' && (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-[14px] font-bold text-white shadow-[0_12px_24px_-10px_rgba(20,160,107,0.6)]"
                      >
                        <Check className="size-4" strokeWidth={3} /> Approve · STP
                      </motion.div>
                      <div className="text-right font-mono text-[11px] text-muted">
                        APP-2841
                        <br />
                        decided in 4.7s
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-[150px_1fr] sm:items-center">
                      <div className="relative mx-auto size-[130px]">
                        <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
                          <circle cx="65" cy="65" r={R} fill="none" stroke="var(--color-line)" strokeWidth="10" />
                          <motion.circle
                            cx="65"
                            cy="65"
                            r={R}
                            fill="none"
                            stroke="url(#dg)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={C}
                            initial={{ strokeDashoffset: C }}
                            animate={{ strokeDashoffset: C - C * (742 / 850) }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          />
                          <defs>
                            <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0" stopColor="#7f63ff" />
                              <stop offset="1" stopColor="#c034e8" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 grid place-items-center text-center">
                          <div>
                            <div className="display text-[30px] tabular-nums">{score}</div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">Credit score</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {BANDS.map((b) => (
                          <div key={b.key}>
                            <div className="mb-1.5 flex justify-between text-[13px]">
                              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{b.key}</span>
                              <span className={`font-semibold ${b.tone}`}>{b.value}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-bg">
                              <div
                                className={`h-full rounded-full transition-[width] duration-1000 ease-out ${b.bar}`}
                                style={{ width: bands ? `${b.pct}%` : 0 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 rounded-3xl bg-white p-6 shadow-sm">
                      <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-hint">Signals checked</div>
                      <div className="space-y-2">
                        <Flag ok>No fraud markers · identity verified</Flag>
                        <Flag ok>No EWS drift · cohort stable</Flag>
                        <Flag>DPD 30 once, 14 months ago · non-blocking</Flag>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-between gap-2 px-1 font-mono text-[11px] text-muted">
                      <span>
                        vs peer median: <b className="font-medium text-accent">+18% approval confidence</b>
                      </span>
                      <span>
                        RBI + DPDP <b className="font-medium text-accent">aligned</b>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ClosingCta />
    </>
  )
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-hint">{label}</span>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-xl bg-bg px-3.5 py-2.5 text-[14px] font-medium outline-none ring-accent/40 focus:ring-2"
      />
    </label>
  )
}

function Flag({ ok, children }: { ok?: boolean; children: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium ${ok ? 'bg-green-w text-green' : 'bg-amber-w text-amber'}`}>
      {ok ? <Check className="size-4" strokeWidth={3} /> : <AlertTriangle className="size-4" />}
      <span className="text-ink2">{children}</span>
    </div>
  )
}
