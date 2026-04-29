"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative  w-full bg-[#1e564d] text-white">
            {/* Scalloped top border effect using radial gradients */}
            <div className="absolute left-0 right-0 -top-6 h-6 w-full overflow-hidden leading-none">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 50% 100%, #1e564d 12px, transparent 13px)",
                        backgroundSize: "40px 24px",
                        backgroundRepeat: "repeat-x",
                    }}
                />
            </div>

            <div className="mx-auto w-full max-w-7xl px-6 py-12">
                {/* Top Features Section */}
                <div className="grid grid-cols-1 gap-6 border-b border-white/10 pb-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-12">
                    <div className="flex items-center gap-4">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 17h4V5H2v12h3" />
                            <path d="M20 17h2v-9h-5V5" />
                            <path d="M15 8h4l3 3v6h-2" />
                            <circle cx="8.5" cy="17.5" r="1.5" />
                            <circle cx="18.5" cy="17.5" r="1.5" />
                        </svg>
                        <div>
                            <h4 className="font-semibold">Whole Bangladesh Shipping</h4>
                            <p className="text-xs text-white/70">
                                Enjoy free delivery on bundles orders.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        <div>
                            <h4 className="font-semibold">Money-Back Guarantee</h4>
                            <p className="text-xs text-white/70">
                                Return The Product, if you dont like.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        <div>
                            <h4 className="font-semibold">Flexible Payment Options</h4>
                            <p className="text-xs text-white/70">COD and Nagad are available.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div>
                            <h4 className="font-semibold">Online Customer Service</h4>
                            <p className="text-xs text-white/70">
                                Call our expert (084) 123 - 456 88
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Links Section */}
                <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-5 md:gap-12">
                    <div className="sm:col-span-2 md:col-span-1">
                        <Link
                            href="/"
                            className="mb-4 inline-flex items-center text-4xl font-black tracking-tighter"
                            style={{ fontFamily: "system-ui, sans-serif" }}
                        >
                            TooyBd
                            {/* <img src="./logo.png" alt="tooybd logo" /> */}
                        </Link>
                        <p className="text-sm text-white/70 mt-2">
                            Since 2026 we have been delivering.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-semibold">Customer</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-and-conditions"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-semibold">About Us</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/investors"
                                    className="hover:text-white transition-colors"
                                >
                                    Investor Relations
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-semibold">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                <Link href="/shop" className="hover:text-white transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="hover:text-white transition-colors">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-sm font-semibold">Contact</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                15051 E. Alameda Pkwy,
                                <br />
                                Aurora, CO 80012, USA
                            </li>
                            <li>0123 666 999</li>
                            <li>demo@demo.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright & Links */}
                <div className="flex flex-col items-center justify-center border-t border-white/10 pt-8 pb-4 gap-6 text-center text-xs text-white/70">
                    <p>Copyright © {year} All Rights Reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            className="hover:text-white transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link href="/investors" className="hover:text-white transition-colors">
                            Investor Relations
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#f84c63] text-white shadow-lg transition-colors hover:bg-[#e03e53]"
                aria-label="Back to top"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
        </footer>
    );
}
