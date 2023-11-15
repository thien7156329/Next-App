// Import the functions you need from the SDKs you need
"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArfNa3KE7LZ6NXzxfmVVTIt_KZUbj2hYA",
  authDomain: "next-13161.firebaseapp.com",
  projectId: "next-13161",
  storageBucket: "next-13161.appspot.com",
  messagingSenderId: "791481971668",
  appId: "1:791481971668:web:08cc01b08364ed106edc41",
  measurementId: "G-D2SE5JTRS1",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const messagingFB = getMessaging(firebase_app);
export default firebase_app;
