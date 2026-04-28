"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    title?: string;
    subtitle?: string;
}

export default function ProductGallery({
    images,
    title = "See Tangram in Action",
    subtitle = "Gallery",
}: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <div className="product-gallery py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    {subtitle && (
                        <span className="text-[#f84c63] font-semibold tracking-wider uppercase text-sm mb-3 block">
                            {subtitle}
                        </span>
                    )}
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
                    )}
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((src, idx) => (
                            <div
                                key={idx}
                                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow group"
                                onClick={() => setSelectedImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery Image ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Popup / Lightbox */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div
                                className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute -top-10 right-0 md:top-0 md:-right-12 text-white hover:text-gray-300 transition-colors bg-black/50 md:bg-transparent rounded-full p-2"
                                    onClick={() => setSelectedImage(null)}
                                    aria-label="Close popup"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-8 h-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedImage}
                                        alt="Popup Image"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
