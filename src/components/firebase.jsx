// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzZrY5rrwoGdDHsFoZNTLit6UQobwlXew",
  authDomain: "triptacktix.firebaseapp.com",
  projectId: "triptacktix",
  storageBucket: "triptacktix.firebasestorage.app",
  messagingSenderId: "105896002617",
  appId: "1:105896002617:web:136e915370d36317c139e8",
  measurementId: "G-STP3EES3NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);