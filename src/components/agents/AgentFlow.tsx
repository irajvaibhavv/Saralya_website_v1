import type { LucideIcon } from 'lucide-react'
import { Ban } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/* One agent, drawn as the path data takes through it: rails on the left, the
   core, the work, what comes back. Used twice on the page — once generic,
   once rebuilt from the visitor's own answers — so it has to be data-driven.
   Same visual language as HowItWorks on /home: white cards, accent lines,
   packets riding the path. */

export type Source = { label: string; icon: LucideIcon }

function Wire({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion()
  const d = 'M 0 6 L 72 6'
  return (
    <svg viewBox="0 0 72 12" className="h-3 w-full shrink-0 lg:w-[72px]" fill="none" aria-hidden>
      <path d={d} stroke="var(--color-line2)" strokeWidth="1.5" />
      {!reduce && (
        <>
          <motion.path
            d={d}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 12"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <circle r="3.5" fill="var(--color-accent)">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay}s`} path={d} />
          </circle>
        </>
      )}
    </svg>
  )
}

function Col({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 flex-1 ${className}`}>
      <div className="eyebrow mb-3">{label}</div>
      {children}
    </div>
  )
}

export function AgentFlow({
  sources,
  work,
  outcome,
  seatKey = 'base',
}: {
  sources: Source[]
  work: string[]
  outcome: ReactNode
  /* changes when the visitor's answers change, so the chips re-animate */
  seatKey?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-0">
      <Col label="What it reads">
        <div className="space-y-2.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {sources.map((s, i) => (
              <motion.div
                key={seatKey + s.label}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-line"
              >
                <s.icon className="size-4 shrink-0 text-accent" strokeWidth={1.8} />
                <span className="text-small font-medium text-ink2">{s.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-3 text-small text-hint">Read-only, on your consent</p>
      </Col>

      <Wire delay={0} />

      <div className="flex shrink-0 flex-col items-center gap-3 lg:w-[150px]">
        <div className="relative grid size-24 place-items-center rounded-3xl bg-ink text-white shadow-lg">
          {!reduce && <span className="absolute inset-0 rounded-3xl bg-ink animate-pulse-ring" />}
          <span className="relative flex items-start text-figure font-extrabold leading-none tracking-[-0.06em]">
            S<span className="ml-0.5 mt-[9px] size-2.5 rounded-full bg-accent3" />
          </span>
        </div>
        <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">The agent</span>
      </div>

      <Wire delay={0.8} />

      <Col label="What it runs">
        <div className="space-y-2.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {work.map((w) => (
              <motion.div
                key={seatKey + w}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="rounded-xl bg-wash2 px-3.5 py-2.5 text-small font-medium text-ink2 ring-1 ring-accent/15"
              >
                {w}
              </motion.div>
            ))}
          </AnimatePresence>
          {work.length === 0 && <p className="rounded-xl bg-bg px-3.5 py-6 text-center text-small text-hint">Nothing picked yet</p>}
        </div>
      </Col>

      <Wire delay={1.6} />

      <Col label="What comes back">{outcome}</Col>
    </div>
  )
}

/** The limits belong to the agent but need their own line: a visitor should
    be able to read them without finding them. */
export function Limits({ limits, seatKey = 'base' }: { limits: string[]; seatKey?: string }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line pt-5">
      <span className="eyebrow">What it cannot do</span>
      {limits.map((l) => (
        <motion.span
          key={seatKey + l}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1.5 text-small text-red"
        >
          <Ban className="size-3.5 shrink-0" strokeWidth={2.5} />
          {l}
        </motion.span>
      ))}
      <span className="text-small text-hint">Hard limits, not prompts</span>
    </div>
  )
}
