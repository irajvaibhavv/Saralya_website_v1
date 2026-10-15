import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Landing } from './pages/Landing'

// Only the landing ships in the first bundle; other pages load on navigation.
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Agents = lazy(() => import('./pages/Agents').then((m) => ({ default: m.Agents })))
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })))

/* Fetch the other pages once the landing has painted, so a click never waits
   on a chunk mid-transition. */
function preload() {
  const go = () => Promise.all([import('./pages/Home'), import('./pages/Agents'), import('./pages/Privacy')])
  ;(window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500)))(go)
}

const TITLES: Record<string, string> = {
  '/': 'Saral AI · Saralya',
  '/home': 'Saralya · Lending infrastructure for India’s NBFCs',
  '/agents': 'Agents · Saralya',
  '/privacy': 'Privacy Policy · Saralya',
}

/** Scroll to top on route change (or to the hash target if one is present) and set the tab title. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Saralya'
    if (hash) {
      // Lazy pages mount a beat after the URL changes; poll briefly for the target.
      let tries = 0
      const id = window.setInterval(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        if (el || ++tries > 20) window.clearInterval(id)
      }, 50)
      return () => window.clearInterval(id)
    }
  }, [pathname, hash])
  useEffect(preload, [])
  return null
}

/** The old page fades out in place; only then does the window jump to the
    top and the new page fade in with a small rise. */
function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => { if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' }) }}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/agents" element={<Agents />} />
            {['products', 'demo'].map((id) => (
              <Route key={id} path={`/${id}`} element={<Navigate to={`/home#${id}`} replace />} />
            ))}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Navbar />
      <main>
        <Pages />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
