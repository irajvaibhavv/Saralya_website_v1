import { BarChart3, Database, IndianRupee, ShieldCheck, Users } from 'lucide-react'
import { POPULAR_QS, type Starter } from '../../content/saral-ai'
import { FadeIn } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Five more questions drift past under the hero. Hover holds them; a click
   hands the question to the panel above. */
const ICONS = [BarChart3, Database, IndianRupee, Users, ShieldCheck]
const TONES = ['bg-wash text-accent', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-purple-w text-purple', 'bg-amber-w text-amber']

export function PopularQuestions({ onAsk }: { onAsk: (s: Starter) => void }) {
  const row = [...POPULAR_QS, ...POPULAR_QS]
  return (
    <FadeIn className="py-10 md:py-14">
      <Container className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-semibold tracking-tight">Popular questions from NBFCs</h2>
        <span className="hidden text-[13px] text-hint sm:block">Click one to ask Saral</span>
      </Container>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 pl-3 [animation-duration:55s] hover:[animation-play-state:paused]">
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
