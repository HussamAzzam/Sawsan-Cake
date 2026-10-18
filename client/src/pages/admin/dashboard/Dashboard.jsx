// src/pages/admin/dashboard/Dashboard.jsx
import { useEffect, useState } from "react"
import { Cake, Grip, Heart, Image, Info } from "lucide-react"
import { cakeSample } from "@/assets/assets.js"
import FavProduct from "@/components/FavProduct.jsx"
import { getProducts } from "@/api/productService.js"
import { getCategories } from "@/api/categoryService.js"
import { getGalleryImages } from "@/api/galleryService.js"

const PAGE_PX = `px-4 md:px-8 lg:px-12 xl:px-50`

const asList = (data, key) => (Array.isArray(data) ? data : data?.[key] || [])

export default function Dashboard() {
    const [popular, setPopular] = useState([])
    const [recent, setRecent] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [galleryTotal, setGalleryTotal] = useState(0)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const config = { signal: controller.signal }

        const load = async () => {
            try {
                const [popularRes, recentRes, categoriesRes, galleryRes] = await Promise.all([
                    getProducts({ sort: "popular", limit: 5 }, config),
                    getProducts({ limit: 100 }, config),
                    getCategories(undefined, config),
                    getGalleryImages({ limit: 1 }, config).catch((err) => {
                        if (err.code === "ERR_CANCELED") throw err
                        return null
                    }),
                ])
                setPopular(popularRes.data.products || [])
                setTotalProducts(popularRes.data.total || 0)
                setRecent(recentRes.data.products || [])
                setCategories(asList(categoriesRes.data, "categories"))
                setGalleryTotal(galleryRes?.data?.total || 0)
            } catch (err) {
                if (err.code === "ERR_CANCELED") return
                setError(err.response?.data?.message || "تعذر تحميل بيانات اللوحة")
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [])

    useEffect(() => {
        if (loading) return
        const frame = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(frame)
    }, [loading])

    if (loading) {
        return (
            <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
                <p className={`text-base text-dark/70`}>جاري التحميل...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className={`w-full min-h-screen flex items-center justify-center bg-background`}>
                <p className={`text-base text-dark`}>{error}</p>
            </main>
        )
    }

    const favProducts = popular.map((p) => ({
        id: p._id,
        name: p.name,
        category: p.category?.name || "",
        image: p.image || cakeSample,
        likes: p.likesCount ?? 0,
    }))

    const distribution = categories
        .map((c) => ({ name: c.name, count: c.productsCount || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

    const topProduct = favProducts[0]

    const now = new Date()
    const addedThisMonth = recent.filter((p) => {
        if (!p.createdAt) return false
        const d = new Date(p.createdAt)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    const stats = [
        {
            label: "إجمالي المنتجات",
            value: totalProducts,
            badge: `+${addedThisMonth} هذا الشهر`,
            hint: "منتجات معروضة للطلب",
            icon: Cake,
        },
        {
            label: "عدد التصنيفات",
            value: categories.length,
            badge: "أقسام نشطة",
            hint: categories.length ? categories.slice(0, 3).map((c) => c.name).join("، ") + "..." : "لا توجد أقسام",
            icon: Grip,
        },
        {
            label: "الأكثر إعجاباً",
            value: topProduct ? topProduct.name : "—",
            isText: true,
            badge: `${topProduct ? topProduct.likes : 0} إعجاب`,
            hint: "من إجمالي تفاعل الزوار",
            icon: Heart,
        },
        {
            label: "صور المعرض النشطة",
            value: galleryTotal,
            badge: "بجودة عالية",
            hint: "تظهر في واجهة المتجر",
            icon: Image,
        },
    ]

    return (
        <main className={`w-full min-h-screen flex flex-col items-start gap-6 md:gap-10 bg-background`}>
            <div className={`w-full flex flex-col items-start gap-2 ${PAGE_PX} pt-6 md:pt-10`}>
                <div className={`title`}>
                    اللوحة الرئيسية
                </div>
                <p className={`text-base text-dark/70`}>
                    نظرة سريعة على أداء متجر كيك سوسن ومحتواه
                </p>
            </div>

            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 ${PAGE_PX}`}>
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </div>

            <div className={`w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 ${PAGE_PX} pb-10`}>
                <div className={`w-full lg:w-[65%] bg-neutral rounded-sm shadow-md flex flex-col items-start gap-6 md:gap-8 p-5 md:p-10`}>
                    <div className={`w-full flex flex-wrap items-center justify-between gap-3`}>
                        <div className={`flex items-center gap-3`}>
                            <Heart size={24} className={`text-dark`} />
                            <div className={`title text-md`}>
                                أكثر المنتجات تفاعلاً وإعجاباً
                            </div>
                        </div>
                        <div className={`bg-light text-dark text-sm font-semibold px-3 py-1 rounded-full`}>
                            مرتبة حسب عدد القلوب
                        </div>
                    </div>

                    <div className={`w-full flex flex-col items-start gap-5`}>
                        {favProducts.length === 0 && (
                            <p className={`text-base text-dark/70`}>لا توجد منتجات بعد</p>
                        )}
                        {favProducts.map((product, index) => (
                            <FavProduct
                                key={product.id}
                                order={index + 1}
                                name={product.name}
                                category={product.category}
                                image={product.image}
                                likes={product.likes}
                            />
                        ))}
                    </div>
                </div>

                <div className={`w-full lg:w-[35%] bg-neutral rounded-sm shadow-md flex flex-col items-start gap-6 p-5 md:p-8`}>
                    <div className={`w-full flex items-center justify-between`}>
                        <div className={`title text-md`}>
                            توزيع المنتجات
                        </div>
                        <div className={`bg-light text-dark text-sm font-semibold px-3 py-1 rounded-full`}>
                            {totalProducts} صنفاً
                        </div>
                    </div>

                    <p className={`text-base text-dark/70`}>
                        نسبة المنتجات المفعلة في أكبر خمسة أقسام
                    </p>

                    <div className={`w-full flex flex-col gap-6`}>
                        {distribution.map((item, index) => {
                            const percent = totalProducts
                                ? ((item.count / totalProducts) * 100).toFixed(1)
                                : "0.0"
                            return (
                                <div key={item.name} className={`w-full flex flex-col gap-2`}>
                                    <div className={`w-full flex items-center justify-between text-base`}>
                                        <span className={`text-dark`}>{item.name}</span>
                                        <span className={`font-semibold text-dark`}>
                                            {item.count} منتج ({percent}%)
                                        </span>
                                    </div>
                                    <div className={`w-full h-2.5 bg-light rounded-full overflow-hidden`}>
                                        <div
                                            className={`h-full rounded-full bg-dark transition-all duration-700 ease-out`}
                                            style={{
                                                width: mounted ? `${percent}%` : `0%`,
                                                transitionDelay: `${index * 80}ms`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={`w-full mt-auto flex items-center gap-3 text-base text-dark`}>
                        <Info size={20} className={`shrink-0`} />
                        <span>جميع الأقسام نشطة وتظهر بوضوح في قائمة تصفح الزبائن.</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

function StatCard({ stat }) {
    const Icon = stat.icon

    return (
        <div
            className={`flex flex-col justify-between gap-6 bg-neutral rounded-sm shadow-md p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
            <div className={`w-full flex items-center justify-between gap-4`}>
                <div className={`text-md font-semibold text-dark/70`}>
                    {stat.label}
                </div>
                <div className={`bg-light rounded-[10px] p-3 shrink-0`}>
                    <Icon size={32} className={`text-dark`} />
                </div>
            </div>

            <div
                className={`text-dark font-semibold truncate ${
                    stat.isText ? `text-lg` : `text-xl`
                }`}
            >
                {stat.value}
            </div>

            <div className={`w-full flex flex-col items-start gap-2`}>
                <span className={`bg-light text-dark text-sm font-semibold px-3 py-1 rounded-full`}>
                    {stat.badge}
                </span>
                <span className={`text-sm text-dark/70 truncate max-w-full`}>
                    {stat.hint}
                </span>
            </div>
        </div>
    )
}
