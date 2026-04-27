import React from "react";

export interface Benefit {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export interface ProductBenefitsProps {
    title?: string;
    benefits: Benefit[];
}

export default function ProductBenefits({ title = "Why Buy This Product?", benefits }: ProductBenefitsProps) {
    return (
        <div className="mt-20 border-t border-black/5 pt-16">
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                {benefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col gap-4 rounded-3xl bg-zinc-50 p-8 border border-zinc-100 transition-colors hover:border-zinc-200 hover:bg-zinc-100/50"
                    >
                        {benefit.icon && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#f84c63] shadow-sm">
                                {benefit.icon}
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-zinc-900">{benefit.title}</h3>
                        <p className="text-base text-zinc-600 leading-relaxed">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}