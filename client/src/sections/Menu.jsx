import {Check, Play} from "lucide-react";

const Menu = () => {
    return (
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
    )
}

export default Menu