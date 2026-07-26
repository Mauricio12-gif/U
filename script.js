import { db } from "./firebase.js";

import {

collection,

addDoc,

onSnapshot,

serverTimestamp,

doc,

setDoc,

getDoc

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

error.innerHTML="Enter your name ❤️";

return;

}



if(password !== "LOVE"){

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
.innerHTML="Welcome ❤️";



loadMessages();

loadMeetingStory();


};









// SECTION SWITCH

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



if(id==="meeting"){

loadMeetingStory();

}


};









// PUBLIC CHAT SEND

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();



if(text==="") return;



await addDoc(

collection(db,"messages"),

{

ChatID:"public",

Message:text,

Sender:currentUser,

Time:serverTimestamp()

}

);



input.value="";


};









// LOAD CHAT

function loadMessages(){


const box =
document.querySelector(".chat-box");



if(!box) return;



onSnapshot(

collection(db,"messages"),

(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


const data=doc.data();



box.innerHTML += `

<div class="message">

<b>❤️ Anonymous</b>

<br>

${data.Message || ""}

</div>

`;



});



if(snapshot.empty){

box.innerHTML="<p>No messages yet ❤️</p>";

}


}

);


}









// SAVE HOW WE MET STORY

window.saveMeetingStory = async function(){


const story =
document.getElementById("meetingStory").value;



await setDoc(

doc(db,"story","howWeMet"),

{

content:story,

updatedAt:serverTimestamp()

}

);



document
.getElementById("storySaved")
.innerHTML=
"Saved successfully ❤️";


};









// LOAD HOW WE MET STORY

async function loadMeetingStory(){


const storyBox =
document.getElementById("meetingStory");



if(!storyBox) return;



const storyDoc =
await getDoc(

doc(db,"story","howWeMet")

);



if(storyDoc.exists()){


storyBox.value =
storyDoc.data().content;


}


}









// GALLERY EXPAND

window.expandPhoto=function(photo){


photo.classList.toggle("expanded");


};









// WHATSAPP

window.openWhatsApp=function(){


const phone="254797147155";


const message=
"Hello Mauricio ❤️ I visited your website.";



const link=

"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(message);



window.open(link,"_blank");


};
