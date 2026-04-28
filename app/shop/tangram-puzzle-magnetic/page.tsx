import React from "react";
import ProductGallery from "@/app/components/ProductGallery";
import ProductBanner from "@/app/components/ProductBanner";
import HalfAndHalf from "@/app/components/product/HalfAndHalf";

export const metadata = {
    title: "Tangram Kit | Shop",
    description:
        "Tangram is an ancient puzzle game that builds cognitive ability and spatial awareness in children.",
};

export default function TangramPage() {
    const description = `Tangram is an ancient puzzle game that continues to amaze us today. With just seven geometric shapes, you can create thousands of designs—boats, tigers, rockets, houses, and more. 

Playing with these triangles and quadrilaterals boosts your child's cognitive ability and spatial awareness, helping their intellect flourish.

Unlike the temporary joy of screen time, Tangram builds hand-eye-brain coordination, deep focus, and patience.`;

    const why_arr = [
        {
            title: "চিন্তা শক্তি বাড়াবে",
            description:
                "সাত টুকরো রঙিন জ্যামিতিক আকৃতি দিয়ে আপনার শিশু তৈরি করতে পারবে, বিভিন্ন আকৃতি প্রাণী, বাড়ি, রোবটসহ অসংখ্য চমৎকার ডিজাইন। এইগুলো বানাতে বানাতে তার মস্তিষ্ক হয়ে উঠবে আরও তীক্ষ্ণ, বাড়াবে কল্পনাশক্তি এবং সমস্যা সমাধানের দক্ষতা।",
            img: "/images/thinking--.png",
        },
        {
            title: "অবসর সময় কাটবে, স্ক্রিন থেকে দূরে থেকে",
            description:
                "এর মাধ্যমে আপনার সন্তান অবসর সময় কাটবে - আর আপনি থাকবেন নিশ্চিন্ত। নিয়মিত এই খেলায় তার মনোযোগ দেওয়ার ক্ষমতা এবং ধৈর্য দুটোই উল্লেখযোগ্যভাবে বৃদ্ধি পাবে। ",
            img: "/images/thinking.png",
        },
        {
            title: "Tangram ছোট বড় সবার জন্য",
            description:
                "এটা কেবল ছোটদের খেলনা নয়, নতুন কোনো আকৃতি বানানো বড়দের জন্য চ্যালেঞ্জিং, তাই ছোটদের পাশাপাশি বড়রাও এটি Enjoy করতে পারবে। ",
            img: "/images/thinking.png",
        },
    ];

    return (
        <div className="">
            <ProductBanner
                title="Tangram Puzzle(Magnetic)"
                subtitle="মেধা বিকাশের জন্যে সেরা পাজল Tangram"
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
            />

            <HalfAndHalf why_arr={why_arr} />

            <ProductGallery
                title="See Tangram in Action"
                subtitle="Gallery"
                images={[
                    "/images/tangram-puzzle-small.png",
                    "/images/thinking--.png",
                    "/images/thinking-2.jpg",
                    "/images/brain-booster.png",
                    "/images/boy-with-paper.png",
                    "/images/wating-girl.png",
                ]}
            />

            <div className="box-contain my-24 bg-gray-50/50 py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-[#f84c63] font-semibold tracking-wider uppercase text-sm mb-3 block">
                            What&apos;s Inside
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Box Contents
                        </h2>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <li className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 rotate-3">
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                7 Magnetic Shapes
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Premium quality geometric pieces that snap together easily
                            </p>
                        </li>

                        <li className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                            <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-[#f84c63] -rotate-3">
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                1 Colorful Booklet
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Contains various problems, challenges, and their solutions
                            </p>
                        </li>

                        <li className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 rotate-3">
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Hard Cover</h3>
                            <p className="text-gray-500 leading-relaxed">
                                To protect the set and provide a perfect surface to make shapes
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
