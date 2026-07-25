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

const name = document.getElementById("visitorName").value.trim();
const password = document.getElementById("password").value;
const error = document.getElementById("error");


if(name === ""){
error.innerHTML="Enter your name ❤️";
return;
}


if(password !== "LOVE"){
error.innerHTML="Wrong password ❤️";
return;
}


currentUser = name;
activeChat = name;


// Hide login

document.getElementById("loginPage").style.display="none";


// Show app

document.getElementById("mainPage").classList.remove("hidden");

document.getElementById("welcome").innerHTML =
"❤️ Welcome " + name;



// Open chat automatically

document.getElementById("chatHeader").innerHTML =
"<h3>💬 Chat with Mauricio</h3>";



loadMessages();

};




// SEND MESSAGE

window.sendMessage = async function(){


const input =
document.getElementById("messageInput");


const text =
input.value.trim();



if(text===""){
return;
}



await addDoc(collection(db,"messages"),{

chat:activeChat,

sender:currentUser,

message:text,

time:serverTimestamp()

});



input.value="";


loadMessages();


};






// LOAD MESSAGES

async function loadMessages(){


const box =
document.getElementById("messages");


box.innerHTML="Loading messages ❤️";



const q=query(

collection(db,"messages"),

where("chat","==",activeChat),

orderBy("time","asc")

);



const result =
await getDocs(q);



box.innerHTML="";



if(result.empty){

box.innerHTML=
"<p>No messages yet ❤️ Start the conversation</p>";

return;

}



result.forEach(doc=>{


let data=doc.data();



let style =
data.sender===currentUser
?"sent"
:"received";



box.innerHTML += `

<div class="message ${style}">

<strong>${data.sender}</strong><br>

${data.message}

</div>

`;



});



box.scrollTop = box.scrollHeight;


}






// LOGOUT

window.logout=function(){

currentUser="";

activeChat="";

location.reload();

};
