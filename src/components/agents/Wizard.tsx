import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { PLANS, SEATS, VOLUMES, WANTS, type WantId } from '../../content/agents'
import { CONTACT_EMAIL, MODULES } from '../../content/site'
import { AgentFlow, AgentFrame, type Rail, type Stage } from './AgentFlow'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Four questions, one at a time, each answer opening the next: who you are,
   what you want taken off your desk (in your own words if ours don't fit),
   the agent itself, and how it is bought. One question on screen at a time
   is the whole point — a form with everything showing is the thing the lead
   keeps rejecting. */

const SRC_ICONS = ['bureau', 'data', 'doc', 'shield', 'core', 'voice'] as const
const RIM_ICONS = ['data', 'chart', 'pen', 'bell'] as const
const STEPS = ['Who you are', 'What you want', 'Your agent', 'Plan']

/* SVG text does not wrap, so anything going into the diagram is kept short
   by construction rather than trusted to fit: the rim takes WANTS[].node. */
const moduleName = (code: string | null) => MODULES.find((m) => m.code === code)?.name ?? 'Across your stack'

/* "An underwriter", "a sales manager". */
const an = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a')

export function Wizard() {
  const [step, setStep] = useState(0)
  const [seat, setSeat] = useState<number | null>(null)
  const [picked, setPicked] = useState<WantId[]>([])
  const [note, setNote] = useState('')
  const [vol, setVol] = useState(1)

  const s = seat === null ? null : SEATS[seat]
  const wants = WANTS.filter((w) => picked.includes(w.id))
  const said = note.trim()

  const perFile = wants.reduce((n, w) => n + ('perFile' in w ? w.perFile : 0), 0)
  const fixed = wants.reduce((n, w) => n + ('perMonth' in w ? w.perMonth : 0), 0)
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
    setNote('')
    setStep(0)
  }

  return (
    <Section id="build">
      <Container>
        <SectionHead
          eyebrow="Build your own"
          title={
            <>
              Tell us the desk. Then <span className="text-accent">your agent</span>.
            </>
          }
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

          {/* 2 — what do you want it to take off your desk */}
          {step === 1 && s && (
            <motion.div key="want" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <button type="button" onClick={() => setStep(0)} className="mb-4 inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
                <ArrowLeft className="size-3.5" /> Not {an(s.label)} {s.label.toLowerCase()}
              </button>
              <h3 className="display text-h2">What do you want from your agent?</h3>
              <p className="mt-2 text-lede text-muted">Pick what should come off your desk. The ones your seat usually picks are marked.</p>

              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {WANTS.map((w) => {
                  const on = picked.includes(w.id)
                  const usual = (s.does as readonly string[]).includes(w.id)
                  return (
                    <button
                      key={w.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== w.id) : [...p, w.id]))}
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
                        <span className="block text-body text-ink">{w.label}</span>
                        <span className="mt-1 flex flex-wrap gap-x-3 font-mono text-label uppercase tracking-[0.1em]">
                          <span className="text-hint">{w.side === 'sales' ? 'Sales' : 'Credit'}</span>
                          {usual && <span className="text-accent">Common on this desk</span>}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* in their own words, when none of ours is the real problem */}
              <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
                <label htmlFor="own-words" className="block text-body font-semibold">
                  Or say it in your own words
                </label>
                <p className="mt-1 text-small text-muted">
                  What eats your week? One or two lines is plenty — it goes into the agent as its own job.
                </p>
                <textarea
                  id="own-words"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="e.g. every month my team loses a week building the target deck from branch sheets"
                  className="mt-3 w-full resize-y rounded-xl bg-bg px-4 py-3 text-body outline-none ring-1 ring-line transition placeholder:text-hint focus:ring-accent"
                />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={picked.length === 0 && !said}
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-ink px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-ink2 disabled:cursor-not-allowed disabled:bg-line2"
                >
                  Build my agent →
                </button>
                <span className="text-small text-hint">
                  {picked.length === 0 && !said ? 'Pick one, or type your own' : `${picked.length + (said ? 1 : 0)} job${picked.length + (said ? 1 : 0) === 1 ? '' : 's'}`}
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

              <div className="mt-8">
                <AgentFrame badge={`${s.label} agent`}>
                  <AgentFlow
                    rails={s.sees.slice(0, 5).map((label, i): Rail => ({ label, icon: SRC_ICONS[i % SRC_ICONS.length] }))}
                    stages={[
                      ...wants.map((w): Stage => ({ title: w.node, sub: moduleName(w.module) })),
                      ...(said ? [{ title: 'Your words', sub: 'Written for you' } as Stage] : []),
                    ]
                      .slice(0, 4)
                      .map((st, n) => ({ ...st, icon: RIM_ICONS[n] }))}
                    outcome={{ title: `${hours.toLocaleString('en-IN')} hrs a month`, sub: `${people} people` }}
                    loopLabel={`${s.label}'s day`}
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
                    {wants.map((w) => (
                      <li key={w.id} className="rounded-xl bg-wash2 px-4 py-3 text-body leading-relaxed text-ink2">
                        {w.brief}
                      </li>
                    ))}
                    {said && (
                      <li className="rounded-xl bg-wash2 px-4 py-3 text-body leading-relaxed text-ink2">
                        <span className="font-mono text-label uppercase tracking-[0.12em] text-accent">In your words</span>
                        <span className="mt-1.5 block">{said}</span>
                      </li>
                    )}
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
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-ink2"
                    >
                      Send us this agent <ArrowRight className="size-4" />
                    </button>
                    <p className="mt-3 font-mono text-label uppercase tracking-[0.12em] text-hint">We build it on your data in 30 days</p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-small text-hint">Conservative estimates, counted once where work overlaps.</p>
            </motion.div>
          )}

          {/* 4 — how it is bought */}
          {step === 3 && s && (
            <motion.div key="plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <button type="button" onClick={() => setStep(2)} className="mb-4 inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
                <ArrowLeft className="size-3.5" /> Back to the agent
              </button>
              <h3 className="display text-h2">
                Pick how you want to <span className="text-accent">run it</span>.
              </h3>
              <p className="mt-2 text-lede text-muted">
                Your {s.label.toLowerCase()} agent, with {picked.length + (said ? 1 : 0)} job
                {picked.length + (said ? 1 : 0) === 1 ? '' : 's'} on it. Every tier starts with a call, so nothing is charged before it runs on your data.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {PLANS.map((p) => (
                  <div
                    key={p.id}
                    className={`flex flex-col rounded-2xl p-6 shadow-sm ring-1 ${p.best ? 'bg-ink text-white ring-ink' : 'bg-white ring-line'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-h3 font-semibold">{p.name}</span>
                      {p.best && <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-label uppercase tracking-[0.1em]">Most take this</span>}
                    </div>
                    <div className="display mt-4 text-h3">{p.price}</div>
                    <div className={`mt-1 text-small ${p.best ? 'text-white/60' : 'text-hint'}`}>{p.note}</div>

                    <ul className={`mt-5 space-y-2.5 border-t pt-5 ${p.best ? 'border-white/15' : 'border-line'}`}>
                      {p.includes.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 text-small leading-relaxed">
                          <Check className={`mt-0.5 size-3.5 shrink-0 ${p.best ? 'text-accent3' : 'text-accent'}`} strokeWidth={3} />
                          <span className={p.best ? 'text-white/85' : 'text-ink2'}>{x}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-1">
                      <ButtonLink
                        to={mailtoFor(s.label, files, wants, said, p.name)}
                        variant={p.best ? 'white' : 'ink'}
                        arrow
                      >
                        Send it on {p.name}
                      </ButtonLink>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-small text-hint">
                Indicative pricing. The real number depends on your book and the systems it reads, which is what the call is for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}

function mailtoFor(seat: string, files: number, wants: { label: string; module: string | null }[], said: string, plan: string) {
  const modules = MODULES.filter((m) => wants.some((w) => w.module === m.code))
  return (
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${plan}: agent for a ${seat}`)}` +
    `&body=${encodeURIComponent(
      [
        `Seat: ${seat}`,
        `Plan: ${plan}`,
        `Files a month: ${files.toLocaleString('en-IN')}`,
        '',
        'What it should take off the desk:',
        ...wants.map((w) => `- ${w.label}`),
        ...(said ? ['', 'In their words:', said] : []),
        '',
        `Modules: ${modules.map((m) => m.name).join(', ') || '—'}`,
        '',
        'Our NBFC: ',
      ].join('\n'),
    )}`
  )
}
