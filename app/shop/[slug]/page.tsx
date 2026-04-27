import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Product = {
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
    detailHtml?: string;
    [key: string]: unknown;
};

async function getProduct(id: string): Promise<Product | null> {
    try {
        const filePath = path.join(process.cwd(), "public", "product-data", `${id}.json`);
        const fileContents = await fs.readFile(filePath, "utf8");
        const product = JSON.parse(fileContents) as Product;

        if (typeof product.detailHtmlPath === "string") {
            try {
                // Remove leading slash if present to make path.join work safely
                const htmlPath = product.detailHtmlPath.startsWith("/")
                    ? product.detailHtmlPath.slice(1)
                    : product.detailHtmlPath;

                const htmlFullPath = path.join(process.cwd(), "public", htmlPath);
                const htmlContents = await fs.readFile(htmlFullPath, "utf8");
                product.detailHtml = htmlContents;
            } catch {
                // Ignore missing HTML files
            }
        }

        return product;
    } catch {
        return null;
    }
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const title = product.title ?? product.name ?? "Untitled Product";
    const description = product.description ?? "No description provided.";
    const image = product.featuredImage ?? product.image ?? null;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: image ? [image] : [],
            type: "website",
        },
    };
}

function formatPrice(price: Product["price"]) {
    if (typeof price === "number") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(price);
    }

    if (typeof price === "string" && price.trim().length > 0) {
        return price;
    }

    return null;
}

function toNumberPrice(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value !== "string") return null;
    const normalized = value.replace(/[^0-9.]/g, "");
    if (!normalized) return null;
    const parsed = Number(normalized);
    if (!Number.isFinite(parsed)) return null;
    return parsed;
}

function getSiteUrl(): string | null {
    const raw = process.env.NEXT_PUBLIC_SITE_URL;
    if (!raw) return null;
    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const title = product.title ?? product.name ?? "Untitled Product";
    const description = product.description ?? "No description provided.";
    const price = formatPrice(product.price);
    const salePrice = formatPrice(product.salePrice);
    const image = product.featuredImage ?? product.image ?? null;
    const galleryCount = Array.isArray(product.gallery) ? product.gallery.length : 0;
    const currency = process.env.NEXT_PUBLIC_CURRENCY ?? "USD";
    const siteUrl = getSiteUrl();
    const productPath = `/shop/${encodeURIComponent(id)}`;
    const productUrl = siteUrl ? `${siteUrl}${productPath}` : productPath;
    const priceNumber = toNumberPrice(product.salePrice ?? product.price);
    const listPriceNumber = product.salePrice !== undefined ? toNumberPrice(product.price) : null;

    const images = [
        ...(image ? [image] : []),
        ...(Array.isArray(product.gallery) ? product.gallery : []),
    ].filter((v): v is string => typeof v === "string" && v.length > 0);

    const productSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${productUrl}#webpage`,
                url: productUrl,
                name: title,
                description,
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${productUrl}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Shop",
                        item: siteUrl ? `${siteUrl}/shop` : "/shop",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: title,
                        item: productUrl,
                    },
                ],
            },
            {
                "@type": "Product",
                "@id": `${productUrl}#product`,
                name: title,
                description,
                sku: String(product.id ?? id),
                image: images.length > 0 ? images : undefined,
                offers:
                    typeof priceNumber === "number"
                        ? {
                              "@type": "Offer",
                              url: productUrl,
                              priceCurrency: currency,
                              price: priceNumber.toFixed(2),
                              availability: "https://schema.org/InStock",
                              itemCondition: "https://schema.org/NewCondition",
                              priceSpecification:
                                  typeof listPriceNumber === "number"
                                      ? [
                                            {
                                                "@type": "UnitPriceSpecification",
                                                priceCurrency: currency,
                                                price: listPriceNumber.toFixed(2),
                                                name: "List price",
                                            },
                                        ]
                                      : undefined,
                          }
                        : undefined,
            },
        ],
    };

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <div className="mb-10 text-sm">
                <Link href="/shop" className="text-zinc-500 hover:text-zinc-900">
                    &larr; Back to Shop
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-black/8 bg-zinc-100">
                        {image ? (
                            <Image
                                src={image}
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
                    {galleryCount > 0 && Array.isArray(product.gallery) && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.gallery.map((galleryImage, idx) => (
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
                <div className="flex flex-col">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 ">
                        {title}
                    </h1>

                    <div className="mb-8">
                        {salePrice ? (
                            <div className="flex items-baseline gap-3">
                                <p className="text-2xl font-bold text-zinc-900 ">{salePrice}</p>
                                {price && (
                                    <p className="text-lg text-zinc-500 line-through">{price}</p>
                                )}
                            </div>
                        ) : price ? (
                            <p className="text-2xl font-medium text-zinc-700">{price}</p>
                        ) : null}
                    </div>

                    <div className="mb-8 rounded-2xl bg-zinc-50 p-6">
                        <h2 className="mb-3 text-lg font-semibold text-zinc-900 ">Description</h2>
                        <p className="text-base text-zinc-700 leading-relaxed">{description}</p>
                    </div>

                    <div className="mt-4">
                        <button className="flex w-full md:w-auto items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white shadow hover:bg-zinc-800 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Detailed HTML Content if available */}
            {product.detailHtml && (
                <div className="mt-20 pt-10 border-t border-black/8">
                    <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 ">
                        More Information
                    </h2>
                    <div
                        className="prose prose-zinc max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.detailHtml }}
                    />
                </div>
            )}
        </div>
    );
}
