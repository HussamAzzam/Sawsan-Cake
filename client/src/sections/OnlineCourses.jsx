const OnlineCourses = () => {
    return (

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
    )
}

export default OnlineCourses;