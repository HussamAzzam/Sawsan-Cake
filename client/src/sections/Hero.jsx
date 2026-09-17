import GalleryButton from "@/components/CoolButton.jsx";

import { useNavigate } from "react-router-dom"

const Hero = ({mobilePoster, posterUrl, videoUrl, onVideoReady}) => {
    const navigate = useNavigate();
    return (
    <section className=" relative h-screen w-full overflow-hidden">
        {/* Mobile hero image */}
        <img
            src={mobilePoster}
            alt="hero"
            className={`md:hidden w-full h-full object-cover`}
        />
        {/* Desktop hero video */}
        <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={posterUrl}
            onCanPlay={onVideoReady}
            className="hidden md:block md:absolute inset-0 w-full h-full object-cover"
        >
            <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Mobile hero buttons*/}
        <div className="md:hidden absolute bottom-10 w-full left-0 z-10 flex flex-col items-center justify-center gap-3 p-1">
            <button
                className={`bg-neutral text-primary text-lg font-bold w-3/4 px-5 py-3 rounded-md`}
            >تصفح القائمة</button>
            <button
                className={`bg-transparent text-neutral border border-neutral text-lg font-semibold w-3/4 px-5 py-3 rounded-md`}
            >تواصل معنا</button>
        </div>

        {/* Desktop hero headers */}
        <div className={`hidden absolute top-90 w-full md:flex justify-between items-start px-20`}>
            <div className={`flex flex-col items-center justify-center gap-10`}>
                <div className={`font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5`}>
                    <span>حلويات</span> بتفرح الألب
                </div>
                <GalleryButton
                    link={`/menu`}
                    text={`القائمة`}
                />
            </div>
            <div className={`flex flex-col items-center justify-center gap-10`}>
                <div className={`font-heading text-neutral text-4xl flex flex-col items-center justify-center gap-5`}>
                    من المطبخ <span>للبيت</span>
                </div>
                <GalleryButton
                    link={`/gallery`}
                    text={`المعرض`}/>
            </div>
        </div>
    </section>
    )
}

export default Hero;