import { motion } from 'motion/react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Section'
import { HeroOrbit } from './HeroOrbit'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-12 md:pt-20 md:pb-16">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 grid-paper opacity-40 mask-fade-radial" />
      <motion.div
        aria-hidden
        className="absolute -left-40 -top-40 -z-10 size-[560px] rounded-full bg-accent3/25 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-10 -z-10 size-[520px] rounded-full bg-blue/15 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink2 shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-accent animate-pulse-ring" />
              Lending infrastructure for India's banks &amp; NBFCs
            </motion.div>

            <h1 className="display mt-6 text-[clamp(40px,6.4vw,80px)]">
              {[
                ['Making Lending'],
                ['Saral', ' for Bharat.'],
              ].map((parts, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.06 }}
                  >
                    {parts.length === 2 ? (
                      <>
                        <span className="text-gradient">{parts[0]}</span>
                        {parts[1]}
                      </>
                    ) : (
                      parts[0]
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink to="/demo" variant="ink" size="lg" arrow>
                Try a live decision
              </ButtonLink>
              <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`} variant="ghost" size="lg">
                Book demo
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.08em] text-hint"
            >
              <span>&lt; 5 min STP approval</span>
              <span>Pay per loan</span>
              <span>Works with your core</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative w-full"
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
