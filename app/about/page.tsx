import Link from "next/link";

export const metadata = {
    title: "About | TooyBd",
    description: "Learn more about Ahadul Islam, the founder and technical force behind TooyBd.",
};

export default function AboutPage() {
    return (
        <div className="bg-[#fdfaf2] min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[#fbdce2] py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-[#111] mb-6 tracking-tight">
                        About the Founder
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-800 mb-10 max-w-2xl mx-auto font-medium">
                        Hi, I am <span className="font-black text-[#f5415f]">Ahadul Islam</span>. As
                        a solo founder and full-stack developer, I combine technical expertise with
                        a passion for building joyful and sustainable experiences for the future of
                        play.
                    </p>
                    <Link
                        href="/investors"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#f84c63] px-8 text-base font-bold text-white transition-colors hover:bg-[#e03e53] shadow-md"
                    >
                        View Investor Pitch
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-[#8cc63f] rounded-full opacity-20 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#f7931e] rounded-full opacity-20 blur-xl"></div>
            </section>

            {/* Technical Expertise Section */}
            <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-[#111] mb-4">
                        My Technical Background
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                        Building a modern toy brand requires a solid digital foundation. Here is the
                        technical expertise I bring to the table to scale our platform and deliver
                        seamless experiences to our customers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Fullstack Development */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-[#111]">
                            Fullstack Development
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Versatile in fullstack development using Laravel, Next.js, and various
                            JavaScript frameworks. Experienced in both server-side and client-side
                            development, as well as integrating complex backend systems with dynamic
                            frontends.
                        </p>
                    </div>

                    {/* Frontend Development */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-[#111]">Frontend Development</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Proficient in modern frontend technologies, including React, Tailwind
                            CSS, HTML5, and CSS3. Skilled in building responsive, user-friendly
                            interfaces with a focus on performance and accessibility.
                        </p>
                    </div>

                    {/* Backend Development */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-[#111]">Backend Development</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Strong background in backend development with PHP, Node.js, and Laravel.
                            Extensive experience in database management, RESTful APIs, and secure,
                            scalable architectures.
                        </p>
                    </div>

                    {/* Custom WordPress Development */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-[#111]">
                            Custom WordPress Development
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Experienced in creating custom WordPress themes, plugins, and tailored
                            solutions. Skilled at optimizing performance, implementing custom APIs,
                            and enhancing SEO.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 px-6 sm:px-12 lg:px-24 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-black text-[#111] mb-6">Let&apos;s Connect</h2>
                <p className="text-zinc-600 mb-10">
                    Whether you are an investor looking to support a highly technical founder, or
                    someone interested in the future of play, I would love to hear from you.
                </p>
                <Link
                    href="mailto:founder@guzal.com"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#111] px-8 text-base font-bold text-white transition-colors hover:bg-zinc-800"
                >
                    Get in Touch
                </Link>
            </section>
        </div>
    );
}
