
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
            className="group/card flex h-full w-full max-w-80 flex-col items-center justify-between overflow-hidden rounded-sm bg-neutral shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={catImage}
                    alt={catAlt}
                    className="h-full w-full transform object-cover object-center transition-transform duration-200 ease-in-out group-hover/card:scale-105"
                />
            </div>
            <div className="flex w-full flex-col items-center gap-2 bg-primary p-4 sm:p-5">
                <div className="text-md text-center font-bold text-neutral">{catName}</div>
                <div className="text-sm text-center font-bold text-dark">{ catNumber } { getProductWord(catNumber) }</div>
            </div>
        </a>
    )
}

export default CategoryCard
