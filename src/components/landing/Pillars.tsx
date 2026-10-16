import { CircleCheck, Layers, LayoutGrid } from 'lucide-react'
import { Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The screen that pulls up over the reel: what the platform is, in three
   cards, over the regimes it is built to. Each card is whole at rest —
   pointing at one lifts it, fills its mark and draws the accent across the
   rule, without moving the two beside it. */
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

/* Regimes, not vendors: the standards an NBFC is inspected against. */
const BUILT_TO = ['Account Aggregator', 'GSTN', 'RBI MD-FRM 2024', 'DPDP 2023', 'CKYC', 'Scale Based Regulation']

export function Pillars() {
  return (
    <section className="flex h-full min-h-[100svh] flex-col justify-center pt-16">
      <Container>
        <h2 className="display max-w-[22ch] text-h2">
          Lending infrastructure, built for <span className="text-accent">Bharat</span>.
        </h2>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3" gap={0.1}>
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <Item key={p.n}>
                <div
                  tabIndex={0}
                  className="group flex h-full cursor-pointer flex-col gap-7 rounded-2xl border border-line2 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(13,22,20,0.45)] focus-visible:-translate-y-1 focus-visible:border-accent/40 focus-visible:outline-none"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-wash text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>

                  <div className="mt-auto">
                    <div className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                      {p.n} &middot; {p.eyebrow}
                    </div>
                    <h3 className="mt-2 text-h3 font-semibold leading-snug">{p.title}</h3>

                    {/* the accent runs across the rule on hover; the rule and
                        the line under it are there either way, so nothing
                        moves when a card is pointed at */}
                    <span className="mt-4 block h-px w-full overflow-hidden bg-line">
                      <span className="block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    </span>
                    <p className="mt-4 text-small leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </Item>
            )
          })}
        </Stagger>

        {/* the regimes under all three, as labels */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-line pt-6">
          <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">Built to</span>
          {BUILT_TO.map((x) => (
            <span key={x} className="rounded-full bg-white px-3 py-1.5 text-small text-ink2 ring-1 ring-line">
              {x}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
