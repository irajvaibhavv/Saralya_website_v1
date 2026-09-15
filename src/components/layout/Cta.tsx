import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

export function Cta() {
  return (
    <Section tight>
      <Container>
        <FadeIn>
          <div className="grid items-center gap-8 rounded-3xl bg-ink px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-12 md:py-14">
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
