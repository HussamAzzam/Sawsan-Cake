import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { productFilter } from "@/utils/productFilter.js";

import { Search, ChevronDown } from "lucide-react"

import ProductCard from "@/components/ProductCard"

import {categories, subcategoriesByCategory} from "@/data/categories.js";
import {products} from "@/data/products.js"

const CategoryProducts = () => {
    const { slug } = useParams();

    const [activeSubcategory, setActiveSubcategory] = useState("all")
    const [searchText, setSearchText] = useState("")
    const [sortOrder, setSortOrder] = useState("asc")

    const category = categories.find(cat => cat.slug === slug)
    const categoryProducts = products.filter(product => product.categorySlug === category.slug)
    const subcategories = subcategoriesByCategory[category.slug] || [{ label: "الكل", value: "all" }]

    const filteredProducts = useMemo(
        () => {
            return productFilter(categoryProducts, { subcategory: activeSubcategory, searchText, sortOrder })
        }
    ,[activeSubcategory, searchText, sortOrder])


    return (
        <main className={`min-h-screen w-full py-nav flex flex-col items-center justify-start` }>
            <div className={`w-[80%] flex items-start py-nav gap-10`}>
                {/* Right Panel */}
                <div className={`w-[20%] flex flex-col items-start p-5 bg-neutral rounded-sm shadow-md gap-10`}>
                    {/* Search bar */}
                    <div className={`relative w-full `}>
                        <input
                            type="text"
                            placeholder="البحث"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={`w-full rounded-[10px] bg-gray py-2 px-3 text-gray-900 font-medium`}
                        />
                        <Search
                            size={20}
                            className={`absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 `}
                        />
                    </div>
                    {/* Subcategories */}
                    <div className={`w-full flex flex-col gap-5`}>
                        {/* Title */}
                        <div className={`title text-md`}>
                            الأقسام
                        </div>
                        {/* Categories container */}
                        <div className={`w-full flex flex-col items-start justify-start gap-5 pr-5`}>
                            {subcategories.map((sub) => (
                                <label key={sub.value} className={`flex items-center justify-start gap-2 cursor-pointer`}>
                                    <input
                                        type="radio"
                                        name="subcategory"
                                        value={sub.value}
                                        checked={activeSubcategory === sub.value}
                                        onChange={(e) => setActiveSubcategory(e.target.value)}
                                        className={`accent-primary`}
                                    />
                                    <div className={`text-base font-semibold opacity-60`}>{sub.label}</div>
                                </label>
                            ))}
                        </div>
                    </div>
                        {/* Sort Input */}
                        <div className="relative w-full">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full appearance-none bg-gray rounded-[10px] py-3 px-3 text-gray-900 font-medium cursor-pointer"
                            >
                                <option value="asc">من الأرخص للأغلى</option>
                                <option value="desc">من الأغلى للأرخص</option>
                            </select>
                            <ChevronDown
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                        </div>
                </div>

                {/* Products Container */}
                <div className={`w-[80%] flex flex-col gap-10`}>
                    {/* Header */}
                    <div className={`w-full flex items-end justify-between`}>
                        <div className={`title`}>
                            {category.catName}
                        </div>
                        <div className={`text-sm text-gray-500 font-bold`}>
                            عدد المنتجات : {filteredProducts.length}
                        </div>
                    </div>

                    {/* Products wrapper */}
                    {filteredProducts.length > 0 ? (
                        <div className={`w-full grid grid-cols-3 gap-10`}>
                            {filteredProducts.map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center py-20 gap-3">
                            <p className="text-lg font-semibold text-gray-500">لا توجد نتائج</p>

                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default CategoryProducts;