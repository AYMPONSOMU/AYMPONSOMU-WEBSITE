/* AYMP Personal Research Engine v3
 * Primary action: GET MY GUIDANCE in guidance.js.
 * This compatibility module exposes the research database loaders but does not inject a duplicate button into the birth-details form.
 */
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
  window.AYMPPersonalResearchEngine={loadModel,loadLagna,loadGuidance};
})();
