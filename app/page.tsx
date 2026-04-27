import HeroBanners from "./components/HeroBanners";
import ScrollingBanner from "./components/ScrollingBanner";
import StyleExploreCategories from "./components/StyleExploreCategories";
import SpecialDeals from "./components/SpecialDeals";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-white font-sans">
            <main className="flex flex-1 w-full flex-col items-center">
                <HeroBanners />
                <ScrollingBanner />
                <StyleExploreCategories />
                <SpecialDeals />
            </main>
        </div>
    );
}
