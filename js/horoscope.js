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
        const socialId = `daily-${sign}-${dayKey}`;

        html += `
            <div class="card" data-aymp-zodiac="${socialId}">
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

            <div class="aymp-zodiac-social" data-social-id="${socialId}">
                <button type="button" data-action="like">👍 Like <b>0</b></button>
                <button type="button" data-action="comment">💬 Comment</button>
                <button type="button" data-action="repost">🔁 Repost</button>
                <button type="button" data-action="share">📤 Share</button>
                <button type="button" data-action="copy">🔗 Copy Link</button>
            </div>
            </div>`;
    }

    document.getElementById("horoscope").innerHTML = html;

    const style = document.createElement('style');
    style.textContent = `
        .aymp-zodiac-social{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:20px auto 4px;padding:10px;border-top:1px solid rgba(255,215,0,.18)}
        .aymp-zodiac-social button{cursor:pointer;border:1px solid rgba(255,215,0,.55);border-radius:22px;padding:9px 12px;background:rgba(7,20,48,.96);color:#fff;font-weight:600;font-family:inherit}
        .aymp-zodiac-social button:hover{transform:translateY(-1px);box-shadow:0 0 10px rgba(255,215,0,.35)}
        @media(max-width:600px){.aymp-zodiac-social{gap:6px}.aymp-zodiac-social button{font-size:12px;padding:8px 9px}}
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.aymp-zodiac-social').forEach(function(bar){
        const key = bar.getAttribute('data-social-id');
        const likeButton = bar.querySelector('[data-action="like"]');
        let likes = Number(localStorage.getItem('aymp-zodiac-like-' + key) || 0);
        likeButton.querySelector('b').textContent = likes;

        bar.addEventListener('click', function(event){
            const button = event.target.closest('button');
            if(!button) return;
            const action = button.getAttribute('data-action');
            const url = location.href;

            if(action === 'like'){
                likes++;
                localStorage.setItem('aymp-zodiac-like-' + key, likes);
                likeButton.querySelector('b').textContent = likes;
                return;
            }

            if(action === 'comment'){
                const comment = prompt('Write your comment about this zodiac prediction:');
                if(comment){
                    localStorage.setItem('aymp-zodiac-comment-' + key, comment);
                    alert('Thank you for your comment!');
                }
                return;
            }

            if(action === 'share' || action === 'repost'){
                if(navigator.share){
                    navigator.share({title:document.title,text:'Discover this AYMP Daily Horoscope',url:url}).catch(function(){});
                }else if(navigator.clipboard){
                    navigator.clipboard.writeText(url).then(function(){alert('AYMP link copied. You can share or repost it.');});
                }
                return;
            }

            if(action === 'copy'){
                if(navigator.clipboard){
                    navigator.clipboard.writeText(url).then(function(){alert('AYMP link copied!');});
                }else{
                    const area=document.createElement('textarea');
                    area.value=url; document.body.appendChild(area); area.select();
                    document.execCommand('copy'); area.remove(); alert('AYMP link copied!');
                }
            }
        });
    });
})
.catch(error => {

    document.getElementById("horoscope").innerHTML =
    `<h2 style="color:red;">${error.message}</h2>`;

    console.error(error);

});
