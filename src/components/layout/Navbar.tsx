import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/home', label: 'Overview' },
  { to: '/products', label: 'Products' },
  { to: '/technology', label: 'Technology' },
  { to: '/about', label: 'About' },
  { to: '/demo', label: 'Live demo' },
]

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 text-[20px] font-extrabold tracking-[-0.04em] ${light ? 'text-white' : 'text-ink'}`}>
      Saralya
      <span className="inline-block size-2 rounded-full bg-accent" />
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
            className="grid size-10 place-items-center rounded-full bg-white shadow-sm"
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
            className="absolute inset-x-0 top-full px-4 pt-2 md:inset-x-auto md:right-6 md:w-64 md:px-0 lg:right-10"
          >
            <div className="rounded-3xl bg-white p-3 shadow-lg">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-[15px] font-semibold ${isActive ? 'bg-wash2 text-accent' : 'text-ink'}`
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
