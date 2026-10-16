import { motion, useReducedMotion } from 'motion/react'
import { READY, SEATS } from '../content/agents'
import { Overview } from '../components/agents/Overview'
import { Trust } from '../components/agents/Trust'
import { Wizard } from '../components/agents/Wizard'
import { ClosingCta } from '../components/layout/ClosingCta'
import { FadeIn, Item, Stagger } from '../components/ui/Reveal'
import { Container, Section, SectionHead } from '../components/ui/Section'

/* The page is a sequence, not a dashboard: see the machine running, then
   answer three questions and watch it rebuild as yours.

   The hero is a held stage: it stays put at full height while the
   architecture slides up over it on its own opaque layer, a screen taking
   over a screen rather than two things scrolling together. Sticky does
   this on the compositor — scroll progress maps to travel exactly, with no
   pin spacer to jump and nothing to tear down. */

export function Agents() {
  return (
    <>
      <div className="relative">
        <div className="sticky top-0 z-0 motion-reduce:static">
          <Hero />
        </div>
        <div className="relative z-10 bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.28)]">
          <Overview />
        </div>
      </div>
      <Wizard />
      <Ready />
      <Trust />
      <Steps />
      <ClosingCta />
    </>
  )
}

function Hero() {
  const go = () => document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <Section tight className="flex min-h-[100svh] items-center pt-14 md:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-14">
          <FadeIn>
            <div className="eyebrow mb-4">Saralya agents</div>
            <h1 className="display text-display">
              An agent for every desk in the <span className="text-accent">building</span>.
            </h1>

            {/* the seats, as labels: who the page is for, before any reading */}
            <div className="mt-7 flex flex-wrap gap-2">
              {SEATS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={go}
                  className="rounded-full bg-white px-3.5 py-2 text-small text-ink2 ring-1 ring-line transition-colors hover:bg-wash2 hover:ring-accent/40"
                >
                  {x.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={go}
              className="mt-7 rounded-full bg-ink px-7 py-3.5 text-body font-medium text-white transition-colors hover:bg-ink2"
            >
              Build mine &rarr;
            </button>
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
    <div className="min-w-0 overflow-hidden rounded-3xl bg-ink ring-1 ring-ink">
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
        <span className="size-1.5 rounded-full bg-accent3" />
        <span className="font-mono text-label tracking-[0.06em] text-white/70">201 Created</span>
        <span className="ml-auto font-mono text-label uppercase tracking-[0.12em] text-white/35">live in 30 days</span>
      </motion.div>
    </div>
  )
}

function Ready() {
  return (
    <Section id="ready">
      <Container>
        <SectionHead
          eyebrow="Start from one of these"
          title="Six agents, already assembled."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {READY.map((r) => (
            <Item key={r.name}>
              <button
                type="button"
                onClick={() => document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })}
                className="group h-full w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-line transition-shadow hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <motion.img
                    src={r.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-h3 font-semibold">{r.name}</h3>
                  <p className="mt-2 text-small leading-relaxed text-muted">{r.line}</p>
                  <span className="mt-4 inline-block font-mono text-label uppercase tracking-[0.12em] text-accent">Build this one →</span>
                </div>
              </button>
            </Item>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}

const STEPS = [
  { n: '01', t: 'Describe the desk', d: 'Pick the seat and tick the work. Ten seconds on this page, or one call with us.' },
  { n: '02', t: 'We wire it to your core', d: 'An API layer beside your LOS or core, read-only to begin with. Nothing gets ripped out.' },
  { n: '03', t: 'It reports every morning', d: 'Live in 30 days, on your data, inside the tools your team already opens.' },
]

function Steps() {
  return (
    <Section>
      <Container>
        <SectionHead eyebrow="Getting one" title="Three steps, thirty days." />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <Item key={s.n}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
                <div className="font-mono text-label uppercase tracking-[0.12em] text-accent">{s.n}</div>
                <h3 className="mt-3 text-h3 font-semibold">{s.t}</h3>
                <p className="mt-2 text-small leading-relaxed text-muted">{s.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
