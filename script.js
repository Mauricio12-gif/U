import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
query,
where,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";




// LOGIN

window.login = async function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;


if(name===""){

document.getElementById("error").innerHTML =
"Enter your name ❤️";

return;

}


if(password!=="LOVE"){

document.getElementById("error").innerHTML =
"Wrong password ❤️";

return;

}


currentUser = name;



document.getElementById("loginPage")
.classList.add("hidden");


document.getElementById("mainPage")
.classList.remove("hidden");


document.getElementById("welcome")
.innerHTML =
"Welcome " + name + " ❤️";



loadMessages();

};








// OPEN SECTIONS

window.showSection=function(id){


document.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document.getElementById(id)
.classList.remove("hidden");



if(id==="chat"){

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

sender:currentUser,

message:text,

time:serverTimestamp()

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


let data = doc.data();



// MAURICIO SEES EVERYTHING

if(currentUser.toLowerCase()==="mauricio"){


box.innerHTML += `

<div>

<b>❤️ ${data.sender}</b>

<br>

${data.message}

</div>

<hr>

`;



}



// OTHER USERS ONLY SEE THEIR OWN

else if(data.sender===currentUser){


box.innerHTML += `

<div>

<b>❤️ You</b>

<br>

${data.message}

</div>

<hr>

`;



}



});


});


}









// WHATSAPP

window.openWhatsApp=function(){


let phone="254797147255";


let message=
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
