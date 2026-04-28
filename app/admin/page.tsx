"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

interface OrderItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    image?: string;
}

interface Order {
    id: string;
    userId: string | null;
    orderId: string;
    name: string;
    phone: string;
    address: string;
    postCode: string | null;
    paymentMethod: string;
    transactionId: string | null;
    items: OrderItem[];
    total: number;
    status?: string;
    createdAt: number | null;
}

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [limit] = useState(10);
    const [error, setError] = useState<string | null>(null);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [updating, setUpdating] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                if (currentUser.email === "iamahadul@gmail.com") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    router.push("/");
                }
            } else {
                setUser(null);
                setIsAdmin(false);
                router.push("/");
            }
        });
        return unsubscribe;
    }, [router]);

    const fetchOrders = async (currentPage: number, token: string) => {
        setLoading(true);
        setError(null);

        try {
            const baseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "http://127.0.0.1:5001/your-firebase-project-id/us-central1/api";

            const response = await fetch(
                `${baseUrl}/api/admin/orders?page=${currentPage}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to fetch orders. You might not have admin privileges.");
            }

            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
                setHasMore(data.hasMore);
                setPage(currentPage);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            if (isAdmin && user) {
                const token = await user.getIdToken();
                fetchOrders(1, token);
            }
        };
        loadInitialData();
    }, [isAdmin, user]);

    const handleUpdateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingOrder || !user) return;

        setUpdating(true);
        try {
            const token = await user.getIdToken();
            const baseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "http://127.0.0.1:5001/your-firebase-project-id/us-central1/api";

            const response = await fetch(`${baseUrl}/api/admin/orders/${editingOrder.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: editingOrder.name,
                    phone: editingOrder.phone,
                    address: editingOrder.address,
                    status: editingOrder.status || "pending",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update order");
            }

            // Refresh the current page
            await fetchOrders(page, token);
            setEditingOrder(null);
        } catch (err) {
            console.error("Error updating order:", err);
            alert("Failed to update order.");
        } finally {
            setUpdating(false);
        }
    };

    if (isAdmin === null || (loading && orders.length === 0)) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#f84c63] border-t-transparent"></div>
                <p className="mt-4 text-zinc-500">Loading admin panel...</p>
            </div>
        );
    }

    if (isAdmin === false) {
        return null; // Will redirect
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Admin Dashboard - Orders</h1>

            {error && <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">{error}</div>}

            <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-zinc-600">
                    <thead className="bg-zinc-50 text-zinc-900">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Order ID</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50">
                                    <td className="px-6 py-4 font-medium text-zinc-900">
                                        {order.orderId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>{order.name}</div>
                                        <div className="text-xs text-zinc-400">{order.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ৳{order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                order.status === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "shipped"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : order.status === "cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {(order.status || "pending").toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setEditingOrder({ ...order })}
                                            className="text-[#f84c63] hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={async () => {
                        if (user) {
                            const token = await user.getIdToken();
                            fetchOrders(page - 1, token);
                        }
                    }}
                    disabled={page === 1 || loading}
                    className="rounded-lg border border-zinc-200 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-zinc-600">Page {page}</span>
                <button
                    onClick={async () => {
                        if (user) {
                            const token = await user.getIdToken();
                            fetchOrders(page + 1, token);
                        }
                    }}
                    disabled={!hasMore || loading}
                    className="rounded-lg border border-zinc-200 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Edit Modal */}
            {editingOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-bold">
                            Edit Order: {editingOrder.orderId}
                        </h2>
                        <form onSubmit={handleUpdateOrder} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700">
                                    Status
                                </label>
                                <select
                                    value={editingOrder.status || "pending"}
                                    onChange={(e) =>
                                        setEditingOrder({ ...editingOrder, status: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    value={editingOrder.name}
                                    onChange={(e) =>
                                        setEditingOrder({ ...editingOrder, name: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={editingOrder.phone}
                                    onChange={(e) =>
                                        setEditingOrder({ ...editingOrder, phone: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700">
                                    Address
                                </label>
                                <textarea
                                    value={editingOrder.address}
                                    onChange={(e) =>
                                        setEditingOrder({
                                            ...editingOrder,
                                            address: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-[#f84c63] focus:ring-1 focus:ring-[#f84c63]"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingOrder(null)}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="rounded-lg bg-[#f84c63] px-4 py-2 text-sm font-medium text-white hover:bg-[#e03e53] disabled:opacity-50"
                                >
                                    {updating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
