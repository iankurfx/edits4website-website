// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo4NijcOYvQoCI1ENqSFIlZIJOx13Chjo",
    authDomain: "edit4baddies.firebaseapp.com",
    projectId: "edit4baddies",
    storageBucket: "edit4baddies.firebasestorage.app",
    messagingSenderId: "193088440608",
    appId: "1:193088440608:web:fa35fa01989bd79ff96f45",
    measurementId: "G-BX3QR8LDGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);