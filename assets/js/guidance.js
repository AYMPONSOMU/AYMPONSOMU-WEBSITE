from pathlib import Path

code = r'''// ======================================
// AYMP PERSONAL GUIDANCE ENGINE
// With AYMP Sacred Music
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("guidancePopup");
    const openBtn = document.getElementById("openGuidanceBtn");
    const closeBtn = document.querySelector(".close-popup");
    const form = document.getElementById("guidanceForm");

    // ======================================
    // AYMP SACRED MUSIC FILES
    // ======================================

    const musicFiles = [
        "blue-silence.mp3",
        "celestial-breath.mp3",
        "cosmic-peace.mp3",
        "divine-glow.mp3",
        "goldan-energy.mp3",
        "heart-hermony.mp3",
        "inner-light.mp3",
        "moon-serenity.mp3",
        "mystic-guidance.mp3",
        "power-art-awakening.mp3",
        "sacred-space.mp3"
    ];

    // ======================================
    // 30 AYMP GUIDANCE PATTERNS
    // ======================================

    const soundPatterns = [
        ["Peace","OM • SHREEM • AIM • HREEM • YAV • VAV • OM","Peace, calmness and inner clarity."],
        ["Clarity","AIM • HREEM • KLEEM • YAV • SANG • MANG • AIM","Clear thinking and thoughtful decisions."],
        ["Confidence","SHREEM • KLEEM • HREEM • SHAV • VAV • YAV • SHREEM","Courage and self-confidence."],
        ["Positive Beginning","OM • AIM • SHREEM • YAV • VASI • HREEM • OM","A positive and peaceful beginning."],
        ["Focus","AIM • YAV • YAV • SANG • MANG • NANG • AIM","Concentration and disciplined attention."],
        ["Emotional Balance","HREEM • VAV • YAV • MANG • NANG • YASI • HREEM","Emotional balance and calm reflection."],
        ["Patience","OM • VAV • MANG • NANG • YAV • SANG • OM","Patience during difficult situations."],
        ["Inner Strength","HREEM • SHAV • VAV • MANG • YAV • KLEEM • HREEM","Inner strength and resilience."],
        ["Hope","SHREEM • YAV • AIM • VASI • YASI • OM • SHREEM","Hope and positive expectation."],
        ["Protection","OM • HREEM • SHAV • VAV • MANG • NANG • OM","A sense of safety, courage and protection."],
        ["Wisdom","AIM • SANG • MANG • YAV • VANG • HREEM • AIM","Wisdom before action."],
        ["Communication","YAV • VAV • AIM • YASI • VASI • MANG • YAV","Clear and respectful communication."],
        ["Harmony","KLEEM • SHREEM • YAV • VASI • YASI • HREEM • KLEEM","Harmony in relationships."],
        ["Forgiveness","OM • MANG • NANG • YASI • VASI • YAV • OM","Letting go of anger and moving toward forgiveness."],
        ["Renewal","SHREEM • HREEM • YAV • AIM • VAV • YASI • SHREEM","A fresh beginning."],
        ["Motivation","KLEEM • AIM • MANG • YAV • VANG • HREEM • KLEEM","Motivation to take constructive action."],
        ["Stability","VANG • MANG • NANG • YAV • VAV • SHREEM • VANG","Stability and grounded thinking."],
        ["Creativity","AIM • YASI • VASI • MANG • SANG • YAV • AIM","Creativity and new ideas."],
        ["Positive Relationships","KLEEM • VASI • YASI • MASI • YAV • SHREEM • KLEEM","Kindness, understanding and healthy relationships."],
        ["Letting Go","OM • NASI • YASI • VAV • NANG • HREEM • OM","Release unnecessary worry and mental tension."],
        ["Gratitude","SHREEM • AIM • OM • YAV • VASI • HREEM • SHREEM","Gratitude for the good things in life."],
        ["Inner Silence","OM • HREEM • OM • YAV • NANG • OM • HREEM","Quiet reflection and mindfulness."],
        ["Determination","KLEEM • MANG • YAV • VANG • SANG • HREEM • KLEEM","Determination to complete meaningful goals."],
        ["Understanding","AIM • SANG • VANG • YASI • VASI • YAV • AIM","Understanding before judgment."],
        ["Balance","SHREEM • HREEM • VAV • YAV • MANG • AIM • SHREEM","Balance between thought, emotion and action."],
        ["Transformation","OM • KLEEM • HREEM • MANG • YAV • VASI • OM","Positive personal transformation."],
        ["Compassion","YASI • VASI • NASI • YAV • MANG • SHREEM • YASI","Compassion toward yourself and others."],
        ["Gratitude & Hope","SHREEM • OM • YAV • AIM • HREEM • VASI • SHREEM","Gratitude today and hope for tomorrow."],
        ["Personal Intention","AIM • HREEM • KLEEM • YAV • VAV • SHREEM • OM","Hold one clear personal intention."],
        ["Universal Peace","OM • SHREEM • AIM • HREEM • KLEEM • YAV • SHREEM • OM","Peace, understanding and goodwill for all."]
    ].map((p, i) => ({
        title: p[0],
        sound: p[1],
        intention: p[2],
        music: musicFiles[i % musicFiles.length]
    }));

    let currentAudio = null;

    // ======================================
    // OPEN / CLOSE
    // ======================================

    if (openBtn && popup) {
        openBtn.addEventListener("click", function () {
            popup.style.display = "block";
        });
    }

    if (closeBtn && popup) {
        closeBtn.addEventListener("click", function () {
            stopMusic();
            popup.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            stopMusic();
            popup.style.display = "none";
        }
    });

    // ======================================
    // FORM
    // ======================================

    if (form) {
        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const nameEl = document.getElementById("guidanceName");
            const dobEl = document.getElementById("guidanceDob");
            const timeEl = document.getElementById("guidanceTime");
            const placeEl = document.getElementById("guidancePlace");

            const name = nameEl ? nameEl.value.trim() : "";
            const dob = dobEl ? dobEl.value : "";
            const birthTime = timeEl ? timeEl.value : "";
            const birthPlace = placeEl ? placeEl.value.trim() : "";

            if (!name) {
                alert("Please enter your name.");
                return;
            }

            if (!dob) {
                alert("Please select your date of birth.");
                return;
            }

            if (!birthTime) {
                alert("Please select your birth time.");
                return;
            }

            if (!birthPlace) {
                alert("Please enter your place of birth.");
                return;
            }

            // ======================================
            // DAILY GUIDANCE
            // ======================================

            const storageKey = "AYMP_DAILY_GUIDANCE";
            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;

            let saved = null;

            try {
                saved = JSON.parse(localStorage.getItem(storageKey));
            } catch (error) {
                saved = null;
            }

            let patternIndex;
            let total = 0;

            if (
                saved &&
                typeof saved.patternIndex === "number" &&
                typeof saved.timestamp === "number" &&
                now - saved.timestamp < twentyFourHours &&
                saved.patternIndex >= 0 &&
                saved.patternIndex < soundPatterns.length
            ) {
                patternIndex = saved.patternIndex;
            } else {

                for (let i = 0; i < name.length; i++) {
                    total += name.charCodeAt(i);
                }

                for (let i = 0; i < dob.length; i++) {
                    const n = parseInt(dob[i]);
                    if (!isNaN(n)) total += n;
                }

                for (let i = 0; i < birthTime.length; i++) {
                    const n = parseInt(birthTime[i]);
                    if (!isNaN(n)) total += n;
                }

                for (let i = 0; i < birthPlace.length; i++) {
                    total += birthPlace.charCodeAt(i);
                }

                patternIndex = total % soundPatterns.length;

                try {
                    localStorage.setItem(
                        storageKey,
                        JSON.stringify({
                            patternIndex: patternIndex,
                            timestamp: now
                        })
                    );
                } catch (error) {
                    console.warn("AYMP storage unavailable.", error);
                }
            }

            const pattern = soundPatterns[patternIndex];

            if (!pattern) {
                alert("Unable to create Personal Guidance.");
                return;
            }

            const content = popup.querySelector(".guidance-content");

            if (!content) {
                alert("Personal Guidance display area not found.");
                return;
            }

            stopMusic();

            // ======================================
            // RESULT
            // ======================================

            content.innerHTML = `
                <div class="aymp-guidance-result">

                    <div class="power-art-glow">
                        <div class="energy-orbit"></div>
                        <div class="power-core">✦</div>
                    </div>

                    <h2>✨ AYMP PERSONAL GUIDANCE</h2>

                    <h3>Welcome, ${escapeHtml(name)}</h3>

                    <div class="birth-summary">
                        <p>📅 <strong>Date:</strong> ${escapeHtml(dob)}</p>
                        <p>⏰ <strong>Time:</strong> ${escapeHtml(birthTime)}</p>
                        <p>📍 <strong>Place:</strong> ${escapeHtml(birthPlace)}</p>
                    </div>

                    <div class="guidance-card">
                        <h3>🌌 Your Cosmic Insight</h3>
                        <p>
                            Your personal guidance experience has been
                            prepared from the details you provided.
                        </p>
                    </div>

                    <div class="sound-card">

                        <div class="sound-label">
                            🔊 AYMP SACRED SOUND
                        </div>

                        <div id="changingSound" class="changing-sound">
                            ${escapeHtml(pattern.sound)}
                        </div>

                        <div class="sound-title">
                            ${escapeHtml(pattern.title)}
                        </div>

                        <div class="music-panel">

                            <div class="music-name" id="musicName">
                                🎵 ${escapeHtml(pattern.music)}
                            </div>

                            <button type="button" id="playMusicBtn">
                                ▶ PLAY SACRED MUSIC
                            </button>

                            <button type="button" id="pauseMusicBtn">
                                ⏸ PAUSE
                            </button>

                            <button type="button" id="stopMusicBtn">
                                ⏹ STOP
                            </button>

                            <p id="musicStatus">
                                Sacred music ready.
                            </p>

                        </div>

                    </div>

                    <div class="guidance-card">
                        <h3>🙏 Personal Intention</h3>
                        <p id="guidanceIntention">
                            ${escapeHtml(pattern.intention)}
                        </p>
                    </div>

                    <div class="practice-card">
                        <h3>🧘 Practice</h3>
                        <p>
                            Repeat the sound pattern
                            <strong>108 times</strong>
                            at a comfortable time,
                            if suitable for your personal practice.
                        </p>
                    </div>

                    <button type="button" id="anotherGuidanceBtn">
                        🔮 EXPERIENCE ANOTHER GUIDANCE
                    </button>

                    <button type="button" id="closeGuidanceResult">
                        ✕ CLOSE
                    </button>

                </div>
            `;

            popup.style.display = "block";

            setupMusic(pattern.music, true);
            startSoundAnimation();

            // ======================================
            // PLAY
            // ======================================

            document.getElementById("playMusicBtn")
                ?.addEventListener("click", function () {
                    playMusic();
                });

            // ======================================
            // PAUSE
            // ======================================

            document.getElementById("pauseMusicBtn")
                ?.addEventListener("click", function () {
                    pauseMusic();
                });

            // ======================================
            // STOP
            // ======================================

            document.getElementById("stopMusicBtn")
                ?.addEventListener("click", function () {
                    stopMusic();
                });

            // ======================================
            // ANOTHER GUIDANCE
            // ======================================

            document.getElementById("anotherGuidanceBtn")
                ?.addEventListener("click", function () {

                    const newIndex =
                        Math.floor(Math.random() * soundPatterns.length);

                    const newPattern =
                        soundPatterns[newIndex];

                    const soundElement =
                        document.getElementById("changingSound");

                    if (soundElement) {
                        soundElement.innerText = newPattern.sound;
                    }

                    const titleElement =
                        document.querySelector(".sound-title");

                    if (titleElement) {
                        titleElement.innerText = newPattern.title;
                    }

                    const intentionElement =
                        document.getElementById("guidanceIntention");

                    if (intentionElement) {
                        intentionElement.innerText = newPattern.intention;
                    }

                    const musicName =
                        document.getElementById("musicName");

                    if (musicName) {
                        musicName.innerText =
                            "🎵 " + newPattern.music;
                    }

                    setupMusic(newPattern.music, false);
                    startSoundAnimation();

                });

            // ======================================
            // CLOSE RESULT
            // ======================================

            document.getElementById("closeGuidanceResult")
                ?.addEventListener("click", function () {
                    stopMusic();
                    popup.style.display = "none";
                });
        });
    }

    // ======================================
    // MUSIC ENGINE
    // ======================================

    function setupMusic(fileName, autoplay) {

        stopMusic();

        const audioPath =
            "assets/" + encodeURIComponent(fileName);

        currentAudio = new Audio(audioPath);

        currentAudio.loop = true;
        currentAudio.preload = "auto";
        currentAudio.volume = 0.65;

        currentAudio.addEventListener("error", function () {

            const status =
                document.getElementById("musicStatus");

            if (status) {
                status.innerText =
                    "⚠️ Music file could not be loaded.";
            }

            console.error(
                "AYMP Music Error:",
                audioPath
            );

        });

        currentAudio.addEventListener("canplay", function () {

            const status =
                document.getElementById("musicStatus");

            if (status) {
                status.innerText =
                    "🎵 Sacred music ready.";
            }

        });

        if (autoplay) {

            currentAudio.play()
                .then(function () {

                    const status =
                        document.getElementById("musicStatus");

                    if (status) {
                        status.innerText =
                            "🎵 Sacred music playing...";
                    }

                })
                .catch(function () {

                    const status =
                        document.getElementById("musicStatus");

                    if (status) {
                        status.innerText =
                            "Tap PLAY SACRED MUSIC to start.";
                    }

                });

        }
    }

    function playMusic() {

        if (!currentAudio) {
            return;
        }

        currentAudio.play()
            .then(function () {

                const status =
                    document.getElementById("musicStatus");

                if (status) {
                    status.innerText =
                        "🎵 Sacred music playing...";
                }

            })
            .catch(function (error) {

                console.error(
                    "AYMP Play Error:",
                    error
                );

                const status =
                    document.getElementById("musicStatus");

                if (status) {
                    status.innerText =
                        "⚠️ Tap PLAY again to start the music.";
                }

            });
    }

    function pauseMusic() {

        if (!currentAudio) {
            return;
        }

        currentAudio.pause();

        const status =
            document.getElementById("musicStatus");

        if (status) {
            status.innerText =
                "⏸ Sacred music paused.";
        }
    }

    function stopMusic() {

        if (!currentAudio) {
            return;
        }

        currentAudio.pause();

        currentAudio.currentTime = 0;

        currentAudio = null;
    }

    // ======================================
    // SAFE TEXT
    // ======================================

    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // ======================================
    // SOUND ANIMATION
    // ======================================

    function startSoundAnimation() {

        const element =
            document.getElementById("changingSound");

        if (!element) return;

        element.classList.remove("sound-animate");

        void element.offsetWidth;

        element.classList.add("sound-animate");
    }

});
'''

path = "/mnt/data/guidance.js"
Path(path).write_text(code, encoding="utf-8")
print(f"Created {path}")
print(f"Lines: {len(code.splitlines())}")
