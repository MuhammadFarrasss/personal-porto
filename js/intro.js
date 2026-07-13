function initIntro(){

const introText =
"Memastikan sesuatu berjalan benar, dan berjalan tepat waktu.";

const typedText =
document.getElementById("typedText");

const intro =
document.getElementById("intro");

const btn =
document.getElementById("introEnter");

if(!typedText) return;

let i=0;

function typing(){

if(i<introText.length){

typedText.textContent+=introText.charAt(i);

i++;

setTimeout(typing,35);

}else{

btn.classList.add("show");

}

}

typing();

btn.onclick=()=>{

intro.classList.add("hide");

};

}