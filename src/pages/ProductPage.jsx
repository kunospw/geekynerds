import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiGrid, FiList, FiChevronDown, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import CATEGORIES from '../lib/categories'
import BookCard from '../components/BookCard'
import SkeletonCard from '../components/SkeletonCard'
import { fetchSearch, fetchNew } from '../lib/api'
import Footer from '../components/Footer'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // State management
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  
  // Get initial values from URL params
  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'all'
    const sort = searchParams.get('sort') || 'relevance'
    const page = parseInt(searchParams.get('page')) || 1
    
    setSearchQuery(query)
    setSelectedCategory(category)
    setSortBy(sort)
    setCurrentPage(page)
    setMounted(true)
  }, [searchParams])

  // Ensure we scroll to top (account for fixed header) whenever the route or query changes
  useEffect(() => {
    try {
      if (location && location.pathname && location.pathname.startsWith('/products')) {
        const nav = document.getElementById('navbar')
        const offset = nav ? nav.offsetHeight : 0
        window.scrollTo({ top: Math.max(0, offset - 8), left: 0, behavior: 'smooth' })
      }
    } catch (e) {
      try { window.scrollTo(0, 0) } catch (err) { /* ignore */ }
    }
  }, [location.pathname, location.search])

  // Fetch books when search params change
  useEffect(() => {
    if (!mounted) return
    
    async function loadBooks() {
      setLoading(true)
      setError(null)
      
      try {
        let result

        // Determine what to fetch and assemble app pages of PREFERRED_PAGE_SIZE
        // Notes: API_PAGE_SIZE is the API's page size (10). We prefer showing
        // PREFERRED_PAGE_SIZE items per app page (12). To do that we may need
        // to fetch two consecutive API pages and slice the combined results.
        const PREFERRED_PAGE_SIZE = 12
        const API_PAGE_SIZE = 10
        const appPage = Number(currentPage) || 1
        const startIndex = (appPage - 1) * PREFERRED_PAGE_SIZE

        if (searchQuery.trim()) {
          // Search by query: fetch the API page(s) that cover this app page
          const apiPageStart = Math.floor(startIndex / API_PAGE_SIZE) + 1
          const p1 = await fetchSearch(searchQuery.trim(), apiPageStart)
          let combined = Array.isArray(p1.books) ? p1.books.slice() : []
          // Fetch next API page if we need more items to assemble one app page
          if (combined.length < (startIndex % API_PAGE_SIZE) + PREFERRED_PAGE_SIZE) {
            const p2 = await fetchSearch(searchQuery.trim(), apiPageStart + 1)
            if (Array.isArray(p2.books)) combined = combined.concat(p2.books)
          }

          const localStart = startIndex - (apiPageStart - 1) * API_PAGE_SIZE
          const pageSlice = combined.slice(localStart, localStart + PREFERRED_PAGE_SIZE)

          result = {
            books: pageSlice,
            total: p1.total || (pageSlice.length + (apiPageStart - 1) * API_PAGE_SIZE),
            page: appPage
          }
        } else if (selectedCategory === 'all') {
          // Show new books for "all" category — client-side paginate
          const newBooks = await fetchNew()
          const pageSlice = newBooks.slice(startIndex, startIndex + PREFERRED_PAGE_SIZE)
          result = {
            books: pageSlice,
            total: newBooks.length,
            page: appPage
          }
        } else {
          // Search by category (mapped to a query)
          const categoryData = CATEGORIES.find(c => c.id === selectedCategory)
          if (categoryData && categoryData.query) {
            const apiPageStart = Math.floor(startIndex / API_PAGE_SIZE) + 1
            const p1 = await fetchSearch(categoryData.query, apiPageStart)
            let combined = Array.isArray(p1.books) ? p1.books.slice() : []
            if (combined.length < (startIndex % API_PAGE_SIZE) + PREFERRED_PAGE_SIZE) {
              const p2 = await fetchSearch(categoryData.query, apiPageStart + 1)
              if (Array.isArray(p2.books)) combined = combined.concat(p2.books)
            }

            const localStart = startIndex - (apiPageStart - 1) * API_PAGE_SIZE
            const pageSlice = combined.slice(localStart, localStart + PREFERRED_PAGE_SIZE)

            result = {
              books: pageSlice,
              total: p1.total || (pageSlice.length + (apiPageStart - 1) * API_PAGE_SIZE),
              page: appPage
            }
          } else {
            result = { books: [], total: 0, page: appPage }
          }
        }
        
  // Transform API data to match BookCard expectations
        const transformedBooks = result.books.map((book, idx) => ({
          id: book.isbn13 || `book-${idx}`,
          title: book.title || 'Untitled',
          price: (book.price || '').toString().replace(/[^0-9.]/g, '') || '0.00',
          rating: Number(book.rating) || 4.0 + Math.random() * 1, // Fallback rating
          reviews: Math.floor(Math.random() * 200) + 50, // Fake review count
          image: book.image || '/books/9781484206485.png',
          url: book.url || (book.isbn13 ? `https://itbook.store/books/${book.isbn13}` : undefined)
        }))
        
        // Apply sorting
        const sortedBooks = sortBooks(transformedBooks, sortBy)
        
        setBooks(sortedBooks)
        setTotalResults(result.total || transformedBooks.length)
        
      } catch (err) {
        console.error('Failed to load books:', err)
        setError(err.message)
        
        // Fallback to some sample data
        const fallbackBooks = Array.from({ length: 12 }, (_, i) => ({
          id: `fallback-${i}`,
          title: `Sample Book ${i + 1}`,
          price: `${(20 + Math.random() * 40).toFixed(2)}`,
          rating: 4.0 + Math.random() * 1,
          reviews: Math.floor(Math.random() * 200) + 50,
          image: '/books/9781484206485.png',
          url: undefined
        }))
        
        setBooks(fallbackBooks)
        setTotalResults(fallbackBooks.length)
      } finally {
        setLoading(false)
      }
    }
    
    loadBooks()
  }, [mounted, searchQuery, selectedCategory, sortBy, currentPage])

  // Sort books helper
  const sortBooks = (books, sortType) => {
    const sorted = [...books]
    
    switch (sortType) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'price-low':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      case 'price-high':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      case 'relevance':
      default:
        return sorted // Keep original order for relevance
    }
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    updateURL({ q: searchQuery, category: 'all', page: 1 })
  }

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    if (categoryId === 'all') {
      updateURL({ q: '', category: categoryId, page: 1 })
    } else {
      updateURL({ q: '', category: categoryId, page: 1 })
    }
  }

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    updateURL({ sort: newSort, page: 1 })
  }

  // Update URL params
  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    
    setSearchParams(newParams)
  }

  // Loading skeleton count
  const skeletonCount = viewMode === 'grid' ? 12 : 8
  // Pagination
  // Prefer 12 items per app page. API returns 10 per page for searches, so we'll assemble 12 items by fetching multiple API pages when needed.
  const PREFERRED_PAGE_SIZE = 12
  const API_PAGE_SIZE = 10
  const pageSize = PREFERRED_PAGE_SIZE
  const totalPages = Math.max(1, Math.ceil((Number(totalResults) || 0) / pageSize))

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    updateURL({ page })
  }

  // build a compact pages array for UI (show window around current)
  const getPages = () => {
    const pages = []
    const maxButtons = 7
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2))
    let end = start + maxButtons - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxButtons + 1)
    }
    for (let p = start; p <= end; p++) pages.push(p)
    return { pages, start, end }
  }

  return (
    <>
    <section className="min-h-screen bg-gradient-to-br from-[#f8fdf6] to-[#e2f4d7] pt-20 pb-12" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', backgroundColor: '#e2f4d7' }}>
      {/* Floating decorative elements */}
      <div className="fixed top-32 right-10 w-8 h-8 rounded-full bg-[#7bce47] opacity-20 floating-animation"></div>
      <div className="fixed bottom-40 left-20 w-6 h-6 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
      <div className="fixed top-1/2 right-1/4 w-4 h-4 rounded-full bg-[#58a12b] opacity-25 floating-animation"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`mb-8 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">
              Discover <span className="text-gradient">Amazing Books</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collection of programming, tech, and development books
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, topics, or authors..."
                className="w-full pl-6 pr-14 py-4 rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm text-lg focus:outline-none focus:border-[#7bce47] focus:bg-white transition-all duration-300 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#7bce47] text-white rounded-xl hover:bg-[#58a12b] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Results Summary */}
          {!loading && (
            <div className="text-center text-neutral-600 mb-6">
              {searchQuery ? (
                <p>Found <span className="font-semibold text-[#58a12b]">{totalResults}</span> results for "{searchQuery}"</p>
              ) : (
                <p>Showing <span className="font-semibold text-[#58a12b]">{books.length}</span> books</p>
              )}
            </div>
          )}
        </div>

        {/* Filters and Controls */}
        <div className={`mb-8 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          {/* Categories */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((category, index) => {
                const Icon = category.icon
                const isActive = selectedCategory === category.id
                
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-[#7bce47] text-white shadow-lg'
                        : 'bg-white/80 text-neutral-700 hover:bg-white hover:shadow-md border border-white/50'
                    }`}
                    style={{ animationDelay: `${300 + index * 50}ms` }}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white/80 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-[#7bce47] transition-colors duration-300"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-md text-[#58a12b]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-md text-[#58a12b]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700 mb-4">Failed to load books</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Books Grid/List */}
        <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          {loading ? (
            // Loading skeletons
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {Array.from({ length: skeletonCount }, (_, index) => (
                <div key={`skeleton-${index}`} className={`${viewMode === 'grid' ? 'flex justify-center' : 'w-full'}`}>
                  <SkeletonCard delay={index * 100} view={viewMode} />
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            // Books display
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {books.map((book, index) => (
                <div key={book.id} className={`${viewMode === 'grid' ? 'flex justify-center' : 'w-full'}`}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    price={book.price}
                    rating={book.rating}
                    reviews={book.reviews}
                    image={book.image}
                    url={book.url}
                    onAdd={() => console.log('Added to cart:', book.title)}
                    mounted={mounted}
                    delay={index * 80}
                    view={viewMode}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Empty state
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try adjusting your search terms.`
                  : 'No books available in this category.'
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  updateURL({ q: '', category: 'all', page: 1 })
                }}
                className="px-6 py-3 bg-[#7bce47] text-white rounded-lg hover:bg-[#58a12b] transition-colors duration-300"
              >
                Browse All Books
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalResults > pageSize && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="text-neutral-600">Showing page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></div>
            <nav className="inline-flex items-center gap-2" aria-label="Pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className="p-2 rounded-md bg-white/90 border border-white/50 shadow-sm hover:bg-white disabled:opacity-50">
                <FiChevronLeft className="w-4 h-4" />
              </button>

              {/* page numbers */}
              {getPages().pages.map(p => (
                <button key={p} onClick={() => handlePageChange(p)} className={`px-3 py-1 rounded-md ${p === currentPage ? 'bg-[#7bce47] text-white shadow-md' : 'bg-white/90 border border-white/50'}`}>
                  {p}
                </button>
              ))}

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="p-2 rounded-md bg-white/90 border border-white/50 shadow-sm hover:bg-white disabled:opacity-50">
                <FiChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </div>

    </section>

    {/* Footer (full-bleed) */}
    <Footer />
    </>
  )
}
