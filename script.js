import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";




// LOGIN

window.login = async function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;

const error =
document.getElementById("error");



if(name===""){

error.innerHTML="Enter your name ❤️";
return;

}



if(password!=="LOVE"){

error.innerHTML="Wrong password ❤️";
return;

}



currentUser=name;



document
.getElementById("loginPage")
.classList.add("hidden");


document
.getElementById("mainPage")
.classList.remove("hidden");


document
.getElementById("welcome")
.innerHTML =
"Welcome " + name + " ❤️";




// Save visitor

await addDoc(
collection(db,"users"),
{
name:name,
time:serverTimestamp()
}
);


};








// OPEN SECTIONS

window.showSection=function(sectionID){


document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document
.getElementById(sectionID)
.classList.remove("hidden");


};








// WHATSAPP BUTTON

window.openWhatsApp=function(){


let phone = "254797147255";


let message =
"Hello Mauricio ❤️ I visited your website.";



let link =
"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(message);



window.open(link,"_blank");


};








// LOGOUT

window.logout=function(){

location.reload();

};
