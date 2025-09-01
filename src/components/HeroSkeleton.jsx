import React from 'react'

export default function HeroSkeleton() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-12 md:grid-cols-2 flex-1">
      {/* Left: skeleton for headline + CTA + info card */}
      <div className="flex flex-col justify-center items-start space-y-6 text-left">
        {/* Headline skeleton */}
        <div className="space-y-3 w-full">
          <div className="skeleton h-12 md:h-16 rounded" style={{ width: '90%' }}></div>
          <div className="skeleton h-12 md:h-16 rounded" style={{ width: '80%' }}></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 w-full max-w-lg">
          <div className="skeleton h-4 rounded" style={{ width: '95%' }}></div>
          <div className="skeleton h-4 rounded" style={{ width: '70%' }}></div>
        </div>

        {/* CTA button skeleton */}
        <div className="skeleton h-12 rounded-full" style={{ width: '160px' }}></div>

        {/* Book info card skeleton */}
        <div className="mt-4 max-w-xl rounded-2xl bg-white p-5 shadow-lg glass-effect backdrop-blur-sm border border-white/20 w-full">
          {/* Title skeleton */}
          <div className="space-y-2 mb-3">
            <div className="skeleton h-6 rounded" style={{ width: '85%' }}></div>
            <div className="skeleton h-6 rounded" style={{ width: '65%' }}></div>
          </div>
          
          {/* Subtitle skeleton */}
          <div className="space-y-2 mb-4">
            <div className="skeleton h-4 rounded" style={{ width: '95%' }}></div>
            <div className="skeleton h-4 rounded" style={{ width: '70%' }}></div>
          </div>

          {/* Rating and reviews skeleton */}
          <div className="flex items-center gap-3">
            <div className="skeleton h-7 rounded-full" style={{ width: '80px' }}></div>
            <div className="skeleton h-4 rounded" style={{ width: '100px' }}></div>
          </div>
        </div>
      </div>

      {/* Right: book covers skeleton - 3 positioned books */}
      <div className="relative h-[520px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {[0, 1, 2].map((idx) => {
            let transform = '';
            
            if (idx === 0) {
              // Left book position (smaller on mobile)
              transform = 'translate(-50%, -50%) translateX(-80px) translateY(30px) rotate(-9deg)';
            } else if (idx === 1) {
              // Center book position
              transform = 'translate(-50%, -50%) translateX(0px) translateY(0px) rotate(0deg)';
            } else if (idx === 2) {
              // Right book position (smaller on mobile)
              transform = 'translate(-50%, -50%) translateX(80px) translateY(40px) rotate(9deg)';
            }

            return (
              <div
                key={`hero-skeleton-${idx}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: transform,
                  zIndex: idx === 1 ? 50 : 15,
                }}
              >
                <div className="skeleton w-[120px] h-[180px] sm:w-[160px] sm:h-[240px] md:w-[200px] md:h-[300px] lg:w-[260px] lg:h-[400px] rounded-lg"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
