import React from "react";

interface ProductBannerProps {
    title: string;
    subtitle: string;
    videoUrl: string;
    bgColor?: string;
}

export default function ProductBanner({
    title,
    subtitle,
    videoUrl,
    bgColor = "#fbdce2",
}: ProductBannerProps) {
    return (
        <div className={`banner py-15`} style={{ backgroundColor: bgColor }}>
            <div className="container">
                <h1 className="text-6xl font-bold text-center">{title}</h1>
                <h2 className="text-3xl text-center mt-5">{subtitle}</h2>
            </div>

            <div className="my-10 flex justify-center w-full px-4">
                <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
