import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MODULES } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Item, Stagger } from '../ui/Motion'
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

  return (
    <Section id="modules">
      <Container>
        <SectionHead
          eyebrow="Products"
          title={
            <>
              Six modules. <span className="text-accent">One stack.</span>
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
              className={`relative rounded-full px-4 py-2 text-[13px] font-semibold shadow-sm transition-colors ${
                pick === p.id ? 'text-white' : 'bg-white text-ink2 hover:text-ink'
              }`}
            >
              {pick === p.id && (
                <motion.span layoutId="problem-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
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

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const off = chosen ? !chosen.codes.includes(m.code) : false
            return (
              <Item key={m.code}>
                <motion.div animate={{ opacity: off ? 0.35 : 1, scale: off ? 0.97 : 1 }} transition={{ duration: 0.3 }} className="h-full">
                  <Link
                    to="/products"
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      chosen && !off ? 'shadow-lg ring-2 ring-accent' : 'shadow-sm'
                    }`}
                  >
                    <div className="relative flex items-start justify-between">
                      <span className={`grid size-11 place-items-center rounded-2xl ${m.wash} ${m.color}`}>
                        <m.icon className="size-5" strokeWidth={2.2} />
                      </span>
                      <span className="font-mono text-[11px] text-hint">
                        {m.code} · {m.tag}
                      </span>
                    </div>
                    <div className="relative mt-6">
                      <div className="text-[19px] font-extrabold tracking-[-0.02em]">{m.name}</div>
                      <div className="mt-1 text-[14px] text-muted">{m.short}</div>
                    </div>
                    <div className="relative mt-auto flex items-center gap-1 pt-5 text-[13px] font-semibold text-accent transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      Learn more <ArrowUpRight className="size-4" />
                    </div>
                  </Link>
                </motion.div>
              </Item>
            )
          })}
        </Stagger>

        <div className="mt-10 flex justify-center">
          <ButtonLink to="/products" variant="ghost" arrow>
            Explore all modules
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}
