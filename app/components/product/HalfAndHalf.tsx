import React from "react";
import Image from "next/image";

interface HalfAndHalfProps {
    why_arr: {
        title: string;
        description: string;
        img: string;
    }[];
}

export default function HalfAndHalf({ why_arr }: HalfAndHalfProps) {
    return (
        <div className="why-buy py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-[#f84c63] font-semibold tracking-wider uppercase text-sm mb-3 block">
                        Benefits
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        কেন কিনবেন Tangram Puzzle?
                    </h2>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {why_arr.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                                index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="relative aspect-square  rounded-2xl overflow-hidden ">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-5">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-50 text-[#f84c63] font-bold text-xl mb-2">
                                    0{index + 1}
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 md:text-[20px] text-[18px] leading-[160%]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
