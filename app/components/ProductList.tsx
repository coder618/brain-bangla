"use client";

import ProductCard from "./ProductCard";

const ProductsArray = {
    products: [
        {
            id: 1,
            slug: "tangram-puzzle-magnetic",
            name: "Tangram Puzzle (Magnetic)",
            price: 360,
            fetImage: "/images/tangram-puzzle-small.png",
            images: [
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
            ],
            description: "Tangram puzzle with magnetic pieces.",
            stock: 10,
            rating: 4.5,
            reviewCount: 10,
        },
        {
            id: 2,
            slug: "electric-buzz-game",
            name: "Electric Buzz Game",
            price: 500,
            fetImage: "/images/tangram-puzzle-small.png",
            images: [
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
                "/images/tangram-puzzle-small.png",
            ],
            description: "Help to increase focus skills.",
            stock: 10,
            rating: 4.5,
            reviewCount: 10,
        },
        {
            id: 2,
            slug: "brain-booster",
            name: "Brain Booster",
            price: 300,
            fetImage: "/images/brain-booster.png",
            images: [
                "/images/brain-booster.png",
                "/images/brain-booster.png",
                "/images/brain-booster.png",
                "/images/brain-booster.png",
            ],
            description: "Help to increase focus skills.",
            stock: 10,
            rating: 4.5,
            reviewCount: 10,
        },
    ],
    lastUpdateTime: "28-04-26",
};

export default function ProductList() {
    const products = ProductsArray.products;

    if (products.length === 0) {
        return <p className="text-sm text-zinc-600">No products found.</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
            {products.map((product, index) => (
                <ProductCard
                    key={`${product.id ?? product.name ?? "product"}-${index}`}
                    product={{ ...product, image: product.fetImage }} // Map fetImage to image so ProductCard can display it
                />
            ))}
        </div>
    );
}
