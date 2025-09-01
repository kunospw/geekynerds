import React, { useEffect } from 'react'
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi'

export default function Toast({ visible = false, message = '', type = 'success', onClose }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onClose && onClose(), 5000)
    return () => clearTimeout(t)
  }, [visible, onClose])

  if (!visible) return null

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: <FiCheckCircle className="w-5 h-5" />,
          title: 'Success!'
        }
      case 'notice':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: <FiAlertCircle className="w-5 h-5" />,
          title: 'Notice'
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: <FiCheckCircle className="w-5 h-5" />,
          title: 'Success!'
        }
    }
  }

  const styles = getToastStyles()

  return (
    <div className="fixed right-4 top-20 z-50 animate-in slide-in-from-right-2 duration-300">
      <div
        role="status"
        className={`max-w-md w-full flex items-start gap-4 p-4 rounded-xl shadow-2xl text-white ${styles.bg} backdrop-blur-sm border border-white/20 transform transition-all duration-300 ease-out hover:scale-105`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {styles.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">{styles.title}</div>
          <div className="text-sm opacity-95 leading-relaxed">{message}</div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="flex-shrink-0 ml-2 opacity-80 hover:opacity-100 text-white hover:bg-white/20 p-1 rounded-lg transition-all duration-200"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
