import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { ArrowRight, Bot, Layers, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

/* The menu reads as a numbered contents page: what we sell, what runs on
   it, and who we are. Three words, no explaining. */
const LINKS = [
  { to: '/products', label: 'Product', icon: Layers },
  { to: '/agents', label: 'Agents', icon: Bot },
]

/* over the landing video the mark is knocked out in white and lifted off
   the footage by a shadow, so it needs no chip to sit on */
export function Logo({ light, full }: { light?: boolean; full?: boolean }) {
  return (
    <Link to="/" aria-label="Saralya" className="inline-flex">
      <img
        src={full ? '/img/logo-full.png' : light ? '/img/logo-white.png' : '/img/logo.png'}
        alt="Saralya — Credit Simplified"
        className={`${full ? 'h-16' : 'h-7'} w-auto ${light ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]' : ''}`}
      />
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const still = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  useEffect(() => setOpen(false), [location.pathname])

  // over the landing hero the nav sits on video, so it goes light until the page scrolls
  const light = location.pathname === '/' && !scrolled

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-line'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo light={light} />



          <button
            className="-mr-2 grid size-10 place-items-center rounded-full bg-white shadow-sm"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={still ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.14, ease: 'easeIn' } }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full origin-top-right px-4 pt-2 md:inset-x-auto md:right-6 md:w-[244px] md:px-0 lg:right-8"
          >
            <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-[0_30px_70px_-30px_rgba(13,22,20,0.45)] ring-1 ring-line">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={still ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${isActive ? 'bg-accent/10' : 'hover:bg-wash'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`font-mono text-label tabular-nums ${isActive ? 'text-accent' : 'text-hint'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${
                            isActive ? 'bg-accent text-white' : 'bg-wash text-accent group-hover:bg-white'
                          }`}
                        >
                          <l.icon className="size-4" strokeWidth={1.8} />
                        </span>
                        <span className={`display min-w-0 flex-1 text-h3 ${isActive ? 'text-accent2' : 'text-ink'}`}>{l.label}</span>
                        <ArrowRight className="size-4 shrink-0 text-hint transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
