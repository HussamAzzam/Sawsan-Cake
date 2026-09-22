const normalizeArabic = (text) => {
    return text
        .replace(/[إأآا]/g, "ا") // unify all alef variations into plain alef
        .replace(/ة/g, "ه")       // optional: unify teh marbuta with heh
        .replace(/[\u064B-\u065F]/g, ""); // optional: strip diacritics (tashkeel)
};

export const productFilter = (products,
                              { subcategory = "all", searchText = "", sortOrder = null } = {}
) => {
    let result = products;

    if (subcategory !== "all") {
        result = result.filter(product => product.subcategory === subcategory);
    }

    if (searchText !== "") {
        const normalizedSearch = normalizeArabic(searchText.toLowerCase());
        result = result.filter(product =>
            normalizeArabic(product.name.toLowerCase()).includes(normalizedSearch)
        );
    }

    if (sortOrder === "asc") {
        result = [...result].sort((a, b) => a.priceOptions[0].value - b.priceOptions[0].value);
    } else if (sortOrder === "desc") {
        result = [...result].sort((a, b) => b.priceOptions[0].value - a.priceOptions[0].value);
    }

    return result;
};