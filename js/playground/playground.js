import { SCENARIOS, BUG_DATABASE } from "./data.js";

export class ExploratoryLab {

    constructor() {

    /* ==========================================
       Core State
    ========================================== */

    this.totalChallenges = 8;
    this.completed = 0;
    this.coverage = 0;
    this.bugs = 0;

    this.startTime = null;
    this.timer = null;
    this.isStarted = false;

    /* ==========================================
       Coverage
    ========================================== */

    this.coverageFill =
        document.querySelector(".coverage-fill");

    this.coverageValue =
        document.getElementById("coverageValue");

    this.coveragePercent =
        document.getElementById("coveragePercent");

    /* ==========================================
       Statistics
    ========================================== */

    this.timerText =
        document.getElementById("testingTimer");

    this.bugCounter =
        document.getElementById("bugCounter");

    /* ==========================================
       Terminal
    ========================================== */

    this.terminal =
        document.getElementById("terminalBody");

    /* ==========================================
       Challenge Cards
    ========================================== */

    this.challengeEls =
        document.querySelectorAll(".challenge");

    /* ==========================================
       Achievement
    ========================================== */

    this.achievement =
        document.getElementById("achievement");

    /* ==========================================
       Pipeline Modal
    ========================================== */

    this.pipeline =
        document.getElementById("pipelineSuccess");

    this.closePipeline =
        document.getElementById("closePipeline");

    /* ==========================================
       Bug Report Modal
    ========================================== */

    this.bugModal =
        document.getElementById("bugModal");

    this.closeBug =
        document.getElementById("closeBug");

    this.bugId =
        document.getElementById("bugId");

    this.bugSeverity =
        document.getElementById("bugSeverity");

    this.bugScenario =
        document.getElementById("bugScenario");

    this.bugExpected =
        document.getElementById("bugExpected");

    this.bugActual =
        document.getElementById("bugActual");

    /* ==========================================
       Test Report Modal
    ========================================== */

    this.reportBtn =
        document.getElementById("viewReport");

    this.reportModal =
        document.getElementById("reportModal");

    this.closeReport =
        document.getElementById("closeReport");

    this.reportCoverage =
        document.getElementById("reportCoverage");

    this.reportBug =
        document.getElementById("reportBug");

    this.reportDuration =
        document.getElementById("reportDuration");

    /* ==========================================
       Controls
    ========================================== */

    this.restartBtn =
        document.getElementById("restartTesting");

    /* ==========================================
       Audio
    ========================================== */

    this.successSound =
        new Audio("assets/sound/success.wav");

    this.finishSound =
        new Audio("assets/sound/finish.wav");

    this.successSound.preload = "auto";
    this.finishSound.preload = "auto";

    this.successSound.volume = 0.05;
    this.finishSound.volume = 0.15;

    /* ==========================================
       Data
    ========================================== */

    this.scenarios = SCENARIOS;
    this.bugDatabase = BUG_DATABASE;

    /* ==========================================
       Initialize
    ========================================== */

    this.bindEvents();


    }

    bindEvents() {
         /* ---------- Restart ---------- */

    this.restartBtn?.addEventListener("click", () => {

        this.reset();

    });

    /* ---------- Challenge Cards ---------- */

    this.challengeEls.forEach(card => {

        card.addEventListener("click", () => {

            this.runChallenge(card);

        });

    });

    /* ---------- View Test Report ---------- */

    this.reportBtn?.addEventListener("click", () => {

        this.pipeline.classList.remove("show");
        this.reportModal.classList.add("show");

    });

    /* ---------- Close Report ---------- */

    this.closeReport?.addEventListener("click", () => {

        this.reportModal.classList.remove("show");

    });

    /* ---------- Close Pipeline ---------- */

    this.closePipeline?.addEventListener("click", () => {

        this.pipeline.classList.remove("show");

    });

    /* ---------- Close Bug Modal ---------- */

    this.closeBug?.addEventListener("click", () => {

        this.bugModal.classList.remove("show");

    });

    /* ---------- Click Outside Bug Modal ---------- */

    this.bugModal?.addEventListener("click", (e) => {

        if (e.target === this.bugModal) {

            this.bugModal.classList.remove("show");

        }

    });
    
    
    /* ---------- Initial Log ---------- */

    this.log(
        "Exploratory Testing Started",
        "info"
    );


    }

    playSound(sound) {
        sound.pause();
    sound.currentTime = 0;

    const promise = sound.play();

    if (promise !== undefined) {

        promise.catch(() => {});

    }

}

