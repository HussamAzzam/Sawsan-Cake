import { useState } from "react";
import {
    Heart,
    Clock,
    MessageCircle,
    ArrowLeft,
    MapPin,
    Phone,
    PenLine,
    User,
    Cake,
    CalendarDays,
    ShieldCheck,
    Truck,
    Award,
    Sparkles,
    Gem,
} from "lucide-react";

/**
 * Sawsan Cake — "Contact / Inquiry" page
 * Built to match the provided theme (Tailwind v4 @theme tokens: primary,
 * light, dark, secondary, tertiary, background, gray, fonts Lalezar/Changa).
 *
 * Fonts: make sure "Lalezar" (headings) and "Changa" (body) are loaded
 * globally, e.g. via a <link> to Google Fonts in index.html.
 */

const branches = [
    {
        badge: "المعرض الرئيسي",
        badgeClass: "bg-light text-dark",
        name: "فرع الرياض (المملكة)",
        address: "حي الترحيب، طريق الأمير تركي بن عبدالعزيز، مجمع ذا أفينيو",
        phone: "+966 11 456 7890",
        hours: "يومياً: ٩:٠٠ ص - ١١:٠٠ م (الجمعة: ١:٠٠ م - ١١:٣٠ م)",
    },
    {
        badge: "المعمل الحرفي الأول",
        badgeClass: "bg-secondary-light text-tertiary",
        name: "فرع إربد (الأردن)",
        address: "شارع الجامعة، قرب دوار القبة، مقابل بنك الإسكان",
        phone: "+962 2 724 1122",
        hours: "يومياً: ٩:٠٠ ص - ١١:٠٠ م بدون انقطاع",
    },
];

const inquiryTypes = [
    "كيك مناسبات خاصة وأعراس فاخرة",
    "استشارة نكهات وتذوق",
    "طلب هدايا فاخرة",
    "استفسار عام",
];

const socials = [
    { label: "إنستغرام" },
    { label: "تيك توك" },
    { label: "يوتيوب" },
    { label: "فيسبوك" },
];

const features = [
    {
        icon: Award,
        title: "إتقان يدوي دقيق",
        desc: "كل تفصيل يُصنع بشغف ليعبر عن ذكرياتكم المميزة",
    },
    {
        icon: Sparkles,
        title: "جلسة تذوق خاصة",
        desc: "متاحة لحفلات الزفاف والمناسبات الملكية الكبرى",
    },
    {
        icon: Gem,
        title: "مكونات عضوية فاخرة",
        desc: "زبدة نيوزيلندية، فانيلا مدغشقر، وتوت طبيعي",
    },
];

