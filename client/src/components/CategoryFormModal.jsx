// src/components/CategoryFormModal.jsx
import { useEffect, useMemo, useState } from "react"
import Modal, { INPUT_CLASS } from "@/components/Modal.jsx"
import { createCategory, updateCategory } from "@/api/categoryService.js"
import { uploadImage } from "@/api/uploadService.js"

const empty = { name: "", slug: "", imageAlt: "", subcategories: "", image: "" }

export default function CategoryFormModal({ open, onClose, category, onSaved }) {
    const isEdit = Boolean(category)
    const [form, setForm] = useState(empty)
    const [file, setFile] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!open) return
        setError("")
        setFile(null)
        setForm(
            category
                ? {
                      name: category.name || "",
                      slug: category.slug || "",
                      imageAlt: category.imageAlt || "",
                      subcategories: (category.subcategories || []).join("، "),
                      image: category.image || "",
                  }
                : empty
        )
    }, [open, category])

    const preview = useMemo(() => (file ? URL.createObjectURL(file) : form.image), [file, form.image])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!file && !form.image) {
            setError("صورة التصنيف مطلوبة")
            return
        }

        setSaving(true)
        try {
            let image = form.image
            if (file) {
                const up = await uploadImage(file)
                image = up.data.url
            }

            const payload = {
                name: form.name,
                slug: form.slug,
                image,
                imageAlt: form.imageAlt,
                subcategories: form.subcategories
                    .split(/[,،\n]/)
                    .map((s) => s.trim())
                    .filter(Boolean),
            }

            const res = isEdit
                ? await updateCategory(category._id, payload)
                : await createCategory(payload)
            onSaved(res.data.category || res.data, isEdit)
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || "تعذر حفظ التصنيف")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Modal open={open} onClose={onClose} title={isEdit ? "تعديل التصنيف" : "إضافة تصنيف جديد"}>
            <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-4`}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="اسم التصنيف" required className={INPUT_CLASS} />
                <input name="slug" dir="ltr" value={form.slug} onChange={handleChange} placeholder="slug (مثال: cheesecakes)" required className={INPUT_CLASS} />
                <input name="imageAlt" value={form.imageAlt} onChange={handleChange} placeholder="وصف الصورة (اختياري)" className={INPUT_CLASS} />
                <input name="subcategories" value={form.subcategories} onChange={handleChange} placeholder="التصنيفات الفرعية مفصولة بفاصلة (اختياري)" className={INPUT_CLASS} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className={`${INPUT_CLASS} cursor-pointer`}
                />
                {preview && <img src={preview} alt="" className={`w-24 h-24 rounded-sm object-cover`} />}
                {error && <p className={`text-base text-red-600`}>{error}</p>}
                <div className={`w-full flex items-center gap-3`}>
                    <button
                        type="submit"
                        disabled={saving}
                        className={`flex-1 bg-dark text-white text-base font-semibold px-4 py-3 rounded-sm cursor-pointer disabled:opacity-50`}
                    >
                        {saving ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className={`flex-1 bg-light text-dark text-base font-semibold px-4 py-3 rounded-sm cursor-pointer`}
                    >
                        إلغاء
                    </button>
                </div>
            </form>
        </Modal>
    )
}
