import { categories } from "@/data/categories.js"
import CategoryCard from "@/components/CategoryCard.jsx"

const Categories = () => {
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
            {/* Categories container */}
            <div className={`w-full grid grid-cols-4 gap-10`}>
                {
                    categories.map((category, index) => (
                            <CategoryCard
                                key={index}
                                catName={category.catName}
                                catNumber={category.catNumber}
                                catImage={category.catImage}
                                catHref={category.catHref}
                                catAlt={category.catAlt}
                            />
                        )
                    )
                }
            </div>
        </section>
    )
}

export default Categories;