import HeroBanners from "./components/HeroBanners";
import ScrollingBanner from "./components/ScrollingBanner";
import StyleExploreCategories from "./components/StyleExploreCategories";
import SpecialDeals from "./components/SpecialDeals";
import ShortsGallery from "@/app/components/ShortsGallery";
import VideoGallery from "./components/VideoGallery";
import MiniGallery from "./components/MiniGallery";

export default function Home() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tooybd.com";
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "TOOYBD";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description: "Explore the best toys, puzzles, and special deals for kids of all ages.",
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl.replace(/\/$/, "")}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    const storeJsonLd = {
        "@context": "https://schema.org",
        "@type": "ToyStore",
        name: siteName,
        description: "Your one-stop shop for educational and fun toys.",
        url: siteUrl,
        telephone: "+1-800-555-0199",
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Toy Street",
            addressLocality: "Toy City",
            addressRegion: "NY",
            postalCode: "10001",
            addressCountry: "US",
        },
    };

    const navigationJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
            {
                "@type": "SiteNavigationElement",
                position: 1,
                name: "Home",
                url: `${siteUrl}/`,
            },
            {
                "@type": "SiteNavigationElement",
                position: 2,
                name: "Shop",
                url: `${siteUrl}/shop`,
            },
            {
                "@type": "SiteNavigationElement",
                position: 3,
                name: "Contact",
                url: `${siteUrl}/contact`,
            },
            {
                "@type": "SiteNavigationElement",
                position: 4,
                name: "Investors",
                url: `${siteUrl}/investors`,
            },
        ],
    };

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
            />
            <main className="flex flex-1 w-full flex-col items-center">
                <HeroBanners />
                <ScrollingBanner />
                <StyleExploreCategories />

                <MiniGallery images={galleryImages} imageWidth={250} imageHeight={250} />

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
