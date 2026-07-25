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

const name = document
.getElementById("visitorName")
.value
.trim();

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


loadMessages();


};





// SHOW SECTIONS

window.showSection = function(sectionID){


document
.querySelectorAll(".content")
.forEach(section=>{

section.classList.add("hidden");

});


document
.getElementById(sectionID)
.classList.remove("hidden");


};






// SEND MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();



if(text === ""){

return;

}



try{


await addDoc(
collection(db,"messages"),
{

sender: currentUser,

message: text,

time: serverTimestamp()

}

);



input.value = "";


}

catch(error){

console.log(error);

alert("Message failed to send");

}


};







// LOAD REAL TIME MESSAGES

function loadMessages(){


const chatBox =
document.querySelector(".chat-box");


const q =
query(
collection(db,"messages"),
orderBy("time","asc")
);



onSnapshot(q,(snapshot)=>{


chatBox.innerHTML = "";



snapshot.forEach((doc)=>{


const data = doc.data();



chatBox.innerHTML += `

<div class="message">

❤️ <b>${data.sender}</b>

<br>

${data.message}

</div>

`;



});



});



}







// LOGOUT

window.logout = function(){

currentUser = "";

location.reload();

};
