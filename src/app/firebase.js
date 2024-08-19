// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth= getAuth(app)