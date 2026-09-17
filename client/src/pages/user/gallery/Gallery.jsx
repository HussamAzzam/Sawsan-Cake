import { useMemo, useState } from "react";
import { Heart } from "lucide-react";

/**
 * Sawsan Cake — "Gallery" section
 * Hero + category filter pills + masonry image grid.
 * Navbar and footer are intentionally excluded — mount this inside your
 * existing page layout.
 *
 * Built to match the shared Tailwind v4 @theme tokens (primary, light, dark,
 * secondary, tertiary, background, gray, fonts Lalezar/Changa).
 */

const categories = [
    { id: "all", label: "الكل" },
    { id: "weddings", label: "كيك الأعراس والمناسبات" },
    { id: "mini", label: "الميني كيك والبوكسات" },
    { id: "pastry", label: "التارت والحلويات الفرنسية" },
    { id: "sculpting", label: "تفاصيل النحت السكري" },
];

// Replace `src` with your real asset paths/CDN URLs.
// `span` controls the item's relative height in the masonry layout.
const galleryItems = [
    { id: 1, category: "sculpting", src: "/images/gallery/sugar-rose.jpg", alt: "وردة سكرية منحوتة يدوياً", span: "tall" },
    { id: 2, category: "mini", src: "/images/gallery/mini-cake-box.jpg", alt: "بوكس ميني كيك فاخر", span: "short" },
    { id: 3, category: "pastry", src: "/images/gallery/berry-tart.jpg", alt: "تارت التوت المشكل", span: "short" },
    { id: 4, category: "weddings", src: "/images/gallery/tiered-floral-cake.jpg", alt: "كيكة زفاف متعددة الطبقات بالورد", span: "tall" },
    { id: 5, category: "weddings", src: "/images/gallery/chocolate-drip-cake.jpg", alt: "كيكة شوكولاتة بتأثير التقطير", span: "medium" },
    { id: 6, category: "pastry", src: "/images/gallery/mille-feuille.jpg", alt: "ميل فوي بالفراولة والفانيليا", span: "medium" },
    { id: 7, category: "sculpting", src: "/images/gallery/ruffle-texture.jpg", alt: "قوام مموّج من الشوكولاتة", span: "medium" },
    { id: 8, category: "pastry", src: "/images/gallery/berry-mousse-cakes.jpg", alt: "كيكات موس فردية بالتوت", span: "medium" },
    { id: 9, category: "weddings", src: "/images/gallery/floral-cake-closeup.jpg", alt: "تفاصيل ورد كيكة الزفاف", span: "tall" },
    { id: 10, category: "mini", src: "/images/gallery/cupcake-tray.jpg", alt: "صينية كب كيك بالتوت", span: "medium" },
    { id: 11, category: "sculpting", src: "/images/gallery/floral-painted-cake.jpg", alt: "كيكة مرسومة يدوياً بالورد", span: "medium" },
    { id: 12, category: "weddings", src: "/images/gallery/macaron-tower.jpg", alt: "برج ماكارون للحفلات", span: "tall" },
    { id: 13, category: "mini", src: "/images/gallery/lunchbox-cake.jpg", alt: "كيكة صندوق الغداء الصغيرة", span: "medium" },
    { id: 14, category: "sculpting", src: "/images/gallery/floral-buttercream-cake.jpg", alt: "كيكة كريمة بالورد المزخرف", span: "medium" },
    { id: 15, category: "pastry", src: "/images/gallery/opera-cake-bites.jpg", alt: "قطع كيك أوبرا فردية", span: "medium" },
    { id: 16, category: "weddings", src: "/images/gallery/berry-naked-cake.jpg", alt: "كيكة عارية مزينة بالتوت الطازج", span: "medium" },
];

const spanClass = {
    short: "h-56",
    medium: "h-72",
    tall: "h-96",
};

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredItems = useMemo(
        () =>
            activeCategory === "all"
                ? galleryItems
                : galleryItems.filter((item) => item.category === activeCategory),
        [activeCategory]
    );

    return (
        <div dir="rtl" className="bg-background font-body text-dark pt-nav">
            {/* ---------------- Hero ---------------- */}
            <section className="mx-auto max-w-5xl px-6 pt-16 text-center">
        <span className="mx-auto mb-6 inline-flex items-center gap-2 rounded-md bg-light px-4 py-1.5 text-sm text-dark">
          لقطات تأسر الحواس
          <Heart size={14} className="fill-dark/20" />
        </span>
                <h1 className="font-heading text-3xl text-dark sm:text-4xl">
                    معرض إبداعات سوسن كيك
                </h1>
                <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                    سيمفونية بصرية تتجسد فيها فنون صناعة الكيك والحلويات الراقية
                </p>
            </section>

            {/* ---------------- Filter pills ---------------- */}
            <section className="mx-auto max-w-6xl px-6 pt-10">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => {
                        const isActive = cat.id === activeCategory;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-primary text-neutral shadow-sm"
                                        : "bg-neutral text-dark/70 hover:text-primary"
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ---------------- Masonry gallery ---------------- */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="mb-5 break-inside-avoid overflow-hidden rounded-3xl">
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={`w-full object-cover ${spanClass[item.span]}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <p className="py-16 text-center text-sm text-gray-400">
                        لا توجد صور ضمن هذا التصنيف حالياً.
                    </p>
                )}
            </section>
        </div>
    );
}