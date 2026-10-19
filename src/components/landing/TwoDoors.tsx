import { ArrowRight, Bot, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* Two doors at the foot of the landing page: the platform an NBFC buys, and
   the agents it puts on each desk. Whole-card links, so the card is the
   button. The three points on the left are the founders' own lines. */
const POINTS = ['Trained on BFSI data.', 'Private by default.', '4+ decades of experience. 200+ banks of pedigree.']

export function TwoDoors() {
  return (
    <Section tight>
      <Container>
        <FadeIn className="grid gap-5 md:grid-cols-2">
          {/* the platform */}
          <Link
            to="/products"
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-wash2 p-8 ring-1 ring-accent/25 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(13,22,20,0.4)] md:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <span className="font-mono text-label uppercase tracking-[0.16em] text-accent2">The platform</span>
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-accent shadow-sm ring-1 ring-accent/20">
                <Layers className="size-5" strokeWidth={1.7} />
              </span>
            </div>

            <h2 className="display relative mt-4 max-w-[14ch] text-h2">Saralya for enterprise</h2>

            <ul className="relative mt-6 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-body leading-snug text-ink2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <span className="relative mt-auto inline-flex items-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-body font-semibold text-white transition-colors group-hover:bg-accent">
              See the platform
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* the agents */}
          <Link
            to="/agents"
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl bg-ink p-8 text-white ring-1 ring-ink transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(13,22,20,0.6)] md:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-accent/35 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-petrol/40 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <span className="font-mono text-label uppercase tracking-[0.16em] text-accent3">The agents</span>
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-accent3 ring-1 ring-white/15">
                <Bot className="size-5" strokeWidth={1.7} />
              </span>
            </div>

            <h2 className="display relative mt-4 max-w-[12ch] text-h2">
              Build AI <span className="text-accent3">agents</span>
            </h2>

            <p className="relative mt-5 max-w-[42ch] text-body leading-relaxed text-white/70">
              Pick the desk and the work it takes off that desk. The agent comes back assembled — what it reads, what it
              decides, and what it leaves in writing.
            </p>

            <span className="relative mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 text-body font-semibold text-ink transition-colors group-hover:bg-accent3">
              Build an agent
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </FadeIn>
      </Container>
    </Section>
  )
}
