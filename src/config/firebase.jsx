import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArfKEQwieHfVhmMkPxGjJ5mh9zCgY2U3E",
  authDomain: "auth-692a8.firebaseapp.com",
  projectId: "auth-692a8",
  storageBucket: "auth-692a8.appspot.com",
  messagingSenderId: "279295002718",
  appId: "1:279295002718:web:13d317a8307443afec0ccf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { app, auth, db };
