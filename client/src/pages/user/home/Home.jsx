    import { useState, useRef} from "react";
    import { ArrowLeft, StepForward, StepBack, Sparkles, Info, Check, Play } from "lucide-react"

    import ProductCard from "@/components/ProductCard";
    import GalleryButton from "@/components/CoolButton.jsx";


    import { mobilePoster, category, walnut, cake2, cashew, almond,
            mango, cake3, cake1, pineapple, cake4, pastryBag, cakeSample,
            strawberry, quality, whatsapp, instagram, facebook, truck, contact,
            youtube, avatar, youtubeLogo
    } from "@/assets/assets.js"

    export default function Home() {
        const videoUrl = "https://res.cloudinary.com/k9uw0ie2/video/upload/v1788412955/TensorPix_-_vid-NO-watermark-4k.mp4"
        const posterUrl = "https://res.cloudinary.com/k9uw0ie2/video/upload/f_auto,q_auto/Cupcake_with_cream_pouring_202606300145.jpg"

        const [isVideoLoaded, setIsVideoLoaded] = useState(false);

        const scrollRef = useRef(null);

        const products = [
            {
                name: "الكيكة المليحة",
                description: " طبقات إسفنجية خفيفة بنكهة الفانيليا المدغشقرية محشوة بكريمة التوت البري ومزينة بقطع الفراولة الطازجة. ",
                image: cakeSample,
                price: 10
            },
            {
                name: "الكيكة المليحة",
                description: " طبقات إسفنجية خفيفة بنكهة الفانيليا المدغشقرية محشوة بكريمة التوت البري ومزينة بقطع الفراولة الطازجة. ",
                image: cakeSample,
                price: 10
            },
            {
                name: "الكيكة المليحة",
                description: " طبقات إسفنجية خفيفة بنكهة الفانيليا المدغشقرية محشوة بكريمة التوت البري ومزينة بقطع الفراولة الطازجة. ",
                image: cakeSample,
                price: 10
            },
            {
                name: "الكيكة المليحة",
                description: " طبقات إسفنجية خفيفة بنكهة الفانيليا المدغشقرية محشوة بكريمة التوت البري ومزينة بقطع الفراولة الطازجة. ",
                image: cakeSample,
                price: 10
            },
            {
                name: "الكيكة المليحة",
                description: " طبقات إسفنجية خفيفة بنكهة الفانيليا المدغشقرية محشوة بكريمة التوت البري ومزينة بقطع الفراولة الطازجة. ",
                image: cakeSample,
                price: 10
            }
        ]

        /* Handlers */
        const scrollByAmount = (direction) => {
            if (!scrollRef.current) return;

            const amount = 360; // card width
            scrollRef.current.scrollBy({
                left: direction === "backward" ? -amount : amount,
                behavior: "smooth"
            })
        }

        return (
            <main className={`font-body relative bg-background flex flex-col`}>

                {/* Hero section */}
                <section className=" relative h-screen w-full overflow-hidden">
                    {/* Mobile hero image */}
                    <img
                        src={mobilePoster}
                        alt="hero"
                        className={`md:hidden w-full h-full object-cover`}
                    />
                    {/* Desktop hero video */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={posterUrl}
                        className="hidden md:block md:absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                    {/* Mobile hero buttons*/}
                    <div className="md:hidden absolute bottom-10 w-full left-0 z-10 flex flex-col items-center justify-center gap-3 p-1">
                        <button
                            className={`bg-neutral text-primary text-lg font-bold w-3/4 px-5 py-3 rounded-md`}
                        >تصفح القائمة</button>
                        <button
                            className={`bg-transparent text-neutral border border-neutral text-lg font-semibold w-3/4 px-5 py-3 rounded-md`}
                        >تواصل معنا</button>
                    </div>

                    {/* Desktop hero headers */}
                    <div className={`hidden absolute top-90 w-full md:flex justify-between items-start px-20`}>
                        <div className={`flex flex-col items-center justify-center gap-10`}>
                            <div className={`font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5`}>
                                <span>حلويات</span> بتفرح الألب
                            </div>
                            <GalleryButton link={`#`} text={`القائمة`} showTail={false}/>
                        </div>
                        <div className={`flex flex-col items-center justify-center gap-10`}>
                            <div className={`font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5`}>
                            من المطبخ <span>للبيت</span>
                            </div>
                            <GalleryButton link={`#`} text={`المعرض`}/>
                        </div>
                    </div>
                </section>

                {/* home body */}
                <div className={`w-full flex flex-col justify-center`}>
                    {/* About section */}
                    <section className={`section justify-between`}>
                        {/* Right section (text) */}
                        <div className={`flex flex-col justify-center items-start gap-10`}>
                            {/* Tagline */}
                            <div className={`tagline`}>
                                حكايتنا مع المذاق
                            </div>
                            {/* Title */}
                            <div className={`title max-w-[80%]`}>
                                نحول شغف الطفولة الى قطع فنية تخلّد أثمن ذكراياتكم
                            </div>
                            {/* Description */}
                            <div className={`max-w-[80%] text-base font-light`}>
                                بدأت رحلة «سوسن كيك» من حب التفاصيل الصغيرة ورائحة الكيك المخبوز بحب في مطبخ عائلي دافئ. اليوم، ندمج أرقى أساليب المعجنات الفرنسية مع النكهات العربية الأصيلة، لنصنع لكل احتفال كعكة فريدة تحكي قصتكم بمزيج ساحر من النعومة والتوازن.
                            </div>
                            {/* Panels */}
                            <div className={`w-[80%] flex items-center justify-between gap-5`}>
                                <div className={` w-40 h-30 flex flex-col justify-center items-center gap-1 bg-gray rounded-sm`}>
                                    <div className={` text-dark text-lg font-medium `}>
                                        45+
                                    </div>
                                    <div className={`text-xs font-semibold`}>
                                        عميل سعيد
                                    </div>
                                </div>
                                <div className={` w-40 h-30 flex flex-col justify-center items-center gap-1 bg-gray rounded-sm`}>
                                    <div className={` text-dark text-lg font-medium `}>
                                        180+
                                    </div>
                                    <div className={`text-xs font-semibold`}>
                                        وصفة مبتكرا
                                    </div>
                                </div>
                                <div className={` w-40 h-30 flex flex-col justify-center items-center gap-1 bg-gray rounded-sm`}>
                                    <div className={` text-dark text-lg font-medium `}>
                                        100%
                                    </div>
                                    <div className={`text-xs font-semibold`}>
                                        مكونات طبيعية
                                    </div>
                                </div>
                            </div>
                            <a
                                className={`flex justify-center items-center gap-1 text-sm text-dark cursor-pointer`}
                                href={`#`}
                            >
                                <span className={`font-semibold`}>
                                     تعرف على دورات الشبف سوسن للمحترفين
                                </span>
                                <ArrowLeft size={20}/>
                            </a>
                        </div>

                        {/* Left section (image grid) */}
                        <div className="flex gap-7 ">

                            {/* Right column */}
                            <div className="flex flex-col gap-7 w-70">
                                <div></div>
                                <div className="bg-light rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-white">
                                        <img
                                            src={quality}
                                            alt="quality"
                                            className={`w-7`}
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg">جوائز الحرفة</h3>
                                    <p className="text-sm text-black">
                                        أفضل بوتيك كيك مبتكر في الرياض لعامين متتاليين
                                    </p>
                                </div>

                                <img
                                    src="/design/bride.png"
                                    className="rounded-2xl w-full h-60 object-cover object-top"
                                    alt={`image`}
                                />
                            </div>

                            {/* Left column */}
                            <div className="flex flex-col gap-7 w-70">
                                <img
                                    src="/design/love.png"
                                    className="rounded-2xl w-full h-60 object-cover object-center"
                                    alt={`image`}
                                />

                                <div className="bg-gray rounded-2xl p-6 flex flex-col items-center text-center gap-2">
                                    <div className="text-3xl font-bold text-dark">+15</div>
                                    <p className="text-sm text-black">
                                        عاماً من الشغف والابتكار في صناعة الحلويات الراقية
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Products section */}
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

                    {/* Menu section */}
                    <section className={`section flex-col gap-20 bg-background`}>
                        {/* Header */}
                        <div className={`flex flex-col items-center justify-center gap-5`}>
                            {/* Tagline */}
                            <div className={`tagline `}>
                                قائمة المني كيك
                            </div>
                            {/* Title */}
                            <div className={`title`}>
                                حلوياتنا تكفي و تزيد
                            </div>
                            {/* Description */}
                            <div className={`text-sm text-gray-500`}>
                                دليلك لمقاسات وأسعار ونكهات الميني كيك المحضّرة يومياً بأجود المكونات
                            </div>
                        </div>
                        {/* Menu container */}
                        <div className={`w-full flex  items-start justify-start gap-5`}>
                            {/* Right section */}
                            <div className={`w-[60%] bg-neutral py-10 px-20 rounded-sm flex flex-col gap-10`}>
                                {/* Header */}
                                <div className={`flex items-start justify-between`}>
                                    <div className={`flex items-center gap-2`}>
                                        {/* Icon */}
                                        <div className={`bg-light w-10 h-10 rounded-full flex items-center justify-center`}>
                                            <img
                                                src={category}
                                                alt="category"
                                                className={`w-6`}
                                            />
                                        </div>
                                        <div className={`flex flex-col gap-2`}>
                                            {/* Title */}
                                            <div className={`title text-md`}>الأحجام والأسعار</div>
                                            {/* Subtitle */}
                                            <div className={`text-sm text-gray-500`}>حسب عدد الأشخاص وتفاصيل التزيين</div>
                                        </div>
                                    </div>
                                    {/* Tagline */}
                                    <div className={`tagline `}>
                                        تصميم حسب الطلب
                                    </div>
                                </div>
                                {/* Items container */}
                                <div className={`flex flex-col gap-5`}>
                                    <div className={`flex items-start justify-between bg-secondary-light py-5 px-10 rounded-sm`}>
                                        <div className={`flex items-center gap-5`}>
                                            {/* Icon */}
                                            <div className={`flex items-center justify-center`}>
                                                <img
                                                    src={cake1}
                                                    alt="cake1"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            {/* Info */}
                                            <div>
                                                {/* Name */}
                                                <div className={`text-base font-semibold`}>ميني كيك</div>
                                                {/* How many persons */}
                                                <div className={`text-sm text-gray-500`}>
                                                    يكفي 2 - 3 أشخاص
                                                </div>
                                            </div>

                                        </div>
                                        {/* Pricing */}
                                        <div className={`flex flex-col items-end`}>
                                            {/* Price */}
                                            <div className={`text-md text-dark font-semibold`}>يبدأ من 6 دنانير</div>
                                            {/* Note */}
                                            <div className={`text-sm text-gray-500`}>حسب التزيين</div>
                                        </div>
                                    </div>
                                    <div className={`flex items-start justify-between bg-secondary-light py-5 px-10 rounded-sm`}>
                                        <div className={`flex items-center gap-5`}>
                                            <div className={`flex items-center justify-center`}>
                                                <img
                                                    src={cake2}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            {/* Info */}
                                            <div>
                                                {/* Name */}
                                                <div className={`text-base font-semibold`}>ميني كيك</div>
                                                {/* How many persons */}
                                                <div className={`text-sm text-gray-500`}>
                                                    يكفي 4 - 5 أشخاص
                                                </div>
                                            </div>

                                        </div>
                                        {/* Pricing */}
                                        <div className={`flex flex-col items-end`}>
                                            {/* Price */}
                                            <div className={`text-md text-dark font-semibold`}>يبدأ من 7 دنانير</div>
                                            {/* Note */}
                                            <div className={`text-sm text-gray-500`}>حسب التزيين</div>
                                        </div>
                                    </div>
                                    {/* Most popular */}
                                    <div className={`relative flex items-start justify-between bg-secondary-light py-5 px-10 rounded-sm
                                                     border-5 border-dark 
                                                     `}>
                                        <div className={`flex items-center gap-5`}>
                                            <div className={`flex items-center justify-center`}>
                                                <img
                                                    src={cake3}
                                                    alt="cake3"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            {/* Info */}
                                            <div>
                                                {/* Name */}
                                                <div className={`text-base font-semibold`}>ميني كيك الحفلات</div>
                                                {/* How many persons */}
                                                <div className={`text-sm text-gray-500`}>
                                                    يكفي 6 - 8 أشخاص
                                                </div>
                                            </div>
                                            {/* Label */}
                                            <div className={`absolute left-5 -top-4 z-50 flex items-center justify-center gap-2 text-neutral bg-dark rounded-md px-5 py-1 text-sm`}>
                                                <span>الأكثر طلبا </span>
                                                <Sparkles
                                                    size={18}
                                                    className={`text-yellow-400 fill-yellow-400`}
                                                />
                                            </div>
                                        </div>
                                        {/* Pricing */}
                                        <div className={`flex flex-col items-end`}>
                                            {/* Price */}
                                            <div className={`text-md text-dark font-semibold`}>يبدأ من 8 دنانير</div>
                                            {/* Note */}
                                            <div className={`text-sm text-gray-500`}>حسب التزيين</div>
                                        </div>
                                    </div>
                                    <div className={`flex items-start justify-between bg-secondary-light py-5 px-10 rounded-sm`}>
                                        <div className={`flex items-center gap-5`}>
                                            <div className={`flex items-center justify-center`}>
                                                <img
                                                    src={cake4}
                                                    alt="cake4"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            {/* Info */}
                                            <div>
                                                {/* Name */}
                                                <div className={`text-base font-semibold`}>ميني كيك العائلة</div>
                                                {/* How many persons */}
                                                <div className={`text-sm text-gray-500`}>
                                                    يكفي 8 - 10 أشخاص
                                                </div>
                                            </div>

                                        </div>
                                        {/* Pricing */}
                                        <div className={`flex flex-col items-end`}>
                                            {/* Price */}
                                            <div className={`text-md text-dark font-semibold`}>يبدأ من 10 دنانير</div>
                                            {/* Note */}
                                            <div className={`text-sm text-gray-500`}>حسب التزيين</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Note */}
                                <div className={`flex items-center gap-3  py-1 px-3 w-fit rounded-[10px] text-base text-gray-500`}>
                                    <Info size={20} />
                                    <div>
                                         يمكنك اختيار العبارات والرسومات والألوان التي تفضلينها لكيكتك الخاصة.
                                    </div>
                                </div>
                            </div>
                            {/* Left section */}
                            <div className={`bg-neutral w-[40%] py-10 px-20 rounded-sm flex flex-col gap-10`}>
                                {/* Dressing container */}
                                <div className={`flex flex-col gap-5`}>
                                    {/* Header */}
                                    <div className={`flex items-center gap-2`}>
                                        {/* Icon */}
                                        <div className={` w-10 h-10 rounded-full`}>
                                            <img
                                                src={pastryBag}
                                                alt="cake2"
                                                className={`w-10`}
                                            />
                                        </div>
                                        <div className={`flex flex-col gap-2`}>
                                            {/* Title */}
                                            <div className={`title text-md`}>الحشوات المتوفرة</div>
                                            {/* Subtitle */}
                                            <div className={`text-sm text-gray-500`}>تشكيلة الكريمات الفاخرة</div>
                                        </div>
                                    </div>

                                    {/* Dressing Items container */}
                                    <div className={`grid grid-cols-2  gap-5`}>
                                        <div className={`flex items-center justify-start gap-2 bg-gray py-2 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-dark rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>نوتيلا</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-secondary rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>لوتس</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-green-600 rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>بستاشيو</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-primary rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>فراولة</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-secondary rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>كراميل</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-orange-500 rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>مانغو</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-dark rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>فيريرو روشيه</div>
                                        </div>
                                        <div className={` flex items-center justify-start gap-2 bg-gray py-4 px-4 rounded-sm`}>
                                            <div className={`w-5 h-5 bg-gray-200 rounded-full`}></div>
                                            <div className={`text-base font-semibold `}>كريمة الجبنة</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Fruits container */}
                                <div className={`flex flex-col gap-5`}>
                                    <div className={`text-base font-bold`}>الفواكه المنعشة</div>
                                    <div className={`grid grid-cols-2 gap-5`}>
                                        <div className={`flex items-center gap-2 bg-pink-200 py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={strawberry}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>فراولة</div>
                                        </div>
                                        <div className={`flex items-center gap-2 bg-orange-200 py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={mango}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>مانجا</div>
                                        </div>
                                        <div className={`flex items-center gap-2 bg-yellow-200 py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={pineapple}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>أناناس</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Others */}
                                <div className={`flex flex-col gap-5`}>
                                    <div className={`text-base font-bold`}>مكسرات</div>
                                    <div className={`grid grid-cols-2 gap-5`}>
                                        <div className={`flex items-center gap-2 bg-[#D9B382] py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={almond}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>لوز</div>
                                        </div>
                                        <div className={`flex items-center gap-2 bg-[#E8D2A6] py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={walnut}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>جوز</div>
                                        </div>

                                        <div className={`flex items-center gap-2 bg-[#F0DFC0] py-1 px-2 rounded-sm`}>
                                            <div className={`w-5 h-5  rounded-full`}>
                                                <img
                                                    src={cashew}
                                                    alt="cake2"
                                                    className={`w-10`}
                                                />
                                            </div>
                                            <div className={`text-base font-semibold`}>كاجو</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Note */}
                                <div className={`w-full flex items-center gap-3  rounded-[10px] text-base text-gray-500`}>
                                    <Info size={20} />
                                    <div>يضاف مبلغ إضافي عند اختيار الفواكه أو الجبنة او المكسرات</div>
                                </div>
                            </div>
                        </div>
                        {/* Delivery */}
                        <div className={`w-full flex items-start justify-center gap-50 bg-neutral rounded-sm p-10`}>
                            <div className={`flex flex-col gap-5`}>
                                <div className={`text-md font-semibold flex items-center gap-2`}>
                                    <img src={truck} alt="truck" className={`w-15`}/>
                                    <div>التوصيل</div>
                                </div>
                                <div className={`text-sm font-bold text-gray-500`}>التوصيل متوفر لجميع الجامعات وكافة المناطق </div>
                                <div className={`text-sm font-bold text-gray-500`}>إمكانية الاستلام مباشرة من موقعنا 📍</div>
                            </div>
                            <div className={`flex flex-col gap-5`}>
                                <div className={`text-md font-semibold flex items-center gap-5`}>
                                    <img src={contact} alt="contact" className={`w-10`}/>
                                    <div>
                                         تواصل معنا للطلب المباشر
                                    </div>
                                </div>
                                <div className={`flex flex-col gap-5 px-2`}>
                                    <div className={`flex items-center gap-2 cursor-pointer`}>
                                        <a className={`w-7`}>
                                            <img
                                                src={whatsapp}
                                                alt="whatsapp"
                                                className={``}
                                            />
                                        </a>
                                        <div dir={`ltr`}>
                                            +962 xxxxxxxxx
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 cursor-pointer`}>
                                        <a className={`w-7`}>
                                            <img
                                                src={instagram}
                                                alt="whatsapp"
                                                className={``}
                                            />
                                        </a>
                                        <div dir={`ltr`}>
                                            Sawsan_cake
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 cursor-pointer`}>
                                        <a className={`w-7`}>
                                            <img
                                                src={facebook}
                                                alt="whatsapp"
                                                className={``}
                                            />
                                        </a>
                                        <div dir={`ltr`}>
                                            Sawsan Cake
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-center gap-10`}>
                                <div className={`text-md font-semibold`}>نختار لك الأفضل بمكوناتنا المميزة ❤️</div>
                                <button className={`text-neutral bg-dark text-base font-semibold py-2 px-10 rounded-md cursor-pointer
                                                      hover:text-dark hover:bg-neutral border-5 hover:border-dark transition-all ease-in-out duration-150`}
                                >تصفح المعرض</button>
                            </div>
                        </div>
                    </section>

                    {/* Online courses section */}
                    <section className={`section flex-col items-start gap-5 bg-background`}>
                        {/* Header */}
                        <div className={`w-full flex justify-between items-start`}>
                            <div className={`flex flex-col gap-5`}>
                                {/* Tagline */}
                                <div className={`tagline`}>
                                    أكاديمية سوسن كيك
                                </div>
                                {/* Title */}
                                <div className={`title`}>
                                    احترفي فنون الكيك من منزلك
                                </div>
                            </div>
                            {/* Description */}
                            <div className={`text-base text-gray-500 max-w-120`}>
                                دورات تدريبية مسجلة بجودة 4K مع إشراف مباشر وتطبيقات خطوة بخطوة تضمن نقلك من الهواية إلى الاحتراف التجاري.
                            </div>
                        </div>
                        {/* Cards container */}
                        <div className={`w-full flex items-start gap-10 `}>
                            {/*Right*/}
                            <div className={`w-1/2 flex flex-col gap-10 bg-neutral rounded-sm p-10`}>
                              <div className={`flex flex-col gap-10`}>
                                  {/* Trailer */}
                                  <div className={`bg-red-500 w-full h-80 rounded-sm flex items-center justify-center`}>
                                      <div className={`bg-neutral text-black p-5 rounded-full border border-black`}>
                                        <Play size={24} />
                                      </div>
                                  </div>
                                  {/* Header */}
                                  <div className={`flex flex-col gap-2 max-w-120`}>
                                      {/* Title */}
                                      <div className={`text-lg font-semibold `}>
                                          دبلوم تصميم وتزيين كيك المناسبات الشامل
                                      </div>
                                      {/* Description */}
                                      <div className={`text-base text-gray-500`}>
                                          من تحضير الكيك الإسفنجي المحكم وكريمات الحشو المقاومة للحرارة، إلى النحت ثلاثي الأبعاد وتقنيات الألوان الحديثة.
                                      </div>
                                  </div>
                              </div>
                                {/* Info */}
                                <div className={`flex flex-col gap-3`}>
                                    <div className={`flex items-center gap-2 text-sm text-gray-500 font-bold`}>
                                        <Check size={20} />
                                        <div>
                                            وصول غير محدود مدى الحياة لكافة التحديثات
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 text-sm text-gray-500 font-bold`}>
                                        <Check size={20} />
                                        <div>
                                            وصول غير محدود مدى الحياة لكافة التحديثات
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 text-sm text-gray-500 font-bold`}>
                                        <Check size={20} />
                                        <div>
                                            وصول غير محدود مدى الحياة لكافة التحديثات
                                        </div>
                                    </div>
                                </div>
                                {/* free label */}
                                <a href={`https://www.youtube.com/@SawsanQdaisat`} className={`w-fit flex items-center justify-end`}>
                                    <div className={`text-sm font-bold text-green-600`}>مجانا على </div>
                                    <div className={`w-20`}>
                                        <img src={youtubeLogo} alt="youtube"/>
                                    </div>
                                </a>
                            </div>
                            {/*Left*/}
                            <div className={`w-1/2 flex flex-col gap-5 bg-neutral rounded-sm p-10`}>
                                {/* YouTube Channel */}
                                <div className={`relative w-full h-80`}>
                                    <img
                                        src={youtube}
                                        alt="banner"
                                        className={`w-full h-full object-cover object-center rounded-sm`}
                                    />
                                    {/* Avatar */}
                                    <div className={`absolute w-10 h-10`}>
                                        <img
                                            src={avatar}
                                            alt="avatar"
                                            className={`w-full h-full object-cover object-center rounded-full`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* In person coursers section*/}
                    {/* NOTE: swapped order — content/header block moves first (renders on the
                        right), image moves second (renders on the left) */}
                    <section className={`section`}>
                        {/* Right section (content) */}
                        <div>
                            {/* Header */}
                            <div>
                                {/* Tagline */}
                                <div>
                                    تجربة حضورية تفاعلية
                                </div>
                                {/* Title */}
                                <div>
                                    ورش العمل الحية في أستوديو سوسن بالرياض
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                انغمسي في عالم الحلويات الاحترافي داخل مطبخنا المجهز بأحدث المعدات. مقاعد محدودة جداً لضمان المتابعة الفردية لكل متدربة وصناعة كيكتك الخاصة بيدك من الصفر حتى استلام بوكس التغليف الفاخر.
                            </div>
                            {/* Course Info */}
                            <div>
                                <div>
                                    card 1
                                </div>
                                <div>
                                    card 2
                                </div>
                            </div>
                            {/* Bottom section */}
                            <div>
                                {/* Max attenders number */}
                                <div>
                                    7 مقاعد فقط لهذه الورشة
                                </div>
                                {/* Join button */}
                                <button>
                                    حجز مقعد حضوري
                                </button>
                            </div>
                        </div>
                        {/* Left section (image) */}
                        <div>
                            <div>
                                image
                            </div>
                        </div>
                    </section>

                    {/* Contact us section*/}
                    {/* NOTE: swapped order — form moves first (renders on the right),
                        cards move second (renders on the left) */}
                    <section className={`section`}>
                        {/* Right section (form) */}
                        <div>
                            form
                        </div>
                        {/* Left section (cards) */}
                        <div>
                            <div>
                                card 1
                            </div>
                            <div>
                                card 2
                            </div>
                        </div>
                    </section>

                </div>

            </main>
        );
    }