import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug } from "@/api/categoryService";
import { getProducts } from "@/api/productService";

const PAGE_SIZE = 12;
const SEARCH_DELAY = 400;
const ALL = { label: "الكل", value: "all" };

const CategoryProducts = ({ slug }) => {
    // category: "loading" | "ready" | "notFound" | "failed"
    const [category, setCategory] = useState(null);
    const [categoryStatus, setCategoryStatus] = useState("loading");

    // products: "loading" | "ready" | "failed"
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [productsStatus, setProductsStatus] = useState("loading");

    // what the user types vs. what is actually sent to the API
    const [searchInput, setSearchInput] = useState("");
    const [filters, setFilters] = useState({
        subcategory: "all",
        sort: "price_asc",
        search: "",
        page: 1,
    });

    // Debounce the search box. Returning `prev` when nothing changed
    // avoids a re-render (and a duplicate request) on first mount.
    useEffect(() => {
        const timer = setTimeout(() => {
            const search = searchInput.trim();
            setFilters((prev) => (prev.search === search ? prev : { ...prev, search, page: 1 }));
        }, SEARCH_DELAY);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Category (the products request doesn't depend on it, so both run in parallel)
    useEffect(() => {
        const controller = new AbortController();

        getCategoryBySlug(slug, { signal: controller.signal })
            .then((res) => {
                setCategory(res.data);
                setCategoryStatus("ready");
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return;
                setCategoryStatus(err.response?.status === 404 ? "notFound" : "failed");
            });

        return () => controller.abort();
    }, [slug]);

    // Products
    useEffect(() => {
        const controller = new AbortController();

        setProductsStatus("loading");

        const params = {
            category: slug,
            page: filters.page,
            limit: PAGE_SIZE,
            sort: filters.sort,
        };
        if (filters.subcategory !== "all") params.subcategory = filters.subcategory;
        if (filters.search) params.search = filters.search;

        getProducts(params, { signal: controller.signal })
            .then((res) => {
                setProducts(res.data.products);
                setTotal(res.data.total);
                setPages(res.data.pages);
                setProductsStatus("ready");
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return;
                setProducts([]);
                setTotal(0);
                setPages(0);
                setProductsStatus("failed");
            });

        return () => controller.abort();
    }, [slug, filters]);

    // Any filter change goes back to page 1
    const changeFilter = (patch) => setFilters((prev) => ({ ...prev, ...patch, page: 1 }));

    const goToPage = (page) => {
        setFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (categoryStatus === "loading") {
        return (
            <main className="min-h-screen w-full py-nav flex items-center justify-center">
                <p className="text-gray-500">جاري التحميل...</p>
            </main>
        );
    }

    if (categoryStatus !== "ready") {
        return (
            <main className="min-h-screen w-full py-nav flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-500">
                    {categoryStatus === "notFound" ? "القسم غير موجود" : "حدث خطأ، حاول مرة أخرى"}
                </p>
            </main>
        );
    }

    const subcategories = [ALL, ...category.subcategories.map((s) => ({ label: s, value: s }))];
    const isLoading = productsStatus === "loading";

    return (
        <main className="min-h-screen w-full py-nav flex flex-col items-center justify-start">
            <div className="w-[80%] flex items-start py-nav gap-10">
                {/* Right Panel */}
                <div className="w-[20%] flex flex-col items-start p-5 bg-neutral rounded-sm shadow-md gap-10">
                    {/* Search bar */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="البحث"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full rounded-[10px] bg-gray py-2 px-3 text-gray-900 font-medium"
                        />
                        <Search
                            size={20}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                    </div>

                    {/* Subcategories */}
                    <div className="w-full flex flex-col gap-5">
                        <div className="title text-md">الأقسام</div>
                        <div className="w-full flex flex-col items-start justify-start gap-5 pr-5">
                            {subcategories.map((sub) => (
                                <label
                                    key={sub.value}
                                    className="flex items-center justify-start gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="subcategory"
                                        value={sub.value}
                                        checked={filters.subcategory === sub.value}
                                        onChange={() => changeFilter({ subcategory: sub.value })}
                                        className="accent-primary"
                                    />
                                    <div className="text-base font-semibold opacity-60">{sub.label}</div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort Input */}
                    <div className="relative w-full">
                        <select
                            value={filters.sort}
                            onChange={(e) => changeFilter({ sort: e.target.value })}
                            className="w-full appearance-none bg-gray rounded-[10px] py-3 px-3 text-gray-900 font-medium cursor-pointer"
                        >
                            <option value="price_asc">من الأرخص للأغلى</option>
                            <option value="price_desc">من الأغلى للأرخص</option>
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>
                </div>

                {/* Products Container */}
                <div className="w-[80%] flex flex-col gap-10">
                    {/* Header */}
                    <div className="w-full flex items-end justify-between">
                        <div className="title">{category.name}</div>
                        <div className="text-sm text-gray-500 font-bold">
                            عدد المنتجات : {isLoading && products.length === 0 ? "..." : total}
                        </div>
                    </div>

                    {/* Products wrapper */}
                    {productsStatus === "failed" ? (
                        <div className="w-full flex items-center justify-center py-20">
                            <p className="text-lg font-semibold text-gray-500">حدث خطأ، حاول مرة أخرى</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="w-full flex items-center justify-center py-20">
                            <p className={isLoading ? "text-gray-500" : "text-lg font-semibold text-gray-500"}>
                                {isLoading ? "جاري التحميل..." : "لا توجد نتائج"}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Keep the current products visible (dimmed) while the next request loads */}
                            <div
                                className={`w-full grid grid-cols-3 gap-10 transition-opacity duration-100
                                            ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                            >
                                {products.map((product) => (
                                    <ProductCard product={product} key={product._id} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pages > 1 && (
                                <div className="w-full flex items-center justify-center gap-5">
                                    <button
                                        type="button"
                                        disabled={filters.page <= 1 || isLoading}
                                        onClick={() => goToPage(filters.page - 1)}
                                        className="bg-light text-dark py-3 px-6 rounded-md font-medium text-base cursor-pointer
                                                   hover:text-neutral hover:bg-dark transition-all ease-in-out duration-100
                                                   disabled:opacity-40 disabled:pointer-events-none"
                                    >
                                        السابق
                                    </button>
                                    <span className="text-base font-semibold">
                                        صفحة {filters.page} من {pages}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={filters.page >= pages || isLoading}
                                        onClick={() => goToPage(filters.page + 1)}
                                        className="bg-light text-dark py-3 px-6 rounded-md font-medium text-base cursor-pointer
                                                   hover:text-neutral hover:bg-dark transition-all ease-in-out duration-100
                                                   disabled:opacity-40 disabled:pointer-events-none"
                                    >
                                        التالي
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

// Remount on slug change so every filter, page and request resets cleanly
const CategoryProductsPage = () => {
    const { slug } = useParams();
    return <CategoryProducts key={slug} slug={slug} />;
};

export default CategoryProductsPage;
