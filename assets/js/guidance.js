// ======================================
// AYMP PERSONAL GUIDANCE ENGINE
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("guidancePopup");
    const openBtn = document.getElementById("openGuidanceBtn");
    const closeBtn = document.querySelector(".close-popup");
    const form = document.getElementById("guidanceForm");

    // ======================================
    // 30 AYMP SACRED SOUND PATTERNS
    // ======================================

    const soundPatterns = [

        {
            title: "Peace",
            sound: "OM • SHREEM • AIM • HREEM • YAV • VAV • OM",
            intention: "Peace, calmness and inner clarity."
        },

        {
            title: "Clarity",
            sound: "AIM • HREEM • KLEEM • YAV • SANG • MANG • AIM",
            intention: "Clear thinking and thoughtful decisions."
        },

        {
            title: "Confidence",
            sound: "SHREEM • KLEEM • HREEM • SHAV • VAV • YAV • SHREEM",
            intention: "Courage and self-confidence."
        },

        {
            title: "Positive Beginning",
            sound: "OM • AIM • SHREEM • YAV • VASI • HREEM • OM",
            intention: "A positive and peaceful beginning."
        },

        {
            title: "Focus",
            sound: "AIM • YAV • YAV • SANG • MANG • NANG • AIM",
            intention: "Concentration and disciplined attention."
        },

        {
            title: "Emotional Balance",
            sound: "HREEM • VAV • YAV • MANG • NANG • YASI • HREEM",
            intention: "Emotional balance and calm reflection."
        },

        {
            title: "Patience",
            sound: "OM • VAV • MANG • NANG • YAV • SANG • OM",
            intention: "Patience during difficult situations."
        },

        {
            title: "Inner Strength",
            sound: "HREEM • SHAV • VAV • MANG • YAV • KLEEM • HREEM",
            intention: "Inner strength and resilience."
        },

        {
            title: "Hope",
            sound: "SHREEM • YAV • AIM • VASI • YASI • OM • SHREEM",
            intention: "Hope and positive expectation."
        },

        {
            title: "Protection",
            sound: "OM • HREEM • SHAV • VAV • MANG • NANG • OM",
            intention: "A sense of safety, courage and protection."
        },

        {
            title: "Wisdom",
            sound: "AIM • SANG • MANG • YAV • VANG • HREEM • AIM",
            intention: "Wisdom before action."
        },

        {
            title: "Communication",
            sound: "YAV • VAV • AIM • YASI • VASI • MANG • YAV",
            intention: "Clear and respectful communication."
        },

        {
            title: "Harmony",
            sound: "KLEEM • SHREEM • YAV • VASI • YASI • HREEM • KLEEM",
            intention: "Harmony in relationships."
        },

        {
            title: "Forgiveness",
            sound: "OM • MANG • NANG • YASI • VASI • YAV • OM",
            intention: "Letting go of anger and moving toward forgiveness."
        },

        {
            title: "Renewal",
            sound: "SHREEM • HREEM • YAV • AIM • VAV • YASI • SHREEM",
            intention: "A fresh beginning."
        },

        {
            title: "Motivation",
            sound: "KLEEM • AIM • MANG • YAV • VANG • HREEM • KLEEM",
            intention: "Motivation to take constructive action."
        },

        {
            title: "Stability",
            sound: "VANG • MANG • NANG • YAV • VAV • SHREEM • VANG",
            intention: "Stability and grounded thinking."
        },

        {
            title: "Creativity",
            sound: "AIM • YASI • VASI • MANG • SANG • YAV • AIM",
            intention: "Creativity and new ideas."
        },

        {
            title: "Positive Relationships",
            sound: "KLEEM • VASI • YASI • MASI • YAV • SHREEM • KLEEM",
            intention: "Kindness, understanding and healthy relationships."
        },

        {
            title: "Letting Go",
            sound: "OM • NASI • YASI • VAV • NANG • HREEM • OM",
            intention: "Release unnecessary worry and mental tension."
        },

        {
            title: "Gratitude",
            sound: "SHREEM • AIM • OM • YAV • VASI • HREEM • SHREEM",
            intention: "Gratitude for the good things in life."
        },

        {
            title: "Inner Silence",
            sound: "OM • HREEM • OM • YAV • NANG • OM • HREEM",
            intention: "Quiet reflection and mindfulness."
        },

        {
            title: "Determination",
            sound: "KLEEM • MANG • YAV • VANG • SANG • HREEM • KLEEM",
            intention: "Determination to complete meaningful goals."
        },

        {
            title: "Understanding",
            sound: "AIM • SANG • VANG • YASI • VASI • YAV • AIM",
            intention: "Understanding before judgment."
        },

        {
            title: "Balance",
            sound: "SHREEM • HREEM • VAV • YAV • MANG • AIM • SHREEM",
            intention: "Balance between thought, emotion and action."
        },

        {
            title: "Transformation",
            sound: "OM • KLEEM • HREEM • MANG • YAV • VASI • OM",
            intention: "Positive personal transformation."
        },

        {
            title: "Compassion",
            sound: "YASI • VASI • NASI • YAV • MANG • SHREEM • YASI",
            intention: "Compassion toward yourself and others."
        },

        {
            title: "Gratitude & Hope",
            sound: "SHREEM • OM • YAV • AIM • HREEM • VASI • SHREEM",
            intention: "Gratitude today and hope for tomorrow."
        },

        {
            title: "Personal Intention",
            sound: "AIM • HREEM • KLEEM • YAV • VAV • SHREEM • OM",
            intention: "Hold one clear personal intention."
        },

        {
            title: "Universal Peace",
            sound: "OM • SHREEM • AIM • HREEM • KLEEM • YAV • SHREEM • OM",
            intention: "Peace, understanding and goodwill for all."
        }

    ];


    // ======================================
    // OPEN POPUP
    // ======================================

    if (openBtn && popup) {

        openBtn.addEventListener("click", function () {

            popup.style.display = "block";

        });

    }


    // ======================================
    // CLOSE POPUP
    // ======================================

    if (closeBtn && popup) {

        closeBtn.addEventListener("click", function () {

            popup.style.display = "none";

        });

    }


    // ======================================
    // CLICK OUTSIDE POPUP
    // ======================================

    window.addEventListener("click", function (e) {

        if (e.target === popup) {

            popup.style.display = "none";

        }

    });


    // ======================================
    // PERSONAL GUIDANCE RESULT
    // ======================================

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();


            // ======================================
            // GET USER DETAILS
            // ======================================

            const name =
                document.getElementById("guidanceName").value.trim();

            const dob =
                document.getElementById("guidanceDob").value;

            const birthTime =
                document.getElementById("guidanceTime").value;

            const birthPlace =
                document.getElementById("guidancePlace").value.trim();


            // ======================================
            // VALIDATION
            // ======================================

            if (name === "") {

                alert("Please enter your name.");

                return;

            }


            if (dob === "") {

                alert("Please select your date of birth.");

                return;

            }


            if (birthTime === "") {

                alert("Please select your birth time.");

                return;

            }


            if (birthPlace === "") {

                alert("Please enter your place of birth.");

                return;

            }


            // ======================================
            // DAILY GUIDANCE STORAGE
            // ======================================

            const DAILY_GUIDANCE_KEY =
                "AYMP_DAILY_GUIDANCE";

            const now =
                Date.now();

            const twentyFourHours =
                24 * 60 * 60 * 1000;

            let savedGuidance = null;


            try {

                savedGuidance =
                    JSON.parse(
                        localStorage.getItem(
                            DAILY_GUIDANCE_KEY
                        )
                    );

            }

            catch (error) {

                savedGuidance = null;

            }


            // ======================================
            // VARIABLES
            // ======================================

            let patternIndex;

            let total = 0;


            // ======================================
            // USE SAVED DAILY PATTERN
            // ======================================

            if (

                savedGuidance &&

                typeof savedGuidance.patternIndex === "number" &&

                typeof savedGuidance.timestamp === "number" &&

                (now - savedGuidance.timestamp) <
                    twentyFourHours &&

                savedGuidance.patternIndex >= 0 &&

                savedGuidance.patternIndex <
                    soundPatterns.length

            ) {

                patternIndex =
                    savedGuidance.patternIndex;

            }


            // ======================================
            // CREATE NEW DAILY PATTERN
            // ======================================

            else {


                // ======================================
                // NAME VALUE
                // ======================================

                for (
                    let i = 0;
                    i < name.length;
                    i++
                ) {

                    total +=
                        name.charCodeAt(i);

                }


                // ======================================
                // DATE OF BIRTH VALUE
                // ======================================

                for (
                    let i = 0;
                    i < dob.length;
                    i++
                ) {

                    const digit =
                        parseInt(dob[i]);

                    if (!isNaN(digit)) {

                        total += digit;

                    }

                }


                // ======================================
                // BIRTH TIME VALUE
                // ======================================

                for (
                    let i = 0;
                    i < birthTime.length;
                    i++
                ) {

                    const digit =
                        parseInt(birthTime[i]);

                    if (!isNaN(digit)) {

                        total += digit;

                    }

                }


                // ======================================
                // BIRTH PLACE VALUE
                // ======================================

                for (
                    let i = 0;
                    i < birthPlace.length;
                    i++
                ) {

                    total +=
                        birthPlace.charCodeAt(i);

                }


                // ======================================
                // SELECT PATTERN
                // ======================================

                patternIndex =
                    total %
                    soundPatterns.length;


                // ======================================
                // SAVE PATTERN FOR 24 HOURS
                // ======================================

                try {

                    localStorage.setItem(

                        DAILY_GUIDANCE_KEY,

                        JSON.stringify({

                            patternIndex:
                                patternIndex,

                            timestamp:
                                now

                        })

                    );

                }

                catch (error) {

                    console.warn(
                        "AYMP: Unable to save daily guidance.",
                        error
                    );

                }

            }


            // ======================================
            // GET SELECTED PATTERN
            // ======================================

            const pattern =
                soundPatterns[patternIndex];


            if (!pattern) {

                console.error(
                    "AYMP Guidance Pattern Not Found"
                );

                alert(
                    "Unable to create Personal Guidance."
                );

                return;

            }


            // ======================================
            // RESULT CONTAINER
            // ======================================

            const guidanceContent =
                popup.querySelector(
                    ".guidance-content"
                );


            if (!guidanceContent) {

                console.error(
                    "AYMP: .guidance-content not found."
                );

                alert(
                    "Personal Guidance display area not found."
                );

                return;

            }


            // ======================================
            // RESULT SCREEN
            // ======================================

            guidanceContent.innerHTML = `

                <div class="aymp-guidance-result">


                    <div class="power-art-glow">

                        <div class="energy-orbit"></div>

                        <div class="power-core">
                            ✦
                        </div>

                    </div>


                    <h2>
                        ✨ AYMP PERSONAL GUIDANCE
                    </h2>


                    <h3>
                        Welcome, ${escapeHtml(name)}
                    </h3>


                    <div class="birth-summary">

                        <p>
                            📅
                            <strong>Date:</strong>
                            ${escapeHtml(dob)}
                        </p>


                        <p>
                            ⏰
                            <strong>Time:</strong>
                            ${escapeHtml(birthTime)}
                        </p>


                        <p>
                            📍
                            <strong>Place:</strong>
                            ${escapeHtml(birthPlace)}
                        </p>

                    </div>


                    <div class="guidance-card">

                        <h3>
                            🌌 Your Cosmic Insight
                        </h3>


                        <p>
                            Your personal guidance experience
                            has been prepared from the details
                            you provided.
                        </p>

                    </div>


                    <div class="sound-card">

                        <div class="sound-label">

                            🔊 AYMP SACRED SOUND

                        </div>


                        <div
                            id="changingSound"
                            class="changing-sound"
                        >

                            ${escapeHtml(
                                pattern.sound
                            )}

                        </div>


                        <div class="sound-title">

                            ${escapeHtml(
                                pattern.title
                            )}

                        </div>

                    </div>


                    <div class="guidance-card">

                        <h3>
                            🙏 Personal Intention
                        </h3>


                        <p id="guidanceIntention">

                            ${escapeHtml(
                                pattern.intention
                            )}

                        </p>

                    </div>


                    <div class="practice-card">

                        <h3>
                            🧘 Practice
                        </h3>


                        <p>

                            Repeat the sound pattern

                            <strong>
                                108 times
                            </strong>

                            at a comfortable time,
                            if suitable for your personal
                            practice.

                        </p>

                    </div>


                    <button
                        type="button"
                        id="anotherGuidanceBtn"
                    >

                        🔮 EXPERIENCE ANOTHER GUIDANCE

                    </button>


                    <button
                        type="button"
                        id="closeGuidanceResult"
                    >

                        ✕ CLOSE

                    </button>


                </div>

            `;


            // ======================================
            // SHOW RESULT
            // ======================================

            popup.style.display =
                "block";


            // ======================================
            // START SOUND ANIMATION
            // ======================================

            startSoundAnimation();


            // ======================================
            // ANOTHER GUIDANCE
            // ======================================

            const anotherBtn =
                document.getElementById(
                    "anotherGuidanceBtn"
                );


            if (anotherBtn) {

                anotherBtn.addEventListener(
                    "click",
                    function () {


                        const newIndex =
                            Math.floor(
                                Math.random() *
                                soundPatterns.length
                            );


                        const newPattern =
                            soundPatterns[newIndex];


                        const soundElement =
                            document.getElementById(
                                "changingSound"
                            );


                        if (soundElement) {


                            soundElement.classList.remove(
                                "sound-animate"
                            );


                            void soundElement.offsetWidth;


                            soundElement.innerText =
                                newPattern.sound;


                            soundElement.classList.add(
                                "sound-animate"
                            );

                        }


                        const titleElement =
                            document.querySelector(
                                ".sound-title"
                            );


                        if (titleElement) {

                            titleElement.innerText =
                                newPattern.title;

                        }


                        const intentionElement =
                            document.getElementById(
                                "guidanceIntention"
                            );


                        if (intentionElement) {

                            intentionElement.innerText =
                                newPattern.intention;

                        }

                    }
                );

            }


            // ======================================
            // CLOSE RESULT
            // ======================================

            const closeResult =
                document.getElementById(
                    "closeGuidanceResult"
                );


            if (closeResult) {

                closeResult.addEventListener(
                    "click",
                    function () {

                        popup.style.display =
                            "none";

                    }
                );

            }

        });

    }


    // ======================================
    // SAFE HTML TEXT
    // ======================================

    function escapeHtml(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ======================================
    // SOUND CHANGING EFFECT
    // ======================================

    function startSoundAnimation() {

        const soundElement =
            document.getElementById(
                "changingSound"
            );


        if (!soundElement) {

            return;

        }


        soundElement.classList.remove(
            "sound-animate"
        );


        void soundElement.offsetWidth;


        soundElement.classList.add(
            "sound-animate"
        );

    }

});
