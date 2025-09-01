import React from 'react'
import { FiTwitter, FiGithub } from 'react-icons/fi'
import Logo from '../assets/footerlogo.png'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#2d5016] via-[#447722] to-[#5b9f2d] py-fluid text-white">
      {/* Responsive decorative elements */}
      <div className="absolute top-8 left-8 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 rounded-full bg-[#7bce47] opacity-20 floating-animation"></div>
      <div className="absolute bottom-8 right-8 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
      
      <div className="container mx-auto px-fluid">
        <div className="bg-transparent py-fluid">
          {/* Main Footer Content - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Logo and Description Section */}
            <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
              <img 
                src={Logo} 
                alt="GeekyNerds" 
                className="w-24 h-auto sm:w-28 md:w-32 lg:w-36 mx-auto sm:mx-0 mb-4 sm:mb-5 md:mb-6 transition-transform duration-300 hover:scale-105" 
              />
              <p className="text-responsive-sm sm:text-responsive-base text-neutral-200 max-w-xs mx-auto sm:mx-0 leading-relaxed opacity-90">
                GeekyNerds curates IT books and community reviews so you can learn faster without the noise.
              </p>
            </div>

            {/* Categories Section */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white mb-4 sm:mb-5 text-responsive-sm sm:text-responsive-base">
                Categories
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-responsive-xs sm:text-responsive-sm text-neutral-200">
                <li>
                  <a href="/category/javascript" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    JavaScript
                  </a>
                </li>
                <li>
                  <a href="/category/python" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    Python
                  </a>
                </li>
                <li>
                  <a href="/category/react" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    React
                  </a>
                </li>
                <li>
                  <a href="/category/devops" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    DevOps
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white mb-4 sm:mb-5 text-responsive-sm sm:text-responsive-base">
                Resources
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-responsive-xs sm:text-responsive-sm text-neutral-200">
                <li>
                  <a href="/about" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-[#7bce47] transition-colors duration-300 hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter and Social Section */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white mb-4 sm:mb-5 text-responsive-sm sm:text-responsive-base">
                Stay in touch
              </h4>
              <p className="text-responsive-xs sm:text-responsive-sm text-neutral-200 mb-4 sm:mb-5 leading-relaxed opacity-90">
                Get curated picks and deals straight to your inbox.
              </p>

              {/* Responsive Newsletter Form */}
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  aria-label="Email" 
                  className="flex-1 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-responsive-xs sm:text-responsive-sm text-neutral-900 min-w-0 bg-white/95 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7bce47] focus:border-[#7bce47] transition-all duration-200 placeholder:text-neutral-500" 
                />
                <button 
                  className="bg-[#7bce47] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-md font-semibold text-responsive-xs sm:text-responsive-sm hover:bg-[#6bb83a] transition-all duration-200 hover:scale-105 touch-target" 
                  type="submit"
                >
                  Subscribe
                </button>
              </form>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-5 text-neutral-200">
                <a 
                  href="https://twitter.com" 
                  aria-label="Twitter" 
                  className="hover:text-[#7bce47] transition-colors duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10"
                >
                  <FiTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>

                <a 
                  href="https://github.com" 
                  aria-label="GitHub" 
                  className="hover:text-[#7bce47] transition-colors duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10"
                >
                  <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer - Responsive Layout */}
          <div className="mt-12 sm:mt-16 md:mt-20 border-t border-white/20 pt-6 sm:pt-8 text-responsive-xs sm:text-responsive-sm text-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} GeekyNerds. All rights reserved.
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <a 
                href="/terms" 
                className="hover:text-[#7bce47] transition-colors duration-300 hover:underline"
              >
                Terms
              </a>
              <a 
                href="/privacy" 
                className="hover:text-[#7bce47] transition-colors duration-300 hover:underline"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
