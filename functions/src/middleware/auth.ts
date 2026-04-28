import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const verifyAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
        return;
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error verifying auth token:", error);
        res.status(403).json({ error: "Forbidden: Invalid token" });
        return;
    }
};
