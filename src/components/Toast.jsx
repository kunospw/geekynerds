import React, { useEffect } from 'react'

export default function Toast({ visible = false, message = '', type = 'success', onClose }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onClose && onClose(), 3500)
    return () => clearTimeout(t)
  }, [visible, onClose])

  if (!visible) return null

  const bg = type === 'success' ? 'bg-green-600' : 'bg-red-600'

  return (
    <div className="fixed right-4 top-6 z-50">
      <div
        role="status"
        className={`max-w-md w-full flex items-start gap-3 p-3 rounded-lg shadow-lg text-white ${bg} transform transition-all duration-300 ease-out`}
      >
        <div className="flex-1">
          <div className="font-semibold text-sm">{type === 'success' ? 'Success' : 'Notice'}</div>
          <div className="text-sm mt-1">{message}</div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="ml-3 opacity-90 hover:opacity-100 text-white"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
