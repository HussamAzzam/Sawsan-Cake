import { useState } from "react";
import { Heart, X } from "lucide-react";

const ProductCard = ({ product }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(product.priceOptions[0]);

    return (
        <>
            <div className={`min-w-80 bg-neutral  rounded-sm flex flex-col gap-5 shrink-0  shadow-md`}>
                {/* Image container */}
                <div className={`relative w-full aspect-square `}>
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
                        className={`w-full h-full object-cover object-center rounded-t-sm `}
                    />
                </div>
                {/* Body */}
                <div className={`w-full flex flex-col gap-10 p-5`}>
                    {/* Info */}
                    <div className={`w-full flex flex-col gap-5`}>
                        {product.tagline && (
                            <div className={`tagline`}>
                                {product.tagline}
                            </div>
                        )}
                        {/* Title */}
                        <div className={`w-full flex justify-between items-end`}>
                            <div className={`text-md font-semibold`}>
                                {product.name}
                            </div>

                            {/* Price */}
                            <div className={`text-md font-semibold text-dark  `} dir={`rtl`}>
                                {` ${product.priceOptions[0].value} `}
                                <span className={`text-base font-bold`}>د.أ</span>
                            </div>
                        </div>
                        {/* Description */}
                        <div className={`text-base text-gray-500 line-clamp-3`}>
                            {product.description}
                        </div>
                    </div>
                    {/* Product details button*/}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`bg-light text-dark py-3 rounded-md font-medium text-base hover:text-neutral hover:bg-dark cursor-pointer transition-all ease-in-out duration-100`}
                    >
                        التفاصيل
                    </button>
                </div>
            </div>

            {/* Modal overlay */}
            {isModalOpen && (
                <div
                    className={`fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4`}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className={`bg-neutral rounded-sm shadow-md w-full max-w-250 max-h-[90vh] overflow-y-auto
                                    flex flex-col md:flex-row relative gap-5`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <div
                            className={`absolute left-3 top-3 z-50 bg-background rounded-full p-2 cursor-pointer
                                        transition-all duration-75 ease-in-out shadow-md hover:bg-primary group/close`}
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className={`text-primary transition-all duration-75 ease-in-out group-hover/close:text-neutral`} />
                        </div>

                        {/* Image - left */}
                        <div className={`w-full md:w-1/2 aspect-square shrink-0`}>
                            <img
                                src={product.image}
                                alt={`product image`}
                                className={`w-full h-full object-cover object-center rounded-r-sm `}
                            />
                        </div>

                        {/* Details - right */}
                        <div className={`w-full md:w-1/2 flex flex-col gap-5 p-6`}>
                            {/* Tagline */}
                            {product.tagline && (
                                <div className={`tagline`}>
                                    {product.tagline}
                                </div>
                            )}

                            {/* Name */}
                            <div className={`text-xl font-semibold`}>
                                {product.name}
                            </div>

                            {/* Full description */}
                            <div className={`text-base text-gray-500`}>
                                {product.description}
                            </div>

                            {/* Price options */}
                            <div className={`w-full flex flex-col gap-3`}>
                                <div className={`text-base font-semibold`}>
                                    اختر الحجم
                                </div>
                                <div className={`w-full flex flex-col gap-2`}>
                                    {product.priceOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedOption(option)}
                                            className={`w-full flex justify-between items-center px-4 py-3 rounded-md cursor-pointer
                                                        border transition-all duration-75 ease-in-out
                                                        ${selectedOption.people === option.people
                                                ? "border-dark bg-light"
                                                : "border-gray-200 hover:bg-light"
                                            }`}
                                        >
                                            <span className={`text-base`}>{option.people} أشخاص</span>
                                            <span className={`text-base font-semibold`} dir={`rtl`}>
                                                {option.value} <span className={`font-bold`}>د.أ</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Selected total */}
                            <div className={`w-full flex justify-between items-center pt-3 border-t border-gray-200`}>
                                <span className={`text-base font-semibold`}>السعر الإجمالي</span>
                                <span className={`text-lg font-bold text-dark`} dir={`rtl`}>
                                    {selectedOption.value} <span className={`text-base font-bold`}>د.أ</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;