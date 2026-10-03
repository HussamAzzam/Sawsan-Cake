import { useCallback, useEffect, useRef, useState } from "react";
import GalleryButton from "@/components/CoolButton.jsx";

const DESKTOP_QUERY = "(min-width: 1024px)";
// Large file + slow connection can take a while; don't leave the loader forever.
const READY_FALLBACK_MS = 30000;

const Hero = ({ mobilePoster, posterUrl, videoUrl, onVideoReady }) => {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const hasSignaledReady = useRef(false);

    const onReadyRef = useRef(onVideoReady);
    useEffect(() => {
        onReadyRef.current = onVideoReady;
    }, [onVideoReady]);

    // Only load the video on desktop; phones just get the image.
    const [isDesktop] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia(DESKTOP_QUERY).matches
    );

    // The video source: stays null until the WHOLE file is downloaded.
    const [videoSrc, setVideoSrc] = useState(null);

    const markReady = useCallback(() => {
        if (hasSignaledReady.current) return;
        hasSignaledReady.current = true;
        onReadyRef.current?.();
    }, []);

    // Safety net so the loader can never hang forever.
    useEffect(() => {
        const id = setTimeout(markReady, READY_FALLBACK_MS);
        return () => clearTimeout(id);
    }, [markReady]);

    // Download the full video into memory, then play it from a blob URL.
    useEffect(() => {
        if (!isDesktop || !videoUrl) return;

        const controller = new AbortController();
        let objectUrl = null;

        (async () => {
            try {
                const res = await fetch(videoUrl, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const blob = await res.blob();
                objectUrl = URL.createObjectURL(blob);
                setVideoSrc(objectUrl);
            } catch (err) {
                if (err.name === "AbortError") return;
                // Fall back to normal streaming if the fetch fails (e.g. CORS).
                setVideoSrc(videoUrl);
            }
        })();

        return () => {
            controller.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [isDesktop, videoUrl]);

    // Set muted directly (React doesn't reliably reflect it in the DOM).
    useEffect(() => {
        const video = videoRef.current;
        if (video) video.muted = true;
    }, [videoSrc]);

    // Pause decoding while the hero is offscreen, resume when visible.
    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
            {/* Mobile hero image */}
            <img
                src={mobilePoster}
                alt="hero"
                onLoad={() => {
                    if (!isDesktop) markReady();
                }}
                className="lg:hidden w-full h-full object-cover"
            />

            {/* Desktop hero video (poster shows until the blob is ready) */}
            {isDesktop && (
                <video
                    ref={videoRef}
                    src={videoSrc || undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={posterUrl}
                    onCanPlay={() => {
                        if (videoSrc) markReady();
                    }}
                    className="hidden md:block md:absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Mobile hero buttons*/}
            <div className="lg:hidden absolute bottom-10 w-full left-0 z-10 flex flex-col items-center justify-center gap-3 p-1">
                <button className="w-1/2 bg-neutral text-primary text-base font-bold  px-10 py-3 rounded-[10px]">
                    تصفح القائمة
                </button>
                <button className="w-1/2 bg-transparent text-neutral border border-neutral text-base font-semibold px-10 py-3 rounded-[10px]">
                    تواصل معنا
                </button>
            </div>

            {/* Desktop hero headers */}
            <div className="hidden absolute top-90 w-full lg:flex justify-between items-start px-20">
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5">
                        <span>حلويات</span> بتفرح الألب
                    </div>
                    <GalleryButton link="/menu" text="القائمة" />
                </div>
                <div className="flex flex-col items-center justify-center gap-10">
                    <div className="font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5">
                        من المطبخ <span>للبيت</span>
                    </div>
                    <GalleryButton link="/gallery" text="المعرض" />
                </div>
            </div>
        </section>
    );
};

export default Hero;