// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOnna5k5XZaxEu_2Ig63QNY5ZI-Bx_7Z8",
  authDomain: "gray-matters-37bb0.firebaseapp.com",
  projectId: "gray-matters-37bb0",
  storageBucket: "gray-matters-37bb0.appspot.com",
  messagingSenderId: "410926704987",
  appId: "1:410926704987:web:0abea5c60b0649ff5b527e",
  measurementId: "G-CMJ8XP389Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
