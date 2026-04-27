"use client";

import React, { useState, useEffect, useRef } from "react";
import "flickity/css/flickity.css";
import type Flickity from "flickity";

interface ShortsGalleryProps {
    urls: string[];
}

export default function ShortsGallery({ urls }: ShortsGalleryProps) {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const flktyRef = useRef<Flickity | null>(null);

    const extractVideoId = (url: string): string | null => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname.includes("youtube.com") || parsed.hostname === "youtu.be") {
                // Handle /shorts/ID
                if (parsed.pathname.startsWith("/shorts/")) {
                    return parsed.pathname.split("/")[2];
                }
                // Handle ?v=ID
                if (parsed.searchParams.has("v")) {
                    return parsed.searchParams.get("v");
                }
                // Handle youtu.be/ID
                if (parsed.hostname === "youtu.be") {
                    return parsed.pathname.slice(1);
                }
            }
        } catch (e) {
            // Fallback regex
            const match = url.match(
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
            );
            return match ? match[1] : null;
        }

        // Fallback regex if URL parsing didn't return early
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        );
        return match ? match[1] : null;
    };

    const videos = urls
        .map((url) => {
            const id = extractVideoId(url);
            return id ? { id, url } : null;
        })
        .filter((v): v is { id: string; url: string } => v !== null);

    useEffect(() => {
        let flickityInstance: Flickity | null = null;
        if (typeof window !== "undefined" && carouselRef.current && videos.length > 0) {
            import("flickity").then((FlickityModule) => {
                const FlickityClass = FlickityModule.default || FlickityModule;
                flickityInstance = new FlickityClass(carouselRef.current as Element, {
                    cellAlign: "left",
                    contain: true,
                    pageDots: false,
                    freeScroll: true,
                    prevNextButtons: true,
                });
                flktyRef.current = flickityInstance;
            });
        }

        return () => {
            if (flickityInstance) {
                flickityInstance.destroy();
            } else if (flktyRef.current) {
                flktyRef.current.destroy();
            }
        };
    }, [videos.length]);

    if (videos.length === 0) {
        return null;
    }

    return (
        <div className="w-full py-8 overflow-hidden">
            <div ref={carouselRef} className="w-full">
                {videos.map((video, index) => (
                    <div
                        key={`${video.id}-${index}`}
                        className="carousel-cell relative w-[160px] sm:w-[200px] md:w-[240px] aspect-[9/16] mr-4 cursor-pointer rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gray-100"
                        onClick={() => setActiveVideoId(video.id)}
                    >
                        {/* Thumbnail */}
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={`YouTube Short ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6 text-black ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Shorts Icon Overlay */}
                        <div className="absolute top-3 right-3 text-white drop-shadow-md">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M19.6 13.5l-5.6-2.9v-5.1c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v6l6.4 3.3c.3.1.6.2.8.2.8 0 1.5-.7 1.5-1.5 0-.6-.3-1.1-.9-1.4z" />
                                <path d="M21 7.2v9.6c0 3.3-2.7 6-6 6H9c-3.3 0-6-2.7-6-6V7.2c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6zM19.4 7.2c0-2.4-2-4.4-4.4-4.4H9C6.6 2.8 4.6 4.8 4.6 7.2v9.6c0 2.4 2 4.4 4.4 4.4h6c2.4 0 4.4-2 4.4-4.4V7.2z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {activeVideoId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
                        onClick={() => setActiveVideoId(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveVideoId(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
                            aria-label="Close video"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Video Iframe */}
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&loop=1&playlist=${activeVideoId}&rel=0&modestbranding=1&playsinline=1`}
                            title="YouTube Short Video"
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
