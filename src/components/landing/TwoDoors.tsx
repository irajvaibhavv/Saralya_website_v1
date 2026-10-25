import { ArrowRight, Bot, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* Two doors at the foot of the landing page: the platform an NBFC buys, and
   the agents it puts on each desk. Whole-card links, so the card is the
   button. The three points on the left are the founders' own lines. */
const POINTS = ['Trained on banking data', 'Private by default', '4+ decades of experience, 200+ banks of pedigree']
const AGENT_POINTS = ['Pick the desk and the work it takes off it', 'The agent comes back assembled', 'What it reads, what it decides, what it leaves in writing']

export function TwoDoors() {
  return (
    <Section tight>
      <Container>
        <FadeIn className="grid gap-5 md:grid-cols-2">
          {/* the platform */}
          <Link
            to="/products"
            className="group relative flex min-h-[392px] flex-col overflow-hidden bg-wash2 p-8 ring-1 ring-accent/25 transition-colors duration-300 hover:ring-accent md:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-64 rounded-full border-[26px] border-accent/15" />

            <div className="relative flex items-start justify-between gap-4">
              <span className="font-mono text-label uppercase tracking-[0.16em] text-accent2">The platform</span>
              <span className="grid size-11 place-items-center bg-white text-accent ring-1 ring-accent/20">
                <Layers className="size-5" strokeWidth={1.7} />
              </span>
            </div>

            <h2 className="display relative mt-4 text-h2 md:whitespace-nowrap">
              Saralya for <span className="text-accent">enterprise</span>
            </h2>

            <ul className="relative mt-6 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-body leading-snug text-ink2">
                  <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <span className="relative mt-auto inline-flex items-center gap-2 self-start bg-ink px-7 py-3.5 font-mono text-small uppercase tracking-[0.08em] text-lime transition-colors group-hover:bg-accent group-hover:text-white">
              See the platform
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* the agents */}
          <Link
            to="/agents"
            className="group relative flex min-h-[392px] flex-col overflow-hidden bg-ink p-8 text-white ring-1 ring-ink transition-colors duration-300 md:p-10"
          >
            <span aria-hidden className="pointer-events-none absolute -right-40 -top-44 size-72 rounded-full bg-lime" />
            <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full border-[28px] border-lav/50" />

            <div className="relative flex items-start justify-between gap-4">
              <span className="font-mono text-label uppercase tracking-[0.16em] text-lime">The agents</span>
              <span className="grid size-11 place-items-center bg-lime text-ink">
                <Bot className="size-5" strokeWidth={1.7} />
              </span>
            </div>

            <h2 className="display relative mt-4 text-h2 md:whitespace-nowrap">
              Build AI <span className="text-lime">agents</span>
            </h2>

            <ul className="relative mt-6 space-y-3.5">
              {AGENT_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-body leading-snug text-white/75">
                  <span className="mt-2 size-1.5 shrink-0 bg-lime" />
                  {p}
                </li>
              ))}
            </ul>

            <span className="relative mt-auto inline-flex items-center gap-2 self-start bg-lime px-7 py-3.5 font-mono text-small uppercase tracking-[0.08em] text-ink transition-colors group-hover:bg-white">
              AI agents
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </FadeIn>
      </Container>
    </Section>
  )
}
