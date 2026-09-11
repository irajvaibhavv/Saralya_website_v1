import { motion } from 'motion/react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

export function Cta() {
  return (
    <Section tight>
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center text-white md:px-12 md:py-24">
            {/* Slow-drifting colour blobs */}
            <motion.div
              aria-hidden
              className="absolute -left-24 -top-24 size-[420px] rounded-full bg-accent3/40 blur-[90px]"
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-32 -right-24 size-[460px] rounded-full bg-purple/30 blur-[100px]"
              animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 grid-paper opacity-[0.07] mask-fade-radial" />

            <div className="relative">
              <div className="eyebrow mb-5 text-[#c4b5fd]">Free · public data only</div>
              <h2 className="display mx-auto max-w-2xl text-[clamp(32px,5vw,56px)]">
                Get a free tech &amp; compliance read for your NBFC.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[16px] text-white/60">
                Tell us who you are. We come back with what we'd fix first — no commitment.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Free%20diagnostic%20for%20our%20NBFC`} variant="white" size="lg" arrow>
                  Get diagnostic
                </ButtonLink>
                <ButtonLink to="/demo" variant="primary" size="lg">
                  Try the live demo
                </ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
