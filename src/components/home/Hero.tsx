import { motion } from 'motion/react'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Section'
import { HeroOrbit } from './HeroOrbit'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-lav-w pt-12 pb-12 md:pt-20 md:pb-16">
      {/* flat shapes, cropped by the frame — the agents page runs ink with
          a lime disc, so this one runs light with the teal low and the
          lime high, and reads as the same family rather than the same page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0d1614 1px, transparent 1px), linear-gradient(to bottom, #0d1614 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute -bottom-60 -left-48 size-[30rem] rounded-full bg-accent/12" />
        <div className="absolute -right-28 -top-40 size-[26rem] rounded-full border-[26px] border-lime/70" />
        <div className="absolute bottom-0 left-[38%] h-24 w-px bg-accent/40" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2.5 border border-ink/15 bg-white px-3.5 py-2 font-mono text-label uppercase tracking-[0.14em] text-ink2"
            >
              <span className="size-2 bg-lime" />
              Lending infrastructure for India's banks &amp; NBFCs
            </motion.div>

            <h1 className="display mt-6 text-display">
              {[
                ['Making Lending'],
                ['Saral', ' for Bharat.'],
              ].map((parts, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                  >
                    {parts.length === 2 ? (
                      <>
                        <span className="font-hero font-normal italic text-accent">{parts[0]}</span>
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
              transition={{ duration: 0.35, ease: EASE, delay: 0.16 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink to="/about#demo" variant="ink" size="lg" arrow>
                Try a live decision
              </ButtonLink>
              <ButtonLink to="/" variant="ghost" size="lg">
                Ask Saral AI
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.26 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-small uppercase tracking-[0.08em] text-hint"
            >
              <span>&lt; 5 min STP approval</span>
              <span>Pay per loan</span>
              <span>Works with your core</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="relative w-full"
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
