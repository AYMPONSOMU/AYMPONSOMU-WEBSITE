// AYMP Cosmic Time Wheel bridge
// Loads the wheel engine and exposes its button on the personalized Lagna result screen.
(function(){
  'use strict';
  function loadEngine(){
    if(document.getElementById('aympCosmicTimeWheelEngine')) return;
    const s=document.createElement('script');
    s.id='aympCosmicTimeWheelEngine';
    s.src='assets/js/aymp-cosmic-time-wheel.js?v=2';
    s.defer=true;
    document.body.appendChild(s);
  }
  function mountButton(){
    const result=document.getElementById('aympLagnaResearchResult');
    const overlay=document.getElementById('aympCosmicWheelOverlay');
    if(!result || !overlay || document.getElementById('aympCosmicWheelBridgeButton')) return;
    const b=document.createElement('button');
    b.id='aympCosmicWheelBridgeButton';
    b.type='button';
    b.textContent='🎡 AYMP COSMIC TIME WHEEL • Rare Research Gifts';
    b.style.cssText='display:block;width:100%;margin-top:16px;padding:16px;border:1px solid rgba(255,215,120,.55);border-radius:14px;background:linear-gradient(135deg,#241142,#70439a);color:#ffe39a;font-weight:900;font-size:16px;cursor:pointer;box-shadow:0 0 24px rgba(190,120,255,.16)';
    b.addEventListener('click',function(){ overlay.classList.add('open'); const original=document.getElementById('aympCosmicWheelButton'); if(original) original.click(); });
    result.appendChild(b);
  }
  function boot(){
    loadEngine();
    const observer=new MutationObserver(function(){ mountButton(); });
    observer.observe(document.body,{childList:true,subtree:true});
    mountButton();
    setTimeout(function(){mountButton();},1000);
    setTimeout(function(){mountButton();},3000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
