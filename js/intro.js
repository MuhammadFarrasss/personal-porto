function initIntro() {

    const introText =
    "Finding problems before users do.";

    const typedText =
    document.getElementById("typedText");

    const intro =
    document.getElementById("intro");

    const btn =
    document.getElementById("introEnter");

    if(!typedText) return;

    let i = 0;

    function typing(){

        if(i < introText.length){

            typedText.textContent += introText.charAt(i);

            i++;

            setTimeout(typing,35);

        }else{

            btn.classList.add("show");

        }

    }

    document.addEventListener("bootFinished", () => {

        typedText.textContent = "";
        i = 0;

        typing();

    });

    btn.onclick = () => {

    intro.classList.add("hide");

    if(typeof fadeInMusic === "function"){

        fadeInMusic();

    }

};

}