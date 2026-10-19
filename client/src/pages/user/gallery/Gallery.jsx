// src/pages/user/gallery/Gallery.jsx
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Share2 } from "lucide-react";
import { getGalleryImages } from "@/api/galleryService.js";

const ROW_HEIGHT_PX = 8;
const ROW_GAP_PX = 20;
const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        if (page > 1) setLoadingMore(true);

        getGalleryImages({ page, limit: ITEMS_PER_PAGE }, { signal: controller.signal })
            .then((res) => {
                const list = res.data.images || [];
                setItems((prev) =>
                    page === 1 ? list : [...prev, ...list.filter((i) => !prev.some((x) => x._id === i._id))]
                );
                setTotal(res.data.total || 0);
                setError("");
            })
            .catch((err) => {
                if (err.code === "ERR_CANCELED") return;
                setError(err.response?.data?.message || "تعذر تحميل الصور");
            })
            .finally(() => {
                if (controller.signal.aborted) return;
                setLoading(false);
                setLoadingMore(false);
            });

        return () => controller.abort();
    }, [page]);

    const hasMore = items.length < total;

    return (
        <div dir="rtl" className="bg-background font-body text-dark pt-nav">
            <section className="mx-auto max-w-5xl px-6 pt-16 text-center">
                <span className="mx-auto mb-6 inline-flex items-center gap-2 rounded-md bg-light px-4 py-1.5 text-sm text-dark">
                    لقطات تأسر الحواس
                </span>
                <h1 className="font-heading text-3xl text-black sm:text-4xl">
                    معرض إبداعات سوسن كيك
                </h1>
                <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                    سيمفونية بصرية تتجسد فيها فنون صناعة الكيك والحلويات الراقية
                </p>
            </section>

            <section className="mx-auto w-full px-6 py-14">
                {loading ? (
                    <p className="py-16 text-center text-sm text-gray-400">جاري التحميل...</p>
                ) : error && items.length === 0 ? (
                    <p className="py-16 text-center text-sm text-gray-400">{error}</p>
                ) : items.length === 0 ? (
                    <p className="py-16 text-center text-sm text-gray-400">
                        لا توجد صور في المعرض حالياً.
                    </p>
                ) : (
                    <div
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                        style={{ gridAutoRows: `${ROW_HEIGHT_PX}px` }}
                    >
                        {items.map((item) => (
                            <GalleryImage key={item._id} item={item} />
                        ))}
                    </div>
                )}

                {error && items.length > 0 && (
                    <p className="mt-6 text-center text-sm text-red-600">{error}</p>
                )}

                {hasMore && !loading && (
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={loadingMore}
                            className="flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-base font-bold text-neutral shadow-md transition-all duration-200 hover:opacity-90 hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                        >
                            <span>{loadingMore ? "جاري التحميل..." : "عرض المزيد من الصور"}</span>
                            <ChevronDown size={24} />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

const ALT = "صورة من معرض سوسن كيك";

function GalleryImage({ item }) {
    const wrapperRef = useRef(null);
    const imgRef = useRef(null);
    const [rowSpan, setRowSpan] = useState(30);

    const measure = () => {
        const img = imgRef.current;
        const wrapper = wrapperRef.current;
        if (!img || !wrapper || !img.naturalWidth || !img.naturalHeight) return;

        const columnWidth = wrapper.getBoundingClientRect().width;
        if (!columnWidth) return;

        const renderedHeight = columnWidth * (img.naturalHeight / img.naturalWidth);
        setRowSpan(Math.ceil((renderedHeight + ROW_GAP_PX) / (ROW_HEIGHT_PX + ROW_GAP_PX)));
    };

    useEffect(() => {
        if (imgRef.current?.complete) measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownload = (e) => {
        e.stopPropagation();
        // The "download" attribute is ignored for cross-origin URLs, so ask Cloudinary
        // to serve the file as an attachment instead.
        const url = item.image.includes("/upload/")
            ? item.image.replace("/upload/", "/upload/fl_attachment/")
            : item.image;
        const link = document.createElement("a");
        link.href = url;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({ title: ALT, url: item.image });
            } catch {
                // user cancelled the share sheet
            }
            return;
        }
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(item.image);
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="group relative overflow-hidden rounded-3xl"
            style={{ gridRowEnd: `span ${rowSpan}` }}
        >
            <img
                ref={imgRef}
                src={item.image}
                alt={ALT}
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