export default function ContactUs() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        date: "",
        type: inquiryTypes[0],
        details: "",
    });

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Wire this up to your backend / CRM.
        console.log("Inquiry submitted:", form);
    }

    return (
        <div dir="rtl" className="min-h-screen bg-background font-body text-dark pt-nav">
            {/* ---------------- Hero ---------------- */}
            <section className="mx-auto max-w-7xl px-6 pt-14">
                <div className="flex flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center justify-center gap-2 rounded-md bg-light px-4 py-1.5 text-sm text-dark">
            <Heart size={14} className="fill-dark/20" />
            بوابة الاستفسار والطلبات المخصصة
          </span>
                    <h1 className="font-heading flex flex-col items-center justify-center text-3xl leading-tight text-dark sm:text-4xl lg:text-5xl">
                        <div>
                             يسعدنا تواصلكم ونسعد بأن نكون جزءاً
                        </div>
                        <div>
                             من مناسباتكم السعيدة
                        </div>
                    </h1>
                    <p className="text-center mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        فريق سوسن كيك رهن إشارتكم لتصميم قوالب فنية تعبر عن ذوقكم الرفيع، سواء كانت
                        حفلات زفاف، مناسبات خاصة، أو إهداءات فاخرة لا تُنسى.
                    </p>
                </div>
            </section>

            {/* ---------------- Main content ---------------- */}
            <section id="contact" className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.55fr_1fr]">
                    {/* ---- Form card ---- */}
                    <div className="order-1 rounded-3xl bg-neutral p-8 shadow-md lg:order-none">
                        <div className="mb-8 flex items-center gap-3">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light text-primary">
                                <PenLine size={20} />
                            </span>
                            <div className="text-right">
                                <p className="text-xs font-semibold text-primary">الخدمة الملكية</p>
                                <h2 className="font-heading text-xl text-dark sm:text-2xl">
                                    طلب تصميم أو حجز استشارة نكهات
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <Field label="الاسم الكريم">
                                    <div className="relative">
                                        <User
                                            size={16}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="مثال: سارة آل سعود"
                                            value={form.name}
                                            onChange={(e) => update("name", e.target.value)}
                                            className="w-full rounded-xl border border-black/10 bg-gray py-3 pr-10 pl-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </Field>

                                <Field label="رقم الجوال / الواتساب">
                                    <div className="relative">
                                        <Phone
                                            size={16}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="+966 5x xxx xxxx"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            className="w-full rounded-xl border border-black/10 bg-gray py-3 pr-10 pl-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <Field label="نوع الطلب أو الاستفسار">
                                    <div className="relative">
                                        <Cake
                                            size={16}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <select
                                            value={form.type}
                                            onChange={(e) => update("type", e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-black/10 bg-gray py-3 pr-10 pl-4 text-sm text-dark focus:border-primary focus:outline-none"
                                        >
                                            {inquiryTypes.map((t) => (
                                                <option key={t} value={t}>
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Field>

                                <Field label="تاريخ المناسبة المتوقع">
                                    <div className="relative">
                                        <CalendarDays
                                            size={16}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={(e) => update("date", e.target.value)}
                                            className="w-full rounded-xl border border-black/10 bg-gray py-3 pr-10 pl-4 text-sm text-dark focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </Field>
                            </div>

                            <Field label="تفاصيل الفكرة والرؤية الجمالية" hint="عدد الضيوف، الألوان، النكهات المحببة">
                <textarea
                    rows={4}
                    placeholder="شاركونا فكرتكم، درجات الألوان، الحشوات المفضلة (توت بري، زبدة فرنسية، شوكولاتة مدغشقر، كراميل مملح)…"
                    value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    className="w-full resize-none rounded-xl border border-black/10 bg-gray p-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                />
                            </Field>

                            <p className="flex items-center gap-2 text-xs text-gray-400">
                                <ShieldCheck size={14} className="text-primary shrink-0" />
                                <span>نضمن خصوصية بياناتكم وسرية تفاصيل المناسبات الملكية والخاصة تماماً.</span>
                            </p>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-tertiary py-4 text-sm font-bold text-neutral shadow-sm transition-colors hover:bg-dark sm:text-base cursor-pointer"
                            >
                                <span>إرسال الاستفسار وحجز موعد المناقشة</span>
                                <ArrowLeft size={16} />
                            </button>

                            <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary-bg px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral text-primary">
                                        <Truck size={16} />
                                    </span>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-dark">جاهزية التوصيل الفاخر</p>
                                        <p className="text-xs text-gray-500">
                                            مركبات مبردة ومجهزة بدقة للمحافظة على قوام الكيك
                                        </p>
                                    </div>
                                </div>
                                <span className="shrink-0 rounded-md bg-neutral px-3 py-1 text-xs font-semibold text-tertiary">
                                    ضمان وصول بنسبة ١٠٠٪
                                </span>
                            </div>
                        </form>
                    </div>

                    {/* ---- Sidebar ---- */}
                    <div className="order-2 space-y-6 lg:order-none">
                        <div className="rounded-2xl bg-neutral p-5 shadow-sm">
                            <p className="flex items-center gap-2 font-semibold text-dark">
                                <Clock size={16} className="text-primary shrink-0" />
                                <span>استجابة استثنائية</span>
                            </p>
                            <p className="mt-2 text-right text-xs leading-6 text-gray-500">
                                متوسط وقت الرد لفريق الضيافة:{" "}
                                <span className="font-semibold text-dark">أقل من ٣ ساعات</span> خلال أوقات
                                الدوام.
                            </p>
                        </div>

                        <button className="flex w-full items-center gap-3 rounded-2xl bg-[#22c35e] px-5 py-4 text-neutral shadow-sm transition-colors hover:brightness-105 cursor-pointer">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                                <MessageCircle size={16} />
                            </span>
                            <div className="text-right">
                                <p className="text-sm font-bold">تواصل فوري عبر واتساب</p>
                                <p className="text-xs opacity-90">محادثة مباشرة مع شيف البوتيك ومستشاري المناسبات</p>
                            </div>
                        </button>

                        <div className="space-y-4">
                            {branches.map((b) => (
                                <div key={b.name} className="rounded-2xl bg-neutral p-5 shadow-sm">
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <h3 className="font-heading text-base text-dark">{b.name}</h3>
                                        <span className={`rounded-md px-2.5 py-1 text-[0.65rem] font-semibold ${b.badgeClass}`}>
                                            {b.badge}
                                        </span>
                                    </div>
                                    <p className="flex items-start gap-2 text-right text-xs leading-6 text-gray-500">
                                        <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
                                        <span>{b.address}</span>
                                    </p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-dark">
                                        <Phone size={14} className="text-primary shrink-0" />
                                        <span dir="ltr">{b.phone}</span>
                                    </p>
                                    <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                        <Clock size={14} className="text-gray-400 shrink-0" />
                                        <span>{b.hours}</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl bg-neutral p-5 shadow-sm">
                            <p className="mb-3 flex items-center justify-between gap-2 text-sm font-semibold text-dark">
                                <span>موقع الفروع وسهولة الاستلام</span>
                                <span className="rounded-md bg-light px-2 py-0.5 text-[0.6rem] font-semibold text-dark">
                                    خدمة استلام الكيك بالسيارة
                                </span>
                            </p>
                            <div className="h-40 w-full overflow-hidden rounded-xl">
                                <iframe
                                    title="موقع الفروع"
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                    src="https://www.google.com/maps?q=Riyadh&output=embed"
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-neutral p-5 text-center shadow-sm">
                            <p className="mb-4 text-sm font-semibold text-dark">
                                تابعي إلهام وفنون الكيك اليومية عبر منصاتنا
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {socials.map((s) => (
                                    <span
                                        key={s.label}
                                        className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium text-dark"
                                    >
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---- Feature strip ---- */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex items-center gap-3 rounded-2xl bg-neutral px-5 py-4 shadow-sm"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light text-primary">
                                <Icon size={18} />
                            </span>
                            <div className="text-right">
                                <p className="text-sm font-bold text-dark">{title}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function Field({ label, hint, children }) {
    return (
        <label className="block">
            <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-dark">{label}</span>
                <span className="text-xs text-gray-400">{hint}</span>
            </div>
            {children}
        </label>
    );
}