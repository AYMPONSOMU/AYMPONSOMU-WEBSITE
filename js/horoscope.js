fetch("data/all_zodiac_v1.json")
.then(response => {
    if (!response.ok) {
        throw new Error("Unable to load Horoscope Database");
    }
    return response.json();
})
.then(data => {

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    const zodiacOffset = {
        Aries: 0,
        Taurus: 4,
        Gemini: 8,
        Cancer: 12,
        Leo: 16,
        Virgo: 20,
        Libra: 24,
        Scorpio: 28,
        Sagittarius: 32,
        Capricorn: 36,
        Aquarius: 40,
        Pisces: 44
    };

    const zodiacs = [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces"
    ];

    let html = `<h2 style="text-align:center;color:gold;">FREE DAILY HOROSCOPE</h2>`;

    for (const sign of zodiacs) {

        // ஒவ்வொரு ராசிக்கும் தனி Day
        const dayNumber = ((dayOfYear + zodiacOffset[sign] - 1) % 50) + 1;
        const dayKey = "Day" + dayNumber;

        if (!data[sign] || !data[sign][dayKey]) {
            html += `
            <div style="border:1px solid red;padding:15px;margin:15px;">
                <h2>${sign}</h2>
                <p>Data not found (${dayKey})</p>
            </div>`;
            continue;
        }

        const h = data[sign][dayKey];

        html += `
            <div class="card">
        ">
            <h2 style="color:gold;">${sign}</h2>

            <p><b>Day :</b> ${dayKey}</p>

            <p><b>Prediction :</b> ${h.Prediction}</p>

            <p><b>Lucky Number :</b> ${h.LuckyNumber}</p>

            <p><b>Lucky Color :</b> ${h.LuckyColor}</p>

            <p><b>Lucky Direction :</b> ${h.LuckyDirection}</p>

            <p><b>Lucky Time :</b> ${h.LuckyTime}</p>

            <p><b>Mantra :</b> ${h.Mantra}</p>

            <p><b>God :</b> ${h.God}</p>
    <p><b>Today's AYMP Research Yantra</b></p>

<img src="images/${h.Action}"
     alt="AYMP Research Yantra"
     style="width:220px;border:2px solid gold;border-radius:10px;display:block;margin:auto;">

<br>

<img src="images/${h.Pariharam}"
     alt="AYMP Energy Symbol"
     style="width:220px;border:2px solid gold;border-radius:10px;display:block;margin:auto;">
        </div>`;
    }

    document.getElementById("horoscope").innerHTML = html;

})
.catch(error => {

    document.getElementById("horoscope").innerHTML =
    `<h2 style="color:red;">${error.message}</h2>`;

    console.error(error);

});
