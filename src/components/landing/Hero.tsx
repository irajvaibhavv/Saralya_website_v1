import { motion } from 'motion/react'
import { HeroReel } from './HeroReel'
import { ButtonLink } from '../ui/Button'
import { lenis } from '../../lib/scroll'

/* One screen: the reel behind, the claim low over it, one button. The reel
   itself opens Saral Saarthi — a click anywhere on it pulls the next screen
   up the same way a scroll does. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })

export function Hero() {
  /* the same travel the wheel gets in Landing: one screen, eased both ends */
  const open = () => {
    const screens = document.querySelectorAll<HTMLElement>('[data-screen]')
    const to = screens[0]?.offsetHeight ?? window.innerHeight
    lenis.scrollTo(to, { force: true, duration: 1.05, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) })
  }

  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      {/* the reel is the door: click it and Saarthi rides up */}
      <button
        type="button"
        onClick={open}
        aria-label="Open Saral Saarthi"
        className="group absolute inset-0 z-0 cursor-pointer"
      >
        <span className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-12">
        {/* the frame stays open above; the title sits low like a film card */}
        <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
          <motion.h1 {...rise(0.1)} className="font-hero text-display font-bold leading-[1.04] tracking-[-0.01em] text-white">
            Making Lending{' '}
            <em className="bg-gradient-to-r from-[#8fdcc6] to-[#35b296] bg-clip-text italic text-transparent">
              Saral
            </em>{' '}
            for Bharat.
          </motion.h1>

          <motion.div {...rise(0.25)} className="pointer-events-auto mt-7">
            <ButtonLink to="/agents" variant="white" size="lg" arrow>
              AI agents
            </ButtonLink>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
