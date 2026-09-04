(() => {
  'use strict';
  if (document.getElementById('aymp-cosmic-opening')) return;

  const scenes = [
    { time: 0, title: 'A JOURNEY BEYOND STARS', sub: 'The cosmic realm awakens', icon: '✦', kind: 'galaxy' },
    { time: 2, title: 'THE ZODIAC AWAKENS', sub: 'Twelve cosmic powers align', icon: '♈︎ ♉︎ ♊︎ ♋︎ ♌︎ ♍︎ ♎︎ ♏︎ ♐︎ ♑︎ ♒︎ ♓︎', kind: 'zodiac' },
    { time: 4, title: 'THE COSMIC PALACE', sub: 'A kingdom appears beyond time', icon: '♛', kind: 'palace' },
    { time: 6, title: 'THE GATEWAY OPENS', sub: 'Your journey into AYMP begins', icon: '◉', kind: 'gateway' },
    { time: 8, title: 'AYMP COSMIC KINGDOM', sub: 'Discover • Play • Learn • Grow', icon: 'AYMP', kind: 'logo' },
    { time: 11, title: 'DUAL COSMIC POWER', sub: 'AYMP • 999xyz999 • Ecosystem Utility', icon: '◈', kind: 'tokens' },
    { time: 13, title: 'YOUR COSMIC JOURNEY', sub: 'Games • Astrology • Discovery • Wellness', icon: '✧', kind: 'guardians' },
    { time: 15, title: 'ENTER THE KINGDOM', sub: 'Your journey starts now', icon: '→', kind: 'final' }
  ];

  const style = document.createElement('style');
  style.id = 'aymp-cosmic-opening-style';
  style.textContent = `
    #aymp-cosmic-opening{position:relative;width:100%;min-height:clamp(430px,72vh,760px);display:flex;align-items:center;justify-content:center;overflow:hidden;background:#03040c;border-bottom:1px solid rgba(255,215,0,.28);isolation:isolate}
    #aymp-cosmic-opening .aco-space{position:absolute;inset:-20%;background:radial-gradient(circle at 50% 45%,rgba(91,55,190,.34),transparent 24%),radial-gradient(circle at 25% 30%,rgba(0,164,255,.22),transparent 22%),radial-gradient(circle at 75% 70%,rgba(255,166,0,.16),transparent 20%),#03040c;animation:acoDrift 15s ease-in-out infinite alternate}
    #aymp-cosmic-opening .aco-stars{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.9) 1px,transparent 1.5px);background-size:72px 72px;opacity:.35;animation:acoStars 20s linear infinite}
    #aymp-cosmic-opening .aco-nebula{position:absolute;width:70vw;height:70vw;max-width:850px;max-height:850px;border-radius:50%;border:1px solid rgba(255,215,0,.13);box-shadow:0 0 80px rgba(82,63,255,.22),inset 0 0 90px rgba(255,184,45,.08);animation:acoSpin 30s linear infinite}
    #aymp-cosmic-opening .aco-orbit{position:absolute;width:52vw;height:20vw;max-width:760px;max-height:290px;border:1px solid rgba(255,215,0,.16);border-radius:50%;transform:rotate(-17deg);animation:acoOrbit 9s linear infinite}
    #aymp-cosmic-opening .aco-scene{position:relative;z-index:3;width:min(1050px,92%);min-height:380px;padding:48px 24px 72px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0;transform:scale(1.05);pointer-events:none}
    #aymp-cosmic-opening .aco-scene.active{animation:acoSceneIn 2s ease forwards}
    #aymp-cosmic-opening .aco-scene.exit{animation:acoSceneOut 1s ease forwards}
    #aymp-cosmic-opening .aco-icon{font-family:'Cinzel',serif;font-size:clamp(42px,8vw,92px);line-height:1;color:#ffd76a;text-shadow:0 0 12px rgba(255,215,0,.65),0 0 48px rgba(255,160,0,.3);margin-bottom:22px;letter-spacing:.08em}
    #aymp-cosmic-opening .aco-title{font-family:'Cinzel',serif;font-size:clamp(28px,5.4vw,64px);line-height:1.1;color:#fff4c7;text-shadow:0 0 18px rgba(255,215,0,.28);margin:0 0 14px;letter-spacing:.045em}
    #aymp-cosmic-opening .aco-sub{font-family:'Poppins',sans-serif;font-size:clamp(14px,2vw,22px);color:#d8ddff;letter-spacing:.08em}
    #aymp-cosmic-opening .aco-progress{position:absolute;left:8%;right:8%;bottom:26px;height:3px;background:rgba(255,255,255,.12);border-radius:99px;overflow:hidden;z-index:5}
    #aymp-cosmic-opening .aco-progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,#9e7aff,#ffd76a);box-shadow:0 0 12px rgba(255,215,0,.55);animation:acoProgress 15s linear forwards}
    #aymp-cosmic-opening .aco-sound{position:absolute;right:18px;top:18px;z-index:6;border:1px solid rgba(255,215,0,.45);background:rgba(3,4,12,.6);backdrop-filter:blur(8px);color:#ffd76a;border-radius:50%;width:42px;height:42px;cursor:pointer;font-size:18px}
    #aymp-cosmic-opening .aco-enter{display:inline-block;margin-top:28px;padding:13px 28px;border-radius:999px;border:1px solid rgba(255,215,0,.75);background:linear-gradient(45deg,#c9a227,#ffdf6b);color:#111;text-decoration:none;font-weight:700;box-shadow:0 0 25px rgba(255,215,0,.28);font-family:'Poppins',sans-serif}
    #aymp-cosmic-opening .aco-token-row{display:flex;gap:22px;align-items:center;justify-content:center;margin-top:24px;flex-wrap:wrap}
    #aymp-cosmic-opening .aco-token{min-width:150px;padding:18px 22px;border:1px solid rgba(255,215,0,.45);border-radius:22px;background:rgba(255,255,255,.05);box-shadow:inset 0 0 30px rgba(255,215,0,.06)}
    #aymp-cosmic-opening .aco-token strong{display:block;color:#ffd76a;font-family:'Cinzel',serif;font-size:24px}
    #aymp-cosmic-opening .aco-token small{color:#c9d1f5}
    @keyframes acoSceneIn{from{opacity:0;transform:scale(1.05) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes acoSceneOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.97) translateY(-8px)}}
    @keyframes acoDrift{from{transform:scale(1) translate3d(-1%,-1%,0)}to{transform:scale(1.12) translate3d(1%,1%,0)}}
    @keyframes acoStars{from{transform:translateY(0)}to{transform:translateY(-72px)}}
    @keyframes acoSpin{to{transform:rotate(360deg)}}
    @keyframes acoOrbit{to{transform:rotate(343deg) translateX(20px)}}
    @keyframes acoProgress{to{width:100%}}
    @media(max-width:650px){#aymp-cosmic-opening{min-height:430px}.aco-scene{min-height:350px!important;padding-left:14px!important;padding-right:14px!important}.aco-token{min-width:125px;padding:14px}.aco-sound{right:12px!important;top:12px!important}}
    @media(prefers-reduced-motion:reduce){#aymp-cosmic-opening .aco-space,#aymp-cosmic-opening .aco-stars,#aymp-cosmic-opening .aco-nebula,#aymp-cosmic-opening .aco-orbit{animation:none}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('section');
  root.id = 'aymp-cosmic-opening';
  root.setAttribute('aria-label', 'AYMP Cosmic Kingdom cinematic opening');
  root.innerHTML = `
    <div class="aco-space"></div><div class="aco-stars"></div><div class="aco-nebula"></div><div class="aco-orbit"></div>
    <button class="aco-sound" type="button" aria-label="Toggle cinematic sound" title="Sound">🔇</button>
    <div class="aco-scene" aria-live="polite"></div>
    <div class="aco-progress" aria-hidden="true"><span></span></div>
  `;

  const sceneEl = root.querySelector('.aco-scene');
  const soundBtn = root.querySelector('.aco-sound');
  let audioCtx = null;
  let soundOn = false;
  let timers = [];

  const showScene = (index) => {
    const s = scenes[index];
    sceneEl.className = 'aco-scene';
    void sceneEl.offsetWidth;
    let extra = '';
    if (s.kind === 'tokens') extra = `<div class="aco-token-row"><div class="aco-token"><strong>AYMP</strong><small>Cosmic ecosystem</small></div><div class="aco-token"><strong>999xyz999</strong><small>Game utility</small></div></div>`;
    if (s.kind === 'final') extra = `<a class="aco-enter" href="game-zone.html">ENTER AYMP COSMIC KINGDOM</a>`;
    sceneEl.innerHTML = `<div class="aco-icon">${s.icon}</div><h2 class="aco-title">${s.title}</h2><p class="aco-sub">${s.sub}</p>${extra}`;
    sceneEl.classList.add('active');
    if (soundOn) ping(index);
  };

  const ping = (index) => {
    try {
      audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.frequency.value = 220 + index * 55; gain.gain.value = 0.035;
      osc.connect(gain); gain.connect(audioCtx.destination); osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35); osc.stop(audioCtx.currentTime + 0.36);
    } catch (_) {}
  };

  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.textContent = soundOn ? '🔊' : '🔇';
    if (soundOn) { try { audioCtx ||= new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume(); } catch (_) {} ping(0); }
  });

  const run = () => {
    timers.forEach(clearTimeout); timers = [];
    scenes.forEach((_, i) => {
      timers.push(setTimeout(() => showScene(i), scenes[i].time * 1000));
    });
  };

  const first = document.querySelector('header');
  if (first && first.parentNode) first.parentNode.insertBefore(root, first);
  else document.body.insertBefore(root, document.body.firstChild);
  showScene(0);
  run();
})();
