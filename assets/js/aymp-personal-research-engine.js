/* AYMP Personal Research Result Engine v2 */
(function(){
  'use strict';
  const MODEL_URL='data/aymp_model_research_mapping_v1.json';
  const LAGNA_URL='data/aymp_lagna_research_rules_v1.json';
  const GUIDANCE_URL='data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';
  let modelPromise=null,lagnaPromise=null,guidancePromise=null;
  const fetchJson=u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Could not load '+u);return r.json();});
  const loadModel=()=>modelPromise||(modelPromise=fetchJson(MODEL_URL));
  const loadLagna=()=>lagnaPromise||(lagnaPromise=fetchJson(LAGNA_URL));
  const loadGuidance=()=>guidancePromise||(guidancePromise=fetchJson(GUIDANCE_URL));
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function getConcern(){const e=document.querySelector('.research-concern-btn.active,[name="lifeConcern"],#lifeConcern');return e?String(e.value||e.dataset.concern||e.textContent||'').toLowerCase().trim():'';}
  function normalizeConcern(v){if(/business|money|economic|finance|career/.test(v))return 'business';if(/marriage|wedding/.test(v))return 'marriage';if(/love|relationship/.test(v))return 'love_relationship';if(/public|success|reputation/.test(v))return 'public_success';if(/promotion|visibility|advert|marketing/.test(v))return 'promotion_visibility';return 'other';}
  function find(list,id){return (list||[]).find(x=>String(x.id||x.lagna_id||x.lagna||'').toLowerCase()===String(id||'').toLowerCase())||null;}
  function extract(rule,keys){for(const k of keys){if(rule&&rule[k]!=null)return rule[k];if(rule&&rule.research&&rule.research[k]!=null)return rule.research[k];}return []}
  function loadLagnaEngine(){if(window.AYMPLagnaEngine)return Promise.resolve(window.AYMPLagnaEngine);return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='assets/js/aymp-vedic-lagna-engine.js';s.onload=()=>resolve(window.AYMPLagnaEngine);s.onerror=()=>reject(new Error('Lagna engine failed to load'));document.body.appendChild(s);});}
  function render(r){document.getElementById('aympResearchResult')?.remove();const el=document.createElement('section');el.id='aympResearchResult';el.className='research-section research-next-step';el.innerHTML='<h3>🔱 AYMP Personal Research Guidance</h3><div class="research-grid"><div class="research-card"><b>Lagna</b><span>'+esc(r.lagna||'Pending')+'</span></div><div class="research-card"><b>Life Concern</b><span>'+esc(r.concern)+'</span></div><div class="research-card"><b>Research Planets</b><span>'+esc(r.planets.join(', ')||'Pending')+'</span></div><div class="research-card"><b>Birth Time Zone</b><span>'+esc(r.timezone||'Pending')+'</span></div></div><div class="research-section"><h4>🌿 Recommended Research Herbs</h4><div class="research-list">'+(r.herbs.length?r.herbs.map(x=>'<div class="research-row">'+esc(typeof x==='string'?x:(x.name_en||x.id||''))+'</div>').join(''):'<div class="research-row">Pending research mapping</div>')+'</div></div><div class="research-section"><h4>🔱 Recommended Yantras</h4><div class="research-list">'+(r.yantras.length?r.yantras.map(x=>'<div class="research-row">'+esc(typeof x==='string'?x:(x.name_en||x.id||''))+'</div>').join(''):'<div class="research-row">Pending research mapping</div>')+'</div></div><div class="research-section"><h4>🕉️ Mantra / Prayer</h4><div class="research-row">'+esc(r.mantra||'Research reference pending')+'</div></div><p class="research-note">AYMP traditional research recommendation. It does not guarantee financial, medical, relationship or other life outcomes.</p>';const host=document.getElementById('aympPlanetaryResearchSection')||document.getElementById('guidanceForm');if(host)host.parentNode.insertBefore(el,host.nextSibling);}
  async function generate(form,status){
    const [model,lagnaDb,guidance,engine]=await Promise.all([loadModel(),loadLagna(),loadGuidance(),loadLagnaEngine()]);
    const concern=normalizeConcern(getConcern());
    status.textContent='Calculating Lagna from birth place and birth time…';
    const birth=await engine.calculateFromForm();
    const lagna=String(birth.lagna||'').toLowerCase();
    const lagnaRule=find(lagnaDb.lagna_rules||lagnaDb.rules||lagnaDb.lagnas,lagna);
    const modelRule=find(model.lagna_models||model.lagna_mappings||model.rules,lagna);
    const planets=extract(lagnaRule,['planet_group','primary_planets']);
    const mplanets=extract(modelRule,['planet_group','primary_planets']);
    const herbs=extract(modelRule,['herbs','candidate_herbs','research_herbs']);
    const yantras=extract(modelRule,['yantras','candidate_yantras','research_yantras']);
    render({lagna:birth.lagna,concern,planets:Array.isArray(planets)&&planets.length?planets:(Array.isArray(mplanets)?mplanets:[]),herbs:Array.isArray(herbs)?herbs:[],yantras:Array.isArray(yantras)?yantras:[],timezone:birth.timezone,mantra:guidance&&guidance.mantra_research?'Available in research database':'Pending'});
    status.textContent='✓ Lagna calculated with Sidereal Lahiri and research result prepared.';
  }
  function mount(){const form=document.getElementById('guidanceForm');if(!form||document.getElementById('aympPersonalResearchButton'))return;const wrap=document.createElement('div');wrap.innerHTML='<button type="button" id="aympPersonalResearchButton" class="research-primary-btn" style="margin-top:14px;width:100%">🔱 Generate AYMP Personal Research Guidance</button><div id="aympPersonalResearchStatus" class="research-save-status"></div>';form.appendChild(wrap);const btn=wrap.querySelector('#aympPersonalResearchButton');btn.addEventListener('click',async()=>{const s=wrap.querySelector('#aympPersonalResearchStatus');s.textContent='Loading AYMP research databases…';try{await generate(form,s);}catch(e){console.error(e);s.textContent='⚠️ '+e.message;}});}
  window.AYMPPersonalResearchEngine={loadModel,loadLagna,loadGuidance};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
