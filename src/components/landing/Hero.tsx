import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { HeroReel } from './HeroReel'
import { ButtonLink } from '../ui/Button'
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
