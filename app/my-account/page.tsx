"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

type OrderItem = {
    id: string | number;
    title: string;
    quantity: number;
    price: number;
    image: string | null;
};

type Order = {
    id: string;
    orderId: string;
    name: string;
    address: string;
    phone: string;
    paymentMethod: string;
    total: number;
    items: OrderItem[];
    createdAt: number | null;
};

export default function MyAccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async (currentUser: User) => {
        try {
            const token = await currentUser.getIdToken();
            const baseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "http://127.0.0.1:5001/your-firebase-project-id/us-central1/api";

            const response = await fetch(`${baseUrl}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchOrders(currentUser);
            } else {
                router.push("/");
            }
        });
        return unsubscribe;
    }, [router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-zinc-500">Loading your account...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="mb-10 bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                <p className="text-zinc-600">Email: {user?.email}</p>
                {user?.displayName && <p className="text-zinc-600">Name: {user.displayName}</p>}
            </div>

            <h2 className="text-2xl font-bold mb-6">Order History</h2>

            {orders.length === 0 ? (
                <div className="text-center py-10 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-zinc-500 mb-4">You have no previous orders.</p>
                    <Link
                        href="/shop"
                        className="inline-block rounded-full bg-[#f84c63] px-6 py-2 text-white font-semibold hover:bg-[#e03e53] transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
                        >
                            <div className="bg-zinc-50 p-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-zinc-500 mb-1">
                                        Order ID:{" "}
                                        <span className="font-medium text-zinc-900">
                                            {order.orderId}
                                        </span>
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        Date:{" "}
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString()
                                            : "Pending"}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-sm text-zinc-500 mb-1">Total</p>
                                    <p className="font-bold text-zinc-900">
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm text-zinc-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-zinc-900 mb-1">
                                            Shipping Address
                                        </p>
                                        <p className="text-zinc-600">{order.name}</p>
                                        <p className="text-zinc-600">{order.address}</p>
                                        <p className="text-zinc-600">{order.phone}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-900 mb-1">
                                            Payment Method
                                        </p>
                                        <p className="text-zinc-600 capitalize">
                                            {order.paymentMethod === "cod"
                                                ? "Cash on Delivery"
                                                : order.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
