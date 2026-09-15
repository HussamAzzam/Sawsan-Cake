import { useState } from "react";

const InPersonCourses = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
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
    )
}

export default InPersonCourses;