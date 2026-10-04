import { useEffect, useState } from "react"
import { Cake, Grip, Heart, Image, Info } from "lucide-react"
import { cakeSample } from "@/assets/assets.js"
import { categories } from "@/data/categories.js"
import FavProduct from "@/components/FavProduct.jsx"

// Mock data (sorted by likes)
const favProducts = [
    { name: "كيك الفراولة الملكي", category: "قوالب الكيك", image: cakeSample, likes: 854 },
    { name: "كب كيك التوت المشكل", category: "كوكيز وتارت", image: cakeSample, likes: 642 },
    { name: "كيك الشوكولاتة والكراميل", category: "شوكلاتة", image: cakeSample, likes: 519 },
    { name: "سان سباستيان تشيز كيك", category: "قوالب تشيز كيك", image: cakeSample, likes: 480 },
    { name: "بوكس السعادة ميني كيك", category: "حلويات العيد", image: cakeSample, likes: 395 },
]

const GALLERY_IMAGES = 32

// Page side padding: small on phones, your original px-50 on large screens
const PAGE_PX = `px-4 md:px-8 lg:px-12 xl:px-50`

// Derived from the categories data, so it always matches the rest of the app
const totalProducts = categories.reduce((sum, c) => sum + c.catNumber, 0)

const distribution = [...categories]
    .sort((a, b) => b.catNumber - a.catNumber)
    .slice(0, 5)
    .map((c) => ({ name: c.catName, count: c.catNumber }))

const topProduct = favProducts[0]

const stats = [
    {
        label: "إجمالي المنتجات",
        value: totalProducts,
        badge: "+3 هذا الشهر",
        hint: "منتجات معروضة للطلب",
        icon: Cake,
    },
    {
        label: "عدد التصنيفات",
        value: categories.length,
        badge: "أقسام نشطة",
        hint: categories.slice(0, 3).map((c) => c.catName).join("، ") + "...",
        icon: Grip,
    },
    {
        label: "الأكثر إعجاباً",
        value: topProduct.name,
        isText: true,
        badge: `${topProduct.likes} إعجاب`,
        hint: "من إجمالي تفاعل الزوار",
        icon: Heart,
    },
    {
        label: "صور المعرض النشطة",
        value: GALLERY_IMAGES,
        badge: "بجودة عالية",
        hint: "تظهر في واجهة المتجر",
        icon: Image,
    },
]

export default function Dashboard() {

    // Makes the distribution bars grow from 0 when the page opens
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    return (
        <main className={`w-full min-h-screen flex flex-col items-start gap-6 md:gap-10 bg-background`}>
            {/* Header */}
            <div className={`w-full flex flex-col items-start gap-2 ${PAGE_PX} pt-6 md:pt-10`}>
                <div className={`title`}>
                    اللوحة الرئيسية
                </div>
                <p className={`text-base text-dark/70`}>
                    نظرة سريعة على أداء متجر كيك سوسن ومحتواه
                </p>
            </div>

            {/* Stats */}
            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 ${PAGE_PX}`}>
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </div>

            {/* Bottom section */}
            <div className={`w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 ${PAGE_PX} pb-10`}>
                {/* Most favorite products */}
                <div className={`w-full lg:w-[65%] bg-neutral rounded-sm shadow-md flex flex-col items-start gap-6 md:gap-8 p-5 md:p-10`}>
                    {/* Header */}
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

                    {/* Products container */}
                    <div className={`w-full flex flex-col items-start gap-5`}>
                        {favProducts.map((product, index) => (
                            <FavProduct
                                key={product.name}
                                order={index + 1}
                                name={product.name}
                                category={product.category}
                                image={product.image}
                                likes={product.likes}
                            />
                        ))}
                    </div>
                </div>

                {/* Products distribution */}
                <div className={`w-full lg:w-[35%] bg-neutral rounded-sm shadow-md flex flex-col items-start gap-6 p-5 md:p-8`}>
                    {/* Header */}
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

                    {/* Bars */}
                    <div className={`w-full flex flex-col gap-6`}>
                        {distribution.map((item, index) => {
                            const percent = ((item.count / totalProducts) * 100).toFixed(1)
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

                    {/* Note (pushed to the bottom so both cards end together) */}
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
            {/* Label + icon */}
            <div className={`w-full flex items-center justify-between gap-4`}>
                <div className={`text-md font-semibold text-dark/70`}>
                    {stat.label}
                </div>
                <div className={`bg-light rounded-[10px] p-3 shrink-0`}>
                    <Icon size={32} className={`text-dark`} />
                </div>
            </div>

            {/* Value */}
            <div
                className={`text-dark font-semibold truncate ${
                    stat.isText ? `text-lg` : `text-xl`
                }`}
            >
                {stat.value}
            </div>

            {/* Badge + hint */}
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