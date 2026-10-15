import { Ban, Building2, Database, FileText, Landmark, Phone, Server, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SEATS } from '../../content/agents'
import { CHALLENGES, type ChallengeId } from '../../content/saral-ai'
import { Container, Section, SectionHead } from '../ui/Section'
import { FadeIn } from '../ui/Reveal'

/* The agent as one left-to-right flow: what it reads, the agent itself with
   its limits, the work it runs, what comes out. Pick a seat and tick the
   work and every node re-labels. Nothing here is decorative: each node is a
   layer we would actually have to build. */

const SRC_ICONS = [Database, Landmark, FileText, Building2, Server, Phone]

function Arrow() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 64 8" className="hidden h-2 w-14 shrink-0 self-center xl:block" aria-hidden>
      <motion.line
        x1="0"
        y1="4"
        x2="54"
        y2="4"
        stroke="var(--color-accent3)"
        strokeWidth="2"
        strokeDasharray="4 5"
        animate={reduce ? undefined : { strokeDashoffset: [0, -18] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
      <path d="M54 1 L62 4 L54 7 Z" fill="var(--color-accent3)" />
    </svg>
  )
}

function Node({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-3 font-mono text-label uppercase tracking-[0.12em] text-accent3">{label}</div>
      {children}
    </div>
  )
}

export function Flow({
  seat,
  onSeat,
  picked,
  onPick,
  hours,
  people,
}: {
  seat: number
  onSeat: (i: number) => void
  picked: ChallengeId[]
  onPick: (id: ChallengeId) => void
  hours: number
  people: string
}) {
  const reduce = useReducedMotion()
  const s = SEATS[seat]
  const flows = CHALLENGES.filter((c) => picked.includes(c.id))

  return (
    <Section id="architecture">
      <Container>
        <SectionHead
          eyebrow="How an agent is built"
          title={
            <>
              Pick your seat. Watch it <span className="text-accent">assemble</span>.
            </>
          }
          lede="An agent is not a chat window. It is what it may read, what it may do, the limits it cannot cross, and what lands on your desk in the morning."
        />

        <FadeIn className="overflow-hidden rounded-3xl bg-ink text-white">
          {/* grid wash, so the dark panel reads as a canvas and not a card */}
          <div className="relative bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent3/10 px-3 py-1.5 font-mono text-label uppercase tracking-[0.12em] text-accent3">
                <span className="size-1.5 rounded-full bg-accent3" />
                {s.label} agent
              </span>
              <span className="font-mono text-label uppercase tracking-[0.12em] text-white/40">RBI-supervised by design</span>
            </div>

            <div className="px-5 py-6 md:px-7">
              {/* seat tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {SEATS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={i === seat}
                    onClick={() => onSeat(i)}
                    className={`rounded-full border px-4 py-2 text-small font-semibold transition-colors ${
                      i === seat ? 'border-accent3 text-white' : 'border-white/15 text-white/55 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              {/* work picks: the thing that personalises everything downstream */}
              <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
                {CHALLENGES.map((c) => {
                  const on = picked.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => onPick(c.id)}
                      className={`rounded-lg px-3 py-1.5 text-small transition-colors ${
                        on ? 'bg-accent3/20 text-white ring-1 ring-accent3/50' : 'text-white/40 ring-1 ring-white/10 hover:text-white/70'
                      }`}
                    >
                      {on ? '− ' : '+ '}
                      {c.label}
                    </button>
                  )
                })}
              </div>

              {/* the flow */}
              <div className="mt-9 flex flex-col gap-8 xl:flex-row xl:items-stretch xl:gap-2">
                <Node label="What it reads">
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {s.sees.map((t, i) => {
                        const Icon = SRC_ICONS[i % SRC_ICONS.length]
                        return (
                          <motion.span
                            key={s.id + t}
                            layout
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22, delay: i * 0.04 }}
                            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-small text-white/80 ring-1 ring-white/10"
                          >
                            <Icon className="size-3.5 shrink-0 text-accent3" strokeWidth={2} />
                            {t}
                          </motion.span>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                  <p className="mt-3 text-small text-white/35">Read-only, on your consent</p>
                </Node>

                <Arrow />

                {/* the agent core */}
                <Node label="The agent">
                  <div className="relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.75rem] border border-accent3/45 bg-accent3/[0.07] p-6">
                    <div className="grid flex-1 grid-cols-5 content-center gap-x-5 gap-y-4">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="size-2 justify-self-center rounded-full bg-accent3"
                          animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 2.4, repeat: Infinity, delay: ((i * 5) % 11) * 0.2, ease: 'easeInOut' }}
                        />
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
                      <ShieldCheck className="size-4 shrink-0 text-accent3" strokeWidth={2} />
                      <span className="text-small text-white/70">Your policy, your delegation matrix</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {s.cannot.map((c) => (
                      <motion.div
                        key={s.id + c}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-2 text-small text-red"
                      >
                        <Ban className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.5} />
                        <span>{c}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-2 text-small text-white/35">Hard limits, not prompts</p>
                </Node>

                <Arrow />

                {/* the work */}
                <Node label="The work it runs">
                  <div className="rounded-[2rem] border border-dashed border-accent3/45 p-5">
                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {flows.map((f) => (
                          <motion.div
                            key={f.id}
                            layout
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-xl bg-white/[0.06] px-3 py-2 text-small text-white/80"
                          >
                            {f.label}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {flows.length === 0 && <p className="py-4 text-center text-small text-white/30">Add work above</p>}
                    </div>
                  </div>
                  <p className="mt-3 text-small text-white/35">Inside {s.actsIn.join(' and ').toLowerCase()}</p>
                </Node>

                <Arrow />

                {/* outcomes */}
                <Node label="What comes back">
                  <div className="space-y-5">
                    <div>
                      <div className="text-small text-white/45">Hours a month</div>
                      <motion.div
                        key={hours}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-stat font-extrabold tabular-nums text-accent3"
                      >
                        ↑ {hours.toLocaleString('en-IN')}
                      </motion.div>
                    </div>
                    <div>
                      <div className="text-small text-white/45">People, back on other work</div>
                      <div className="text-stat font-extrabold tabular-nums text-accent3">↑ {people}</div>
                    </div>
                    <div>
                      <div className="text-small text-white/45">Every morning</div>
                      <p className="mt-1 text-small leading-relaxed text-white/80">{s.handsBack}</p>
                    </div>
                  </div>
                </Node>
              </div>

              {/* captions, the way the reference does it */}
              <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-4">
                {[
                  ['Knows your book', 'Every system, policy and past file you already hold'],
                  ['Decides in the open', 'Reason codes on every call, not a score with no why'],
                  ['Cannot cross the line', 'The SCN clock, the KFS, DPDP consent, the calling window'],
                  ['Lands on your desk', 'Real work removed, counted in hours you can check'],
                ].map(([t, d]) => (
                  <div key={t}>
                    <div className="text-body font-semibold text-accent3">{t}</div>
                    <p className="mt-1.5 text-small leading-relaxed text-white/45">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
