import { useEffect, useRef, useState } from "react";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";
import { usePanel } from "@/context/PanelContext";

import HeroSection from "@/sections/Hero.jsx";
import CategorySection from "@/sections/Category.jsx";
import OnlineCoursesSection from "@/sections/OnlineCourses.jsx";
import InPersonCoursesSection from "@/sections/InPersonCourses.jsx";
import Footer from "@/components/Footer.jsx";

import Loader from "@/common/Loader.jsx";

import {
    mobilePoster, category, walnut, cake2, cashew, almond,
    mango, cake3, cake1, pineapple, cake4, pastryBag, cakeSample,
    strawberry, quality, whatsapp, instagram, facebook, truck, contact,
    youtube, avatar, youtubeLogo
} from "@/assets/assets.js";

export default function Home() {
    const videoUrl = import.meta.env.VITE_VIDEO_URL;
    const posterUrl = import.meta.env.VITE_POSTER_URL;

    const [isHeroReady, setIsHeroReady] = useState(false);
    const { activeIndex, setActiveIndex } = usePanel();
    const isAnimating = useRef(false);

    const sections = [
        <HeroSection
            key="hero"
            mobilePoster={mobilePoster}
            posterUrl={posterUrl}
            videoUrl={videoUrl}
            onVideoReady={() => setIsHeroReady(true)}
        />,
        <CategorySection key="category" />,
        <OnlineCoursesSection key="online-courses" />,
        <InPersonCoursesSection key="in-person-courses" />,
        <Footer key="footer" />,
    ];

    useEffect(() => {
        if (!isHeroReady) return;

        const handleWheel = (e) => {
            if (isAnimating.current) return;

            if (e.deltaY > 0 && activeIndex < sections.length - 1) {
                isAnimating.current = true;
                setActiveIndex((prev) => prev + 1);
                setTimeout(() => (isAnimating.current = false), 700);
            } else if (e.deltaY < 0 && activeIndex > 0) {
                isAnimating.current = true;
                setActiveIndex((prev) => prev - 1);
                setTimeout(() => (isAnimating.current = false), 700);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [activeIndex, isHeroReady, sections.length, setActiveIndex]);

    return (
        <div className="font-body relative bg-background w-full h-screen overflow-hidden">
            {!isHeroReady && <Loader fullScreen size={`lg`} />}

            <div className={`${isHeroReady ? "animate-fade-in" : "invisible h-0 overflow-hidden"}`}>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center transition-transform duration-700 ease-in-out overflow-y-auto"
                        style={{
                            transform: `translateY(${(index - activeIndex) * 100}vh)`,
                        }}
                    >
                        <ErrorBoundary level={`section`} variant={index === 0 ? undefined : `app`}>
                            {section}
                        </ErrorBoundary>
                    </div>
                ))}
            </div>
        </div>
    );
}