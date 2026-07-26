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

let name = document.getElementById("visitorName").value.trim();

let password = document.getElementById("password").value;

let error = document.getElementById("error");


if(name===""){

error.innerHTML="Enter your name ❤️";
return;

}


if(password!=="LOVE"){

error.innerHTML="Wrong password ❤️";
return;

}



currentUser = name;



document.getElementById("loginPage").classList.add("hidden");

document.getElementById("mainPage").classList.remove("hidden");


document.getElementById("welcome").innerHTML =
"Welcome " + name + " ❤️";



if(name.toLowerCase()==="mauricio"){

document.getElementById("adminCard")
.classList.remove("hidden");

}


loadMessages();

};





// SECTION CONTROL

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


if(id==="admin"){

loadAllMessages();

}


};







// SEND MESSAGE

window.sendMessage = async function(){


let text =
document.getElementById("messageInput").value.trim();


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



document.getElementById("messageInput").value="";


};








// MEMBER VIEW

function loadMessages(){


let box =
document.querySelector("#chat .chat-box");


if(!box) return;



onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


let data = doc.data();



if(data.ChatID === currentUser){


box.innerHTML += `

<div>

<b>❤️ You</b>

<br>

${data.Message}

</div>

<hr>

`;

}


});


});


}








// ADMIN VIEW

function loadAllMessages(){


let box =
document.getElementById("adminChat");


if(!box) return;



onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


let data = doc.data();



box.innerHTML += `

<div>

<b>❤️ ${data.Sender}</b>

<br>

${data.Message}

</div>

<hr>

`;



});


});


}








// WHATSAPP

window.openWhatsApp=function(){


let link =
"https://wa.me/254797147155?text="
+
encodeURIComponent(
"Hello Mauricio ❤️ I visited your website."
);


window.open(link,"_blank");


};
