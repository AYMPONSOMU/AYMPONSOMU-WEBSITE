/* AYMP Vedic Lagna Engine v5
 * Global birth-place/timezone resolution + Swiss Ephemeris + Lahiri sidereal zodiac.
 * The birth-details form must remain clean: no research/result cards or duplicate guidance actions are injected here.
 */
(function(){
'use strict';

const SWISS='https://cdn.jsdelivr.net/npm/@swisseph/browser@1.3.1/+esm';
const GEOCODER='https://nominatim.openstreetmap.org/search';
const TZ_API='https://timeapi.io/api/timezone/coordinate';
const REQUEST_TIMEOUT=15000;
let swissPromise=null;
let activeCalculation=null;
let controlObserver=null;

function withTimeout(promise,label){
  return Promise.race([
    promise,
    new Promise(function(_,reject){
      setTimeout(function(){reject(Error(label+' timed out. Please try again.'));},REQUEST_TIMEOUT);
    })
  ]);
}

async function loadSwiss(){
  if(!swissPromise)swissPromise=withTimeout(import(SWISS),'Swiss Ephemeris loading');
  return swissPromise;
}

async function geocode(place){
  const r=await withTimeout(fetch(GEOCODER+'?format=jsonv2&addressdetails=1&limit=1&q='+encodeURIComponent(place),{headers:{Accept:'application/json'}}),'Birth place lookup');
  if(!r.ok)throw Error('Birth place lookup failed.');
  const a=await withTimeout(r.json(),'Birth place response');
  if(!a.length)throw Error('Birth place not found. Please enter city, region and country.');
  return {lat:Number(a[0].lat),lon:Number(a[0].lon),display:a[0].display_name||place};
}

async function timezone(lat,lon){
  const r=await withTimeout(fetch(TZ_API+'?latitude='+encodeURIComponent(lat)+'&longitude='+encodeURIComponent(lon),{headers:{Accept:'application/json'}}),'Birth-place timezone lookup');
  if(!r.ok)throw Error('Birth-place timezone lookup failed.');
  const x=await withTimeout(r.json(),'Birth-place timezone response');
  const z=x.timeZone||x.timezone||x.ianaTimeZone||x.id;
  if(!z||!String(z).includes('/'))throw Error('A valid IANA timezone could not be resolved for this birth place.');
  return z;
}

function parts(date,zone){
  const p={};
  for(const x of new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date)){
    if(x.type!=='literal')p[x.type]=x.value;
  }
  return p;
}

function offsetMinutes(date,zone){
  const p=parts(date,zone);
  return Math.round((Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-date.getTime())/60000);
}

function localToUTC(dateValue,timeValue,zone){
  const [y,m,d]=dateValue.split('-').map(Number);
  const [hh,mm]=timeValue.split(':').map(Number);
  const localGuess=Date.UTC(y,m-1,d,hh,mm,0);
  const corrected=offsetMinutes(new Date(localGuess),zone);
  return new Date(localGuess-corrected*60000);
}

const names=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const norm=d=>((Number(d)%360)+360)%360;
function signName(d){return names[Math.floor(norm(d)/30)];}
function degText(d){
  const x=norm(d),s=Math.floor(x/30),within=x-s*30,g=Math.floor(within),m=Math.round((within-g)*60);
  return names[s]+' '+(m===60?g+1:g)+'° '+(m===60?0:m)+'′';
}

/*
 * The duplicate "Generate AYMP Personal Research Guidance" control was being
 * inserted dynamically after DOMContentLoaded. A one-time query could miss it.
 * Keep the birth-details screen limited to the single GET MY GUIDANCE action.
 */
function gateResearchControls(calculating){
  const duplicate='generate aymp personal research guidance';
  const gated=['yantra • herb • tantric research','yantra · herb · tantric research','yantra herb tantric research'];

  document.querySelectorAll('button,a,[role="button"]').forEach(function(el){
    const text=String(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();

    if(text.indexOf(duplicate)>=0){
      el.style.display='none';
      el.setAttribute('aria-hidden','true');
      return;
    }

    if(gated.some(function(t){return text.indexOf(t)>=0;})){
      if(calculating){
        el.disabled=true;
        el.setAttribute('aria-disabled','true');
        el.dataset.aympResearchDisabled='1';
        el.style.opacity='.55';
        el.style.pointerEvents='none';
      }else if(el.dataset.aympResearchDisabled==='1'){
        el.disabled=false;
        el.removeAttribute('aria-disabled');
        delete el.dataset.aympResearchDisabled;
        el.style.opacity='';
        el.style.pointerEvents='';
      }
    }
  });
}

function startControlObserver(){
  if(controlObserver||!document.body||typeof MutationObserver==='undefined')return;
  gateResearchControls(false);
  controlObserver=new MutationObserver(function(){gateResearchControls(false);});
  controlObserver.observe(document.body,{childList:true,subtree:true});
}

async function calculate(dateValue,timeValue,place){
  if(!dateValue||!timeValue||!place)throw Error('Date, exact birth time and birth place are required.');

  const loc=await geocode(place);
  const zone=await timezone(loc.lat,loc.lon);
  const utc=localToUTC(dateValue,timeValue,zone);
  const mod=await loadSwiss();

  const SwissEphemeris=mod.SwissEphemeris||mod.default?.SwissEphemeris;
  const HouseSystem=mod.HouseSystem||mod.default?.HouseSystem;
  const SiderealMode=mod.SiderealMode||mod.default?.SiderealMode;
  if(!SwissEphemeris||!HouseSystem)throw Error('Swiss Ephemeris browser module could not be initialized.');

  const swe=new SwissEphemeris();
  try{
    await withTimeout(swe.init(),'Swiss Ephemeris initialization');
    const jd=swe.dateToJulianDay(utc);
    const houseSystem=Math.abs(loc.lat)>66?(HouseSystem.WholeSign??HouseSystem.Equal):HouseSystem.Placidus;
    const houses=swe.calculateHouses(jd,loc.lat,loc.lon,houseSystem);
    if(!houses||typeof houses.ascendant!=='number')throw Error('Ascendant calculation failed.');

    const tropicalAsc=norm(houses.ascendant);
    if(SiderealMode&&SiderealMode.Lahiri!==undefined&&typeof swe.setSiderealMode==='function')swe.setSiderealMode(SiderealMode.Lahiri);
    const ayan=Number(swe.getAyanamsa(jd));
    const siderealAsc=norm(tropicalAsc-ayan);

    return {
      lagna:signName(siderealAsc),
      ascendantDegrees:siderealAsc,
      ascendantText:degText(siderealAsc),
      tropicalAscendantDegrees:tropicalAsc,
      ayanamsa:ayan,
      latitude:loc.lat,
      longitude:loc.lon,
      placeResolved:loc.display,
      timezone:zone,
      birthUTC:utc.toISOString(),
      zodiac:'Sidereal',
      ayanamsaName:'Lahiri',
      houseSystem:houseSystem===HouseSystem.Placidus?'Placidus':(houseSystem===HouseSystem.WholeSign?'Whole Sign':'Equal'),
      julianDay:jd
    };
  }finally{
    try{swe.close();}catch(_){}
  }
}

async function calculateFromForm(){
  if(activeCalculation)return activeCalculation;

  const val=function(selectors){
    for(const s of selectors){
      const e=document.querySelector(s);
      if(e&&e.value)return e.value.trim();
    }
    return '';
  };

  const date=val(['#guidanceDob','[name="dob"]','input[type="date"]']);
  const time=val(['#guidanceTime','[name="birth_time"]','[name="birthTime"]','input[type="time"]']);
  const place=val(['#guidancePlace','[name="birth_place"]','[name="birthPlace"]','[name="place"]']);

  gateResearchControls(true);
  window.dispatchEvent(new CustomEvent('aymp:lagna-calculation-start'));

  activeCalculation=calculate(date,time,place)
    .then(function(result){
      gateResearchControls(false);
      window.dispatchEvent(new CustomEvent('aymp:lagna-calculation-success',{detail:result}));
      return result;
    })
    .catch(function(error){
      gateResearchControls(false);
      window.dispatchEvent(new CustomEvent('aymp:lagna-calculation-error',{detail:{message:error&&error.message?error.message:String(error)}}));
      throw error;
    })
    .finally(function(){activeCalculation=null;});

  return activeCalculation;
}

window.AYMPLagnaEngine={calculate,calculateFromForm};

function boot(){
  gateResearchControls(false);
  startControlObserver();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
