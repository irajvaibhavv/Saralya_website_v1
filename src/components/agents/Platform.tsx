import { BarChart3, ChevronDown, Smartphone, Sparkles, Workflow } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TRACKS } from '../../content/agent-platform'
import { TrackMock } from './TrackMock'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* One platform, four places it works. The tab picks the track, the rows
   open one at a time, and the panel beside them plays that track running.
   Until the recordings land the panel says which one is coming. */

/** how long a row stays open; the tab turns once every row has had a turn */
const DWELL = 3600

const TAB_ICONS = { app: Smartphone, workflow: Workflow, analytics: BarChart3, custom: Sparkles } as const

/** the comb of waves every panel wears, drawn once */
export const WAVE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='26'%3E%3Cpath d='M0 13 Q 15 3 30 13 T 60 13 T 90 13 T 120 13' fill='none' stroke='white' stroke-opacity='0.22' stroke-width='2'/%3E%3C/svg%3E\")"

export function Platform() {
  const [track, setTrack] = useState(0)
  const [open, setOpen] = useState(0)
  /* the strip stops walking while a pointer is on it, so a tab never moves
     out from under the cursor; the rest of the band is free to scroll past */
  const [held, setHeld] = useState(false)
  const still = useReducedMotion()
  const t = TRACKS[track]

  /* the strip walks itself through the four tracks and loops; a click
     restarts the wait rather than ending it, and a pointer over the band
     holds it where it is */
  useEffect(() => {
    if (still || held) return
    const id = window.setTimeout(() => {
      if (open + 1 < t.items.length) return setOpen(open + 1)
      setTrack((n) => (n + 1) % TRACKS.length)
      setOpen(0)
    }, DWELL)
    return () => window.clearTimeout(id)
  }, [still, held, open, t])

  /* the ink block is one element parked under the strip; it moves to the
     chosen tab rather than being redrawn inside it */
  const strip = useRef<HTMLDivElement>(null)
  const [mark, setMark] = useState({ x: 0, y: 0, w: 0, h: 0 })
  useLayoutEffect(() => {
    const box = strip.current
    if (!box) return
    const read = () => {
      const el = box.querySelectorAll<HTMLElement>('[role="tab"]')[track]
      if (el) setMark({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(box)
    return () => ro.disconnect()
  }, [track])

  const pick = (i: number) => {
    setTrack(i)
    setOpen(0)
  }

  return (
    <Section
      id="platform"
      className="relative isolate overflow-hidden bg-lav-w"
    >
      <Container>
        <FadeIn>
          {/* the band's own geometry: one ring and one disc, cropped flat */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 top-10 size-[30rem] rounded-full border-[30px] border-lav/50" />
            <div className="absolute -right-24 bottom-0 size-64 rounded-full bg-accent/10" />
          </div>

          <h2 className="display mx-auto text-center text-h2 md:text-display">
            One agentic <span className="font-hero font-normal italic text-accent">platform</span>
          </h2>

          <div
            role="tablist"
            ref={strip}
            aria-label="Where agents work"
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
            className="relative mx-auto mt-8 flex w-fit flex-wrap justify-center border border-ink/15 bg-white/60"
          >
            <motion.span
              aria-hidden
              initial={false}
              animate={{ x: mark.x, y: mark.y, width: mark.w, height: mark.h }}
              transition={still ? { duration: 0 } : { duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none absolute left-0 top-0 bg-ink"
            />
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
                  className={`relative flex items-center gap-2 px-5 py-3 font-mono text-small uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    i ? 'border-l border-ink/10' : ''
                  } ${on ? 'text-white' : 'text-muted hover:text-ink'}`}
                >
                  <Icon className={`size-4 transition-colors duration-300 ${on ? 'text-lime' : ''}`} strokeWidth={1.8} />
                  {x.tab}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,620px)] lg:items-start lg:gap-14">
          {/* the rows */}
          <motion.div key={t.id} initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                      <ChevronDown className={`size-4 shrink-0 text-muted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? 'rotate-180' : ''}`} />
                    </button>
                    {/* the accent rule under the open row, the way the rest of
                        the site marks a live item */}
                    {/* the rule fills while this row holds the panel */}
                    <motion.span
                      key={`rule-${t.id}-${i}-${on}`}
                      initial={{ scaleX: on && !still ? 0 : on ? 1 : 0 }}
                      animate={{ scaleX: on ? 1 : 0 }}
                      transition={{ duration: on && !still ? DWELL / 1000 : 0.25, ease: 'linear' }}
                      className="block h-0.5 origin-left bg-gradient-to-r from-accent to-lime"
                    />
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          key="body"
                          initial={still ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.2, ease: 'easeOut', delay: on ? 0.06 : 0 },
                          }}
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
          </motion.div>

          {/* the recording */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={still ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35 }}
              className={`relative grid place-items-center overflow-hidden p-7 ring-1 ring-ink/10 ${t.tint}`}
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
