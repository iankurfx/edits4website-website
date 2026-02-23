// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB0v7x2FcU7SI6hTQeaqKZdbwUFxEpLrCQ",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "edit4baddies.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "edit4baddies",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "edit4baddies.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "193088440608",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:193088440608:web:fa35fa01989bd79ff96f45",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BX3QR8LDGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);