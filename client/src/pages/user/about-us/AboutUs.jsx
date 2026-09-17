import {
    Heart,
    Sparkles,
    Star,
    BookOpen,
    ShieldCheck,
    Award,
    PenTool,
    BadgeCheck,
    Clock,
    PartyPopper,
    Store,
} from "lucide-react";

/**
 * Sawsan Cake — "About Us" section
 * Story hero + stats band + values + chef spotlight + flavor philosophy +
 * closing CTA. Navbar and footer are intentionally excluded — mount this
 * inside your existing page layout.
 *
 * Built to match the shared Tailwind v4 @theme tokens (primary, light, dark,
 * secondary, tertiary, background, gray, fonts Lalezar/Changa).
 */

const stats = [
    {
        icon: ShieldCheck,
        value: "١٠٠٪",
        label: "شغف ونقاء طبيعي",
        desc: "نكهات نقية خالية تماماً من المواد المصنّعة الرخيصة",
    },
    {
        icon: BookOpen,
        value: "+١٨٠",
        label: "ورشة عمل حضورية",
        desc: "تخريج خبيرات وفنانات مبدعات في الوطن العربي",
    },
    {
        icon: Star,
        value: "+٤٥ ألف",
        label: "عميل سعيد",
        desc: "ابتسامات رافقت كل احتفال ومناسبة خاصة",
    },
    {
        icon: Award,
        value: "+١٠",
        label: "سنوات خبرة فنية",
        desc: "من الشغف المنزلي إلى ريادة فن الكيك العصري",
    },
];

const values = [
    {
        icon: BookOpen,
        title: "التمكين ونقل المعرفة",
        desc: "لم نبق أسرار المهنة داخل مطبخنا، بل أسسنا أكاديمية سوسن لتعليم فنون الزينة وصناعة الكيك عبر ورش عمل متقدمة ومحتوى مجاني على يوتيوب ومنصاتنا الرقمية.",
        footer: "أكاديمية تعلّم الآلاف يومياً",
    },
    {
        icon: PenTool,
        title: "فن النحت وتفاصيل الكيك",
        desc: "نتعامل مع كل قالب كيك كلوحة زينة؛ من درجات التوت الوردي الدافئ، حواف الكريمة الحادة، والتوزيع الدقيق للأزهار الصالحة للأكل وأوراق الذهب عيار ٢٤.",
        footer: "دقة هندسية وأناقة جلية",
    },
    {
        icon: Award,
        title: "جودة أوروبية أصيلة",
        desc: "نستورد زبدتنا الطازجة من مزارع نيوزيلندا الفرنسية وشوكولاتة التغطية البلجيكية الفاخرة مع مستخلص الفانيليا الطبيعي، لا نرضى بأقل من الكمال في مكوناتنا.",
        footer: "مكونات نقية ومعتمدة",
    },
];

const flavorStats = [
    { label: "توازن النكهات الطبيعية", value: 98 },
    { label: "مكونات مستوردة فاخرة", value: 100 },
    { label: "رضا ضيوفنا عن التجربة", value: 99.4 },
];

