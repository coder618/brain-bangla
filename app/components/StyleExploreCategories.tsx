import Link from "next/link";

export default function StyleExploreCategories() {
    const categories = [
        {
            title: "Tangram Puzzle",
            titleColor: "text-[#4a8cd5]",
            bgColor: "bg-[#4a8cd5]",
            href: "/shop?category=footwear",
            image: "/images/tangram-puzzle-small.png",
            description: "মেধা বিকাশের জন্যে সেরা পাজল",
        },
        {
            title: "Focus Challenge",
            titleColor: "text-[#f15a24]",
            bgColor: "bg-[#660000]",
            href: "/shop?category=focus-challenge",
            image: "/images/focus-challenge.png",
            description: "ধৈর্য এবং মনোযোগ বৃদ্ধির সেরা খেলা",
        },
        {
            title: "Brain Booster",
            titleColor: "text-[#7ba95c]",
            bgColor: "bg-[#7ba95c]",
            href: "/shop?category=brain-booster",
            image: "/images/brain-booster.png",
            description: "Problem Solving Skill বৃদ্ধি করে",
        },
    ];

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <div className="mb-14">
                <span
                    className="mb-3 block text-sm tracking-[0.2em] text-[#f84c63] uppercase font-bold"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                >
                    Education Toys
                </span>
                <h2 className="text-4xl font-extrabold text-black md:text-5xl">
                    Smart অভিভাবকের পছন্দ
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <Link
                            href={cat.href}
                            className={`group relative w-full aspect-square overflow-hidden rounded-[2rem] transition-transform hover:-translate-y-2 ${cat.bgColor}`}
                        >
                            {/* Inner image shape container placeholder */}
                            <div className="absolute inset-6 flex items-center justify-center">
                                <div
                                    className="h-full w-full bg-white/20 transition-transform group-hover:scale-105"
                                    style={{
                                        // Adding a different basic shape border radius for each placeholder to mimic the custom shapes
                                        borderRadius:
                                            idx === 0
                                                ? "40px"
                                                : idx === 1
                                                  ? "50% 50% 50% 50% / 40% 40% 60% 60%"
                                                  : "50%",
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white/60">
                                        <img src={cat.image} alt={cat.title} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <h3 className={`mt-6 text-2xl font-bold ${cat.titleColor}`}>{cat.title}</h3>
                        <p className="mt-2 text-[20px] font-medium ">{cat.description}</p>
                        <a
                            href={cat.href}
                            className="mt-4 text-lg font-medium text-[#f84c63] underline"
                        >
                            বিস্তারিত দেখুন
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
