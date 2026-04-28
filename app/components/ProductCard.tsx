"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export type Product = {
    id?: string | number;
    title?: string;
    name?: string;
    description?: string;
    image?: string;
    featuredImage?: string;
    gallery?: string[];
    price?: number | string;
    salePrice?: number | string;
    detailHtmlPath?: string;
    [key: string]: unknown;
};

type ProductCardProps = {
    product: Product;
};

function formatPrice(price: Product["price"]) {
    if (typeof price === "number") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        })
            .format(price)
            .replace("$", "৳");
    }

    if (typeof price === "string" && price.trim().length > 0) {
        return price;
    }

    return null;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [showSuccess, setShowSuccess] = useState(false);
    const title = product.title ?? product.name ?? "Untitled Product";
    const description = product.description ?? "No description provided.";
    const price = formatPrice(product.price);
    const salePrice = formatPrice(product.salePrice);
    const image = product.featuredImage ?? product.image ?? null;
    const galleryCount = Array.isArray(product.gallery) ? product.gallery.length : 0;

    return (
        <>
            <Link href={`/shop/${product.slug ?? product.slug ?? "product"}`}>
                <article className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-square w-full bg-zinc-100">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                                No image
                            </div>
                        )}
                    </div>
                    <div className="space-y-2 p-4">
                        <h3 className="line-clamp-1 text-base font-semibold text-zinc-900">
                            {title}
                        </h3>
                        {salePrice ? (
                            <div className="flex items-baseline gap-2">
                                <p className="text-sm font-semibold text-zinc-900">{salePrice}</p>
                                {price ? (
                                    <p className="text-sm text-zinc-500 line-through">{price}</p>
                                ) : null}
                            </div>
                        ) : price ? (
                            <p className="text-sm font-medium text-zinc-700">{price}</p>
                        ) : null}
                        <p className="line-clamp-3 text-sm text-zinc-600">{description}</p>
                        {galleryCount > 0 ? (
                            <p className="text-xs text-zinc-500">Gallery: {galleryCount}</p>
                        ) : null}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                setShowSuccess(true);
                            }}
                            className="mt-4 w-full rounded-full bg-zinc-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                        >
                            Add to Cart
                        </button>
                    </div>
                </article>
            </Link>
            {showSuccess && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSuccess(false);
                    }}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-zinc-900">
                            Successfully added!
                        </h3>
                        <p className="mb-6 text-sm text-zinc-600">{title}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="flex-1 rounded-full border border-zinc-200 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
                            >
                                Continue Shopping
                            </button>
                            <Link
                                href="/cart"
                                className="flex-1 flex items-center justify-center rounded-full bg-[#f84c63] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e03e53]"
                            >
                                Place Order
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
