const lines = [

"✓ Installing dependencies...",
"✓ Loading portfolio assets...",
"✓ Loading QA profile...",
"✓ Initializing pipeline...",
"✓ Executing workflow...",
"✓ Running test cases...",
"✓ 12 test cases passed",
"✓ Deploying production...",
"✓ Deployment successful"

];

const terminal = document.getElementById("bootTerminal");
const progress = document.getElementById("bootProgress");
const screen = document.getElementById("bootScreen");

let current = 0;

function nextLine(){

    if(current >= lines.length){

    setTimeout(() => {

        screen.classList.add("hide");

        setTimeout(() => {

            document.dispatchEvent(
                new CustomEvent("bootFinished")
            );

        },700); 

    },500);

    return;

}

    const div=document.createElement("div");

    div.className="boot-line boot-success";

    div.textContent=lines[current];

    terminal.appendChild(div);

    terminal.scrollTop=terminal.scrollHeight;

    current++;

    progress.style.width=(current/lines.length*100)+"%";

    setTimeout(nextLine,300);

}

window.addEventListener("load",()=>{

    setTimeout(nextLine,300);

});