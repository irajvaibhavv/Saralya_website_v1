import { BarChart3, Database, IndianRupee, ShieldCheck, Users } from 'lucide-react'
import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ROLES, type Starter } from '../../content/saral-ai'
import type { Role } from './SaralAiChat'
import { FadeIn } from '../ui/Reveal'
import { scrollToY } from '../../lib/scroll'
import { Container } from '../ui/Section'

/* Under the platform cards, on the same screen: say who you are, and the
   questions your seat asks most rise into the gap below. Nothing is there
   until a seat is picked. A click opens Saral with it; scroll past instead
   and Saarthi takes over anyway. */
const ICONS = [BarChart3, Database, IndianRupee, Users, ShieldCheck]
const TONE = 'bg-wash text-accent'

const EASE = [0.22, 1, 0.36, 1] as const

export function PopularQuestions({ onAsk, seat, onSeat }: { onAsk: (s: Starter) => void; seat: Role | null; onSeat: (r: Role | null) => void }) {
  const row = seat ? [...seat.qs, ...seat.qs] : []
  const still = useReducedMotion()

  /* Picking a seat adds a row below the fold, so bring the screen up until
     that row is on it — never past the screen's own top. */
  useEffect(() => {
    const el = document.getElementById('explore')
    if (!seat || !el) return
    scrollToY(Math.max(el.offsetTop, el.offsetTop + el.offsetHeight - window.innerHeight))
  }, [seat])

  return (
    <section className="pb-6">
      <Container>
        <FadeIn>
          <h2 className="display text-h2">
            Who are you<span className="text-accent">?</span>
          </h2>
          <p className="mt-3 max-w-[46ch] text-lede leading-relaxed text-muted">
            Pick your seat. Saral Saarthi answers in the language of your desk.
          </p>

          <div role="group" aria-label="I am a" className="mt-7 flex flex-wrap gap-2.5">
            {ROLES.map((r) => {
              const on = seat?.id === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSeat(on ? null : r)}
                  className={`rounded-full px-4 py-2.5 text-body font-medium ring-1 transition-colors ${on ? 'bg-accent text-white ring-accent' : 'bg-white text-ink2 ring-line hover:ring-accent/50'}`}
                >
                  {r.label}
                </button>
              )
            })}
          </div>
        </FadeIn>
      </Container>

      <AnimatePresence mode="wait">
        {seat && (
        <motion.div
          key={seat.id}
          initial={still ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.18 } }}
          transition={{ duration: 0.5, ease: EASE }}
          id="asked"
          className="mt-7"
        >
          <Container>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="text-lede font-semibold tracking-tight">Most asked questions</h3>
              <span className="hidden text-small text-hint sm:block">Click one to ask Saral</span>
            </div>
          </Container>
          <div className="mask-fade-x overflow-hidden">
            <div className="flex w-max animate-marquee gap-3 pl-3 [animation-duration:55s]">
              {row.map((s, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <button
                    key={`${s.q}-${i}`}
                    type="button"
                    onClick={() => onAsk(s)}
                    className="flex min-h-[76px] w-[300px] items-center gap-3 rounded-2xl border border-line2 bg-white px-4 py-3.5 text-left"
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${TONE}`}>
                      <Icon className="size-4.5" />
                    </span>
                    <span className="text-body font-medium leading-snug text-ink">{s.q}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
