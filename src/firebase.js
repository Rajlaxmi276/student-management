// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK9sMU71fyW2yn1qKVLBZVvEmArFlRsM0",
  authDomain: "student-management-66688.firebaseapp.com",
  projectId: "student-management-66688",
  storageBucket: "student-management-66688.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "985317249106",
  appId: "1:985317249106:web:9013a6facbca7b75d68f8b",
  measurementId: "G-28MW993YEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app); // Initialize Analytics

// Export authentication and database
export { auth, db };
export default app;
