import { ArrowRight } from 'lucide-react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* Closing call to action. Default: free diagnostic on a dark card. `demo`: demo
   request on a lime band. */
export function ClosingCta({ demo = false }: { demo?: boolean }) {
  if (demo) {
    /* same lime block as the closing blocks on /agents and /products */
    return (
      <Section>
        <Container>
          <FadeIn className="relative overflow-hidden bg-lime px-7 py-12 text-ink md:px-14 md:py-16">
            {/* decorative shapes */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-28 size-80 rounded-full border-[1.75rem] border-ink/10" />
              <div className="absolute -bottom-32 right-[18%] size-56 rounded-full bg-ink/10" />
              <div className="absolute left-0 top-0 h-full w-2 bg-ink" />
            </div>

            <div className="relative grid items-end gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-ink/70">
                  <span className="size-2 bg-ink" />
                  Making lending Saral
                </div>
                <h2 className="display mt-4 max-w-[20ch] text-h2">Ready to see what Saralya can do for your NBFC?</h2>
                <p className="mt-4 text-body font-semibold text-ink/80">Get a personalised demo and explore use cases for your business.</p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`}
                className="group inline-flex items-center gap-2.5 self-start bg-ink px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-lime transition hover:bg-ink2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:self-end"
              >
                Book a demo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </FadeIn>
        </Container>
      </Section>
    )
  }

  return (
    <Section tight>
      <Container>
        <FadeIn>
          <div className="dots grid items-center gap-8 rounded-3xl bg-ink px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-12 md:py-14">
            <div>
              <div className="eyebrow mb-4 text-accent3">Free · public data only</div>
              <h2 className="display max-w-xl text-h2">Get a free tech &amp; compliance read for your NBFC</h2>
              <p className="mt-3 text-body text-white/60">No commitment. We read what is public and tell you what we see.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Free%20diagnostic%20for%20our%20NBFC`} variant="white" size="lg" arrow>
                Get diagnostic
              </ButtonLink>
              <ButtonLink to="/products#demo" variant="primary" size="lg">
                Try the live demo
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
