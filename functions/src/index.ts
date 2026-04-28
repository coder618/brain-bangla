/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

// Initialize Firebase Admin SDK
admin.initializeApp();

import emailRouter from "./routes/email";
import orderRouter from "./routes/order";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Mount routers
app.use("/api", emailRouter);
app.use("/api", orderRouter);

// Export the Express app as a single Firebase Function
// To better reflect that it handles both email and orders, we'll name it 'api'
export const api = onRequest(app);
