// Data Sample
import products from "@/data/productsSample.js"
const Gallery = () => {
    return (

    <section

        className={`section flex-col bg-gray gap-20 `}
    >
        {/* Top bar */}
        <div className={`w-full flex items-end justify-between`}>
            {/* Right section (tagline/title) */}
            <div className={`flex flex-col gap-2`}>
                {/* Tagline */}
                <div className={`tagline `}>
                    المجموعة الملكية
                </div>
                {/* Title */}
                <div className={`title`}>
                    ابداعاتنا المميزة لهذا الموسم
                </div>
            </div>
            {/* Left section (navigation arrows) */}
            <div className={`flex items-center gap-5`} dir={`ltr`}>
                <div
                    className={`flex items-center justify-center bg-neutral p-3 rounded-full shadow-xl 
                                                 cursor-pointer hover:scale-105 transition-all ease-in-out duration-100`}
                    onClick={() => scrollByAmount("backward")}
                >
                    <StepBack size={24}/>
                </div>
                <div
                    className={`flex items-center justify-center bg-neutral p-3 rounded-full shadow-xl 
                                                 cursor-pointer hover:scale-105 transition-all ease-in-out duration-100`}
                    onClick={() => scrollByAmount("forward")}
                >
                    <StepForward size={24}/>
                </div>
            </div>
        </div>

        {/* Products container */}
        <div
            ref={scrollRef}
            className={`w-full flex items-center gap-10 overflow-x-auto scrollbar-none scroll-smooth`}>
            {
                products.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    )
                )
            }
        </div>

    </section>
    )
}

export default Gallery;