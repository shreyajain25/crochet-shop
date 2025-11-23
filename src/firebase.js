// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHyMj6hzPb6_081gm6_XsZK4MOq_ZKPqw",
  authDomain: "crochet-shop-ad7e0.firebaseapp.com",
  projectId: "crochet-shop-ad7e0",
  storageBucket: "crochet-shop-ad7e0.firebasestorage.app",
  messagingSenderId: "1082343220766",
  appId: "1:1082343220766:web:f4bff6eb36420ba67b300f",
  measurementId: "G-PRT0NB1D32"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

