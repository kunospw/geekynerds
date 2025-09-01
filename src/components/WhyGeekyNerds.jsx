import React from 'react'
import Logo from '../assets/logo.png'

export default function WhyGeekyNerds() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left: large logo - responsive sizing */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img
              src={Logo}
              alt="GeekyNerds logo"
              className="w-48 h-auto sm:w-56 md:w-64 lg:w-80 xl:w-96 object-contain floating-animation transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            />
          </div>

          {/* Right: heading, copy, CTA - responsive typography */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2">
            <div className="leading-none">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
                Why
              </div>
              <div className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#7bce47] drop-shadow-md leading-tight transition-transform duration-400 hover:-translate-y-2 hover:scale-105">
                GeekyNerds<span className="text-neutral-900">?</span>
              </div>
            </div>

            <p className="mt-6 sm:mt-8 md:mt-10 max-w-xl text-neutral-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              We're more than just an online bookstore. GeekyNerds curates IT reads that matter, pairs them with community
              reviews, and keeps everything simple so you can learn faster without the noise.
            </p>

            <a 
              href="/about" 
              className="mt-8 sm:mt-10 md:mt-12 inline-flex items-center rounded-full bg-[#7bce47] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold text-white hover:brightness-95 transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg touch-target"
            >
              Learn More <span className="ml-2 sm:ml-3 text-xl sm:text-2xl leading-none">›</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
