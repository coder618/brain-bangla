import Link from "next/link";

export default function SpecialDeals() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 md:py-12">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-[#ffdadf] px-4 sm:px-8 py-12 sm:py-16 md:py-24 text-center shadow-sm">
                {/* Top Left Checkerboard Pattern */}
                <div
                    className="absolute left-0 top-0 h-64 w-64 opacity-30"
                    style={{
                        backgroundImage:
                            "linear-gradient(45deg, #ffc4cb 25%, transparent 25%, transparent 75%, #ffc4cb 75%, #ffc4cb), linear-gradient(45deg, #ffc4cb 25%, transparent 25%, transparent 75%, #ffc4cb 75%, #ffc4cb)",
                        backgroundSize: "60px 60px",
                        backgroundPosition: "0 0, 30px 30px",
                    }}
                />

                {/* Top Right Hearts Placeholder */}
                <div className="absolute right-10 top-10 flex items-center gap-4 opacity-90 text-2xl select-none">
                    <span
                        className="text-[#f84c63] drop-shadow-sm"
                        style={{ transform: "rotate(-15deg)", fontSize: "1.5rem" }}
                    >
                        💖
                    </span>
                    <span
                        className="text-white drop-shadow-md"
                        style={{ transform: "rotate(10deg)", fontSize: "2.5rem" }}
                    >
                        🤍
                    </span>
                </div>

                {/* Bottom Left Flower Placeholder */}
                <div className="absolute bottom-8 left-12 text-7xl drop-shadow-xl select-none hidden md:block">
                    🌻
                </div>
                <div className="absolute bottom-10 left-32 text-xl drop-shadow-xl select-none hidden md:block text-[#ffc629]">
                    🟡
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <h2 className="text-[2.5rem] sm:text-5xl font-black leading-[1.3] tracking-tight text-black md:text-[4rem]">
                        <div className="block">Combo Offer</div>
                        <div className="flex flex-col flex-wrap items-center justify-center gap-2 sm:gap-3">
                            <span>তিনটি আইটেম একসাথে পাচ্ছেন</span>

                            <span className="relative inline-block">
                                {/* Purple brush stroke behind text */}
                                <svg
                                    className="absolute -left-2 -top-1 z-0 h-full w-[120%] text-[#d1aaff] opacity-80"
                                    viewBox="0 0 100 40"
                                    preserveAspectRatio="none"
                                    fill="currentColor"
                                >
                                    <path d="M-5,25 C 20,10 80,5 110,20 C 80,30 20,35 -5,25 Z" />
                                </svg>
                                <span className="relative z-10">মাত্র 999tk</span>
                            </span>

                            <ul className="text-lg flex gap-2">
                                <li>1. Tangram Puzzle Magnetic</li>
                                <li>2. Electric Buzz Game</li>
                                <li>3. Brain Booster</li>
                            </ul>
                        </div>
                    </h2>

                    {/* Requested Additions: Price & Free Delivery Text */}
                    <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold text-zinc-800 backdrop-blur-sm border border-white">
                            <span className="text-[#8cc63f]">✓</span>
                            Free COD Delivery
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/shop"
                        className="mt-8 flex items-center gap-3 rounded-full bg-[#f84c63] pl-6 pr-2 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#e03e53] shadow-lg shadow-[#f84c63]/20"
                    >
                        Shop The Sale
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#f84c63]">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
