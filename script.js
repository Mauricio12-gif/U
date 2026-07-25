// STORE CURRENT USER

let currentUser = "";




// LOGIN SYSTEM

function login(){


    const name =
    document.getElementById("visitorName").value.trim();


    const password =
    document.getElementById("password").value;


    const error =
    document.getElementById("error");



    if(name === ""){

        error.innerHTML =
        "Please enter your name ❤️";

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



        localStorage.setItem(
            "visitorName",
            name
        );


    }

    else{


        error.innerHTML =
        "Wrong password ❤️";


    }


}








// OPEN SECTIONS

function showSection(sectionID){


    const sections =
    document.querySelectorAll(".content");



    sections.forEach(section => {

        section.classList.add("hidden");

    });



    const selected =
    document.getElementById(sectionID);



    selected.classList.remove("hidden");



    selected.scrollIntoView({

        behavior:"smooth"

    });


}








// LOAD SAVED USER

window.onload = function(){


    const savedName =
    localStorage.getItem("visitorName");


    if(savedName){


        document
        .getElementById("visitorName")
        .value = savedName;


    }


}








// SIMPLE LOVE GAME

function startGame(){


    let score = 0;



    let question1 =
    prompt(
    "What is your favourite memory with me? ❤️"
    );


    if(question1){

        score++;

    }



    let question2 =
    prompt(
    "What makes our story special? ❤️"
    );


    if(question2){

        score++;

    }



    alert(
    "Your love score is "
    + score +
    "/2 ❤️"
    );


}
