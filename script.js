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




// SHOW ADMIN ONLY TO MAURICIO

if(currentUser.toLowerCase()==="mauricio"){

document
.getElementById("adminCard")
.classList.remove("hidden");


loadUsers();

}


loadMessages();


saveUser();


};








// SAVE USER

async function saveUser(){

await addDoc(
collection(db,"users"),
{
name:currentUser,
time:serverTimestamp()
}
);

}








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









// USER SEND MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();


if(text==="") return;



await addDoc(

collection(db,"messages"),

{

chatId:currentUser,

sender:currentUser,

message:text,

time:serverTimestamp()

}

);



input.value="";

};









// LOAD USER CHAT

function loadMessages(){


const box =
document.querySelector("#chat .chat-box");


const q=query(

collection(db,"messages"),

where("chatId","==",currentUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML+=`

<div class="${
data.sender===currentUser
?"my-message"
:"other-message"
}">

<b>${data.sender}</b>

<br>

${data.message}

</div>

`;



});


});


}









// ADMIN SHOW USERS

function loadUsers(){


const list =
document.getElementById("usersList");



const q =
query(collection(db,"users"));



onSnapshot(q,(snapshot)=>{


list.innerHTML="";



let users=[];



snapshot.forEach(doc=>{


let data=doc.data();



if(!users.includes(data.name)
&& data.name.toLowerCase()!=="mauricio"){

users.push(data.name);

}



});



users.forEach(name=>{


list.innerHTML+=`

<button onclick="openUser('${name}')">

❤️ ${name}

</button>

<br><br>

`;



});



});


}









// ADMIN SELECT USER

window.openUser=function(name){


selectedUser=name;


loadAdminMessages();


};









// ADMIN VIEW CHAT

function loadAdminMessages(){


const box =
document.getElementById("adminChat");



const q=query(

collection(db,"messages"),

where("chatId","==",selectedUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";


snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML+=`

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

window.adminSend=async function(){


const input =
document.getElementById("adminMessage");


const text =
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








window.logout=function(){

location.reload();

};
