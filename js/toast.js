export function initToast() {

    const buttons =
        document.querySelectorAll(".email-copy-btn");

    const toast =
        document.getElementById("toast");

    const message =
        document.getElementById("toastMessage");

    buttons.forEach(btn => {

        btn.addEventListener("click", async (e) => {

            e.preventDefault();

            const email =
                btn.dataset.email;

            try {

                await navigator.clipboard.writeText(email);

                message.textContent =
                    "Email copied to clipboard!";

                toast.classList.add("show");

                setTimeout(() => {

                    toast.classList.remove("show");

                }, 2500);

            } catch {

                console.log("Clipboard failed.");

            }

            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
                "_blank",
                "noopener"
            );

        });

    });

}