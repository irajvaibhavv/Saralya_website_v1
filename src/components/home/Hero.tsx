import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Section'
import { HeroOrbit } from './HeroOrbit'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-12 pb-12 text-white md:pt-20 md:pb-16">
      {/* the same flat vocabulary as the agents hero, mirrored: there the
          lime sits low-left and the lavender high-right, here it is the
          other way round */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute -right-56 -top-64 size-[28rem] rounded-full bg-lime" />
        <div className="absolute -bottom-80 -left-64 size-[34rem] rounded-full border-[34px] border-lav" />
        <div className="absolute left-[34%] top-0 h-24 w-px bg-lime" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2.5 border border-white/25 px-3.5 py-2 font-mono text-label uppercase tracking-[0.16em] text-white/80"
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
                        <span className="font-hero font-normal italic text-lime">{parts[0]}</span>
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
              <Link
                to="/about#demo"
                className="bg-lime px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                Try a live decision
              </Link>
              <Link
                to="/"
                className="border border-white/35 px-8 py-4 text-body font-semibold text-white transition hover:border-lav hover:bg-lav hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav"
              >
                Ask Saral AI
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.26 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-small uppercase tracking-[0.1em] text-white/45"
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

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2 bg-lime" />
    </section>
  )
}
