import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Download, Heart, Share2 } from "lucide-react";
import { categories as homeCategories } from "@/data/categories.js";

/**
 * Sawsan Cake — "Gallery" section
 * Hero + category filter pills + masonry image grid (CSS grid based).
 * Navbar and footer are intentionally excluded — mount this inside your
 * existing page layout.
 *
 * Built to match the shared Tailwind v4 @theme tokens (primary, light, dark,
 * secondary, tertiary, background, gray, fonts Lalezar/Changa).
 *
 * The grid uses a fine-grained `grid-auto-rows` track combined with a
 * dynamic `gridRowEnd` span computed from each image's *real* rendered
 * height once it loads. This gives a true masonry layout without ever
 * hardcoding a height/span per item — swap `src`/`alt` for admin-uploaded
 * images of any size and the layout adapts automatically.
 */

const categories = [
    { id: "all", label: "الكل" },
    ...homeCategories.map((cat) => ({
        id: cat.catHref.replace("/category/", ""),
        label: cat.catName.trim(),
    })),
];

// Replace `src`/`alt` with real admin-uploaded assets. No size/height info
// is needed here — the grid measures each image itself.
const galleryItems = [
    { id: 1, category: "summer-treats", src: "/design/love.png", alt: "قالب كيك فاخر مزين بالورد" },
    { id: 2, category: "sugar-free", src: "/design/love.png", alt: "تشيز كيك التوت البارد" },
    { id: 3, category: "special-orders", src: "/design/love.png", alt: "تارت التوت المشكل" },
    { id: 4, category: "summer-treats", src: "/design/love.png", alt: "كيكة مناسبات متعددة الطبقات بالورد" },
    { id: 5, category: "cakes", src: "/design/love.png", alt: "كيكة شوكولاتة فاخرة بتأثير التقطير" },
    { id: 6, category: "special-orders", src: "/design/love.png", alt: "كوكيز محشو وميل فوي بالفانيليا" },
    { id: 7, category: "cakes", src: "/design/love.png", alt: "قطع شوكولاتة فاخرة مشكلة" },
    { id: 8, category: "chocolate-gifts", src: "/design/love.png", alt: "حلويات باردة وموس بالتوت" },
    { id: 9, category: "luxury-molds", src: "/design/love.png", alt: "حلويات شرقية ومعمول فاخر" },
    { id: 10, category: "special-orders", src: "/design/love.png", alt: "صينية كوكيز وكب كيك بالتوت" },
    { id: 11, category: "summer-treats", src: "/design/love.png", alt: "كيكة فنية مرسومة يدوياً" },
    { id: 12, category: "pastries-croissants", src: "/design/love.png", alt: "تشكيلة حلويات العيد الفاخرة" },
    { id: 13, category: "sugar-free", src: "/design/love.png", alt: "قالب تشيز كيك اللوتس" },
    { id: 14, category: "summer-treats", src: "/design/love.png", alt: "كيكة كريمة بالورد المزخرف" },
    { id: 15, category: "cookies-petit-four", src: "/design/love.png", alt: "معجنات وفطائر فرنسية ميني" },
    { id: 16, category: "summer-treats", src: "/design/love.png", alt: "كيكة عارية مزينة بالتوت الطازج" },
    { id: 17, category: "luxury-molds", src: "/design/love.png", alt: "بقلاوة وحلويات شرقية بالفستق" },
    { id: 18, category: "chocolate-gifts", src: "/design/love.png", alt: "كاسات حلى بارد منوعة" },
    { id: 19, category: "cookies-petit-four", src: "/design/love.png", alt: "معجنات وميني بيتزا" },
    { id: 20, category: "pastries-croissants", src: "/design/love.png", alt: "معمول وكعك العيد الفاخر" },
];

