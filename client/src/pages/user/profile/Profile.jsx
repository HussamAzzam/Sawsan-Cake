// src/pages/user/profile/ProfilePage.jsx
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Heart, LogOut, Mail } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getLikedProducts, toggleLike } from "@/api/productService.js"
import UserAvatar from "@/components/UserAvatar.jsx"

const PAGE_SIZE = 12

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState("")
    const [busyId, setBusyId] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        if (page > 1) setLoadingMore(true)

        getLikedProducts({ page, limit: PAGE_SIZE }, { signal: controller.signal })
            .then((res) => {
                const list = res.data.products || []
                setProducts((prev) =>
                    page === 1 ? list : [...prev, ...list.filter((p) => !prev.some((x) => x._id === p._id))]
                )
                setTotal(res.data.total || 0)
                setError("")
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return
                setError(err.response?.data?.message || "تعذر تحميل المنتجات المفضلة")
            })
            .finally(() => {
                if (controller.signal.aborted) return
                setLoading(false)
                setLoadingMore(false)
            })

        return () => controller.abort()
    }, [page])

    const handleUnlike = async (id) => {
        if (busyId) return
        setBusyId(id)
        try {
            await toggleLike(id)
            setProducts((prev) => prev.filter((p) => p._id !== id))
            setTotal((t) => Math.max(0, t - 1))
        } catch (err) {
            setError(err.response?.data?.message || "تعذر إزالة المنتج من المفضلة")
        } finally {
            setBusyId(null)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate("/", { replace: true })
    }

    const hasMore = products.length < total

    return (
        <main dir="rtl" className="w-full min-h-screen flex flex-col items-start gap-8 bg-background font-body px-4 md:px-8 lg:px-12 xl:px-50 pt-28 pb-16">
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 bg-neutral rounded-sm shadow-md p-6 md:p-10">
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
                    <UserAvatar user={user} size="w-24 h-24" textSize="text-3xl" />
                    <div className="flex flex-col items-center sm:items-start gap-2 min-w-0">
                        <div className="title text-xl">{user.name}</div>
                        <div className="flex items-center gap-2 text-base text-dark/70 break-all">
                            <Mail size={18} className="shrink-0" />
                            <span dir="ltr">{user.email}</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-light text-dark text-base font-semibold px-5 py-3 rounded-sm cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>تسجيل الخروج</span>
                </button>
            </div>

            <div className="w-full flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Heart size={24} className="text-dark" />
                    <div className="title text-md">المنتجات المفضلة</div>
                </div>
                <span className="bg-light text-dark text-sm font-semibold px-3 py-1 rounded-full">
                    {total} منتج
                </span>
            </div>

            {error && (
                <div className="w-full bg-neutral border border-red-300 rounded-[10px] p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="w-full py-20 text-center text-base text-dark/70">جاري التحميل...</p>
            ) : products.length === 0 ? (
                <div className="w-full flex flex-col items-center gap-4 py-16 text-center bg-neutral rounded-sm shadow-md">
                    <div className="bg-light rounded-[10px] p-4">
                        <Heart size={32} className="text-dark" />
                    </div>
                    <p className="text-base text-dark/70">لم تضف أي منتج إلى المفضلة بعد</p>
                    <Link to="/menu" className="btn">تصفح القائمة</Link>
                </div>
            ) : (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 xl:gap-8">
                    {products.map((product) => (
                        <LikedCard
                            key={product._id}
                            product={product}
                            busy={busyId === product._id}
                            onUnlike={() => handleUnlike(product._id)}
                        />
                    ))}
                </div>
            )}

            {hasMore && !loading && (
                <div className="w-full flex justify-center">
                    <button
                        type="button"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={loadingMore}
                        className="bg-dark text-white text-base font-semibold px-8 py-3 rounded-sm cursor-pointer disabled:opacity-50"
                    >
                        {loadingMore ? "جاري التحميل..." : "عرض المزيد"}
                    </button>
                </div>
            )}
        </main>
    )
}

function LikedCard({ product, busy, onUnlike }) {
    const options = product.priceOptions || []
    const minPrice = options.length ? Math.min(...options.map((o) => o.value)) : null
    const slug = product.category?.slug

    return (
        <div className="flex flex-col bg-neutral rounded-sm shadow-md overflow-hidden">
            <div className="relative w-full aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button
                    type="button"
                    onClick={onUnlike}
                    disabled={busy}
                    aria-label="إزالة من المفضلة"
                    className="absolute top-2 left-2 md:top-3 md:left-3 w-9 h-9 flex items-center justify-center bg-neutral text-red-600 rounded-full shadow-md cursor-pointer disabled:opacity-50"
                >
                    <Heart size={18} fill="currentColor" />
                </button>
            </div>

            <div className="flex flex-col items-start gap-1 p-3 md:p-4">
                <div className="text-base text-dark font-semibold">{product.name}</div>
                {product.category?.name && (
                    slug ? (
                        <Link to={`/category/${slug}`} className="text-sm text-dark/70 hover:underline">
                            {product.category.name}
                        </Link>
                    ) : (
                        <span className="text-sm text-dark/70">{product.category.name}</span>
                    )
                )}
                {minPrice !== null && (
                    <div className="text-base text-dark font-semibold">
                        {options.length > 1 ? "من " : ""}د.أ {Number(minPrice).toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    )
}
