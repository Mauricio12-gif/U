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

window.login = async function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value.trim();

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
"Welcome " + currentUser + " ❤️";




// CREATE USER RECORD

await addDoc(
collection(db,"users"),
{

name: currentUser,

role:
currentUser.toLowerCase() === "mauricio"
? "admin"
: "member",

time: serverTimestamp()

}

);



// SHOW ADMIN ONLY TO MAURICIO

if(currentUser.toLowerCase() === "mauricio"){

let admin =
document.getElementById("adminCard");

if(admin){

admin.classList.remove("hidden");

}

}



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



if(id === "chat"){

loadMessages();

}



if(id === "admin"){

loadUsers();

}


};









// SEND MEMBER MESSAGE

window.sendMessage = async function(){


let input =
document.getElementById("messageInput");


let text =
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









// LOAD MEMBER CHAT

function loadMessages(){


let box =
document.querySelector("#chat .chat-box");


if(!box) return;



let q=query(

collection(db,"messages"),

where("chatId","==",currentUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML += `

<div>

<b>${data.sender}</b>

<br>

${data.message}

</div>

<br>

`;



});


});


}









// ADMIN LOAD MEMBERS

function loadUsers(){


let list =
document.getElementById("usersList");


if(!list) return;



onSnapshot(collection(db,"users"),(snapshot)=>{


list.innerHTML="";


let people=[];



snapshot.forEach(doc=>{


let data=doc.data();



if(
data.role==="member"
&&
!people.includes(data.name)

){

people.push(data.name);

}


});



if(people.length===0){

list.innerHTML="No members yet";

return;

}



people.forEach(person=>{


list.innerHTML += `

<button onclick="openUser('${person}')">

❤️ ${person}

</button>

<br><br>

`;



});


});


}









// ADMIN SELECT USER

window.openUser=function(name){

selectedUser=name;

loadAdminChat();

};









// ADMIN VIEW CHAT

function loadAdminChat(){


let box =
document.getElementById("adminChat");


let q=query(

collection(db,"messages"),

where("chatId","==",selectedUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML += `

<div>

<b>${data.sender}</b>

<br>

${data.message}

</div>

<hr>

`;



});


});


}









// ADMIN SEND REPLY

window.adminSend = async function(){


let input =
document.getElementById("adminMessage");


let text =
input.value.trim();



if(text==="" || selectedUser==="") return;



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
