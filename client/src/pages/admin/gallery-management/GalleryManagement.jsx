// src/pages/admin/gallery-management/GalleryManagement.jsx
import { useEffect, useRef, useState } from "react"
import { Check, ChevronLeft, ChevronRight, CloudUpload, ImagePlus, Trash2, Undo2 } from "lucide-react"
import { getGalleryImages, uploadGalleryImage, deleteGalleryImages } from "@/api/galleryService.js"

const ACCEPTED_TYPES = ["image/png", "image/jpeg"]
const MAX_SIZE_MB = 10
const UNDO_MS = 5000
const PAGE_SIZE = 12

const PAGE_PX = `px-4 md:px-8 lg:px-12 xl:px-50`

export default function GalleryManagement() {
    const [images, setImages] = useState([])
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)
    const [reloadKey, setReloadKey] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState("")
    const [selected, setSelected] = useState(() => new Set())
    const [isDragging, setIsDragging] = useState(false)
    const [errors, setErrors] = useState([])
    const [pendingDelete, setPendingDelete] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState({ done: 0, total: 0 })

    const inputRef = useRef(null)
    const undoRef = useRef(null)
    const timerRef = useRef(null)
    const [undoCount, setUndoCount] = useState(0)

    useEffect(() => {
        const controller = new AbortController()
        getGalleryImages({ page, limit: PAGE_SIZE }, { signal: controller.signal })
            .then((res) => {
                const list = res.data.images || []
                if (list.length === 0 && page > 1) {
                    setPage(page - 1)
                    return
                }
                setImages(list)
                setTotal(res.data.total || 0)
                setPages(res.data.pages || 1)
                setLoadError("")
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return
                setLoadError(err.response?.data?.message || "تعذر تحميل الصور")
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })
        return () => controller.abort()
    }, [page, reloadKey])

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
            if (undoRef.current) {
                deleteGalleryImages(undoRef.current.map(({ img }) => img._id)).catch(() => {})
            }
        }
    }, [])

    useEffect(() => {
        if (!pendingDelete) return
        const onKey = (e) => e.key === "Escape" && setPendingDelete(null)
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [pendingDelete])

    const totalPages = Math.max(1, pages)
    const allSelected = images.length > 0 && images.every((img) => selected.has(img._id))

    const changePage = (n) => {
        setSelected(new Set())
        setPage(n)
    }

    const uploadFiles = async (files) => {
        setUploading(true)
        setProgress({ done: 0, total: files.length })
        const failed = []
        for (const file of files) {
            try {
                await uploadGalleryImage(file)
            } catch (err) {
                failed.push(`${file.name}: ${err.response?.data?.message || "فشل الرفع"}`)
            }
            setProgress((p) => ({ ...p, done: p.done + 1 }))
        }
        if (failed.length) setErrors((prev) => [...prev, ...failed])
        setUploading(false)
        setSelected(new Set())
        setPage(1)
        setReloadKey((k) => k + 1)
    }

    const addFiles = (fileList) => {
        if (uploading) return
        const valid = []
        const rejected = []

        Array.from(fileList).forEach((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                rejected.push(`${file.name}: الصيغة غير مدعومة (PNG, JPG فقط)`)
            } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                rejected.push(`${file.name}: الحجم أكبر من ${MAX_SIZE_MB}MB`)
            } else {
                valid.push(file)
            }
        })

        setErrors(rejected)
        if (valid.length) uploadFiles(valid)
    }

    const handleInputChange = (e) => {
        addFiles(e.target.files)
        e.target.value = ""
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        addFiles(e.dataTransfer.files)
    }

    const openPicker = () => {
        if (!uploading) inputRef.current?.click()
    }

    const toggleOne = (id) => {
        setSelected((prev) => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const toggleAll = () => {
        setSelected(allSelected ? new Set() : new Set(images.map((img) => img._id)))
    }

    const restoreItems = (items) => {
        setImages((prev) => {
            const next = [...prev]
            ;[...items]
                .sort((x, y) => x.index - y.index)
                .forEach(({ img, index }) => next.splice(Math.min(index, next.length), 0, img))
            return next
        })
        setTotal((t) => t + items.length)
    }

    const finalizeDelete = () => {
        clearTimeout(timerRef.current)
        const items = undoRef.current
        if (!items) return
        undoRef.current = null
        setUndoCount(0)

        deleteGalleryImages(items.map(({ img }) => img._id))
            .then(() => setReloadKey((k) => k + 1))
            .catch((err) => {
                restoreItems(items)
                setErrors([err.response?.data?.message || "تعذر حذف الصور"])
            })
    }

    const removeImages = (ids) => {
        finalizeDelete()

        const idSet = new Set(ids)
        const items = images
            .map((img, index) => ({ img, index }))
            .filter(({ img }) => idSet.has(img._id))
        if (items.length === 0) return

        setImages((prev) => prev.filter((img) => !idSet.has(img._id)))
        setTotal((t) => Math.max(0, t - items.length))
        setSelected((prev) => new Set([...prev].filter((id) => !idSet.has(id))))

        undoRef.current = items
        setUndoCount(items.length)
        timerRef.current = setTimeout(finalizeDelete, UNDO_MS)
    }

    const undoDelete = () => {
        const items = undoRef.current
        if (!items) return
        clearTimeout(timerRef.current)
        restoreItems(items)
        undoRef.current = null
        setUndoCount(0)
    }

    const handleDeleteSelected = () => setPendingDelete([...selected])

    const confirmDelete = () => {
        removeImages(pendingDelete)
        setPendingDelete(null)
    }

    if (loading) {
        return (
            <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
                <p className={`text-base text-dark/70`}>جاري التحميل...</p>
            </main>
        )
    }

    if (loadError && images.length === 0) {
        return (
            <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
                <p className={`text-base text-dark`}>{loadError}</p>
            </main>
        )
    }

    return (
        <main className={`w-full min-h-screen flex flex-col items-start gap-6 md:gap-8 ${PAGE_PX} py-6 md:py-10 bg-background`}>
            <div className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral rounded-sm shadow-md p-5 md:p-10`}>
                <div className={`flex flex-col items-start gap-3`}>
                    <div className={`flex flex-wrap items-center gap-3 md:gap-4`}>
                        <div className={`title text-xl`}>
                            إدارة صور المعرض
                        </div>
                        <span className={`bg-light text-dark text-sm font-semibold px-3 py-1 rounded-sm`}>
                            {total} صورة في المعرض
                        </span>
                    </div>
                    <p className={`text-base text-dark/70`}>
                        يمكنك إضافة صور جديدة لمعرض الأعمال أو حذف الصور القديمة بسهولة وسرعة فائقة.
                    </p>
                </div>

                <button
                    onClick={openPicker}
                    disabled={uploading}
                    className={`w-full md:w-auto flex items-center justify-center gap-2 bg-dark text-white text-base font-semibold px-6 py-4 rounded-sm shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-default`}
                >
                    <ImagePlus size={20} />
                    <span>
                        {uploading ? `جاري الرفع (${progress.done}/${progress.total})` : `رفع صورة جديدة للمعرض`}
                    </span>
                </button>
            </div>

            <div
                role="button"
                tabIndex={0}
                onClick={openPicker}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`w-full flex flex-col items-center justify-center gap-4 px-4 py-12 md:py-20 text-center rounded-sm cursor-pointer border-2 border-dashed transition-colors ${
                    isDragging ? `bg-neutral border-dark` : `bg-light border-transparent`
                } ${uploading ? `opacity-60` : ``}`}
            >
                <div className={`bg-neutral rounded-[10px] p-4`}>
                    <CloudUpload size={40} className={`text-dark`} />
                </div>
                <div className={`text-md text-dark font-semibold`}>
                    <span className={`md:hidden`}>اضغطي لاختيار الصور من جهازك</span>
                    <span className={`hidden md:inline`}>اسحبي الصور هنا لرفعها مباشرة، أو اضغطي للتصفح</span>
                </div>
                <div className={`text-sm text-dark/70`}>
                    PNG, JPG حتى {MAX_SIZE_MB}MB للصورة الواحدة
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    multiple
                    onChange={handleInputChange}
                    className={`hidden`}
                />
            </div>

            {errors.length > 0 && (
                <div className={`w-full flex flex-col gap-1 bg-neutral border border-red-300 rounded-[10px] p-4 text-sm text-red-700`}>
                    {errors.map((err, i) => (
                        <span key={`${err}-${i}`}>{err}</span>
                    ))}
                </div>
            )}

            <div className={`w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className={`flex flex-wrap items-center gap-4 md:gap-6`}>
                    <button
                        onClick={toggleAll}
                        disabled={images.length === 0}
                        className={`flex items-center gap-3 text-base text-dark cursor-pointer disabled:opacity-40 disabled:cursor-default`}
                    >
                        <Checkbox checked={allSelected} />
                        <span>تحديد كل المعروض</span>
                    </button>

                    {selected.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className={`flex items-center gap-2 bg-light text-red-600 text-sm font-semibold px-4 py-2 rounded-sm cursor-pointer`}
                        >
                            <Trash2 size={16} />
                            <span>حذف المحدد ({selected.size})</span>
                        </button>
                    )}
                </div>

                <div className={`text-sm text-dark/70`}>
                    الصور مرتبة من الأحدث إلى الأقدم
                </div>
            </div>

            {images.length === 0 ? (
                <div className={`w-full py-20 text-center text-base text-dark/70`}>
                    لا توجد صور في المعرض بعد
                </div>
            ) : (
                <div className={`w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 xl:gap-8`}>
                    {images.map((img) => (
                        <GalleryCard
                            key={img._id}
                            image={img}
                            isSelected={selected.has(img._id)}
                            onToggle={() => toggleOne(img._id)}
                            onDelete={() => setPendingDelete([img._id])}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className={`w-full flex flex-wrap items-center justify-center gap-2 pb-10`}>
                    <button
                        onClick={() => changePage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        aria-label="الصفحة السابقة"
                        className={`w-10 h-10 flex items-center justify-center text-dark cursor-pointer disabled:opacity-40 disabled:cursor-default`}
                    >
                        <ChevronRight size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button
                            key={n}
                            onClick={() => changePage(n)}
                            className={`w-10 h-10 rounded-sm text-base font-semibold cursor-pointer ${
                                n === page ? `bg-dark text-white` : `bg-light text-dark/70`
                            }`}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        onClick={() => changePage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        aria-label="الصفحة التالية"
                        className={`w-10 h-10 flex items-center justify-center text-dark cursor-pointer disabled:opacity-40 disabled:cursor-default`}
                    >
                        <ChevronLeft size={18} />
                    </button>
                </div>
            )}

            {undoCount > 0 && (
                <div
                    role="status"
                    className={`fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-auto flex items-center justify-between gap-4 md:gap-6 bg-dark text-white rounded-[10px] shadow-md px-5 md:px-6 py-4`}
                >
                    <span className={`text-base`}>
                        {undoCount === 1 ? `تم حذف الصورة` : `تم حذف ${undoCount} صور`}
                    </span>
                    <button
                        onClick={undoDelete}
                        className={`flex items-center gap-2 text-base font-semibold underline cursor-pointer`}
                    >
                        <Undo2 size={18} />
                        <span>تراجع</span>
                    </button>
                </div>
            )}

            {pendingDelete && (
                <ConfirmDialog
                    count={pendingDelete.length}
                    onConfirm={confirmDelete}
                    onCancel={() => setPendingDelete(null)}
                />
            )}
        </main>
    )
}

function ConfirmDialog({ count, onConfirm, onCancel }) {
    const isSingle = count === 1

    return (
        <div
            onClick={onCancel}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-[420px] flex flex-col items-center gap-5 bg-neutral rounded-sm shadow-md p-8 text-center`}
            >
                <div className={`bg-light rounded-[10px] p-4`}>
                    <Trash2 size={32} className={`text-red-600`} />
                </div>

                <div className={`flex flex-col gap-2`}>
                    <div className={`title text-md`}>
                        {isSingle ? `حذف الصورة` : `حذف ${count} صور`}
                    </div>
                    <p className={`text-base text-dark/70`}>
                        {isSingle
                            ? `هل أنت متأكد من حذف هذه الصورة من المعرض؟`
                            : `هل أنت متأكد من حذف الصور المحددة من المعرض؟`}
                    </p>
                </div>

                <div className={`w-full flex items-center gap-3`}>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 bg-red-600 text-white text-base font-semibold px-4 py-3 rounded-sm cursor-pointer`}
                    >
                        نعم، احذف
                    </button>
                    <button
                        onClick={onCancel}
                        className={`flex-1 bg-light text-dark text-base font-semibold px-4 py-3 rounded-sm cursor-pointer`}
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    )
}

function Checkbox({ checked }) {
    return (
        <span
            className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-sm border ${
                checked ? `bg-dark border-dark text-white` : `bg-neutral border-gray-300`
            }`}
        >
            {checked && <Check size={16} />}
        </span>
    )
}

function GalleryCard({ image, isSelected, onToggle, onDelete }) {
    return (
        <div
            className={`flex flex-col bg-neutral rounded-sm shadow-md overflow-hidden ${
                isSelected ? `ring-2 ring-dark` : ``
            }`}
        >
            <div className={`relative w-full aspect-square`}>
                <img
                    src={image.image}
                    alt="صورة من المعرض"
                    className={`w-full h-full object-cover`}
                />
                <button
                    onClick={onToggle}
                    className={`absolute top-2 right-2 md:top-3 md:right-3 cursor-pointer`}
                    aria-label="تحديد الصورة"
                >
                    <Checkbox checked={isSelected} />
                </button>

                <button
                    onClick={onDelete}
                    className={`absolute top-2 left-2 md:top-3 md:left-3 w-9 h-9 flex items-center justify-center bg-neutral text-red-600 rounded-full shadow-md cursor-pointer`}
                    aria-label="حذف الصورة"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}
