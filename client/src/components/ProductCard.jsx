import { useState } from "react";
import {Heart} from "lucide-react";


const ProductCard = ({ product }) => {

    const [isLiked, setIsLiked] = useState(false)

    return (
        <div className={`w-80 bg-neutral p-5 rounded-sm flex flex-col gap-5 shrink-0`}>
            {/* Image container */}
            <div className={`relative w-full aspect-square rounded-sm `}>
                {/* Like button*/}
                <div
                    className={`absolute right-3 top-3 z-50  bg-background rounded-full p-2 cursor-pointer
                                 transition-all duration-75 ease-in-out  group/heart shadow-md
                                 ${isLiked ? "" : "hover:bg-primary"}
                                 `}
                    onClick={() => setIsLiked(prev => !prev)}
                >
                    <Heart
                        className={` transition-all duration-75 ease-in-out text-primary
                                    ${isLiked ? "fill-primary" : "group-hover/heart:fill-neutral"}
                        `}
                    />
                </div>
                <img
                    src={product.image}
                    alt={`product image`}
                    className={`w-full h-full object-cover object-center rounded-sm`}
                />
            </div>
            {/* Info */}
            <div className={`w-full flex flex-col gap-2`}>
                {/* Title */}
                <div className={`w-full flex justify-between items-end`}>
                    <div className={`text-md font-semibold`}>
                        {product.name}
                    </div>

                    {/* Price */}
                    <div className={`text-md font-semibold text-dark  `} dir={`rtl`}>
                        {` ${product.price} د.أ`}
                    </div>
                </div>
                {/* Description */}
                <div className={`text-sm text-gray-500 line-clamp-3`}>
                    {product.description}
                </div>
            </div>
            {/* Product details button*/}
            <button className={`bg-light text-dark py-2 rounded-md font-medium text-base hover:text-neutral hover:bg-dark cursor-pointer transition-all ease-in-out duration-100`}>
                التفاصيل
            </button>
        </div>
    )
}

export default ProductCard;