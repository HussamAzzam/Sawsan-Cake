import { Play, Check } from "lucide-react"
import { youtube, youtubeLogo, avatar } from "@/assets/assets"
const OnlineCourses = () => {
    return (

    <section className={`section  flex-col items-center lg:items-start gap-5 bg-background`}>
        {/* Header */}
        <div className={`w-full flex flex-col justify-between items-center lg:items-start gap-3`}>
            <div className={`flex flex-col gap-5 items-center lg:items-start`}>
                {/* Tagline */}
                <div className={`tagline`}>
                    أكاديمية سوسن كيك
                </div>
                {/* Title */}
                <div className={`title`}>
                    احترفي فنون الكيك  مجانا من منزلك
                </div>
            </div>
            {/* Description */}
            <div className={`text-base text-gray-500 max-w-160 text-center`}>
                نقدم لكِ في قناتنا الرسمية شروحات تفصيلية خطوة بخطوة من الصفر حتى الإتقان، مع أسرار الكريمة
                المتماسكة، تقنيات النحت، وتشكيل عجينة السكر بأسلوب مبسط وشغف حقيقي.
            </div>
        </div>
        {/* Cards container */}
        <div className={`w-full h-full flex-1 flex flex-col items-center lg:flex-row lg:items-start gap-10 `}>
           {/* Video container */}
            <div className={`w-full h-100 lg:w-[60%] lg:h-full bg-gray rounded-sm flex items-center justify-center`}>
                <div className={`p-5 rounded-full bg-dark cursor-pointer`}>
                    <Play
                        size={40}
                        className={`fill-primary text-primary`}
                    />
                </div>
            </div>

            {/* Channel Info */}
            <div className={`w-full lg:w-[40%] h-full flex flex-col gap-10`}>
                <div className={`bg-white rounded-sm shadow-md flex p-5 items-center justify-between gap-2`}>
                    <div className={`flex items-center justify-center gap-5`}>
                        <span className={`w-30 lg:w-20 rounded-full`}>
                            <img
                                src={avatar}
                                alt="avatar"
                                className={`w-full h-full object-cover object-center rounded-full`}
                            />
                        </span>
                        <span className={` flex flex-col gap-2 items-start justify-start`}>
                            <div className={`text-xs lg:text-base font-bold flex flex-col lg:flex-row items-end justify-end`} dir={`ltr`}>
                                <span className={`w-full`}>Sawsan Qdaisat |</span>
                                <span>سوسن قديسات</span>
                            </div>
                            <div className={`text-xs lg:text-base text-gray-500 font-medium`}>
                                145 ألف مشترك • +180 فيديو
                            </div>
                        </span>
                    </div>
                    <a
                        href=""
                        className={` text-xs lg:text-base text-center bg-dark text-neutral py-2 px-5 rounded-md border-3 border-dark font-medium
                                      hover:bg-neutral hover:text-dark transition-all ease-in-out duration-100
                                    
                                      `}
                    >
                        اشترك الان
                    </a>
                </div>

                {/* Panels */}
                <div className={`w-full h-30 flex items-center justify-between gap-3 lg:gap-5 bg-gray rounded-sm p-2 lg:p-5`}>
                    <div className={`w-40 h-full flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark text-center`}>+145K</span>
                        <span className={`text-sm text-gray-500 text-center`}>مشتركة ومشترك</span>
                    </div>
                    <div className={`w-40 h-full flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark text-center`}>+180</span>
                        <span className={`text-sm text-gray-500 text-center`}>درس وورشة مجانية</span>
                    </div>
                    <div className={`w-40 h-full flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark text-center`}>+1M</span>
                        <span className={`text-sm text-gray-500 text-center`}>مشاهدة</span>
                    </div>
                </div>

                {/* Most popular */}
                <div className={`relative w-full flex flex-col md:flex-row items-center justify-between px-5 py-10 md:px-5 md:py-5 bg-gray rounded-sm gap-5 md:gap-0
                                 border-4 border-dark
                            `}>
                    <div className={`md:h-30 flex flex-col md:flex-row items-center gap-5 `}>
                        {/* Poster */}
                        <div className={`h-50 md:h-full w-full  md:aspect-square bg-neutral flex justify-center items-center  rounded-sm`}>
                            <Play size={20} />
                        </div>
                        {/* Info */}
                        <div className={`flex flex-col gap-2`}>
                            <div className={`text-sm font-bold`}>
                                كيك الفراولة الملكي بحشوة الكاسترد الفاخرة
                            </div>
                            <div className={`text-sm text-gray-500`}>
                                100k مشاهدة
                            </div>
                        </div>
                    </div>
                    <a
                        href=""
                        className={`flex items-center justify-center gap-2
                                  bg-dark text-neutral py-2 px-5 rounded-md border-3 border-dark font-medium
                                  hover:bg-neutral hover:text-dark transition-all ease-in-out duration-100
                                      `}
                    >
                        <span>
                             شاهد
                        </span>
                        <Play size={20} className={`rotate-180`}/>
                    </a>
                    <div className={`absolute -top-6 left-5 bg-background border-4 border-dark text-dark rounded-md py-2 px-5 text-sm font-bold`}>
                        الاكثر مشاهدة
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default OnlineCourses;