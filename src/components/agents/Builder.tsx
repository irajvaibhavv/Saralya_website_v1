import { Check, Plus, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SEATS, VOLUMES, WORK } from '../../content/agents'
import { CHALLENGES, type ChallengeId } from '../../content/saral-ai'
import { CONTACT_EMAIL, MODULES } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Tick the work, see the agent. The right-hand panel is the message this
   agent would send tomorrow morning, and the hours it gives back: shown as
   the sum, never as a bare claim, because the volume is the visitor's own. */

export function Builder({ seat, onSeat }: { seat: number; onSeat: (i: number) => void }) {
  const s = SEATS[seat]
  const [picked, setPicked] = useState<ChallengeId[]>(() => [...SEATS[seat].does])
  const [vol, setVol] = useState(1)

  function chooseSeat(i: number) {
    onSeat(i)
    setPicked([...SEATS[i].does])
  }

  const flows = CHALLENGES.filter((c) => picked.includes(c.id))
  const modules = MODULES.filter((m) => flows.some((f) => f.module === m.code))
  const files = VOLUMES[vol]

  const perFile = flows.reduce((n, f) => n + (WORK[f.id].perFile ?? 0), 0)
  const fixed = flows.reduce((n, f) => n + (WORK[f.id].perMonth ?? 0), 0)
  const hours = Math.round((perFile * files) / 60 + fixed)
  /* 160 working hours in a month: the honest way to read a four-digit number. */
  const people = (hours / 160).toFixed(1)

  const mailto =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Agent for a ${s.label}`)}` +
    `&body=${encodeURIComponent(
      [
        `Seat: ${s.label}`,
        `Files a month: ${files.toLocaleString('en-IN')}`,
        '',
        'Work to hand over:',
        ...flows.map((f) => `- ${f.label}`),
        '',
        `Modules: ${modules.map((m) => m.name).join(', ') || '—'}`,
        '',
        'Our NBFC: ',
      ].join('\n'),
    )}`

  return (
    <Section id="build">
      <Container>
        <SectionHead
          eyebrow="Build your own"
          title={
            <>
              Tick the work. <span className="text-accent">Meet the agent.</span>
            </>
          }
          lede="Nothing here leaves your browser. When it looks right, send it to us and we build it on your data."
        />

        <FadeIn className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="grid lg:grid-cols-[1fr_minmax(0,460px)]">
            <div className="p-7 md:p-10">
              <div className="eyebrow mb-3">Whose desk</div>
              <div className="flex flex-wrap gap-2">
                {SEATS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={i === seat}
                    onClick={() => chooseSeat(i)}
                    className={`rounded-full px-3.5 py-2 text-small font-semibold transition-colors ${
                      i === seat ? 'bg-ink text-white' : 'bg-bg text-ink2 ring-1 ring-line hover:bg-wash2'
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <div className="eyebrow mb-3 mt-8">What it takes over</div>
              <div className="space-y-2">
                {CHALLENGES.map((c) => {
                  const on = picked.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ring-1 transition-colors ${
                        on ? 'bg-wash2 ring-accent/30' : 'bg-white ring-line hover:bg-bg'
                      }`}
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          on ? 'border-accent bg-accent text-white' : 'border-line2 text-hint'
                        }`}
                      >
                        {on ? <Check className="size-3.5" strokeWidth={3.5} /> : <Plus className="size-3" strokeWidth={3} />}
                      </span>
                      <span className={`text-body ${on ? 'text-ink' : 'text-ink2'}`}>{c.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="eyebrow mb-3 mt-8">Files a month</div>
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

            {/* The agent, as it arrives tomorrow morning. */}
            <div className="flex flex-col gap-5 border-t border-line bg-ink p-7 text-white md:p-10 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-4 text-accent3" />
                <span className="font-mono text-label uppercase tracking-[0.12em] text-white/50">Tomorrow, 8:00 am</span>
              </div>

              <div>
                <h3 className="display text-h3">{s.label} agent</h3>
                <p className="mt-1 text-small text-white/50">
                  {flows.length} {flows.length === 1 ? 'job' : 'jobs'} · {modules.length || '—'} {modules.length === 1 ? 'module' : 'modules'}
                </p>
              </div>

              <ul className="min-h-[200px] space-y-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {flows.map((f) => (
                    <motion.li
                      key={f.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl bg-white/10 px-4 py-3 text-small leading-relaxed text-white/90"
                    >
                      {WORK[f.id].brief}
                    </motion.li>
                  ))}
                </AnimatePresence>
                {flows.length === 0 && <li className="text-small text-white/40">Tick the work on the left and the agent writes its first message.</li>}
              </ul>

              <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="flex items-baseline gap-2">
                  <motion.span key={hours} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="text-figure font-extrabold tabular-nums text-accent3">
                    {hours.toLocaleString('en-IN')}
                  </motion.span>
                  <span className="text-body text-white/60">hours a month</span>
                </div>
                {hours > 0 && <p className="mt-1 text-small text-white/60">about {people} people, at 160 hours a month</p>}
                <p className="mt-3 font-mono text-label uppercase leading-relaxed tracking-[0.1em] text-white/40">
                  {perFile > 0 && `${perFile} min × ${files.toLocaleString('en-IN')} files`}
                  {perFile > 0 && fixed > 0 && ' + '}
                  {fixed > 0 && `${fixed} hrs fixed`}
                  {perFile === 0 && fixed === 0 && 'Pick the work to see the sum'}
                </p>
              </div>

              <div className="mt-auto">
                <ButtonLink to={mailto} variant="white" arrow>
                  Send us this agent
                </ButtonLink>
                <p className="mt-3 font-mono text-label uppercase tracking-[0.12em] text-white/40">We build it on your data in 30 days</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <p className="mt-5 max-w-2xl text-small leading-relaxed text-muted">
          The minutes are our own conservative estimates for manual work, multiplied by the volume you picked. We show the sum so you
          can argue with it: tell us your real numbers and we will run them instead.
        </p>
      </Container>
    </Section>
  )
}
