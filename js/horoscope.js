fetch("data/all_zodiac_v1.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to load data/all_zodiac_v1.json");
    }
    return response.json();
  })
  .then(data => {

    // இன்று ஆண்டின் எத்தனையாவது நாள்
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Day1 முதல் Day50 வரை சுழற்சி
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

    let html = `<h3 style="text-align:center;color:gold;">Today's Horoscope (${dayKey})</h3>`;

    zodiacs.forEach(sign => {

      if (!data[sign] || !data[sign][dayKey]) {
        html += `
          <div style="border:1px solid red;padding:10px;margin:10px 0;">
            <h2>${sign}</h2>
            <p>Data not available.</p>
          </div>`;
        return;
      }

      const h = data[sign][dayKey];

      html += `
      <div style="background:#13264a;border:1px solid gold;border-radius:10px;padding:15px;margin-bottom:20px;">
        <h2 style="color:gold;">${sign}</h2>

        <p><strong>Prediction:</strong> ${h.Prediction}</p>
        <p><strong>Lucky Number:</strong> ${h.LuckyNumber}</p>
        <p><strong>Lucky Color:</strong> ${h.LuckyColor}</p>
        <p><strong>Lucky Direction:</strong> ${h.LuckyDirection}</p>
        <p><strong>Lucky Time:</strong> ${h.LuckyTime}</p>
        <p><strong>Mantra:</strong> ${h.Mantra}</p>
        <p><strong>God:</strong> ${h.God}</p>
      </div>`;
    });

    document.getElementById("horoscope").innerHTML = html;

  })
  .catch(error => {
    document.getElementById("horoscope").innerHTML = `
      <h2 style="color:red;">Error</h2>
      <p>${error.message}</p>`;
    console.error(error);
  });
