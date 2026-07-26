import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import { 
getAuth 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



const firebaseConfig = {

apiKey: "AIzaSyAWUws3p5ukwwo2eLxnHV8YJ1dBFNGSWcI",

authDomain: "love-dbc36.firebaseapp.com",

projectId: "love-dbc36",

storageBucket: "love-dbc36.firebasestorage.app",

messagingSenderId: "325938096453",

appId: "1:325938096453:web:ee25ec17f024c68b51362c",

measurementId: "G-ME0MEC2CJ8"

};



const app = initializeApp(firebaseConfig);



const db = getFirestore(app);


const auth = getAuth(app);



export { db, auth };
