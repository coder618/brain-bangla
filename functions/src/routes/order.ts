import express from "express";
import * as logger from "firebase-functions/logger";
import nodemailer from "nodemailer";
import { verifyAuth, AuthenticatedRequest } from "../middleware/auth";
import { connectToDatabase } from "../lib/mongoose";
import Order from "../models/Order";

const ADMIN_EMAIL = "iamahadul@gmail.com";

const router = express.Router();

router.get("/orders", verifyAuth, async (req: AuthenticatedRequest, res: express.Response) => {
    try {
        const uid = req.user?.uid;
        if (!uid) {
            res.status(401).json({ error: "Unauthorized: Missing user ID" });
            return;
        }

        await connectToDatabase();
        const ordersData = await Order.find({ userId: uid }).sort({ createdAt: -1 });

        const orders = ordersData.map((order) => ({
            id: order._id.toString(),
            ...order.toObject(),
            createdAt: order.createdAt.getTime(),
        }));

        res.status(200).json({ success: true, orders });
    } catch (error) {
        logger.error("Error fetching orders", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.post("/place-order", async (req: express.Request, res: express.Response) => {
    const { userId, name, phone, address, postCode, paymentMethod, transactionId, items, total } =
        req.body;

    // Basic validation
    if (!items || !name || !phone || !address || total === undefined) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    try {
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        await connectToDatabase();

        const newOrder = new Order({
            userId: userId || null,
            orderId,
            name,
            phone,
            address,
            postCode: postCode || null,
            paymentMethod: paymentMethod || "cod",
            transactionId: transactionId || null,
            items,
            total,
            status: "pending", // Default status
        });

        await newOrder.save();

        logger.info("Order placed successfully. Order ID: %s", orderId);

        // Send email notification to Admin
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587", 10),
                secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const itemsHtml = items
                .map(
                    (item: { title: string; quantity: number; price: number }) => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">৳${item.price}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">৳${item.quantity * item.price}</td>
                </tr>
            `,
                )
                .join("");

            const htmlContent = `
                <h2>New Order Placed</h2>
                <p>A new order has been placed successfully.</p>
                
                <h3>Customer Details:</h3>
                <ul>
                    <li><strong>Order ID:</strong> ${orderId}</li>
                    <li><strong>Customer Name:</strong> ${name}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Address:</strong> ${address}</li>
                    <li><strong>Total:</strong> ৳${total}</li>
                    <li><strong>Payment Method:</strong> ${paymentMethod || "cod"}</li>
                    ${transactionId ? `<li><strong>Transaction ID:</strong> ${transactionId}</li>` : ""}
                </ul>

                <h3>Order Items:</h3>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Qty</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <br/>
                <p>Please log in to the admin dashboard to view the full order details.</p>
            `;

            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com",
                to: ADMIN_EMAIL,
                subject: "New Order Received: " + orderId,
                html: htmlContent,
            });

            logger.info("Admin notification email sent for order: %s", orderId);
        } catch (emailError) {
            logger.error("Failed to send admin notification email", emailError);
            // Do not throw error here, so the order process still completes successfully
        }

        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            orderId,
            orderSummary: {
                items,
                total,
                customer: name,
            },
        });
    } catch (error) {
        logger.error("Error placing order", error);
        res.status(500).json({ error: "Failed to place order" });
    }
});

const verifyAdmin = (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
): void => {
    if (req.user?.email !== ADMIN_EMAIL) {
        res.status(403).json({ error: "Forbidden: Admin access required" });
        return;
    }
    next();
};

router.get(
    "/admin/orders",
    verifyAuth,
    verifyAdmin,
    async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const pageQuery = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
            const limitQuery = Array.isArray(req.query.limit)
                ? req.query.limit[0]
                : req.query.limit;
            const page = parseInt((pageQuery as string) || "1") || 1;
            const limit = parseInt((limitQuery as string) || "10") || 10;
            const skip = (page - 1) * limit;

            await connectToDatabase();

            const ordersData = await Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

            const orders = ordersData.map((order) => ({
                id: order._id.toString(),
                ...order.toObject(),
                createdAt: order.createdAt.getTime(),
            }));

            res.status(200).json({
                success: true,
                orders,
                hasMore: orders.length === limit,
            });
        } catch (error) {
            logger.error("Error fetching admin orders", error);
            res.status(500).json({ error: "Failed to fetch admin orders" });
        }
    },
);

router.put(
    "/admin/orders/:id",
    verifyAuth,
    verifyAdmin,
    async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const orderId = req.params.id;
            if (Array.isArray(orderId)) {
                res.status(400).json({ error: "Invalid order ID" });
                return;
            }

            const updateData = req.body;

            // Prevent updating restricted fields
            delete updateData.id;
            delete updateData.createdAt;

            await connectToDatabase();

            // Check if orderId is a MongoDB ObjectId
            const isObjectId = /^[0-9a-fA-F]{24}$/.test(orderId as string);
            let result;

            if (isObjectId) {
                result = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
            } else {
                // Fallback to update by the custom orderId field if it's not a mongo id
                result = await Order.findOneAndUpdate({ orderId }, updateData, { new: true });
            }

            if (!result) {
                res.status(404).json({ error: "Order not found" });
                return;
            }

            res.status(200).json({ success: true, message: "Order updated successfully" });
        } catch (error) {
            logger.error("Error updating order", error);
            res.status(500).json({ error: "Failed to update order" });
        }
    },
);

export default router;
