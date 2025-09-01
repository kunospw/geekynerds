import React, { useState, useEffect } from 'react'
import { FiTarget, FiBook, FiUsers, FiStar, FiArrowRight, FiCode, FiTrendingUp, FiHeart } from 'react-icons/fi'
import { BiCodeAlt, BiData, BiNetworkChart } from 'react-icons/bi'
import Logo from '../assets/logo.png'
import Footer from '../components/Footer'

const About = () => {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setMounted(true), 100)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen tech-pattern bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          {/* Loading header section */}
          <div className="text-center mb-16">
            <div className="skeleton h-16 w-96 mx-auto mb-8 rounded-xl"></div>
            <div className="skeleton h-64 w-64 mx-auto mb-8 rounded-full"></div>
            <div className="skeleton h-6 w-full max-w-3xl mx-auto mb-3 rounded"></div>
            <div className="skeleton h-6 w-3/4 max-w-2xl mx-auto mb-10 rounded"></div>
            
            {/* Loading stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <div className="skeleton h-10 w-32 rounded-full"></div>
              <div className="skeleton h-10 w-36 rounded-full"></div>
              <div className="skeleton h-10 w-28 rounded-full"></div>
            </div>
          </div>

          {/* Loading containers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="skeleton h-48 rounded-2xl"></div>
              <div className="skeleton h-48 rounded-2xl"></div>
              <div className="skeleton h-48 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="skeleton h-48 rounded-2xl"></div>
              <div className="skeleton h-48 rounded-2xl"></div>
              <div className="skeleton h-48 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen tech-pattern bg-transparent">
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full gradient-accent opacity-20 floating-animation"></div>
      <div className="absolute top-60 left-8 w-12 h-12 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
      <div className="absolute bottom-80 right-1/4 w-20 h-20 rounded-full bg-[#7bce47] opacity-25 floating-animation"></div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        {/* Centered header section */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-900 leading-tight mb-8 px-4">
            About <span className="text-gradient">GeekyNerds</span>
          </h1>
          
          <div className="relative flex justify-center mb-8">
            <img 
              src={Logo} 
              alt="GeekyNerds logo" 
              className="w-32 md:w-48 lg:w-64 xl:w-80 object-contain floating-animation transform transition-transform duration-700 hover:-translate-y-2 hover:scale-105 cursor-pointer" 
            />
            <div className="absolute -bottom-2 -right-8 w-6 h-6 bg-[#7bce47] rounded-full animate-ping opacity-75"></div>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
            GeekyNerds is a curated bookstore for developers and technologists. We collect the best
            books on programming, system design, data, and infrastructure — and pair them with real
            reviews and practical notes so you can learn faster.
          </p>

          {/* Key stats */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 px-4">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full shadow-md border border-green-100">
              <FiBook className="w-4 md:w-5 h-4 md:h-5 text-[#7bce47]" />
              <span className="font-semibold text-neutral-900 text-sm md:text-base">500+ Books</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full shadow-md border border-green-100">
              <FiUsers className="w-4 md:w-5 h-4 md:h-5 text-[#7bce47]" />
              <span className="font-semibold text-neutral-900 text-sm md:text-base">10K+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full shadow-md border border-green-100">
              <FiStar className="w-4 md:w-5 h-4 md:h-5 text-[#7bce47]" />
              <span className="font-semibold text-neutral-900 text-sm md:text-base">4.8 Rating</span>
            </div>
          </div>
        </div>

        {/* Info containers split into left and right */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
          {/* Left column */}
          <div className="space-y-6">
            {/* Mission Card */}
            <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-white/30 glass-effect backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#7bce47] rounded-lg">
                  <FiTarget className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-neutral-900">Our Mission</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed flex-1 text-sm md:text-base break-words">
                Make high-quality tech learning accessible, practical, and enjoyable. We believe every developer deserves curated, reviewed content that accelerates their growth.
              </p>
            </div>

            {/* Community First */}
            <div className="p-4 md:p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#7bce47] to-[#58a12b] text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FiHeart className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">Community First</h3>
              </div>
              <p className="text-white/90 leading-relaxed mb-4 flex-1 text-sm md:text-base break-words">
                Reviews from practitioners, not marketing copy. We highlight practical feedback so you know what to expect from every book.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <FiUsers className="w-4 h-4" />
                <span className="text-xs md:text-sm">Trusted by 10,000+ developers</span>
              </div>
            </div>

            {/* Community Resources */}
            <div className="p-4 md:p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#91e2ce] rounded-lg">
                  <FiBook className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-neutral-900">Community Resources</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed flex-1 text-sm md:text-base break-words">
                We publish reading lists, learning paths, and short notes from community reviewers to help you pick the right book for your journey.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* What we curate */}
            <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-white/30 glass-effect backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#91e2ce] rounded-lg">
                  <BiCodeAlt className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-neutral-900">What We Curate</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 flex-1">
                <div className="flex items-center gap-2">
                  <FiCode className="w-3 md:w-4 h-3 md:h-4 text-[#7bce47] flex-shrink-0" />
                  <span className="text-neutral-600 text-xs md:text-sm break-words">Programming</span>
                </div>
                <div className="flex items-center gap-2">
                  <BiNetworkChart className="w-3 md:w-4 h-3 md:h-4 text-[#7bce47] flex-shrink-0" />
                  <span className="text-neutral-600 text-xs md:text-sm break-words">System Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <BiData className="w-3 md:w-4 h-3 md:h-4 text-[#7bce47] flex-shrink-0" />
                  <span className="text-neutral-600 text-xs md:text-sm break-words">Data Science</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="w-3 md:w-4 h-3 md:h-4 text-[#7bce47] flex-shrink-0" />
                  <span className="text-neutral-600 text-xs md:text-sm break-words">Engineering</span>
                </div>
              </div>
            </div>

            {/* Join the team */}
            <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-white/30 glass-effect backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#7bce47] rounded-lg">
                  <FiUsers className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-neutral-900">Join the Team</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed mb-6 flex-1 text-sm md:text-base break-words">
                Want to contribute reviews or recommend books? Reach out — we love community contributions and value diverse perspectives.
              </p>
              <div className="flex items-center gap-2 text-[#7bce47] font-semibold cursor-pointer hover:text-[#58a12b] transition-colors duration-200">
                <span className="text-sm md:text-base">Contact us</span>
                <FiArrowRight className="w-3 md:w-4 h-3 md:h-4" />
              </div>
            </div>

            {/* Values */}
            <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-white/30 glass-effect backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-auto md:h-48 flex flex-col">
              <h3 className="font-bold text-lg md:text-xl text-neutral-900 mb-4">Our Values</h3>
              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#7bce47] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-neutral-600 text-sm md:text-base break-words"><strong>Quality over quantity:</strong> Every book is hand-picked and reviewed</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#7bce47] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-neutral-600 text-sm md:text-base break-words"><strong>Community driven:</strong> Real reviews from real developers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#7bce47] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-neutral-600 text-sm md:text-base break-words"><strong>Learning focused:</strong> Practical knowledge that you can apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About