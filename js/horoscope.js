fetch("data/all_zodiac_v1.json")
  .then(response => response.json())
  .then(data => {

    const dayKey = "Day1";   // சோதனைக்காக

    const zodiacs = [
      "Aries","Taurus","Gemini","Cancer",
      "Leo","Virgo","Libra","Scorpio",
      "Sagittarius","Capricorn","Aquarius","Pisces"
    ];

    let html = "";

    zodiacs.forEach(zodiac => {

      if (data[zodiac] && data[zodiac][dayKey]) {

        const item = data[zodiac][dayKey];

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
          </div>
          <hr>`;
      } else {
        html += `<h2>${zodiac}</h2><p>No data found.</p><hr>`;
      }

    });

    document.getElementById("horoscope").innerHTML = html;

  })
  .catch(error => {
    document.getElementById("horoscope").innerHTML =
      "<h2>JSON Loading Error</h2><p>" + error + "</p>";
  });
