import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MODULES } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Container, Section, SectionHead } from '../ui/Section'

/* Six modules is a menu, not an answer. Pick the problem you actually have and
   the grid narrows to the one or two modules that fix it. */

const PROBLEMS = [
  { id: 'npa', label: 'NPAs climbing', answer: 'Flag stress on day 1, then work it by strategy.', codes: ['M3', 'M4'] },
  { id: 'tat', label: 'Approvals too slow', answer: 'One endpoint in, scored decision out.', codes: ['M1'] },
  { id: 'fraud', label: 'Fraud slipping through', answer: 'Catch it at application, not at write-off.', codes: ['M2'] },
  { id: 'rbi', label: 'Inspection coming', answer: '600+ mapped checks, pack in 4 clicks.', codes: ['M6'] },
  { id: 'board', label: 'Board wants numbers', answer: 'Vintage, roll-rate and cohorts, on schedule.', codes: ['M5'] },
]

export function ModulesPreview() {
  const [pick, setPick] = useState<string | null>(null)
  const chosen = PROBLEMS.find((p) => p.id === pick)
  const stack = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start 0.6', 'end 0.9'] })

  return (
    <Section id="modules">
      <Container>
        <SectionHead
          eyebrow="Products"
          title={
            <>
              Six modules. One stack.
            </>
          }
          lede="What are you trying to fix?"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {PROBLEMS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={pick === p.id}
              onClick={() => setPick(pick === p.id ? null : p.id)}
              className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium ring-1 ring-line transition-colors ${
                pick === p.id ? 'text-white ring-ink' : 'bg-white text-ink2 hover:text-ink'
              }`}
            >
              {pick === p.id && (
                <motion.span layoutId="problem-pill" className="absolute inset-0 -z-10 rounded-lg bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              {p.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {chosen && (
            <motion.p
              key={chosen.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mb-8 text-center text-[17px] font-semibold md:text-[19px]"
            >
              {chosen.answer}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Cards pile up as you scroll: each one sticks a little lower than
            the last, and the ones underneath shrink back. */}
        <div ref={stack} className="relative mx-auto max-w-[820px]">
          {MODULES.map((m, i) => (
            <StackCard key={m.code} m={m} i={i} progress={scrollYProgress} off={chosen ? !chosen.codes.includes(m.code) : false} lit={!!chosen && chosen.codes.includes(m.code)} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink to="/products" variant="ghost" arrow>
            Explore all modules
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}

const N = MODULES.length

function StackCard({ m, i, progress, off, lit }: { m: (typeof MODULES)[number]; i: number; progress: MotionValue<number>; off: boolean; lit: boolean }) {
  // once the next card has covered this one, ease it back a few percent
  const scale = useTransform(progress, (v) => Math.max(0.9, 1 - Math.max(0, v * N - (i + 1)) * 0.035))
  return (
    <div className="sticky mb-5" style={{ top: 96 + i * 14 }}>
      <motion.div style={{ scale, transformOrigin: 'top center' }} animate={{ opacity: off ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
        <Link
          to={`/products#${m.code}`}
          className={`group relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-shadow sm:flex-row sm:items-center sm:p-8 ${lit ? 'ring-2 ring-accent' : ''}`}
        >
          <span className={`absolute inset-x-0 top-0 h-1 origin-left ${m.bar} transition-transform duration-500 ease-out ${lit ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
          <span className={`grid size-16 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${m.wash} ${m.color}`}>
            <m.icon className="size-7" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] text-hint">
              {m.code} · {m.tag}
            </div>
            <div className="mt-1 text-[24px] font-extrabold tracking-[-0.02em] sm:text-[28px]">{m.name}</div>
            <div className="mt-1 text-[15px] text-muted">{m.short}</div>
            <div className="mt-4 font-mono text-[12px] text-muted">{m.points.join('  ·  ')}</div>
          </div>
          <div className="flex items-center gap-1 text-[13px] font-semibold text-accent sm:self-end">
            Learn more <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
