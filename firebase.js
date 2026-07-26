// Import Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import {
getStorage
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";



// Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAWUws3p5ukwwo2eLxnHV8YJ1dBFNGSWcI",

  authDomain: "love-dbc36.firebaseapp.com",

  projectId: "love-dbc36",

  storageBucket: "love-dbc36.firebasestorage.app",

  messagingSenderId: "325938096453",

  appId: "1:325938096453:web:ee25ec17f024c68b51362c",

  measurementId: "G-ME0MEC2CJ8"

};



// Start Firebase

const app = initializeApp(firebaseConfig);



// Connect Firestore

const db = getFirestore(app);



// Connect Storage

const storage = getStorage(app);



// Export for other files

export { db, storage };
