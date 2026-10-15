import { motion } from 'motion/react'
import { useState } from 'react'
import type { ChallengeId } from '../content/saral-ai'
import { READY, SEATS, VOLUMES, WORK } from '../content/agents'
import { Builder } from '../components/agents/Builder'
import { Flow } from '../components/agents/Flow'
import { ClosingCta } from '../components/layout/ClosingCta'
import { FadeIn, Item, Stagger } from '../components/ui/Reveal'
import { Container, Section, SectionHead } from '../components/ui/Section'

/* One seat is chosen for the whole page: the hero tags, the architecture and
   the builder all read it, so picking a ready-made agent lands you in the
   builder already set up. */

export function Agents() {
  const [seat, setSeat] = useState(0)
  const [picked, setPicked] = useState<ChallengeId[]>(() => [...SEATS[0].does])
  const [vol, setVol] = useState(1)

  /* Switching seat resets the work to what that desk feels first, so the
     diagram is never empty and never shows someone else's job. */
  function chooseSeat(i: number) {
    setSeat(i)
    setPicked([...SEATS[i].does])
  }

  function start(id: string) {
    const i = SEATS.findIndex((s) => s.id === id)
    if (i >= 0) chooseSeat(i)
    document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
  }

  const perFile = picked.reduce((n, id) => n + (WORK[id].perFile ?? 0), 0)
  const fixed = picked.reduce((n, id) => n + (WORK[id].perMonth ?? 0), 0)
  const hours = Math.round((perFile * VOLUMES[vol]) / 60 + fixed)
  /* 160 working hours in a month: the honest way to read a four-digit number. */
  const people = (hours / 160).toFixed(1)

  return (
    <>
      <Hero onSeat={chooseSeat} />
      <Flow
        seat={seat}
        onSeat={chooseSeat}
        picked={picked}
        onPick={(id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))}
        hours={hours}
        people={people}
      />
      <Ready onStart={start} />
      <Builder seat={seat} picked={picked} vol={vol} onVol={setVol} perFile={perFile} fixed={fixed} hours={hours} people={people} />
      <Steps />
      <ClosingCta />
    </>
  )
}

function Hero({ onSeat }: { onSeat: (i: number) => void }) {
  return (
    <Section tight className="pt-14 md:pt-20">
      <Container>
        <FadeIn>
          <div className="eyebrow mb-4">Saralya agents</div>
          <h1 className="display max-w-4xl text-display">
            An agent for every desk in the <span className="text-accent">building</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lede leading-relaxed text-muted">
            Your underwriter, your collections officer and your compliance head do not do the same job, so they should not get the
            same assistant. Pick a seat, pick the work, and we build that agent on your own data.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {SEATS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onSeat(i)
                  document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-full bg-white px-4 py-2 text-small font-semibold text-ink2 ring-1 ring-line transition-colors hover:bg-wash2"
              >
                {s.label}
              </button>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

function Ready({ onStart }: { onStart: (id: string) => void }) {
  return (
    <Section id="ready">
      <Container>
        <SectionHead
          eyebrow="Start from one of these"
          title="Six agents, already assembled."
          lede="Every one of them is the same five layers, filled in. Open one and change whatever does not fit your book."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {READY.map((r) => (
            <Item key={r.name}>
              <button
                type="button"
                onClick={() => onStart(r.seat)}
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
                  <span className="mt-4 inline-block font-mono text-label uppercase tracking-[0.12em] text-accent">Open this agent →</span>
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
