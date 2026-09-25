import React, { useEffect } from 'react'

function Modal({ title, onClose, maxWidth = "max-w-lg", children }) {

useEffect(()=>{
    const handleEscape = (e)=>{
        if(e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return ()=> document.removeEventListener("keydown", handleEscape)
}, [onClose])

  return (
    <main
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        onClick={onClose}
    >
        <div
            className={`flex max-h-full w-full ${maxWidth} flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200`}
            onClick={(e)=> e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <h2 className="truncate text-lg font-semibold text-slate-800">{title}</h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {children}
        </div>
    </main>
  )
}

export default Modal
