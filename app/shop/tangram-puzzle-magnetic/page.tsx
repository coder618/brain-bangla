import React from "react";
import ProductGallery from "@/app/components/ProductGallery";
import ProductBanner from "@/app/components/ProductBanner";
import HalfAndHalf from "@/app/components/product/HalfAndHalf";
import ProductPurchaseDetails from "@/app/components/product/ProductPurchaseDetails";

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

    const boxContents = [
        {
            title: "7 Magnetic Shapes",
            description: "Premium quality geometric pieces that snap together easily",
            image: "/images/tangram-puzzle-small.png",
        },
        {
            title: "1 Colorful Booklet",
            description: "Contains various problems, challenges, and their solutions",
            image: "/images/tangram-puzzle-small.png",
        },
        {
            title: "Hard Cover",
            description: "To protect the set and provide a perfect surface to make shapes",
            image: "/images/tangram-puzzle-small.png",
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

            <ProductPurchaseDetails
                id="tangram-puzzle-magnetic"
                title="Tangram Puzzle (Magnetic)"
                description={description}
                price={360}
                image="/images/tangram-puzzle-small.png"
                boxContents={boxContents}
            />
        </div>
    );
}
