import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { HeroReel } from './HeroReel'
import { Link } from 'react-router-dom'
import { lenis } from '../../lib/scroll'

/* Landing hero: background video, headline and CTAs. Clicking the video
   advances to the Saarthi screen. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })

/** ms the shatter animation runs before the overlay is removed */
const BREAK = 820
/** shatter grid */
const COLS = 8
const ROWS = 5

/** per-tile trajectory, fixed so replays look identical */
const throwOf = (n: number) => {
  const col = n % COLS
  const row = Math.floor(n / COLS)
  /* fly outward from the centre */
  const dx = (col - (COLS - 1) / 2) / COLS
  const dy = (row - (ROWS - 1) / 2) / ROWS
  const spin = ((n * 37) % 90) - 45
  return { x: dx * 900, y: dy * 700 + 160, rotate: spin, delay: Math.hypot(dx, dy) * 0.22 }
}

export function Hero() {
  const still = useReducedMotion()
  const [shards, setShards] = useState<string | null>(null)

  /* Shatter transition: grab the current video frame, cut it into tiles and
     animate them outward while the page scrolls to Saarthi. Portalled to <body>
     because the Saarthi screen is its own stacking context. */
  const open = () => {
    const screens = document.querySelectorAll<HTMLElement>('[data-screen]')
    const to = screens[0]?.offsetHeight ?? window.innerHeight
    const land = () => lenis.scrollTo(to, { force: true, immediate: true })
    if (still) return land()

    /* if the frame can't be captured, just scroll */
    const video = document.querySelector<HTMLVideoElement>('video')
    let shot: string | null = null
    try {
      if (video?.videoWidth) {
        const c = document.createElement('canvas')
        c.width = window.innerWidth
        c.height = window.innerHeight
        const ctx = c.getContext('2d')
        if (ctx) {
          /* object-cover: fill the viewport, crop the overflow */
          const scale = Math.max(c.width / video.videoWidth, c.height / video.videoHeight)
          const w = video.videoWidth * scale
          const h = video.videoHeight * scale
          ctx.drawImage(video, (c.width - w) / 2, (c.height - h) / 2, w, h)
          ctx.fillStyle = 'rgba(10,10,11,0.28)'
          ctx.fillRect(0, 0, c.width, c.height)
          shot = c.toDataURL('image/jpeg', 0.82)
        }
      }
    } catch {
      shot = null
    }
    if (!shot) return land()

    setShards(shot)
    land()
    window.setTimeout(() => setShards(null), BREAK + 120)
  }

  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      {createPortal(
        <AnimatePresence>
          {shards && (
            <div key="shatter" aria-hidden className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
              {Array.from({ length: COLS * ROWS }, (_, n) => {
                const t = throwOf(n)
                return (
                  <motion.span
                    key={n}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    animate={{ x: t.x, y: t.y, rotate: t.rotate, opacity: 0, scale: 0.72 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: BREAK / 1000, delay: t.delay, ease: [0.3, 0, 0.6, 1] }}
                    className="absolute"
                    style={{
                      left: `${(n % COLS) * (100 / COLS)}%`,
                      top: `${Math.floor(n / COLS) * (100 / ROWS)}%`,
                      width: `${100 / COLS}%`,
                      height: `${100 / ROWS}%`,
                      backgroundImage: `url(${shards})`,
                      backgroundSize: '100vw 100vh',
                      backgroundPosition: `${-(n % COLS) * (100 / COLS)}vw ${-Math.floor(n / COLS) * (100 / ROWS)}vh`,
                    }}
                  />
                )
              })}
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {/* click the video to advance */}
      <button
        type="button"
        onClick={open}
        aria-label="Open Saral Saarthi"
        className="group absolute inset-0 z-0 cursor-pointer"
      >
        <span className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-20 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-28">
        <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
          <motion.h1 {...rise(0)} className="display text-display leading-[1.0] text-white">
            Making Lending{' '}
            <em className="font-hero font-normal italic text-lime">Saral</em>.
          </motion.h1>

          <motion.div {...rise(0.25)} className="pointer-events-auto mt-12 flex flex-wrap items-center gap-3">
            <Link
              to="/agents"
              className="bg-lime px-5 py-2.5 text-small font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              AI agents
            </Link>
            <Link
              to="/products"
              className="border border-white/40 px-5 py-2.5 text-small font-semibold text-white transition hover:border-lav hover:bg-lav hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav"
            >
              See the platform
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
