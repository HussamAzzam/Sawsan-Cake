// src/data/categories.js
export const categories = [
    {
        slug: "cakes",
        catHref: "/category/cakes",
        catImage: "/categories/cake.jpeg",
        catAlt: "قوالب الكيك",
        catName: "قوالب الكيك",
        catNumber: 12
    },
    {
        slug: "cheesecakes",
        catHref: "/category/cheesecakes",
        catImage: "/categories/cheese-cake.png",
        catAlt: "قوالب تشيز كيك",
        catName: "قوالب تشيز كيك",
        catNumber: 8
    },
    {
        slug: "eastern-sweets",
        catHref: "/category/eastern-sweets",
        catImage: "/categories/eastern.png",
        catAlt: "حلويات شرقية",
        catName: "حلويات شرقية",
        catNumber: 15
    },
    {
        slug: "cookies-tart",
        catHref: "/category/cookies-tart",
        catImage: "/categories/cookies.png",
        catAlt: "كوكيز وتارت",
        catName: "كوكيز وتارت",
        catNumber: 6
    },
    {
        slug: "chocolate",
        catHref: "/category/chocolate",
        catImage: "/categories/chocolate.png",
        catAlt: "شوكلاتة",
        catName: "شوكلاتة",
        catNumber: 11
    },
    {
        slug: "cold-desserts",
        catHref: "/category/cold-desserts",
        catImage: "/categories/tart.png",
        catAlt: "حلويات باردة",
        catName: "حلويات باردة",
        catNumber: 9
    },
    {
        slug: "pastries",
        catHref: "/category/pastries",
        catImage: "/categories/pastries.png",
        catAlt: "معجنات",
        catName: "معجنات",
        catNumber: 20
    },
    {
        slug: "eid-sweets",
        catHref: "/category/eid-sweets",
        catImage: "/categories/Eid.png",
        catAlt: "حلويات العيد",
        catName: "حلويات العيد",
        catNumber: 14
    }
];


// src/data/subcategories.js
export const subcategoriesByCategory = {
    cakes: [
        { label: "الكل", value: "all" },
        { label: "قوالب السبونج كيك", value: "قوالب السبونج كيك" },
        { label: "ميني كيك", value: "ميني كيك" },
        { label: "حفلات الزفاف خطوبة وحناء", value: "حفلات الزفاف خطوبة وحناء" },
        { label: "اعياد ميلاد", value: "اعياد ميلاد" },
        { label: "مناسبات", value: "مناسبات" },
        { label: "كيك ترند", value: "كيك ترند" }
    ],
    cheesecakes: [
        { label: "الكل", value: "all" }
        // add real subcategories later
    ],
    "eastern-sweets": [
        { label: "الكل", value: "all" }
    ],
    "cookies-tart": [
        { label: "الكل", value: "all" }
    ],
    chocolate: [
        { label: "الكل", value: "all" }
    ],
    "cold-desserts": [
        { label: "الكل", value: "all" }
    ],
    pastries: [
        { label: "الكل", value: "all" }
    ],
    "eid-sweets": [
        { label: "الكل", value: "all" }
    ]
};