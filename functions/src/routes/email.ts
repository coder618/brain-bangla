import express from "express";
import nodemailer from "nodemailer";
import * as logger from "firebase-functions/logger";

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

export default router;
