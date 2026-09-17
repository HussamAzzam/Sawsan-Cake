import { Calendar, MapPin, Armchair } from "lucide-react"
import { courseImage } from "@/assets/assets.js"

const InPersonCourses = () => {

    return (
        <section className={`section justify-center items-center gap-5 `}>
           <div className={`w-full flex justify-center items-center gap-5 bg-gray p-10 rounded-sm`}>
                {/* Right */}
               <div className={`w-1/2 flex flex-col gap-20`}>
                    {/* Header */}
                    <div className={`flex flex-col gap-5 `}>
                        <div className={`tagline bg-secondary`}>تجربة حضورية تفاعلية</div>
                        <div className={`title`}>
                            ورش العمل الحية في أستوديو سوسن بالأردن
                        </div>
                        <div className={`description text-base max-w-160`}>
                            انغمسي في عالم الحلويات الاحترافي داخل مطبخنا المجهز بأحدث المعدات. مقاعد محدودة جداً
                            لضمان المتابعة الفردية لكل متدربة وصناعة كيكتك الخاصة بيدك من الصفر حتى استلام بوكس
                            التغليف الفاخر.
                        </div>
                    </div>

                   {/* Info */}
                   <div className={`flex items-start justify-start max-w-160 gap-5`}>
                       {/* Date */}
                       <div className={`w-1/2 flex flex-col gap-5 bg-neutral rounded-sm p-5`}>
                           <div className={`flex items-center justify-start gap-2 text-md font-semibold`}>
                               <Calendar size={24} />
                               <div>
                                   الورشة القادمة
                               </div>
                           </div>
                           <div className={`description text-base font-semibold flex flex-col gap-2`}>
                               <div>
                                   السبت، ١٨ أبريل
                               </div>
                               <div>
                                   ٢٠٢٥ • من ٤ م إلى
                                   ٩ م
                               </div>
                           </div>
                       </div>

                       {/* Location */}
                       <div className={`w-1/2  flex flex-col gap-5 bg-neutral rounded-sm p-5`}>
                           <div className={`flex items-center justify-start gap-2 text-md font-semibold`}>
                               <MapPin size={24} />
                               <div>
                                   الموقع
                               </div>
                           </div>
                           <div className={`description text-base font-semibold flex flex-col gap-2`}>
                               <div>
                                   استوديو سوسن كيك
                               </div>
                               <div>
                                   الأردن, اربد
                               </div>
                           </div>
                       </div>

                   </div>
                       <div className={`flex items-end justify-between max-w-160 gap-5`}>
                           <div className={`flex items-center gap-2`}>
                               <div className={`w-3 h-3 bg-dark rounded-full`}></div>
                               <div className={`text-dark text-base font-light`}>8 مقاعد فقط في هذه الورشة</div>
                           </div>
                           <a
                               href=""
                               className={`bg-dark text-neutral py-4 px-6 rounded-md border-3 border-dark font-medium
                                      hover:bg-neutral hover:text-dark transition-all ease-in-out duration-100
                                      `}
                           >
                               تواصل معنا
                           </a>
                       </div>
               </div>

               {/* Left */}
               <div className={`w-1/2 flex justify-center items-center gap-5 bg-gray`}>
                   <img
                       src={courseImage}
                        alt="course"
                        className={`w-full h-full object-cover object-center rounded-sm`}
                   />
               </div>
           </div>
        </section>
    )
}

export default InPersonCourses;