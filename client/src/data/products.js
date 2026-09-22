// src/data/products.js
export const products = [
    {
        id: 1,
        name: "كيكة الشوكولاتة",
        image: "/design/love.png",
        subcategory: "كيك ترند",
        description: "كيكة شوكولاتة غنية وطرية، مكونة من طبقات متعددة من الإسفنج الفاخر المحضر بأجود أنواع الكاكاو، مع حشوة كريمية ناعمة وتغطية شوكولاتة سميكة تذوب في الفم مع كل قضمة",
        priceOptions: [
            { people: 3, value: 10 },
            { people: 5, value: 15 },
            { people: 10, value: 25 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 21,
        name: "2كيكة الشوكولاتة",
        image: "/design/love.png",
        subcategory: "مناسبات",
        description: "نسخة أخرى من كيكة الشوكولاتة الكلاسيكية، محضرة طازجة يوميًا بعناية فائقة، مثالية للمناسبات الخاصة والاحتفالات العائلية بفضل مذاقها الغني وقوامها الطري",
        priceOptions: [
            { people: 3, value: 8 },
            { people: 5, value: 15 },
            { people: 10, value: 25 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 22,
        name: "2كيكة الشوكولاتة",
        image: "/design/love.png",
        subcategory: "ميني كيك",
        description: "كيكة شوكولاتة فاخرة تجمع بين الطراوة والغنى في كل قطعة، محضرة من مكونات طبيعية 100% دون أي إضافات صناعية، لتجربة تذوق أصيلة ولا تُنسى",
        priceOptions: [
            { people: 3, value: 6 },
            { people: 5, value: 15 },
            { people: 10, value: 25 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 23,
        name: "2كيكة الشوكولاتة",
        image: "/design/love.png",
        subcategory: "اعياد ميلاد",
        description: "كيكة شوكولاتة مميزة بحشوة كريمية غنية وطبقة تزيين أنيقة، تناسب أعياد الميلاد والمناسبات الخاصة، ويمكن تخصيص الحجم حسب عدد الضيوف",
        priceOptions: [
            { people: 3, value: 80 },
            { people: 5, value: 15 },
            { people: 10, value: 25 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 2,
        name: "تشيز كيك التوت",
        image: "/design/love.png",
        description: "تشيز كيك كريمي فاخر محضر بجبنة الكريم الطازجة، مغطى بطبقة سخية من صوص التوت الطبيعي والحبوب الطازجة، يجمع بين القوام الناعم والنكهة الحامضة المنعشة",
        priceOptions: [
            { people: 3, value: 12 },
            { people: 5, value: 18 },
            { people: 10, value: 30 }
        ],
        categorySlug: "cheesecakes"
    },
    {
        id: 3,
        name: "بقلاوة بالفستق",
        image: "/design/love.png",
        description: "بقلاوة شرقية أصيلة، طبقات رقيقة ومقرمشة من العجين محشوة بالفستق الحلبي المطحون طازجًا، ومغموسة بالقطر الطبيعي لتمنحك مذاقًا شرقيًا تقليديًا فاخرًا",
        priceOptions: [
            { people: 3, value: 8 },
            { people: 5, value: 12 },
            { people: 10, value: 20 }
        ],
        categorySlug: "eastern-sweets"
    },
    {
        id: 4,
        name: "تارت الليمون",
        image: "/design/love.png",
        description: "تارت فرنسي مقرمش القاعدة، محشو بكريمة الليمون الطازجة ذات المذاق الحامض المنعش، ومزين بقشور الليمون لإضافة لمسة بصرية وعطرية مميزة",
        priceOptions: [
            { people: 3, value: 7 },
            { people: 5, value: 10 },
            { people: 10, value: 18 }
        ],
        categorySlug: "cookies-tart"
    },
    {
        id: 5,
        name: "شوكولاتة بالبندق",
        image: "/design/love.png",
        description: "قطع شوكولاتة فاخرة مصنوعة يدويًا، محشوة بالبندق المحمص الطازج، تجمع بين قرمشة البندق ونعومة الشوكولاتة الذائبة، مثالية كهدية أو تحلية بعد الطعام",
        priceOptions: [
            { people: 3, value: 9 },
            { people: 5, value: 14 },
            { people: 10, value: 22 }
        ],
        categorySlug: "chocolate"
    },
    {
        id: 6,
        name: "موس الشوكولاتة البارد",
        image: "/design/love.png",
        description: "حلى بارد وخفيف من موس الشوكولاتة الفاخر، ذو قوام إسفنجي هوائي يذوب في الفم فور تذوقه، مثالي كختام منعش لوجبة دسمة أو كحلى صيفي بارد",
        priceOptions: [
            { people: 3, value: 8 },
            { people: 5, value: 11 },
            { people: 10, value: 19 }
        ],
        categorySlug: "cold-desserts"
    },
    {
        id: 7,
        name: "كرواسون بالزبدة",
        image: "/design/love.png",
        description: "كرواسون فرنسي أصيل، طبقات رقيقة ومقرمشة من الخارج وطرية من الداخل، محضر بالزبدة الطبيعية الفاخرة، مثالي لوجبة إفطار فاخرة أو مع كوب قهوة",
        priceOptions: [
            { people: 3, value: 6 },
            { people: 5, value: 8 },
            { people: 10, value: 15 }
        ],
        categorySlug: "pastries"
    },
    {
        id: 8,
        name: "معمول التمر",
        image: "/design/love.png",
        description: "معمول تقليدي محضر بعناية فائقة، محشو بعجينة التمر الفاخرة المطحونة طازجًا، ومزين بنقشات شرقية تقليدية، طبق أساسي لا يغيب عن موائد الأعياد",
        priceOptions: [
            { people: 3, value: 7 },
            { people: 5, value: 9 },
            { people: 10, value: 16 }
        ],
        categorySlug: "eid-sweets"
    },
    {
        id: 9,
        name: "كيكة الفانيليا",
        image: "/design/love.png",
        subcategory: "حفلات الزفاف خطوبة وحناء",
        description: "كيكة فانيليا كلاسيكية طرية، محضرة بخلاصة الفانيليا الطبيعية الفاخرة، مغطاة بطبقة كريمة ناعمة ومتوازنة الحلاوة، خيار مثالي لكل من يفضل النكهات البسيطة والراقية",
        priceOptions: [
            { people: 3, value: 10 },
            { people: 5, value: 14 },
            { people: 10, value: 24 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 10,
        name: "تشيز كيك الأوريو",
        image: "/design/love.png",
        description: "تشيز كيك غني وكثيف القوام، ممزوج بقطع بسكويت الأوريو المطحونة والكاملة، مع قاعدة بسكويت مقرمشة وتغطية شوكولاتية، حلى محبوب لعشاق الشوكولاتة",
        priceOptions: [
            { people: 3, value: 13 },
            { people: 5, value: 19 },
            { people: 10, value: 32 }
        ],
        categorySlug: "cheesecakes"
    },
    {
        id: 11,
        name: "كنافة نابلسية",
        image: "/design/love.png",
        description: "كنافة نابلسية أصلية محضرة على الطريقة التقليدية، بعجينة الكنافة الذهبية والجبنة الطازجة الممطوطة، مغموسة بالقطر الساخن ومزينة بالفستق المطحون",
        priceOptions: [
            { people: 3, value: 9 },
            { people: 5, value: 13 },
            { people: 10, value: 22 }
        ],
        categorySlug: "eastern-sweets"
    },
    {
        id: 12,
        name: "كوكيز الشوفان",
        image: "/design/love.png",
        description: "كوكيز صحي ولذيذ محضر بالشوفان الكامل والزبيب الطبيعي، خيار متوازن بين المذاق الحلو والفائدة الغذائية، مثالي كوجبة خفيفة في أي وقت من اليوم",
        priceOptions: [
            { people: 3, value: 5 },
            { people: 5, value: 7 },
            { people: 10, value: 13 }
        ],
        categorySlug: "cookies-tart"
    },
    {
        id: 13,
        name: "ترافل الشوكولاتة الداكنة",
        image: "/design/love.png",
        description: "ترافل شوكولاتة داكنة فاخرة، بقوام كريمي ناعم يذوب في الفم فورًا، محضر من شوكولاتة عالية الجودة، مغلف بمسحوق الكاكاو الفاخر لإضافة لمسة أنيقة",
        priceOptions: [
            { people: 3, value: 11 },
            { people: 5, value: 16 },
            { people: 10, value: 27 }
        ],
        categorySlug: "chocolate"
    },
    {
        id: 14,
        name: "تيراميسو بالفراولة",
        image: "/design/love.png",
        description: "تيراميسو إيطالي كلاسيكي بلمسة عصرية من الفراولة الطازجة، طبقات من الكريمة الغنية وبسكويت السافوياردي المنقوع بالقهوة، حلى بارد أنيق لكل المناسبات",
        priceOptions: [
            { people: 3, value: 10 },
            { people: 5, value: 15 },
            { people: 10, value: 25 }
        ],
        categorySlug: "cold-desserts"
    },
    {
        id: 15,
        name: "دانيش بالتفاح",
        image: "/design/love.png",
        description: "معجنات دانيش هشة ومتعددة الطبقات، محشوة بقطع التفاح الطازج المطبوخ بالقرفة والسكر البني، ومزينة بطبقة سكرية خفيفة، مثالية لإفطار دافئ ومميز",
        priceOptions: [
            { people: 3, value: 6 },
            { people: 5, value: 9 },
            { people: 10, value: 16 }
        ],
        categorySlug: "pastries"
    },
    {
        id: 16,
        name: "غريبة العيد",
        image: "/design/love.png",
        description: "غريبة تقليدية هشة تذوب في الفم فور تذوقها، محضرة بالسمن البلدي الفاخر وأجود أنواع الدقيق، وصفة عائلية عريقة تحضر خصيصًا لموائد الأعياد",
        priceOptions: [
            { people: 3, value: 6 },
            { people: 5, value: 8 },
            { people: 10, value: 14 }
        ],
        categorySlug: "eid-sweets"
    },
    {
        id: 17,
        name: "كيكة الريد فيلفيت",
        image: "/design/love.png",
        subcategory: "مناسبات",
        description: "كيكة الريد فيلفيت الشهيرة بلونها الأحمر المميز وقوامها الطري، مغطاة بطبقة سخية من كريمة الجبنة الناعمة ذات المذاق المتوازن بين الحلاوة والحموضة الخفيفة",
        priceOptions: [
            { people: 3, value: 12 },
            { people: 5, value: 18 },
            { people: 10, value: 28 }
        ],
        categorySlug: "cakes"
    },
    {
        id: 18,
        name: "تشيز كيك المانجو",
        image: "/design/love.png",
        description: "تشيز كيك منعش وصيفي، محضر بجبنة الكريم الفاخرة ومغطى بصوص المانجو الطبيعي الغني بالنكهة الاستوائية، خيار مثالي لعشاق التوليفات الفاكهية المنعشة",
        priceOptions: [
            { people: 3, value: 12 },
            { people: 5, value: 17 },
            { people: 10, value: 29 }
        ],
        categorySlug: "cheesecakes"
    },
    {
        id: 19,
        name: "معجنات بالجبنة",
        image: "/design/love.png",
        description: "معجنات طازجة يوميًا، محشوة بخليط غني من الأجبان الطازجة، وعجينة هشة ومقرمشة من الخارج، خيار مثالي لوجبة إفطار أو سناك سريع خلال اليوم",
        priceOptions: [
            { people: 3, value: 5 },
            { people: 5, value: 8 },
            { people: 10, value: 15 }
        ],
        categorySlug: "pastries"
    },
    {
        id: 20,
        name: "بسكويت العيد بالتمر",
        image: "/design/love.png",
        description: "بسكويت عيد تقليدي محضر بعناية، محشو بمعجون التمر الطبيعي الفاخر، بعجينة هشة تذوب في الفم، طبق أساسي على موائد العيد في كل بيت",
        priceOptions: [
            { people: 3, value: 7 },
            { people: 5, value: 9 },
            { people: 10, value: 16 }
        ],
        categorySlug: "eid-sweets"
    }
];