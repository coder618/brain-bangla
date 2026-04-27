"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";

const MAX_PRODUCTS = 100;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const loadedProducts: Product[] = [];

        for (let i = 1; i <= MAX_PRODUCTS; i += 1) {
          const response = await fetch(`/product-data/product-${i}.json`);
          if (!response.ok) {
            break;
          }

          const product = (await response.json()) as Product;
          loadedProducts.push(product);
        }

        const productsWithDetails = await Promise.all(
          loadedProducts.map(async (product) => {
            if (typeof product.detailHtmlPath !== "string") return product;

            try {
              const detailResponse = await fetch(product.detailHtmlPath);
              if (!detailResponse.ok) return product;
              const detailHtml = await detailResponse.text();
              return { ...product, detailHtml };
            } catch {
              return product;
            }
          })
        );

        if (isActive) {
          setProducts(productsWithDetails);
        }
      } catch {
        if (isActive) {
          setError("Unable to load products right now.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) {
    return (
      <p className="text-sm text-zinc-600">Loading products...</p>
    );
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <p className="text-sm text-zinc-600">
        No products found. Add files like
        {" "}
        <code>/product-data/product-1.json</code>
        {" "}
        and
        {" "}
        <code>/product-data/product-2.json</code>.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
      {products.map((product, index) => (
        <ProductCard key={`${product.id ?? product.title ?? "product"}-${index}`} product={product} />
      ))}
    </div>
  );
}
