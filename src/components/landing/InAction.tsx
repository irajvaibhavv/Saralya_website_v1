import { ArrowRight, Brain, FileInput, Play, ScanSearch, Target, Users } from 'lucide-react'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The demo ask: one line, one film. The card is a still of the four steps;
   the button on the left opens the film full screen. */
const STEPS = [
  { icon: FileInput, label: 'Application data' },
  { icon: Brain, label: 'AI analysis' },
  { icon: ScanSearch, label: 'Risk insights' },
  { icon: Target, label: 'Better decisions' },
]
const TONES = ['bg-blue-w text-blue', 'bg-green-w text-green', 'bg-wash text-accent', 'bg-green-w text-green']

export function InAction({ onWatch }: { onWatch: () => void }) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f7fc_0%,#f0f0fa_100%)] py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-accent ring-1 ring-accent/15">
            <Play className="size-3 fill-current" /> See Saralya in action
          </div>
          <h2 className="display mt-5 text-[clamp(30px,3.6vw,46px)]">
            From data to decisions <span className="text-accent">in minutes.</span>
          </h2>
          <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed text-muted">
            Watch how NBFCs use Saralya’s AI to assess credit risk, improve collections and stay compliant.
          </p>
          <button onClick={onWatch} className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-ink py-2 pl-2 pr-5 text-left text-white transition-colors hover:bg-ink2">
            <span className="grid size-9 place-items-center rounded-lg bg-white/15">
              <Play className="ml-0.5 size-4 fill-current" />
            </span>
            <span>
              <span className="block text-[14px] font-semibold leading-tight">Watch product demo</span>
              <span className="block text-[12px] text-white/60">2 min</span>
            </span>
          </button>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* a still card: the film only plays full screen */}
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_80%_70%_at_20%_0%,#ffffff_0%,transparent_60%),radial-gradient(ellipse_70%_60%_at_100%_100%,#dcdaf7_0%,transparent_60%),linear-gradient(160deg,#f4f3fc_0%,#e9e8f8_100%)] p-5 shadow-lg ring-1 ring-white sm:p-7">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-ink2 shadow-sm backdrop-blur">
                <span className="grid size-4 place-items-center rounded-md bg-green-w text-green"><Play className="size-2.5 fill-current" /></span>
                Turn data into opportunities
              </span>
            </div>

            <Stagger className="mt-6 grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:gap-2" gap={0.08}>
              {STEPS.map((step, i) => {
                const tone = TONES[i]
                return [
                  <Item key={step.label} className="rounded-2xl bg-white/85 p-3.5 shadow-sm backdrop-blur">
                    <span className={`grid size-9 place-items-center rounded-lg ${tone}`}>
                      <step.icon className="size-4" />
                    </span>
                    <div className="mt-3 text-[13px] font-medium leading-snug text-ink">{step.label}</div>
                  </Item>,
                  i < STEPS.length - 1 && (
                    <Item key={`${step.label}-arrow`} className="hidden items-center justify-center sm:flex">
                      <ArrowRight className="size-4 text-accent" />
                    </Item>
                  ),
                ]
              })}
            </Stagger>

            <div className="mt-6 flex justify-end">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-ink2 shadow-sm backdrop-blur">
                <Users className="size-3.5 text-accent" /> Real platform. Real results.
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
