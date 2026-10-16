import { CircleCheck, Layers, LayoutGrid } from 'lucide-react'
import { Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The screen that pulls up over the reel: what the platform is, in three
   cards tall enough to hold the screen on their own. Point at one and it
   opens — the line under the rule is what that claim actually means.
   Below lg there is no hover to speak of, so it is open from the start. */
const PILLARS = [
  {
    n: '01',
    eyebrow: 'Architecture',
    title: 'Modular & API-first',
    body: 'Pick one module or run the full stack. Every endpoint exposed as REST and webhooks.',
    icon: LayoutGrid,
  },
  {
    n: '02',
    eyebrow: 'Intelligence',
    title: 'BFSI banking-LLM',
    body: 'Trained on anonymised Indian banking data. Tuned on RBI directions.',
    icon: Layers,
  },
  {
    n: '03',
    eyebrow: 'Deployment',
    title: 'Works with existing systems',
    body: 'Sits beside the core you already run. Keep what you have, add what you need.',
    icon: CircleCheck,
  },
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
                <div
                  tabIndex={0}
                  className="group flex h-full min-h-[27svh] cursor-pointer flex-col justify-between rounded-2xl border border-line2 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-accent/40 focus-visible:shadow-lg focus-visible:outline-none"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-wash text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>

                  <div>
                    <div className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                      {p.n} &middot; {p.eyebrow}
                    </div>
                    <h3 className="mt-2 text-h3 font-semibold leading-snug">{p.title}</h3>

                    {/* the gap under the title is there to be filled: hovering
                        opens the card by animating the row from 0fr to 1fr */}
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 border-t border-line pt-4 text-small leading-relaxed text-muted opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                          {p.body}
                        </p>
                      </div>
                    </div>
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
