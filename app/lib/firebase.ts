import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const config = getFirebaseConfig();

export const app =
    getApps().length === 0 && config
        ? initializeApp(config)
        : getApps().length > 0
          ? getApp()
          : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
