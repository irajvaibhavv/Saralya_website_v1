import { motion, useReducedMotion } from 'motion/react'
import { FLOW_OUT, FLOW_RULES, FLOW_RUN, SYSTEMS } from '../../content/product'

/* The architecture, read left to right: the rails you already run, the
   layer that reads them, the three things the agent does, and what lands
   on the desk. Ported from the lead's agent-flow prototype — the packets
   still travel the wires, but the three bureaus it named by brand are one
   "Bureau" rail, because we do not name third parties on the site. */

const EASE = [0.22, 1, 0.36, 1] as const

export function AgentFlow() {
  const still = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-line2 md:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="eyebrow">The architecture</div>
        <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">Your rails → a decision</span>
      </div>

      <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.85fr)_auto_minmax(0,1fr)_auto_minmax(0,0.9fr)]">
        {/* what it reads */}
        <Column label="Your rails">
          <div className="flex flex-wrap gap-1.5">
            {SYSTEMS.map((s) => (
              <span key={s} className="rounded-lg bg-wash px-2.5 py-1.5 text-label font-medium text-ink2 ring-1 ring-line2">
                {s}
              </span>
            ))}
          </div>
        </Column>

        <Wire still={!!still} delay={0} />

        {/* the layer */}
        <Column label="Saralya layer">
          <div className="grid place-items-center rounded-2xl bg-ink px-4 py-5 text-center text-white">
            <span className="display text-h3 leading-none">CML</span>
            <span className="mt-1.5 text-label leading-snug text-white/70">Credit models + your policy</span>
          </div>
        </Column>

        <Wire still={!!still} delay={0.4} />

        {/* what it does */}
        <Column label="The run">
          <ol className="space-y-1.5">
            {FLOW_RUN.map((r, n) => (
              <li key={r.name} className="flex items-start gap-2.5 rounded-xl bg-wash px-3 py-2 ring-1 ring-line2">
                <span className="mt-px font-mono text-label text-accent">{String(n + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block text-small font-semibold leading-snug text-ink">{r.name}</span>
                  <span className="block text-label leading-snug text-muted">{r.how}</span>
                </span>
              </li>
            ))}
          </ol>
        </Column>

        <Wire still={!!still} delay={0.8} />

        {/* what lands */}
        <Column label="On your desk">
          <div className="rounded-2xl bg-accent/10 px-4 py-4 ring-1 ring-accent/25">
            <span className="inline-flex rounded-full bg-green px-3 py-1 text-label font-bold text-white">{FLOW_OUT.call}</span>
            <span className="mt-2 block text-small leading-snug text-ink2">{FLOW_OUT.note}</span>
          </div>
        </Column>
      </div>

      {/* the four rules the flow runs under */}
      <div className="mt-7 grid gap-x-7 gap-y-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {FLOW_RULES.map((r) => (
          <div key={r.t}>
            <div className="text-small font-semibold text-ink">{r.t}</div>
            <p className="mt-1 text-label leading-snug text-muted">{r.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    /* every station hangs its label on the same line, and centres its own
       body under it, so the row reads as one diagram */
    <div className="flex min-w-0 flex-col">
      <div className="mb-2 font-mono text-label uppercase tracking-[0.14em] text-hint">{label}</div>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}

/* The wire between two stations, with one packet riding it. Vertical on a
   stacked screen, horizontal once the four sit side by side. */
function Wire({ still, delay }: { still: boolean; delay: number }) {
  return (
    <div className="relative mx-auto h-8 w-px shrink-0 self-center lg:mt-5 lg:h-px lg:w-10">
      <span aria-hidden className="absolute inset-0 border-l border-dashed border-line2 lg:border-l-0 lg:border-t" />
      {!still && (
        <>
          {/* the packet travels down the stack, and along the row once the
              four stations sit side by side */}
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-accent lg:hidden"
            animate={{ y: [0, 26, 26] }}
            transition={{ duration: 2.4, repeat: Infinity, delay, ease: EASE, times: [0, 0.55, 1] }}
          />
          <motion.span
            aria-hidden
            className="absolute left-0 top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-accent lg:block"
            animate={{ x: [0, 34, 34] }}
            transition={{ duration: 2.4, repeat: Infinity, delay, ease: EASE, times: [0, 0.55, 1] }}
          />
        </>
      )}
    </div>
  )
}
