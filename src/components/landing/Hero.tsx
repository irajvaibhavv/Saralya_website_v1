import { motion } from 'motion/react'
import { HeroReel } from './HeroReel'
import { Link } from 'react-router-dom'
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
          <motion.div
            {...rise(0)}
            className="mb-5 flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-lime [text-shadow:none]"
          >
            <span aria-hidden className="size-2 bg-lime" />
            Lending infrastructure for Bharat
          </motion.div>

          <motion.h1 {...rise(0.1)} className="display text-display leading-[1.0] text-white">
            Making Lending{' '}
            <em className="font-hero font-normal italic text-lime">Saral</em>{' '}
            for Bharat.
          </motion.h1>

          <motion.div {...rise(0.25)} className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/agents"
              className="bg-lime px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              AI agents
            </Link>
            <Link
              to="/products"
              className="border border-white/40 px-8 py-4 text-body font-semibold text-white transition hover:border-lav hover:bg-lav hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav"
            >
              See the platform
            </Link>
          </motion.div>

        </div>

      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2 bg-lime" />
    </section>
  )
}
