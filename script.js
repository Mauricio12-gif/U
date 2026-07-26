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


let name =
document.getElementById("visitorName").value.trim();


let password =
document.getElementById("password").value;


let error =
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




// SHOW ADMIN FOR MAURICIO

if(name.toLowerCase()==="mauricio"){


let admin =
document.getElementById("adminCard");


if(admin){

admin.classList.remove("hidden");

}


}



loadMessages();


};









// SHOW SECTIONS


window.showSection=function(id){


document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});



document
.getElementById(id)
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


let input =
document.getElementById("messageInput");


let text =
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









// MEMBER CHAT ONLY


function loadMessages(){


let box =
document.querySelector("#chat .chat-box");


if(!box) return;



onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


let data = doc.data();



let sender = data.Sender || "";

let message = data.Message || "";



if(data.ChatID === currentUser){


box.innerHTML += `

<div>

<b>❤️ You</b>

<br>

${message}

</div>

<hr>

`;


}



});


});


}









// ADMIN SEE ALL MESSAGES


function loadAllMessages(){


let box =
document.getElementById("adminChat");



if(!box) return;



onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


let data = doc.data();



let sender =
data.Sender || "Unknown";



let message =
data.Message || "No message";



box.innerHTML += `

<div class="message-card">


<b>❤️ ${sender}</b>


<p>
${message}
</p>


</div>


<hr>


`;



});


});


}









// WHATSAPP


window.openWhatsApp=function(){


let phone =
"254797147155";


let text =
"Hello Mauricio ❤️ I visited your website.";



let link =
"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(text);



window.open(link,"_blank");


};








// LOGOUT


window.logout=function(){

location.reload();

};
