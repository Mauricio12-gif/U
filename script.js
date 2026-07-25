import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";


// LOGIN

window.login = async function(){

let name =
document.getElementById("visitorName").value;

let password =
document.getElementById("password").value;


if(password === "LOVE"){

currentUser = name;


document
.getElementById("loginPage")
.classList.add("hidden");


document
.getElementById("mainPage")
.classList.remove("hidden");


document.getElementById("welcome").innerHTML =
"Welcome " + name + " ❤️";



await addDoc(
collection(db,"users"),
{
name:name,
loginTime:serverTimestamp()
}
);


loadMessages();


}

else{

document.getElementById("error").innerHTML =
"Wrong password ❤️";

}

};




// SECTION DISPLAY

window.showSection=function(id){

let sections =
document.querySelectorAll(".content");


sections.forEach(section=>{

section.classList.add("hidden");

});


document
.getElementById(id)
.classList.remove("hidden");

};





// SEND MESSAGE

window.sendMessage=async function(){


let input =
document.getElementById("messageInput");


let text =
input.value;


if(text==="") return;


await addDoc(
collection(db,"messages"),
{

sender:currentUser,

message:text,

time:serverTimestamp()

}

);


input.value="";

loadMessages();

};






// LOAD CHAT

async function loadMessages(){


let box =
document.getElementById("chatBox");


if(!box) return;


box.innerHTML="";


let q =
query(
collection(db,"messages"),
orderBy("time")
);


let snap =
await getDocs(q);



snap.forEach(doc=>{


let data=doc.data();


box.innerHTML += `

<div class="message">

<b>${data.sender}</b><br>

${data.message}

</div>

`;

});


}
