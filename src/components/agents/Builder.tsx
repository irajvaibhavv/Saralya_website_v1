import { Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { SEATS, VOLUMES, WORK } from '../../content/agents'
import { CHALLENGES, type ChallengeId } from '../../content/saral-ai'
import { CONTACT_EMAIL, MODULES } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* The payoff: the message this agent sends tomorrow morning, and the sum
   behind the hours. The work is picked upstream in the diagram; all this
   section adds is the volume, because the saving means nothing without it. */

export function Builder({
  seat,
  picked,
  vol,
  onVol,
  perFile,
  fixed,
  hours,
  people,
}: {
  seat: number
  picked: ChallengeId[]
  vol: number
  onVol: (i: number) => void
  perFile: number
  fixed: number
  hours: number
  people: string
}) {
  const s = SEATS[seat]
  const flows = CHALLENGES.filter((c) => picked.includes(c.id))
  const modules = MODULES.filter((m) => flows.some((f) => f.module === m.code))
  const files = VOLUMES[vol]

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
          eyebrow="What it gives back"
          title={
            <>
              Tomorrow morning, <span className="text-accent">8:00 am</span>.
            </>
          }
          lede="Nothing here leaves your browser. When it looks right, send it to us and we build it on your data."
        />

        <FadeIn className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
            <div className="p-7 md:p-10">
              <div className="mb-5 flex items-center gap-2.5">
                <Sparkles className="size-4 text-accent" />
                <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">{s.label} agent · daily brief</span>
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
                      className="rounded-xl bg-wash2 px-4 py-3 text-body leading-relaxed text-ink2 ring-1 ring-line"
                    >
                      {WORK[f.id].brief}
                    </motion.li>
                  ))}
                </AnimatePresence>
                {flows.length === 0 && (
                  <li className="text-small text-hint">Tick the work in the diagram above and the agent writes its first message.</li>
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-6 border-t border-line bg-bg p-7 md:p-10 lg:border-l lg:border-t-0">
              <div>
                <div className="eyebrow mb-3">Files a month</div>
                <div className="flex flex-wrap gap-2">
                  {VOLUMES.map((v, i) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={i === vol}
                      onClick={() => onVol(i)}
                      className={`rounded-full px-3.5 py-2 font-mono text-small tabular-nums transition-colors ${
                        i === vol ? 'bg-accent text-white' : 'bg-white text-ink2 ring-1 ring-line hover:bg-wash2'
                      }`}
                    >
                      {v.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
                <div className="flex items-baseline gap-2">
                  <motion.span
                    key={hours}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-figure font-extrabold tabular-nums text-accent"
                  >
                    {hours.toLocaleString('en-IN')}
                  </motion.span>
                  <span className="text-body text-muted">hours a month</span>
                </div>
                {hours > 0 && <p className="mt-1 text-small text-muted">about {people} people, at 160 hours a month</p>}
                <p className="mt-3 font-mono text-label uppercase leading-relaxed tracking-[0.1em] text-hint">
                  {perFile > 0 && `${perFile} min × ${files.toLocaleString('en-IN')} files`}
                  {perFile > 0 && fixed > 0 && ' + '}
                  {fixed > 0 && `${fixed} hrs fixed`}
                  {perFile === 0 && fixed === 0 && 'Pick the work to see the sum'}
                </p>
              </div>

              <div className="mt-auto">
                <ButtonLink to={mailto} variant="ink" arrow>
                  Send us this agent
                </ButtonLink>
                <p className="mt-3 font-mono text-label uppercase tracking-[0.12em] text-hint">We build it on your data in 30 days</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <p className="mt-5 max-w-2xl text-small leading-relaxed text-muted">
          The minutes are our own conservative estimates for manual work, multiplied by the volume you picked, and they are marginal:
          work that overlaps is counted once. We show the sum so you can argue with it.
        </p>
      </Container>
    </Section>
  )
}
