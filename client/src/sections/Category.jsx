// src/pages/user/home/Categories.jsx
import { useEffect, useState } from "react"
import CategoryCard from "@/components/CategoryCard.jsx"
import { getCategories } from "@/api/categoryService.js"

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const controller = new AbortController()
        getCategories(undefined, { signal: controller.signal })
            .then((res) => {
                const data = res.data
                const list = Array.isArray(data) ? data : data?.categories || []

                const sortedList = [...list].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                )
                setCategories(sortedList)
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return
                setError(err.response?.data?.message || "تعذر تحميل الأقسام")
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })
        return () => controller.abort()
    }, [])

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-start gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 text-center sm:gap-5">
                <div className={`tagline`}>
                    تصفح تشكيلتنا اللذيذة
                </div>
                <div className={`title`}>
                    الاقسام
                </div>
                <div className="description max-w-2xl">
                    استكشف مجموعتنا الواسعة من الأصناف الفاخرة وجد طلبك المثالي لمناسبتك
                </div>
            </div>

            {loading ? (
                <p className={`text-base text-gray-500 py-10`}>جاري التحميل...</p>
            ) : error ? (
                <p className={`text-base text-gray-500 py-10`}>{error}</p>
            ) : categories.length === 0 ? (
                <p className={`text-base text-gray-500 py-10`}>لا توجد أقسام حالياً</p>
            ) : (
                <div className="grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            catName={category.name}
                            catNumber={category.productsCount || 0}
                            catImage={category.image}
                            catHref={`/category/${category.slug}`}
                            catAlt={category.imageAlt || category.name}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Categories
