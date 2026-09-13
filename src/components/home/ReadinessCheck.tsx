import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

/* Six yes/no taps a compliance head or CEO can answer from memory. Whatever
   they leave unticked is what an RBI inspection asks about first. */

const CHECKS = [
  { q: '21-day show-cause notice before any fraud tagging', flag: 'MD-FRM · SCN' },
  { q: 'KFS delivered on every digital loan', flag: 'DLD 2025 · KFS' },
  { q: 'Every DLA registered on CIMS', flag: 'DLD 2025 · CIMS' },
  { q: 'DPDP consent logged, erasure honoured row-level', flag: 'DPDP 2023' },
  { q: 'CRILC and NBS-9 returns generated, not typed', flag: 'CRILC · NBS-9' },
  { q: 'Immutable audit trail on every change', flag: 'Audit trail' },
]

const R = 46
const C = 2 * Math.PI * R

export function ReadinessCheck() {
  const [on, setOn] = useState<boolean[]>(() => CHECKS.map(() => false))
  const score = on.filter(Boolean).length
  const gaps = CHECKS.filter((_, i) => !on[i])

  return (
    <Section id="readiness">
      <Container>
        <FadeIn className="overflow-hidden rounded-[32px] bg-ink text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 md:p-10">
              <div className="eyebrow mb-3 flex items-center gap-3 text-[#c4b5fd]">
                Inspection readiness <span className="h-px w-6 bg-accent3" />
              </div>
              <h2 className="display text-[clamp(26px,3.2vw,36px)]">Tick what you already have.</h2>
              <div className="mt-7 space-y-2">
                {CHECKS.map((c, i) => (
                  <button
                    key={c.q}
                    type="button"
                    aria-pressed={on[i]}
                    onClick={() => setOn((p) => p.map((v, j) => (j === i ? !v : v)))}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                      on[i] ? 'bg-white/10' : 'bg-white/[0.04] hover:bg-white/[0.08]'
                    }`}
                  >
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                        on[i] ? 'border-green bg-green' : 'border-white/25'
                      }`}
                    >
                      {on[i] && <Check className="size-3.5" strokeWidth={3.5} />}
                    </span>
                    <span className={`text-[14px] ${on[i] ? 'text-white' : 'text-white/65'}`}>{c.q}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 border-t border-white/10 p-7 md:p-10 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-5">
                <div className="relative size-28 shrink-0">
                  <svg viewBox="0 0 110 110" className="size-full -rotate-90">
                    <circle cx="55" cy="55" r={R} fill="none" strokeWidth="9" className="stroke-white/10" />
                    <motion.circle
                      cx="55"
                      cy="55"
                      r={R}
                      fill="none"
                      strokeWidth="9"
                      strokeLinecap="round"
                      className={score === CHECKS.length ? 'stroke-green' : score > 3 ? 'stroke-amber' : 'stroke-red'}
                      strokeDasharray={C}
                      animate={{ strokeDashoffset: C * (1 - score / CHECKS.length) }}
                      transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                    />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-[24px] font-extrabold tabular-nums">
                    {score}/{CHECKS.length}
                  </span>
                </div>
                <p className="text-[16px] font-semibold leading-snug">
                  {score === CHECKS.length ? 'Inspection-ready. Saral Comply keeps it that way.' : `${gaps.length} open to an inspection question.`}
                </p>
              </div>

              <div className="flex min-h-[92px] flex-wrap content-start gap-2">
                <AnimatePresence mode="popLayout">
                  {gaps.map((g) => (
                    <motion.span
                      key={g.q}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full bg-red/15 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#ff9db0]"
                    >
                      {g.flag}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              <div>
                <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Compliance%20checklist`} variant="white" arrow>
                  Get all 600 checks
                </ButtonLink>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">Nothing leaves your browser</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
