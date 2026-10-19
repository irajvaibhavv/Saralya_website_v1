import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/home', label: 'Overview' },
  { to: '/products', label: 'Product' },
  { to: '/agents', label: 'Agents' },
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full px-4 pt-2 md:inset-x-auto md:right-6 md:w-64 md:px-0 lg:right-8"
          >
            <div className="rounded-3xl bg-white p-3 shadow-lg">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-body font-semibold ${isActive ? 'bg-wash2 text-accent' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
