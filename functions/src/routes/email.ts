import express from "express";
import nodemailer from "nodemailer";
import * as logger from "firebase-functions/logger";

const ADMIN_EMAIL = "iamahadul@gmail.com";

const router = express.Router();

router.post("/send-email", async (req: express.Request, res: express.Response) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        res.status(400).json({ error: "Missing required fields: to, subject, and text/html" });
        return;
    }

    try {
        // Create a transporter using SMTP configuration from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587", 10),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
        });

        logger.info("Message sent: %s", info.messageId);
        res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
        logger.error("Error sending email", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

router.post("/contact", async (req: express.Request, res: express.Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ error: "Missing required fields: name, email, and message" });
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587", 10),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const htmlContent = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; color: #555;">
                ${message.replace(/\n/g, "<br>")}
            </blockquote>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@example.com",
            to: ADMIN_EMAIL,
            replyTo: email,
            subject: `Tooybd - New Contact Message from ${name}`,
            html: htmlContent,
        });

        logger.info("Contact form email sent from: %s", email);
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        logger.error("Error processing contact form", error);
        res.status(500).json({ error: "Failed to process contact form submission" });
    }
});

export default router;
