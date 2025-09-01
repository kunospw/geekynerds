import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPages from './pages/LandingPages'
import About from './pages/AboutPage'
import ProductPage from './pages/ProductPage'
import Header from './components/Header'
import Cart from './pages/CartPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App