import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

const notoSansBengali = Noto_Sans_Bengali({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin", "bengali"],
    variable: "--font-noto-sans-bengali",
});

export const metadata: Metadata = {
    title: {
        default: "TOOYBD - Educational and Fun Toys for Kids",
        template: "%s | TOOYBD",
    },
    description:
        "Explore the best toys, puzzles, and special deals for kids of all ages at TOOYBD. Your one-stop shop for educational and fun toys.",
    keywords: ["toys", "educational toys", "kids", "puzzles", "toy store", "TOOYBD"],
    openGraph: {
        title: "TOOYBD - Educational and Fun Toys for Kids",
        description:
            "Explore the best toys, puzzles, and special deals for kids of all ages at TOOYBD. Your one-stop shop for educational and fun toys.",
        url: "https://www.tooybd.com",
        siteName: "TOOYBD",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TOOYBD - Educational and Fun Toys for Kids",
        description:
            "Explore the best toys, puzzles, and special deals for kids of all ages at TOOYBD. Your one-stop shop for educational and fun toys.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${notoSansBengali.variable} h-full antialiased`}>
            <body className={`min-h-full flex flex-col font-sans ${notoSansBengali.className}`}>
                <CartProvider>
                    <Header />
                    <main className="flex flex-1 flex-col">{children}</main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
