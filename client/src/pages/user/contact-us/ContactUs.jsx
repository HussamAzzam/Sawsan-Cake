import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
    {
        icon: Phone,
        iconBg: "bg-light text-primary",
        label: "رقم الهاتف",
        value: "065001888",
        dir: "ltr",
    },
    {
        icon: Mail,
        iconBg: "bg-secondary-light text-tertiary",
        label: "البريد الإلكتروني",
        value: "support@sawsancake.jo",
        dir: "ltr",
    },
    {
        icon: MapPin,
        iconBg: "bg-light text-primary",
        label: "العنوان",
        value: "عمّان، الأردن",
    },
    {
        icon: Clock,
        iconBg: "bg-secondary-light text-tertiary",
        label: "ساعات العمل",
        value: "يومياً: ٨ص - ١١م",
    },
];

export default function ContactUs() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Message submitted:", form);
    }

    return (
        <div dir="rtl" className="min-h-screen bg-background font-body text-dark pt-nav">
            {/* ---------------- Header ---------------- */}
            <section className="mx-auto max-w-7xl px-6 pt-14 text-center">
                <h1 className="font-heading text-3xl text-black sm:text-4xl lg:text-5xl">
                    تواصل معنا
                </h1>
                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                    يسعدنا تواصلكم معنا، أرسلوا لنا رسالة وسنقوم بالرد عليكم في أقرب وقت ممكن.
                </p>
            </section>

            {/* ---------------- Main content ---------------- */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr]">
                    {/* ---- Contact info cards ---- */}
                    <div className="space-y-4">
                        {contactInfo.map(({ icon: Icon, iconBg, label, value, dir }) => (
                            <div key={label} className="flex items-center gap-4 rounded-2xl bg-neutral py-5 px-5 shadow-sm">
                                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                                    <Icon size={20} />
                                </span>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-dark">{label}</p>
                                    <p className="mt-1 text-sm text-gray-500" dir={dir}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ---- Form card ---- */}
                    <div className="rounded-3xl bg-neutral p-8 shadow-md">
                        <h2 className="font-heading text-xl text-black sm:text-2xl">
                            أخبرنا برسالتك
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            املأ النموذج أدناه وسنتواصل معك في أقرب وقت.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <Field label="الاسم" required>
                                <input
                                    type="text"
                                    placeholder="الاسم"
                                    value={form.name}
                                    onChange={(e) => update("name", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-gray py-3 px-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                />
                            </Field>

                            <Field label="البريد الإلكتروني" required>
                                <input
                                    type="email"
                                    placeholder="البريد الإلكتروني"
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-gray py-3 px-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                />
                            </Field>

                            <Field label="رقم الهاتف" required>
                                <input
                                    type="tel"
                                    placeholder="رقم الهاتف"
                                    value={form.phone}
                                    onChange={(e) => update("phone", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-gray py-3 px-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                />
                            </Field>

                            <Field label="الرسالة" required>
                                <textarea
                                    rows={5}
                                    placeholder="الرسالة"
                                    value={form.message}
                                    onChange={(e) => update("message", e.target.value)}
                                    className="w-full resize-none rounded-xl border border-black/10 bg-gray p-4 text-sm text-dark placeholder:text-gray-400 focus:border-primary focus:outline-none"
                                />
                            </Field>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-neutral shadow-sm transition-colors hover:bg-dark sm:text-base cursor-pointer"
                            >
                                <span>إرسال الرسالة</span>
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* ---- Map ---- */}
                <div className="mt-8 overflow-hidden rounded-2xl bg-neutral p-5 shadow-sm">
                    <p className="mb-4 text-sm font-semibold text-dark">موقعنا</p>
                    <div className="h-72 w-full overflow-hidden rounded-xl">
                        <iframe
                            title="موقعنا"
                            className="h-full w-full border-0"
                            loading="lazy"
                            src="https://www.google.com/maps?q=Amman,Jordan&output=embed"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function Field({ label, required, children }) {
    return (
        <label className="block">
            <div className="mb-2">
                <span className="text-sm font-semibold text-dark">
                    {label}
                    {required && <span className="text-primary"> *</span>}
                </span>
            </div>
            {children}
        </label>
    );
}