/* ==========================================
   EXPLORATORY TESTING LAB ENGINE
========================================== */

class ExploratoryLab {

    constructor() {

        this.totalChallenges = 8;
        this.completed = 0;
        this.coverage = 0;
        this.bugs = 0;
        this.startTime = null;
        this.timer = null;
        this.isStarted = false;

        this.coverageFill = document.querySelector(".coverage-fill");
        this.coverageValue = document.getElementById("coverageValue");
        this.coveragePercent = document.getElementById("coveragePercent");

        this.timerText = document.getElementById("testingTimer");

        this.bugCounter = document.getElementById("bugCounter");

        this.terminal = document.getElementById("terminalBody");

        this.challengeEls = document.querySelectorAll(".challenge");

        this.achievement = document.getElementById("achievement");

        this.pipeline = document.getElementById("pipelineSuccess");

        this.restartBtn = document.getElementById("restartTesting");

        this.start();

    }

    start() {
        this.restartBtn.addEventListener("click",()=>{

            this.reset();

        });

        this.challengeEls.forEach(card=>{

            card.addEventListener("click",()=>{

                this.runChallenge(card);

            });

        });

        this.log("Exploratory Testing Started","info");

    }

    startTimer(){

    if(this.isStarted) return;

    this.isStarted = true;

    this.startTime = Date.now();

    this.timer = setInterval(() => {

        const sec = Math.floor((Date.now() - this.startTime) / 1000);

        const m = String(Math.floor(sec / 60)).padStart(2,"0");

        const s = String(sec % 60).padStart(2,"0");

        this.timerText.textContent = `${m}:${s}`;

    },1000);

}

    log(text,type="info"){

        const div=document.createElement("div");

        div.className=`terminal-line ${type}`;

        div.innerHTML=`> ${text}`;

        this.terminal.appendChild(div);

        this.terminal.scrollTop=this.terminal.scrollHeight;

    }

    runChallenge(card){
        
        this.startTimer();

        if(card.classList.contains("done")) return;

        const scenarios=[

            {
                text:"Empty Input Validation",
                result:"PASS"
            },

            {
                text:"Invalid Email",
                result:"PASS"
            },

            {
                text:"Weak Password",
                result:"BUG"
            },

            {
                text:"SQL Injection",
                result:"PASS"
            },

            {
                text:"XSS Payload",
                result:"PASS"
            },

            {
                text:"Emoji Input",
                result:"BUG"
            },

            {
                text:"Unicode",
                result:"PASS"
            },

            {
                text:"Long Username",
                result:"PASS"
            }

        ];

        const data=scenarios[this.completed];

        card.classList.add("done");

        card.querySelector(".challenge-icon").innerHTML="✓";

        if(data.result==="PASS"){

            this.log(`${data.text} ........ PASS`,"pass");

        }else{

            this.log(`${data.text} ........ BUG FOUND`,"fail");

            this.bugs++;

            this.bugCounter.textContent=this.bugs;

        }

        this.completed++;

        this.updateCoverage();

        if(this.completed===4){

            this.unlockAchievement();

        }

        if(this.completed===this.totalChallenges){

            this.finish();

        }

    }

  updateCoverage(){

    this.coverage = Math.round(
        (this.completed / this.totalChallenges) * 100
    );

    this.coverageValue.textContent = this.coverage + "%";

    this.coveragePercent.textContent = this.coverage + "%";

    this.coverageFill.style.width = this.coverage + "%";

}

    unlockAchievement(){

        this.achievement.classList.add("show");

        this.log("Achievement unlocked: QA Explorer","pass");

        setTimeout(() => {
        this.achievement.classList.remove("show");
    }, 3500);

    }

    finish(){

        clearInterval(this.timer);

        this.log("--------------------------------");

        this.log("Pipeline Passed","pass");

        this.log(`Coverage ${this.coverage}%`,"pass");

        this.log(`${this.bugs} Bug(s) Found`,"warn");

        this.showPipeline();

        this.launchConfetti();

    }

    showPipeline(){

        this.pipeline.classList.add("show");

        setTimeout(()=>{

            this.pipeline.classList.remove("show");

        },3500);

    }

    launchConfetti(){

        for(let i=0;i<70;i++){

            const c=document.createElement("div");

            c.className="confetti";

            c.style.left=Math.random()*100+"vw";

            c.style.animationDelay=(Math.random()*2)+"s";

            c.style.background=`hsl(${100+Math.random()*40},70%,50%)`;

            document.body.appendChild(c);

            setTimeout(()=>{

                c.remove();

            },5000);

        }

    }

    reset(){

        clearInterval(this.timer);

        this.completed=0;

        this.coverage=0;

        this.bugs=0;

        this.isStarted = false;

        this.coverageValue.textContent = "0%";

        this.coveragePercent.textContent = "0%";

        this.coverageFill.style.width = "0%";

        this.bugCounter.textContent="0";

        this.timerText.textContent="00:00";

        this.terminal.innerHTML="";

        this.challengeEls.forEach(c=>{

            c.classList.remove("done");

            c.querySelector(".challenge-icon").innerHTML="○";

        });

        this.achievement.classList.remove("show");

        this.start();

    }

}

function initPlayground() {

    if(document.querySelector(".playground")){

        new ExploratoryLab();

    }

}