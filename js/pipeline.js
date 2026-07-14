export function initPipeline(){

    const dropdown = document.getElementById("exploratoryDropdown");

    if(!dropdown) return;

    dropdown.addEventListener("toggle",()=>{

        if(dropdown.open){

            setTimeout(()=>{

                dropdown.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            },100);

        }

    });

}