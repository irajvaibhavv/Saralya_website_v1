import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MODULES } from '../../content/site'
import { FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

const APPLICANTS = [
  { i: 'RK', n: 'Rahul K.', m: 'MSME · ₹4.5L', c: 'bg-accent' },
  { i: 'PS', n: 'Priya S.', m: 'Retail · ₹80K', c: 'bg-blue' },
  { i: 'AM', n: 'Anand M.', m: 'LAP · ₹22L', c: 'bg-purple' },
  { i: 'SG', n: 'SHG Group 14', m: 'JLG · ₹1.2L', c: 'bg-amber' },
]

export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              Plug in once. <span className="text-accent">Decide in minutes.</span>
            </>
          }
          lede="Send the application. Saralya pulls the data, scores it, runs 600+ compliance checks and returns a decision — through one endpoint."
        />

        <FadeIn>
          <div className="relative overflow-hidden rounded-[32px] bg-white p-5 shadow-lg md:p-8">
            <div className="absolute inset-0 grid-paper opacity-25 mask-fade-radial" />
            <div className="relative grid gap-6 lg:grid-cols-[220px_1fr_220px] lg:gap-0">
              {/* Incoming */}
              <div>
                <Label>Applications in</Label>
                <div className="space-y-2">
                  {APPLICANTS.map((a, i) => (
                    <motion.div
                      key={a.n}
                      className="flex items-center gap-3 rounded-2xl bg-bg px-3 py-2.5 shadow-sm"
                      animate={{ opacity: [0, 1, 1, 0], x: [-14, 0, 0, 14] }}
                      transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, times: [0, 0.12, 0.75, 0.9], ease: 'easeInOut' }}
                    >
                      <span className={`grid size-8 place-items-center rounded-lg text-[11px] font-bold text-white ${a.c}`}>{a.i}</span>
                      <div>
                        <div className="text-[12.5px] font-semibold">{a.n}</div>
                        <div className="font-mono text-[10px] text-muted">{a.m}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Beams + core */}
              <div className="relative flex items-center justify-center py-4 lg:py-0">
                <Beam side="left" />
                <Core />
                <Beam side="right" />
              </div>

              {/* Outcomes */}
              <div>
                <Label>Decisions out</Label>
                <div className="space-y-2">
                  <Lane label="Approved · STP" tone="text-accent" border="border-accent" start={1284} step={[1, 3]} />
                  <Lane label="Manual review" tone="text-amber" border="border-amber" start={212} step={[0, 1]} />
                  <Lane label="Declined" tone="text-red" border="border-red" start={97} step={[0, 1]} rate={5200} />
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap justify-between gap-3 border-t border-dashed border-line pt-4 font-mono text-[11px] text-muted">
              <span>
                p95 latency <b className="font-medium text-accent">&lt; 200 ms</b>
              </span>
              <span>
                Inference <b className="font-medium text-accent">inside India</b>
              </span>
              <span>
                Audit trail <b className="font-medium text-accent">immutable</b>
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

function Label({ children }: { children: string }) {
  return <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-hint">{children}</div>
}

function Core() {
  return (
    <div className="relative z-10 w-full max-w-[380px] overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(127,99,255,0.45),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(13,143,217,0.3),transparent_55%)]" />
      <motion.div
        aria-hidden
        className="absolute -right-16 -top-16 size-48 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-accent3" />
      </motion.div>
      <div className="relative">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#c4b5fd]">Saralya core</div>
        <div className="display mt-1 text-[24px]">One endpoint</div>
        <div className="text-[12px] text-white/50">POST /v1/decisions</div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.code}
              className="rounded-xl border border-white/10 bg-white/5 px-1.5 py-2.5 text-center"
              animate={{ backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(127,99,255,0.35)', 'rgba(255,255,255,0.05)'] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
            >
              <m.icon className="mx-auto mb-1 size-4 text-[#c4b5fd]" strokeWidth={2} />
              <div className="text-[10px] font-medium leading-tight">{m.tag}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Animated connector: a dashed rail with a glowing packet travelling along it. */
function Beam({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`hidden lg:block absolute top-1/2 h-0.5 w-[calc(50%-190px)] -translate-y-1/2 ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-line2)" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
      </svg>
      {[0, 1].map((k) => (
        <motion.span
          key={k}
          className="absolute -top-[3px] size-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(91,61,245,0.6)]"
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: k * 0.9, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function Lane({
  label,
  tone,
  border,
  start,
  step,
  rate = 2600,
}: {
  label: string
  tone: string
  border: string
  start: number
  step: [number, number]
  rate?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(start)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setN((v) => v + step[0] + Math.floor(Math.random() * (step[1] - step[0] + 1))), rate)
    return () => clearInterval(id)
  }, [inView, step, rate])
  return (
    <div ref={ref} className={`rounded-2xl border-l-4 bg-bg px-4 py-3 shadow-sm ${border}`}>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{label}</div>
      <div className={`display text-[24px] tabular-nums ${tone}`}>{n.toLocaleString('en-IN')}</div>
    </div>
  )
}
