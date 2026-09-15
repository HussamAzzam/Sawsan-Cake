import { useState, useRef } from "react";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";

import { ArrowLeft, StepForward, StepBack, Sparkles, Info, Check, Play } from "lucide-react";

// Sections
import HeroSection from "@/sections/Hero.jsx";
import CategorySection from "@/sections/Category.jsx";
import AboutUsSection from "@/sections/AboutUs.jsx";
import OnlineCoursesSection from "@/sections/OnlineCourses.jsx";
import InPersonCoursesSection from "@/sections/InPersonCourses.jsx";
import GallerySection from "@/sections/Gallery.jsx";
import MenuSection from "@/sections/Menu.jsx";
import ContactUsSection from "@/sections/ContactUs.jsx";


// Common
import Loader from "@/common/Loader.jsx";

// All assets
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
    const scrollRef = useRef(null);

    /* Handlers */
    const scrollByAmount = (direction) => {
        if (!scrollRef.current) return;

        const amount = 360; // card width
        scrollRef.current.scrollBy({
            left: direction === "backward" ? -amount : amount,
            behavior: "smooth"
        });
    };

    return (
        <main className="font-body relative bg-background flex flex-col items-center">
            {!isHeroReady && <Loader fullScreen size={`lg`} />}

            <div
                className={`w-full flex flex-col justify-center items-center ${
                    isHeroReady ? "animate-fade-in" : "invisible h-0 overflow-hidden"
                }`}
            >
                <ErrorBoundary level={`section`}>
                    <HeroSection
                        mobilePoster={mobilePoster}
                        posterUrl={posterUrl}
                        videoUrl={videoUrl}
                        onVideoReady={() => setIsHeroReady(true)}
                    />
                </ErrorBoundary>

                <ErrorBoundary level={`section`}>
                    <CategorySection />
                </ErrorBoundary>

                <ErrorBoundary level={`section`} variant={`app`}>
                    <OnlineCoursesSection />
                </ErrorBoundary>
            </div>
        </main>
    );
}