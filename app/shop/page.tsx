import ProductList from "../components/ProductList";

const domain = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Edit this object to update the SEO CollectionPage schema data manually
const seoData = {
    name: "Shop | TooyBD",
    description: "Browse all available products in our shop.",
    url: `${domain}/shop`,
};

export default function ShopPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: seoData.name,
        description: seoData.description,
        url: seoData.url,
    };

    return (
        <div className="container my-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Shop</h1>
                <p className="text-sm text-zinc-600">
                    Browse all products Available product in the shop.
                </p>
            </div>
            <ProductList />
        </div>
    );
}
