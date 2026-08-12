// AYMP Cosmic Time Wheel Engine v3
// Personalized visitor-facing wheel: no Day/technical identifiers are shown.
(function(){
  'use strict';
  if(window.AYMPCosmicTimeWheel && window.AYMPCosmicTimeWheel.__v3) return;

  const layers={
    rashi:{title:'12 RASHI',items:['Mesha / Aries','Rishabha / Taurus','Mithuna / Gemini','Kataka / Cancer','Simha / Leo','Kanya / Virgo','Tula / Libra','Vrischika / Scorpio','Dhanus / Sagittarius','Makara / Capricorn','Kumbha / Aquarius','Meena / Pisces']},
    graha:{title:'9 GRAHA',items:['Surya / Sun','Chandra / Moon','Mangala / Mars','Budha / Mercury','Guru / Jupiter','Shukra / Venus','Shani / Saturn','Rahu','Ketu']},
    nakshatra:{title:'27 NAKSHATRA',items:['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati']},
    tithi:{title:'TITHI',items:['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima','Pratipada (Krishna)','Dvitiya (Krishna)','Tritiya (Krishna)','Chaturthi (Krishna)','Panchami (Krishna)','Shashthi (Krishna)','Saptami (Krishna)','Ashtami (Krishna)','Navami (Krishna)','Dashami (Krishna)','Ekadashi (Krishna)','Dwadashi (Krishna)','Trayodashi (Krishna)','Chaturdashi (Krishna)','Amavasya']},
    yoga:{title:'YOGA',items:['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyana','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti']},
    karana:{title:'KARANA',items:['Bava','Balava','Kaulava','Taitila','Garaja','Vanija','Vishti / Bhadra','Shakuni','Chatushpada','Naga','Kimstughna']}
  };

  const rewardCatalog={
    rashi:['Rashi Knowledge Card','Personal Cosmic Insight','Sacred Rashi Research'],
    graha:['Graha Research Card','Planetary Insight Unlock','Cosmic Energy Research'],
    nakshatra:['Nakshatra Secret Card','Star Research Insight','Sacred Nakshatra Knowledge'],
    tithi:['Tithi Insight Card','Lunar Knowledge Unlock','Sacred Time Research'],
    yoga:['Yoga Power Card','Rare Yoga Insight','Sacred Yoga Research'],
    karana:['Karana Insight Card','Special Karana Knowledge','Rare Cosmic Research']
  };

  let layer='rashi',spinning=false,rotation=0;
  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c];});}
  function personalContext(){
    const chart=window.AYMPBirthChart||{};
    const concern=document.getElementById('aympResearchConcernSelect');
    return {lagna:chart.lagna||'',ascendant:chart.ascendantText||'',concern:concern&&concern.selectedOptions[0]?concern.selectedOptions[0].textContent:'',birthName:chart.name||''};
  }
  function addCSS(){
    if(document.getElementById('aympCwV3CSS'))return;
    const s=document.createElement('style');s.id='aympCwV3CSS';s.textContent=`
      #aympCosmicWheelOverlay{display:none;position:fixed;inset:0;z-index:2147483000;background:radial-gradient(circle at 50% 15%,rgba(89,47,151,.46),rgba(3,6,20,.98) 65%);padding:14px;overflow:auto}
      #aympCosmicWheelOverlay.open{display:flex;align-items:center;justify-content:center}
      .aymp-cw-v3{width:min(760px,100%);max-height:96vh;overflow:auto;padding:16px;border:2px solid rgba(255,215,90,.65);border-radius:26px;background:linear-gradient(145deg,#1a1035,#070b20);box-shadow:0 0 55px rgba(255,215,90,.18),0 0 90px rgba(140,80,255,.2);color:#fff;position:relative}
      .aymp-cw-v3 h2{text-align:center;color:#ffd75a;margin:4px 45px;font-family:Cinzel,serif}.aymp-cw-v3 .sub{text-align:center;opacity:.68;font-size:11px;margin-bottom:12px}
      .aymp-cw-close-v3{position:absolute;right:12px;top:10px;width:40px;height:40px;border-radius:50%;background:#14132a;color:#ffe58e;border:1px solid rgba(255,215,90,.4);font-size:25px}
      .aymp-cw-context{display:none;text-align:center;margin:0 auto 10px;padding:9px 12px;border:1px solid rgba(255,215,90,.18);border-radius:12px;background:rgba(255,215,90,.045);font-size:10px;color:#ffe7a0;line-height:1.5}.aymp-cw-context.visible{display:block}
      .aymp-cw-tabs-v3{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.aymp-cw-tabs-v3 button{padding:9px 4px;border-radius:10px;border:1px solid rgba(255,215,90,.2);background:rgba(255,255,255,.045);color:#eee;font-size:10px;font-weight:800}.aymp-cw-tabs-v3 button.active{background:linear-gradient(135deg,#5c347e,#9b6ac0);border-color:#ffd75a;color:#fff3ad}
      .aymp-cw-stage-v3{position:relative;width:min(82vw,420px);aspect-ratio:1;margin:18px auto}.aymp-cw-pointer-v3{position:absolute;z-index:4;left:50%;top:-5px;transform:translateX(-50%);border-left:15px solid transparent;border-right:15px solid transparent;border-top:34px solid #ffd75a;filter:drop-shadow(0 0 8px #ffd75a)}
      .aymp-cw-wheel-v3{width:100%;height:100%;border-radius:50%;border:8px solid #ffd75a;position:relative;overflow:hidden;background:conic-gradient(#472265,#1c3564,#6d355f,#25476b,#694068,#20355f,#4c2b69,#284467,#61375e,#1f3c64,#4d2860,#2c3d6a);box-shadow:0 0 35px rgba(255,215,90,.35);transition:transform 4.2s cubic-bezier(.12,.75,.18,1)}
      .aymp-cw-wheel-v3:after{content:'✦';position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,#ffe990,#705019 34%,#19132d 70%);border:3px solid #ffd75a;color:#fff;font-size:30px;box-shadow:0 0 25px rgba(255,215,90,.45)}
      .aymp-cw-labels-v3{position:absolute;inset:0}.aymp-cw-labels-v3 span{position:absolute;left:50%;top:50%;width:43%;transform-origin:0 0;color:#ffeaa5;text-align:center;font-size:clamp(7px,2.1vw,11px);font-weight:800;text-shadow:0 1px 4px #000;white-space:nowrap}
      .aymp-cw-spin-v3{display:block;width:min(430px,94%);margin:0 auto 12px;padding:15px;border:1px solid #ffd75a;border-radius:15px;background:linear-gradient(135deg,#5d357f,#a170c8);color:#fff3ad;font-size:16px;font-weight:900}.aymp-cw-spin-v3:disabled{opacity:.55}
      .aymp-cw-result-v3{min-height:76px;text-align:center;padding:13px;border-radius:15px;border:1px solid rgba(255,215,90,.3);background:rgba(255,215,90,.055)}.aymp-cw-picked{color:#ffe38a;font-size:20px;font-weight:900}.aymp-cw-gift{margin-top:6px;font-size:12px}.aymp-cw-personal{margin-top:7px;font-size:10px;opacity:.72;line-height:1.45}.aymp-cw-token{margin-top:8px;padding:8px;border-radius:10px;border:1px solid rgba(37,211,102,.2);background:rgba(37,211,102,.05);font-size:9px;color:#c3ffd5}.aymp-cw-foot{text-align:center;font-size:9px;opacity:.48;margin-top:10px;line-height:1.5}
      @media(max-width:480px){.aymp-cw-tabs-v3{grid-template-columns:repeat(2,1fr)}.aymp-cw-v3{padding:12px}.aymp-cw-v3 h2{font-size:20px}}
    `;document.head.appendChild(s);
  }
  function ensureOverlay(){
    if(document.getElementById('aympCosmicWheelOverlay'))return;
    addCSS();
    const o=document.createElement('div');o.id='aympCosmicWheelOverlay';
    o.innerHTML='<div class="aymp-cw-v3"><button class="aymp-cw-close-v3" id="aympCwCloseV3">×</button><h2>🎡 AYMP COSMIC TIME WHEEL</h2><p class="sub">Rashi • Graha • Nakshatra • Tithi • Yoga • Karana</p><div class="aymp-cw-context" id="aympCwContext"></div><div class="aymp-cw-tabs-v3" id="aympCwTabsV3"></div><div class="aymp-cw-stage-v3"><div class="aymp-cw-pointer-v3"></div><div class="aymp-cw-wheel-v3" id="aympCwWheelV3"><div class="aymp-cw-labels-v3" id="aympCwLabelsV3"></div></div></div><button class="aymp-cw-spin-v3" id="aympCwSpinV3">✨ SPIN THE COSMIC WHEEL</button><div class="aymp-cw-result-v3" id="aympCwResultV3">Choose a cosmic layer and spin to reveal your personalized insight.</div><div class="aymp-cw-foot">A traditional research and entertainment experience. Rewards are informational unless a clearly stated premium service is selected.</div></div>';
    document.body.appendChild(o);
    Object.keys(layers).forEach(function(k){const b=document.createElement('button');b.dataset.layer=k;b.textContent=layers[k].title;b.onclick=function(){selectLayer(k)};document.getElementById('aympCwTabsV3').appendChild(b);});
    document.getElementById('aympCwCloseV3').onclick=close;document.getElementById('aympCwSpinV3').onclick=spin;selectLayer('rashi');
  }
  function renderContext(){
    const c=personalContext(),box=document.getElementById('aympCwContext');if(!box)return;
    const bits=[];if(c.lagna)bits.push('Lagna: '+esc(c.lagna));if(c.concern)bits.push('Focus: '+esc(c.concern));
    box.innerHTML=bits.join(' • ');box.classList.toggle('visible',bits.length>0);
  }
  function renderLabels(){
    const box=document.getElementById('aympCwLabelsV3');if(!box)return;box.innerHTML='';const items=layers[layer].items,n=items.length;
    items.forEach(function(item,i){const el=document.createElement('span');const a=(360/n)*i;el.textContent=item;el.style.transform='rotate('+a+'deg) translate(-50%,-50%)';box.appendChild(el);});
  }
  function selectLayer(k){if(spinning)return;layer=k;document.querySelectorAll('#aympCwTabsV3 button').forEach(b=>b.classList.toggle('active',b.dataset.layer===k));renderLabels();renderContext();document.getElementById('aympCwResultV3').innerHTML='Selected: <strong>'+esc(layers[k].title)+'</strong>. Spin to reveal your personalized insight.';}
  function open(){ensureOverlay();renderContext();document.getElementById('aympCosmicWheelOverlay').classList.add('open');document.body.style.overflow='hidden';}
  function close(){const o=document.getElementById('aympCosmicWheelOverlay');if(o)o.classList.remove('open');document.body.style.overflow='';}
  function spin(){
    if(spinning)return;ensureOverlay();spinning=true;
    const items=layers[layer].items,n=items.length,index=Math.floor(Math.random()*n),step=360/n,target=index*step+step/2;
    rotation+=360*5+(360-target);const wheel=document.getElementById('aympCwWheelV3'),button=document.getElementById('aympCwSpinV3');button.disabled=true;button.textContent='🌌 COSMIC ENERGY SPINNING...';wheel.style.transform='rotate('+rotation+'deg)';
    setTimeout(function(){
      const c=personalContext(),gift=rewardCatalog[layer][index%rewardCatalog[layer].length];
      const personal=c.concern?'<div class="aymp-cw-personal">This insight is being viewed in the context of your selected personal concern.</div>':'';
      document.getElementById('aympCwResultV3').innerHTML='<div class="aymp-cw-picked">✦ '+esc(items[index])+' ✦</div><div class="aymp-cw-gift">🎁 '+esc(gift)+'</div>'+personal+'<div class="aymp-cw-token">Future AYMP / 999xyz999 utility integration can be enabled here after final verification; no token transfer occurs from this free wheel.</div>';
      button.disabled=false;button.textContent='✨ SPIN AGAIN';spinning=false;
      try{if(typeof gtag==='function')gtag('event','cosmic_wheel_reward',{layer:layer,item:items[index],gift:gift,lagna:c.lagna||'unknown',concern:c.concern||'unknown'});}catch(e){}
    },4300);
  }
  function bindButton(){['aympGuidanceCosmicWheelButton','aympCosmicWheelBridgeButton','aympCosmicWheelButton'].forEach(function(id){const b=document.getElementById(id);if(b)b.onclick=function(e){if(e)e.preventDefault();open();};});}
  window.AYMPCosmicTimeWheel={__v3:true,open:open,close:close,spin:spin,selectLayer:selectLayer};
  function boot(){ensureOverlay();bindButton();const mo=new MutationObserver(function(){bindButton();renderContext();});mo.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
