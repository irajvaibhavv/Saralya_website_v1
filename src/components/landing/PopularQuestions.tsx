import { BarChart3, Database, IndianRupee, ShieldCheck, Users } from 'lucide-react'
import { POPULAR_QS, ROLES, type Starter } from '../../content/saral-ai'
import type { Role } from './SaralAiChat'
import { FadeIn } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Questions drift past under the hero. Pick a seat and they become the ones
   that seat asks; hover holds them; a click opens Saral with the question. */
const ICONS = [BarChart3, Database, IndianRupee, Users, ShieldCheck]
const TONES = ['bg-wash text-accent', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-purple-w text-purple', 'bg-amber-w text-amber']

export function PopularQuestions({ onAsk, seat, onSeat }: { onAsk: (s: Starter) => void; seat: Role | null; onSeat: (r: Role | null) => void }) {
  const qs = seat ? seat.qs : POPULAR_QS
  const row = [...qs, ...qs]
  return (
    <FadeIn className="py-10 md:py-14">
      <Container className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h2 className="text-[17px] font-semibold tracking-tight">{seat ? `What ${seat.label.toLowerCase()}s ask` : 'Popular questions from NBFCs'}</h2>
        <div role="group" aria-label="I am a" className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[13px] text-hint">I’m a…</span>
          {ROLES.map((r) => {
            const on = seat?.id === r.id
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSeat(on ? null : r)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium ring-1 transition-colors ${on ? 'bg-ink text-white ring-ink' : 'bg-white text-ink2 ring-line hover:ring-accent/40'}`}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </Container>
      <div className="mask-fade-x overflow-hidden">
        <div key={seat?.id ?? 'all'} className="flex w-max animate-marquee gap-3 pl-3 [animation-duration:55s] hover:[animation-play-state:paused]">
          {row.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <button
                key={`${s.q}-${i}`}
                type="button"
                onClick={() => onAsk(s)}
                className="flex w-[300px] items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left ring-1 ring-line transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-md hover:ring-accent/30"
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${TONES[i % TONES.length]}`}>
                  <Icon className="size-4.5" />
                </span>
                <span className="text-[14px] font-medium leading-snug text-ink">{s.q}</span>
              </button>
            )
          })}
        </div>
      </div>
    </FadeIn>
  )
}
