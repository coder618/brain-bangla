"use client";

import React, { useEffect, useRef } from "react";
import "flickity/css/flickity.css";

interface MiniGalleryProps {
    images: string[];
    imageWidth?: string | number;
    imageHeight?: string | number;
}

// Keep the interface but we won't import Flickity directly at the top
interface ExtendedFlickity {
    isPointerDown?: boolean;
    x: number;
    settle?: (x: number) => void;
    on: (event: string, callback: () => void) => void;
    destroy: () => void;
}

export default function MiniGallery({
    images,
    imageWidth = 300,
    imageHeight = 200,
}: MiniGalleryProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const flktyRef = useRef<ExtendedFlickity | null>(null);

    useEffect(() => {
        const carouselNode = carouselRef.current;
        if (!carouselNode || images.length === 0) return;

        let reqId: number;
        let isPaused = false;
        let flkty: ExtendedFlickity | null = null;

        // Dynamic import Flickity so it only runs on the client where 'window' is defined
        import("flickity").then((FlickityModule) => {
            const Flickity = FlickityModule.default;

            // Initialize Flickity
            flkty = new Flickity(carouselNode, {
                cellAlign: "left",
                contain: true,
                wrapAround: true,
                freeScroll: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: true,
            }) as unknown as ExtendedFlickity;

            flktyRef.current = flkty;

            // Speed of the continuous roll
            // Negative speed moves left-to-right (the content goes to the right)
            // In Flickity, x is the position. Increasing x moves the carousel left-to-right.
            const speed = 1.5;

            const play = () => {
                const flktyExtended = flkty;
                if (flktyExtended && !isPaused && !flktyExtended.isPointerDown) {
                    flktyExtended.x += speed; // Move from left to right

                    // Keep the slider within bounds for wrapAround to work properly
                    // Settle updates the visual position
                    if (typeof flktyExtended.settle === "function") {
                        flktyExtended.settle(flktyExtended.x);
                    }
                }
                reqId = requestAnimationFrame(play);
            };

            play();

            const pause = () => {
                isPaused = true;
            };

            const resume = () => {
                isPaused = false;
            };

            // Pause on drag
            if (flkty) {
                flkty.on("dragStart", pause);
                flkty.on("dragEnd", resume);
            }
        });

        return () => {
            cancelAnimationFrame(reqId);
            if (flkty) {
                flkty.destroy();
            }
        };
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-full overflow-hidden py-4">
            <div ref={carouselRef} className="mini-gallery-carousel outline-none">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className="carousel-cell flex-shrink-0 mr-4 rounded-md overflow-hidden"
                        style={{ width: imageWidth, height: imageHeight }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={`Gallery Image ${idx + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
