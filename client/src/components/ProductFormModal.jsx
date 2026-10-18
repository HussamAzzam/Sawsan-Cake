// src/components/ProductFormModal.jsx
import { useEffect, useMemo, useState } from "react"
import { CirclePlus, Trash2 } from "lucide-react"
import Modal, { INPUT_CLASS } from "@/components/Modal.jsx"
import { createProduct, updateProduct } from "@/api/productService.js"
import { uploadImage } from "@/api/uploadService.js"

const emptyOption = { people: "", value: "" }
const empty = {
    name: "",
    description: "",
    category: "",
    subcategory: "",
    image: "",
    priceOptions: [emptyOption],
}

export default function ProductFormModal({ open, onClose, product, categories, onSaved }) {
    const isEdit = Boolean(product)
    const [form, setForm] = useState(empty)
    const [file, setFile] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!open) return
        setError("")
        setFile(null)
        setForm(
            product
                ? {
                      name: product.name || "",
                      description: product.description || "",
                      category: product.category?._id || product.category || "",
                      subcategory: product.subcategory || "",
                      image: product.image || "",
                      priceOptions: product.priceOptions?.length
                          ? product.priceOptions.map((o) => ({ people: o.people, value: o.value }))
                          : [emptyOption],
                  }
                : empty
        )
    }, [open, product])

    const subcategories = useMemo(
        () => categories.find((c) => c._id === form.category)?.subcategories || [],
        [categories, form.category]
    )

    const preview = useMemo(() => (file ? URL.createObjectURL(file) : form.image), [file, form.image])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleCategoryChange = (e) => setForm({ ...form, category: e.target.value, subcategory: "" })

    const setOption = (index, key, value) =>
        setForm({
            ...form,
            priceOptions: form.priceOptions.map((o, i) => (i === index ? { ...o, [key]: value } : o)),
        })

    const addOption = () => setForm({ ...form, priceOptions: [...form.priceOptions, emptyOption] })

    const removeOption = (index) =>
        setForm({ ...form, priceOptions: form.priceOptions.filter((_, i) => i !== index) })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!file && !form.image) {
            setError("صورة المنتج مطلوبة")
            return
        }
        if (form.priceOptions.length === 0) {
            setError("أضف خيار سعر واحداً على الأقل")
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
                description: form.description,
                category: form.category,
                image,
                priceOptions: form.priceOptions.map((o) => ({
                    people: Number(o.people),
                    value: Number(o.value),
                })),
            }
            if (form.subcategory || isEdit) payload.subcategory = form.subcategory

            const res = isEdit
                ? await updateProduct(product._id, payload)
                : await createProduct(payload)
            onSaved(res.data.product || res.data, isEdit)
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || "تعذر حفظ المنتج")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Modal open={open} onClose={onClose} title={isEdit ? "تعديل المنتج" : "إضافة منتج جديد"}>
            <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-4`}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="اسم المنتج" required className={INPUT_CLASS} />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="الوصف" rows={3} required className={INPUT_CLASS} />

                <select name="category" value={form.category} onChange={handleCategoryChange} required className={INPUT_CLASS}>
                    <option value="">اختر التصنيف</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                {subcategories.length > 0 && (
                    <select name="subcategory" value={form.subcategory} onChange={handleChange} className={INPUT_CLASS}>
                        <option value="">بدون تصنيف فرعي</option>
                        {subcategories.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                )}

                <div className={`w-full flex flex-col gap-3`}>
                    <div className={`text-base text-dark font-semibold`}>خيارات السعر</div>
                    {form.priceOptions.map((option, index) => (
                        <div key={index} className={`w-full flex items-center gap-3`}>
                            <input
                                type="number"
                                min="1"
                                value={option.people}
                                onChange={(e) => setOption(index, "people", e.target.value)}
                                placeholder="عدد الأشخاص"
                                required
                                className={INPUT_CLASS}
                            />
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={option.value}
                                onChange={(e) => setOption(index, "value", e.target.value)}
                                placeholder="السعر (د.أ)"
                                required
                                className={INPUT_CLASS}
                            />
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                disabled={form.priceOptions.length === 1}
                                aria-label="حذف الخيار"
                                className={`text-red-600 shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-default`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOption}
                        className={`self-start flex items-center gap-2 bg-light text-dark text-sm font-semibold px-3 py-2 rounded-sm cursor-pointer`}
                    >
                        <CirclePlus size={16} />
                        <span>إضافة خيار</span>
                    </button>
                </div>

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
