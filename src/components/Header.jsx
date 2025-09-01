import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiMenu, FiShoppingCart } from 'react-icons/fi'
import Logo from '../assets/logo.png'

const Header = ({ onNavigate }) => {
    const [scrolled, setScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [cartCount, setCartCount] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (typeof window === 'undefined') return
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Keep header search in sync with products page query param when navigating
    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search)
            const q = params.get('q') || ''
            setSearchQuery(q)
        } catch (e) {
            // ignore
        }
    }, [location])

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate('/products')
        }
        // Close mobile search if open
        setMobileSearchOpen(false)
    }

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        // Close mobile search when opening menu
        if (!mobileMenuOpen) setMobileSearchOpen(false)
    }

    // Toggle mobile search
    const toggleMobileSearch = () => {
        setMobileSearchOpen(!mobileSearchOpen)
        // Close mobile menu when opening search
        if (!mobileSearchOpen) setMobileMenuOpen(false)
    }

    // Cart count (reads localStorage 'cart')
    useEffect(() => {
        const getCount = () => {
            try {
                const raw = localStorage.getItem('cart')
                if (!raw) return 0
                const parsed = JSON.parse(raw)
                if (!Array.isArray(parsed)) return 0
                return parsed.reduce((s, it) => s + (Number(it.qty) || 0), 0)
            } catch (e) { return 0 }
        }

        setCartCount(getCount())
        const onStorage = (e) => {
            if (e.key !== 'cart') return
            setCartCount(getCount())
        }
        const onFocus = () => setCartCount(getCount())
        const onCartChanged = () => setCartCount(getCount())

        window.addEventListener('storage', onStorage)
        // also listen to focus in case other code changed localStorage in same tab
        window.addEventListener('focus', onFocus)
        // custom in-tab event for cart updates
        window.addEventListener('cart:changed', onCartChanged)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('cart:changed', onCartChanged)
        }
    }, [])

    return (
        <>
            <motion.header
                id="navbar"
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out navbar-header ${
                    scrolled ? 'navbar-scrolled backdrop-blur-md' : 'bg-transparent'
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="w-full max-w-[360px] sm:max-w-[430px] md:max-w-none mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between overflow-hidden">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                        <img src={Logo} className="h-8 transition-transform duration-300 group-hover:scale-110" alt="GeekyNerds Logo" />
                        <span className="logo-text self-center text-2xl font-bold whitespace-nowrap text-gradient hidden sm:inline">GeekyNerds</span>
                    </NavLink>

                    {/* compact center search for md+ */}
                    <div className="hidden md:flex flex-1 justify-center px-4">
                        <div className="w-full max-w-xs">
                            <form onSubmit={handleSearch}>
                                <label htmlFor="site-search" className="sr-only">Search for books</label>
                                <div className="relative">
                                    <input 
                                        id="site-search" 
                                        name="q" 
                                        type="search" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search books..." 
                                        className="search-input w-full pl-4 pr-10 h-10 rounded-lg shadow-lg border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:scale-105 max-w-xs" 
                                    />
                                    <button 
                                        type="submit" 
                                        aria-label="Search" 
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#7bce47] transition-colors duration-300"
                                    >
                                        <FiSearch className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* mobile search + toggle */}
                        <button onClick={toggleMobileSearch} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none" aria-label="Open search">
                            <FiSearch className="w-5 h-5" />
                        </button>

                        <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded={mobileMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            <FiMenu className="w-5 h-5" aria-hidden />
                        </button>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `font-medium transition-all duration-300 hover:text-[#7bce47] ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products" 
                                className={({ isActive }) => 
                                    `font-medium transition-all duration-300 hover:text-[#7bce47] ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                Products
                            </NavLink>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => 
                                    `font-medium transition-all duration-300 hover:text-[#7bce47] ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                About
                            </NavLink>
                        </nav>

                        {/* cart icon */}
                        <button onClick={() => navigate('/cart')} className="hidden md:inline-flex items-center p-2 rounded-md text-green-600 hover:text-green-800 focus:outline-none transition-all duration-300 hover:scale-110 relative" aria-label="Open cart">
                            <FiShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-[#58a12b] rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile cart icon */}
                        <button onClick={() => navigate('/cart')} className="inline-flex md:hidden items-center p-2 rounded-md text-green-600 hover:text-green-800 focus:outline-none transition-all duration-300 hover:scale-110 relative" aria-label="Open cart">
                            <FiShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-[#58a12b] rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {mobileSearchOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/50 p-4">
                        <form onSubmit={handleSearch}>
                            <label htmlFor="mobile-search" className="sr-only">Search for books</label>
                            <div className="relative">
                                <input 
                                    id="mobile-search" 
                                    name="q" 
                                    type="search" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search books..." 
                                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#7bce47] transition-all duration-300" 
                                />
                                <button 
                                    type="submit" 
                                    aria-label="Search" 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#7bce47] transition-colors duration-300"
                                >
                                    <FiSearch className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/50">
                        <nav className="px-4 py-6 space-y-4">
                            <NavLink 
                                to="/" 
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => 
                                    `block py-2 px-3 font-medium transition-all duration-300 hover:text-[#7bce47] text-left ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products" 
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => 
                                    `block py-2 px-3 font-medium transition-all duration-300 hover:text-[#7bce47] text-left ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                Products
                            </NavLink>
                            <NavLink 
                                to="/about" 
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => 
                                    `block py-2 px-3 font-medium transition-all duration-300 hover:text-[#7bce47] text-left ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    }`
                                }
                            >
                                About
                            </NavLink>
                            <NavLink 
                                to="/cart" 
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => 
                                    `block py-2 px-3 font-medium transition-all duration-300 hover:text-[#7bce47] text-left ${
                                        isActive ? 'text-[#58a12b]' : 'text-gray-700'
                                    } flex items-center gap-2`
                                }
                            >
                                <FiShoppingCart className="w-4 h-4" />
                                Cart {cartCount > 0 && <span className="text-xs bg-[#58a12b] text-white px-2 py-0.5 rounded-full">({cartCount})</span>}
                            </NavLink>
                        </nav>
                    </div>
                )}
            </motion.header>
        </>
    )
}

export default Header