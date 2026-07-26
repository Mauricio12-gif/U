import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
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



currentUser = name;



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



loadMessages();

};









// SHOW SECTIONS

window.showSection=function(sectionID){


document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});



document
.getElementById(sectionID)
.classList.remove("hidden");



if(sectionID==="chat"){

loadMessages();

}


};









// SEND MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();



if(text==="") return;



await addDoc(

collection(db,"messages"),

{

ChatID: currentUser,

Message: text,

Sender: currentUser,

Time: serverTimestamp()

}

);



input.value="";

};









// LOAD MESSAGES

function loadMessages(){


const box =
document.querySelector("#chat .chat-box");


if(!box) return;



onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


const data = doc.data();




// MAURICIO SEES EVERYTHING

if(currentUser.toLowerCase()==="mauricio"){


box.innerHTML += `

<p>

<b>❤️ ${data.Sender}</b>

<br>

${data.Message}

</p>

<hr>

`;



}




// OTHER USERS ONLY SEE THEIR OWN

else if(data.ChatID === currentUser){


box.innerHTML += `

<p>

<b>❤️ You</b>

<br>

${data.Message}

</p>

<hr>

`;



}



});


});


}









// WHATSAPP

window.openWhatsApp=function(){


let phone="254797147155";


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
