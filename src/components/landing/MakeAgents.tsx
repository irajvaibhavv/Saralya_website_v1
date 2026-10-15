import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEATS } from '../../content/agents'
import { ButtonLink } from '../ui/Button'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Straight under the hero: the one thing the lead wants a visitor to leave
   knowing. Six desks, each a door into /agents with that seat already
   chosen, so nobody lands on the builder wondering where to start. */

export function MakeAgents() {
  return (
    <section
      id="agents"
      className="relative scroll-mt-16 overflow-hidden border-t border-line bg-[radial-gradient(ellipse_70%_90%_at_12%_0%,#e9e7fb_0%,transparent_58%),radial-gradient(ellipse_60%_80%_at_92%_15%,#f0eefc_0%,transparent_60%),linear-gradient(180deg,#fafafc_0%,#f4f3fb_100%)] py-16 md:py-24"
    >
      <Container>
        <FadeIn className="max-w-3xl">
          <div className="eyebrow mb-3 flex items-center gap-3 text-accent">
            Agents <span className="h-px w-6 bg-accent" />
          </div>
          <h2 className="display text-display">
            Make your own <span className="text-accent">AI agents</span>.
          </h2>
          <p className="mt-5 text-lede leading-relaxed text-muted">
            Your underwriter, your collections officer and your compliance head do not do the same job, so they should not get the
            same assistant. Pick a desk, tick the work you want taken off it, and we build that agent on your own data.
          </p>
        </FadeIn>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {SEATS.map((s) => (
            <Item key={s.id}>
              <Link
                to="/agents"
                className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/30"
              >
                <h3 className="text-h3 font-semibold">{s.label}</h3>
                <p className="mt-1.5 text-small text-muted">{s.short}</p>
                <p className="mt-4 text-small leading-relaxed text-ink2">{s.handsBack}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.12em] text-accent">
                  Build this one
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Item>
          ))}
        </Stagger>

        <FadeIn className="mt-10 flex flex-wrap items-center gap-5">
          <ButtonLink to="/agents" variant="ink" size="lg" arrow>
            Make your own agents
          </ButtonLink>
          <span className="text-small text-muted">Three questions. Nothing leaves your browser.</span>
        </FadeIn>
      </Container>
    </section>
  )
}
