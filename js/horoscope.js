// Load Horoscope JSON
fetch("all_zodiac_v1.json")
.then(response => response.json())
.then(data => {

    // Today's Day Number
    const today = new Date();
    const start = new Date(today.getFullYear(),0,0);
    const diff = today - start;
    const oneDay = 1000*60*60*24;
    const dayNumber = Math.floor(diff/oneDay);

    const dayKey = "Day1";

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

    let html="";

    zodiacs.forEach(zodiac=>{

        const item=data[zodiac][dayKey];

        html += `
        <div class="card">
            <h2>${zodiac}</h2>

            <p><b>Prediction:</b> ${item.Prediction}</p>
            <p><b>Lucky Number:</b> ${item.LuckyNumber}</p>
            <p><b>Lucky Color:</b> ${item.LuckyColor}</p>
            <p><b>Lucky Direction:</b> ${item.LuckyDirection}</p>
            <p><b>Lucky Time:</b> ${item.LuckyTime}</p>
            <p><b>Mantra:</b> ${item.Mantra}</p>
            <p><b>God:</b> ${item.God}</p>

        </div><hr>`;
    });

    document.getElementById("horoscope").innerHTML=html;

});
