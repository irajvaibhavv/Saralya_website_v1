import { motion } from 'motion/react'
import { READY, SEATS } from '../content/agents'
import { Overview } from '../components/agents/Overview'
import { Trust } from '../components/agents/Trust'
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
      <Trust />
      <Steps />
      <ClosingCta />
    </>
  )
}

function Hero() {
  const go = () => document.getElementById('build')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <Section tight className="pt-14 md:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
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
              Build mine →
            </button>
          </FadeIn>

          {/* the building the headline is talking about */}
          <FadeIn className="relative">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-line">
              <img src="/img/meeting.jpg" alt="" loading="lazy" decoding="async" className="h-[300px] w-full object-cover md:h-[400px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
                {['Underwriting', 'Collections', 'Compliance'].map((t) => (
                  <span key={t} className="rounded-full bg-white/90 px-3 py-1.5 font-mono text-label uppercase tracking-[0.12em] text-ink2">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
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
