import React, { useEffect, useState } from 'react'

// Right-side slide-in panel
function Drawer({ title, subtitle, onClose, footer, children }) {
const [open, setOpen] = useState(false)

useEffect(()=>{
    const frame = requestAnimationFrame(()=> setOpen(true))
    const handleEscape = (e)=>{
        if(e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return ()=> {
        cancelAnimationFrame(frame)
        document.removeEventListener("keydown", handleEscape)
    }
}, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
        <div className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`} />

        <aside
            className={`relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-200 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e)=> e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-[#005ee2] to-[#3b82f6] px-5 py-5 text-white">
                <div className="min-w-0">
                    {subtitle && <p className="text-xs font-medium uppercase tracking-wider text-white/70">{subtitle}</p>}
                    <h2 className="mt-0.5 break-words text-lg font-semibold">{title}</h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="cursor-pointer rounded-lg p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

            {footer && (
                <div className="flex gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">{footer}</div>
            )}
        </aside>
    </div>
  )
}

export default Drawer
