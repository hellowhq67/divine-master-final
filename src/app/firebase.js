import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8g0k74jXzA1njDAiL7Y8sidtZx7_e96c",
  authDomain: "divine-org-60a38.firebaseapp.com",
  projectId: "divine-org-60a38",
  storageBucket: "divine-org-60a38.appspot.com",
  messagingSenderId: "419017791547",
  appId: "1:419017791547:web:7ee1224cd2a5d5e3a0641e",
  measurementId: "G-QF207N7QYZ"
};

// Initialize Firebase only on the client side
let app;
let analytics;
let storage;
let db;
let auth;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = (typeof window !== "undefined") ? require("firebase/analytics").getAnalytics(app) : null;
  storage = getStorage(app);
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, analytics, storage, db, auth };
