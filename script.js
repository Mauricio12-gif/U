import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
where,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


let currentUser = "";
let activeChat = "";



// LOGIN

window.login = async function(){

const name =
document.getElementById("visitorName").value.trim();

const password =
document.getElementById("password").value;


const error =
document.getElementById("error");



if(password !== "LOVE"){

error.innerHTML="Wrong password ❤️";
return;

}


currentUser=name;


// Hide login

document
.getElementById("loginPage")
.classList.add("hidden");


// Show app

document
.getElementById("mainPage")
.classList.remove("hidden");


document
.getElementById("welcome")
.innerHTML=
"Welcome "+name+" ❤️";


// Open personal chat automatically

activeChat=name;

loadMessages();


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

chat:activeChat,

sender:currentUser,

message:text,

time:serverTimestamp()

}

);


input.value="";


loadMessages();


};







// LOAD MESSAGES


async function loadMessages(){


const box =
document.getElementById("messages");


box.innerHTML="";


const q =
query(
collection(db,"messages"),
where("chat","==",activeChat),
orderBy("time")
);



const snapshot =
await getDocs(q);



snapshot.forEach(doc=>{


const data =
doc.data();



let type =
data.sender===currentUser
?"sent"
:"received";



box.innerHTML += `

<div class="message ${type}">

<b>${data.sender}</b><br>

${data.message}

</div>

`;


});


}






// LOGOUT


window.logout=function(){


currentUser="";

activeChat="";


location.reload();


};
