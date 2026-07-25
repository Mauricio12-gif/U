import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
query,
orderBy,
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


document.getElementById("welcome").innerHTML =
"Welcome " + name + " ❤️";


loadMessages();

};






// OPEN SECTIONS

window.showSection=function(sectionID){

document.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document.getElementById(sectionID)
.classList.remove("hidden");

};







// SEND MESSAGE

window.sendMessage=function(){

const input =
document.getElementById("messageInput");


const text =
input.value.trim();


if(text==="") return;


addDoc(collection(db,"messages"),{

sender:currentUser,

message:text,

time:serverTimestamp()

});


input.value="";

};







// REAL TIME MESSAGES

function loadMessages(){


const chatBox =
document.querySelector(".chat-box");



const q =
query(
collection(db,"messages"),
orderBy("time")
);



onSnapshot(q,(snapshot)=>{


chatBox.innerHTML="";


snapshot.forEach(doc=>{


const data =
doc.data();


chatBox.innerHTML += `

<p>

❤️ <b>${data.sender}</b><br>

${data.message}

</p>

<hr>

`;



});


});



}
