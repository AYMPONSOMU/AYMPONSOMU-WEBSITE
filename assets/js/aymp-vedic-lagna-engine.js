/* AYMP Vedic Lagna Engine v3
 * Global birth-place/timezone resolution + Swiss Ephemeris + Lahiri sidereal zodiac.
 */
(function(){
'use strict';
const SWISS='https://cdn.jsdelivr.net/npm/@swisseph/browser@1.3.1/+esm';
const GEOCODER='https://nominatim.openstreetmap.org/search';
const TZ_API='https://timeapi.io/api/timezone/coordinate';
let swissPromise=null;
async function loadSwiss(){if(!swissPromise)swissPromise=import(SWISS);return swissPromise;}
async function geocode(place){
 const r=await fetch(GEOCODER+'?format=jsonv2&addressdetails=1&limit=1&q='+encodeURIComponent(place),{headers:{Accept:'application/json'}});
 if(!r.ok)throw Error('Birth place lookup failed.');
 const a=await r.json();
 if(!a.length)throw Error('Birth place not found. Please enter city, region and country.');
 return {lat:Number(a[0].lat),lon:Number(a[0].lon),display:a[0].display_name||place};
}
async function timezone(lat,lon){
 const r=await fetch(TZ_API+'?latitude='+encodeURIComponent(lat)+'&longitude='+encodeURIComponent(lon),{headers:{Accept:'application/json'}});
 if(!r.ok)throw Error('Birth-place timezone lookup failed.');
 const x=await r.json();
 const z=x.timeZone||x.timezone||x.ianaTimeZone||x.id;
 if(!z||!String(z).includes('/'))throw Error('A valid IANA timezone could not be resolved for this birth place.');
 return z;
}
function parts(date,zone){
 const p={};
 for(const x of new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date))if(x.type!=='literal')p[x.type]=x.value;
 return p;
}
function offsetMinutes(date,zone){
 const p=parts(date,zone);
 return Math.round((Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-date.getTime())/60000);
}
function localToUTC(dateValue,timeValue,zone){
 const [y,m,d]=dateValue.split('-').map(Number),[hh,mm]=timeValue.split(':').map(Number);
 const localGuess=Date.UTC(y,m-1,d,hh,mm,0);
 let utc=localGuess-offsetMinutes(new Date(localGuess),zone)*60000;
 const corrected=offsetMinutes(new Date(utc),zone);
 const correctedUtc=localGuess-corrected*60000;
 return new Date(correctedUtc);
}
const names=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const norm=d=>((Number(d)%360)+360)%360;
function signName(d){return names[Math.floor(norm(d)/30)];}
function degText(d){const x=norm(d),s=Math.floor(x/30),within=x-s*30,g=Math.floor(within),m=Math.round((within-g)*60);return names[s]+' '+(m===60?g+1:g)+'° '+(m===60?0:m)+'′';}
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
 await swe.init();
 const jd=swe.dateToJulianDay(utc);
 /* Houses are returned as ecliptic longitudes. We calculate the tropical ASC and
    convert it to Lahiri sidereal longitude explicitly, which avoids relying on
    an implicit global sidereal setting. */
 const houseSystem=Math.abs(loc.lat)>66?(HouseSystem.WholeSign??HouseSystem.Equal):HouseSystem.Placidus;
 const houses=swe.calculateHouses(jd,loc.lat,loc.lon,houseSystem);
 if(!houses||typeof houses.ascendant!=='number')throw Error('Ascendant calculation failed.');
 const tropicalAsc=norm(houses.ascendant);
 let ayan;
 if(SiderealMode&&SiderealMode.Lahiri!==undefined&&typeof swe.setSiderealMode==='function'){
   swe.setSiderealMode(SiderealMode.Lahiri);
 }
 ayan=Number(swe.getAyanamsa(jd));
 const siderealAsc=norm(tropicalAsc-ayan);
 const result={lagna:signName(siderealAsc),ascendantDegrees:siderealAsc,ascendantText:degText(siderealAsc),tropicalAscendantDegrees:tropicalAsc,ayanamsa:ayan,latitude:loc.lat,longitude:loc.lon,placeResolved:loc.display,timezone:zone,birthUTC:utc.toISOString(),zodiac:'Sidereal',ayanamsaName:'Lahiri',houseSystem:houseSystem===HouseSystem.Placidus?'Placidus':(houseSystem===HouseSystem.WholeSign?'Whole Sign':'Equal'),julianDay:jd};
 swe.close();
 return result;
}
function val(sel){for(const s of sel){const e=document.querySelector(s);if(e&&e.value)return e.value.trim();}return '';}
function ensureUI(){
 const form=document.getElementById('guidanceForm');if(!form||document.getElementById('aympLagnaResult'))return;
 const box=document.createElement('div');box.id='aympLagnaResult';box.className='research-section';
 box.innerHTML='<h4>🌌 Vedic Birth Calculation</h4><div class="research-grid"><div class="research-card"><b>Lagna</b><span id="aympLagnaValue">Pending</span></div><div class="research-card"><b>Ascendant</b><span id="aympAscValue">Pending</span></div><div class="research-card"><b>Birth Time Zone</b><span id="aympTzValue">Pending</span></div></div><p id="aympLagnaStatus" class="research-save-status"></p>';
 const btn=document.getElementById('aympPersonalResearchButton');if(btn)btn.parentNode.insertBefore(box,btn);else form.appendChild(box);
}
async function calculateFromForm(){
 const date=val(['#guidanceDob','[name="dob"]','input[type="date"]']);
 const time=val(['#guidanceTime','[name="birth_time"]','[name="birthTime"]','input[type="time"]']);
 const place=val(['#guidancePlace','[name="birth_place"]','[name="birthPlace"]','[name="place"]']);
 ensureUI();
 const status=document.getElementById('aympLagnaStatus');if(status)status.textContent='Resolving birthplace timezone and calculating Lahiri sidereal Lagna…';
 const r=await calculate(date,time,place);
 document.getElementById('aympLagnaValue').textContent=r.lagna;
 document.getElementById('aympAscValue').textContent=r.ascendantText;
 document.getElementById('aympTzValue').textContent=r.timezone;
 if(status)status.textContent='✓ Global timezone + Lahiri sidereal calculation • '+r.placeResolved;
 window.AYMPBirthChart={...r};
 return r;
}
window.AYMPLagnaEngine={calculate,calculateFromForm};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureUI);else ensureUI();
})();
