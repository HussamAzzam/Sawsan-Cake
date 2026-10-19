import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, X } from "lucide-react";

import { toggleLike } from "@/api/productService";
import { useAuth } from "@/context/AuthContext.jsx";

const lowestOption = (product) =>
    product.priceOptions.reduce((min, option) => (option.value < min.value ? option : min));

const ProductCard = ({ product }) => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // product.isLiked comes from GET /products (false for logged-out visitors)
    const [isLiked, setIsLiked] = useState(Boolean(product.isLiked));
    const [likePending, setLikePending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(() => lowestOption(product));

    const startingPrice = lowestOption(product).value;

    const goToLogin = () => navigate("/login", { state: { from: location } });

    const handleLike = async () => {
        if (authLoading || likePending) return;
        if (!user) return goToLogin();

        const previous = isLiked;
        setIsLiked(!previous); // optimistic
        setLikePending(true);

        try {
            const res = await toggleLike(product._id);
            setIsLiked(res.data.liked); // the server's answer wins
        } catch (err) {
            setIsLiked(previous); // roll back
            if (err.response?.status === 401) goToLogin(); // session expired
        } finally {
            setLikePending(false);
        }
    };

    // Close the modal with Escape and lock page scroll while it's open
    useEffect(() => {
        if (!isModalOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        const previousOverflow = document.body.style.overflow;

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalOpen]);

    return (
        <>
            <div className="min-w-80 bg-neutral rounded-sm flex flex-col gap-5 shrink-0 shadow-md">
                {/* Image container */}
                <div className="relative w-full aspect-square">
                    {/* Like button */}
                    <button
                        type="button"
                        aria-label="إعجاب"
                        aria-pressed={isLiked}
                        disabled={likePending}
                        onClick={handleLike}
                        className={`absolute right-3 top-3 z-50 bg-background rounded-full p-2 cursor-pointer
                                    transition-all duration-75 ease-in-out group/heart shadow-md
                                    ${isLiked ? "" : "hover:bg-primary"}`}
                    >
                        <Heart
                            className={`transition-all duration-75 ease-in-out text-primary
                                        ${isLiked ? "fill-primary" : "group-hover/heart:fill-neutral"}`}
                        />
                    </button>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center rounded-t-sm"
                    />
                </div>

                {/* Body */}
                <div className="w-full flex flex-col gap-10 p-5">
                    {/* Info */}
                    <div className="w-full flex flex-col gap-5">
                        {/* Title + price */}
                        <div className="w-full flex justify-between items-end">
                            <div className="text-md font-semibold">{product.name}</div>
                            <div className="text-md font-semibold text-dark" dir="rtl">
                                {product.priceOptions.length > 1 && (
                                    <span className="text-base font-normal opacity-60">يبدأ من </span>
                                )}
                                {startingPrice} <span className="text-base font-bold">د.أ</span>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="text-base text-gray-500 line-clamp-3">{product.description}</div>
                    </div>

                    {/* Product details button */}
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-light text-dark py-3 rounded-md font-medium text-base hover:text-neutral hover:bg-dark cursor-pointer transition-all ease-in-out duration-100"
                    >
                        التفاصيل
                    </button>
                </div>
            </div>

            {/* Modal overlay */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={product.name}
                        className="bg-neutral rounded-sm shadow-md w-full max-w-250 max-h-[90vh] overflow-y-auto
                                   flex flex-col md:flex-row relative gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            aria-label="إغلاق"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute left-3 top-3 z-50 bg-background rounded-full p-2 cursor-pointer
                                       transition-all duration-75 ease-in-out shadow-md hover:bg-primary group/close"
                        >
                            <X className="text-primary transition-all duration-75 ease-in-out group-hover/close:text-neutral" />
                        </button>

                        {/* Image - left */}
                        <div className="w-full md:w-1/2 aspect-square shrink-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center rounded-r-sm"
                            />
                        </div>

                        {/* Details - right */}
                        <div className="w-full md:w-1/2 flex flex-col gap-5 p-6">
                            {/* Name */}
                            <div className="text-xl font-semibold">{product.name}</div>

                            {/* Full description */}
                            <div className="text-base text-gray-500">{product.description}</div>

                            {/* Price options */}
                            <div className="w-full flex flex-col gap-3">
                                <div className="text-base font-semibold">اختر الحجم</div>
                                <div className="w-full flex flex-col gap-2">
                                    {product.priceOptions.map((option) => (
                                        <div
                                            key={option.people}
                                            onClick={() => setSelectedOption(option)}
                                            className={`w-full flex justify-between items-center px-4 py-3 rounded-md cursor-pointer
                                                        border transition-all duration-75 ease-in-out
                                                        ${selectedOption.people === option.people
                                                ? "border-dark bg-light"
                                                : "border-gray-200 hover:bg-light"
                                            }`}
                                        >
                                            <span className="text-base">{option.people} أشخاص</span>
                                            <span className="text-base font-semibold" dir="rtl">
                                                {option.value} <span className="font-bold">د.أ</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Selected total */}
                            <div className="w-full flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-base font-semibold">السعر الإجمالي</span>
                                <span className="text-lg font-bold text-dark" dir="rtl">
                                    {selectedOption.value} <span className="text-base font-bold">د.أ</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
