// src/components/Hero.jsx
import React from "react";
import { AiFillStar } from 'react-icons/ai'
import Img1 from '../assets/books/9781484206485.png'
import Img2 from '../assets/books/9781484211830.png'
import Img3 from '../assets/books/9781617291609.png'
import { fetchNew } from '../lib/api'
import HeroSkeleton from './HeroSkeleton'

// Static book data (fallback)
const FALLBACK_BOOKS = [
    {
        id: "9781484206485",
        title: "Practical MongoDB",
        subtitle: "Architecting, Developing, and Administering MongoDB",
        image: Img1,
        url: "https://itbook.store/books/9781484206485",
        rating: 4.8,
        reviews: 186,
    },
    {
        id: "9781484211830",
        title: "The Definitive Guide to MongoDB, 3rd Edition",
        subtitle: "A complete guide to dealing with Big Data using MongoDB",
        image: Img2,
        url: "https://itbook.store/books/9781484211830",
        rating: 4.6,
        reviews: 142,
    },
    {
        id: "9781617291609",
        title: "MongoDB in Action, 2nd Edition",
        subtitle: "Covers MongoDB version 3.0",
        image: Img3,
        url: "https://itbook.store/books/9781617291609",
        rating: 4.7,
        reviews: 210,
    },
];

export default function Hero() {
    // Track which book is currently centered
    const [centerIndex, setCenterIndex] = React.useState(1); // Start with middle book
    // Mounted state to trigger entrance animations
    const [mounted, setMounted] = React.useState(false);
    const [books, setBooks] = React.useState(FALLBACK_BOOKS)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    React.useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                const api = await fetchNew()
                if (cancelled) return
                const items = Array.isArray(api) ? api.slice(0, 3).map((b, idx) => ({
                    id: b.isbn13 || `h-${idx}`,
                    title: b.title || 'Untitled',
                    subtitle: b.subtitle || '',
                    image: b.image || FALLBACK_BOOKS[idx].image,
                    url: b.url || '#',
                    rating: Number(b.rating) || FALLBACK_BOOKS[idx].rating,
                    reviews: FALLBACK_BOOKS[idx].reviews || 0,
                })) : []

                if (items.length === 3) setBooks(items)
            } catch (err) {
                // ignore and keep fallback
                console.warn('Hero fetchNew failed', err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => { cancelled = true }
    }, [])

    const centerBook = books[centerIndex];

    return (
        <section className="relative overflow-visible min-h-screen tech-pattern pt-16 sm:pt-18 md:pt-20 lg:pt-24" style={{ backgroundColor: '#f3f9ee' }}>
            {/* Responsive floating decorative elements */}
            <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full gradient-accent opacity-20 floating-animation"></div>
            <div className="absolute top-32 sm:top-40 right-4 sm:right-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
            <div className="absolute bottom-32 sm:bottom-40 left-1/4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#7bce47] opacity-25 floating-animation"></div>
            
            {/* Full-screen hero - account for fixed navbar with responsive spacing */}
            <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] md:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] flex items-center pb-4 sm:pb-6 md:pb-8 relative z-10">
                {loading ? (
                    <HeroSkeleton />
                ) : (
                    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-4 sm:px-6 md:grid-cols-2 flex-1">
                        {/* Left: headline + CTA + info */}
                        <div className={`flex flex-col justify-center items-start space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-neutral-900">
                                Find the <span className="text-gradient">books</span>
                                <br /> that make you <span className="text-gradient">smarter</span>
                            </h1>

                            <p className="max-w-xl text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed">
                                Learn coding, system design, and tech skills with curated IT reads
                                and reviews from real geeks.
                            </p>

                            <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <a href="/products"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#7bce47] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm sm:text-base md:text-lg font-semibold text-white hover:brightness-95 transition-all duration-300 hover:scale-105 pulse-glow"
                                >
                                    Explore Books <span className="text-lg sm:text-xl leading-none">›</span>
                                </a>
                            </div>

                            {/* Book info that updates based on centered book */}
                            <div className="mt-3 sm:mt-4 md:mt-6 max-w-xl rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 md:p-6 shadow-lg glass-effect backdrop-blur-sm border transition-transform duration-300 ease-out transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-green-50 cursor-pointer relative z-30">
                                <a href={centerBook.url} target="_blank" rel="noreferrer" className="block">
                                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">{centerBook.title}</h3>
                                    <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">{centerBook.subtitle}</p>

                                    <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 sm:gap-3">
                                        <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#d6f5bf] px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm md:text-base font-semibold text-neutral-900">
                                            <AiFillStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" /> {centerBook.rating.toFixed(1)}
                                        </span>
                                        <span className="text-xs sm:text-sm md:text-base text-neutral-600">
                                            ({centerBook.reviews.toLocaleString()} reviews)
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right: book covers in staggered arrangement - responsive sizing */}
                        <div className="relative h-[400px] sm:h-[480px] md:h-[520px] lg:h-[600px] xl:h-[700px] flex items-center justify-center mt-8 md:mt-0">
                            <div className="relative w-full h-full">
                                {books.map((book, idx) => {
                                    const isCenter = idx === centerIndex;

                                    // Position books in staggered arrangement - responsive positioning
                                    let transform = '';
                                    let zIndex = 10;
                                    let scale = 0.85;

                                    if (idx === 0) {
                                        // Left book - responsive positioning
                                        transform = 'translate(-50%, -50%) translateX(-120px) translateY(20px) rotate(-9deg)';
                                        if (window.innerWidth >= 640) transform = 'translate(-50%, -50%) translateX(-150px) translateY(25px) rotate(-9deg)';
                                        if (window.innerWidth >= 768) transform = 'translate(-50%, -50%) translateX(-180px) translateY(30px) rotate(-9deg)';
                                        zIndex = isCenter ? 40 : 15;
                                        scale = isCenter ? 1.05 : 0.85;
                                    } else if (idx === 1) {
                                        // Center book - largest, no rotation, front
                                        transform = 'translate(-50%, -50%) translateX(0px) translateY(0px) rotate(0deg)';
                                        zIndex = isCenter ? 50 : 30;
                                        scale = isCenter ? 1.25 : 1.02;
                                    } else if (idx === 2) {
                                        // Right book - slightly behind, rotated right
                                        transform = 'translate(-50%, -50%) translateX(180px) translateY(40px) rotate(9deg)';
                                        zIndex = isCenter ? 40 : 15;
                                        scale = isCenter ? 1.05 : 0.88;
                                    }

                                    return (
                                        <div
                                            key={book.id}
                                            className={`absolute top-1/2 left-1/2 cursor-pointer`} 
                                            style={{
                                                transform: `${transform}`,
                                                zIndex: zIndex,
                                            }}
                                            onMouseEnter={() => setCenterIndex(idx)}
                                        >
                                            {/* inner wrapper handles entrance animation and hover scaling separately from positional transform */}
                                            <div
                                                className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${isCenter ? 'scale-105' : 'scale-95'} hover:scale-105`}
                                                style={{ transitionDelay: `${idx * 120}ms` }}
                                            >
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className={`w-[200px] h-[300px] md:w-[260px] md:h-[400px] rounded-lg object-cover`}
                                                    onError={(e) => {
                                                        // Fallback to a styled placeholder sized like the image
                                                        e.target.outerHTML = `
                                  <div class="w-[200px] h-[300px] md:w-[260px] md:h-[400px] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <span class="text-gray-500 text-sm font-medium">Book Cover</span>
                                  </div>
                                `;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* optional soft vignette at bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f3f9ee] to-transparent" />
        </section>
    );
}
