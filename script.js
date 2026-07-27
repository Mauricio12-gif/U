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


// ===============================
// SETTINGS
// ===============================

const OWNER_EMAIL = "lovermax876@gmail.com";

const VISITOR_PASSWORD = "LOVE";

let currentUser = null;



// ===============================
// GALLERY PHOTOS LIST
// ===============================

const galleryPhotos = [

    "IMG-20251228-WA0030.jpg",
    "IMG-20251228-WA0032.jpg",
    "IMG-20260215-WA0036.jpg",

    "IMG-20260726-WA0006.jpg",
    "IMG-20260726-WA0007.jpg",
    "IMG-20260726-WA0008.jpg",
    "IMG-20260726-WA0009.jpg",

    "photo8.jpg",
    "photo9.jpg",
    "photo10.jpg",
    "photo11.jpg",
    "photo12.jpg",
    "photo13.jpg",
    "photo14.jpg",
    "photo15.jpg",
    "photo16.jpg",
    "photo17.jpg",
    "photo18.jpg",
    "photo19.jpg",
    "photo20.jpg",
    "photo21.jpg",
    "photo22.jpg",
    "photo23.jpg",
    "photo24.jpg",
    "photo25.jpg",
    "photo26.jpg",
    "photo27.jpg",
    "photo28.jpg",
    "photo29.jpg",
    "photo30.jpg",
    "photo31.jpg",
    "photo32.jpg",
    "photo33.jpg",
    "photo34.jpg",
    "photo35.jpg",
    "photo36.jpg",
    "photo37.jpg",
    "photo38.jpg",
    "photo39.jpg",
    "photo40.jpg",
    "photo41.jpg",
    "photo42.jpg",
    "photo43.jpg",
    "photo44.jpg",
    "photo45.jpg"

];// VIDEO LIST

const galleryVideos = [

    "video1.mp4"

];



// ===============================
// VISITOR PASSWORD
// ===============================

window.checkVisitorPassword = function(){


    const password =
    document
    .getElementById("visitorPassword")
    .value;



    if(password === VISITOR_PASSWORD){


        document
        .getElementById("welcomePage")
        .classList
        .add("hidden");



        document
        .getElementById("mainPage")
        .classList
        .remove("hidden");


    }

    else{


        document
        .getElementById("visitorError")
        .innerHTML =
        "Wrong password ❤️";


    }


};



// ===============================
// OWNER LOGIN BUTTON
// ===============================

window.openOwnerLogin = function(){


    document
    .getElementById("loginPage")
    .classList
    .remove("hidden");


};




// ===============================
// OWNER LOGIN
// ===============================

window.login = async function(){


    const email =
    document
    .getElementById("email")
    .value
    .trim();



    const password =
    document
    .getElementById("password")
    .value;



    const error =
    document
    .getElementById("error");



    try{


        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );



        const user =
        userCredential.user;



        currentUser =
        user.email;



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
            .classList
            .add("hidden");



            showNotice(
                "Welcome Mauricio ❤️"
            );


        }


    }


    catch(errorMessage){


        console.log(errorMessage);



        error.innerHTML =
        "Wrong email or password ❤️";


    }


};// ===============================
// PAGE NAVIGATION
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


if(id === "videos"){

    loadVideos();

}


};




// ===============================
// LOAD STORIES
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
                result
                .data()
                .content;



                const display =
                document
                .getElementById(
                    story.display
                );



                if(display){

                    display.innerText = text;

                }



                const input =
                document
                .getElementById(
                    story.input
                );



                if(input){

                    input.value = text;

                }



            }


        }


        catch(error){

            console.log(
                "Story error:",
                error
            );

        }


    }


}





// ===============================
// EDIT STORIES
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
// SAVE STORIES
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



        showNotice(
            "Saved ❤️"
        );


        loadStories();


    }


    catch(error){


        console.log(error);


        showNotice(
            "Could not save"
        );


    }


};




// ===============================
// LOAD GALLERY
// ===============================

function loadGallery(){


    const gallery =
    document
    .getElementById("galleryGrid");



    if(!gallery) return;



    gallery.innerHTML = "";



    galleryPhotos.forEach(photo=>{


        const img =
        new Image();



        img.onload = function(){


            gallery.innerHTML += `

            <img
            src="${photo}"
            onclick="expandPhoto(this)">

            `;


        };



        img.src = photo;


    });


}




// ===============================
// PHOTO VIEWER
// ===============================

window.expandPhoto = function(photo){


    const viewer =
    document
    .getElementById("photoViewer");



    const fullPhoto =
    document
    .getElementById("fullPhoto");



    if(
        viewer &&
        fullPhoto
    ){


        fullPhoto.src =
        photo.src;



        viewer.style.display =
        "flex";


    }


};




window.closePhoto = function(){


    const viewer =
    document
    .getElementById("photoViewer");



    if(viewer){


        viewer.style.display =
        "none";


    }


};// ===============================
// PUBLIC CHAT
// ===============================

window.sendMessage = async function(){


    const input =
    document
    .getElementById("messageInput");



    const message =
    input
    .value
    .trim();



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







function loadMessages(){


    const box =
    document
    .getElementById("chatBox");



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
// WHATSAPP
// ===============================

window.openWhatsApp = function(){


    const phone =
    "254797147255";



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
// NOTICE MESSAGE
// ===============================

function showNotice(message){


    const notice =
    document
    .createElement("div");



    notice.innerHTML =
    message;



    notice.style.position =
    "fixed";



    notice.style.bottom =
    "30px";



    notice.style.left =
    "50%";



    notice.style.transform =
    "translateX(-50%)";



    notice.style.background =
    "white";



    notice.style.color =
    "#d6336c";



    notice.style.padding =
    "15px 25px";



    notice.style.borderRadius =
    "30px";



    notice.style.boxShadow =
    "0 5px 20px rgba(0,0,0,0.2)";



    notice.style.zIndex =
    "99999";



    document
    .body
    .appendChild(notice);



    setTimeout(()=>{


        notice.remove();


    },3000);


}







// ===============================
// START WEBSITE
// ===============================

// ===============================
// LOAD VIDEOS
// ===============================

function loadVideos(){


    const videoGrid =
    document.getElementById("videoGrid");


    if(!videoGrid) return;


    videoGrid.innerHTML = "";


    galleryVideos.forEach(video=>{


        videoGrid.innerHTML += `

        <video controls>

            <source 
            src="${video}" 
            type="video/mp4">

        </video>

        `;


    });


}
window.addEventListener(
    "load",
    ()=>{


        loadStories();

        loadGallery();

        loadVideos();


    }
);
