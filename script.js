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

window.login = function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;


if(name === ""){

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


document.getElementById("loginPage")
.classList.add("hidden");


document.getElementById("mainPage")
.classList.remove("hidden");


document.getElementById("welcome")
.innerHTML =
"Welcome " + name + " ❤️";


loadMessages();

};








// SHOW SECTIONS

window.showSection=function(id){

document.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document.getElementById(id)
.classList.remove("hidden");

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

chatId: currentUser,

sender: currentUser,

message:text,

time:serverTimestamp()

}

);


input.value="";


};









// DISPLAY MESSAGES

function loadMessages(){


const chatBox =
document.querySelector(".chat-box");



if(!chatBox){

console.log("Chat box not found");

return;

}



const q =
query(

collection(db,"messages"),

where("chatId","==",currentUser)

);



onSnapshot(q,(snapshot)=>{


chatBox.innerHTML="";



if(snapshot.empty){

chatBox.innerHTML =
"<p>No messages yet ❤️</p>";

return;

}



snapshot.forEach(doc=>{


const data = doc.data();



let messageStyle =
data.sender === currentUser
? "my-message"
: "other-message";



chatBox.innerHTML += `

<div class="${messageStyle}">

<b>${data.sender}</b>

<br>

${data.message}

</div>

`;



});



});



}








window.logout=function(){

location.reload();

};
