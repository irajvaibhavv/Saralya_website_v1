import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { Landing } from './pages/Landing'

// Only the landing ships in the first bundle; other pages load on navigation.
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const Technology = lazy(() => import('./pages/Technology').then((m) => ({ default: m.Technology })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Demo = lazy(() => import('./pages/Demo').then((m) => ({ default: m.Demo })))
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })))

const TITLES: Record<string, string> = {
  '/': 'Saral AI · Saralya',
  '/home': 'Saralya · Making Lending Saral for Bharat',
  '/products': 'Products · Saralya',
  '/technology': 'Technology · Saralya',
  '/about': 'About us · Saralya',
  '/demo': 'Live demo · Saralya',
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
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/** Pages cross-fade and rise slightly on route change. */
function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
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
      <Nav />
      <main>
        <Pages />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
