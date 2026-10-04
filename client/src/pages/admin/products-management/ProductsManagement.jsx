import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
    Archive,
    Cake,
    ChevronDown,
    ChevronLeft,
    CirclePlus,
    Grip,
    Heart,
    Pencil,
    Search,
    Shapes,
    SlidersHorizontal,
    Trash2,
    Undo2,
} from "lucide-react"
import { cakeSample } from "@/assets/assets.js"
import { categories } from "@/data/categories.js"

const PAGE_SIZE = 5
const UNDO_MS = 5000 // how long the "undo" toast stays visible
const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.catName]))

const TAB_GAP = 12 // must match `gap-3` on the tabs row

// Page side padding: small on phones, your original px-50 on large screens
const PAGE_PX = `px-4 md:px-8 lg:px-12 xl:px-50`

// Table: a real 5-column grid on desktop (xl+), stacked "cards" on phones and tablets.
// RTL: the first column is on the right.
const HEAD_GRID = `hidden xl:grid xl:grid-cols-[120px_1fr_160px_180px_180px] items-center gap-4`
const ROW_GRID = `grid grid-cols-[80px_1fr] xl:grid-cols-[120px_1fr_160px_180px_180px] items-center gap-4`

const TAB_CLASS = `shrink-0 whitespace-nowrap text-base font-semibold px-5 py-2 rounded-sm cursor-pointer`

const initialProducts = [
    { id: 1, name: "كيك الفراولة الملكي", category: "cakes", details: "قطر 24 سم", serves: "12-14 شخص", price: 32.0, likes: 142, image: cakeSample },
    { id: 2, name: "كيك فانيلا الورد الطبيعي", category: "cakes", details: "طبقات هشة بماء الورد", price: 28.5, likes: 76, image: cakeSample },
    { id: 3, name: "تشيز كيك التوت البري", category: "cheesecakes", details: "مخبوز بطريقة نيويورك", price: 26.0, likes: 210, image: cakeSample },
    { id: 4, name: "سان سباستيان تشيز كيك", category: "cheesecakes", details: "قطر 20 سم", price: 24.0, likes: 188, image: cakeSample },
    { id: 5, name: "كنافة نابلسية", category: "eastern-sweets", details: "صينية 12 قطعة", price: 18.0, likes: 164, image: cakeSample },
    { id: 6, name: "كوكيز الشوكولاتة", category: "cookies-tart", details: "بوكس 6 قطع", price: 9.0, likes: 64, image: cakeSample },
    { id: 7, name: "موس الشوكولاتة البلجيكي", category: "chocolate", details: "شوكولاتة داكنة 70%", price: 35.0, likes: 304, image: cakeSample },
    { id: 8, name: "ترايفل التوت", category: "cold-desserts", details: "كاسات فردية", price: 6.5, likes: 71, image: cakeSample },
    { id: 9, name: "معجنات الجبنة المشكلة", category: "pastries", details: "بوكس 12 قطعة", price: 12.0, likes: 95, image: cakeSample },
    { id: 10, name: "معمول التمر والجوز", category: "eid-sweets", details: "علبة 500 غرام", price: 14.0, likes: 133, image: cakeSample },
    { id: 11, name: "كيك الكراميل المملح", category: "cakes", details: "قطر 24 سم", serves: "10-12 شخص", price: 31.0, likes: 120, image: cakeSample },
    { id: 12, name: "كعك العيد بالسمسم", category: "eid-sweets", details: "علبة 1 كيلو", price: 16.0, likes: 58, image: cakeSample },
]

