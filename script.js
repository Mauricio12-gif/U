// LOGIN SYSTEM

function login(){

    const name =
    document.getElementById("visitorName").value;


    const password =
    document.getElementById("password").value;


    const error =
    document.getElementById("error");



    if(password === "LOVE"){


        document.getElementById("loginPage")
        .classList.add("hidden");


        document.getElementById("mainPage")
        .classList.remove("hidden");



        document.getElementById("welcome")
        .innerHTML =
        "Welcome " + name + " ❤️";



    }else{


        error.innerHTML =
        "Wrong password ❤️ Try again";


    }


}






// SHOW SECTIONS

function showSection(sectionID){


    const sections =
    document.querySelectorAll(".content");


    sections.forEach(section=>{

        section.classList.add("hidden");

    });



    document
    .getElementById(sectionID)
    .classList.remove("hidden");



    document
    .getElementById(sectionID)
    .scrollIntoView({

        behavior:"smooth"

    });


}







// LOVE GAME

function startGame(){


let score = 0;



let answer1 =
prompt(
"Where did our story begin? ❤️"
);



if(answer1){

score++;

}




let answer2 =
prompt(
"What is something you love about us? ❤️"
);



if(answer2){

score++;

}




let answer3 =
prompt(
"What memory will you never forget? ❤️"
);



if(answer3){

score++;

}





document
.getElementById("gameResult")
.innerHTML =

"Your love score is "
+
score
+
"/3 ❤️";


}








// BUTTON SCROLL

function scrollToMemories(){


showSection("story");


}
