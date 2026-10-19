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
                setCategories(Array.isArray(data) ? data : data?.categories || [])
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
        <section className={`section flex-col items-center justify-center gap-10`}>
            <div className={`flex flex-col items-center justify-center gap-5`}>
                <div className={`tagline`}>
                    تصفح تشكيلتنا اللذيذة
                </div>
                <div className={`title`}>
                    الاقسام
                </div>
                <div className={`description`}>
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
                <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center`}>
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
