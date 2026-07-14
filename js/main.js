import { initBoot } from "./boot.js";
import { initIntro } from "./intro.js";
import { initTheme } from "./theme.js";
import { initGallery } from "./gallery.js";
import { initPipeline } from "./pipeline.js";
import { initToast } from "./toast.js";
import { initMusic, fadeInMusic } from "./music.js";
import { initPlayground } from "./playground/playground.js";

document.addEventListener("DOMContentLoaded", () => {

    initBoot();
    initIntro();
    initTheme();
    initGallery();
    initPipeline();
    initToast();
    initMusic();
    initPlayground();

    document.addEventListener("bootFinished", () => {
        fadeInMusic();
    });

});