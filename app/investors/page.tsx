import Link from "next/link";

export const metadata = {
    title: "Investors | güzal",
    description: "Invest in güzal - Shaping the future of play.",
};

export default function InvestorsPage() {
    return (
        <div className="bg-[#fdfaf2] min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[#fbdce2] py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-[#111] mb-6 tracking-tight">
                        Invest in the Future of Play
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-800 mb-10 max-w-2xl mx-auto font-medium">
                        At <span className="font-black text-[#f5415f]">güzal</span>, we are
                        revolutionizing the toy industry by creating joyful, sustainable, and
                        educational experiences for children across the globe. Join us on our
                        mission.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#f84c63] px-8 text-base font-bold text-white transition-colors hover:bg-[#e03e53] shadow-md"
                    >
                        Request Pitch Deck
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-[#8cc63f] rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#f7931e] rounded-full opacity-20 blur-xl"></div>
            </section>

            {/* Why Invest Section */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-[#111] mb-4">
                        Why Invest in güzal?
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                        We are uniquely positioned in a rapidly growing market, backed by a
                        passionate team and a proven track record of delivering smiles.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Reason 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#fbdce2] rounded-xl flex items-center justify-center mb-6 text-[#f84c63]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#111]">Rapid Growth</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Since our inception, we have consistently doubled our YoY revenue,
                            capturing significant market share in the premium educational toy
                            sector.
                        </p>
                    </div>

                    {/* Reason 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#e6f4d9] rounded-xl flex items-center justify-center mb-6 text-[#8cc63f]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#111]">Sustainable Edge</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Our commitment to eco-friendly materials and ethical manufacturing
                            processes resonates strongly with today&apos;s conscious consumers.
                        </p>
                    </div>

                    {/* Reason 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-[#fff0d9] rounded-xl flex items-center justify-center mb-6 text-[#f7931e]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#111]">Loyal Community</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            With an exceptional customer retention rate and thousands of five-star
                            reviews, our brand advocates are our strongest asset.
                        </p>
                    </div>
                </div>
            </section>

            {/* Traction & Numbers */}
            <section className="bg-[#1e564d] text-white py-16 px-6 sm:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-black mb-2 text-[#8cc63f]">
                            2.5M+
                        </div>
                        <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                            Toys Delivered
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black mb-2 text-[#f7931e]">
                            $10M
                        </div>
                        <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                            Annual Revenue
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black mb-2 text-[#29abe2]">
                            150k+
                        </div>
                        <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                            Active Customers
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black mb-2 text-[#f84c63]">
                            4.9/5
                        </div>
                        <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                            Average Rating
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-black text-[#111] mb-6">
                    Ready to Shape the Future Together?
                </h2>
                <p className="text-zinc-600 mb-10">
                    We are currently raising our Series A to expand our product lines and scale
                    internationally. Reach out to our founding team to access our data room and
                    schedule an introductory call.
                </p>
                <Link
                    href="mailto:investors@guzal.com"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#111] px-8 text-base font-bold text-white transition-colors hover:bg-zinc-800"
                >
                    Contact Investor Relations
                </Link>
            </section>
        </div>
    );
}
