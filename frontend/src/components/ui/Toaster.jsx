"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const Toaster = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleToast = (event) => {
      const { message, type = "info", duration = 5000 } = event.detail

      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type, duration }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, duration)
    }

    window.addEventListener("toast", handleToast)
    return () => window.removeEventListener("toast", handleToast)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

const Toast = ({ message, type, onClose }) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200"
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200"
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200"
    }
  }

  return (
    <div className={`rounded-lg border-l-4 p-4 shadow-md backdrop-blur-sm ${getTypeStyles()} animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-2">
          {typeof message === 'string' ? (
            message
          ) : (
            <div>
              {message.title && <div className="font-semibold">{message.title}</div>}
              {message.description && <div className="text-sm">{message.description}</div>}
              {message.action && (
                <button
                  className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
                  onClick={message.action.onClick}
                >
                  {message.action.label}
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

// Helper function to show toasts from anywhere
export const toast = (message, type = "info", duration = 5000) => {
  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: { message, type, duration },
    })
  )
}
