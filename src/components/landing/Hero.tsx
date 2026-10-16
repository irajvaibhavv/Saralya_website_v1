import { motion } from 'motion/react'
import { HeroReel } from './HeroReel'
import { ButtonLink } from '../ui/Button'

/* One screen: the reel behind, the claim low over it, one button.
   Saral Saarthi waits in the corner. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })

export function Hero() {
  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      <div data-hero-copy className="relative mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-12">
        {/* the frame stays open above; the title sits low like a film card */}
        <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
          <motion.span {...rise(0)} className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.14em] text-white/80">
            <span className="h-px w-6 bg-accent3" /> AI for NBFCs
          </motion.span>

          <motion.h1 {...rise(0.1)} className="mt-4 text-display font-semibold leading-[1.06] tracking-[-0.03em] text-white">
            Making Lending Saral for Bharat.
          </motion.h1>

          <motion.div {...rise(0.25)} className="mt-7">
            <ButtonLink to="/agents" variant="white" size="lg" arrow>
              Make your own AI agents
            </ButtonLink>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
