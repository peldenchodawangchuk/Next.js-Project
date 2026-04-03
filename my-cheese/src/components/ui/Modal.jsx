"use client";

export default function Modal({ isOpen, onClose, children, title = "" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        {title && (
          <h2 className="mb-4 text-center text-2xl font-bold text-black">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}