import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";




// LOGIN

window.login = function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;

const error =
document.getElementById("error");


if(name === ""){

error.innerHTML = "Enter your name ❤️";
return;

}


if(password !== "LOVE"){

error.innerHTML = "Wrong password ❤️";
return;

}



currentUser = name;



document
.getElementById("loginPage")
.classList.add("hidden");



document
.getElementById("mainPage")
.classList.remove("hidden");



document
.getElementById("welcome")
.innerHTML = "Welcome ❤️";



loadMessages();


};








// SHOW SECTIONS

window.showSection = function(sectionID){


document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});



document
.getElementById(sectionID)
.classList.remove("hidden");



if(sectionID === "chat"){

loadMessages();

}


};








// SEND MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();



if(text === "") return;



await addDoc(

collection(db,"messages"),

{

ChatID:"public",

Message:text,

Sender:currentUser,

Time:serverTimestamp()

}

);



input.value = "";



};








// LOAD ALL PUBLIC MESSAGES

function loadMessages(){


const box =
document.querySelector(".chat-box");



if(!box){

console.log("Chat box missing");

return;

}



onSnapshot(

collection(db,"messages"),

(snapshot)=>{


box.innerHTML = "";



if(snapshot.empty){


box.innerHTML =
"<p>No messages yet ❤️</p>";

return;


}



snapshot.forEach((doc)=>{


const data = doc.data();



const message =
data.Message || "No message";



box.innerHTML += `

<div class="message">

<b>❤️ Anonymous</b>

<br>

${message}

</div>

<hr>

`;



});


}

);


}








// WHATSAPP

window.openWhatsApp = function(){


const phone =
"254797147155";


const text =
"Hello Mauricio ❤️ I visited your website.";



const url =
"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(text);



window.open(url,"_blank");


};