export default function AboutUs() {
    return (
        <div dir="rtl" className="bg-background font-body text-dark pt-nav">
            {/* ---------------- Story hero ---------------- */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src="/images/about-cake.jpg"
                                alt="كيك زفاف بطبقات وردية مزين بالتوت"
                                className="h-[420px] w-full object-cover"
                            />
                        </div>
                        <span className="absolute right-6 top-6 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-primary text-center text-neutral shadow-md">
              <Heart size={18} className="fill-neutral" />
              <span className="text-xs font-bold leading-tight">
                صنع بحب
                <br />
                Berry &amp; Butter
              </span>
            </span>
                        <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-neutral px-5 py-3 shadow-md">
                            <div className="text-right">
                                <p className="text-sm font-bold text-dark">حرفية يدوية ١٠٠٪</p>
                                <p className="text-xs text-gray-500">كل تفصيل يُصمم خصيصاً ليناسب لحظتكم</p>
                            </div>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light text-primary">
                <BadgeCheck size={16} />
              </span>
                        </div>
                    </div>

                    {/* Copy */}
                    <div className="order-1 text-right lg:order-2">
            <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-light px-4 py-1.5 text-sm text-dark">
              <Sparkles size={14} />
              حكايتنا ونبض إبداعنا
            </span>
                        <h1 className="font-heading text-3xl leading-tight text-dark sm:text-4xl lg:text-[2.75rem]">
                            قصة بدأت بشغف،
                            <br />
                            وتحولت إلى حلويات تفرّح القلب <Star size={24} className="inline text-primary" />
                        </h1>
                        <p className="mt-6 text-sm leading-8 text-gray-500 sm:text-base">
                            في عام ٢٠١٤، ومن زاوية مطبخ منزلي تفوح منه روائح الفانيليا الفرنسية وخفقات
                            الزبدة النقية، بدأ حلم الشيف سوسن. لم يكن الهدف مجرد خبز قالب كيك، بل نحت
                            تحفة حية تأسر الأعين وتُبهج الحواس. مع كل قطرة توت طبيعي ولمسة سكر رقيقة،
                            تحول الشغف الصادق إلى أرقى بوتيك وأكاديمية حلويات تروي حكاياتكم وتحتفل
                            بمناسباتكم بأسلوب أفخر.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-end gap-4">
                            <button className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-neutral shadow-sm transition-colors hover:opacity-90">
                                استكشفي المنيو الفاخر
                            </button>
                            <button className="flex items-center gap-2 rounded-xl border border-black/10 bg-neutral px-6 py-3 text-sm font-bold text-dark transition-colors hover:border-primary hover:text-primary">
                                اقرأي قصة التأسيس
                                <BookOpen size={16} />
                            </button>
                        </div>
                        <p className="mt-6 flex items-center justify-end gap-2 text-xs text-gray-400">
                            أكثر من ٤٥ ألف عائلة شاركونا لحظات فرحهم
                            <PartyPopper size={14} className="text-primary" />
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------------- Stats band ---------------- */}
            <section className="bg-secondary-bg py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-right">
                        <p className="text-xs font-semibold text-primary">محطات فخرنا</p>
                        <h2 className="mt-2 font-heading text-2xl text-dark sm:text-3xl">
                            أرقام صنعتها ثقتكم على مدار عقد
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map(({ icon: Icon, value, label, desc }) => (
                            <div
                                key={label}
                                className="rounded-2xl bg-neutral p-6 text-center shadow-sm"
                            >
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-light text-primary">
                  <Icon size={18} />
                </span>
                                <p className="font-heading text-3xl text-tertiary">{value}</p>
                                <p className="mt-2 text-sm font-bold text-dark">{label}</p>
                                <p className="mt-1 text-xs leading-6 text-gray-500">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Values ---------------- */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-10 text-right">
                    <p className="text-xs font-semibold text-primary">قيمنا ورؤيتنا الملهمة</p>
                    <h2 className="mt-2 font-heading text-2xl text-dark sm:text-3xl">
                        ركائز تجعل سوسن كيك مختلفاً عن أي تجربة أخرى
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:mr-0 sm:ms-auto">
                        لا نؤمن بالإنتاج التجاري المكرر؛ كل قطعة حلوى تخرج من مطبخنا تحمل توقيعاً
                        فريداً يوازن بين الفخامة المعمارية والطعم الذي يعلق بالذاكرة.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {values.map(({ icon: Icon, title, desc, footer }) => (
                        <div key={title} className="rounded-2xl bg-neutral p-7 text-right shadow-sm">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-light text-primary">
                <Icon size={18} />
              </span>
                            <h3 className="font-heading text-lg text-dark">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-gray-500">{desc}</p>
                            <p className="mt-5 text-xs font-semibold text-tertiary">{footer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------- Chef spotlight ---------------- */}
            <section className="bg-secondary-bg py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Copy */}
                        <div className="order-2 text-right lg:order-1">
              <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-light px-4 py-1.5 text-sm text-dark">
                <Clock size={14} />
                من قلب المطبخ الحرفي
              </span>
                            <blockquote className="font-heading text-2xl leading-snug text-dark sm:text-3xl">
                                "الكيك ليس مجرد مزيج دقيق وسكر، بل ذكرى دافئة تُحفر في القلب للأبد."
                            </blockquote>
                            <p className="mt-6 text-sm leading-8 text-gray-500 sm:text-base">
                                حين بدأت الشيف سوسن مسيرتها، كانت تؤمن بأن المناسبات الاستثنائية تستحق
                                حلوى لا تشبه السائد. فقدت أعواماً في صقل تقنيات الماكارون الفرنسي، وإتقان
                                كريمة الزبدة السويسرية الخفيفة التي تجمع بين الحلاوة المتوازنة والانسيابية
                                الحريرية. اليوم، يعمل داخل بوتيك ومطبخ سوسن فريق من المحترفين الذين
                                يبتكرون على كل مرحلة بكل تفانٍ: طحن حبات الكاكاو العضوي، وتحضير مربيات
                                الفراولة والتوت البري الطازج يدوياً، وحتى تسليم صندوق الحلوى المزيّن
                                بأناقة الحرير بأصغر التفاصيل.
                            </p>
                            <div className="mt-8 flex items-center justify-end gap-3">
                                <div className="text-right">
                                    <p className="font-heading text-lg text-dark">الشيف سوسن الزهراني</p>
                                    <p className="mt-1 flex items-center justify-end gap-2 text-xs font-semibold text-tertiary">
                                        جائزة التميز الحرفي ٢٠٢٣
                                        <Award size={14} />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative order-1 lg:order-2">
                            <div className="overflow-hidden rounded-3xl">
                                <img
                                    src="/images/chef-sawsan.jpg"
                                    alt="الشيف سوسن الزهراني تزيّن كيكة بالورد"
                                    className="h-[460px] w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- Flavor philosophy ---------------- */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-neutral p-10 shadow-sm lg:grid-cols-2">
                    <div className="order-2 space-y-5 lg:order-1">
                        {flavorStats.map((s) => (
                            <div key={s.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-bold text-tertiary">{s.value}٪</span>
                                    <span className="text-dark">{s.label}</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-light">
                                    <div
                                        className="h-full rounded-full bg-tertiary"
                                        style={{ width: `${Math.min(s.value, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-1 text-right lg:order-2">
                        <p className="text-xs font-semibold text-primary">فلسفة التذوق</p>
                        <h2 className="mt-2 font-heading text-2xl text-dark sm:text-3xl">
                            سر النكهة: توازن التوت البري ونعومة الزبدة
                        </h2>
                        <p className="mt-4 text-sm leading-8 text-gray-500 sm:text-base">
                            نبتعد عن محلات الحلويات التي تبالغ في إخفاء الجودة بالسكر الفج، ففي سوسن
                            كيك، نتبع المدرسة الأوروبية المعاصرة: نخفض السكر إلى الحدود الدنيا لنبرز
                            حموضة التوت الطبيعية، وسماكة الزبدة الطبيعية، ونعطر أزهار اللافندر والورد
                            الطائفي.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------------- Closing CTA ---------------- */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="rounded-3xl bg-tertiary px-8 py-14 text-center text-neutral">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Store size={20} />
          </span>
                    <h2 className="font-heading text-2xl sm:text-3xl">
                        شاركونا زيارة البوتيك أو دعونا نُصمم كيكة أحلامكم
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral/85 sm:text-base">
                        يسعدنا استقبالكم في فرعنا بجدة لتذوق عينات الكيك الطازجة، أو التنسيق مع فريق
                        خدمة الضيوف لتصاميم مخصصة تناسب طقوس الاحتفالات الخاصة.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="rounded-xl bg-neutral px-6 py-3 text-sm font-bold text-tertiary shadow-sm transition-colors hover:opacity-90">
                            تفضلوا بزيارة البوتيك
                        </button>
                        <button className="flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-neutral transition-colors hover:bg-white/10">
                            احجزي مع أخصائية الحفلات
                            <PartyPopper size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}