// ===============================
// AYMP Personal Guidance Popup
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("guidancePopup");
    const openBtn = document.getElementById("openGuidance");
    const closeBtn = document.querySelector(".closePopup");
    const form = document.getElementById("guidanceForm");

    // Open Popup
    if (openBtn && popup) {
        openBtn.addEventListener("click", function () {
            popup.style.display = "block";
        });
    }

    // Close Popup
    if (closeBtn && popup) {
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });
    }

    // Click Outside Popup
    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });

    // Submit Form
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            alert("✨ AYMP Personal Guidance Engine Coming Soon!");

            popup.style.display = "none";
        });
    }

});
