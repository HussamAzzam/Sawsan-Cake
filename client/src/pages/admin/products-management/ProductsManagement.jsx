// src/pages/admin/products-management/ProductsManagement.jsx
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
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
    X,
} from "lucide-react"
import { cakeSample } from "@/assets/assets.js"
import { getProducts, deleteProduct } from "@/api/productService.js"
import { getCategories } from "@/api/categoryService.js"
import ProductFormModal from "@/components/ProductFormModal.jsx"
import CategoryFormModal from "@/components/CategoryFormModal.jsx"
import ManageCategoriesModal from "@/components/ManageCategoriesModal.jsx"

const PAGE_SIZE = 5
const UNDO_MS = 5000
const TAB_GAP = 12

const PAGE_PX = `px-4 md:px-8 lg:px-12 xl:px-50`

const HEAD_GRID = `hidden xl:grid xl:grid-cols-[120px_1fr_160px_180px_180px] items-center gap-4`
const ROW_GRID = `grid grid-cols-[80px_1fr] xl:grid-cols-[120px_1fr_160px_180px_180px] items-center gap-4`

const TAB_CLASS = `shrink-0 whitespace-nowrap text-base font-semibold px-5 py-2 rounded-sm cursor-pointer`

const asList = (data, key) => (Array.isArray(data) ? data : data?.[key] || [])
const likesOf = (p) => p.likesCount ?? p.likes ?? 0

