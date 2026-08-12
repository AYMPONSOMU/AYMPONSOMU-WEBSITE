// AYMP Personal Guidance + Sacred Music
// Stable flow: Birth Details -> Personal Guidance Result -> Yantra/Herb/Thanthreeg Research -> Cosmic Time Wheel.
document.addEventListener('DOMContentLoaded',function(){
  const popup=document.getElementById('guidancePopup');
  const openBtn=document.getElementById('openGuidanceBtn');
  const closeBtn=document.querySelector('.close-popup');
  const form=document.getElementById('guidanceForm');
  const musicFiles=['blue-silence.mp3','celestial-breath.mp3','cosmic-peace.mp3','divine-glow.mp3','goldan-energy.mp3','heart-hermony.mp3','inner-light.mp3','moon-serenity.mp3','mystic-guidance.mp3','power-art-awakening.mp3','sacred-space.mp3'];
  const patterns=[
    ['Peace','OM • SHREEM • AIM • HREEM • YAV • VAV • OM','Peace, calmness and inner clarity.'],
    ['Clarity','AIM • HREEM • KLEEM • YAV • SANG • MANG • AIM','Clear thinking and thoughtful decisions.'],
    ['Confidence','SHREEM • KLEEM • HREEM • SHAV • VAV • YAV • SHREEM','Courage and self-confidence.'],
    ['Positive Beginning','OM • AIM • SHREEM • YAV • VASI • HREEM • OM','A positive and peaceful beginning.'],
    ['Focus','AIM • YAV • YAV • SANG • MANG • NANG • AIM','Concentration and disciplined attention.'],
    ['Emotional Balance','HREEM • VAV • YAV • MANG • NANG • YASI • HREEM','Emotional balance and calm reflection.'],
    ['Patience','OM • VAV • MANG • NANG • YAV • SANG • OM','Patience during difficult situations.'],
    ['Inner Strength','HREEM • SHAV • VAV • MANG • YAV • KLEEM • HREEM','Inner strength and resilience.'],
    ['Hope','SHREEM • YAV • AIM • VASI • YASI • OM • SHREEM','Hope and positive expectation.'],
    ['Protection','OM • HREEM • SHAV • VAV • MANG • NANG • OM','A sense of safety, courage and protection.'],
    ['Wisdom','AIM • SANG • MANG • YAV • VANG • HREEM • AIM','Wisdom before action.'],
    ['Communication','YAV • VAV • AIM • YASI • VASI • MANG • YAV','Clear and respectful communication.'],
    ['Harmony','KLEEM • SHREEM • YAV • VASI • YASI • HREEM • KLEEM','Harmony in relationships.'],
    ['Forgiveness','OM • MANG • NANG • YASI • VASI • YAV • OM','Letting go of anger and moving toward forgiveness.'],
    ['Renewal','SHREEM • HREEM • YAV • AIM • VAV • YASI • SHREEM','A fresh beginning.'],
    ['Motivation','KLEEM • AIM • MANG • YAV • VANG • HREEM • KLEEM','Motivation to take constructive action.'],
    ['Stability','VANG • MANG • NANG • YAV • VAV • SHREEM • VANG','Stability and grounded thinking.'],
    ['Creativity','AIM • YASI • VASI • MANG • SANG • YAV • AIM','Creativity and new ideas.'],
    ['Positive Relationships','KLEEM • VASI • YASI • MASI • YAV • SHREEM • KLEEM','Kindness, understanding and healthy relationships.'],
    ['Letting Go','OM • NASI • YASI • VAV • NANG • HREEM • OM','Release unnecessary worry and mental tension.'],
    ['Gratitude','SHREEM • AIM • OM • YAV • VASI • HREEM • SHREEM','Gratitude for the good things in life.'],
    ['Inner Silence','OM • HREEM • OM • YAV • NANG • OM • HREEM','Quiet reflection and mindfulness.'],
    ['Determination','KLEEM • MANG • YAV • VANG • SANG • HREEM • KLEEM','Determination to complete meaningful goals.'],
    ['Understanding','AIM • SANG • VANG • YASI • VASI • YAV • AIM','Understanding before judgment.'],
    ['Balance','SHREEM • HREEM • VAV • YAV • MANG • AIM • SHREEM','Balance between thought, emotion and action.'],
    ['Transformation','OM • KLEEM • HREEM • MANG • YAV • VASI • OM','Positive personal transformation.'],
    ['Compassion','YASI • VASI • NASI • YAV • MANG • SHREEM • YASI','Compassion toward yourself and others.'],
    ['Gratitude & Hope','SHREEM • OM • YAV • AIM • HREEM • VASI • SHREEM','Gratitude today and hope for tomorrow.'],
    ['Personal Intention','AIM • HREEM • KLEEM • YAV • VAV • SHREEM • OM','Hold one clear personal intention.'],
    ['Universal Peace','OM • SHREEM • AIM • HREEM • KLEEM • YAV • SHREEM • OM','Peace, understanding and goodwill for all.']
  ];
  let audio=null;

  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});}
  function stopMusic(){if(audio){audio.pause();audio.currentTime=0;audio=null;}}
  function playFile(file){
    stopMusic();audio=new Audio('assets/'+file);audio.loop=true;audio.volume=.65;
    const s=document.getElementById('musicStatus');
    audio.play().then(function(){if(s)s.textContent='🎵 Sacred music playing...';}).catch(function(){if(s)s.textContent='Tap ▶ PLAY SACRED MUSIC to start.';});
    audio.onerror=function(){if(s)s.textContent='⚠️ Music file could not be loaded: '+file;};
  }

  function cleanStaleResearchUI(){
    // A previous successful chart can remain in window memory when the popup is reopened.
    // Never let research modules render inside the birth-details form.
    window.AYMPBirthChart=null;
    ['aympLagnaResearchResult','aympPlanetaryResearchSection','aympPersonalResearchCycle','aympGuidanceResearchButtonWrap','aympGuidanceCosmicWheelButtonWrap'].forEach(function(id){const el=document.getElementById(id);if(el)el.remove();});
    const oldButtons=document.querySelectorAll('button,a,[role="button"]');
    oldButtons.forEach(function(el){const t=String(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();if(t.indexOf('generate aymp personal research guidance')>=0)el.remove();});
  }

  function getResearchSection(box){const section=box.querySelector('#aympLagnaResearchResult');if(section){section.style.display='none';return section;}return null;}

  function addResearchButton(box){
    const old=document.getElementById('aympGuidanceResearchButtonWrap');if(old)old.remove();
    const wrap=document.createElement('div');wrap.id='aympGuidanceResearchButtonWrap';
    wrap.style.cssText='margin-top:18px;padding:15px;border:1px solid rgba(255,215,120,.28);border-radius:16px;background:linear-gradient(135deg,rgba(100,55,150,.18),rgba(255,215,120,.05));';
    wrap.innerHTML='<button type="button" id="aympGuidanceResearchButton" style="width:100%;padding:15px;border:1px solid rgba(255,215,120,.5);border-radius:12px;background:linear-gradient(135deg,#2d1648,#5d3a78);color:#ffe39a;font-size:16px;font-weight:800;cursor:pointer;">🔱 YANTRA • HERB • THANTHREEG RESEARCH<span style="display:block;margin-top:5px;color:#fff;opacity:.68;font-size:11px;font-weight:500;">View your personalized traditional research recommendation</span></button>';
    const root=box.querySelector('.aymp-guidance-result');if(root)root.appendChild(wrap);else box.appendChild(wrap);
    const b=document.getElementById('aympGuidanceResearchButton');
    if(b)b.onclick=function(){if(window.AYMPResultPresentation&&typeof window.AYMPResultPresentation.open==='function')window.AYMPResultPresentation.open();else alert('Yantra Research is still loading. Please try again in a moment.');};
  }

  function addCosmicWheelButton(box){
    const root=box.querySelector('.aymp-guidance-result');if(!root||document.getElementById('aympGuidanceCosmicWheelButton'))return;
    const wrap=document.createElement('div');wrap.id='aympGuidanceCosmicWheelButtonWrap';wrap.style.cssText='margin-top:12px;padding:0 15px 18px;';
    const b=document.createElement('button');b.type='button';b.id='aympGuidanceCosmicWheelButton';b.textContent='🎡 AYMP COSMIC TIME WHEEL • Rare Research Gifts';
    b.style.cssText='width:100%;padding:16px;border:1px solid rgba(255,215,120,.55);border-radius:12px;background:linear-gradient(135deg,#241142,#70439a);color:#ffe39a;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 0 24px rgba(190,120,255,.16);';
    b.onclick=function(){const overlay=document.getElementById('aympCosmicWheelOverlay');const original=document.getElementById('aympCosmicWheelButton');if(overlay){overlay.classList.add('open');if(original&&typeof original.onclick==='function')original.onclick();}else if(original)original.click();else alert('Cosmic Time Wheel is still loading. Please try again in a moment.');};
    wrap.appendChild(b);root.appendChild(wrap);
  }

  function showGuidance(index,name,dob,time,place,chart){
    const p=patterns[index],music=musicFiles[index%musicFiles.length],box=popup.querySelector('.guidance-content');if(!box)return;
    const researchSection=getResearchSection(box);
    box.innerHTML='<div class="aymp-guidance-result"><span class="close-popup" id="resultClose">×</span><div class="power-art-glow"><div class="energy-orbit"></div><div class="power-core">✦</div></div><h2>✨ AYMP PERSONAL GUIDANCE</h2><h3>Welcome, '+esc(name)+'</h3><div class="birth-summary"><p>📅 <strong>Date:</strong> '+esc(dob)+'</p><p>⏰ <strong>Time:</strong> '+esc(time)+'</p><p>📍 <strong>Place:</strong> '+esc(place)+'</p>'+(chart?'<p>🌌 <strong>Lagna:</strong> '+esc(chart.lagna)+' ('+esc(chart.ascendantText)+')</p><p>🕰️ <strong>Time Zone:</strong> '+esc(chart.timezone)+'</p>':'')+'</div><div class="guidance-card"><h3>🌌 Your Cosmic Insight</h3><p>'+esc(p[2])+'</p></div><div class="sound-card"><div class="sound-label">🔱 AYMP SACRED MANTRA</div><div id="changingSound" class="changing-sound sound-animate">'+esc(p[1])+'</div><div class="sound-title">'+esc(p[0])+'</div><div class="music-panel"><div id="musicName">🎵 '+esc(music)+'</div><button type="button" id="playMusicBtn">▶ PLAY SACRED MUSIC</button><button type="button" id="pauseMusicBtn">⏸ PAUSE</button><button type="button" id="stopMusicBtn">⏹ STOP</button><p id="musicStatus">🎵 Sacred music ready.</p></div></div><div class="guidance-card"><h3>🙏 Mantra Meaning</h3><p>'+esc(p[2])+'</p></div><div class="practice-card"><h3>🧘 Practice</h3><p>Repeat the mantra <strong>108 times</strong> if suitable for your personal practice.</p></div></div>';
    if(researchSection){box.appendChild(researchSection);researchSection.style.display='none';}
    addResearchButton(box);addCosmicWheelButton(box);
    document.getElementById('resultClose').onclick=function(){stopMusic();popup.style.display='none';cleanStaleResearchUI();};
    document.getElementById('playMusicBtn').onclick=function(){if(!audio)playFile(music);else audio.play().catch(function(){});};
    document.getElementById('pauseMusicBtn').onclick=function(){if(audio){audio.pause();document.getElementById('musicStatus').textContent='⏸ Sacred music paused.';}};
    document.getElementById('stopMusicBtn').onclick=function(){stopMusic();document.getElementById('musicStatus').textContent='⏹ Sacred music stopped.';};
    playFile(music);
  }

  if(openBtn)openBtn.onclick=function(){cleanStaleResearchUI();popup.style.display='block';};
  if(closeBtn)closeBtn.onclick=function(){stopMusic();popup.style.display='none';cleanStaleResearchUI();};

  if(form)form.addEventListener('submit',async function(e){
    e.preventDefault();
    const submitButtons=form.querySelectorAll('button[type="submit"],button');
    const name=(document.getElementById('guidanceName')||{}).value?.trim()||'';
    const dob=(document.getElementById('guidanceDob')||{}).value||'';
    const time=(document.getElementById('guidanceTime')||{}).value||'';
    const place=(document.getElementById('guidancePlace')||{}).value?.trim()||'';
    if(!name||!dob||!time||!place){alert('Please enter Name, Date of Birth, Birth Time and Place.');return;}
    submitButtons.forEach(function(b){b.disabled=true;});
    try{
      if(!window.AYMPLagnaEngine||typeof window.AYMPLagnaEngine.calculateFromForm!=='function')throw Error('Global Lagna engine is not loaded.');
      const chart=await window.AYMPLagnaEngine.calculateFromForm();
      window.AYMPBirthChart={...chart,name:name,birthDate:dob,birthTime:time,birthPlace:place};
      window.dispatchEvent(new CustomEvent('aymp:birth-chart-updated',{detail:window.AYMPBirthChart}));
      let total=0;for(const c of name)total+=c.charCodeAt(0);for(const c of dob)if(!isNaN(parseInt(c)))total+=parseInt(c);for(const c of time)if(!isNaN(parseInt(c)))total+=parseInt(c);for(const c of place)total+=c.charCodeAt(0);
      showGuidance(total%patterns.length,name,dob,time,place,window.AYMPBirthChart);
    }catch(err){console.error(err);alert('Lagna calculation could not be completed. Please check the birth date, exact birth time and birth place.\n\n'+err.message);}
    finally{submitButtons.forEach(function(b){b.disabled=false;});}
  });

  (function loadAYMPResearchModules(){
    if(document.getElementById('aympVedicLagnaLoader'))return;
    const lagna=document.createElement('script');lagna.id='aympVedicLagnaLoader';lagna.src='assets/js/aymp-vedic-lagna-engine.js?v=5';lagna.defer=true;document.body.appendChild(lagna);
    const planetary=document.createElement('script');planetary.id='aympPlanetaryResearchLoader';planetary.src='assets/js/planetary-research-db.js?v=2';planetary.defer=true;document.body.appendChild(planetary);
    const css=document.createElement('link');css.rel='stylesheet';css.href='assets/css/yantra-herb-research.css';document.head.appendChild(css);
    const script=document.createElement('script');script.id='aympYantraHerbResearchLoader';script.src='assets/js/yantra-herb-research.js?v=2';script.defer=true;document.body.appendChild(script);
    const lagnaResearch=document.createElement('script');lagnaResearch.id='aympLagnaResearchResultLoader';lagnaResearch.src='assets/js/aymp-lagna-research-result.js?v=4';lagnaResearch.defer=true;document.body.appendChild(lagnaResearch);
    const cycle=document.createElement('script');cycle.id='aympPersonalResearchCycleLoader';cycle.src='assets/js/aymp-personal-research-cycle.js?v=2';cycle.defer=true;document.body.appendChild(cycle);
    const presentation=document.createElement('script');presentation.id='aympResultPresentationLoader';presentation.src='assets/js/aymp-result-presentation.js?v=7';presentation.defer=true;document.body.appendChild(presentation);
    const cosmic=document.createElement('script');cosmic.id='aympCosmicTimeWheelBridgeLoader';cosmic.src='assets/js/aymp-cosmic-time-wheel-bridge.js?v=2';cosmic.defer=true;document.body.appendChild(cosmic);
  })();

  cleanStaleResearchUI();
  console.log('AYMP Personal Guidance Engine Ready — stable v5');
});
