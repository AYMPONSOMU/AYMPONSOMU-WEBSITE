/* AYMP Growth Layer — additive only. Does not replace existing site sections. */
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
  setMeta('og:title', current[0], true);
  setMeta('og:description', current[1], true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', location.href, true);
  setMeta('og:site_name', 'AYMPONSOMU', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', current[0]);
  setMeta('twitter:description', current[1]);

  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = site + path;

  if (!document.getElementById('aymp-growth-schema')) {
    var schema = document.createElement('script');
    schema.id = 'aymp-growth-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'AYMPONSOMU',
      'url': site,
      'description': current[1]
    });
    document.head.appendChild(schema);
  }

  if (!document.getElementById('aymp-discovery-bar')) {
    var bar = document.createElement('section');
    bar.id = 'aymp-discovery-bar';
    bar.style.cssText = 'padding:24px 20px;background:rgba(255,215,0,.045);border-top:1px solid rgba(255,215,0,.14);border-bottom:1px solid rgba(255,215,0,.14);';
    bar.innerHTML = '<div style="max-width:1200px;margin:auto;text-align:center">' +
      '<div style="color:#ffd700;font-weight:700;font-size:18px;margin-bottom:12px">✨ Explore AYMP Free Resources</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
      '<a href="daily-horoscope.html" data-aymp-track="daily_horoscope" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Daily Horoscope</a>' +
      '<a href="weekly-horoscope.html" data-aymp-track="weekly_horoscope" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Weekly Horoscope</a>' +
      '<a href="siddha-wellness.html" data-aymp-track="siddha_wellness" style="padding:11px 16px;border-radius:24px;background:#c9a227;color:#111;text-decoration:none;font-weight:700">Siddha Wellness</a>' +
      '<button id="aymp-share" type="button" style="padding:11px 16px;border-radius:24px;border:0;background:#25d366;color:#fff;font-weight:700;cursor:pointer">Share AYMP</button>' +
      '</div></div>';
    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(bar, footer); else document.body.appendChild(bar);
    document.getElementById('aymp-share').onclick = function () {
      var data = { title: document.title, text: 'Explore AYMPONSOMU Astrology, Siddha Wellness and Cosmic Guidance', url: location.href };
      if (navigator.share) navigator.share(data).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { alert('AYMP link copied. Share it with your friends and family.'); });
      else alert(location.href);
    };
  }

  document.querySelectorAll('[data-aymp-track]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof gtag === 'function') gtag('event', 'page_discovery_click', { event_category: 'growth', event_label: a.getAttribute('data-aymp-track') });
    });
  });
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof gtag === 'function') gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: location.pathname });
    });
  });
  if (typeof gtag === 'function') gtag('event', 'page_growth_layer_loaded', { page_path: location.pathname });
});
