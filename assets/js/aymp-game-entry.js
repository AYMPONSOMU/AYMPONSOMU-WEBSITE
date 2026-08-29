/* AYMP Game Zone Entry — additive only. Existing homepage sections remain untouched. v2 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('aymp-game-zone-entry')) return;
  var section = document.createElement('section');
  section.id = 'aymp-game-zone-entry';
  section.style.cssText = 'padding:55px 20px;background:linear-gradient(135deg,rgba(9,12,42,.98),rgba(35,12,60,.98));border-top:1px solid rgba(255,215,0,.22);border-bottom:1px solid rgba(255,215,0,.22)';
  section.innerHTML = '<div style="max-width:1200px;margin:auto;text-align:center">' +
    '<div style="font-size:13px;letter-spacing:3px;color:#cfc6a0;font-weight:800">🎮 AYMP GAME WORLD</div>' +
    '<h2 style="font-family:Georgia,serif;color:#ffd700;font-size:40px;margin:8px 0 12px">Play • Learn • Discover</h2>' +
    '<p style="color:#ddd;max-width:760px;margin:0 auto 25px;line-height:1.7">Enter the AYMP Game Zone and play the growing collection of games, challenges and interactive experiences.</p>' +
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
      '<a href="game-zone.html" style="display:inline-block;padding:14px 24px;border-radius:30px;background:linear-gradient(45deg,#c9a227,#ffdf6b);color:#111;text-decoration:none;font-weight:900">🎮 OPEN GAME ZONE</a>' +
      '<a href="games/aymp-runner.html" style="display:inline-block;padding:14px 24px;border-radius:30px;background:rgba(255,255,255,.08);border:1px solid rgba(255,215,0,.45);color:#fff;text-decoration:none;font-weight:900">🌌 PLAY COSMIC RUNNER</a>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:28px auto 0;max-width:900px;text-align:left">' +
      '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🧠 Daily Quiz</div>' +
      '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🌌 Cosmic Runner</div>' +
      '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🧩 Puzzle Games</div>' +
      '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🌍 Global Games</div>' +
    '</div>' +
  '</div>';
  var footer = document.querySelector('footer');
  if (footer && footer.parentNode) footer.parentNode.insertBefore(section, footer);
  else document.body.appendChild(section);
});
