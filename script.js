import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser="";




// LOGIN

window.login = async function(){

let name =
document.getElementById("visitorName").value.trim();

let password =
document.getElementById("password").value;



if(password!=="LOVE"){

document.getElementById("error").innerHTML="Wrong password ❤️";
return;

}



currentUser=name;



document.getElementById("loginPage")
.classList.add("hidden");


document.getElementById("mainPage")
.classList.remove("hidden");


document.getElementById("welcome")
.innerHTML="Welcome "+name+" ❤️";



// Show admin only for Mauricio

if(name.toLowerCase()==="mauricio"){

document.getElementById("adminCard")
.classList.remove("hidden");

}



loadMessages();


};









// SECTIONS

window.showSection=function(id){


document.querySelectorAll(".content")
.forEach(x=>x.classList.add("hidden"));



document.getElementById(id)
.classList.remove("hidden");



if(id==="chat"){

loadMessages();

}



if(id==="admin"){

loadAllMessages();

}


};









// SEND MEMBER MESSAGE

window.sendMessage=async function(){


let text=
document.getElementById("messageInput").value.trim();



if(text==="") return;



await addDoc(
collection(db,"messages"),
{

ChatID:currentUser,

Message:text,

Sender:currentUser,

Time:serverTimestamp()

}

);



document.getElementById("messageInput").value="";


};









// MEMBER CHAT

function loadMessages(){


let box=
document.querySelector("#chat .chat-box");


if(!box)return;



onSnapshot(collection(db,"messages"),(snap)=>{


box.innerHTML="";


snap.forEach(doc=>{


let data=doc.data();



if(data.ChatID===currentUser){


box.innerHTML+=`

<p>
<b>You</b><br>
${data.Message}
</p>

<hr>

`;



}


});


});


}









// ADMIN VIEW ALL

function loadAllMessages(){


let box=
document.getElementById("adminChat");


if(!box)return;



onSnapshot(collection(db,"messages"),(snap)=>{


box.innerHTML="";



snap.forEach(doc=>{


let data=doc.data();



box.innerHTML+=`

<p>

<b>❤️ ${data.Sender}</b>

<br>

${data.Message}

</p>

<hr>

`;



});


});


}









// WHATSAPP

window.openWhatsApp=function(){


let link=
"https://wa.me/254797147155?text="
+
encodeURIComponent(
"Hello Mauricio ❤️ I visited your website."
);



window.open(link,"_blank");


};
