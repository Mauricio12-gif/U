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

let selectedUser = "";




// LOGIN

window.login = function(){

const name = document
.getElementById("visitorName")
.value.trim();

const password = document
.getElementById("password")
.value;

const error = document
.getElementById("error");


if(name === ""){

error.innerHTML = "Enter your name ❤️";
return;

}


if(password !== "LOVE"){

error.innerHTML = "Wrong password ❤️";
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


saveUser();

loadMessages();

};







// SAVE USER

async function saveUser(){

await addDoc(
collection(db,"users"),
{
name: currentUser,
time: serverTimestamp()
}
);

}







// SHOW SECTIONS

window.showSection = function(id){

document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document
.getElementById(id)
.classList.remove("hidden");

};








// SEND MESSAGE

window.sendMessage = async function(){

const input =
document.getElementById("messageInput");


const text =
input.value.trim();


if(text === "") return;


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









// LOAD PRIVATE CHAT

function loadMessages(){

const chatBox =
document.querySelector("#chat .chat-box");


const q =
query(

collection(db,"messages"),

where("chatId","==",currentUser)

);



onSnapshot(q,(snapshot)=>{


chatBox.innerHTML="";



snapshot.forEach(doc=>{


const data = doc.data();



const type =
data.sender === currentUser
? "my-message"
: "other-message";



chatBox.innerHTML += `

<div class="${type}">

<b>${data.sender}</b>

<br>

${data.message}

</div>

`;



});


});

}








// ADMIN USERS

function loadUsers(){

const usersList =
document.getElementById("usersList");


if(!usersList) return;



const q =
query(collection(db,"users"));



onSnapshot(q,(snapshot)=>{


usersList.innerHTML="";



snapshot.forEach(doc=>{


const user = doc.data();



usersList.innerHTML += `

<button onclick="openUser('${user.name}')">

❤️ ${user.name}

</button>

<br><br>

`;



});


});

}



window.openUser=function(name){

selectedUser=name;

loadAdminChat();

};








// ADMIN CHAT

function loadAdminChat(){

const box =
document.getElementById("adminChat");


const q =
query(

collection(db,"messages"),

where("chatId","==",selectedUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


const data=doc.data();


box.innerHTML += `

<p>

<b>${data.sender}</b>

<br>

${data.message}

</p>

<hr>

`;



});


});


}







window.adminSend=async function(){

const input =
document.getElementById("adminMessage");


const text =
input.value.trim();


if(text==="") return;



await addDoc(

collection(db,"messages"),

{

chatId:selectedUser,

sender:"Mauricio",

message:text,

time:serverTimestamp()

}

);



input.value="";

};








window.logout=function(){

location.reload();

};
