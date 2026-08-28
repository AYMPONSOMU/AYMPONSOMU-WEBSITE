/* AYMP Growth Layer — additive only. Existing site sections remain untouched. */
document.addEventListener('DOMContentLoaded', function () {
  var site = 'https://aymp999.github.io/.in/';
  var path = location.pathname.split('/').pop() || 'index.html';
  var pages = {
    'index.html': ['AYMPONSOMU | Astrology, Siddha Wellness, Yantra & Personal Guidance', 'Explore AYMPONSOMU astrology consultation, daily and weekly horoscope guidance, Siddha-inspired wellness, yantra collections and personal cosmic guidance.'],
    'daily-horoscope.html': ['Free Daily Horoscope | AYMPONSOMU', 'Get free daily horoscope guidance and explore AYMPONSOMU astrology and traditional wellness resources.'],
    'weekly-horoscope.html': ['Free Weekly Horoscope | AYMPONSOMU', 'Explore free weekly horoscope guidance from AYMPONSOMU.'],
    'siddha-wellness.html': ['Siddha Wellness Solutions for Men & Women | AYMP', 'Traditional Siddha-inspired wellness information for men, women and family well-being, with herbal wellness and consultation information.'],
    'siddha-male-vitality.html': ['Siddha Male Vitality & Strength | AYMP', 'Explore AYMP Siddha-inspired male vitality and strength information, traditional herbal wellness and consultation.'],
    'cosmic-solution-wheel.html': ['AYMP Cosmic Solution Wheel | Astrology Guidance', 'Explore the AYMP Cosmic Solution Wheel and personalized traditional guidance resources.']
  };
  var current = pages[path] || pages['index.html'];
  document.title = current[0];

  function setMeta(name, content, property) {
    var selector = property ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(selector);
    if (!el) { el = document.createElement('meta'); el.setAttribute(property ? 'property' : 'name', name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  }
  setMeta('description', current[1]);
  setMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  setMeta('theme-color', '#050816');
  setMeta('og:title', current[0], true); setMeta('og:description', current[1], true); setMeta('og:type', 'website', true); setMeta('og:url', location.href, true); setMeta('og:site_name', 'AYMPONSOMU', true);
  setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', current[0]); setMeta('twitter:description', current[1]);
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = site + path;

  if (!document.getElementById('aymp-growth-schema')) {
    var schema = document.createElement('script'); schema.id = 'aymp-growth-schema'; schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'WebSite','name':'AYMPONSOMU','url':site,'description':current[1]});
    document.head.appendChild(schema);
  }

  function addDiscoveryBar() {
    if (document.getElementById('aymp-discovery-bar')) return;
    var bar = document.createElement('section'); bar.id = 'aymp-discovery-bar';
    bar.style.cssText = 'padding:24px 20px;background:rgba(255,215,0,.045);border-top:1px solid rgba(255,215,0,.14);border-bottom:1px solid rgba(255,215,0,.14);';
    bar.innerHTML = '<div style="max-width:1200px;margin:auto;text-align:center"><div style="color:#ffd700;font-weight:700;font-size:18px;margin-bottom:12px">✨ Explore AYMP Free Resources</div><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a href="daily-horoscope.html" data-aymp-track="daily_horoscope" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Daily Horoscope</a><a href="weekly-horoscope.html" data-aymp-track="weekly_horoscope" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Weekly Horoscope</a><a href="siddha-wellness.html" data-aymp-track="siddha_wellness" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Siddha Wellness</a><button id="aymp-share" type="button" style="padding:11px 16px;border-radius:24px;border:0;background:#25d366;color:#fff;font-weight:700;cursor:pointer">Share AYMP</button></div></div>';
    var footer = document.querySelector('footer'); if (footer && footer.parentNode) footer.parentNode.insertBefore(bar, footer); else document.body.appendChild(bar);
    document.getElementById('aymp-share').onclick = function () { var data={title:document.title,text:'Explore AYMPONSOMU Astrology, Siddha Wellness and Cosmic Guidance',url:location.href}; if(navigator.share) navigator.share(data).catch(function(){}); else if(navigator.clipboard) navigator.clipboard.writeText(location.href).then(function(){alert('AYMP link copied. Share it with your friends and family.');}); else alert(location.href); };
  }

  function addWonderAndTrends() {
    if (document.getElementById('aymp-wow')) return;
    var section = document.createElement('section'); section.id='aymp-wow'; section.style.cssText='padding:55px 20px;background:linear-gradient(135deg,rgba(22,10,55,.96),rgba(5,24,22,.96));border-top:1px solid rgba(255,215,0,.2);border-bottom:1px solid rgba(255,215,0,.2);';
    section.innerHTML='<div style="max-width:1200px;margin:auto"><div style="text-align:center"><div style="font-size:14px;letter-spacing:3px;color:#cfc6a0">AYMP DAILY WONDER</div><h2 style="font-family:Georgia,serif;font-size:42px;color:#ffd700;margin:8px 0">✨ TODAY\'S WOW ✨</h2><p id="aymp-wow-date" style="color:#ddd;margin:0 0 25px"></p></div><div id="aymp-wow-card" style="max-width:850px;margin:auto;padding:28px;border-radius:24px;background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.28);box-shadow:0 0 30px rgba(255,215,0,.12)"></div><div style="margin-top:38px"><h3 style="text-align:center;color:#ffd700;font-size:27px">🔥 GLOBAL TRENDING NOW</h3><p style="text-align:center;color:#bbb;font-size:14px">Fresh topics from global news coverage. Headlines may change throughout the day.</p><div id="aymp-trends" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px"></div></div></div>';
    var footer=document.querySelector('footer'); if(footer&&footer.parentNode) footer.parentNode.insertBefore(section,footer); else document.body.appendChild(section);

    var wonders=[
      ['🌌','The Universe Is Still Full of Mysteries','From distant galaxies to strange cosmic objects, modern astronomy continues to reveal how much we have yet to discover.'],
      ['🌊','Our Planet Is Full of Hidden Worlds','Deep oceans, extreme landscapes and microscopic ecosystems show how much life exists beyond what we see every day.'],
      ['🧠','The Human Brain Can Keep Surprising Science','Memory, perception and learning remain active areas of research, reminding us that the mind is one of nature’s great puzzles.'],
      ['🦋','Nature Has Extraordinary Survival Strategies','Across the world, plants and animals have evolved remarkable ways to adapt to heat, cold, darkness, drought and changing habitats.'],
      ['🏺','Ancient Knowledge Still Inspires Modern Questions','Archaeology continues to uncover evidence that can change how we understand earlier civilizations and their technologies.'],
      ['🤖','Technology Is Changing How We Create','Artificial intelligence, robotics and new computing tools are rapidly changing creative and scientific workflows.'],
      ['🌿','Traditional Plant Knowledge Is Still Being Studied','Researchers continue to investigate plants and traditional uses, while modern safety and evidence remain important when considering health applications.']
    ];
    var day=Math.floor(Date.now()/86400000); var wonder=wonders[((day%wonders.length)+wonders.length)%wonders.length];
    document.getElementById('aymp-wow-date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    document.getElementById('aymp-wow-card').innerHTML='<div style="font-size:46px;text-align:center">'+wonder[0]+'</div><h3 style="color:#fff;text-align:center;font-size:27px;margin:10px 0">'+wonder[1]+'</h3><p style="color:#ddd;text-align:center;max-width:700px;margin:auto">'+wonder[2]+'</p><div style="text-align:center;margin-top:20px"><a href="guides.html" style="display:inline-block;padding:12px 22px;border-radius:25px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Discover More at AYMP →</a></div>';

    var trends=document.getElementById('aymp-trends');
    fetch('https://api.gdeltproject.org/api/v2/doc/doc?query=global&mode=artlist&format=json&maxrecords=8&sort=datedesc',{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('trend fetch failed');return r.json();})
      .then(function(data){var arts=(data.articles||[]).filter(function(a){return a.title&&a.url;}).slice(0,6); if(!arts.length)throw new Error('no trends'); arts.forEach(function(a,i){var c=document.createElement('a');c.href=a.url;c.target='_blank';c.rel='noopener noreferrer';c.style.cssText='display:block;padding:18px;border-radius:18px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.16);color:#fff;text-decoration:none';c.innerHTML='<div style="color:#ffd700;font-weight:700;margin-bottom:7px">#'+(i+1)+' · TRENDING</div><div style="font-weight:600;line-height:1.45">'+a.title.replace(/[<>]/g,'')+'</div><div style="margin-top:8px;color:#aaa;font-size:12px">Global news • '+(a.domain||'source')+'</div>';trends.appendChild(c);});})
      .catch(function(){trends.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:#bbb">Global trends are updating. Please refresh later for the latest topics.</div>';});
  }

  addDiscoveryBar();
  addWonderAndTrends();
  document.querySelectorAll('[data-aymp-track]').forEach(function(a){a.addEventListener('click',function(){if(typeof gtag==='function')gtag('event','page_discovery_click',{event_category:'growth',event_label:a.getAttribute('data-aymp-track')});});});
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){a.addEventListener('click',function(){if(typeof gtag==='function')gtag('event','whatsapp_click',{event_category:'conversion',event_label:location.pathname});});});
  if(typeof gtag==='function')gtag('event','page_growth_layer_loaded',{page_path:location.pathname});

  /* Load social interaction layer without altering existing page sections. */
  if (!document.querySelector('script[data-aymp-social-layer]')) {
    var social=document.createElement('script');
    social.src='js/aymp-social.js?v=1';
    social.async=true;
    social.setAttribute('data-aymp-social-layer','1');
    document.body.appendChild(social);
  }
});
