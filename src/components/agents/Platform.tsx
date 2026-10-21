import { BarChart3, ChevronDown, Smartphone, Sparkles, Workflow } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { TRACKS } from '../../content/agent-platform'
import { TrackMock } from './TrackMock'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* One platform, four places it works. The tab picks the track, the rows
   open one at a time, and the panel beside them plays that track running.
   Until the recordings land the panel says which one is coming. */

/** how long a row stays open before the next one takes over */
const DWELL = 3500

const TAB_ICONS = { app: Smartphone, workflow: Workflow, analytics: BarChart3, custom: Sparkles } as const

/** the comb of waves every panel wears, drawn once */
export const WAVE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='26'%3E%3Cpath d='M0 13 Q 15 3 30 13 T 60 13 T 90 13 T 120 13' fill='none' stroke='white' stroke-opacity='0.22' stroke-width='2'/%3E%3C/svg%3E\")"

export function Platform() {
  const [track, setTrack] = useState(0)
  const [open, setOpen] = useState(0)
  const still = useReducedMotion()
  const t = TRACKS[track]

  /* the rows open themselves, one after the next; a click restarts the
     wait rather than ending it */
  useEffect(() => {
    if (still) return
    const id = window.setTimeout(() => setOpen((o) => (o + 1) % t.items.length), DWELL)
    return () => window.clearTimeout(id)
  }, [still, open, t])

  const pick = (i: number) => {
    setTrack(i)
    setOpen(0)
  }

  return (
    <Section id="platform">
      <Container>
        <FadeIn>
          <h2 className="display mx-auto text-center text-h2 md:text-display">
            One agentic <span className="text-accent">platform</span>.
          </h2>

          <div role="tablist" aria-label="Where agents work" className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-wash p-1.5">
            {TRACKS.map((x, i) => {
              const Icon = TAB_ICONS[x.id]
              const on = i === track
              return (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => pick(i)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-small font-semibold transition ${on ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                  {x.tab}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] lg:items-start lg:gap-14">
          {/* the rows */}
          <div>
            <h3 className="text-h3 font-semibold">{t.title}</h3>
            <p className="mt-2 max-w-[52ch] text-small leading-relaxed text-muted">{t.lede}</p>

            <div className="mt-6">
              {t.items.map((item, i) => {
                const on = i === open
                return (
                  <div key={item.title} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className={`text-body font-semibold transition-colors ${on ? 'text-ink' : 'text-muted'}`}>{item.title}</span>
                      <ChevronDown className={`size-4 shrink-0 text-muted transition-transform ${on ? 'rotate-180' : ''}`} />
                    </button>
                    {/* the accent rule under the open row, the way the rest of
                        the site marks a live item */}
                    {/* the rule fills while this row holds the panel */}
                    <motion.span
                      key={`rule-${t.id}-${i}-${on}`}
                      initial={{ scaleX: on && !still ? 0 : on ? 1 : 0 }}
                      animate={{ scaleX: on ? 1 : 0 }}
                      transition={{ duration: on && !still ? DWELL / 1000 : 0.25, ease: 'linear' }}
                      className="block h-0.5 origin-left bg-accent"
                    />
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          key="body"
                          initial={still ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden text-small leading-relaxed text-muted"
                        >
                          <span className="block py-4">{item.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

          {/* the recording */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={still ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35 }}
              className={`relative grid place-items-center overflow-hidden rounded-3xl p-7 ring-1 ring-ink/10 ${t.tint}`}
            >
              {/* the field behind the device: flat colour, combed with waves */}
              <span aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: WAVE }} />
              <span aria-hidden className="pointer-events-none absolute -left-20 -top-24 size-64 rounded-full bg-white/20 blur-3xl" />
              {t.video ? (
                <video
                  src={t.video}
                  poster={t.poster ?? undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="size-full rounded-2xl object-cover shadow-lg"
                />
              ) : (
                <TrackMock id={t.id} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
