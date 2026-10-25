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
const demo = (what: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Demo: ${what}`)}`

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

/* The hero is a solid block, not a page with decoration on it: ink field,
   a lime disc and a lavender ring cropped by the edges, a rule grid, Clash
   for the headline and Geist Mono for the labels. Every shape is flat: no
   blur, no glass, no glow. */
function Hero() {
  const go = () => scrollToEl('platform')
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* the shapes, all solid, all cropped by the frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute -bottom-72 -left-60 size-[26rem] rounded-full bg-lav" />
        <div className="absolute -right-40 -top-52 size-[42rem] rounded-full border-[32px] border-lime/70" />
        <div className="absolute right-[12%] top-0 h-28 w-px bg-lime" />
        <div className="absolute bottom-0 left-[46%] h-20 w-px bg-lav" />
      </div>

      <Container className="relative py-14 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,500px)] lg:gap-16">
          <FadeIn>
            <div className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-lime">
              <span className="size-2 bg-lime" />
              Saralya agents
            </div>

            <h1 className="display mt-6 max-w-[14ch] text-display leading-[0.98]">
              Agents that do the work, on every desk in the{' '}
              <span className="text-lime">building</span>
            </h1>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={go}
                className="bg-lime px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                See them running
              </button>
              <a
                href={demo('Saralya agents')}
                className="border border-white/35 px-8 py-4 text-body font-semibold text-white transition hover:border-lav hover:bg-lav hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav"
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

      {/* the band ends on a hard lime rule, not a fade */}
      <div aria-hidden className="h-2 w-full bg-lime" />
    </section>
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
    <div className="relative min-w-0 overflow-hidden border-l-8 border-lime bg-[#0a110f] ring-1 ring-white/15">
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
        <FadeIn className="relative overflow-hidden bg-lime px-7 py-12 text-ink md:px-14 md:py-16">
          {/* two discs and a rule, cropped: the same vocabulary as the hero */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 size-80 rounded-full border-[28px] border-ink/10" />
            <div className="absolute -bottom-32 right-[18%] size-56 rounded-full bg-ink/10" />
            <div className="absolute left-0 top-0 h-full w-2 bg-ink" />
          </div>

          <div className="relative grid items-end gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-ink/70">
                <span className="size-2 bg-ink" />
                Not on the list?
              </div>
              <h2 className="display mt-4 max-w-[16ch] text-h2">
                Build any other{' '}
                agent
              </h2>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5">
                {BRING.map((b) => (
                  <span key={b} className="flex items-center gap-2 text-small font-semibold text-ink/80">
                    <Check className="size-3.5" strokeWidth={3} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a
                href={demo('An agent we have not built yet')}
                className="group inline-flex items-center gap-2.5 bg-ink px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-lime transition hover:bg-ink2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                Book a demo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className="font-mono text-label uppercase tracking-[0.14em] text-ink/60">30 minutes · on your book · under NDA</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
