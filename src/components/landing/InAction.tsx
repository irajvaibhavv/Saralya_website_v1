import { ArrowRight, Brain, FileInput, Play, ScanSearch, Target } from 'lucide-react'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The demo ask: one line, one film. The card previews the reel silently;
   the play button opens it full screen with sound. */
const STEPS = [
  { icon: FileInput, label: 'Application data' },
  { icon: Brain, label: 'AI analysis' },
  { icon: ScanSearch, label: 'Risk insights' },
  { icon: Target, label: 'Better decisions' },
]

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
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lg ring-1 ring-ink/10">
            {/* the reel opens on the same kirana as the hero, so the preview starts at its second scene */}
            <video src="/video/reel.mp4" poster="/video/reel-poster.jpg" autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={(e) => { e.currentTarget.currentTime = 7 }} className="aspect-[16/10] w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,32,0.15)_0%,rgba(20,20,32,0.05)_50%,rgba(20,20,32,0.7)_100%)]" />

            <button onClick={onWatch} aria-label="Play the product demo" className="group absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-white text-ink shadow-glow transition-transform duration-200 group-hover:scale-105">
                <Play className="ml-1 size-6 fill-current" />
              </span>
            </button>

            <Stagger className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-1.5 sm:inset-x-6 sm:bottom-6" gap={0.08}>
              {STEPS.map((s, i) => (
                <Item key={s.label} className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
                    <s.icon className="size-3.5 text-accent" /> {s.label}
                  </span>
                  {i < STEPS.length - 1 && <ArrowRight className="hidden size-3.5 text-white/60 sm:block" />}
                </Item>
              ))}
            </Stagger>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
