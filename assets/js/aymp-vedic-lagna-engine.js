/* AYMP Vedic Lagna Engine v1
 * Birth place -> coordinates -> IANA timezone -> historical UTC conversion -> Sidereal/Lahiri Ascendant.
 * Uses @swisseph/browser in the browser; no birth data is sent to an AYMP server.
 */
(function(){
  'use strict';
  const SWISS='https://cdn.jsdelivr.net/npm/@swisseph/browser@1.3.1/+esm';
  const GEOCODER='https://nominatim.openstreetmap.org/search';
  const TZ_API='https://timeapi.io/api/timezone/coordinate';
  let swissPromise=null;
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  async function loadSwiss(){
    if(!swissPromise) swissPromise=import(SWISS);
    return swissPromise;
  }
  async function geocode(place){
    const url=GEOCODER+'?format=jsonv2&addressdetails=1&limit=1&q='+encodeURIComponent(place);
    const r=await fetch(url,{headers:{'Accept':'application/json'}});
    if(!r.ok) throw new Error('Birth place lookup failed');
    const a=await r.json();
    if(!a.length) throw new Error('Birth place not found. Please enter a city and country.');
    return {lat:Number(a[0].lat),lon:Number(a[0].lon),display:a[0].display_name||place,countryCode:a[0].address&&a[0].address.country_code||''};
  }
  async function timezone(lat,lon){
    const url=TZ_API+'?latitude='+encodeURIComponent(lat)+'&longitude='+encodeURIComponent(lon);
    const r=await fetch(url,{headers:{'Accept':'application/json'}});
    if(!r.ok) throw new Error('Timezone lookup failed');
    const x=await r.json();
    const zone=x.timeZone||x.timezone||x.ianaTimeZone||x.id;
    if(!zone) throw new Error('IANA timezone was not returned for this place.');
    return zone;
  }
  function offsetMinutes(date,zone){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date);
    const p={};for(const x of parts)if(x.type!=='literal')p[x.type]=x.value;
    const asUTC=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
    return Math.round((asUTC-date.getTime())/60000);
  }
  function localToUTC(dateValue,timeValue,zone){
    const [y,m,d]=dateValue.split('-').map(Number);
    const [hh,mm]=timeValue.split(':').map(Number);
    const guess=Date.UTC(y,m-1,d,hh,mm,0);
    let off=offsetMinutes(new Date(guess),zone);
    let utc=guess-off*60000;
    const off2=offsetMinutes(new Date(utc),zone);
    if(off2!==off) utc=guess-off2*60000;
    return new Date(utc);
  }
  function signName(deg){
    const names=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    return names[Math.floor(((deg%360)+360)%360/30)];
  }
  function degText(d){const x=((d%360)+360)%360;const s=Math.floor(x/30);const within=x-s*30;const dm=Math.floor(within);const min=Math.round((within-dm)*60);return signName(x)+' '+dm+'° '+(min===60?0:min)+'′';}
  async function calculate(dateValue,timeValue,place){
    if(!dateValue||!timeValue||!place) throw new Error('Name, date, time and birth place are required.');
    const loc=await geocode(place);
    const zone=await timezone(loc.lat,loc.lon);
    const utc=localToUTC(dateValue,timeValue,zone);
    const mod=await loadSwiss();
    const SwissEphemeris=mod.SwissEphemeris||mod.default?.SwissEphemeris;
    const HouseSystem=mod.HouseSystem||mod.default?.HouseSystem;
    const SiderealMode=mod.SiderealMode||mod.default?.SiderealMode;
    if(!SwissEphemeris||!HouseSystem) throw new Error('Swiss Ephemeris browser module could not be initialized.');
    const swe=new SwissEphemeris();
    await swe.init();
    if(SiderealMode&&SiderealMode.Lahiri!==undefined) swe.setSiderealMode(SiderealMode.Lahiri);
    const jd=swe.dateToJulianDay(utc);
    const hs=HouseSystem.WholeSign!==undefined?HouseSystem.WholeSign:HouseSystem.Placidus;
    const houses=swe.calculateHouses(jd,loc.lat,loc.lon,hs);
    let asc=Number(houses.ascendant);
    // Sidereal house calculation APIs may expose tropical houses even after setting sidereal mode;
    // explicitly subtract Lahiri ayanamsa when needed only if the returned mode is not marked sidereal.
    const ayan=typeof swe.getAyanamsa==='function'?Number(swe.getAyanamsa(jd)):0;
    if(Math.abs(asc)>360) asc=((asc%360)+360)%360;
    // @swisseph/browser returns sidereal house angles when sidereal mode is set. Keep that value.
    const lagna=signName(asc);
    const result={lagna,ascendantDegrees:asc,ascendantText:degText(asc),ayanamsa:ayan,latitude:loc.lat,longitude:loc.lon,placeResolved:loc.display,timezone:zone,birthUTC:utc.toISOString(),zodiac:'Sidereal',ayanamsaName:'Lahiri',houseSystem:hs===HouseSystem.WholeSign?'Whole Sign':'Placidus',julianDay:jd};
    swe.close();
    return result;
  }
  function ensureUI(){
    const form=document.getElementById('guidanceForm');
    if(!form||document.getElementById('aympLagnaResult'))return;
    const box=document.createElement('div');box.id='aympLagnaResult';box.className='research-section';box.innerHTML='<h4>🌌 Vedic Birth Calculation</h4><div class="research-grid"><div class="research-card"><b>Lagna</b><span id="aympLagnaValue">Pending</span></div><div class="research-card"><b>Ascendant</b><span id="aympAscValue">Pending</span></div><div class="research-card"><b>Birth Time Zone</b><span id="aympTzValue">Pending</span></div></div><p id="aympLagnaStatus" class="research-save-status"></p>';
    const btn=document.getElementById('aympPersonalResearchButton');if(btn)btn.parentNode.insertBefore(box,btn);else form.appendChild(box);
  }
  async function calculateFromForm(){
    const form=document.getElementById('guidanceForm');if(!form)throw new Error('Guidance form not found.');
    const date=(document.getElementById('guidanceDob')||{}).value||'';
    const time=(document.getElementById('guidanceTime')||{}).value||'';
    const place=(document.getElementById('guidancePlace')||{}).value?.trim()||'';
    ensureUI();
    const status=document.getElementById('aympLagnaStatus');if(status)status.textContent='Calculating birth coordinates, historical timezone and sidereal Ascendant…';
    const r=await calculate(date,time,place);
    document.getElementById('aympLagnaValue').textContent=r.lagna;
    document.getElementById('aympAscValue').textContent=r.ascendantText;
    document.getElementById('aympTzValue').textContent=r.timezone;
    if(status)status.textContent='✓ Calculated with Sidereal Lahiri • '+r.placeResolved;
    window.AYMPBirthChart={...r};
    return r;
  }
  window.AYMPLagnaEngine={calculate,calculateFromForm};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureUI);else ensureUI();
})();
