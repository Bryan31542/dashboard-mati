// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHrFs1ulReXfk8z7xECobLKdDQHxUNX0w",
  authDomain: "mati-9231a.firebaseapp.com",
  databaseURL: "https://mati-9231a-default-rtdb.firebaseio.com",
  projectId: "mati-9231a",
  storageBucket: "mati-9231a.appspot.com",
  messagingSenderId: "127891468865",
  appId: "1:127891468865:web:5e0f961c82ec4a3a854cc0",
  measurementId: "G-0CFBCP7BXF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
