fetch("data/all_zodiac_v1.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("JSON file not found");
    }
    return response.json();
  })
  .then(data => {

    const dayKey = "Day1"; // சோதனைக்காக

    const item = data["Aries"][dayKey];

    document.getElementById("horoscope").innerHTML = `
      <h2>♈ Aries</h2>

      <p><b>Prediction:</b> ${item.Prediction}</p>
      <p><b>Lucky Number:</b> ${item.LuckyNumber}</p>
      <p><b>Lucky Color:</b> ${item.LuckyColor}</p>
      <p><b>Lucky Direction:</b> ${item.LuckyDirection}</p>
      <p><b>Lucky Time:</b> ${item.LuckyTime}</p>
      <p><b>Mantra:</b> ${item.Mantra}</p>
      <p><b>God:</b> ${item.God}</p>
    `;
  })
  .catch(error => {
    document.getElementById("horoscope").innerHTML =
      "<h2>Error</h2><p>" + error.message + "</p>";
  });
