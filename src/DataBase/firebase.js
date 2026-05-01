import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6BkHMGY2rZAbuXo1R4EQsgrU3gnCx6O0",
  authDomain: "wishlist-movies.firebaseapp.com",
  projectId: "wishlist-movies",
  storageBucket: "wishlist-movies.firebasestorage.app",
  messagingSenderId: "86322468245",
  appId: "1:86322468245:web:2a1a6a7df7563deaf4929c",
  measurementId: "G-HV80VRV6DT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
