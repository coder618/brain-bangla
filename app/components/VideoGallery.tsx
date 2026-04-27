"use client";

import React, { useState } from "react";

interface VideoData {
    url: string;
    title: string;
}

interface VideoGalleryProps {
    videos: VideoData[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    const extractVideoId = (url: string): string | null => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname.includes("youtube.com") || parsed.hostname === "youtu.be") {
                if (parsed.pathname.startsWith("/shorts/")) {
                    return parsed.pathname.split("/")[2];
                }
                if (parsed.searchParams.has("v")) {
                    return parsed.searchParams.get("v");
                }
                if (parsed.hostname === "youtu.be") {
                    return parsed.pathname.slice(1);
                }
            }
        } catch (e) {
            // Fallback regex
        }

        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        );
        return match ? match[1] : null;
    };

    if (!videos || videos.length !== 3) {
        return null;
    }

    const processedVideos = videos.map((v) => ({
        ...v,
        id: extractVideoId(v.url),
    }));

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Videos</h2>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                {processedVideos.map((video, index) => {
                    if (!video.id) return null;

                    const isFirst = index === 0;
                    const containerClass = isFirst
                        ? "md:col-span-2 w-full aspect-video md:aspect-[21/9]"
                        : "md:col-span-1 w-full aspect-video";

                    return (
                        <div
                            key={`${video.id}-${index}`}
                            className={`relative rounded-xl overflow-hidden group bg-gray-900 shadow-md ${containerClass}`}
                        >
                            {activeVideoId === video.id ? (
                                <iframe
                                    className="w-full h-full absolute inset-0"
                                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div
                                    className="w-full h-full cursor-pointer relative"
                                    onClick={() => setActiveVideoId(video.id!)}
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                                            <svg
                                                className="w-8 h-8 text-red-600 ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-3 left-3  px-2 py-2  md:top-8 md:left-8  md:px-4 md:py-3 rounded-md bg-primary/60 backdrop-blur-md z-10 shadow-sm">
                                        <h3 className="text-white font-bold text-[16px] md:text-lg line-clamp-1">
                                            {video.title}
                                        </h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
