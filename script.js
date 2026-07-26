import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
query,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";
let selectedUser = "";




// LOGIN

window.login = async function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;


if(name==="") return;


if(password!=="LOVE"){

document.getElementById("error").innerHTML =
"Wrong password ❤️";

return;

}



currentUser=name;



document.getElementById("loginPage")
.classList.add("hidden");


document.getElementById("mainPage")
.classList.remove("hidden");


document.getElementById("welcome")
.innerHTML =
"Welcome "+name+" ❤️";




// SAVE USER

await addDoc(collection(db,"users"),{

name:name,

time:serverTimestamp()

});



// ONLY MAURICIO GETS ADMIN

if(name.toLowerCase()==="mauricio"){

document
.getElementById("adminCard")
.classList.remove("hidden");

loadUsers();

}



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



if(id==="admin"){

loadUsers();

}


if(id==="chat"){

loadMessages();

}


};









// SEND MESSAGE

window.sendMessage=async function(){


let input =
document.getElementById("messageInput");


let text =
input.value.trim();



if(text==="") return;



await addDoc(collection(db,"messages"),{

chatId:currentUser,

sender:currentUser,

message:text,

time:serverTimestamp()

});



input.value="";


};









// LOAD USER CHAT

function loadMessages(){


const box =
document.querySelector("#chat .chat-box");



const q =
collection(db,"messages");



onSnapshot(q,(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


let data=doc.data();



if(data.chatId===currentUser){


box.innerHTML+=`

<div>

<b>${data.sender}</b><br>

${data.message}

</div>

`;

}


});


});


}









// ADMIN LOAD USERS

function loadUsers(){


const list =
document.getElementById("usersList");


onSnapshot(collection(db,"users"),(snapshot)=>{


list.innerHTML="";


let names=[];



snapshot.forEach(doc=>{


let user=doc.data();



if(
user.name.toLowerCase()!=="mauricio"
&&
!names.includes(user.name)

){

names.push(user.name);

}



});




if(names.length===0){

list.innerHTML="No visitors yet";

return;

}



names.forEach(name=>{


list.innerHTML+=`

<button onclick="openUser('${name}')">

❤️ ${name}

</button>

<br><br>

`;



});


});


}









// SELECT USER

window.openUser=function(name){


selectedUser=name;


loadAdminMessages();


};








// ADMIN VIEW MESSAGES

function loadAdminMessages(){


const box =
document.getElementById("adminChat");


onSnapshot(collection(db,"messages"),(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


let data=doc.data();



if(data.chatId===selectedUser){


box.innerHTML+=`

<p>

<b>${data.sender}</b><br>

${data.message}

</p>

<hr>

`;

}



});


});


}








// ADMIN SEND

window.adminSend=async function(){


let input =
document.getElementById("adminMessage");


let text =
input.value.trim();



if(text==="" || selectedUser==="") return;



await addDoc(collection(db,"messages"),{

chatId:selectedUser,

sender:"Mauricio",

message:text,

time:serverTimestamp()

});



input.value="";


};
