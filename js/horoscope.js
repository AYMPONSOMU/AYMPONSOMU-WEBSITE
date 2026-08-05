fetch("data/all_zodiac_v1.json")
  .then(response => response.json())
  .then(data => {

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const dayNumber = ((dayOfYear - 1) % 50) + 1;
    const dayKey = "Day" + dayNumber;

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

    let html = `<h2 style="text-align:center;color:gold;">FREE DAILY HOROSCOPE (${dayKey})</h2>`;

    for (const sign of zodiacs) {

      if (!data[sign] || !data[sign][dayKey]) {
        html += `<h3>${sign}</h3><p style="color:red;">Data not found</p>`;
        continue;
      }

      const h = data[sign][dayKey];

      html += `
      <div style="background:#13264a;border:1px solid gold;border-radius:10px;padding:15px;margin:20px 0;">
        <h2 style="color:gold;">${sign}</h2>

        <p><b>Prediction:</b> ${h.Prediction || ""}</p>
        <p><b>Lucky Number:</b> ${h.LuckyNumber || ""}</p>
        <p><b>Lucky Color:</b> ${h.LuckyColor || ""}</p>
        <p><b>Lucky Direction:</b> ${h.LuckyDirection || ""}</p>
        <p><b>Lucky Time:</b> ${h.LuckyTime || ""}</p>
        <p><b>Mantra:</b> ${h.Mantra || ""}</p>
        <p><b>God:</b> ${h.God || ""}</p>
      </div>
      `;
    }

    document.getElementById("horoscope").innerHTML = html;
  })
  .catch(err => {
    document.getElementById("horoscope").innerHTML =
      "<h2 style='color:red'>" + err + "</h2>";
  });
