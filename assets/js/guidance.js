// ======================================
// AYMP PERSONAL GUIDANCE ENGINE
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("guidancePopup");
    const openBtn = document.getElementById("openGuidanceBtn");
    const closeBtn = document.querySelector(".close-popup");
    const form = document.getElementById("guidanceForm");
// ===============================
// AYMP PERSONAL GUIDANCE MUSIC
// ===============================

const guidanceMusic = document.getElementById("guidanceMusic");

const guidanceMusicList = [
    "assets/music/blue-silence.mp3",
    "assets/music/celestial-breath.mp3",
    "assets/music/cosmic-peace.mp3",
    "assets/music/divine-glow.mp3",
    "assets/music/golden-energy.mp3",
    "assets/music/heart-harmony.mp3",
    "assets/music/inner-light.mp3",
    "assets/music/moon-serenity.mp3",
    "assets/music/mystic-guidance.mp3",
    "assets/music/power-art-awakening.mp3",
    "assets/music/sacred-space.mp3"
];

function playGuidanceMusic() {

    if (!guidanceMusic) return;

    const musicIndex =
        Math.floor(Date.now() / 86400000) %
        guidanceMusicList.length;

    guidanceMusic.src = guidanceMusicList[musicIndex];

    guidanceMusic.currentTime = 0;

    guidanceMusic.volume = 0.35;

    guidanceMusic.play().catch(function () {
        console.log("Music waiting for user interaction.");
    });
}
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
    // CLICK OUTSIDE
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
            playGuidanceMusic();


            const name =
                document.getElementById("guidanceName").value.trim();

            const dob =
                document.getElementById("guidanceDob").value;

            const birthTime =
                document.getElementById("guidanceTime").value;

            const birthPlace =
                document.getElementById("guidancePlace").value.trim();


            // ======================================
// SELECT DAILY PERSONAL PATTERN
// Changes once every 24 hours
// ======================================

const baseKey =
    name + "|" + dob + "|" + birthTime + "|" + birthPlace;

const DAILY_GUIDANCE_KEY =
    "AYMP_DAILY_GUIDANCE_" +
    btoa(unescape(encodeURIComponent(baseKey)));

const now = Date.now();

const twentyFourHours =
    24 * 60 * 60 * 1000;

let savedGuidance = null;

try {

    savedGuidance = JSON.parse(
        localStorage.getItem(DAILY_GUIDANCE_KEY)
    );

} catch (error) {

    savedGuidance = null;

}


let patternIndex;


// ======================================
// EXISTING DAILY GUIDANCE
// ======================================

if (
    savedGuidance &&
    typeof savedGuidance.patternIndex === "number" &&
    typeof savedGuidance.timestamp === "number"
) {

    const elapsed =
        now - savedGuidance.timestamp;


    // Still within 24 hours
    if (elapsed < twentyFourHours) {

        patternIndex =
            savedGuidance.patternIndex;

    }

    // 24 hours completed → next pattern
    else {

        patternIndex =
            (savedGuidance.patternIndex + 1)
            % soundPatterns.length;

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

}


// ======================================
// FIRST PERSONAL GUIDANCE
// ======================================

else {

    let total = 0;


    // Name
    for (
        let i = 0;
        i < name.length;
        i++
    ) {

        total +=
            name.charCodeAt(i);

    }


    // Date of Birth
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


    // Birth Time
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


    // Birth Place
    for (
        let i = 0;
        i < birthPlace.length;
        i++
    ) {

        total +=
            birthPlace.charCodeAt(i);

    }


    patternIndex =
        total % soundPatterns.length;


    // Save for 24 hours
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


const pattern =
    soundPatterns[patternIndex];
            // ======================================
            // RESULT SCREEN
            // ======================================

            popup.querySelector(".guidance-content").innerHTML = `

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
                        Welcome, ${name}
                    </h3>


                    <div class="birth-summary">

                        <p>
                            📅 <strong>Date:</strong> ${dob}
                        </p>

                        <p>
                            ⏰ <strong>Time:</strong> ${birthTime}
                        </p>

                        <p>
                            📍 <strong>Place:</strong> ${birthPlace}
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

                        <div id="changingSound"
                             class="changing-sound">

                            ${pattern.sound}

                        </div>

                        <div class="sound-title">
                            ${pattern.title}
                        </div>

                    </div>


                    <div class="guidance-card">

                        <h3>
                            🙏 Personal Intention
                        </h3>

                        <p>
                            ${pattern.intention}
                        </p>

                    </div>


                    <div class="practice-card">

                        <h3>
                            🧘 Practice
                        </h3>

                        <p>
                            Repeat the sound pattern
                            <strong>108 times</strong>
                            at a comfortable time,
                            if suitable for your personal
                            practice.
                        </p>

                    </div>


                    <button
                        type="button"
                        id="anotherGuidanceBtn">

                        🔮 EXPERIENCE ANOTHER GUIDANCE

                    </button>


                    <button
                        type="button"
                        id="closeGuidanceResult">

                        ✕ CLOSE

                    </button>

                </div>

            `;


            // ======================================
            // START SOUND ANIMATION
            // ======================================

            startSoundAnimation();


            // ======================================
            // ANOTHER GUIDANCE
            // ======================================

            const anotherBtn =
                document.getElementById("anotherGuidanceBtn");


            if (anotherBtn) {

                anotherBtn.addEventListener("click", function () {

                    const newIndex =
                        Math.floor(
                            Math.random() *
                            soundPatterns.length
                        );


                    const newPattern =
                        soundPatterns[newIndex];


                    const soundElement =
                        document.getElementById("changingSound");


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
                        document.querySelector(".sound-title");


                    if (titleElement) {

                        titleElement.innerText =
                            newPattern.title;

                    }


                    const intentionElement =
                        document.querySelector(
                            ".guidance-card:nth-of-type(2) p"
                        );


                    if (intentionElement) {

                        intentionElement.innerText =
                            newPattern.intention;

                    }

                });

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

                        popup.style.display = "none";

                    }
                );

            }

        });

    }


    // ======================================
    // SOUND CHANGING EFFECT
    // ======================================

    function startSoundAnimation() {

        const soundElement =
            document.getElementById("changingSound");


        if (!soundElement) return;


        soundElement.classList.add(
            "sound-animate"
        );

    }

});
