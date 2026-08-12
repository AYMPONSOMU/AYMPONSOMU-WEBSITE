// AYMP Cosmic Time Wheel Engine v2
// Fix: the existing guidance button now opens the real wheel instead of the legacy loading alert.
(function(){
  'use strict';
  if(window.AYMPCosmicTimeWheel && window.AYMPCosmicTimeWheel.__v2) return;

  const layers={
    rashi:{title:'12 RASHI',items:['Mesha / Aries','Rishabha / Taurus','Mithuna / Gemini','Kataka / Cancer','Simha / Leo','Kanya / Virgo','Tula / Libra','Vrischika / Scorpio','Dhanus / Sagittarius','Makara / Capricorn','Kumbha / Aquarius','Meena / Pisces']},
    graha:{title:'9 GRAHA',items:['Surya / Sun','Chandra / Moon','Mangala / Mars','Budha / Mercury','Guru / Jupiter','Shukra / Venus','Shani / Saturn','Rahu','Ketu']},
    nakshatra:{title:'27 NAKSHATRA',items:['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati']},
    tithi:{title:'30 TITHI',items:['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima','Pratipada (Krishna)','Dvitiya (Krishna)','Tritiya (Krishna)','Chaturthi (Krishna)','Panchami (Krishna)','Shashthi (Krishna)','Saptami (Krishna)','Ashtami (Krishna)','Navami (Krishna)','Dashami (Krishna)','Ekadashi (Krishna)','Dwadashi (Krishna)','Trayodashi (Krishna)','Chaturdashi (Krishna)','Amavasya']},
    yoga:{title:'27 YOGA',items:['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyana','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti']},
    karana:{title:'KARANA',items:['Bava','Balava','Kaulava','Taitila','Garaja','Vanija','Vishti / Bhadra','Shakuni','Chatushpada','Naga','Kimstughna']}
  };
  const gifts=['Rare Research Unlock','AYMP Cosmic Research Badge','Personal Research Priority','Sacred Knowledge Card','90-Day Research Pathway','Cosmic Insight Archive Access'];
  let layer='rashi',spinning=false,rotation=0;

  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c];});}
  function addCSS(){
    if(document.getElementById('aympCwV2CSS'))return;
    const s=document.createElement('style');s.id='aympCwV2CSS';s.textContent=`
      #aympCosmicWheelOverlay{display:none;position:fixed;inset:0;z-index:2147483000;background:radial-gradient(circle at 50% 15%,rgba(89,47,151,.42),rgba(3,6,20,.98) 65%);padding:14px;overflow:auto}
      #aympCosmicWheelOverlay.open{display:flex;align-items:center;justify-content:center}
      .aymp-cw-v2{width:min(760px,100%);max-height:96vh;overflow:auto;padding:16px;border:2px solid rgba(255,215,90,.65);border-radius:26px;background:linear-gradient(145deg,#1a1035,#070b20);box-shadow:0 0 55px rgba(255,215,90,.18),0 0 90px rgba(140,80,255,.2);color:#fff;position:relative}
      .aymp-cw-v2 h2{text-align:center;color:#ffd75a;margin:4px 45px;font-family:Cinzel,serif}.aymp-cw-v2 .sub{text-align:center;opacity:.68;font-size:11px;margin-bottom:12px}
      .aymp-cw-close-v2{position:absolute;right:12px;top:10px;width:40px;height:40px;border-radius:50%;background:#14132a;color:#ffe58e;border:1px solid rgba(255,215,90,.4);font-size:25px}
      .aymp-cw-tabs-v2{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.aymp-cw-tabs-v2 button{padding:9px 4px;border-radius:10px;border:1px solid rgba(255,215,90,.2);background:rgba(255,255,255,.045);color:#eee;font-size:10px;font-weight:800}.aymp-cw-tabs-v2 button.active{background:linear-gradient(135deg,#5c347e,#9b6ac0);border-color:#ffd75a;color:#fff3ad}
      .aymp-cw-stage-v2{position:relative;width:min(82vw,420px);aspect-ratio:1;margin:18px auto}.aymp-cw-pointer-v2{position:absolute;z-index:4;left:50%;top:-5px;transform:translateX(-50%);border-left:15px solid transparent;border-right:15px solid transparent;border-top:34px solid #ffd75a;filter:drop-shadow(0 0 8px #ffd75a)}
      .aymp-cw-wheel-v2{width:100%;height:100%;border-radius:50%;border:8px solid #ffd75a;position:relative;overflow:hidden;background:conic-gradient(#472265,#1c3564,#6d355f,#25476b,#694068,#20355f,#4c2b69,#284467,#61375e,#1f3c64,#4d2860,#2c3d6a);box-shadow:0 0 35px rgba(255,215,90,.35);transition:transform 4.2s cubic-bezier(.12,.75,.18,1)}
      .aymp-cw-wheel-v2:after{content:'✦';position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,#ffe990,#705019 34%,#19132d 70%);border:3px solid #ffd75a;color:#fff;font-size:30px;box-shadow:0 0 25px rgba(255,215,90,.45)}
      .aymp-cw-labels-v2{position:absolute;inset:0}.aymp-cw-labels-v2 span{position:absolute;left:50%;top:50%;width:43%;transform-origin:0 0;color:#ffeaa5;text-align:center;font-size:clamp(7px,2.1vw,11px);font-weight:800;text-shadow:0 1px 4px #000;white-space:nowrap}
      .aymp-cw-spin-v2{display:block;width:min(430px,94%);margin:0 auto 12px;padding:15px;border:1px solid #ffd75a;border-radius:15px;background:linear-gradient(135deg,#5d357f,#a170c8);color:#fff3ad;font-size:16px;font-weight:900}.aymp-cw-spin-v2:disabled{opacity:.55}
      .aymp-cw-result-v2{min-height:76px;text-align:center;padding:13px;border-radius:15px;border:1px solid rgba(255,215,90,.3);background:rgba(255,215,90,.055)}.aymp-cw-picked{color:#ffe38a;font-size:20px;font-weight:900}.aymp-cw-gift{margin-top:6px;font-size:12px}.aymp-cw-token{margin-top:8px;padding:8px;border-radius:10px;border:1px solid rgba(37,211,102,.2);background:rgba(37,211,102,.05);font-size:9px;color:#c3ffd5}.aymp-cw-foot{text-align:center;font-size:9px;opacity:.48;margin-top:10px;line-height:1.5}
      @media(max-width:480px){.aymp-cw-tabs-v2{grid-template-columns:repeat(2,1fr)}.aymp-cw-v2{padding:12px}.aymp-cw-v2 h2{font-size:20px}}
    `;document.head.appendChild(s);
  }
  function ensureOverlay(){
    if(document.getElementById('aympCosmicWheelOverlay'))return;
    addCSS();
    const o=document.createElement('div');o.id='aympCosmicWheelOverlay';
    o.innerHTML='<div class="aymp-cw-v2"><button class="aymp-cw-close-v2" id="aympCwCloseV2">×</button><h2>🎡 AYMP COSMIC TIME WHEEL</h2><p class="sub">12 Rashi • 9 Graha • 27 Nakshatra • Tithi • Yoga • Karana</p><div class="aymp-cw-tabs-v2" id="aympCwTabsV2"></div><div class="aymp-cw-stage-v2"><div class="aymp-cw-pointer-v2"></div><div class="aymp-cw-wheel-v2" id="aympCwWheelV2"><div class="aymp-cw-labels-v2" id="aympCwLabelsV2"></div></div></div><button class="aymp-cw-spin-v2" id="aympCwSpinV2">✨ SPIN THE COSMIC WHEEL</button><div class="aymp-cw-result-v2" id="aympCwResultV2">Choose a layer and spin to reveal your rare research gift.</div><div class="aymp-cw-foot">Research-gift experience. AYMP and 999xyz999 token reward hooks are reserved for future activation after contract verification and final reward-policy approval.</div></div>';
    document.body.appendChild(o);
    Object.keys(layers).forEach(function(k){const b=document.createElement('button');b.dataset.layer=k;b.textContent=layers[k].title;b.onclick=function(){selectLayer(k)};document.getElementById('aympCwTabsV2').appendChild(b);});
    document.getElementById('aympCwCloseV2').onclick=close;document.getElementById('aympCwSpinV2').onclick=spin;selectLayer('rashi');
  }
  function renderLabels(){
    const box=document.getElementById('aympCwLabelsV2');box.innerHTML='';const items=layers[layer].items,n=items.length;
    items.forEach(function(item,i){const el=document.createElement('span');const a=(360/n)*i;el.textContent=item;el.style.transform='rotate('+a+'deg) translate(-50%,-50%)';box.appendChild(el);});
  }
  function selectLayer(k){if(spinning)return;layer=k;document.querySelectorAll('#aympCwTabsV2 button').forEach(b=>b.classList.toggle('active',b.dataset.layer===k));renderLabels();document.getElementById('aympCwResultV2').innerHTML='Selected: <strong>'+esc(layers[k].title)+'</strong>. Spin to reveal your result.';}
  function open(){ensureOverlay();document.getElementById('aympCosmicWheelOverlay').classList.add('open');document.body.style.overflow='hidden';}
  function close(){const o=document.getElementById('aympCosmicWheelOverlay');if(o)o.classList.remove('open');document.body.style.overflow='';}
  function spin(){if(spinning)return;ensureOverlay();spinning=true;const items=layers[layer].items,n=items.length,index=Math.floor(Math.random()*n),step=360/n,target=index*step+step/2;rotation+=360*5+(360-target);const wheel=document.getElementById('aympCwWheelV2'),button=document.getElementById('aympCwSpinV2');button.disabled=true;button.textContent='🌌 COSMIC ENERGY SPINNING...';wheel.style.transform='rotate('+rotation+'deg)';setTimeout(function(){const gift=gifts[(index+layer.length)%gifts.length];document.getElementById('aympCwResultV2').innerHTML='<div class="aymp-cw-picked">✦ '+esc(items[index])+' ✦</div><div class="aymp-cw-gift">🎁 '+esc(gift)+'</div><div class="aymp-cw-token">AYMP / 999xyz999 token reward hooks are configured for future use; no token is transferred by this free wheel.</div>';button.disabled=false;button.textContent='✨ SPIN AGAIN';spinning=false;try{if(typeof gtag==='function')gtag('event','cosmic_wheel_reward',{layer:layer,item:items[index],gift:gift});}catch(e){}},4300);}
  function bindButton(){
    const ids=['aympGuidanceCosmicWheelButton','aympCosmicWheelBridgeButton','aympCosmicWheelButton'];
    ids.forEach(function(id){const b=document.getElementById(id);if(b){b.onclick=function(e){if(e)e.preventDefault();open();};}});
  }
  window.AYMPCosmicTimeWheel={__v2:true,open:open,close:close,spin:spin,selectLayer:selectLayer};
  function boot(){ensureOverlay();bindButton();const mo=new MutationObserver(bindButton);mo.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
