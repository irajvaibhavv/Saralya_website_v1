import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Nav } from "./components/layout/Nav";
import { Home } from "./pages/Home";

// Only Home ships in the first bundle; other pages load on navigation.
const Products = lazy(() =>
  import("./pages/Products").then((m) => ({ default: m.Products })),
);
const Technology = lazy(() =>
  import("./pages/Technology").then((m) => ({ default: m.Technology })),
);
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const Demo = lazy(() =>
  import("./pages/Demo").then((m) => ({ default: m.Demo })),
);
const Privacy = lazy(() =>
  import("./pages/Privacy").then((m) => ({ default: m.Privacy })),
);

const TITLES: Record<string, string> = {
  "/": "Saralya — Making Lending Saral for Bharat",
  "/products": "Products — Saralya",
  "/technology": "Technology — Saralya",
  "/about": "About us — Saralya",
  "/demo": "Live demo — Saralya",
  "/privacy": "Privacy Policy — Saralya",
};

/** Scroll to top on route change (or to the hash target if one is present) and set the tab title. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "Saralya";
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
