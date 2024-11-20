// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUK1wEhBcqEYiKHiD5k0APbefcmYXp9aE",
  authDomain: "ego-bus-management-site.firebaseapp.com",
  databaseURL: "https://ego-bus-management-site-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ego-bus-management-site",
  storageBucket: "ego-bus-management-site.firebasestorage.app",
  messagingSenderId: "1081194864231",
  appId: "1:1081194864231:web:91641f8d470ea5fe9a7ec2",
  measurementId: "G-E54VR9TGT5",
  databaseURL: "https://ego-bus-management-site-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);