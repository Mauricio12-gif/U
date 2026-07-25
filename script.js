import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



let currentUser = "";




// LOGIN

window.login = async function(){


    const name =
    document.getElementById("visitorName").value.trim();


    const password =
    document.getElementById("password").value;


    const error =
    document.getElementById("error");



    if(name === ""){

        error.innerHTML =
        "Enter your name ❤️";

        return;

    }



    if(password === "LOVE"){


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



        // Save login record

        await addDoc(
            collection(db,"users"),
            {

                name:name,

                loginTime:
                serverTimestamp()

            }
        );



    }

    else{

        error.innerHTML =
        "Wrong password ❤️";

    }

};







// OPEN SECTIONS

window.showSection = function(sectionID){


    const sections =
    document.querySelectorAll(".content");


    sections.forEach(section=>{

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



    if(text === "") return;



    await addDoc(
        collection(db,"messages"),
        {

            sender:currentUser,

            message:text,

            time:
            serverTimestamp()

        }
    );



    input.value="";


    loadMessages();


};







// LOAD MESSAGES

async function loadMessages(){


    const chatBox =
    document.querySelector(".chat-box");


    chatBox.innerHTML="";



    const q =
    query(
        collection(db,"messages"),
        orderBy("time")
    );



    const snapshot =
    await getDocs(q);



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


}






window.onload=function(){

    loadMessages();

};
