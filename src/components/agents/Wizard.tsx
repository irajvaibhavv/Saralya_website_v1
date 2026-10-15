import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SEATS, VOLUMES, WORK } from '../../content/agents'
import { CHALLENGES, type ChallengeId } from '../../content/saral-ai'
import { CONTACT_EMAIL, MODULES } from '../../content/site'
import { AgentFlow, AgentFrame, type Rail, type Stage } from './AgentFlow'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Three questions, one at a time, each answer opening the next: who you are,
   what your day looks like, where the time actually goes. The reward at the
   end is the same diagram from the top of the page, rebuilt from the
   answers. One question on screen at a time is the whole point — a form
   with everything showing is the thing the lead keeps rejecting. */

const SRC_ICONS = ['bureau', 'data', 'doc', 'shield', 'core', 'voice'] as const
const STEPS = ['Who you are', 'Your day', 'Your agent']

/* SVG text does not wrap, so anything going into the diagram is kept short
   by construction rather than trusted to fit. */
const clip = (t: string) => (t.length > 30 ? t.slice(0, 29).trimEnd() + '…' : t)
const moduleName = (code: string | null) => MODULES.find((m) => m.code === code)?.name ?? 'Across your stack'

/* "An underwriter", "a legal officer". */
const an = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a')

export function Wizard() {
  const [step, setStep] = useState(0)
  const [seat, setSeat] = useState<number | null>(null)
  const [picked, setPicked] = useState<ChallengeId[]>([])
  const [vol, setVol] = useState(1)

  const s = seat === null ? null : SEATS[seat]
  const flows = CHALLENGES.filter((c) => picked.includes(c.id))

  const perFile = picked.reduce((n, id) => n + (WORK[id].perFile ?? 0), 0)
  const fixed = picked.reduce((n, id) => n + (WORK[id].perMonth ?? 0), 0)
  const files = VOLUMES[vol]
  const hours = Math.round((perFile * files) / 60 + fixed)
  /* 160 working hours in a month: the honest way to read a four-digit number. */
  const people = (hours / 160).toFixed(1)

  function pickSeat(i: number) {
    setSeat(i)
    setPicked([])
    setStep(1)
  }

  function reset() {
    setSeat(null)
    setPicked([])
    setStep(0)
  }

  return (
    <Section id="build">
      <Container>
        <SectionHead
          eyebrow="Build your own"
          title={
            <>
              Three questions. Then <span className="text-accent">your agent</span>.
            </>
          }
          lede="Nothing here leaves your browser."
        />

        {/* progress */}
        <FadeIn className="mb-6 flex items-center gap-3">
          {STEPS.map((t, i) => (
            <div key={t} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-ink' : 'text-hint'}`}>
                <span
                  className={`grid size-6 place-items-center rounded-full font-mono text-label transition-colors ${
                    i < step ? 'bg-accent text-white' : i === step ? 'bg-ink text-white' : 'bg-bg text-hint ring-1 ring-line'
                  }`}
                >
                  {i < step ? <Check className="size-3" strokeWidth={3.5} /> : i + 1}
                </span>
                <span className="hidden text-small font-semibold sm:block">{t}</span>
              </div>
              {i < STEPS.length - 1 && <span className={`h-px w-8 ${i < step ? 'bg-accent' : 'bg-line'}`} />}
            </div>
          ))}
          {step > 0 && (
            <button type="button" onClick={reset} className="ml-auto inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
              <RotateCcw className="size-3.5" /> Start over
            </button>
          )}
        </FadeIn>

        <AnimatePresence mode="wait">
          {/* 1 — who are you */}
          {step === 0 && (
            <motion.div key="who" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <h3 className="display text-h2">Who are you?</h3>
              <p className="mt-2 text-lede text-muted">Pick the desk you sit at.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SEATS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => pickSeat(i)}
                    className="group flex flex-col rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-h3 font-semibold leading-tight">{x.label}</div>
                        <div className="mt-1 font-mono text-label uppercase tracking-[0.12em] text-accent">{x.short}</div>
                      </div>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-line2 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <p className="mt-3.5 border-t border-line pt-3.5 text-small leading-relaxed text-muted">{x.handsBack}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2 — your day, then where the time goes */}
          {step === 1 && s && (
            <motion.div key="day" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <button type="button" onClick={() => setStep(0)} className="mb-4 inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
                <ArrowLeft className="size-3.5" /> Not {an(s.label)} {s.label.toLowerCase()}
              </button>
              <h3 className="display text-h2">{an(s.label) === 'an' ? 'An' : 'A'} {s.label.toLowerCase()}’s day.</h3>
              <p className="mt-2 max-w-2xl text-lede text-muted">
                You read {s.sees.slice(0, 3).join(', ')}, you work in {s.actsIn.join(' and ').toLowerCase()}, and none of it
                can cross {s.cannot.length} hard lines. Now: <span className="font-semibold text-ink">where does the time actually go?</span>
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {CHALLENGES.map((c) => {
                  const on = picked.includes(c.id)
                  const usual = s.does.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                      className={`flex items-start gap-3 rounded-2xl p-4 text-left shadow-sm ring-1 transition-all ${
                        on ? 'bg-wash2 ring-accent/40' : 'bg-white ring-line hover:ring-line2'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          on ? 'border-accent bg-accent text-white' : 'border-line2'
                        }`}
                      >
                        {on && <Check className="size-3.5" strokeWidth={3.5} />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-body text-ink">{c.label}</span>
                        {usual && <span className="mt-1 block font-mono text-label uppercase tracking-[0.1em] text-accent">Common on this desk</span>}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={picked.length === 0}
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-ink px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-ink2 disabled:cursor-not-allowed disabled:bg-line2"
                >
                  Build my agent →
                </button>
                <span className="text-small text-hint">
                  {picked.length === 0 ? 'Pick at least one' : `${picked.length} picked`}
                </span>
              </div>
            </motion.div>
          )}

          {/* 3 — the agent */}
          {step === 2 && s && (
            <motion.div key="agent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <button type="button" onClick={() => setStep(1)} className="mb-4 inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
                <ArrowLeft className="size-3.5" /> Change the work
              </button>
              <h3 className="display text-h2">
                Your <span className="text-accent">{s.label.toLowerCase()}</span> agent.
              </h3>
              <p className="mt-2 text-lede text-muted">Same five layers as the one above, filled in with your answers.</p>

              <div className="mt-8">
                <AgentFrame badge={`${s.label} agent`}>
                  <AgentFlow
                    rails={s.sees.slice(0, 5).map((label, i): Rail => ({ label, icon: SRC_ICONS[i % SRC_ICONS.length] }))}
                    stages={flows.slice(0, 3).map((f): Stage => ({ title: clip(f.label), sub: moduleName(f.module) }))}
                    outcome={{ title: `${hours.toLocaleString('en-IN')} hrs a month`, sub: `${people} people, back on other work` }}
                    metrics={[
                      { label: 'Hours a month', value: `↑ ${hours.toLocaleString('en-IN')}` },
                      { label: 'People, back on other work', value: `↑ ${people}` },
                      { label: 'Hard limits it cannot cross', value: String(s.cannot.length) },
                    ]}
                  />
                </AgentFrame>
              </div>

              {/* the brief + the arithmetic */}
              <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line md:p-7">
                  <div className="mb-4 flex items-center gap-2.5">
                    <Sparkles className="size-4 text-accent" />
                    <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">Tomorrow, 8:00 am</span>
                  </div>
                  <ul className="space-y-2.5">
                    {flows.map((f) => (
                      <li key={f.id} className="rounded-xl bg-wash2 px-4 py-3 text-body leading-relaxed text-ink2">
                        {WORK[f.id].brief}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line md:p-7">
                  <div>
                    <div className="eyebrow mb-3">Files a month</div>
                    <div className="flex flex-wrap gap-2">
                      {VOLUMES.map((v, i) => (
                        <button
                          key={v}
                          type="button"
                          aria-pressed={i === vol}
                          onClick={() => setVol(i)}
                          className={`rounded-full px-3.5 py-2 font-mono text-small tabular-nums transition-colors ${
                            i === vol ? 'bg-accent text-white' : 'bg-bg text-ink2 ring-1 ring-line hover:bg-wash2'
                          }`}
                        >
                          {v.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="font-mono text-label uppercase leading-relaxed tracking-[0.1em] text-hint">
                    {perFile > 0 && `${perFile} min × ${files.toLocaleString('en-IN')} files`}
                    {perFile > 0 && fixed > 0 && ' + '}
                    {fixed > 0 && `${fixed} hrs fixed`}
                  </p>
                  <div className="mt-auto">
                    <ButtonLink to={mailtoFor(s.label, files, flows)} variant="ink" arrow>
                      Send us this agent
                    </ButtonLink>
                    <p className="mt-3 font-mono text-label uppercase tracking-[0.12em] text-hint">We build it on your data in 30 days</p>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-small leading-relaxed text-muted">
                The minutes are our own conservative estimates for manual work, and they are marginal: work that overlaps is counted
                once. We show the sum so you can argue with it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}

function mailtoFor(seat: string, files: number, flows: { id: string; label: string; module: string | null }[]) {
  const modules = MODULES.filter((m) => flows.some((f) => f.module === m.code))
  return (
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Agent for a ${seat}`)}` +
    `&body=${encodeURIComponent(
      [
        `Seat: ${seat}`,
        `Files a month: ${files.toLocaleString('en-IN')}`,
        '',
        'Where the time goes:',
        ...flows.map((f) => `- ${f.label}`),
        '',
        `Modules: ${modules.map((m) => m.name).join(', ') || '—'}`,
        '',
        'Our NBFC: ',
      ].join('\n'),
    )}`
  )
}
