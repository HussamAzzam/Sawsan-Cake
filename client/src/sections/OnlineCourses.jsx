import { Play, Check } from "lucide-react"
import { youtube, youtubeLogo, avatar } from "@/assets/assets"
const OnlineCourses = () => {
    return (

    <section className={`section flex-col items-start gap-5 bg-background`}>
        {/* Header */}
        <div className={`w-full flex flex-col justify-between items-start gap-3`}>
            <div className={`flex flex-col gap-5`}>
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
            <div className={`text-base text-gray-500 max-w-160`}>
                نقدم لكِ في قناتنا الرسمية شروحات تفصيلية خطوة بخطوة من الصفر حتى الإتقان، مع أسرار الكريمة
                المتماسكة، تقنيات النحت، وتشكيل عجينة السكر بأسلوب مبسط وشغف حقيقي.
            </div>
        </div>
        {/* Cards container */}
        <div className={`w-full h-full flex-1 flex items-start gap-10 `}>
           {/* Video container */}
            <div className={`w-[60%] h-full bg-gray rounded-sm flex items-center justify-center`}>
                <div className={`p-5 rounded-full bg-dark cursor-pointer`}>
                    <Play
                        size={40}
                        className={`fill-primary text-primary`}
                    />
                </div>
            </div>

            {/* Channel Info */}
            <div className={`w-[40%] h-full flex flex-col gap-10`}>
                <div className={`bg-white rounded-sm shadow-md flex p-5 items-center justify-between gap-2`}>
                    <div className={`flex items-center justify-center gap-5`}>
                        <span className={`w-20 rounded-full`}>
                            <img
                                src={avatar}
                                alt="avatar"
                                className={`w-full h-full object-cover object-center rounded-full`}
                            />
                        </span>
                        <span className={` flex flex-col gap-2`}>
                            <div className={`text-md font-bold`} dir={`ltr`}>
                               Sawsan Qdaisat | سوسن قديسات
                            </div>
                            <div className={`text-base text-gray-500 font-medium`}>
                                145 ألف مشترك • +180 فيديو
                            </div>
                        </span>
                    </div>
                    <a
                        href=""
                        className={`bg-dark text-neutral py-2 px-5 rounded-md border-3 border-dark font-medium
                                      hover:bg-neutral hover:text-dark transition-all ease-in-out duration-100
                                      `}
                    >
                        اشترك الان
                    </a>
                </div>

                {/* Panels */}
                <div className={`w-full flex items-center justify-between gap-5 bg-gray rounded-sm p-5`}>
                    <div className={`w-40 h-30 flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark `}>+145K</span>
                        <span className={`text-sm text-gray-500`}>مشتركة ومشترك</span>
                    </div>
                    <div className={`w-40 h-30 flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark `}>+180</span>
                        <span className={`text-sm text-gray-500`}>درس وورشة مجانية</span>
                    </div>
                    <div className={`w-40 h-30 flex flex-col justify-center items-center gap-2 bg-neutral rounded-sm p-2`}>
                        <span className={`text-md font-bold text-dark `}>+1M</span>
                        <span className={`text-sm text-gray-500`}>مشاهدة</span>
                    </div>
                </div>

                {/* Most popular */}
                <div className={`relative w-full  flex items-center justify-between p-5 bg-gray rounded-sm
                                 border-4 border-dark
                            `}>
                    <div className={`h-25 flex items-center gap-5 `}>
                        {/* Poster */}
                        <div className={`h-full aspect-video bg-neutral flex justify-center items-center  rounded-sm`}>
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