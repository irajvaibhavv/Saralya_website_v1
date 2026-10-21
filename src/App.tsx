import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Landing } from './pages/Landing'
import { holdTop, lenis } from './lib/scroll'

// Only the landing ships in the first bundle; other pages load on navigation.
const Agents = lazy(() => import('./pages/Agents').then((m) => ({ default: m.Agents })))
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })))
const Product = lazy(() => import('./pages/Product').then((m) => ({ default: m.Product })))
const SaralyaAi = lazy(() => import('./pages/SaralyaAi').then((m) => ({ default: m.SaralyaAi })))

/* Fetch the other pages once the landing has painted, so a click never waits
   on a chunk mid-transition. */
function preload() {
  const go = () => Promise.all([import('./pages/Agents'), import('./pages/Product'), import('./pages/Privacy')])
  ;(window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500)))(go)
}

const TITLES: Record<string, string> = {
  '/': 'Saral AI · Saralya',
  '/agents': 'Agents · Saralya',
  '/products': 'Product · Saralya',
  '/privacy': 'Privacy Policy · Saralya',
  '/saralya-ai': 'Saralya AI',
}

/** Scroll to top on route change (or to the hash target if one is present) and set the tab title. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Saralya'
    if (hash) {
      /* Lazy pages mount a beat after the URL changes; poll for the target,
         and keep polling until the scroll actually lands on it — Lenis
         clamps to the page height it last measured, which on a page that
         is still mounting is far shorter than it will be. */
      let tries = 0
      const id = window.setInterval(() => {
        const el = document.querySelector(hash)
        if (el) {
          lenis.resize()
          const top = el.getBoundingClientRect().top + window.scrollY
          lenis.scrollTo(top, { immediate: tries === 0 ? false : true, force: true })
          if (Math.abs(window.scrollY - top) < 4) return window.clearInterval(id)
        }
        if (++tries > 40) window.clearInterval(id)
      }, 80)
      return () => window.clearInterval(id)
    }
    /* A lazy page mounts short and grows, so the window can end up where
       the last page left it. Hold the top until it has its real height. */
    holdTop()
  }, [pathname, hash])
  useEffect(preload, [])
  return null
}

/** The old page fades out in place; only then does the window jump to the
    top and the new page fade in with a small rise. */
function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => { if (!location.hash) lenis.scrollTo(0, { immediate: true }) }}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/products" element={<Product />} />
            <Route path="/demo" element={<Navigate to="/products#demo" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/saralya-ai" element={<SaralyaAi />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

/* Saralya AI is its own surface: it brings its own top bar and sidebar, so
   the site chrome stands aside for it. */
function Chrome() {
  const app = useLocation().pathname.startsWith('/saralya-ai')
  return (
    <>
      {!app && <Navbar />}
      <main>
        <Pages />
      </main>
      {!app && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Chrome />
    </BrowserRouter>
  )
}

export default App
