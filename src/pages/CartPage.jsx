import React, { useEffect, useMemo, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const CURRENCY = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function readCart() {
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
  } catch (e) {
    return null
  }
}

function writeCart(items) {
  try { localStorage.setItem('cart', JSON.stringify(items)); try { window.dispatchEvent(new CustomEvent('cart:changed')) } catch (e) {} } catch (e) { /* ignore */ }
}

// const SAMPLE = [
//   { id: '9781484206485', title: 'Effective JavaScript', price: 21.99, qty: 1, image: '/books/9781484206485.png' },
//   { id: '9781449331818', title: 'Beginning JavaScript, 3rd Edition', price: 19.02, qty: 1, image: '/books/9781449331818.png' },
// ]

export default function CartPage() {
  const [items, setItems] = useState(() => readCart() || [])

  useEffect(() => {
    writeCart(items)
  }, [items])

  // Ensure the page is scrolled to top when this route mounts (fixes nav-to-cart position)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [])

  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0), [items])
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  function updateQty(id, qty) {
    const q = Math.max(1, Number(qty) || 1)
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: q } : it))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  function checkout() {
    // prototype behavior: show success, clear cart
    if (!items || items.length === 0) {
      setToast({ visible: true, message: 'Your cart is empty.', type: 'notice' })
      return
    }

    const totalItems = items.reduce((s, it) => s + (Number(it.qty) || 0), 0)
    const total = subtotal

    // clear cart (prototype)
    setItems([])
    writeCart([])

  // show success toast
  setToast({ visible: true, message: `Purchase successful — ${totalItems} item(s) purchased. Total: ${CURRENCY.format(total)}. Thank you!`, type: 'success' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fdf6] to-[#e2f4d7]" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 mb-6 text-left">Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Items list */}
          <div className="lg:col-span-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/50">
            {/* Desktop Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-sm text-neutral-700 border-b border-neutral-200">
                    <th className="py-3">Item</th>
                    <th className="py-3 w-28">Qty</th>
                    <th className="py-3 w-32">Subtotal</th>
                    <th className="py-3 w-12" />
                  </tr>
                </thead>

                <tbody>
                  {items.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-left text-neutral-600">Your cart is empty.</td>
                      </tr>
                    ) : items.map(item => (
                    <tr key={item.id} className="align-top border-b border-neutral-100">
                      <td className="py-6">
                        <div className="flex items-start gap-4">
                          <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded shadow-sm" />
                          <div>
                            <div className="font-semibold text-neutral-900">{item.title}</div>
                            {item.subtitle && <div className="text-sm text-neutral-600">{item.subtitle}</div>}
                          </div>
                        </div>
                      </td>

                      <td className="py-6">
                        <div>
                          <input
                            type="number"
                            min={1}
                            value={item.qty}
                            onChange={(e) => updateQty(item.id, e.target.value)}
                            className="w-20 border rounded p-2 text-sm"
                          />
                        </div>
                      </td>

                      <td className="py-6">
                        <div className="font-semibold">{CURRENCY.format((Number(item.price) || 0) * (Number(item.qty) || 0))}</div>
                      </td>

                      <td className="py-6 text-right">
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded">
                          <FiTrash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {items.length === 0 ? (
                <div className="py-12 text-left text-neutral-600">Your cart is empty.</div>
              ) : items.map(item => (
                <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded shadow-sm flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-900 text-sm mb-2">{item.title}</div>
                      {item.subtitle && <div className="text-xs text-neutral-600 mb-3">{item.subtitle}</div>}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-600">Qty:</span>
                            <input
                              type="number"
                              min={1}
                              value={item.qty}
                              onChange={(e) => updateQty(item.id, e.target.value)}
                              className="w-16 border rounded p-1 text-sm"
                            />
                          </div>
                          <div className="font-semibold text-sm">{CURRENCY.format((Number(item.price) || 0) * (Number(item.qty) || 0))}</div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded">
                          <FiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 md:mt-6 text-left">
              <button onClick={() => window.history.back()} className="px-4 py-2 inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white hover:bg-gray-50 text-sm">
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-white/50 shadow-sm text-left">
              <h3 className="font-semibold text-base md:text-lg mb-4 text-left">Summary</h3>

              <div className="flex items-center justify-between text-neutral-700 mb-2 text-sm md:text-base">
                <div>Subtotal</div>
                <div className="font-semibold">{CURRENCY.format(subtotal)}</div>
              </div>

              <div className="mt-4 md:mt-6 text-left">
                <div className="text-xs md:text-sm text-neutral-600 mb-2">Total</div>
                <div className="text-xl md:text-2xl font-extrabold">{CURRENCY.format(subtotal)}</div>
              </div>

              <div className="mt-4 md:mt-6 text-left">
                <button onClick={checkout} className="w-full gradient-accent text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg text-sm md:text-base">
                  Checkout
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
  <Toast visible={toast.visible} message={toast.message} type={toast.type === 'notice' ? 'notice' : 'success'} onClose={() => setToast({ ...toast, visible: false })} />
    </div>
  )
}
