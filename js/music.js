const bgMusic = new Audio("assets/sound/jazz.mp3");

bgMusic.loop = true;
bgMusic.volume = 0;

const musicBtn = document.getElementById("musicToggle");

let musicEnabled =
    localStorage.getItem("music") !== "off";

function fadeInMusic(){

    if(!musicEnabled) return;

    bgMusic.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.01;

        bgMusic.volume = Math.min(volume,0.08);

        if(volume >= 0.08){

            clearInterval(fade);

        }

    },200);

}

function updateButton(){

    if(!musicBtn) return;

    musicBtn.classList.toggle("active",musicEnabled);

    musicBtn.textContent =
        musicEnabled ? "♫" : "♪";

}

updateButton();

musicBtn?.addEventListener("click",()=>{

    musicEnabled = !musicEnabled;

    localStorage.setItem(
        "music",
        musicEnabled ? "on" : "off"
    );

    if(!musicEnabled){

        bgMusic.pause();
        bgMusic.currentTime = 0;

    }else{

        fadeInMusic();

    }

    updateButton();

});