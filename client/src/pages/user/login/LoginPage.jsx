import { User, ShoppingBag, ArrowLeft, BadgeCheck, Truck, Flower2, Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <div dir="rtl" className="min-h-screen bg-background font-body flex flex-col">
            {/* Header */}
            <header className="w-full flex items-center justify-between px-8 sm:px-16 py-6">
                <div className="flex items-center gap-8">
                    <button className="w-10 h-10 rounded-full bg-dark text-neutral flex items-center justify-center">
                        <User size={18} />
                    </button>
                    <nav className="hidden sm:flex items-center gap-8 text-sm font-semibold text-dark">
                        <a href="/" className="hover:text-primary transition-colors">
                            العودة للرئيسية
                        </a>
                        <a href="/menu" className="hover:text-primary transition-colors">
                            قائمة الحلويات
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-left">
                        <h1 className="font-heading text-2xl leading-none text-tertiary">سوسن كيك</h1>
                        <p className="text-xs text-dark/70 mt-1">Berry &amp; Butter Artistry</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-dark text-neutral flex items-center justify-center">
                        <ShoppingBag size={16} />
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-neutral rounded-[28px] shadow-md px-8 py-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-full bg-light flex items-center justify-center text-3xl mb-6">
                        🎂
                    </div>

                    {/* Badge */}
                    <span className="tagline flex items-center gap-1.5 mb-4">
            بوابة العملاء الحصرية
            <BadgeCheck size={14} className="text-dark" />
          </span>

                    {/* Heading */}
                    <h2 className="font-heading text-xl text-tertiary mb-3">
                        مرحباً بكِ في سوسن كيك
                    </h2>

                    {/* Description */}
                    <p className="description text-dark/70 leading-relaxed mb-8">
                        سجّلي دخولكِ بضغطة واحدة لمتابعة أشهى طلبيات الكيك الخاصة، مناسباتكِ
                        السعيدة، وورش فنون التزيين.
                    </p>

                    {/* Google button */}
                    <button className="btn w-full !bg-secondary-light !text-dark hover:!text-dark hover:!bg-secondary-light border-0 gap-3 py-3">
                        <ArrowLeft size={18} className="text-dark" />
                        <span className="text-base font-semibold">المتابعة باستخدام Google</span>
                        <GoogleIcon />
                    </button>
                </div>
            </main>

            {/* Footer feature strip */}
            <footer className="w-full flex items-center justify-center gap-6 sm:gap-10 py-8 text-sm font-semibold text-dark">
                <FeatureItem icon={<Flower2 size={16} className="text-primary" />} label="مكونات طبيعية فاخرة" />
                <Dot />
                <FeatureItem icon={<Truck size={16} className="text-primary" />} label="توصيل مبرد مخصص" />
                <Dot />
                <FeatureItem icon={<Sparkles size={16} className="text-primary" />} label="كيك مصنوع بحب" />
            </footer>
        </div>
    );
}

function FeatureItem({ icon, label }) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
        </div>
    );
}

function Dot() {
    return <span className="w-1 h-1 rounded-full bg-dark/30" />;
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48">
            <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
        l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
        C44,22.659,43.862,21.35,43.611,20.083z"
            />
        </svg>
    );
}