import React from 'react'

export default function SkeletonCard({ delay = 0, view = 'grid' }) {
  const isGrid = view === 'grid'

  if (isGrid) {
    return (
      <div
        className="skeleton-card flex flex-col"
        style={{ width: 280, height: 400, animationDelay: `${delay}ms` }}
      >
        {/* Image skeleton */}
        <div className="skeleton" style={{ height: 200, borderRadius: '12px 12px 0 0' }}></div>
        
        {/* Content skeleton */}
        <div className="p-4 flex flex-col" style={{ height: 200 }}>
          {/* Title skeleton */}
          <div className="space-y-2 mb-4">
            <div className="skeleton h-4 rounded" style={{ width: '90%' }}></div>
            <div className="skeleton h-4 rounded" style={{ width: '70%' }}></div>
          </div>
          
          {/* Price and rating skeleton */}
          <div className="mt-auto">
            <div className="mb-3">
              <div className="skeleton h-4 rounded mb-2" style={{ width: '40%' }}></div>
              <div className="flex items-center gap-2">
                <div className="skeleton h-6 rounded-full" style={{ width: '60px' }}></div>
                <div className="skeleton h-4 rounded" style={{ width: '50px' }}></div>
              </div>
            </div>
            
            {/* Button skeleton */}
            <div className="skeleton h-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  // List view skeleton (horizontal, full-width) - responsive height via CSS
  return (
    <div className="skeleton-card flex items-stretch w-full list-card-mobile" style={{ height: 180, animationDelay: `${delay}ms` }}>
      <div className="skeleton" style={{ width: 140, height: '100%', borderRadius: 8 }}></div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="skeleton h-4 rounded" style={{ width: '60%' }}></div>
          <div className="skeleton h-4 rounded" style={{ width: '40%' }}></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="skeleton h-6 rounded-full" style={{ width: 60 }}></div>
            <div className="skeleton h-4 rounded" style={{ width: 50 }}></div>
          </div>
          <div className="skeleton h-10 rounded-lg" style={{ width: 140 }}></div>
        </div>
      </div>
    </div>
  )
}
