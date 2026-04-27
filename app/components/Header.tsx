"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
    GoogleAuthProvider,
    User,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    getAuth,
} from "firebase/auth";
import { useCart } from "../context/CartContext";

type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    appId: string;
};

function getFirebaseConfig(): FirebaseConfig | null {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

    if (!apiKey || !authDomain || !projectId || !appId) return null;

    return { apiKey, authDomain, projectId, appId };
}

function getClientAuth() {
    const config = getFirebaseConfig();
    if (!config) return null;

    if (getApps().length === 0) {
        initializeApp(config);
    }

    return getAuth();
}

export default function Header() {
    const auth = useMemo(() => getClientAuth(), []);
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

    return (
        <header className="relative z-40 w-full bg-[#fbdce2] py-4 px-4 sm:px-8">
            <div className="container flex h-16 w-full items-center justify-between rounded-full bg-[#fdfaf2] px-4 sm:px-6 shadow-sm">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center text-3xl font-black tracking-tighter"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                >
                    <span className="text-[#f5415f]">g</span>
                    <span className="text-[#8cc63f]">ü</span>
                    <span className="text-[#f7931e]">z</span>
                    <span className="text-[#f5415f]">a</span>
                    <span className="text-[#29abe2]">l</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#111]">
                    <Link href="/" className="flex items-center gap-1 text-[#f84c63]">
                        Home
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </Link>
                    <Link
                        href="/shop"
                        className="flex items-center gap-1 transition-colors hover:text-[#f84c63]"
                    >
                        Shop
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-[#f84c63]">
                        Blog
                    </Link>
                    <div className="flex items-center gap-1 cursor-pointer transition-colors hover:text-[#f84c63]">
                        Pages
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    <Link href="/contact" className="transition-colors hover:text-[#f84c63]">
                        Contact
                    </Link>
                </nav>

                {/* Icons & Cart */}
                <div className="flex items-center gap-3 sm:gap-5">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="text-[#f84c63] transition-colors hover:text-red-700"
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
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setErrorMessage(null);
                                setIsModalOpen(true);
                            }}
                            title="Login"
                            className="text-zinc-900 transition-colors hover:text-[#f84c63]"
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
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    )}

                    <Link
                        href="/cart"
                        className="flex items-center gap-2 sm:gap-3 rounded-full bg-[#f84c63] pl-3 sm:pl-4 pr-1 py-1 text-sm font-semibold text-white transition-colors hover:bg-[#e03e53]"
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
                <div className="md:hidden absolute top-20 left-4 right-4 z-50 rounded-2xl bg-white p-6 shadow-xl border border-zinc-100">
                    <nav className="flex flex-col gap-4 text-[15px] font-bold text-[#111]">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-[#f84c63]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="flex items-center gap-2 transition-colors hover:text-[#f84c63]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/blog"
                            className="transition-colors hover:text-[#f84c63]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-[#f84c63]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </nav>
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
