"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";

export interface ProductHeroProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: string[];
}

export default function ProductHero({
    id,
    title,
    price,
    originalPrice,
    description,
    images,
}: ProductHeroProps) {
    const { addToCart } = useCart();
    const mainImage = images[0];

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price,
            image: mainImage || "",
        });
        alert("Added to cart!");
    };

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-black/8 bg-zinc-100">
                    {mainImage ? (
                        <Image
                            src={mainImage}
                            alt={title}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                            No image available
                        </div>
                    )}
                </div>
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {images.slice(1).map((galleryImage, idx) => (
                            <div
                                key={idx}
                                className="relative aspect-square w-full overflow-hidden rounded-xl border border-black/8 bg-zinc-100"
                            >
                                <Image
                                    src={galleryImage}
                                    alt={`${title} - Gallery ${idx + 1}`}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 25vw, 12vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
                <h1 className="mb-4 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
                    {title}
                </h1>

                <div className="mb-8 flex items-center gap-4">
                    <p className="text-3xl font-bold text-[#f84c63]">৳{price}</p>
                    {originalPrice && (
                        <p className="text-xl text-zinc-500 line-through">৳{originalPrice}</p>
                    )}
                </div>

                <div className="mb-8 rounded-2xl bg-zinc-50 p-6 border border-zinc-100">
                    <p className="text-lg text-zinc-700 leading-relaxed whitespace-pre-line">
                        {description}
                    </p>
                </div>

                <div className="mt-2">
                    <button
                        onClick={handleAddToCart}
                        className="flex w-full md:w-auto items-center justify-center rounded-full bg-[#f84c63] px-10 py-4 text-lg font-bold text-white shadow hover:bg-[#e03e53] transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
