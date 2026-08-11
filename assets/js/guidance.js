// AYMP Personal Guidance + Sacred Music
// Global birth calculation is performed before the personal research result.

document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('guidancePopup');
  const openBtn = document.getElementById('openGuidanceBtn');
  const closeBtn = document.querySelector('.close-popup');
  const form = document.getElementById('guidanceForm');

  const musicFiles = [
    'blue-silence.mp3','celestial-breath.mp3','cosmic-peace.mp3','divine-glow.mp3','goldan-energy.mp3','heart-hermony.mp3','inner-light.mp3','moon-serenity.mp3','mystic-guidance.mp3','power-art-awakening.mp3','sacred-space.mp3'
  ];
  const patterns = [
    ['Peace','OM • SHREEM • AIM • HREEM • YAV • VAV • OM','Peace, calmness and inner clarity.'],['Clarity','AIM • HREEM • KLEEM • YAV • SANG • MANG • AIM','Clear thinking and thoughtful decisions.'],['Confidence','SHREEM • KLEEM • HREEM • SHAV • VAV • YAV • SHREEM','Courage and self-confidence.'],['Positive Beginning','OM • AIM • SHREEM • YAV • VASI • HREEM • OM','A positive and peaceful beginning.'],['Focus','AIM • YAV • YAV • SANG • MANG • NANG • AIM','Concentration and disciplined attention.'],['Emotional Balance','HREEM • VAV • YAV • MANG • NANG • YASI • HREEM','Emotional balance and calm reflection.'],['Patience','OM • VAV • MANG • NANG • YAV • SANG • OM','Patience during difficult situations.'],['Inner Strength','HREEM • SHAV • VAV • MANG • YAV • KLEEM • HREEM','Inner strength and resilience.'],['Hope','SHREEM • YAV • AIM • VASI • YASI • OM • SHREEM','Hope and positive expectation.'],['Protection','OM • HREEM • SHAV • VAV • MANG • NANG • OM','A sense of safety, courage and protection.'],['Wisdom','AIM • SANG • MANG • YAV • VANG • HREEM • AIM','Wisdom before action.'],['Communication','YAV • VAV • AIM • YASI • VASI • MANG • YAV','Clear and respectful communication.'],['Harmony','KLEEM • SHREEM • YAV • VASI • YASI • HREEM • KLEEM','Harmony in relationships.'],['Forgiveness','OM • MANG • NANG • YASI • VASI • YAV • OM','Letting go of anger and moving toward forgiveness.'],['Renewal','SHREEM • HREEM • YAV • AIM • VAV • YASI • SHREEM','A fresh beginning.'],['Motivation','KLEEM • AIM • MANG • YAV • VANG • HREEM • KLEEM','Motivation to take constructive action.'],['Stability','VANG • MANG • NANG • YAV • VAV • SHREEM • VANG','Stability and grounded thinking.'],['Creativity','AIM • YASI • VASI • MANG • SANG • YAV • AIM','Creativity and new ideas.'],['Positive Relationships','KLEEM • VASI • YASI • MASI • YAV • SHREEM • KLEEM','Kindness, understanding and healthy relationships.'],['Letting Go','OM • NASI • YASI • VAV • NANG • HREEM • OM','Release unnecessary worry and mental tension.'],['Gratitude','SHREEM • AIM • OM • YAV • VASI • HREEM • SHREEM','Gratitude for the good things in life.'],['Inner Silence','OM • HREEM • OM • YAV • NANG • OM • HREEM','Quiet reflection and mindfulness.'],['Determination','KLEEM • MANG • YAV • VANG • SANG • HREEM • KLEEM','Determination to complete meaningful goals.'],['Understanding','AIM • SANG • VANG • YASI • VASI • YAV • AIM','Understanding before judgment.'],['Balance','SHREEM • HREEM • VAV • YAV • MANG • AIM • SHREEM','Balance between thought, emotion and action.'],['Transformation','OM • KLEEM • HREEM • MANG • YAV • VASI • OM','Positive personal transformation.'],['Compassion','YASI • VASI • NASI • YAV • MANG • SHREEM • YASI','Compassion toward yourself and others.'],['Gratitude & Hope','SHREEM • OM • YAV • AIM • HREEM • VASI • SHREEM','Gratitude today and hope for tomorrow.'],['Personal Intention','AIM • HREEM • KLEEM • YAV • VAV • SHREEM • OM','Hold one clear personal intention.'],['Universal Peace','OM • SHREEM • AIM • HREEM • KLEEM • YAV • SHREEM • OM','Peace, understanding and goodwill for all.']
  ];
  let audio=null;
  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});}
  function stopMusic(){if(audio){audio.pause();audio.currentTime=0;audio=null;}}
  function playFile(file){stopMusic();audio=new Audio('assets/'+file);audio.loop=true;audio.volume=0.65;const status=document.getElementById('musicStatus');audio.play().then(function(){if(status)status.textContent='🎵 Sacred music playing...';}).catch(function(){if(status)status.textContent='Tap ▶ PLAY SACRED MUSIC to start.';});audio.onerror=function(){if(status)status.textContent='⚠️ Music file could not be loaded: '+file;};}
  function showGuidance(index,name,dob,time,place,chart){
    const p=patterns[index],music=musicFiles[index%musicFiles.length],box=popup.querySelector('.guidance-content');if(!box)return;
    box.innerHTML=`<div class="aymp-guidance-result"><span class="close-popup" id="resultClose">×</span><div class="power-art-glow"><div class="energy-orbit"></div><div class="power-core">✦</div></div><h2>✨ AYMP PERSONAL GUIDANCE</h2><h3>Welcome, ${esc(name)}</h3><div class="birth-summary"><p>📅 <strong>Date:</strong> ${esc(dob)}</p><p>⏰ <strong>Time:</strong> ${esc(time)}</p><p>📍 <strong>Place:</strong> ${esc(place)}</p>${chart?`<p>🌌 <strong>Lagna:</strong> ${esc(chart.lagna)} (${esc(chart.ascendantText)})</p><p>🕰️ <strong>Time Zone:</strong> ${esc(chart.timezone)}</p>`:''}</div><div class="guidance-card"><h3>🌌 Your Cosmic Insight</h3><p>${esc(p[2])}</p></div><div class="sound-card"><div class="sound-label">🔱 AYMP SACRED MANTRA</div><div id="changingSound" class="changing-sound sound-animate">${esc(p[1])}</div><div class="sound-title">${esc(p[0])}</div><div class="music-panel"><div id="musicName">🎵 ${esc(music)}</div><button type="button" id="playMusicBtn">▶ PLAY SACRED MUSIC</button><button type="button" id="pauseMusicBtn">⏸ PAUSE</button><button type="button" id="stopMusicBtn">⏹ STOP</button><p id="musicStatus">🎵 Sacred music ready.</p></div></div><div class="guidance-card"><h3>🙏 Mantra Meaning</h3><p>${esc(p[2])}</p></div><div class="practice-card"><h3>🧘 Practice</h3><p>Repeat the mantra <strong>108 times</strong> if suitable for your personal practice.</p></div><button type="button" id="anotherGuidanceBtn">🔮 EXPERIENCE ANOTHER GUIDANCE</button></div>`;
    document.getElementById('resultClose').onclick=function(){stopMusic();popup.style.display='none';};
    document.getElementById('playMusicBtn').onclick=function(){if(!audio)playFile(music);else audio.play().catch(function(){});};
    document.getElementById('pauseMusicBtn').onclick=function(){if(audio){audio.pause();document.getElementById('musicStatus').textContent='⏸ Sacred music paused.';}};
    document.getElementById('stopMusicBtn').onclick=function(){stopMusic();document.getElementById('musicStatus').textContent='⏹ Sacred music stopped.';};
    document.getElementById('anotherGuidanceBtn').onclick=function(){const n=Math.floor(Math.random()*patterns.length);showGuidance(n,name,dob,time,place,chart);playFile(musicFiles[n%musicFiles.length]);};
    playFile(music);
  }
  if(openBtn)openBtn.onclick=function(){popup.style.display='block';};
  if(closeBtn)closeBtn.onclick=function(){stopMusic();popup.style.display='none';};
  if(form)form.addEventListener('submit',async function(e){
    e.preventDefault();
    const name=(document.getElementById('guidanceName')||{}).value?.trim()||'',dob=(document.getElementById('guidanceDob')||{}).value||'',time=(document.getElementById('guidanceTime')||{}).value||'',place=(document.getElementById('guidancePlace')||{}).value?.trim()||'';
    if(!name||!dob||!time||!place){alert('Please enter Name, Date of Birth, Birth Time and Place.');return;}
    try{
      if(!window.AYMPLagnaEngine||typeof window.AYMPLagnaEngine.calculateFromForm!=='function')throw Error('Global Lagna engine is not loaded.');
      const chart=await window.AYMPLagnaEngine.calculateFromForm();
      let total=0;for(const c of name)total+=c.charCodeAt(0);for(const c of dob)if(!isNaN(parseInt(c)))total+=parseInt(c);for(const c of time)if(!isNaN(parseInt(c)))total+=parseInt(c);for(const c of place)total+=c.charCodeAt(0);
      showGuidance(total%patterns.length,name,dob,time,place,chart);
    }catch(err){console.error(err);alert('Lagna calculation could not be completed. Please check the birth date, exact birth time and birth place.\n\n'+err.message);return;}
  });
  (function loadAYMPResearchModules(){
    if(document.getElementById('aympVedicLagnaLoader'))return;
    const lagna=document.createElement('script');lagna.id='aympVedicLagnaLoader';lagna.src='assets/js/aymp-vedic-lagna-engine.js';lagna.defer=true;document.body.appendChild(lagna);
    const planetary=document.createElement('script');planetary.id='aympPlanetaryResearchLoader';planetary.src='assets/js/planetary-research-db.js';planetary.defer=true;document.body.appendChild(planetary);
    const personal=document.createElement('script');personal.id='aympPersonalResearchEngineLoader';personal.src='assets/js/aymp-personal-research-engine.js';personal.defer=true;document.body.appendChild(personal);
    const css=document.createElement('link');css.rel='stylesheet';css.href='assets/css/yantra-herb-research.css';document.head.appendChild(css);
    const script=document.createElement('script');script.id='aympYantraHerbResearchLoader';script.src='assets/js/yantra-herb-research.js';script.defer=true;document.body.appendChild(script);
    const lagnaResearch=document.createElement('script');lagnaResearch.id='aympLagnaResearchResultLoader';lagnaResearch.src='assets/js/aymp-lagna-research-result.js';lagnaResearch.defer=true;document.body.appendChild(lagnaResearch);
  })();
  console.log('AYMP Personal Guidance Engine Ready');
});
