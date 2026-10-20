import { ArrowRight, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Platform } from '../components/agents/Platform'
import { UseCases } from '../components/agents/UseCases'
import { Trust } from '../components/agents/Trust'
import { CONTACT_EMAIL } from '../content/site'
import { FadeIn } from '../components/ui/Reveal'
import { Container, Section } from '../components/ui/Section'
import { scrollToEl } from '../lib/scroll'

/* The page shows the agents we run, working, rather than asking anyone to
   assemble one: three tracks, each with its own recording. An agent we have
   not built yet is a conversation, so every card ends at a demo. */

/** every ask on this page goes to the same place */
export const demo = (what: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Demo: ${what}`)}`

export function Agents() {
  return (
    <>
      <Hero />
      <Platform />
      <UseCases />
      <Trust />
      <Steps />
    </>
  )
}

/* Section furniture: a dotted field, concentric orbits and a lavender
   ambient glow. Infrastructure, drawn thinly — it sits behind everything
   and takes no clicks. */
function Field({ rings = true }: { rings?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="dots absolute inset-0 opacity-[0.55]" />
      <div className="absolute -right-40 -top-56 size-[34rem] rounded-full bg-lav-w blur-3xl" />
      <div className="absolute -bottom-64 -left-48 size-[30rem] rounded-full bg-wash2 blur-3xl" />
      {rings && (
        <svg viewBox="0 0 600 600" className="absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 lg:block">
          {[120, 180, 240, 300].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--color-line2)" strokeWidth="1" strokeDasharray={i % 2 ? '3 7' : undefined} opacity={0.5} />
          ))}
          <circle cx="300" cy="60" r="4" fill="var(--color-lime)" />
          <circle cx="540" cy="300" r="3" fill="var(--color-lav)" />
          <circle cx="300" cy="540" r="3" fill="var(--color-accent)" />
        </svg>
      )}
    </div>
  )
}

function Hero() {
  const go = () => scrollToEl('platform')
  return (
    <Section tight className="relative isolate overflow-hidden pt-14 md:pt-20">
      <Field />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-14">
          <FadeIn>
            <div className="eyebrow mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
              Saralya agents
            </div>
            <h1 className="display text-display">
              Agents that do the work, on every desk in the <span className="text-accent">building</span>.
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={go}
                className="rounded-full bg-accent2 px-7 py-3.5 text-body font-medium text-white shadow-[0_14px_30px_-18px_rgba(11,95,79,0.9)] transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                See them running &rarr;
              </button>
              <a
                href={demo('Saralya agents')}
                className="rounded-full bg-white px-7 py-3.5 text-body font-medium text-ink ring-1 ring-line transition hover:bg-lav-w hover:ring-lav focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Book a demo
              </a>
            </div>
          </FadeIn>

          {/* min-w-0: a grid child defaults to min-width:auto, so the long
              JSON lines would widen the whole page instead of scrolling */}
          <FadeIn className="min-w-0">
            <AgentCall />
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}

/* The same shape the builder below produces, written as the call that makes
   it. Uses the POST /v1/... idiom already on /home. The response lands a
   beat later, so the block reads as a request rather than a picture. */
const CALL: [string, string][] = [
  ['{', ''],
  ['  "seat"', '"underwriter"'],
  ['  "reads"', '["bureau", "account_aggregator", "gstn"]'],
  ['  "runs"', '["score_file", "flag_cluster", "write_reasons"]'],
  ['  "cannot"', '["sanction_above_matrix", "skip_kfs"]'],
  ['  "returns"', '"daily_brief"'],
  ['}', ''],
]

function AgentCall() {
  const reduce = useReducedMotion()
  return (
    <div className="relative min-w-0 overflow-hidden rounded-3xl bg-ink shadow-[0_40px_90px_-50px_rgba(13,22,20,0.9)] ring-1 ring-ink">
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-lav/20 blur-3xl" />
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <span className="font-mono text-label tracking-[0.06em] text-accent3">POST /v1/agents</span>
        <span className="font-mono text-label uppercase tracking-[0.12em] text-white/35">application/json</span>
      </div>

      <pre className="overflow-x-auto px-5 py-5 font-mono text-small leading-[1.9]">
        <code>
          {CALL.map(([k, v], i) => (
            <span key={k} className="block whitespace-pre">
              <span className="text-white/45">{k}</span>
              {v && <span className="text-white/30">: </span>}
              <span className="text-accent3">{v}</span>
              {/* no comma on the last pair: it has to be valid JSON */}
              {v && i < CALL.length - 2 && <span className="text-white/30">,</span>}
            </span>
          ))}
        </code>
      </pre>

      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="flex items-center gap-2.5 border-t border-white/10 px-5 py-3.5"
      >
        <span className="size-1.5 rounded-full bg-lime" />
        <span className="font-mono text-label tracking-[0.06em] text-white/70">201 Created</span>
        <span className="ml-auto font-mono text-label uppercase tracking-[0.12em] text-white/35">live in 30 days</span>
      </motion.div>
    </div>
  )
}

/* Anything not on the list is a conversation, not a configurator. */
const BRING = ['Which desk it sits at', 'What it must decide', 'What it leaves in writing']

function Steps() {
  return (
    <Section>
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl bg-ink px-7 py-10 text-white md:px-12 md:py-14">
          <span aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-accent/35 blur-3xl" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-lav/25 blur-3xl" />
          <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-20 -top-24 hidden size-[26rem] opacity-25 md:block">
            {[80, 130, 180].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 8" />
            ))}
          </svg>

          <div className="relative grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div>
              <div className="eyebrow flex items-center gap-2 text-accent3">
                <span className="size-1.5 rounded-full bg-lime" />
                Not on the list?
              </div>
              <h2 className="display mt-3 max-w-[18ch] text-h2 md:text-display">
                Build any other <span className="text-accent3">agent</span>.
              </h2>
              <p className="mt-4 max-w-[52ch] text-lede leading-relaxed text-white/70">
                Tell us the desk and the work it should take off it. We build the agent, wire it beside the core you
                already run, and it reports from day one.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {BRING.map((b) => (
                  <span key={b} className="flex items-center gap-2 rounded-full px-4 py-2 text-small text-white/80 ring-1 ring-white/20">
                    <Check className="size-3.5 text-lime" strokeWidth={2.4} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a
                href={demo('An agent we have not built yet')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-body font-semibold text-ink transition-colors hover:bg-wash"
              >
                Book a demo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className="font-mono text-label uppercase tracking-[0.12em] text-white/40">30 minutes · on your book · under NDA</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
