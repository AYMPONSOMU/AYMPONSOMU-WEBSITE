fetch("data/all_zodiac_v1.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to load all_zodiac_v1.json");
    }
    return response.json();
  })
  .then(data => {

    // தற்காலிகமாக Day1-ஐ பயன்படுத்துகிறோம்.
    // பிறகு இதை தேதி அடிப்படையில் Auto மாற்றுவோம்.
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

    let html = "";

    zodiacs.forEach(zodiac => {

      // ராசி இருக்கிறதா?
      if (!data[zodiac]) {
        html += `
          <div style="border:1px solid red;padding:15px;margin:15px;">
            <h2>${zodiac}</h2>
            <p>❌ Zodiac not found in JSON.</p>
          </div>
        `;
        return;
      }

      // Day1 இருக்கிறதா?
      if (!data[zodiac][dayKey]) {
        html += `
          <div style="border:1px solid orange;padding:15px;margin:15px;">
            <h2>${zodiac}</h2>
            <p>❌ ${dayKey} not found.</p>
          </div>
        `;
        return;
      }

      const item = data[zodiac][dayKey];

      html += `
        <div style="
          background:#102040;
          border:1px solid gold;
          border-radius:10px;
          padding:15px;
          margin-bottom:20px;
        ">

          <h2 style="color:gold;">${zodiac}</h2>

          <p><strong>Prediction:</strong> ${item.Prediction}</p>
          <p><strong>Lucky Number:</strong> ${item.LuckyNumber}</p>
          <p><strong>Lucky Color:</strong> ${item.LuckyColor}</p>
          <p><strong>Lucky Direction:</strong> ${item.LuckyDirection}</p>
          <p><strong>Lucky Time:</strong> ${item.LuckyTime}</p>
          <p><strong>Mantra:</strong> ${item.Mantra}</p>
          <p><strong>God:</strong> ${item.God}</p>

        </div>
      `;
    });

    document.getElementById("horoscope").innerHTML = html;

  })
  .catch(error => {

    document.getElementById("horoscope").innerHTML = `
      <div style="color:red;">
        <h2>Error Loading Horoscope</h2>
        <p>${error.message}</p>
      </div>
    `;

    console.error(error);

  });
