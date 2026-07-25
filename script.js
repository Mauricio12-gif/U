// Enter story button
function openStory() {

    const story = document.getElementById("story");

    story.classList.remove("hidden");

    story.scrollIntoView({
        behavior: "smooth"
    });

}



// Open love letter
function openLetter(){

    const letter = document.getElementById("letter");

    letter.classList.remove("hidden");

    letter.style.animation = "fadeIn 2s ease";

}



// Reasons cards
function showReason(card){

    const text = card.querySelector("span");

    const messages = [
        "Your smile can change my whole day ❤️",
        "Your kindness makes you beautiful inside and out ❤️",
        "Your personality is one of the reasons I appreciate you ❤️",
        "You bring happiness into my life ❤️"
    ];


    const random =
    messages[Math.floor(Math.random()*messages.length)];


    alert(random);

}



// Floating hearts animation

function createHeart(){

    const heart = document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";


    heart.style.left =
    Math.random()*100+"vw";


    heart.style.animationDuration =
    (Math.random()*3+3)+"s";


    document.body.appendChild(heart);



    setTimeout(()=>{

        heart.remove();

    },6000);

}



setInterval(createHeart,500);



// Welcome message

window.onload=function(){

    console.log(
    "Welcome to Our Little Story ❤️"
    );

};
