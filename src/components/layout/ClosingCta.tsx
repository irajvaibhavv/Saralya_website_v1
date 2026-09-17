import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The default is the free diagnostic; the landing page swaps in the demo ask. */
export function ClosingCta({ demo = false }: { demo?: boolean }) {
  return (
    <Section tight>
      <Container>
        <FadeIn>
          <div className="dots grid items-center gap-8 rounded-3xl bg-ink px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-12 md:py-14">
            {demo ? (
              <div>
                <h2 className="display max-w-xl text-[clamp(28px,3.6vw,44px)]">Ready to see what Saralya can do for your NBFC?</h2>
                <p className="mt-3 text-[15px] text-white/60">A 20-minute walkthrough on your book, your products, your core. No deck.</p>
              </div>
            ) : (
              <div>
                <div className="eyebrow mb-4 text-accent3">Free · public data only</div>
                <h2 className="display max-w-xl text-[clamp(28px,3.6vw,44px)]">Get a free tech &amp; compliance read for your NBFC.</h2>
                <p className="mt-3 text-[15px] text-white/60">No commitment. We read what is public and tell you what we see.</p>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <ButtonLink to={demo ? `mailto:${CONTACT_EMAIL}?subject=Demo%20request` : `mailto:${CONTACT_EMAIL}?subject=Free%20diagnostic%20for%20our%20NBFC`} variant="white" size="lg" arrow>
                {demo ? 'Book a demo' : 'Get diagnostic'}
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
