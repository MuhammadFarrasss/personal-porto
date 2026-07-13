function initGallery(){

const lightbox=
document.getElementById("lightbox");

const img=
document.getElementById("lightboxImg");

const caption=
document.getElementById("lightboxCaption");

const close=
document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-thumb")
.forEach(button=>{

button.onclick=()=>{

img.src=
button.dataset.full;

img.alt=
button.querySelector("img").alt;

caption.textContent=
button.parentElement
.querySelector("figcaption")
.innerText;

lightbox.classList.add("show");

};

});

close.onclick=()=>{

lightbox.classList.remove("show");

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("show");

}

};

}