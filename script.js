import { db, auth } from "./firebase.js";


import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



// OWNER ACCOUNT

const OWNER_EMAIL = "lovermax876@gmail.com";


let currentUser = null;






// ===============================
// WELCOME PAGE
// ===============================


window.enterWebsite = function(){


    document
    .getElementById("welcomePage")
    .classList.add("hidden");


    document
    .getElementById("mainPage")
    .classList.remove("hidden");


};







// ===============================
// OPEN OWNER LOGIN
// ===============================


window.openOwnerLogin = function(){


    document
    .getElementById("loginPage")
    .classList.remove("hidden");


};








// ===============================
// OWNER LOGIN
// ===============================


window.login = async function(){


    const email =
    document.getElementById("email").value.trim();


    const password =
    document.getElementById("password").value;


    const error =
    document.getElementById("error");



    try{


        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        const user =
        userCredential.user;


        currentUser = user.email;



        if(user.email === OWNER_EMAIL){


            document
            .querySelectorAll("[id$='Button']")
            .forEach(button=>{


                button
                .classList
                .remove("hidden");


            });



            document
            .getElementById("loginPage")
            .classList.add("hidden");



            alert("Welcome Mauricio ❤️ Editing unlocked");


        }


        else{


            alert("Login successful but editing is disabled");


        }



    }


    catch(errorMessage){


        console.log(errorMessage);


        error.innerHTML =
        "Wrong email or password ❤️";


    }



};








// ===============================
// PAGE SECTIONS
// ===============================


window.showSection = function(id){



    document
    .querySelectorAll(".content")
    .forEach(section=>{


        section
        .classList
        .add("hidden");


    });



    document
    .getElementById(id)
    .classList
    .remove("hidden");





    if(
        id === "story" ||
        id === "love" ||
        id === "meeting" ||
        id === "dreams"
    ){


        loadStories();


    }





    if(id === "chat"){


        loadMessages();


    }



};// ===============================
// LOAD STORIES FROM FIREBASE
// ===============================


async function loadStories(){


    const stories = [


        {
            name:"ourStory",
            display:"ourStoryDisplay",
            input:"ourStoryText"
        },


        {
            name:"love",
            display:"loveDisplay",
            input:"loveText"
        },


        {
            name:"howWeMet",
            display:"meetingDisplay",
            input:"meetingText"
        },


        {
            name:"dreams",
            display:"dreamsDisplay",
            input:"dreamsText"
        }


    ];




    for(let story of stories){


        try{


            const result =
            await getDoc(

                doc(
                    db,
                    "story",
                    story.name
                )

            );



            if(result.exists()){


                const text =
                result.data().content;



                const display =
                document.getElementById(
                    story.display
                );



                if(display){

                    display.innerText = text;

                }




                const input =
                document.getElementById(
                    story.input
                );



                if(input){

                    input.value = text;

                }



            }



        }


        catch(error){


            console.log(
                "Story loading error:",
                error
            );


        }



    }



}








// ===============================
// OPEN EDIT BOX
// ===============================


window.editStory = function(type){



    let box = "";



    if(type === "ourStory"){

        box = "ourStoryEdit";

    }



    if(type === "love"){

        box = "loveEdit";

    }



    if(type === "howWeMet"){

        box = "meetingEdit";

    }



    if(type === "dreams"){

        box = "dreamsEdit";

    }





    if(box){


        document
        .getElementById(box)
        .classList
        .remove("hidden");


    }



};








// ===============================
// SAVE STORIES TO FIREBASE
// ===============================


window.saveStorySection = async function(
    collectionName,
    inputId
){



    const text =

    document
    .getElementById(inputId)
    .value;



    try{


        await setDoc(

            doc(
                db,
                "story",
                collectionName
            ),


            {

                content:text,

                updatedAt:
                serverTimestamp()

            }


        );



        alert("Saved ❤️");



        loadStories();



    }


    catch(error){


        console.log(error);


        alert(
            "Could not save story"
        );


    }



};// ===============================
// PUBLIC CHAT
// ===============================


window.sendMessage = async function(){



    const input =
    document.getElementById("messageInput");



    const message =
    input.value.trim();




    if(message === "") return;




    try{


        await addDoc(

            collection(
                db,
                "messages"
            ),


            {

                ChatID:"public",

                Message:message,

                Sender:"Anonymous",

                Time:
                serverTimestamp()


            }


        );



        input.value = "";



    }


    catch(error){


        console.log(error);


    }



};








// ===============================
// LOAD CHAT
// ===============================


function loadMessages(){



    const box =
    document.getElementById("chatBox");



    if(!box) return;




    onSnapshot(

        collection(
            db,
            "messages"
        ),



        (snapshot)=>{


            box.innerHTML = "";



            snapshot.forEach(item=>{


                const data =
                item.data();



                box.innerHTML += `

                <div class="message">

                ❤️ Anonymous

                <br><br>

                ${data.Message || ""}

                </div>

                `;


            });





            if(snapshot.empty){


                box.innerHTML =
                "No messages yet ❤️";


            }



        }


    );



}









// ===============================
// GALLERY IMAGE EXPAND
// ===============================


window.expandPhoto = function(photo){


    photo.classList.toggle(
        "expanded"
    );


};









// ===============================
// WHATSAPP
// ===============================


window.openWhatsApp = function(){



    const phone =
    "254797147155";



    const text =
    "Hello Mauricio ❤️ I visited your website.";



    window.open(

        "https://wa.me/" +

        phone +

        "?text=" +

        encodeURIComponent(text),


        "_blank"

    );



};









// ===============================
// STARTUP
// ===============================


window.addEventListener(
    "load",
    ()=>{


        loadStories();


    }
);
