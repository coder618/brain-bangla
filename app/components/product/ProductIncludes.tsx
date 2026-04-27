import React from "react";

export interface IncludeItem {
    item: string;
    description?: string;
}

export interface ProductIncludesProps {
    title?: string;
    items: IncludeItem[];
}

export default function ProductIncludes({ title = "What's in the Box?", items }: ProductIncludesProps) {
    return (
        <div className="mt-20 rounded-3xl bg-zinc-900 px-6 py-16 text-white md:px-12 md:py-20 lg:px-24">
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl text-[#f84c63]">
                {title}
            </h2>
            <div className="mx-auto max-w-3xl space-y-6">
                {items.map((includedItem, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 rounded-2xl bg-zinc-800 p-6 transition-colors hover:bg-zinc-700"
                    >
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f84c63]/20 text-[#f84c63]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{includedItem.item}</h3>
                            {includedItem.description && (
                                <p className="text-zinc-400 text-base leading-relaxed">
                                    {includedItem.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}