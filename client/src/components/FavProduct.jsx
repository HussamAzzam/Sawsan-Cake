import { Heart } from "lucide-react"

const FavProduct = ({order, name, category, image, likes}) => {
    return (
        <div className={`w-full  flex items-center justify-between 
                        ${order === 5 ? "" : "border-b-2 border-gray"}  pb-10`}>
            {/* Right part */}
            <div className={`h-full flex items-center gap-5`}>
                {/* Number */}
                <div className={`text-lg text-primary font-bold`}>
                    { order }
                </div>
                {/* Image and info */}
                <div className={`h-20 flex items-center gap-5`}>
                    <div className={`h-full aspect-square`}>
                        <img
                            src={image}
                            alt="product 1"
                            className={`w-full h-full object-cover object-center rounded-[10px]`}
                        />
                    </div>
                    <div className={`h-full flex flex-col items-start justify-center gap-2`}>
                        {/* Name */}
                        <div className={`text-md font-semibold`}>
                            { name }
                        </div>
                        {/* Category */}
                        <div className={`text-base font-light text-gray-500`}>
                            { category }
                        </div>
                    </div>
                </div>
            </div>

            {/* Left part */}
            <div className={`flex items-center gap-2 text-primary font-bold text-md`}>
                <Heart
                    size={25}
                    className={`fill-primary`}
                />
                <div>
                    { likes }
                </div>
            </div>
        </div>
    )
}

export default FavProduct