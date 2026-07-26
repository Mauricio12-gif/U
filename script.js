import { db } from "./firebase.js";

import {

collection,
addDoc,
onSnapshot,
serverTimestamp,
doc,
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
.innerHTML =
"Welcome ❤️";



loadStories();

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



if(
id==="story" ||
id==="love" ||
id==="meeting" ||
id==="dreams"
){

loadStories();

}



if(id==="chat"){

loadMessages();

}


};









// LOAD STORIES FROM FIREBASE

async function loadStories(){



const stories = [

{
firebase:"ourStory",
element:"ourStoryDisplay"
},

{
firebase:"love",
element:"loveDisplay"
},

{
firebase:"howWeMet",
element:"meetingDisplay"
},

{
firebase:"dreams",
element:"dreamsDisplay"
}

];




for(let story of stories){



const result = await getDoc(

doc(
db,
"story",
story.firebase
)

);



const display =
document.getElementById(story.element);



if(display){



if(result.exists()){


display.innerHTML =
result.data().content;


}

else{


display.innerHTML =
"Nothing written yet ❤️";


}


}


}


}









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

Sender:"Anonymous",

Time:serverTimestamp()

}

);



input.value="";


};









// LOAD PUBLIC CHAT

function loadMessages(){



const box =
document.querySelector(".chat-box");



if(!box) return;



onSnapshot(

collection(db,"messages"),

(snapshot)=>{


box.innerHTML="";



snapshot.forEach(item=>{


const data=item.data();



box.innerHTML += `

<div class="message">

❤️ Anonymous

<br><br>

${data.Message || ""}

</div>

`;



});



if(snapshot.empty){

box.innerHTML =
"<p>No messages yet ❤️</p>";

}


}

);


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
