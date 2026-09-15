import {StepBack, StepForward} from "lucide-react";

const AboutUs = () => {
    return (
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
    )
}

export default AboutUs;