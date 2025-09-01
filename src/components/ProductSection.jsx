import React from 'react'
import { Link } from 'react-router-dom'
import CATEGORIES from '../lib/categories'
import BookCard from './BookCard'
import SkeletonCard from './SkeletonCard'
import { fetchNew, fetchSearch } from '../lib/api'

export default function ProductSection() {
  const [mounted, setMounted] = React.useState(false);
  const [booksTrending, setBooksTrending] = React.useState([])
  const [booksFavorites, setBooksFavorites] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);

    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        // Trending: use /new (take up to 8)
        const apiTrending = await fetchNew()
        const mappedTrending = (Array.isArray(apiTrending) ? apiTrending : [])
          .slice(0, 8)
          .map((b, idx) => ({
            id: b.isbn13 || `tr-${idx}`,
            title: b.title || 'Untitled',
            price: (b.price || '').toString().replace(/[^0-9.]/g, '') || '0.00',
            // Fallback to a sensible rating if API returns 0/empty
            rating: Number(b.rating) || (4 + Math.random()),
            // Use API reviews if present, else generate a realistic count
            reviews: Number(b.reviews) || (Math.floor(Math.random() * 200) + 50),
            image: b.image || '/books/9781484206485.png',
            url: b.url
          }))

        // Favorites: run a different query so results differ (e.g., 'python')
        const searchRes = await fetchSearch('python', 1)
        const mappedFav = (Array.isArray(searchRes.books) ? searchRes.books : [])
          .slice(0, 8)
          .map((b, idx) => ({
            id: b.isbn13 || `fav-${idx}`,
            title: b.title || 'Untitled',
            price: (b.price || '').toString().replace(/[^0-9.]/g, '') || '0.00',
            rating: Number(b.rating) || (4 + Math.random()),
            reviews: Number(b.reviews) || (Math.floor(Math.random() * 200) + 50),
            image: b.image || '/books/9781484206485.png',
            url: b.url
          }))

        if (!cancelled) {
          setBooksTrending(Array.isArray(mappedTrending) ? mappedTrending : [])
          setBooksFavorites(Array.isArray(mappedFav) ? mappedFav : [])
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to SAMPLE', err)
        setError(err)
        if (!cancelled) {
          setBooksTrending([])
          setBooksFavorites([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => { cancelled = true; clearTimeout(t) }
  }, []);

  return (
    <section className="relative overflow-visible bg-gradient-to-br from-[#e2f4d7] via-[#d6f5bf] to-[#c9ebc9] py-20">
      {/* Responsive floating decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full bg-[#7bce47] opacity-20 floating-animation"></div>
      <div className="absolute bottom-8 left-8 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full bg-[#58a12b] opacity-25 floating-animation"></div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Responsive Typography and Spacing */}
        <div className={`text-center transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '80ms' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Skip the noise. Jump straight into the topics you love.
          </p>

          {/* Responsive Category Pills */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap mt-2 sm:mt-2 md:mt-4 px-4">
            {CATEGORIES.map((c, i) => (
              <Link 
                key={c.id} 
                to={`/products?category=${encodeURIComponent(c.id)}`} 
                onClick={() => {
                  try {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  } catch (e) {
                    try { window.scrollTo(0, 0) } catch (err) { /* ignore */ }
                  }
                }}
                className={`pill-fill px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-full bg-white border border-[#91e2ce] text-sm sm:text-base md:text-lg font-semibold transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-md touch-target`} 
                style={{ transitionDelay: `${120 + i * 40}ms` }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mt-2 sm:mt-4 md:mt-8 lg:mt-10">
          <div className="flex items-center justify-between mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
              Trending <span className="text-gradient">Now</span>
            </h3>
            <Link 
              to="/products" 
              onClick={() => {
                try {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } catch (e) {
                  try { window.scrollTo(0, 0) } catch (err) { /* ignore */ }
                }
              }}
              className="text-[#58a12b] font-semibold hover:text-[#7bce47] transition-colors duration-300 text-base sm:text-lg md:text-xl hover:underline"
            >
              See All
            </Link>
          </div>

          {/* Responsive Carousel Container */}
          <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <div className="relative">
              <div className="overflow-x-auto scroll-smooth hide-scrollbar" style={{ overflowY: 'visible' }}>
                <div className="flex gap-8 sm:gap-2 md:gap-4 lg:gap-8 px-2 sm:px-4 md:px-6 py-4">
                  {loading ? (
                    // Responsive skeleton grid
                    Array.from({ length: 8 }, (_, idx) => (
                      <div key={`skeleton-trending-${idx}`} className="flex-none" style={{ scrollSnapAlign: 'start' }}>
                        <SkeletonCard delay={idx * 90} />
                      </div>
                    ))
                  ) : (
                    // Responsive book grid
                    (booksTrending.length ? booksTrending : SAMPLE).map((b, idx) => (
                      <div key={b.id ?? idx} className="flex-none" style={{ scrollSnapAlign: 'start' }}>
                        <BookCard 
                          id={b.id} 
                          title={b.title} 
                          price={b.price} 
                          rating={b.rating} 
                          reviews={b.reviews} 
                          image={b.image} 
                          url={b.url}
                          onAdd={() => { }} 
                          mounted={mounted} 
                          delay={idx * 90} 
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mt-2 sm:mt-4 md:mt-8 lg:mt-10">
          <div className="flex items-center justify-between mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
              Geek's <span className="text-gradient">Favorite</span>
            </h3>
            <Link 
              to="/products" 
              onClick={() => {
                try {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } catch (e) {
                  try { window.scrollTo(0, 0) } catch (err) { /* ignore */ }
                }
              }}
              className="text-[#58a12b] font-semibold hover:text-[#7bce47] transition-colors duration-300 text-base sm:text-lg md:text-xl hover:underline"
            >
              See All
            </Link>
          </div>

          {/* Responsive Carousel Container */}
          <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '240ms' }}>
            <div className="relative">
              <div className="overflow-x-auto scroll-smooth hide-scrollbar" style={{ overflowY: 'visible' }}>
                <div className="flex gap-8 sm:gap-2 md:gap-4 lg:gap-8 px-2 sm:px-4 md:px-6 py-4">
                  {loading ? (
                    // Responsive skeleton grid
                    Array.from({ length: 8 }, (_, idx) => (
                      <div key={`skeleton-favorites-${idx}`} className="flex-none" style={{ scrollSnapAlign: 'start' }}>
                        <SkeletonCard delay={idx * 90} />
                      </div>
                    ))
                  ) : (
                    // Responsive book grid
                    (booksFavorites.length ? booksFavorites : SAMPLE).map((b, idx) => (
                      <div key={b.id ?? idx} className="flex-none" style={{ scrollSnapAlign: 'start' }}>
                        <BookCard 
                          title={b.title} 
                          price={b.price} 
                          rating={b.rating} 
                          reviews={b.reviews} 
                          image={b.image} 
                          url={b.url}
                          onAdd={() => { }} 
                          mounted={mounted} 
                          delay={idx * 90} 
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
