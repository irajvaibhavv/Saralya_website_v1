import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'

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

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  useEffect(() => setOpen(false), [location.pathname])

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
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 text-[14px] font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-[14px] font-medium text-muted hover:text-ink">
              Saral AI
            </Link>
            <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`} variant="primary">
              Book a demo
            </ButtonLink>
          </div>

          <button
            className="md:hidden grid size-10 place-items-center rounded-full bg-white shadow-sm"
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
            className="md:hidden absolute inset-x-0 top-full px-4 pt-2"
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
              <div className="mt-2 grid gap-2 border-t border-line pt-3">
                <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Demo%20request`} variant="primary">
                  Book a demo
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
