function initTheme(){

const root=document.documentElement;

const btn=document.getElementById("themeToggle");

if(!btn) return;

const saved=
localStorage.getItem("theme");

if(saved){

root.dataset.theme=saved;

}

btn.onclick=()=>{

const next=

root.dataset.theme==="light"

?"dark"

:"light";

root.dataset.theme=next;

localStorage.setItem("theme",next);

};

}