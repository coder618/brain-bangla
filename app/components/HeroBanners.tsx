import Link from "next/link";

export default function HeroBanners() {
    return (
        <section className="w-full  md:py-8 pt-4 pb-15   bg-background-main ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                    {/* Left Large Banner */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-[#40b5a6] p-6 sm:p-8 md:p-12 lg:col-span-2 min-h-[350px] lg:min-h-[500px] pb-[120]">
                        {/* Decorative elements */}
                        <svg
                            className="absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-20 pointer-events-none"
                            viewBox="0 0 1000 200"
                            fill="none"
                        >
                            <path
                                d="M0,200 Q250,0 500,100 T1000,0"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                            />
                        </svg>

                        <div className="relative z-10 w-full max-w-md">
                            <div className="mb-4 sm:mb-6 inline-block rounded bg-white px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-zinc-800 shadow-sm">
                                খেলার মাধ্যমে
                            </div>
                            <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-extrabold leading-tight lg:text-6xl text-white">
                                আপনার সন্তান হবে আরো মেধাবী
                            </h2>
                            <p className="mb-6 text-lg font-medium text-white/90">
                                আপনার সন্তানের মেধা বিকাশের জন্যে সেরা সব খেলনা নিয়ে সাজানো আমার এই
                                Online Shop
                            </p>

                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-zinc-900 transition-colors hover:bg-zinc-100"
                            >
                                Shop Now <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Placeholder for main image */}
                        <div className="absolute md:bottom-0 -bottom-2 right-0  h-[80%] w-1/2 bg-black/5 lg:block rounded-tl-full ">
                            <div className="absolute inset-0 flex md:items-center items-end justify-center text-sm font-medium text-white/50">
                                <img src="/images/boy-with-paper.png" alt="boy-with-paper" />
                            </div>
                        </div>
                    </div>

                    {/* Right Stacked Banners */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {/* Top Right Banner */}
                        <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f38c16] p-6 sm:p-8 text-white min-h-[200px] sm:min-h-[240px]">
                            <div className="relative z-10 w-full max-w-[200px] sm:max-w-[220px]">
                                <h3 className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-bold leading-tight">
                                    ধৈর্য এবং মনোযোগ বৃদ্ধি হবে
                                </h3>
                                <p className="mb-6 text-md text-white/90">
                                    আমাদের আছে ধৈর্য এবং মনোযোগ বৃদ্ধির মজার খেলা{" "}
                                    <b>Focus Challenge</b>
                                </p>
                            </div>
                            {/* Placeholder for top right image */}
                            <div>
                                <img
                                    src="/images/wating-girl.png"
                                    alt=""
                                    className="absolute -top-5 w-[220px] right-1"
                                />
                                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>
                            </div>
                        </div>

                        {/* Bottom Right Banner */}
                        <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-[#eb3a56] p-6 sm:p-8 text-white min-h-[200px] sm:min-h-[240px]">
                            <div className="relative z-10 w-full max-w-[200px] sm:max-w-[220px]">
                                <h3 className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-bold leading-tight">
                                    Problem Solving Skill বাড়বে
                                </h3>
                                <p className="mb-6 text-md text-white/90">
                                    Problem Solving skill বাড়ানোর জন্য আমাদের আছে{" "}
                                    <b>Brain Booster</b>
                                </p>
                            </div>
                            {/* Placeholder for bottom right image */}
                            <img
                                src="/images/problem-solving.png"
                                alt=""
                                className="absolute -top-5 w-[420px] -right-35"
                            />
                            <div className="absolute -right-6 sm:-right-4 top-1/2 h-24 w-24 sm:h-32 sm:w-32 -translate-y-1/2 rounded-full bg-black/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
