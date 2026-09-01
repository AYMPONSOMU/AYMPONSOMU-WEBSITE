/* AYMP Home Navigation — simple global entry bar. */
(function(){
  'use strict';
  function init(){
    if(location.pathname.split('/').pop() && location.pathname.split('/').pop() !== 'index.html') return;
    if(document.getElementById('aymp-home-nav')) return;
    var nav=document.createElement('nav');
    nav.id='aymp-home-nav';
    nav.setAttribute('aria-label','AYMP main navigation');
    nav.style.cssText='position:sticky;top:0;z-index:9998;padding:10px 12px;background:rgba(5,8,22,.94);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,215,0,.22);display:flex;gap:8px;justify-content:center;flex-wrap:wrap;box-shadow:0 5px 24px rgba(0,0,0,.25)';
    var items=[
      ['🏠 Home','index.html'],
      ['🎮 Play','game-zone.html'],
      ['🌍 Discover','global-trending.html'],
      ['🍜 Food','food-discovery.html'],
      ['🧠 Ask AYMP','ask-aymp.html']
    ];
    items.forEach(function(item){
      var a=document.createElement('a');
      a.href=item[1]; a.textContent=item[0];
      a.style.cssText='display:inline-block;padding:9px 14px;border-radius:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.2);color:#fff;text-decoration:none;font-weight:700;font-size:13px';
      nav.appendChild(a);
    });
    var hero=document.querySelector('header');
    if(hero&&hero.parentNode) hero.parentNode.insertBefore(nav,hero); else document.body.insertBefore(nav,document.body.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
