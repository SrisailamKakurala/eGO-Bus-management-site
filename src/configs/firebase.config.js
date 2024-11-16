// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDUK1wEhBcqEYiKHiD5k0APbefcmYXp9aE",
  authDomain: "ego-bus-management-site.firebaseapp.com",
  projectId: "ego-bus-management-site",
  storageBucket: "ego-bus-management-site.firebasestorage.app",
  messagingSenderId: "1081194864231",
  appId: "1:1081194864231:web:91641f8d470ea5fe9a7ec2",
  measurementId: "G-E54VR9TGT5"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);