// Height (px) of a single implicit grid row. Smaller = finer-grained
// masonry, but too small adds more DOM row tracks. 8px is a good default.
const ROW_HEIGHT_PX = 8;
const ROW_GAP_PX = 20; // must match the grid's gap-5 (20px)
const ITEMS_PER_PAGE = 13;

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filteredItems = useMemo(
        () =>
            activeCategory === "all"
                ? galleryItems
                : galleryItems.filter((item) => item.category === activeCategory),
        [activeCategory]
    );

    // Reset pagination when category changes
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [activeCategory]);

    const visibleItems = useMemo(
        () => filteredItems.slice(0, visibleCount),
        [filteredItems, visibleCount]
    );

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

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
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
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

            {/* ---------------- Masonry gallery (CSS grid) ---------------- */}
            <section className="mx-auto w-full px-6 py-14">
                <div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    style={{ gridAutoRows: `${ROW_HEIGHT_PX}px` }}
                >
                    {visibleItems.map((item, index) => (
                        <GalleryImage key={item.id} item={item} order={index} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <p className="py-16 text-center text-sm text-gray-400">
                        لا توجد صور ضمن هذا التصنيف حالياً.
                    </p>
                )}

                {visibleCount < filteredItems.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            className="flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-base font-bold text-neutral shadow-md transition-all duration-200 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                        >
                            <span>عرض المزيد من الصور</span>
                            <ChevronDown size={24} />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

function GalleryImage({ item, order }) {
    const wrapperRef = useRef(null);
    const imgRef = useRef(null);
    const [rowSpan, setRowSpan] = useState(30); // sensible fallback before load/measure

    const orderStyle = order % 2

    // The span must come from the image's real aspect ratio (naturalWidth /
    // naturalHeight) applied to the wrapper's *current* width — never from
    // the wrapper's own height. The wrapper's height is a product of rowSpan,
    // so reading it back to compute the next rowSpan is a feedback loop: it
    // just re-confirms whatever height the fallback already set, which is
    // why every tile ended up the same size regardless of the real photo.
    const measure = () => {
        const img = imgRef.current;
        const wrapper = wrapperRef.current;
        if (!img || !wrapper || !img.naturalWidth || !img.naturalHeight) return;

        const columnWidth = wrapper.getBoundingClientRect().width;
        if (!columnWidth) return;

        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const renderedHeight = columnWidth * aspectRatio;
        const span = Math.ceil((renderedHeight + ROW_GAP_PX) / (ROW_HEIGHT_PX + ROW_GAP_PX));
        setRowSpan(span);
    };

    // Cached images (e.g. the same src reused, or a page revisit) can finish
    // loading before this component even mounts, meaning the "load" event
    // below never fires and every tile is stuck on the fallback span. This
    // catches that case on mount, in addition to the normal onLoad path. It
    // also re-measures on resize, since columnWidth changes across breakpoints.
    useEffect(() => {
        if (imgRef.current?.complete) measure();

        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownload = (e) => {
        e.stopPropagation();
        const link = document.createElement("a");
        link.href = item.src;
        link.download = item.alt || "gallery-image";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const shareUrl = new URL(item.src, window.location.origin).href;

        if (navigator.share) {
            try {
                await navigator.share({ title: item.alt, url: shareUrl });
            } catch {
                // user cancelled the share sheet — nothing to do
            }
            return;
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareUrl);
        }
    };

    return (
        <div
            ref={wrapperRef}
            className={`group relative overflow-hidden rounded-3xl ${orderStyle ? "row-span-20" : "row-span-15"}`}
            style={{ gridRowEnd: `span ${rowSpan}` }}
        >
            <img
                ref={imgRef}
                src={item.src}
                alt={item.alt}
                onLoad={measure}
                className="w-full h-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-105"
                loading="lazy"
            />

            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                    type="button"
                    onClick={handleDownload}
                    aria-label="تحميل الصورة"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral text-dark shadow-md transition-colors hover:bg-primary hover:text-neutral"
                >
                    <Download size={18} />
                </button>
                <button
                    type="button"
                    onClick={handleShare}
                    aria-label="مشاركة الصورة"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral text-dark shadow-md transition-colors hover:bg-primary hover:text-neutral"
                >
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    );
}