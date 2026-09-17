import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The default is the free diagnostic on an ink card; the landing page asks
   for the demo on a soft lavender band instead. */
export function ClosingCta({ demo = false }: { demo?: boolean }) {
  if (demo) {
    return (
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_90%_at_10%_50%,#e6e4fa_0%,transparent_60%),radial-gradient(ellipse_60%_90%_at_95%_40%,#ece9fb_0%,transparent_60%),linear-gradient(180deg,#f8f8fc_0%,#f1f0fa_100%)] py-14 md:py-20">
        <Container>
          <FadeIn className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="display max-w-2xl text-[clamp(24px,3vw,36px)]">Ready to see what Saralya can do for your NBFC?</h2>
              <p className="mt-2.5 text-[16px] text-muted">Get a personalised demo and explore use cases for your business.</p>
            </div>
            <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`} variant="ink" size="lg" arrow className="shrink-0">
              Book a demo
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>
    )
  }

  return (
    <Section tight>
      <Container>
        <FadeIn>
          <div className="dots grid items-center gap-8 rounded-3xl bg-ink px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-12 md:py-14">
            <div>
              <div className="eyebrow mb-4 text-accent3">Free · public data only</div>
              <h2 className="display max-w-xl text-[clamp(28px,3.6vw,44px)]">Get a free tech &amp; compliance read for your NBFC.</h2>
              <p className="mt-3 text-[15px] text-white/60">No commitment. We read what is public and tell you what we see.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Free%20diagnostic%20for%20our%20NBFC`} variant="white" size="lg" arrow>
                Get diagnostic
              </ButtonLink>
              <ButtonLink to="/demo" variant="primary" size="lg">
                Try the live demo
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
