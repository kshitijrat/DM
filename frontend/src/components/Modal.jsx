// Modal.js (already styled correctly based on your previous setup)
import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-4xl top-3 mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 dark:hover:text-red-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
