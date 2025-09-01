import React from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function BookCard({ id, title, price, rating, reviews, image, onAdd, mounted = true, delay = 0, view = 'grid', url }) {
  const isGrid = view === 'grid'
  const containerClass = `bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} card-hover-lift border border-gray-100 ${isGrid ? 'flex flex-col' : 'flex flex-row items-stretch'} ${url ? 'cursor-pointer' : ''}`
  
  // Responsive sizing for list view - taller on mobile
  const containerStyle = isGrid ? 
    { width: 280, height: 400, transitionDelay: `${delay}ms`, willChange: 'transform, opacity' } : 
    { 
      width: '100%', 
      height: 180, // Base height, CSS will handle mobile responsiveness
      transitionDelay: `${delay}ms`, 
      willChange: 'transform, opacity' 
    }

  return (
    <div
      className={`${containerClass} ${!isGrid ? 'list-card-mobile' : ''}`}
      style={containerStyle}
      role={url ? 'link' : undefined}
      tabIndex={url ? 0 : undefined}
      onClick={() => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }}
      onKeyDown={(e) => {
        if (!url) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.open(url, '_blank', 'noopener,noreferrer')
        }
      }}
    >
      {/* Image */}
      {isGrid ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden" style={{ height: 300 }}>
          <div className="absolute inset-0 tech-pattern opacity-30"></div>
          {image ? (
            <img src={image} alt={title} className="h-full object-cover relative z-10 transition-transform duration-300 hover:scale-105" />
          ) : (
            <div className="w-32 h-40 bg-gray-200 rounded relative z-10" />
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex-shrink-0" style={{ width: 140, height: '100%' }}>
          <div className="absolute inset-0 tech-pattern opacity-20"></div>
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover relative z-10" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
      )}

      {/* Details */}
      <div className={`p-4 bg-gradient-to-b from-white to-gray-50 ${isGrid ? '' : 'flex-1 flex flex-col justify-between'}`} style={isGrid ? { height: 200 } : {}}>
        <h4 className={`text-base font-semibold text-neutral-900 text-left overflow-hidden hover:text-[#7bce47] transition-colors duration-300 ${isGrid ? '' : 'text-lg sm:text-base md:text-lg'}`} style={isGrid ? { height: 48, lineHeight: '1.2' } : {}}>
          {title}
        </h4>

        <div className={isGrid ? 'mt-auto' : 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'}>
          <div className={isGrid ? '' : 'flex flex-col gap-2'}>
            <div className="text-sm text-neutral-700 font-bold text-left">${price}</div>
            <div className="flex items-center gap-2 text-sm text-neutral-600 mt-0.5">
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#d6f5bf] to-[#e2f4d7] px-2 py-0.5 text-xs font-semibold shadow-sm">
                <AiFillStar className="w-3 h-3 mr-1 text-yellow-500" />{Number(rating || 0).toFixed(1)}
              </span>
              <span>({(reviews || 0).toLocaleString()})</span>
            </div>
          </div>

          <div className={isGrid ? '' : 'flex-shrink-0 w-full sm:w-40'}>
            <CartControls
              id={id}
              title={title}
              price={price}
              image={image}
              onAddCallback={onAdd}
              stopPropagation
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Small inline cart controls component
function CartControls({ id, title, price, image, onAddCallback }) {
  const [qty, setQty] = React.useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (!raw) return 0
      const parsed = JSON.parse(raw)
      const found = Array.isArray(parsed) && parsed.find(i => i.id === id)
      return found ? Number(found.qty) : 0
    } catch (e) {
      return 0
    }
  })

  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== 'cart') return
      try {
        const parsed = JSON.parse(e.newValue || '[]')
        const found = Array.isArray(parsed) && parsed.find(i => i.id === id)
        setQty(found ? Number(found.qty) : 0)
      } catch (err) {
        setQty(0)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [id])

  function readCart() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  }
  function writeCart(items) { try { localStorage.setItem('cart', JSON.stringify(items)) } catch (e) { } }

  const doSetQty = (newQty) => {
    const q = Math.max(0, Number(newQty) || 0)
    const cart = readCart()
    const idx = cart.findIndex(i => i.id === id)
    if (q <= 0) {
      if (idx >= 0) cart.splice(idx, 1)
    } else {
      if (idx >= 0) cart[idx] = { ...cart[idx], qty: q }
      else cart.push({ id, title, price, image, qty: q })
    }
    writeCart(cart)
    try { window.dispatchEvent(new CustomEvent('cart:changed')) } catch (e) { }
    // update local state
    setQty(q)
  }

  const onAdd = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const cart = readCart()
    const idx = cart.findIndex(i => i.id === id)
    if (idx >= 0) cart[idx].qty = Number(cart[idx].qty || 0) + 1
    else cart.push({ id, title, price, image, qty: 1 })
    writeCart(cart)
    try { window.dispatchEvent(new CustomEvent('cart:changed')) } catch (e) { }
    setQty(prev => prev + 1)
    if (onAddCallback) onAddCallback()
  }

  const inc = (e) => { if (e && e.stopPropagation) e.stopPropagation(); doSetQty(qty + 1) }
  const dec = (e) => { if (e && e.stopPropagation) e.stopPropagation(); doSetQty(qty - 1) }

  if (qty > 0) {
    return (
      <div className="inline-flex items-center gap-2 bg-white/80 rounded-lg p-1 shadow-sm">
        <button onClick={dec} className="w-8 h-8 rounded-md bg-white border border-white/60 text-[#58a12b] font-bold flex items-center justify-center">−</button>
        <div className="px-3 py-1 bg-transparent rounded-md font-semibold text-neutral-900">{qty}</div>
        <button onClick={inc} className="w-8 h-8 rounded-md bg-[#7bce47] text-white font-bold flex items-center justify-center">+</button>
      </div>
    )
  }

  return (
    <button onClick={onAdd} className="w-full gradient-accent text-white font-semibold py-1.5 rounded-lg hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
      style={{ marginTop: 6 }} onMouseDown={(e) => e.stopPropagation()}>
      Add to Cart
    </button>
  )
}
