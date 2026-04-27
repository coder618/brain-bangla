import HeroBanners from "./components/HeroBanners";
import ScrollingBanner from "./components/ScrollingBanner";
import StyleExploreCategories from "./components/StyleExploreCategories";
import SpecialDeals from "./components/SpecialDeals";
import ShortsGallery from "@/app/components/ShortsGallery";
import VideoGallery from "./components/VideoGallery";
import MiniGallery from "./components/MiniGallery";

export default function Home() {
    const galleryImages = [
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
        "/images/tangram-puzzle-small.png",
    ];
    return (
        <div className="flex flex-col flex-1 bg-white font-sans">
            <main className="flex flex-1 w-full flex-col items-center">
                <HeroBanners />
                <ScrollingBanner />
                <StyleExploreCategories />

                <MiniGallery images={galleryImages} imageWidth={250} imageHeight={250} />

                {/* <ShortsGallery
                    urls={[
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                        "https://youtube.com/shorts/nDjdtf3bo_Q?si=nznoNUzeQFmEHtQY",
                    ]}
                /> */}
                <VideoGallery
                    videos={[
                        {
                            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            title: "Never Gonna Give You Up - Rick Astley",
                        },
                        {
                            url: "https://www.youtube.com/watch?v=L_jWHffIx5E",
                            title: "Smash Mouth - All Star",
                        },
                        {
                            url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
                            title: "Queen - Bohemian Rhapsody",
                        },
                    ]}
                />
                <SpecialDeals />
            </main>
        </div>
    );
}
