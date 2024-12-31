// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase Configuration Object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA82EYuCUgZGAUMs1L3e2erTp1RcJAs3pc",
  authDomain: "my-keeper-app-fc0e2.firebaseapp.com",
  projectId: "my-keeper-app-fc0e2",
  storageBucket: "my-keeper-app-fc0e2.firebasestorage.app",
  messagingSenderId: "719088209069",
  appId: "1:719088209069:web:c900ce5013d5d90d414a24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth for use in other parts of the app
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
