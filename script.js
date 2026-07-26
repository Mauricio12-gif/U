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
.innerHTML=
"Welcome ❤️";



loadAllStories();

loadMessages();


};









// CHANGE SECTION

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


if(
id==="story" ||
id==="love" ||
id==="meeting" ||
id==="dreams"
){

loadAllStories();

}


};









// SAVE ANY STORY SECTION

window.saveStorySection = async function(
sectionName,
inputId,
savedId
){


const text =
document.getElementById(inputId).value;



await setDoc(

doc(db,"story",sectionName),

{

content:text,

updatedAt:serverTimestamp()

}

);



document
.getElementById(savedId)
.innerHTML=
"Saved ❤️";


};









// LOAD ALL STORIES

async function loadAllStories(){


const sections=[

{
name:"ourStory",
input:"ourStoryText"
},

{
name:"love",
input:"loveText"
},

{
name:"howWeMet",
input:"meetingText"
},

{
name:"dreams",
input:"dreamsText"
}

];



for(let item of sections){


const story =
await getDoc(

doc(db,"story",item.name)

);



if(story.exists()){


document
.getElementById(item.input)
.value =
story.data().content;


}


}


}









// SEND CHAT MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const message =
input.value.trim();



if(message==="") return;



await addDoc(

collection(db,"messages"),

{

ChatID:"public",

Message:message,

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



box.innerHTML +=`

<div class="message">

<b>❤️ Anonymous</b>

<br>

${data.Message || ""}

</div>

`;


});



if(snapshot.empty){

box.innerHTML=
"<p>No messages yet ❤️</p>";

}


}

);


}









// GALLERY

window.expandPhoto=function(photo){


photo.classList.toggle("expanded");


};









// WHATSAPP

window.openWhatsApp=function(){


const phone="254797147155";


const text=
"Hello Mauricio ❤️ I visited your website.";



const url=

"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(text);



window.open(url,"_blank");


};
