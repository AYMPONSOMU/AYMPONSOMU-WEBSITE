fetch("data/all_zodiac_v1.json")
.then(response => response.json())
.then(data => {

    const dayKey = "Day1";   // பிறகு இதை Auto ஆக்குவோம்

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

    let html = "";

    zodiacs.forEach(zodiac => {

        if(data[zodiac] && data[zodiac][dayKey]){

            const item = data[zodiac][dayKey];

            html += `
            <div style="border:1px solid gold;padding:15px;margin:15px;border-radius:10px;">
                <h2>${zodiac}</h2>

                <p><b>Prediction:</b> ${item.Prediction}</p>

                <p><b>Lucky Number:</b> ${item.LuckyNumber}</p>

                <p><b>Lucky Color:</b> ${item.LuckyColor}</p>

                <p><b>Lucky Direction:</b> ${item.LuckyDirection}</p>

                <p><b>Lucky Time:</b> ${item.LuckyTime}</p>

                <p><b>Mantra:</b> ${item.Mantra}</p>

                <p><b>God:</b> ${item.God}</p>

            </div>
            `;
        }

    });

    document.getElementById("horoscope").innerHTML = html;

})
.catch(error=>{
    document.getElementById("horoscope").innerHTML = error;
});
