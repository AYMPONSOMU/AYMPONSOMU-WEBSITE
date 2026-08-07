// ===============================
// AYMP Personal Guidance
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("guidancePopup");
    const openBtn = document.getElementById("openGuidanceBtn");
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

            const name = document.getElementById("guidanceName").value;
            const dob = document.getElementById("guidanceDob").value;
            const birthTime = document.getElementById("guidanceTime").value;
            const birthPlace = document.getElementById("guidancePlace").value;

            const result = `
                <div class="guidance-result">

                    <h2>✨ AYMP PERSONAL GUIDANCE</h2>

                    <h3>Welcome, ${name}</h3>

                    <p>
                        Your personal guidance request has been received.
                    </p>

                    <hr>

                    <p><strong>📅 Date of Birth:</strong> ${dob}</p>

                    <p><strong>⏰ Birth Time:</strong> ${birthTime}</p>

                    <p><strong>📍 Birth Place:</strong> ${birthPlace}</p>

                    <hr>

                    <h3>🔮 Your Personal Insight</h3>

                    <p>
                        Your personal cosmic guidance is being prepared
                        from the information you provided.
                    </p>

                    <h3>🧿 AYMP Guidance</h3>

                    <p>
                        Take a moment for calm reflection today.
                        Focus on clarity, positive intention and
                        thoughtful action.
                    </p>

                    <h3>🌌 AYMP Universal Sound Code</h3>

                    <p>
                        AYM – SHRI – KLEEM
                    </p>

                    <p>
                        Use this sound sequence as a personal
                        meditation and reflection practice.
                    </p>

                    <hr>

                    <p>
                        🙏 This guidance is provided for
                        personal reflection and spiritual practice.
                    </p>

                    <button type="button"
                            onclick="location.reload()">
                        🔄 NEW GUIDANCE
                    </button>

                </div>
            `;

            popup.querySelector(".guidance-content").innerHTML = result;

        });
    }

});
