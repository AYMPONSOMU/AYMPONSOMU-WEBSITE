// AYMP Cosmic Time Wheel bridge
// Connects the personalized Lagna result screen directly to the working wheel engine.
// Also restores the separate glowing AYMP Sacred Mantra presentation.
(function(){
  'use strict';

  function loadEngine(){
    if(document.getElementById('aympCosmicTimeWheelEngine')) return;
    const s=document.createElement('script');
    s.id='aympCosmicTimeWheelEngine';
    s.src='assets/js/aymp-cosmic-time-wheel.js?v=3';
    s.defer=true;
    document.body.appendChild(s);
  }

  function addMantraStyles(){
    if(document.getElementById('aympMantraGlowCSS')) return;
    const s=document.createElement('style');
    s.id='aympMantraGlowCSS';
    s.textContent=`
      .aymp-mantra-glow-box{
        position:relative;
        margin:20px 0;
        padding:22px 16px;
        border:1px solid rgba(255,215,106,.58);
        border-radius:22px;
        background:radial-gradient(circle at 50% 15%,rgba(255,215,106,.16),rgba(52,25,82,.72) 42%,rgba(12,15,35,.94) 100%);
        box-shadow:0 0 18px rgba(255,215,106,.28),0 0 45px rgba(145,85,255,.20),inset 0 0 28px rgba(255,215,106,.06);
        overflow:hidden;
        animation:aympMantraGlow 3s ease-in-out infinite;
      }
      .aymp-mantra-glow-box:before{
        content:'✦  ✧  ✦';
        position:absolute;
        top:6px;left:0;right:0;
        text-align:center;
        color:#ffd66a;
        letter-spacing:18px;
        opacity:.72;
        pointer-events:none;
        animation:aympMantraSpark 2.6s ease-in-out infinite;
      }
      .aymp-mantra-glow-box:after{
        content:'';
        position:absolute;
        width:130px;height:130px;
        left:50%;top:50%;
        transform:translate(-50%,-50%);
        border-radius:50%;
        background:radial-gradient(circle,rgba(255,215,106,.16),transparent 70%);
        pointer-events:none;
      }
      .aymp-mantra-glow-box>*{position:relative;z-index:1}
      @keyframes aympMantraGlow{
        0%,100%{box-shadow:0 0 18px rgba(255,215,106,.22),0 0 38px rgba(145,85,255,.16),inset 0 0 24px rgba(255,215,106,.05)}
        50%{box-shadow:0 0 30px rgba(255,215,106,.42),0 0 62px rgba(145,85,255,.28),inset 0 0 34px rgba(255,215,106,.09)}
      }
      @keyframes aympMantraSpark{0%,100%{opacity:.45;transform:translateY(0)}50%{opacity:1;transform:translateY(2px)}}
    `;
    document.head.appendChild(s);
  }

  function restoreMantraBox(){
    const result=document.querySelector('.aymp-guidance-result');
    if(!result || result.querySelector('.aymp-mantra-glow-box')) return;
    const candidates=Array.from(result.children || []);
    const target=candidates.find(function(el){
      const text=(el.textContent||'').toLowerCase();
      return text.includes('aymp sacred mantra') || text.includes('mantra meaning');
    });
    if(!target) return;
    addMantraStyles();
    const box=document.createElement('div');
    box.className='aymp-mantra-glow-box';
    target.parentNode.insertBefore(box,target);
    box.appendChild(target);
  }

  function mountButton(){
    const result=document.getElementById('aympLagnaResearchResult');
    if(!result || document.getElementById('aympCosmicWheelBridgeButton')) return;
    const b=document.createElement('button');
    b.id='aympCosmicWheelBridgeButton';
    b.type='button';
    b.textContent='🎡 AYMP COSMIC TIME WHEEL • Rare Research Gifts';
    b.style.cssText='display:block;width:100%;margin-top:16px;padding:16px;border:1px solid rgba(255,215,120,.55);border-radius:14px;background:linear-gradient(135deg,#241142,#70439a);color:#ffe39a;font-weight:900;font-size:16px;cursor:pointer;box-shadow:0 0 24px rgba(190,120,255,.16)';
    b.addEventListener('click',function(){
      if(window.AYMPCosmicTimeWheel && typeof window.AYMPCosmicTimeWheel.open==='function'){
        window.AYMPCosmicTimeWheel.open();
        return;
      }
      const original=document.getElementById('aympCosmicWheelButton');
      if(original) original.click();
    });
    result.appendChild(b);
  }

  function boot(){
    loadEngine();
    restoreMantraBox();
    mountButton();
    const observer=new MutationObserver(function(){
      restoreMantraBox();
      mountButton();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){restoreMantraBox();mountButton();},800);
    setTimeout(function(){restoreMantraBox();mountButton();},2000);
    setTimeout(function(){restoreMantraBox();mountButton();},4000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