  /* ==========================================
   Timer
========================================== */

startTimer() {

    if (this.isStarted) return;

    this.isStarted = true;

    this.startTime = Date.now();

    this.timer = setInterval(() => {

        const seconds = Math.floor(
            (Date.now() - this.startTime) / 1000
        );

        const minutes = String(
            Math.floor(seconds / 60)
        ).padStart(2, "0");

        const remainSeconds = String(
            seconds % 60
        ).padStart(2, "0");

        this.timerText.textContent =
            `${minutes}:${remainSeconds}`;

    }, 1000);

}


/* ==========================================
   Terminal Logger
========================================== */

log(text, type = "info") {

    const line = document.createElement("div");

    line.className = `terminal-line ${type}`;

    line.textContent = `> ${text}`;

    this.terminal.appendChild(line);

    this.terminal.scrollTop =
        this.terminal.scrollHeight;

}





/* ==========================================
   Coverage
========================================== */

updateCoverage() {

    this.coverage = Math.round(

        (this.completed / this.totalChallenges) * 100

    );

    this.coverageValue.textContent =
        `${this.coverage}%`;

    this.coveragePercent.textContent =
        `${this.coverage}%`;

    this.coverageFill.style.width =
        `${this.coverage}%`;

    }

    /* ==========================================
   Run Challenge
========================================== */

runChallenge(card) {

    this.startTimer();

    if (card.classList.contains("done")) {
        return;
    }

    const scenario = this.scenarios[this.completed];

    card.classList.add("done");

    card.querySelector(".challenge-icon").textContent = "✓";

    if (scenario.result === "PASS") {

        this.log(
            `${scenario.text} ........ PASS`,
            "pass"
        );

    } else {

        this.bugs++;

        this.bugCounter.textContent = this.bugs;

        this.log(
            `${scenario.text} ........ BUG FOUND`,
            "fail"
        );

        this.showBugReport(scenario);

    }

    this.completed++;

    this.playSound(this.successSound);

    this.updateCoverage();

    if (this.completed === 4) {

        this.unlockAchievement();

    }

    if (this.completed >= this.totalChallenges) {

        this.finish();

    }

}

   /* ==========================================
   Achievement
========================================== */

unlockAchievement() {

    this.achievement.classList.add("show");

    this.log(
        "Achievement Unlocked : QA Explorer",
        "pass"
    );

    setTimeout(() => {

        this.achievement.classList.remove("show");

    }, 3500);

}

   /* ==========================================
   Bug Report
========================================== */

showBugReport(scenario) {

    const bug = this.bugDatabase[scenario.text];

    if (!bug) return;

    this.bugId.textContent = bug.id;
    this.bugSeverity.textContent = bug.severity;
    this.bugScenario.textContent = scenario.text;
    this.bugExpected.textContent = bug.expected;
    this.bugActual.textContent = bug.actual;

    this.bugModal.classList.add("show");

}

   /* ==========================================
   Finish Testing
========================================== */

finish() {

    clearInterval(this.timer);

    this.playSound(this.finishSound);

    this.log("--------------------------------");

    this.log(
        "Pipeline Passed",
        "pass"
    );

    this.log(
        `Coverage ${this.coverage}%`,
        "pass"
    );

    this.log(
        `${this.bugs} Bug(s) Found`,
        "warn"
    );

    this.reportCoverage.textContent =
        `${this.coverage}%`;

    this.reportBug.textContent =
        this.bugs;

    this.reportDuration.textContent =
        this.timerText.textContent;

    this.showPipeline();

    this.launchConfetti();

}

   /* ==========================================
   Pipeline Success
========================================== */

showPipeline() {

    this.pipeline.classList.add("show");

}

    /* ==========================================
   Confetti
========================================== */

launchConfetti() {

    for (let i = 0; i < 70; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDelay =
            Math.random() * 2 + "s";

        confetti.style.background =
            `hsl(${100 + Math.random() * 40},70%,50%)`;

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }

}


/* ==========================================
   Reset Playground
========================================== */

reset() {

    clearInterval(this.timer);

    this.completed = 0;
    this.coverage = 0;
    this.bugs = 0;

    this.isStarted = false;

    this.coverageValue.textContent = "0%";
    this.coveragePercent.textContent = "0%";
    this.coverageFill.style.width = "0%";

    this.bugCounter.textContent = "0";

    this.timerText.textContent = "00:00";

    this.terminal.innerHTML = "";

    this.challengeEls.forEach(card => {

        card.classList.remove("done");

        card.querySelector(".challenge-icon").textContent = "○";

    });

    this.pipeline.classList.remove("show");
    this.reportModal.classList.remove("show");
    this.bugModal.classList.remove("show");
    this.achievement.classList.remove("show");

    this.log(
        "Exploratory Testing Started",
        "info"
    );

}

}

export function initPlayground() {

    if (!document.querySelector(".playground")) return;

    new ExploratoryLab();

}