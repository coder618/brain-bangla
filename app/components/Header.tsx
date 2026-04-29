"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    User,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { useCart } from "../context/CartContext";
import { auth } from "../lib/firebase";

const NAV_LINKS = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    { title: "Contact", href: "/contact" },
    { title: "Investors", href: "/investors" },
];

export default function Header() {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isBusy, setIsBusy] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { cartCount } = useCart();

    useEffect(() => {
        if (!auth) return;

        const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser);
        });

        return unsubscribe;
    }, [auth]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    async function handleGoogleLogin() {
        setErrorMessage(null);

        if (!auth) {
            setErrorMessage(
                "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_APP_ID.",
            );
            return;
        }

        setIsBusy(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setIsModalOpen(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed.";
            setErrorMessage(message);
        } finally {
            setIsBusy(false);
        }
    }

    async function handleLogout() {
        setErrorMessage(null);
        if (!auth) return;
        setIsBusy(true);
        try {
            await signOut(auth);
        } finally {
            setIsBusy(false);
        }
    }

    // Helper to extract the last name from displayName
    const getLastName = (name: string | null) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        return parts.length > 1 ? parts[parts.length - 1] : parts[0];
    };

    return (
        <header className="relative z-40 w-full bg-[#fbdce2] py-4 px-4 sm:px-8">
            <div className="container flex h-16 w-full items-center justify-between rounded-full bg-[#fdfaf2] px-4 sm:px-6 shadow-sm">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center text-3xl font-black tracking-tighter max-w-[120px] h-[auto]"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                >
                    <img src="/logo.png" alt="Toys" className="w-full h-auto" />
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#111]">
                    {NAV_LINKS.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/" && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.title}
                                href={link.href}
                                className={`transition-colors hover:text-[#f84c63] ${
                                    isActive ? "text-[#f84c63]" : ""
                                }`}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                    {user && (
                        <Link
                            href="/my-account"
                            className={`transition-colors hover:text-[#f84c63] ${
                                pathname === "/my-account" ? "text-[#f84c63]" : ""
                            }`}
                        >
                            My Account
                        </Link>
                    )}
                </nav>

                {/* Icons & Cart */}
                <div className="flex items-center gap-3 sm:gap-5">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <span className="hidden lg:inline text-sm font-medium text-zinc-600">
                                Welcome, {getLastName(user.displayName)}
                            </span>
                            <button
                                onClick={handleLogout}
                                title="Logout"
                                className="flex items-center gap-1 text-sm font-semibold text-[#f84c63] transition-colors hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-full"
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setErrorMessage(null);
                                setIsModalOpen(true);
                            }}
                            title="Login"
                            className="flex items-center gap-1 text-sm font-semibold text-[#f84c63] transition-colors hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-full"
                        >
                            <span>Login</span>
                        </button>
                    )}

                    <Link
                        href="/cart"
                        className="flex items-center gap-2 rounded-full bg-[#f84c63] md:pl-3 md:pr-1 md:py-1 p-1 text-sm font-semibold text-white transition-colors hover:bg-[#e03e53]"
                    >
                        <span className="hidden sm:inline">
                            Cart: {cartCount} Item{cartCount !== 1 ? "s" : ""}
                        </span>
                        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        className="md:hidden flex items-center justify-center text-zinc-900 transition-colors hover:text-[#f84c63]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
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
                            {isMobileMenuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen ? (
                <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 mt-4">
                        <Link
                            href="/"
                            className="flex items-center text-3xl font-black tracking-tighter"
                            style={{ fontFamily: "system-ui, sans-serif" }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="text-[#f5415f]">g</span>
                            <span className="text-[#8cc63f]">ü</span>
                            <span className="text-[#f7931e]">z</span>
                            <span className="text-[#f5415f]">a</span>
                            <span className="text-[#29abe2]">l</span>
                        </Link>
                        <button
                            className="flex items-center justify-center text-zinc-900 transition-colors hover:text-[#f84c63] p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center pb-20">
                        <nav className="flex flex-col items-center gap-8 text-2xl font-bold text-[#111]">
                            {NAV_LINKS.map((link) => {
                                const isActive =
                                    pathname === link.href ||
                                    (link.href !== "/" && pathname?.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className={`transition-colors hover:text-[#f84c63] ${
                                            isActive ? "text-[#f84c63]" : ""
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.title}
                                    </Link>
                                );
                            })}
                            {user && (
                                <Link
                                    href="/my-account"
                                    className={`transition-colors hover:text-[#f84c63] ${
                                        pathname === "/my-account" ? "text-[#f84c63]" : ""
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Account
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            ) : null}

            {isModalOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Login"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-black shadow-xl">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-base font-semibold">Sign in</h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full px-2 py-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600">
                            Continue with your Google account.
                        </p>
                        {errorMessage ? (
                            <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
                        ) : null}
                        <div className="mt-5 flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isBusy}
                                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/[.08] bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-black/[.04] disabled:opacity-50"
                            >
                                Log in with Google
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
