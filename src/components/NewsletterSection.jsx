import React from 'react'

export default function NewsletterSection() {
  return (
    <section className="relative overflow-visible bg-gradient-to-br from-[#e2f4d7] via-[#d6f5bf] to-[#c9ebc9] py-fluid">
      {/* Responsive decorative floating accent */}
      <div className="absolute -top-4 sm:-top-6 md:-top-8 right-4 sm:right-8 md:right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#c9ebc9] opacity-40 floating-animation"></div>
      <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-4 sm:left-8 md:left-12 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#91e2ce] opacity-30 floating-animation-delayed"></div>
      
      <div className="container mx-auto px-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left: Content Section - Responsive Typography */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <h2 className="text-responsive-3xl sm:text-responsive-4xl md:text-responsive-5xl lg:text-responsive-6xl font-extrabold text-neutral-900 leading-tight transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
              Stay in the loop
            </h2>
            <p className="mt-4 sm:mt-5 md:mt-6 text-responsive-base sm:text-responsive-lg md:text-responsive-xl lg:text-responsive-2xl text-neutral-700 max-w-2xl mx-auto lg:mx-0 transition-opacity duration-500 opacity-90 hover:opacity-100 leading-relaxed">
              Get updates on new tech releases, top picks, and exclusive deals.
            </p>
          </div>

          {/* Right: Form Section - Responsive Layout */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <form 
              className="w-full max-w-lg sm:max-w-xl md:max-w-2xl transform transition-all duration-500" 
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Responsive form layout - stack on small screens, row on larger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-5">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="w-full rounded-lg px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 bg-white shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all duration-200 text-responsive-sm sm:text-responsive-base placeholder:text-neutral-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-[#7bce47] text-white font-bold px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 shadow-md hover:brightness-95 transition-all transform duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl text-responsive-sm sm:text-responsive-base touch-target"
                >
                  Subscribe
                </button>
              </div>
              
              {/* Optional: Additional info or privacy notice */}
              <p className="mt-3 sm:mt-4 text-responsive-xs sm:text-responsive-sm text-neutral-600 text-center sm:text-left opacity-75">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
