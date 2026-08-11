// AYMP Personalized Result Presentation v2
// Birth-entry screen stays clean. Research is shown only after a valid birth chart is calculated.
(function () {
  'use strict';

  const MODEL_URL = 'data/aymp_model_research_mapping_v1.json';
  const GUIDANCE_DB_URL = 'data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';
  let modelPromise = null;
  let guidancePromise = null;
  let resultOpen = false;

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];
    });
  }
  function loadModel() {
    if (!modelPromise) modelPromise = fetch(MODEL_URL, {cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Research mapping unavailable');return r.json();});
    return modelPromise;
  }
  function loadGuidanceDb() {
    if (!guidancePromise) guidancePromise = fetch(GUIDANCE_DB_URL,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Yantra research database unavailable');return r.json();}).then(function(x){return x&&typeof x.content==='string'?JSON.parse(x.content):x;});
    return guidancePromise;
  }
  function concernKey(){const s=document.getElementById('aympResearchConcernSelect');return s?s.value:'business';}
  function concernText(){const s=document.getElementById('aympResearchConcernSelect');return s&&s.selectedOptions.length?s.selectedOptions[0].textContent:'Personal Research';}
  function getYantra(model,db){
    const policy=(model&&model.concern_yantra_policy&&model.concern_yantra_policy[concernKey()])||(model&&model.concern_yantra_policy&&model.concern_yantra_policy.other);
    if(!policy)return null;
    const list=db&&Array.isArray(db.yantras)?db.yantras:[];
    return list.find(function(y){return y.id===policy.primary_yantra_id;})||null;
  }
  function imageCandidates(file){return ['assets/yantra/'+file,'assets/images/yantra/'+file,'assets/img/yantra/'+file,'images/yantra/'+file,'assets/'+file];}
  function addStyles(){
    if(document.getElementById('aympResultPresentationCSS'))return;
    const s=document.createElement('style');s.id='aympResultPresentationCSS';s.textContent=`
      #aympResultPresentation{position:fixed;inset:0;z-index:999999;display:none;overflow:auto;padding:16px;background:rgba(3,5,16,.97);backdrop-filter:blur(14px)}
      #aympResultPresentation.open{display:block}#aympResultPresentationInner{width:min(900px,100%);margin:0 auto;padding-bottom:36px}
      .aymp-result-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}.aymp-result-top h2{margin:0;color:#ffd66a;font-family:Cinzel,serif;font-size:1.2rem}
      .aymp-result-close{border:1px solid rgba(255,215,120,.3);background:rgba(255,255,255,.06);color:#fff;border-radius:999px;padding:8px 13px;cursor:pointer}
      .aymp-yantra-showcase{margin:14px 0;padding:18px;border-radius:20px;border:1px solid rgba(255,215,120,.3);background:radial-gradient(circle at center,rgba(112,65,170,.25),rgba(20,14,35,.85));text-align:center}
      .aymp-yantra-showcase h3{margin:0 0 5px;color:#ffd66a}.aymp-yantra-showcase p{margin:0 0 12px;opacity:.7;font-size:.75rem}
      .aymp-yantra-image-frame{width:min(440px,90vw);aspect-ratio:1/1;margin:auto;border-radius:18px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);border:1px solid rgba(255,215,120,.22);overflow:hidden;box-shadow:0 0 35px rgba(255,200,80,.15)}
      .aymp-yantra-image-frame img{width:100%;height:100%;object-fit:contain;padding:18px}.aymp-yantra-placeholder{padding:50px 20px;opacity:.7;font-size:.85rem;line-height:1.5}.aymp-yantra-caption{margin-top:10px;color:#ffe39a;font-weight:700}
      .aymp-result-whatsapp{margin-top:16px}.aymp-result-whatsapp a{display:block;text-align:center;padding:14px;border-radius:13px;background:#25d366;color:#061b0c;text-decoration:none;font-weight:800}
      .aymp-result-disclaimer{margin-top:10px;font-size:.68rem;line-height:1.5;opacity:.58;text-align:center}
      @media(max-width:600px){#aympResultPresentation{padding:10px}.aymp-result-top h2{font-size:1rem}.aymp-yantra-showcase{padding:12px}}
    `;document.head.appendChild(s);
  }
  function ensureShell(){
    let shell=document.getElementById('aympResultPresentation');if(shell)return shell;
    shell=document.createElement('div');shell.id='aympResultPresentation';shell.innerHTML='<div id="aympResultPresentationInner"><div class="aymp-result-top"><h2>🔱 AYMP PERSONALIZED RESEARCH RESULT</h2><button class="aymp-result-close" type="button">✕ Close</button></div><div id="aympResultPresentationBody"></div></div>';document.body.appendChild(shell);
    shell.querySelector('.aymp-result-close').addEventListener('click',closeResult);return shell;
  }
  function buildYantra(model,db){
    const y=getYantra(model,db);if(!y)return '<div class="aymp-yantra-placeholder">No approved Yantra mapping is available for this research pathway yet.</div>';
    const candidates=imageCandidates(y.image||'');
    return '<section class="aymp-yantra-showcase"><h3>🧿 Your AYMP Research Yantra</h3><p>Personalized traditional research recommendation based on the selected life-concern pathway.</p><div class="aymp-yantra-image-frame"><img id="aympPersonalYantraImage" src="'+esc(candidates[0])+'" alt="'+esc(y.name_en)+' Yantra" data-fallback="'+esc(candidates[1])+'"></div><div class="aymp-yantra-caption">'+esc(y.name_en)+'</div></section>';
  }
  function buildWhatsApp(chart){
    const message=['AYMP Personalized Research Consultation','Name: '+(chart.name||''),'Lagna: '+(chart.lagna||''),'Ascendant: '+(chart.ascendantText||''),'Life Concern: '+concernText(),'','I would like to discuss my personalized AYMP research guidance.'].join('\n');
    const existing=document.querySelector('a.whatsapp[href*="wa.me/"]')||document.querySelector('a[href*="wa.me/"]');
    if(!existing)return '<div class="aymp-result-whatsapp"><a target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(message)+'">💬 Discuss My Research on WhatsApp</a></div>';
    const href=existing.getAttribute('href')||'';const base=href.replace(/[?&]text=[^&]*/i,'');
    return '<div class="aymp-result-whatsapp"><a target="_blank" rel="noopener" href="'+esc(base+(base.indexOf('?')>=0?'&':'?')+'text='+encodeURIComponent(message))+'">💬 Discuss My Research on WhatsApp</a></div>';
  }
  async function openResult(){
    const section=document.getElementById('aympLagnaResearchResult');if(!section)return;
    const chart=window.AYMPBirthChart;if(!chart||!chart.lagna)return;
    addStyles();const shell=ensureShell();const body=document.getElementById('aympResultPresentationBody');
    if(section.parentElement!==body)body.appendChild(section);
    const form=document.getElementById('guidanceForm');if(form)form.style.display='none';
    const popup=document.getElementById('guidancePopup');if(popup)popup.style.display='none';
    shell.classList.add('open');resultOpen=true;
    try{
      const values=await Promise.all([loadModel(),loadGuidanceDb()]);
      const old=document.getElementById('aympResultYantraShowcase');if(old)old.remove();
      const showcase=document.createElement('div');showcase.id='aympResultYantraShowcase';showcase.innerHTML=buildYantra(values[0],values[1]);
      const first=section.querySelector('.aymp-lagna-result-grid');if(first)first.insertAdjacentElement('afterend',showcase);else section.insertBefore(showcase,section.firstChild);
      const img=document.getElementById('aympPersonalYantraImage');if(img)img.onerror=function(){if(this.dataset.fallback&&this.src!==new URL(this.dataset.fallback,location.href).href)this.src=this.dataset.fallback;else this.parentElement.innerHTML='<div class="aymp-yantra-placeholder">Yantra image is not available in the current public asset path. The research record is retained.</div>';};
      const oldWa=section.querySelector('.aymp-result-whatsapp');if(oldWa)oldWa.remove();section.insertAdjacentHTML('beforeend',buildWhatsApp(chart));
      const oldNote=section.querySelector('.aymp-result-disclaimer');if(oldNote)oldNote.remove();section.insertAdjacentHTML('beforeend','<p class="aymp-result-disclaimer">AYMP Traditional Research Recommendation — for spiritual/traditional research and consultation purposes. No medical, financial, relationship or life outcome is guaranteed.</p>');
    }catch(e){console.warn('AYMP result presentation:',e);}
  }
  function closeResult(){
    const shell=document.getElementById('aympResultPresentation'),form=document.getElementById('guidanceForm'),popup=document.getElementById('guidancePopup'),section=document.getElementById('aympLagnaResearchResult');
    if(shell)shell.classList.remove('open');
    if(section){const host=document.getElementById('guidanceForm');if(host&&section.parentElement!==host.parentElement)host.parentNode.insertBefore(section,host.nextSibling);}
    if(form)form.style.display='';if(popup)popup.style.display='block';resultOpen=false;
  }
  function watch(){
    window.addEventListener('aymp:birth-chart-updated',function(){setTimeout(openResult,300);});
    // Do not auto-open merely because stale chart data exists. A result opens only after a fresh birth-chart event.
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
  window.AYMPResultPresentation={open:openResult,close:closeResult};
})();
