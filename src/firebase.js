// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHX9zHJFkahVP1P68-E6tFNP8YKsOrInA",
  authDomain: "all-is-well-eda43.firebaseapp.com",
  projectId: "all-is-well-eda43",
  storageBucket: "all-is-well-eda43.firebasestorage.app",
  messagingSenderId: "456753291945",
  appId: "1:456753291945:web:e8937dcbe370ba7f293fb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
