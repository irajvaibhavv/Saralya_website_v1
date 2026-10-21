import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { HeroReel } from './HeroReel'
import { Link } from 'react-router-dom'
import { lenis } from '../../lib/scroll'

/* One screen: the reel behind, the claim low over it, one button. The reel
   itself opens Saral Saarthi — a click anywhere on it pulls the next screen
   up the same way a scroll does. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })

/** the reel fades out this long before Saarthi is put in its place */
const FADE = 380

export function Hero() {
  const still = useReducedMotion()
  const [veil, setVeil] = useState(false)

  /* Clicking the reel dissolves rather than travels: the frame fades down
     to black, the page is moved underneath it, and Saarthi fades up in its
     place. The veil is portalled to the body — inside the hero it would be
     painted under the Saarthi screen, which is its own stacking layer. */
  const open = () => {
    const screens = document.querySelectorAll<HTMLElement>('[data-screen]')
    const to = screens[0]?.offsetHeight ?? window.innerHeight
    if (still) {
      lenis.scrollTo(to, { force: true, immediate: true })
      return
    }
    setVeil(true)
    window.setTimeout(() => {
      lenis.scrollTo(to, { force: true, immediate: true })
      setVeil(false)
    }, FADE)
  }

  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      {createPortal(
        <AnimatePresence>
          {veil && (
            <motion.div
              key="dissolve"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE / 1000, ease: 'linear' }}
              className="pointer-events-none fixed inset-0 z-[100] bg-[#0a0a0b]"
            />
          )}
        </AnimatePresence>,
        document.body,
      )}

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
