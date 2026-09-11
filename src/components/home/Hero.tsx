import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Fingerprint } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Section'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 md:pt-24 md:pb-28">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 grid-paper opacity-40 mask-fade-radial" />
      <motion.div
        aria-hidden
        className="absolute -left-40 -top-40 -z-10 size-[560px] rounded-full bg-accent3/25 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-10 -z-10 size-[520px] rounded-full bg-blue/15 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink2 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-accent animate-pulse-ring" />
              Making lending saral for Bharat
            </motion.div>

            <h1 className="display mt-6 text-[clamp(44px,7.2vw,88px)]">
              {['Lending,', 'as easy', 'as UPI.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 2 ? 'text-gradient' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.09 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted md:text-[19px]"
            >
              Saralya is the lending infrastructure India's banks and NBFCs run on. Approve a loan in under five
              minutes — one API call, RBI-compliant by design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink to="/demo" variant="ink" size="lg" arrow>
                Try a live decision
              </ButtonLink>
              <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`} variant="ghost" size="lg">
                Book demo
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.08em] text-hint"
            >
              <span>&lt; 5 min STP approval</span>
              <span>Pay per loan</span>
              <span>Works with your core</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
          >
            <TapToLend />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   The hero visual: a looping "tap → decision" animation, styled like a UPI
   payment. idle → tap → processing (5 steps) → sanctioned → idle …
   --------------------------------------------------------------------------- */

const STEPS = [
  { name: 'Identity & KYC', src: 'CKYC · Aadhaar' },
  { name: 'Bureau pulled', src: 'CIBIL · CRIF' },
  { name: 'Cash-flow read', src: 'Account Aggregator · GST' },
  { name: 'Risk scored', src: 'Policy engine · 600+ checks' },
  { name: 'Sanction issued', src: 'e-Agreement · NACH' },
]

type Phase = 'idle' | 'tap' | 'processing' | 'done'

function useLoop() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'idle')
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(STEPS.length)
      return
    }
    let t: number
    if (phase === 'idle') t = window.setTimeout(() => setPhase('tap'), 1600)
    else if (phase === 'tap') t = window.setTimeout(() => (setStep(0), setPhase('processing')), 450)
    else if (phase === 'processing') {
      if (step < STEPS.length) t = window.setTimeout(() => setStep((s) => s + 1), 720)
      else t = window.setTimeout(() => setPhase('done'), 300)
    } else t = window.setTimeout(() => setPhase('idle'), 3000)
    return () => clearTimeout(t)
  }, [phase, step, reduce])

  return { phase, step }
}

function TapToLend() {
  const { phase, step } = useLoop()
  const pct = Math.min(1, step / STEPS.length)

  return (
    <div className="relative">
      {/* floating source chips */}
      <FloatingChip className="left-0 -translate-x-1/2 -top-4" delay={0}>
        Inference stays in India
      </FloatingChip>
      <FloatingChip className="right-0 translate-x-1/2 top-[46%]" delay={1.2}>
        RBI + DPDP aligned
      </FloatingChip>
      <FloatingChip className="left-0 -translate-x-1/2 bottom-24" delay={2.1}>
        Trained on BFSI data
      </FloatingChip>

      {/* ghost cards for depth */}
      <div className="absolute inset-x-6 -bottom-3 h-full rounded-[32px] bg-white/50 shadow-sm" />
      <div className="absolute inset-x-3 -bottom-1.5 h-full rounded-[32px] bg-white/70 shadow-sm" />

      <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-lg md:p-7">
        {/* header */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          <span className="flex items-center gap-2 text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-ring" />
            Live decision
          </span>
          <span>APP-2841</span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="display text-[38px] md:text-[42px]">
              <span className="mr-1 text-[24px] font-semibold text-muted">₹</span>4,50,000
            </div>
            <div className="mt-1 text-[13px] text-muted">MSME · Working capital · 36 mo · Coimbatore</div>
          </div>
          <div className="text-right">
            <Timer running={phase === 'processing'} done={phase === 'done'} />
          </div>
        </div>

        {/* body — swaps by phase */}
        <div className="relative mt-6 h-[268px]">
          <AnimatePresence mode="wait">
            {(phase === 'idle' || phase === 'tap') && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Applicant', 'Rahul Kumar'],
                    ['GSTIN', '33AAXPK…1ZQ'],
                    ['Tenure', '36 months'],
                    ['Channel', 'Partner LSP'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-bg px-3.5 py-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">{k}</div>
                      <div className="mt-0.5 text-[13px] font-semibold">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <motion.div
                    animate={phase === 'tap' ? { scale: 0.96 } : { scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-ink py-4 text-[15px] font-bold text-white"
                  >
                    <Fingerprint className="size-5 text-[#c4b5fd]" />
                    Tap to decide
                    {phase === 'tap' && (
                      <motion.span
                        className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 30, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                  <div className="mt-3 text-center font-mono text-[11px] text-hint">One API call. That's the whole integration.</div>
                </div>
              </motion.div>
            )}

            {phase === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <div className="relative pl-7">
                  {/* progress rail */}
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 rounded-full bg-line" />
                  <motion.div
                    className="absolute left-[9px] top-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-accent3 to-accent"
                    style={{ height: 'calc(100% - 16px)' }}
                    animate={{ scaleY: pct }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <ul className="space-y-[13px]">
                    {STEPS.map((s, i) => {
                      const done = i < step
                      const now = i === step
                      return (
                        <li key={s.name} className="relative flex items-center gap-3">
                          <span
                            className={`absolute -left-7 grid size-5 place-items-center rounded-full text-[11px] transition-colors duration-300 ${
                              done ? 'bg-accent text-white' : now ? 'bg-white ring-2 ring-accent' : 'bg-white ring-2 ring-line'
                            }`}
                          >
                            {done && <Check className="size-3" strokeWidth={3} />}
                            {now && <span className="size-2 rounded-full bg-accent animate-pulse-ring" />}
                          </span>
                          <div className="flex-1">
                            <div className={`text-[13.5px] font-semibold transition-colors ${done || now ? 'text-ink' : 'text-hint'}`}>
                              {s.name}
                            </div>
                            <div className="font-mono text-[10.5px] text-hint">{s.src}</div>
                          </div>
                          <span className="font-mono text-[11px] text-muted">{done ? '✓' : now ? '…' : ''}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-green-w to-white text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.1 }}
                  className="relative grid size-16 place-items-center rounded-full bg-green text-white shadow-[0_16px_32px_-12px_rgba(20,160,107,0.6)]"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-green"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 1.1, delay: 0.2 }}
                  />
                  <Check className="size-8" strokeWidth={3} />
                </motion.div>
                <div className="display mt-5 text-[26px]">Sanctioned</div>
                <div className="mt-1 text-[13px] text-muted">Straight-through · no manual touch</div>
                <div className="mt-5 flex gap-2">
                  {['e-Agreement sent', 'NACH registered', 'KFS delivered'].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.1 }}
                      className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-ink2 shadow-sm"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4 font-mono text-[11px] text-muted">
          <span>SLA · straight-through</span>
          <span>
            <b className="font-medium text-accent">&lt; 5 min</b> end-to-end
          </span>
        </div>
      </div>
    </div>
  )
}

function Timer({ running, done }: { running: boolean; done: boolean }) {
  const [ms, setMs] = useState(0)
  useEffect(() => {
    if (!running) {
      if (!done) setMs(0)
      return
    }
    setMs(0)
    const t0 = performance.now()
    const id = setInterval(() => setMs(performance.now() - t0), 50)
    return () => clearInterval(id)
  }, [running, done])
  const s = ms / 1000
  return (
    <div className={`font-mono text-[13px] tabular-nums ${done ? 'text-green' : 'text-muted'}`}>
      {done ? '4m 12s' : `${s.toFixed(1)}s`}
    </div>
  )
}

function FloatingChip({ children, className, delay }: { children: string; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute z-10 hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink2 shadow-md sm:flex ${className}`}
      animate={{ marginTop: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </motion.div>
  )
}
