import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* The door to /agents. A band, not a section: one picture, one promise,
   one button. The work itself lives on its own page. */

export function AgentsBand() {
  return (
    <section id="agents" className="relative h-[52vh] min-h-[380px] overflow-hidden scroll-mt-16">
      <img src="/img/street.jpg" alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
      <Container className="absolute inset-0 flex flex-col justify-center text-white">
        <FadeIn>
          <div className="eyebrow mb-3 text-white/60">Agents</div>
          <h2 className="display max-w-2xl text-h2">Make your own agents.</h2>
          <p className="mt-3 max-w-lg text-lede leading-relaxed text-white/80">
            An underwriter, a collections officer and a compliance head each pick the work they want taken off their desk. We build
            that agent on your data.
          </p>
          <ButtonLink to="/agents" className="mt-6" variant="white" size="lg" arrow>
            Make your own agents
          </ButtonLink>
        </FadeIn>
      </Container>
    </section>
  )
}