export default function ProductsManagement() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(1)
    const [categories, setCategories] = useState([])
    const [categoriesReady, setCategoriesReady] = useState(false)
    const [productsReady, setProductsReady] = useState(false)
    const [loadError, setLoadError] = useState("")
    const [actionError, setActionError] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [page, setPage] = useState(1)
    const [reloadKey, setReloadKey] = useState(0)

    const [productModal, setProductModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [categoryModal, setCategoryModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [manageModal, setManageModal] = useState(false)

    const [pendingDelete, setPendingDelete] = useState(null)
    const undoRef = useRef(null)
    const timerRef = useRef(null)
    const [undoName, setUndoName] = useState(null)

    const tabsRef = useRef(null)
    const measureRef = useRef(null)
    const moreRef = useRef(null)
    const [visibleCount, setVisibleCount] = useState(Infinity)
    const [showMore, setShowMore] = useState(false)

    const loadCategories = useCallback(async () => {
        try {
            const res = await getCategories()
            setCategories(asList(res.data, "categories"))
        } catch (err) {
            setLoadError(err.response?.data?.message || "تعذر تحميل التصنيفات")
        } finally {
            setCategoriesReady(true)
        }
    }, [])

    useEffect(() => {
        loadCategories()
    }, [loadCategories])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim())
            setPage(1)
        }, 400)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        const controller = new AbortController()
        getProducts(
            {
                page,
                limit: PAGE_SIZE,
                category: activeCategory === "all" ? undefined : activeCategory,
                search: debouncedSearch || undefined,
            },
            { signal: controller.signal }
        )
            .then((res) => {
                const list = res.data.products || []
                if (list.length === 0 && page > 1) {
                    setPage(page - 1)
                    return
                }
                setProducts(list)
                setTotal(res.data.total || 0)
                setPages(res.data.pages || 1)
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return
                setActionError(err.response?.data?.message || "تعذر تحميل المنتجات")
            })
            .finally(() => {
                if (!controller.signal.aborted) setProductsReady(true)
            })
        return () => controller.abort()
    }, [page, activeCategory, debouncedSearch, reloadKey])

    const loading = !(categoriesReady && productsReady)

    const categoryById = useMemo(
        () => Object.fromEntries(categories.map((c) => [c._id, c])),
        [categories]
    )

    const countsById = useMemo(
        () => Object.fromEntries(categories.map((c) => [c._id, c.productsCount || 0])),
        [categories]
    )

    const allCount = useMemo(
        () => categories.reduce((sum, c) => sum + (c.productsCount || 0), 0),
        [categories]
    )

    const tabs = useMemo(
        () => [
            { slug: "all", name: "الكل", count: allCount },
            ...categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productsCount || 0 })),
        ],
        [categories, allCount]
    )

    const stats = useMemo(() => [
        {
            label: "إجمالي الأصناف النشطة",
            value: allCount,
            unit: "منتج",
            icon: Cake,
        },
        {
            label: "التصنيفات المعتمدة",
            value: categories.length,
            unit: "تصنيفات",
            icon: Grip,
        },
    ], [allCount, categories.length])

    const categoryNameOf = (p) => p.category?.name || categoryById[p.category]?.name || ""
    const categoryIdOf = (p) => p.category?._id || p.category

    const adjustCount = (categoryId, delta) =>
        setCategories((prev) =>
            prev.map((c) =>
                c._id === categoryId
                    ? { ...c, productsCount: Math.max(0, (c.productsCount || 0) + delta) }
                    : c
            )
        )

    const totalPages = Math.max(1, pages)
    const currentPage = Math.min(page, totalPages)
    const visible = products

    const shownTabs = tabs.slice(0, visibleCount)
    const hiddenTabs = tabs.slice(visibleCount)
    const isActiveHidden = hiddenTabs.some((t) => t.slug === activeCategory)

    useLayoutEffect(() => {
        const container = tabsRef.current
        const measure = measureRef.current
        if (!container || !measure) return

        const calculate = () => {
            const widths = [...measure.children].map((el) => el.offsetWidth)
            const moreWidth = widths.pop()
            const available = container.clientWidth

            const totalWidth = widths.reduce((sum, w, i) => sum + w + (i ? TAB_GAP : 0), 0)
            if (totalWidth <= available) {
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
    }, [tabs, loading])

    useEffect(() => {
        if (!showMore) return
        const onClick = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false)
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [showMore])

    useEffect(() => {
        if (!pendingDelete) return
        const onKey = (e) => e.key === "Escape" && setPendingDelete(null)
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [pendingDelete])

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
            if (undoRef.current) {
                deleteProduct(undoRef.current.product._id).catch(() => {})
            }
        }
    }, [])

    const refreshAll = () => {
        setReloadKey((k) => k + 1)
        loadCategories()
    }

    const handleCategory = (slug) => {
        setActiveCategory(slug)
        setPage(1)
        setShowMore(false)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const openAddProduct = () => {
        setEditingProduct(null)
        setProductModal(true)
    }

    const openEditProduct = (product) => {
        setEditingProduct(product)
        setProductModal(true)
    }

    const handleProductSaved = (saved, isEdit) => {
        if (!isEdit) setPage(1)
        refreshAll()
    }

    const openAddCategory = () => {
        setEditingCategory(null)
        setCategoryModal(true)
    }

    const openEditCategory = (category) => {
        setEditingCategory(category)
        setCategoryModal(true)
    }

    const handleCategorySaved = () => {
        setActiveCategory("all")
        setPage(1)
        refreshAll()
    }

    const handleCategoryDeleted = () => {
        setActiveCategory("all")
        setPage(1)
        refreshAll()
    }

    const requestDelete = (product) => {
        setPendingDelete(product)
    }

    const restoreProduct = (item) => {
        setProducts((prev) => {
            const next = [...prev]
            next.splice(Math.min(item.index, next.length), 0, item.product)
            return next
        })
        setTotal((t) => t + 1)
        adjustCount(categoryIdOf(item.product), 1)
    }

    const finalizeDelete = () => {
        clearTimeout(timerRef.current)
        const item = undoRef.current
        if (!item) return
        undoRef.current = null
        setUndoName(null)

        deleteProduct(item.product._id)
            .then(() => setReloadKey((k) => k + 1))
            .catch((err) => {
                restoreProduct(item)
                setActionError(err.response?.data?.message || "تعذر حذف المنتج")
            })
    }

    const handleDelete = (id) => {
        finalizeDelete()
        setActionError("")

        const index = products.findIndex((p) => p._id === id)
        if (index === -1) return
        const product = products[index]

        setProducts((prev) => prev.filter((p) => p._id !== id))
        setTotal((t) => Math.max(0, t - 1))
        adjustCount(categoryIdOf(product), -1)

        undoRef.current = { product, index }
        setUndoName(product.name)
        timerRef.current = setTimeout(finalizeDelete, UNDO_MS)
    }

    const confirmDelete = () => {
        handleDelete(pendingDelete._id)
        setPendingDelete(null)
    }

    const undoDelete = () => {
        const item = undoRef.current
        if (!item) return
        clearTimeout(timerRef.current)
        restoreProduct(item)
        undoRef.current = null
        setUndoName(null)
    }

    if (loading) {
        return (
            <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
                <p className={`text-base text-dark/70`}>جاري التحميل...</p>
            </main>
        )
    }

    if (loadError) {
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
                        onClick={openAddProduct}
                        className={`flex items-center justify-center gap-2 bg-dark text-white text-base font-semibold px-6 py-4 rounded-sm shadow-md cursor-pointer`}
                    >
                        <CirclePlus size={20} />
                        <span>إضافة منتج جديد</span>
                    </button>
                    <button
                        onClick={openAddCategory}
                        className={`flex items-center justify-center gap-2 bg-light text-dark text-base font-semibold px-6 py-4 rounded-sm cursor-pointer`}
                    >
                        <Shapes size={20} />
                        <span>إضافة تصنيف جديد</span>
                    </button>
                </div>
            </div>

            {actionError && (
                <div className={`w-full flex items-center justify-between gap-4 bg-neutral border border-red-600 rounded-sm px-5 py-3`}>
                    <span className={`text-base text-red-600`}>{actionError}</span>
                    <button onClick={() => setActionError("")} aria-label="إغلاق" className={`text-red-600 cursor-pointer`}>
                        <X size={18} />
                    </button>
                </div>
            )}

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

            <div className={`w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 bg-neutral rounded-sm shadow-md p-4 md:p-5`}>
                <div ref={tabsRef} className={`relative w-full lg:flex-1 min-w-0`}>
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

                <div className={`w-full lg:w-auto lg:shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4`}>
                    <button
                        onClick={() => setManageModal(true)}
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
                            placeholder="تصفية بالاسم أو الوصف..."
                            className={`w-full bg-transparent outline-none text-base text-dark placeholder:text-dark/50`}
                        />
                    </div>
                </div>
            </div>

            <div className={`w-full bg-neutral rounded-sm shadow-md overflow-hidden`}>
                <div className={`${HEAD_GRID} bg-light px-8 py-5 text-base text-dark/70`}>
                    <div>صورة المنتج</div>
                    <div>اسم المنتج والتصنيف</div>
                    <div>السعر</div>
                    <div>عدد الإعجابات</div>
                    <div>الإجراءات</div>
                </div>

                {visible.length === 0 ? (
                    <div className={`w-full py-20 text-center text-base text-dark/70`}>
                        لا توجد منتجات مطابقة
                    </div>
                ) : (
                    visible.map((product) => (
                        <ProductRow
                            key={product._id}
                            product={product}
                            categoryName={categoryNameOf(product)}
                            onEdit={openEditProduct}
                            onDelete={requestDelete}
                        />
                    ))
                )}

                <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-light px-4 md:px-8 py-5`}>
                    <div className={`text-base text-dark/70 text-center`}>
                        عرض {visible.length} من أصل {total} منتج مضاف
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

            {pendingDelete && (
                <ConfirmDialog
                    name={pendingDelete.name}
                    onConfirm={confirmDelete}
                    onCancel={() => setPendingDelete(null)}
                />
            )}

            <ProductFormModal
                open={productModal}
                onClose={() => setProductModal(false)}
                product={editingProduct}
                categories={categories}
                onSaved={handleProductSaved}
            />

            <CategoryFormModal
                open={categoryModal}
                onClose={() => setCategoryModal(false)}
                category={editingCategory}
                onSaved={handleCategorySaved}
            />

            <ManageCategoriesModal
                open={manageModal}
                onClose={() => setManageModal(false)}
                categories={categories}
                counts={countsById}
                onEdit={(c) => {
                    setManageModal(false)
                    openEditCategory(c)
                }}
                onDeleted={handleCategoryDeleted}
            />
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

function ProductRow({ product, categoryName, onEdit, onDelete }) {
    const options = product.priceOptions || []
    const minPrice = options.length ? Math.min(...options.map((o) => o.value)) : null

    return (
        <div className={`${ROW_GRID} px-4 md:px-8 py-5 border-b border-light`}>
            <img
                src={product.image || cakeSample}
                alt={product.name}
                className={`w-20 h-20 rounded-sm object-cover`}
            />

            <div className={`min-w-0 flex flex-col items-start gap-2`}>
                <div className={`text-md text-dark font-semibold`}>
                    {product.name}
                </div>
                <div className={`text-sm text-dark/70`}>
                    {categoryName}
                    {product.subcategory ? ` • ${product.subcategory}` : ``}
                    {options.length > 1 ? ` • ${options.length} خيارات` : ``}
                </div>
            </div>

            <div className={`col-span-2 flex items-center justify-between gap-3 xl:contents`}>
                <div className={`text-md text-dark font-semibold`}>
                    {minPrice === null
                        ? `—`
                        : `${options.length > 1 ? `من ` : ``}د.أ ${Number(minPrice).toFixed(2)}`}
                </div>

                <div>
                    <span className={`inline-flex items-center gap-2 bg-light text-dark text-base font-semibold px-3 py-1 rounded-sm`}>
                        {likesOf(product)}
                        <Heart size={16} />
                    </span>
                </div>

                <div className={`flex items-center gap-3`}>
                    <button
                        onClick={() => onEdit(product)}
                        className={`flex items-center gap-2 bg-light text-dark text-sm font-semibold px-3 py-2 rounded-sm cursor-pointer`}
                    >
                        <Pencil size={16} />
                        <span>تعديل</span>
                    </button>
                    <button
                        onClick={() => onDelete(product)}
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
