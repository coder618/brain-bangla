"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "nagad">("cod");
    const [transactionId, setTransactionId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === "nagad" && !transactionId) {
            setErrorMessage("Transaction ID is required for Nagad payment.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const baseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "http://127.0.0.1:5001/your-firebase-project-id/us-central1/api";

            const response = await fetch(`${baseUrl}/api/place-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.uid || null,
                    name,
                    phone,
                    address,
                    postCode,
                    paymentMethod,
                    transactionId: paymentMethod === "nagad" ? transactionId : undefined,
                    items: cartItems.map((item) => ({
                        id: item.product.id,
                        title: item.product.title || item.product.name || "Untitled",
                        quantity: item.quantity,
                        price: item.product.salePrice || item.product.price,
                        image: item.product.featuredImage || item.product.image || null,
                    })),
                    total: cartTotal,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || data.error || "Failed to place order");
            }

            setSuccessMessage(data.message || "Order successfully placed!");
            clearCart();
            setName("");
            setPhone("");
            setAddress("");
            setPostCode("");
            setPaymentMethod("cod");
            setTransactionId("");
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (successMessage) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="mx-auto max-w-md rounded-2xl bg-green-50 p-8 shadow-sm">
                    <svg
                        className="mx-auto h-16 w-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h2 className="mt-4 text-2xl font-bold text-green-800">Success!</h2>
                    <p className="mt-2 text-green-700">{successMessage}</p>
                    <Link
                        href="/shop"
                        className="mt-6 inline-block rounded-full bg-green-600 px-6 py-2 text-white font-semibold hover:bg-green-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link
                    href="/shop"
                    className="inline-block rounded-full bg-[#f84c63] px-6 py-2 text-white font-semibold hover:bg-[#e03e53] transition-colors"
                >
                    Go to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => {
                        const image = item.product.featuredImage || item.product.image;
                        const title = item.product.title || item.product.name || "Untitled";
                        const price = item.product.salePrice || item.product.price;

                        return (
                            <div
                                key={item.product.id}
                                className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                            >
                                <div className="relative h-24 w-24 flex-shrink-0 bg-zinc-100 rounded-lg overflow-hidden">
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-zinc-900">{title}</h3>
                                    <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                                    <p className="font-medium mt-1">
                                        {typeof price === "number" ? `৳${price.toFixed(2)}` : price}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id as string)}
                                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                                    title="Remove item"
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
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Checkout Form */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sticky top-8">
                        <h2 className="text-xl font-bold mb-4">Checkout</h2>

                        <div className="mb-6 flex justify-between items-center text-lg font-semibold border-b border-zinc-100 pb-4">
                            <span>Total</span>
                            <span>৳{cartTotal.toFixed(2)}</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errorMessage && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Post Code
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={postCode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Payment Method
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label
                                        className={`cursor-pointer rounded-lg border p-3 text-center transition-colors ${paymentMethod === "cod" ? "border-[#f84c63] bg-red-50 text-[#f84c63]" : "border-zinc-200 hover:bg-zinc-50"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                            className="hidden"
                                        />
                                        <span className="font-medium text-sm">
                                            Cash on Delivery
                                        </span>
                                    </label>
                                    <label
                                        className={`cursor-pointer rounded-lg border p-3 text-center transition-colors ${paymentMethod === "nagad" ? "border-[#f84c63] bg-red-50 text-[#f84c63]" : "border-zinc-200 hover:bg-zinc-50"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="nagad"
                                            checked={paymentMethod === "nagad"}
                                            onChange={() => setPaymentMethod("nagad")}
                                            className="hidden"
                                        />
                                        <span className="font-medium text-sm">Nagad</span>
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === "nagad" && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                                        Transaction ID
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="e.g. 7X9A2B4C"
                                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                    />
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Please send money to our Nagad number first, then enter the
                                        TrxID.
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-full bg-[#f84c63] py-3 font-semibold text-white transition-colors hover:bg-[#e03e53] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
