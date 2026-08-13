// AYMP Cosmic Solution Result Bridge
// Adds a separate Cosmic Solution Wheel button below the existing Yantra/Herb/Thanthreeg button.
// Existing guidance and Cosmic Time Wheel logic are preserved.
(function(){'use strict';
  const DB='data/aymp-cosmic-solution-wheel-v1.json';
  const TIME_DB='data/aymp-cosmic-time-wheel-v1.json';
  let dbPromise=null,timePromise=null;
  const esc=v=>String(v==null?'':v).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  const load=(url,slot)=>window[slot]||(window[slot]=fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Database unavailable');return r.json();}));
  function addButton(){
    const result=document.querySelector('.aymp-guidance-result');
    const research=document.getElementById('aympGuidanceResearchButtonWrap');
    if(!result||!research||document.getElementById('aympCosmicSolutionButtonWrap'))return;
    const wrap=document.createElement('div');
    wrap.id='aympCosmicSolutionButtonWrap';
    wrap.style.cssText='margin-top:12px;padding:15px;border:1px solid rgba(255,215,120,.28);border-radius:16px;background:linear-gradient(135deg,rgba(35,70,130,.20),rgba(255,215,120,.05));';
    wrap.innerHTML='<button type="button" id="aympCosmicSolutionButton" style="width:100%;padding:15px;border:1px solid rgba(255,215,120,.55);border-radius:12px;background:linear-gradient(135deg,#102b59,#4d3a83);color:#ffe39a;font-size:16px;font-weight:900;cursor:pointer;">🌌 COSMIC SOLUTION WHEEL<span style="display:block;margin-top:5px;color:#fff;opacity:.72;font-size:11px;font-weight:500;">Spin to discover an affordable AYMP solution from your cosmic profile</span></button>';
    research.insertAdjacentElement('afterend',wrap);
    document.getElementById('aympCosmicSolutionButton').onclick=openWheel;
  }
  function openWheel(){
    let modal=document.getElementById('aympCosmicSolutionModal');
    if(!modal)modal=buildModal();
    modal.style.display='flex';
    prepare(modal);
  }
  function buildModal(){
    const style=document.createElement('style');
    style.id='aympCosmicSolutionResultCSS';
    style.textContent=`#aympCosmicSolutionModal{display:none;position:fixed;inset:0;z-index:1000001;background:rgba(3,5,16,.97);overflow:auto;padding:14px;align-items:flex-start;justify-content:center}#aympCosmicSolutionModal .csrm{width:min(760px,100%);margin:10px auto 40px;padding:18px;color:#fff;font-family:Poppins,Arial,sans-serif}#aympCosmicSolutionModal .csrhead{display:flex;justify-content:space-between;gap:10px;align-items:center}#aympCosmicSolutionModal h2{color:#ffd700;text-align:center}#aympCosmicSolutionModal .close{border:1px solid rgba(255,215,120,.35);background:rgba(255,255,255,.06);color:#fff;border-radius:22px;padding:8px 12px;cursor:pointer}#aympCosmicSolutionModal .ctx{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.csrchip{padding:10px;border:1px solid rgba(255,215,0,.15);border-radius:12px;background:rgba(255,255,255,.035);text-align:center;font-size:11px}.csrchip b{display:block;color:#ffd66a;margin-bottom:3px}.csrwheelwrap{width:min(350px,84vw);aspect-ratio:1;margin:20px auto;position:relative}.csrpointer{position:absolute;z-index:4;top:-7px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:28px solid #ffd700;filter:drop-shadow(0 0 8px #ffd700)}.csrwheel{width:100%;height:100%;border-radius:50%;border:8px solid #ffd700;box-sizing:border-box;background:conic-gradient(#6d4aa0 0 30deg,#172d57 30deg 60deg,#9c5b42 60deg 90deg,#345963 90deg 120deg,#6d4aa0 120deg 150deg,#172d57 150deg 180deg,#9c5b42 180deg 210deg,#345963 210deg 240deg,#6d4aa0 240deg 270deg,#172d57 270deg 300deg,#9c5b42 300deg 330deg,#345963 330deg 360deg);transition:transform 4.4s cubic-bezier(.12,.72,.18,1);position:relative;box-shadow:0 0 45px rgba(255,215,0,.18)}.csrwheel:after{content:'✦';position:absolute;inset:40%;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#0d1428;border:3px solid #ffd700;color:#ffd700;font-size:28px}.csrlabels{position:absolute;inset:0}.csrlabels span{position:absolute;left:50%;top:50%;width:45%;text-align:right;transform-origin:0 0;transform:rotate(var(--a)) translateX(-100%);font-size:9px;font-weight:800;color:#fff;pointer-events:none}.csrbtn{display:block;width:100%;padding:15px;border:0;border-radius:40px;background:linear-gradient(45deg,#ffd700,#ffb800);color:#111;font-size:18px;font-weight:900;cursor:pointer}.csrbtn:disabled{opacity:.55}.csrresult{display:none;margin-top:15px;padding:20px;text-align:center;border:1px solid rgba(255,215,0,.4);border-radius:20px;background:linear-gradient(135deg,rgba(91,53,150,.3),rgba(255,215,0,.08))}.csrresult.show{display:block}.csrresult h3{color:#ffd700;margin:4px 0}.csrresult .cta{display:inline-block;margin-top:12px;padding:13px 22px;border-radius:30px;background:#25d366;color:#fff;text-decoration:none;font-weight:800}.csrnote{text-align:center;font-size:10px;opacity:.58;margin-top:12px}@media(max-width:600px){#aympCosmicSolutionModal .ctx{grid-template-columns:1fr 1fr}.csrlabels span{font-size:7px}}`;
    document.head.appendChild(style);
    const modal=document.createElement('div');modal.id='aympCosmicSolutionModal';
    modal.innerHTML='<div class="csrm"><div class="csrhead"><h2>🌌 AYMP COSMIC SOLUTION WHEEL</h2><button class="close" type="button">✕</button></div><p style="text-align:center;color:#ddd">Your birth details are already being used. No need to enter them again.</p><div id="aympCsrContext"></div><div class="csrwheelwrap"><div class="csrpointer"></div><div class="csrwheel" id="aympCsrWheel"><div class="csrlabels"><span style="--a:-15deg">Pariharam</span><span style="--a:15deg">Yantra</span><span style="--a:45deg">Power Arts</span><span style="--a:75deg">AYMP</span><span style="--a:105deg">999xyz999</span><span style="--a:135deg">Astrology</span><span style="--a:165deg">Planet</span><span style="--a:195deg">Herbal</span><span style="--a:225deg">Product</span><span style="--a:255deg">Offer</span><span style="--a:285deg">Research</span><span style="--a:315deg">Daily</span></div></div></div><button class="csrbtn" id="aympCsrSpin" type="button">🎡 SPIN FOR MY COSMIC SOLUTION</button><div class="csrresult" id="aympCsrResult"></div><div class="csrnote">Traditional guidance/recommendation only. No guaranteed outcome or monetary prize.</div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick=()=>{modal.style.display='none';};
    modal.querySelector('#aympCsrSpin').onclick=spin;
    return modal;
  }
  async function prepare(modal){
    const chart=window.AYMPBirthChart||{};
    const ctx=modal.querySelector('#aympCsrContext');
    ctx.innerHTML='<p style="text-align:center;opacity:.7">Loading cosmic result data...</p>';
    try{
      dbPromise=dbPromise||load(DB,'__aympCsrDb');timePromise=timePromise||load(TIME_DB,'__aympCsrTimeDb');
      const [db,timeDb]=await Promise.all([dbPromise,timePromise]);
      const rashiIndex=Number.isInteger(chart.moonRashiIndex)?chart.moonRashiIndex:0;
      const r=timeDb.rashis[rashiIndex]||timeDb.rashis[0];
      ctx.innerHTML='<div class="ctx"><div class="csrchip"><b>NAME</b>'+esc(chart.name||'Guest')+'</div><div class="csrchip"><b>DOB</b>'+esc(chart.birthDate||'')+'</div><div class="csrchip"><b>LAGNA</b>'+esc(chart.lagna||'Calculated')+'</div><div class="csrchip"><b>RASHI</b>'+esc(r.en||'')+'</div></div>';
      window.__AYMPCsrState={db,timeDb,chart};
    }catch(e){ctx.innerHTML='<p style="color:#ffb3b3;text-align:center">Cosmic solution data could not be loaded. Please try again.</p>';console.error(e);}
  }
  function spin(){
    const s=window.__AYMPCsrState;if(!s)return;
    const wheel=document.getElementById('aympCsrWheel'),result=document.getElementById('aympCsrResult'),button=document.getElementById('aympCsrSpin');
    button.disabled=true;result.classList.remove('show');
    const c=s.chart;const seed=hash([c.name||'',c.birthDate||'',c.birthTime||'',c.birthPlace||'',c.lagna||'',new Date().toISOString().slice(0,10)].join('|'));
    const index=seed%s.db.solutions.length;const sector=index*30+15;wheel.style.transform='rotate('+(6*360+(360-sector))+'deg)';
    setTimeout(()=>{const item=s.db.solutions[index];const msg=encodeURIComponent('வணக்கம் AYMPONSOMU, Cosmic Solution Wheel மூலம் '+item.title+' பற்றி தெரிந்துகொள்ள விரும்புகிறேன். பெயர்: '+(c.name||'Guest')+' | DOB: '+(c.birthDate||''));result.innerHTML='<div>✨ YOUR COSMIC RESULT</div><h3>'+esc(item.title)+'</h3><p>'+esc(item.ta)+'</p><p>'+esc(item.description)+'</p><p style="color:#ffe7a0">'+esc(item.price||'Affordable solution — final price/availability before order.')+'</p><a class="cta" target="_blank" rel="noopener" href="https://wa.me/'+s.db.whatsapp+'?text='+msg+'">💬 '+esc(item.cta||'Get Solution')+'</a>';result.classList.add('show');button.disabled=false;try{if(typeof gtag==='function')gtag('event','cosmic_solution_result',{solution_id:item.id,solution_title:item.title});}catch(e){}},4550);
  }
  function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0;}
  const observer=new MutationObserver(addButton);
  observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',addButton);
})();