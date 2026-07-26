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



if(name===""){

document.getElementById("error").innerHTML =
"Enter your name ❤️";

return;

}



if(password !== "LOVE"){

document.getElementById("error").innerHTML =
"Wrong password ❤️";

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




// ONLY MAURICIO GETS EDIT BUTTONS

if(name.toLowerCase()==="mauricio"){


document
.querySelectorAll("[id$='Button']")
.forEach(button=>{

button.classList.remove("hidden");

});


}



loadStories();

loadMessages();


};









// OPEN SECTIONS

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









// LOAD STORIES

async function loadStories(){


const stories=[


{
collection:"ourStory",
display:"ourStoryDisplay",
input:"ourStoryText"
},


{
collection:"love",
display:"loveDisplay",
input:"loveText"
},


{
collection:"howWeMet",
display:"meetingDisplay",
input:"meetingText"
},


{
collection:"dreams",
display:"dreamsDisplay",
input:"dreamsText"
}


];



for(let story of stories){


const result = await getDoc(

doc(
db,
"story",
story.collection
)

);



if(result.exists()){


let text =
result.data().content;



document
.getElementById(story.display)
.innerText=text;



if(document.getElementById(story.input)){

document
.getElementById(story.input)
.value=text;

}



}



}


}









// SHOW EDIT BOX

window.editStory=function(type){


let box;



if(type==="ourStory")
box="ourStoryEdit";


if(type==="love")
box="loveEdit";


if(type==="howWeMet")
box="meetingEdit";


if(type==="dreams")
box="dreamsEdit";



document
.getElementById(box)
.classList.remove("hidden");


};









// SAVE STORIES

window.saveStorySection = async function(
collectionName,
inputId
){


const text =
document
.getElementById(inputId)
.value;



await setDoc(

doc(
db,
"story",
collectionName
),

{

content:text,

updatedAt:serverTimestamp()

}

);



alert("Saved ❤️");


loadStories();


};









// PUBLIC CHAT

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

Sender:"Anonymous",

Time:serverTimestamp()

}

);



input.value="";


};









// LOAD CHAT

function loadMessages(){


const box =
document.getElementById("chatBox");



if(!box) return;



onSnapshot(

collection(db,"messages"),

(snapshot)=>{


box.innerHTML="";



snapshot.forEach(item=>{


let data=item.data();



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
"No messages yet ❤️";

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


const phone =
"254797147255";



const text =
"Hello Mauricio ❤️ I visited your website.";



window.open(

"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(text),

"_blank"

);


};
