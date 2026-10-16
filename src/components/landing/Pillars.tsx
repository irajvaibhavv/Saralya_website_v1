import { CircleCheck, Layers, LayoutGrid } from 'lucide-react'
import { Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The screen that pulls up over the reel: what the platform is, in three
   cards tall enough to hold the screen on their own. */
const PILLARS = [
  { n: '01', eyebrow: 'Architecture', title: 'Modular & API-first', icon: LayoutGrid },
  { n: '02', eyebrow: 'Intelligence', title: 'BFSI banking-LLM', icon: Layers },
  { n: '03', eyebrow: 'Deployment', title: 'Works with existing systems', icon: CircleCheck },
]

export function Pillars() {
  return (
    <section className="flex h-full min-h-[100svh] flex-col justify-center pt-16">
      <Container>
        <h2 className="display max-w-[22ch] text-h2">
          Lending infrastructure, built for <span className="text-accent">Bharat</span>.
        </h2>

        <Stagger className="mt-9 grid gap-5 md:grid-cols-3" gap={0.1}>
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <Item key={p.n}>
                <div className="flex h-full min-h-[40svh] flex-col justify-between rounded-2xl border border-line2 bg-white p-7">
                  <span className="grid size-14 place-items-center rounded-2xl bg-wash text-accent">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <div>
                    <div className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                      {p.n} &middot; {p.eyebrow}
                    </div>
                    <h3 className="mt-2 text-h3 font-semibold leading-snug">{p.title}</h3>
                  </div>
                </div>
              </Item>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
