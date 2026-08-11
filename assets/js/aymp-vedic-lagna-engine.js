/* AYMP Vedic Lagna Engine v2 - explicit tropical Ascendant minus Lahiri ayanamsa */
(function(){
'use strict';
const SWISS='https://cdn.jsdelivr.net/npm/@swisseph/browser@1.3.1/+esm',GEOCODER='https://nominatim.openstreetmap.org/search',TZ_API='https://timeapi.io/api/timezone/coordinate';
let swissPromise=null;
async function loadSwiss(){if(!swissPromise)swissPromise=import(SWISS);return swissPromise;}
async function geocode(place){const r=await fetch(GEOCODER+'?format=jsonv2&addressdetails=1&limit=1&q='+encodeURIComponent(place),{headers:{Accept:'application/json'}});if(!r.ok)throw Error('Birth place lookup failed');const a=await r.json();if(!a.length)throw Error('Birth place not found. Please enter city and country.');return{lat:Number(a[0].lat),lon:Number(a[0].lon),display:a[0].display_name||place};}
async function timezone(lat,lon){const r=await fetch(TZ_API+'?latitude='+encodeURIComponent(lat)+'&longitude='+encodeURIComponent(lon),{headers:{Accept:'application/json'}});if(!r.ok)throw Error('Timezone lookup failed');const x=await r.json(),z=x.timeZone||x.timezone||x.ianaTimeZone||x.id;if(!z)throw Error('IANA timezone unavailable');return z;}
function offsetMinutes(date,zone){const p={};for(const x of new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date))if(x.type!=='literal')p[x.type]=x.value;return Math.round((Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-date.getTime())/60000);}
function localToUTC(dateValue,timeValue,zone){const[y,m,d]=dateValue.split('-').map(Number),[hh,mm]=timeValue.split(':').map(Number),guess=Date.UTC(y,m-1,d,hh,mm,0);let off=offsetMinutes(new Date(guess),zone),utc=guess-off*60000,off2=offsetMinutes(new Date(utc),zone);if(off2!==off)utc=guess-off2*60000;return new Date(utc);}
const names=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const norm=d=>((Number(d)%360)+360)%360,signName=d=>names[Math.floor(norm(d)/30)];
function degText(d){const x=norm(d),s=Math.floor(x/30),w=x-s*30,g=Math.floor(w),m=Math.round((w-g)*60);return names[s]+' '+g+'° '+(m===60?0:m)+'′';}
async function calculate(dateValue,timeValue,place){
 if(!dateValue||!timeValue||!place)throw Error('Date, exact birth time and birth place are required.');
 const loc=await geocode(place),zone=await timezone(loc.lat,loc.lon),utc=localToUTC(dateValue,timeValue,zone),mod=await loadSwiss();
 const SwissEphemeris=mod.SwissEphemeris||mod.default?.SwissEphemeris,HouseSystem=mod.HouseSystem||mod.default?.HouseSystem;if(!SwissEphemeris||!HouseSystem)throw Error('Swiss Ephemeris browser module could not be initialized.');
 const swe=new SwissEphemeris();await swe.init();
 const jd=swe.dateToJulianDay(utc),hs=HouseSystem.Placidus!==undefined?HouseSystem.Placidus:HouseSystem.WholeSign,raw=swe.calculateHouses(jd,loc.lat,loc.lon,hs);
 const tropicalAsc=norm(raw.ascendant),ayan=Number(swe.getAyanamsa(jd)),siderealAsc=norm(tropicalAsc-ayan);
 const result={lagna:signName(siderealAsc),ascendantDegrees:siderealAsc,ascendantText:degText(siderealAsc),tropicalAscendantDegrees:tropicalAsc,ayanamsa:ayan,latitude:loc.lat,longitude:loc.lon,placeResolved:loc.display,timezone:zone,birthUTC:utc.toISOString(),zodiac:'Sidereal',ayanamsaName:'Lahiri',houseSystem:hs===HouseSystem.Placidus?'Placidus':'Whole Sign',julianDay:jd};swe.close();return result;
}
function val(sel){for(const s of sel){const e=document.querySelector(s);if(e&&e.value)return e.value.trim();}return '';}
function ensureUI(){const form=document.getElementById('guidanceForm');if(!form||document.getElementById('aympLagnaResult'))return;const box=document.createElement('div');box.id='aympLagnaResult';box.className='research-section';box.innerHTML='<h4>🌌 Vedic Birth Calculation</h4><div class="research-grid"><div class="research-card"><b>Lagna</b><span id="aympLagnaValue">Pending</span></div><div class="research-card"><b>Ascendant</b><span id="aympAscValue">Pending</span></div><div class="research-card"><b>Birth Time Zone</b><span id="aympTzValue">Pending</span></div></div><p id="aympLagnaStatus" class="research-save-status"></p>';const btn=document.getElementById('aympPersonalResearchButton');if(btn)btn.parentNode.insertBefore(box,btn);else form.appendChild(box);}
async function calculateFromForm(){const date=val(['#guidanceDob','[name="dob"]','input[type="date"]']),time=val(['#guidanceTime','[name="birth_time"]','[name="birthTime"]','input[type="time"]']),place=val(['#guidancePlace','[name="birth_place"]','[name="birthPlace"]','[name="place"]']);ensureUI();const status=document.getElementById('aympLagnaStatus');if(status)status.textContent='Calculating tropical Ascendant → Lahiri sidereal Lagna…';const r=await calculate(date,time,place);document.getElementById('aympLagnaValue').textContent=r.lagna;document.getElementById('aympAscValue').textContent=r.ascendantText;document.getElementById('aympTzValue').textContent=r.timezone;if(status)status.textContent='✓ Sidereal Lahiri calculation • '+r.placeResolved;window.AYMPBirthChart={...r};return r;}
window.AYMPLagnaEngine={calculate,calculateFromForm};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureUI);else ensureUI();
})();
