/* AYMP Discovery World — additive homepage module. No dependency on live APIs. */
(function(){
  'use strict';
  function init(){
    if(document.getElementById('aymp-discovery-world')) return;
    var items=[
      ['🚀','Space & Science','Explore remarkable discoveries about planets, stars, missions, physics and the universe.'],
      ['🌿','Nature & Wildlife','Discover extraordinary animals, ecosystems, biodiversity and natural survival strategies.'],
      ['🏺','History & Culture','Travel through ancient civilizations, archaeology, heritage, languages and human stories.'],
      ['🤖','AI & Technology','Follow interesting developments in artificial intelligence, robotics, computing and future technology.'],
      ['🌍','World Amazing','Find unusual places, remarkable achievements, surprising events and fascinating global stories.'],
      ['💡','Amazing Facts','Learn short, surprising facts and discoveries that make the world more interesting.']
    ];
    var day=Math.floor(Date.now()/86400000);
    var start=day%items.length;
    var selected=[];
    for(var i=0;i<3;i++) selected.push(items[(start+i)%items.length]);
    function card(x){return '<article class="aymp-dw-card"><div class="aymp-dw-icon">'+x[0]+'</div><div class="aymp-dw-label">DISCOVERY WORLD</div><h3>'+x[1]+'</h3><p>'+x[2]+'</p></article>';}
    var section=document.createElement('section');
    section.id='aymp-discovery-world';
    section.innerHTML='<div class="aymp-dw-wrap"><div class="aymp-dw-kicker">🌍 AYMP GLOBAL DISCOVERY</div><h2>Discovery World</h2><p class="aymp-dw-intro">Every visit can reveal something new — science, nature, history, technology, world wonders and amazing facts.</p><div class="aymp-dw-grid">'+selected.map(card).join('')+'</div><div class="aymp-dw-actions"><a href="global-trending.html">🌎 Explore Global Trending</a><a href="food-discovery.html">🍜 Discover World Food</a><a href="ask-aymp.html">🧠 Ask AYMP</a></div><div class="aymp-dw-note">Fresh discovery categories rotate automatically. Live stories may be added from the Global Trending page.</div></div>';
    var style=document.createElement('style');
    style.id='aymp-discovery-world-style';
    style.textContent='#aymp-discovery-world{padding:68px 20px;background:linear-gradient(135deg,#071326,#17102c 55%,#08251f);border-top:1px solid rgba(255,215,0,.22);border-bottom:1px solid rgba(255,215,0,.18);color:#fff}.aymp-dw-wrap{max-width:1200px;margin:auto}.aymp-dw-kicker{text-align:center;font-size:12px;letter-spacing:3px;color:#d8c58a;font-weight:800}.aymp-discovery-world h2{text-align:center;font:800 40px Georgia,serif;color:#ffd86b;margin:8px 0 12px}.aymp-dw-intro{max-width:800px;margin:0 auto 30px;text-align:center;color:#d6dbe5;line-height:1.75}.aymp-dw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.aymp-dw-card{min-height:205px;padding:23px;border-radius:22px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.16);box-shadow:0 12px 35px rgba(0,0,0,.2)}.aymp-dw-card:hover{transform:translateY(-4px);border-color:rgba(255,215,0,.5)}.aymp-dw-icon{font-size:38px}.aymp-dw-label{margin-top:8px;color:#8ee7ff;font-size:11px;font-weight:800;letter-spacing:1.5px}.aymp-dw-card h3{margin:8px 0;color:#fff;font-size:22px}.aymp-dw-card p{margin:0;color:#bfc7d4;line-height:1.6}.aymp-dw-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:26px}.aymp-dw-actions a{padding:11px 16px;border-radius:22px;background:#ffd86b;color:#111;text-decoration:none;font-weight:800}.aymp-dw-actions a:nth-child(2){background:#8ee7ff}.aymp-dw-actions a:nth-child(3){background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,215,0,.35)}.aymp-dw-note{text-align:center;color:#8e99aa;font-size:12px;margin-top:18px}@media(max-width:750px){.aymp-dw-grid{grid-template-columns:1fr}.aymp-discovery-world h2{font-size:31px}.aymp-dw-card{min-height:auto}}';
    document.head.appendChild(style);
    var hero=document.querySelector('header');
    if(hero&&hero.parentNode) hero.parentNode.insertBefore(section,hero.nextSibling);
    else document.body.appendChild(section);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
