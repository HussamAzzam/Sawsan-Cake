// src/components/ManageCategoriesModal.jsx
import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import Modal from "@/components/Modal.jsx"
import { deleteCategory } from "@/api/categoryService.js"

export default function ManageCategoriesModal({ open, onClose, categories, counts, onEdit, onDeleted }) {
    const [error, setError] = useState("")
    const [busyId, setBusyId] = useState(null)

    const handleDelete = async (category) => {
        if (!window.confirm(`هل أنت متأكد من حذف تصنيف «${category.name}»؟`)) return
        setBusyId(category._id)
        setError("")
        try {
            await deleteCategory(category._id)
            onDeleted(category._id)
        } catch (err) {
            setError(err.response?.data?.message || "تعذر حذف التصنيف")
        } finally {
            setBusyId(null)
        }
    }

    return (
        <Modal open={open} onClose={onClose} title="إدارة التصنيفات">
            <div className={`w-full flex flex-col gap-3`}>
                {categories.length === 0 && (
                    <p className={`text-base text-dark/70`}>لا توجد تصنيفات</p>
                )}
                {categories.map((c) => (
                    <div key={c._id} className={`w-full flex items-center justify-between gap-3 bg-light rounded-sm px-4 py-3`}>
                        <div className={`min-w-0 flex flex-col items-start`}>
                            <span className={`text-base text-dark font-semibold truncate`}>{c.name}</span>
                            <span className={`text-sm text-dark/70`}>{counts[c._id] || 0} منتج</span>
                        </div>
                        <div className={`flex items-center gap-3 shrink-0`}>
                            <button
                                onClick={() => onEdit(c)}
                                aria-label="تعديل"
                                className={`text-dark cursor-pointer`}
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(c)}
                                disabled={busyId === c._id}
                                aria-label="حذف"
                                className={`text-red-600 cursor-pointer disabled:opacity-50`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {error && <p className={`text-base text-red-600`}>{error}</p>}
            </div>
        </Modal>
    )
}
