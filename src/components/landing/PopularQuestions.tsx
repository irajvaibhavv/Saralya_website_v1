import { BarChart3, Database, IndianRupee, ShieldCheck, Users } from 'lucide-react'
import { POPULAR_QS, ROLES, type Starter } from '../../content/saral-ai'
import type { Role } from './SaralAiChat'
import { FadeIn } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Questions drift past under the hero. Pick a seat and they become the
   ones that seat asks; a click opens Saral with the question. Every card
   keeps the same hairline — nothing lifts or lights up on hover. */
const ICONS = [BarChart3, Database, IndianRupee, Users, ShieldCheck]
const TONE = 'bg-wash text-accent'

export function PopularQuestions({ onAsk, seat, onSeat }: { onAsk: (s: Starter) => void; seat: Role | null; onSeat: (r: Role | null) => void }) {
  const qs = seat ? seat.qs : POPULAR_QS
  const row = [...qs, ...qs]
  return (
    <FadeIn className="py-10 md:py-14">
      <Container>
        {/* step one: say who you are; the questions and Saral both follow */}
        <div className="rounded-2xl bg-bg px-5 py-4 ring-1 ring-line sm:flex sm:items-center sm:gap-6">
          <div className="shrink-0">
            <div className="text-body font-semibold tracking-tight">Who are you?</div>
            <div className="text-small text-muted">Pick your seat and Saral tailors the questions.</div>
          </div>
          <div role="group" aria-label="I am a" className="mt-3 flex flex-wrap gap-2 sm:mt-0">
            {ROLES.map((r) => {
              const on = seat?.id === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSeat(on ? null : r)}
                  className={`rounded-full px-3.5 py-2 text-small font-medium ring-1 transition-colors ${on ? 'bg-accent text-white ring-accent' : 'bg-white text-ink2 ring-line hover:ring-accent/50'}`}
                >
                  {r.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mb-5 mt-8 flex items-baseline justify-between gap-4">
          <h2 className="text-lede font-semibold tracking-tight">{seat ? `What ${seat.label.toLowerCase()}s ask` : 'Popular questions from NBFCs'}</h2>
          <span className="hidden text-small text-hint sm:block">Click one to ask Saral</span>
        </div>
      </Container>
      <div className="mask-fade-x overflow-hidden">
        <div key={seat?.id ?? 'all'} className="flex w-max animate-marquee gap-3 pl-3 [animation-duration:55s]">
          {row.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <button
                key={`${s.q}-${i}`}
                type="button"
                onClick={() => onAsk(s)}
                className="flex w-[300px] items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left ring-1 ring-line"
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
    </FadeIn>
  )
}
