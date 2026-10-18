// src/components/Modal.jsx
import { useEffect } from "react"
import { X } from "lucide-react"

export const INPUT_CLASS = `w-full bg-neutral border border-gray-300 rounded-[10px] px-4 py-3 text-base text-dark outline-none placeholder:text-dark/50`

export default function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === "Escape" && onClose()
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [open, onClose])

    if (!open) return null

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-[520px] max-h-[90vh] overflow-y-auto flex flex-col gap-5 bg-neutral rounded-sm shadow-md p-6 md:p-8`}
            >
                <div className={`w-full flex items-center justify-between gap-4`}>
                    <div className={`title text-md`}>{title}</div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="إغلاق"
                        className={`text-dark cursor-pointer`}
                    >
                        <X size={22} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
