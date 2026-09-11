import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
