"use client";

import ProductCard from "./ProductCard";
import ProductsArray from "../data/products.json";

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