export default function ProductManagement() {
    const [products, setProducts] = useState(initialProducts)
    const [activeCategory, setActiveCategory] = useState("all")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [counts, setCounts] = useState(() =>
        Object.fromEntries(categories.map((c) => [c.slug, c.catNumber]))
    )

    // Delete confirmation + undo
    const [pendingDelete, setPendingDelete] = useState(null) // product waiting for confirmation
    const undoRef = useRef(null)      // { product, index } of the last deleted product
    const timerRef = useRef(null)
    const [undoName, setUndoName] = useState(null) // only drives the toast (null = hidden)

    // Tabs overflow
    const tabsRef = useRef(null)      // real tabs container (its width is the space we can fill)
    const measureRef = useRef(null)   // hidden row used only to measure every tab's width
    const moreRef = useRef(null)      // "more" button + dropdown (for click-outside)
    const [visibleCount, setVisibleCount] = useState(Infinity)
    const [showMore, setShowMore] = useState(false)

    // Derived data
    const tabs = useMemo(() => {
        const list = categories.map((c) => ({
            slug: c.slug,
            name: c.catName,
            count: counts[c.slug],
        }))
        const total = list.reduce((sum, c) => sum + c.count, 0)
        return [{ slug: "all", name: "الكل", count: total }, ...list]
    }, [counts])

    const stats = useMemo(() => [
        {
            label: "إجمالي الأصناف النشطة",
            value: tabs[0].count,
            unit: "منتج",
            icon: Cake,
        },
        {
            label: "التصنيفات المعتمدة",
            value: categories.length,
            unit: "تصنيفات",
            icon: Grip,
        },
    ], [tabs])

    const filtered = useMemo(() => {
        const q = search.trim()
        return products.filter((p) => {
            const matchCategory = activeCategory === "all" || p.category === activeCategory
            const matchSearch = !q || p.name.includes(q) || categoryNames[p.category].includes(q)
            return matchCategory && matchSearch
        })
    }, [products, activeCategory, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const shownTabs = tabs.slice(0, visibleCount)
    const hiddenTabs = tabs.slice(visibleCount)
    const isActiveHidden = hiddenTabs.some((t) => t.slug === activeCategory)

    // Work out how many tabs fit; the rest go behind the "more" button
    useLayoutEffect(() => {
        const container = tabsRef.current
        const measure = measureRef.current
        if (!container || !measure) return

        const calculate = () => {
            const widths = [...measure.children].map((el) => el.offsetWidth)
            const moreWidth = widths.pop() // last child is a sample "more" button
            const available = container.clientWidth

            const total = widths.reduce((sum, w, i) => sum + w + (i ? TAB_GAP : 0), 0)
            if (total <= available) {
                setVisibleCount(widths.length)
                return
            }

            let used = 0
            let count = 0
            for (let i = 0; i < widths.length; i++) {
                const next = used + widths[i] + TAB_GAP
                if (next + moreWidth > available) break
                used = next
                count++
            }
            setVisibleCount(Math.max(1, count))
        }

        calculate()
        const observer = new ResizeObserver(calculate)
        observer.observe(container)
        return () => observer.disconnect()
    }, [tabs])

    // Close the dropdown when clicking outside
    useEffect(() => {
        if (!showMore) return
        const onClick = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false)
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [showMore])

    // Close the delete dialog with Escape
    useEffect(() => {
        if (!pendingDelete) return
        const onKey = (e) => e.key === "Escape" && setPendingDelete(null)
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [pendingDelete])

    // Stop the undo timer when leaving the page
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
            // TODO: if undoRef.current still has a product here, send its delete request now
        }
    }, [])

    // Handlers
    const handleCategory = (category) => {
        setActiveCategory(category)
        setPage(1)
        setShowMore(false)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    // Step 1: the trash button only asks for confirmation
    const requestDelete = (id) => {
        setPendingDelete(products.find((p) => p.id === id) ?? null)
    }

    // The product leaves the screen immediately, but it is only "really" deleted
    // when the toast expires (finalizeDelete). Until then it can be restored.
    const finalizeDelete = () => {
        clearTimeout(timerRef.current)
        if (!undoRef.current) return

        // TODO: call the delete endpoint with undoRef.current.product.id

        undoRef.current = null
        setUndoName(null)
    }

    // Step 2: the user confirmed
    const handleDelete = (id) => {
        finalizeDelete() // a previous delete that is still waiting becomes final

        const index = products.findIndex((p) => p.id === id)
        if (index === -1) return
        const product = products[index]

        setProducts((prev) => prev.filter((p) => p.id !== id))
        setCounts((prev) => ({
            ...prev,
            [product.category]: Math.max(0, prev[product.category] - 1),
        }))

        undoRef.current = { product, index }
        setUndoName(product.name)
        timerRef.current = setTimeout(finalizeDelete, UNDO_MS)
    }

    const confirmDelete = () => {
        handleDelete(pendingDelete.id)
        setPendingDelete(null)
    }

    const undoDelete = () => {
        const item = undoRef.current
        if (!item) return
        clearTimeout(timerRef.current)

        // Put the product back at its old position
        setProducts((prev) => {
            const next = [...prev]
            next.splice(Math.min(item.index, next.length), 0, item.product)
            return next
        })
        setCounts((prev) => ({
            ...prev,
            [item.product.category]: prev[item.product.category] + 1,
        }))

        undoRef.current = null
        setUndoName(null)
    }

    const handleEdit = (id) => {
        // TODO: open edit modal / navigate to edit page
        console.log("edit product", id)
    }

    return (
        <main className={`w-full min-h-screen flex flex-col items-start gap-6 md:gap-8 ${PAGE_PX} py-6 md:py-10 bg-background`}>
            {/* Header */}
            <div className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral rounded-sm shadow-md p-5 md:p-10`}>
                <div className={`flex flex-col items-start gap-3`}>
                    <div className={`flex items-center gap-2 text-sm text-dark`}>
                        <Archive size={18} />
                        <span>كتالوج المتجر الحصري</span>
                    </div>
                    <div className={`title text-xl`}>
                        إدارة المنتجات والتصنيفات
                    </div>
                    <p className={`text-base text-dark/70`}>
                        التحكم الفوري بقائمة المخبوزات، الأسعار، وتصنيفات كيك سوسن
                    </p>
                </div>

                <div className={`w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4`}>
                    <button
                        className={`flex items-center justify-center gap-2 bg-dark text-white text-base font-semibold px-6 py-4 rounded-sm shadow-md cursor-pointer`}
                    >
                        <CirclePlus size={20} />
                        <span>إضافة منتج جديد</span>
                    </button>
                    <button
                        className={`flex items-center justify-center gap-2 bg-light text-dark text-base font-semibold px-6 py-4 rounded-sm cursor-pointer`}
                    >
                        <Shapes size={20} />
                        <span>إضافة تصنيف جديد</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8`}>
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.label}
                            className={`flex items-center justify-between bg-neutral rounded-sm shadow-md p-5 md:p-8`}
                        >
                            <div className={`flex flex-col items-start gap-3`}>
                                <div className={`text-base text-dark/70`}>
                                    {stat.label}
                                </div>
                                <div className={`text-xl text-dark font-semibold`}>
                                    {stat.value} {stat.unit}
                                </div>
                            </div>
                            <div className={`bg-light rounded-[10px] p-4`}>
                                <Icon size={32} className={`text-dark`} />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Filters */}
            <div className={`w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 bg-neutral rounded-sm shadow-md p-4 md:p-5`}>
                {/* Category tabs (takes all the free space, overflow goes into "more") */}
                <div ref={tabsRef} className={`relative w-full lg:flex-1 min-w-0`}>
                    {/* Hidden row: measures the natural width of every tab + the "more" button */}
                    <div className={`absolute inset-0 overflow-hidden invisible pointer-events-none`} aria-hidden="true">
                        <div ref={measureRef} className={`flex items-center gap-3 w-max`}>
                            {tabs.map((tab) => (
                                <span key={tab.slug} className={`${TAB_CLASS} bg-light`}>
                                    {tab.name} ({tab.count})
                                </span>
                            ))}
                            <span className={`${TAB_CLASS} bg-light flex items-center gap-2`}>
                                المزيد +{tabs.length}
                                <ChevronDown size={16} />
                            </span>
                        </div>
                    </div>

                    {/* Real tabs */}
                    <div className={`flex items-center gap-3`}>
                        {shownTabs.map((tab) => (
                            <button
                                key={tab.slug}
                                onClick={() => handleCategory(tab.slug)}
                                className={`${TAB_CLASS} ${
                                    activeCategory === tab.slug ? `bg-dark text-white` : `bg-light text-dark`
                                }`}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}

                        {/* More button */}
                        {hiddenTabs.length > 0 && (
                            <div ref={moreRef} className={`shrink-0 sm:relative`}>
                                <button
                                    onClick={() => setShowMore((v) => !v)}
                                    className={`${TAB_CLASS} flex items-center gap-2 ${
                                        isActiveHidden ? `bg-dark text-white` : `bg-light text-dark`
                                    }`}
                                >
                                    المزيد +{hiddenTabs.length}
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform ${showMore ? `rotate-180` : ``}`}
                                    />
                                </button>

                                {showMore && (
                                    <div className={`absolute top-full mt-2 right-0 left-0 sm:left-auto z-10 sm:min-w-48 flex flex-col gap-1 bg-neutral border border-gray-300 rounded-[10px] shadow-md p-2`}>
                                        {hiddenTabs.map((tab) => (
                                            <button
                                                key={tab.slug}
                                                onClick={() => handleCategory(tab.slug)}
                                                className={`w-full text-start whitespace-nowrap text-base font-semibold px-4 py-2 rounded-sm cursor-pointer ${
                                                    activeCategory === tab.slug ? `bg-dark text-white` : `text-dark hover:bg-light`
                                                }`}
                                            >
                                                {tab.name} ({tab.count})
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search + manage categories */}
                <div className={`w-full lg:w-auto lg:shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4`}>
                    <button
                        className={`flex items-center justify-center gap-2 bg-light text-dark text-base font-semibold px-4 py-2 rounded-sm cursor-pointer`}
                    >
                        <SlidersHorizontal size={18} />
                        <span>إدارة التصنيفات</span>
                    </button>
                    <div className={`flex items-center gap-2 bg-neutral border border-gray-300 rounded-[10px] px-4 py-2 w-full sm:w-72`}>
                        <Search size={18} className={`text-dark shrink-0`} />
                        <input
                            value={search}
                            onChange={handleSearch}
                            placeholder="تصفية بالاسم أو التصنيف..."
                            className={`w-full bg-transparent outline-none text-base text-dark placeholder:text-dark/50`}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className={`w-full bg-neutral rounded-sm shadow-md overflow-hidden`}>
                {/* Table head */}
                <div className={`${HEAD_GRID} bg-light px-8 py-5 text-base text-dark/70`}>
                    <div>صورة المنتج</div>
                    <div>اسم المنتج والتصنيف</div>
                    <div>السعر</div>
                    <div>عدد الإعجابات</div>
                    <div>الإجراءات</div>
                </div>

                {/* Rows */}
                {visible.length === 0 ? (
                    <div className={`w-full py-20 text-center text-base text-dark/70`}>
                        لا توجد منتجات مطابقة
                    </div>
                ) : (
                    visible.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={requestDelete}
                        />
                    ))
                )}

                {/* Pagination */}
                <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-light px-4 md:px-8 py-5`}>
                    <div className={`text-base text-dark/70 text-center`}>
                        عرض {visible.length} من أصل {filtered.length} منتج مضاف
                    </div>

                    <div className={`flex flex-wrap items-center justify-center gap-2`}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                onClick={() => setPage(n)}
                                className={`w-10 h-10 rounded-sm text-base font-semibold cursor-pointer ${
                                    n === currentPage ? `bg-neutral text-dark shadow-md` : `text-dark/70`
                                }`}
                            >
                                {n}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 flex items-center justify-center text-dark cursor-pointer disabled:opacity-40 disabled:cursor-default`}
                        >
                            <ChevronLeft size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Undo toast */}
            {undoName && (
                <div
                    role="status"
                    className={`fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-auto flex items-center justify-between gap-4 md:gap-6 bg-dark text-white rounded-[10px] shadow-md px-5 md:px-6 py-4`}
                >
                    <span className={`text-base`}>
                        تم حذف «{undoName}»
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

            {/* Delete confirmation */}
            {pendingDelete && (
                <ConfirmDialog
                    name={pendingDelete.name}
                    onConfirm={confirmDelete}
                    onCancel={() => setPendingDelete(null)}
                />
            )}
        </main>
    )
}

function ConfirmDialog({ name, onConfirm, onCancel }) {
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
                        حذف المنتج
                    </div>
                    <p className={`text-base text-dark/70`}>
                        هل أنت متأكد من حذف «{name}» من قائمة المنتجات؟
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

function ProductRow({ product, onEdit, onDelete }) {
    return (
        <div className={`${ROW_GRID} px-4 md:px-8 py-5 border-b border-light`}>
            {/* Image */}
            <img
                src={product.image}
                alt={product.name}
                className={`w-20 h-20 rounded-sm object-cover`}
            />

            {/* Name + category */}
            <div className={`min-w-0 flex flex-col items-start gap-2`}>
                <div className={`text-md text-dark font-semibold`}>
                    {product.name}
                </div>
                <div className={`text-sm text-dark/70`}>
                    {categoryNames[product.category]} • {product.details}
                    {product.serves ? ` • ${product.serves}` : ``}
                </div>
            </div>

            {/* Price, likes, actions: one row on mobile, three grid columns on desktop */}
            <div className={`col-span-2 flex items-center justify-between gap-3 xl:contents`}>
                {/* Price */}
                <div className={`text-md text-dark font-semibold`}>
                    د.أ {product.price.toFixed(2)}
                </div>

                {/* Likes */}
                <div>
                <span className={`inline-flex items-center gap-2 bg-light text-dark text-base font-semibold px-3 py-1 rounded-sm`}>
                    {product.likes}
                    <Heart size={16} />
                </span>
                </div>

                {/* Actions */}
                <div className={`flex items-center gap-3`}>
                    <button
                        onClick={() => onEdit(product.id)}
                        className={`flex items-center gap-2 bg-light text-dark text-sm font-semibold px-3 py-2 rounded-sm cursor-pointer`}
                    >
                        <Pencil size={16} />
                        <span>تعديل</span>
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className={`text-dark cursor-pointer`}
                        aria-label="حذف"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}