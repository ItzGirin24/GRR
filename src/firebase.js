// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBd37m3kOkGYcQkztkZGW3oeISVBj0r3aw",
  authDomain: "griyariasratih2025.firebaseapp.com",
  projectId: "griyariasratih2025",
  storageBucket: "griyariasratih2025.appspot.com",
  messagingSenderId: "659091401908",
  appId: "1:659091401908:web:bfd764d329361aee06fbe1",
  measurementId: "G-B4WRG0J4MK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
