import { BarChart3, FileText, IndianRupee, ShieldCheck, Users } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ROLES, type Starter } from '../../content/saral-ai'
import type { Role } from './SaralAiChat'
import { FadeIn } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Its own screen: say who you are, and the questions your seat asks most
   rise in underneath. A click opens Saral with one; scroll past instead
   and Saarthi takes the screen anyway. */
const SEAT_ICONS: Record<string, typeof Users> = {
  verify: ShieldCheck,
  credit: FileText,
  uw: BarChart3,
  collections: IndianRupee,
  sales: Users,
}
const CARD_ICONS = [BarChart3, FileText, IndianRupee, Users, ShieldCheck]
const EASE = [0.22, 1, 0.36, 1] as const

export function PopularQuestions({ onAsk, seat, onSeat }: { onAsk: (s: Starter) => void; seat: Role | null; onSeat: (r: Role | null) => void }) {
  const row = seat ? [...seat.qs, ...seat.qs] : []
  const still = useReducedMotion()

  return (
    <section className="flex h-full min-h-[100svh] flex-col justify-center pt-16">
      <Container>
        <FadeIn>
          <h2 className="display text-h2">
            Who are you<span className="text-accent">?</span>
          </h2>
          <p className="mt-3 max-w-[46ch] text-lede leading-relaxed text-muted">
            Pick your seat. Saral Saarthi answers in the language of your desk.
          </p>

          <div role="group" aria-label="I am a" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ROLES.map((r) => {
              const on = seat?.id === r.id
              const Icon = SEAT_ICONS[r.id] ?? Users
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSeat(on ? null : r)}
                  className={`group flex flex-col gap-7 rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(13,22,20,0.45)] focus-visible:-translate-y-1 focus-visible:outline-none ${on ? 'border-accent bg-accent text-white' : 'border-line2 bg-white text-ink hover:border-accent/40 focus-visible:border-accent/40'}`}
                >
                  <span className={`grid size-11 place-items-center rounded-xl transition-colors duration-300 ${on ? 'bg-white/15 text-white' : 'bg-wash text-accent group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white'}`}>
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="mt-auto block">
                    <span className="block text-body font-semibold leading-snug">{r.label}</span>
                    {/* same rule as the platform cards: the accent runs across
                        it on hover, and it never changes the tile's size */}
                    <span className={`mt-3 block h-px w-full overflow-hidden ${on ? 'bg-white/25' : 'bg-line'}`}>
                      <span className={`block h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${on ? 'bg-white/70' : 'bg-accent'}`} />
                    </span>
                    <span className={`mt-3 block text-small leading-snug ${on ? 'text-white/70' : 'text-muted'}`}>{r.asks}</span>
                  </span>
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
            className="mt-8"
          >
            <Container>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lede font-semibold tracking-tight">Most asked questions</h3>
                <span className="hidden text-small text-hint sm:block">Click one to ask Saral</span>
              </div>
            </Container>
            <div className="mask-fade-x overflow-hidden">
              <div className="flex w-max animate-marquee gap-3 pl-3 [animation-duration:55s]">
                {row.map((s, i) => {
                  const Icon = CARD_ICONS[i % CARD_ICONS.length]
                  return (
                    <button
                      key={`${s.q}-${i}`}
                      type="button"
                      onClick={() => onAsk(s)}
                      className="flex min-h-[76px] w-[300px] items-center gap-3 rounded-2xl border border-line2 bg-white px-4 py-3.5 text-left"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-wash text-accent">
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
