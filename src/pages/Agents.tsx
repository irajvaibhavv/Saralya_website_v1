import { motion } from 'motion/react'
import { READY } from '../content/agents'
import { Overview } from '../components/agents/Overview'
import { Wizard } from '../components/agents/Wizard'
import { ClosingCta } from '../components/layout/ClosingCta'
import { FadeIn, Item, Stagger } from '../components/ui/Reveal'
import { Container, Section, SectionHead } from '../components/ui/Section'

/* The page is a sequence, not a dashboard: see the machine running, then
   answer three questions and watch it rebuild as yours. */

export function Agents() {
  return (
    <>
      <Hero />
      <Overview />
      <Wizard />
      <Ready />
      <Steps />
      <ClosingCta />
    </>
  )
}

function Hero() {
  return (
    <Section tight className="pt-14 md:pt-20">
      <Container>
        <FadeIn>
          <div className="eyebrow mb-4">Saralya agents</div>
          <h1 className="display max-w-4xl text-display">
            An agent for every desk in the <span className="text-accent">building</span>.
          </h1>
          <button
            type="button"
            onClick={() => document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-7 rounded-xl bg-ink px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-ink2"
          >
            Build mine →
          </button>
        </FadeIn>
      </Container>
    </Section>
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
