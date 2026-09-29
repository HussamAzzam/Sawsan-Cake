
const CategoryCard = ({catHref, catImage, catAlt, catName, catNumber}) => {
    const getProductWord = (num) => {
        const n = Number(num);
        if (n === 0) return "منتجات";
        if (n === 1) return "منتج";
        if (n === 2) return "منتجان";
        if (n >= 3 && n <= 10) return "منتجات";
        return "منتج";
    };
    return (
        <a
            href={catHref}
            className={`flex flex-col items-center justify-between gap-5  bg-neutral rounded-sm shadow-md 
                        transition-all ease-in-out duration-200 hover:-translate-y-5 hover:shadow-xl group/card `}
        >
            <div className="w-80 h-fit">
                <img
                    src={catImage}
                    alt={catAlt}
                    className={`w-full h-full object-cover object-center group-hover/card:scale-110 
                                transition-all duration-200 ease-in-out transform 
                    `}
                />
            </div>
            <div className={`w-full flex flex-col items-center gap-2 bg-primary rounded-b-sm p-5`}>
                <div className={`text-md text-neutral font-bold`}>{catName}</div>
                <div className={`text-sm text-dark font-bold`}>{ catNumber } { getProductWord(catNumber) }</div>
            </div>
        </a>
    )
}

export default CategoryCard
