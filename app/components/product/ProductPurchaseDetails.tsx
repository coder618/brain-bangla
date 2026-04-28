"use client";

import React, { ReactNode } from "react";
import { useCart } from "../../context/CartContext";

export interface BoxContentItem {
    title: string;
    description: string;
    icon?: ReactNode;
}

interface ProductPurchaseDetailsProps {
    id: string | number;
    title: string;
    description: ReactNode | string;
    price: number;
    originalPrice?: number;
    image: string;
    boxContents?: BoxContentItem[];
}

export default function ProductPurchaseDetails({
    id,
    title,
    description,
    price,
    originalPrice,
    image,
    boxContents,
}: ProductPurchaseDetailsProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price,
            image,
        });
        alert("Added to cart!");
    };

    return (
        <div className="product-purchase-details py-16 md:py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Side: Name, Detail, Box Contents */}
                    <div className="lg:col-span-8 space-y-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                                {title}
                            </h1>
                            <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {description}
                            </div>
                        </div>

                        {boxContents && boxContents.length > 0 && (
                            <div className="pt-10 border-t border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                    Inside the Box
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {boxContents.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
                                        >
                                            {item.icon && (
                                                <div className="flex-shrink-0 mt-1">
                                                    {item.icon}
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Price & Add to Cart */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
                            <div className="mb-8">
                                <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                                    Price
                                </span>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-5xl font-extrabold text-[#f84c63]">
                                        ৳{price}
                                    </span>
                                    {originalPrice && (
                                        <span className="text-2xl text-gray-400 line-through">
                                            ৳{originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#f84c63] hover:bg-[#e03e53] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#f84c63]/30 hover:shadow-[#f84c63]/50 hover:-translate-y-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Add to Cart
                            </button>

                            <div className="mt-8 space-y-4 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                                    <svg
                                        className="w-5 h-5 text-emerald-500"
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
                                    In stock, ready to ship
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    Delivery within 2-3 days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
