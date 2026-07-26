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
document.getElementById("password").value;


if(name===""){

document.getElementById("error").innerHTML =
"Enter your name ❤️";

return;

}


if(password!=="LOVE"){

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




// SAVE USER

await addDoc(
collection(db,"users"),
{
name:name,
role:name.toLowerCase()==="mauricio"
?"admin"
:"member",
time:serverTimestamp()
}
);




// ONLY MAURICIO SEES ADMIN

if(name.toLowerCase()==="mauricio"){

document
.getElementById("adminCard")
.classList.remove("hidden");

}



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



if(id==="chat"){

loadUserMessages();

}



if(id==="admin"){

loadUsers();

}



};









// MEMBER SEND MESSAGE

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









// MEMBER VIEW CHAT

function loadUserMessages(){


const box =
document.querySelector("#chat .chat-box");



const q=query(

collection(db,"messages"),

where("chatId","==",currentUser)

);



onSnapshot(q,(snapshot)=>{


box.innerHTML="";



snapshot.forEach(doc=>{


const data=doc.data();



box.innerHTML += `

<div>

<b>${data.sender}</b><br>

${data.message}

</div>

<br>

`;



});


});


}









// ADMIN LOAD USERS

function loadUsers(){


const list =
document.getElementById("usersList");


onSnapshot(collection(db,"users"),(snapshot)=>{


list.innerHTML="";


let users=[];



snapshot.forEach(doc=>{


let data=doc.data();



if(
data.role==="member"
&&
!users.includes(data.name)

){

users.push(data.name);

}



});




if(users.length===0){

list.innerHTML="No members yet";

return;

}



users.forEach(name=>{


list.innerHTML += `

<button onclick="openUser('${name}')">

❤️ ${name}

</button>

<br><br>

`;



});


});


}









// ADMIN SELECT MEMBER

window.openUser=function(name){

selectedUser=name;

loadAdminMessages();

};









// ADMIN VIEW SELECTED CHAT

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


const data=doc.data();



box.innerHTML += `

<div>

<b>${data.sender}</b><br>

${data.message}

</div>

<hr>

`;



});


});


}









// ADMIN REPLY

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
