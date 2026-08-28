/* AYMP Global Daily Content Engine — additive layer. */
(function(){
  'use strict';
  var daily = [
    {key:'Study & Education', icon:'📚', items:[
      ['Study Spark','Try the 25-minute focus method today: one clear goal, one distraction-free session, then a short review.'],
      ['Learning Challenge','Pick one topic you do not understand yet and explain it in five simple sentences.'],
      ['Knowledge Bite','Spaced repetition and active recall are two simple techniques that can make revision more effective.'],
      ['Curiosity Mission','Learn one new word from another language and use it in a sentence today.'],
      ['Student Challenge','Turn one chapter into five questions and answer them without looking at your notes.'],
      ['Creator Lesson','A small daily project can teach more than passive scrolling: build, test, improve and repeat.'],
      ['Weekend Discovery','Choose one museum, science channel, book chapter or documentary and learn one surprising fact.']
    ]},
    {key:'Global Games', icon:'🎮', items:[
      ['Daily Brain Duel','Can you remember 7 objects after looking at them for 10 seconds? Test yourself today.'],
      ['Pattern Challenge','Find the next number: 2, 6, 12, 20, 30, ?  Hint: look at the differences.'],
      ['Word Quest','Make as many English words as possible from the letters in “DISCOVERY” in 60 seconds.'],
      ['Logic Challenge','A puzzle has three clues. Solve it before opening the answer — speed and accuracy both count.'],
      ['Memory Mission','Look around you and remember five details. Close your eyes and recall them in order.'],
      ['Strategy Challenge','Choose a game you enjoy and identify one decision that changed the outcome.'],
      ['Family Game Day','Try a quick quiz, chess puzzle, word game or memory challenge with a friend or family member.']
    ]},
    {key:'AI & Technology', icon:'🤖', items:[
      ['Tech Watch','AI tools are increasingly being used for writing, coding, image creation, research and education.'],
      ['Digital Skill','Learn one keyboard shortcut or phone automation today and save it for later.'],
      ['AI Question','Ask an AI tool to explain a difficult idea at three levels: child, student and expert. Compare the answers.'],
      ['Future Tech','Robotics, computer vision and language models are converging into more capable digital systems.'],
      ['Build Something','Turn one repeated task into a simple checklist or automation. Small systems can save time every day.'],
      ['Cyber Awareness','Use unique passwords and multi-factor authentication for important accounts.'],
      ['Creator Challenge','Use a digital tool to turn one idea into a small image, story, animation or prototype.']
    ]},
    {key:'Space & Science', icon:'🚀', items:[
      ['Cosmic Question','When you look at distant stars, you are seeing light that began its journey long ago.'],
      ['Science Challenge','Pick one everyday object and ask: what scientific principles make it work?'],
      ['Space Watch','Astronomy combines observation, mathematics, physics and engineering to study worlds beyond Earth.'],
      ['Discovery Bite','Scientific knowledge grows through questions, measurements, experiments and independent verification.'],
      ['Sky Mission','Tonight, look for the Moon and notice how its position changes compared with the previous night.'],
      ['Physics Wonder','Light behaves in ways that reveal both wave-like and particle-like properties.'],
      ['Science Habit','Before sharing a surprising claim, check the source, date and evidence behind it.']
    ]},
    {key:'World Amazing News', icon:'🌍', items:[
      ['Global Wonder','Every day brings unusual discoveries, human achievements and unexpected stories from different parts of the world.'],
      ['Today’s Curiosity','Ask what happened, where it happened, who reported it and whether independent sources confirm it.'],
      ['World Lens','A global story can look different when reported from different countries and communities.'],
      ['Discovery Alert','Look beyond headlines: the original source often contains important context that a short post leaves out.'],
      ['Human Story','Remarkable achievements often begin with persistence, teamwork and years of preparation.'],
      ['Fact Check Moment','Separate a verified fact from an opinion, prediction or social-media claim before sharing.'],
      ['Wonder Pick','The world is full of small discoveries that rarely become headlines but can still teach us something new.']
    ]},
    {key:'Nature & Wildlife', icon:'🌿', items:[
      ['Wildlife Wonder','Animal behaviour often reflects adaptation to food, climate, predators and social environments.'],
      ['Forest Fact','Forests are complex communities where plants, fungi, insects, birds and mammals interact.'],
      ['Ocean Discovery','Much of the deep ocean remains difficult to explore, making every new observation valuable.'],
      ['Bird Watch','Choose one bird near your home and observe its movement, call and feeding behaviour without disturbing it.'],
      ['Plant Mission','Notice how a plant changes across a day: light, leaves, flowers and movement can all tell a story.'],
      ['Wildlife Respect','Enjoy wildlife from a safe distance and avoid feeding or handling wild animals.'],
      ['Earth Habit','One small action — reducing waste, saving water or protecting a local green space — can become a daily habit.']
    ]},
    {key:'History & Culture', icon:'🏺', items:[
      ['History Mystery','Archaeologists reconstruct the past from objects, buildings, texts, landscapes and other evidence.'],
      ['Culture Bite','Food, clothing, music and language can preserve stories about migration, trade and community.'],
      ['Ancient Engineering','Ancient societies solved difficult problems using mathematics, materials, observation and practical skill.'],
      ['Heritage Mission','Choose one local monument or traditional craft and learn the story behind it.'],
      ['History Question','Ask what evidence supports a historical claim before accepting a dramatic version of the story.'],
      ['Language Link','Many modern words preserve traces of older languages and cultural exchanges.'],
      ['Archive Discovery','Old photographs, maps and newspapers can reveal how familiar places changed over time.']
    ]},
    {key:'Sports World', icon:'⚽', items:[
      ['Performance Tip','Good performance combines practice, recovery, strategy and mental focus — not just effort.'],
      ['Sports Puzzle','Watch one minute of a match and identify the team’s formation and movement before checking analysis.'],
      ['World Sport','Different sports reward different combinations of speed, endurance, precision, timing and decision-making.'],
      ['Athlete Habit','Elite athletes often measure small improvements rather than relying only on final results.'],
      ['Game Strategy','Pick a sport and explain one tactical decision that changed the momentum of a match.'],
      ['Fair Play','Competition is stronger when rules, opponents and officials are treated with respect.'],
      ['Fitness Spark','A short walk, stretch or movement break can be a simple way to reset after long screen time.']
    ]},
    {key:'Entertainment', icon:'🎬', items:[
      ['Creator Spotlight','Film, music and digital entertainment increasingly cross borders and combine multiple creative traditions.'],
      ['Watch Smart','After a film or series, identify one storytelling choice that changed how you felt about a character.'],
      ['Music Minute','Listen to a song without watching the screen and notice rhythm, instruments and changes in intensity.'],
      ['Behind the Story','Great entertainment often depends on writing, editing, sound, design, performance and technology working together.'],
      ['Creative Challenge','Write a one-sentence story that contains a mystery, a place and an unexpected ending.'],
      ['Global Culture','Streaming and social platforms make it easier for regional creators to reach audiences around the world.'],
      ['Fan Pick','Share one film, song, book or creator that taught you something memorable.']
    ]},
    {key:'Amazing Facts & Discoveries', icon:'💡', items:[
      ['Wonder Fact','The most interesting discoveries often begin with a question that seemed too small to matter.'],
      ['Inventor Mindset','Observe a problem, make a hypothesis, test it, learn from failure and improve the idea.'],
      ['Curiosity Test','Take one familiar object and list five questions you have never asked about it.'],
      ['Discovery Habit','Keep a small note of surprising facts and verify them later from reliable sources.'],
      ['Everyday Science','Cooking, weather, sound, light and motion all contain experiments happening around us.'],
      ['Big Idea','A useful invention does not have to be complicated; it has to solve a real problem well.'],
      ['Today’s Wonder','Stay curious: one verified new fact can be the beginning of a much bigger idea.']
    ]}
  ];

  function clean(s){return String(s||'').replace(/[<>]/g,'')}
  function dayIndex(){return Math.floor(Date.now()/86400000)}
  function findCard(key){
    var cards=[].slice.call(document.querySelectorAll('#aymp-trends .global-trending-card'));
    var low=key.toLowerCase();
    return cards.find(function(c){return (c.textContent||'').toLowerCase().indexOf(low.toLowerCase())>=0}) || null;
  }
  function addToCard(card, item, icon, index){
    if(!card || card.querySelector('.aymp-daily-addon')) return;
    var box=document.createElement('div');
    box.className='aymp-daily-addon';
    box.style.cssText='margin-top:14px;padding:13px 14px;border-radius:15px;background:linear-gradient(135deg,rgba(255,215,0,.09),rgba(255,255,255,.035));border:1px solid rgba(255,215,0,.18)';
    box.innerHTML='<div style="font-size:11px;color:#ffd700;font-weight:800;letter-spacing:1px">'+icon+' AYMP DAILY CONTENT</div><div style="font-weight:800;color:#fff;margin:5px 0">'+clean(item[0])+'</div><div style="font-size:13px;color:#cfcfcf;line-height:1.55">'+clean(item[1])+'</div>';
    if(keyForGames(card)){
      var b=document.createElement('button');
      b.type='button'; b.textContent='🎮 Play Today’s Mini Challenge';
      b.style.cssText='margin-top:10px;border:1px solid rgba(255,215,0,.55);border-radius:20px;padding:8px 12px;background:#c9a227;color:#111;font-weight:800;cursor:pointer';
      b.onclick=function(){openGame(index)};
      box.appendChild(b);
    }
    card.appendChild(box);
  }
  function keyForGames(card){return (card.textContent||'').toLowerCase().indexOf('global games')>=0}
  function openGame(index){
    var overlay=document.getElementById('aymp-game-modal');
    if(!overlay){
      overlay=document.createElement('div'); overlay.id='aymp-game-modal';
      overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px';
      overlay.innerHTML='<div style="width:min(92vw,560px);background:#101b3b;border:2px solid #ffd700;border-radius:24px;padding:24px;color:#fff;box-shadow:0 0 35px rgba(255,215,0,.3)"><button id="aymp-game-close" style="float:right;background:none;border:0;color:#ffd700;font-size:28px;cursor:pointer">×</button><div id="aymp-game-body"></div></div>';
      document.body.appendChild(overlay); document.getElementById('aymp-game-close').onclick=function(){overlay.style.display='none'};
    }
    overlay.style.display='flex';
    var games=[
      {title:'🧠 Number Pattern',q:'What comes next? 2, 6, 12, 20, 30, ?',a:['36','40','42','44'],correct:2},
      {title:'🔤 Word Challenge',q:'Which word is closest in meaning to “discover”?',a:['Hide','Find','Forget','Repeat'],correct:1},
      {title:'🌍 Geography Quick Quiz',q:'Which is the largest ocean on Earth?',a:['Atlantic','Indian','Pacific','Arctic'],correct:2},
      {title:'🚀 Space Quiz',q:'Which object orbits Earth naturally?',a:['The Moon','Mars','Venus','Jupiter'],correct:0},
      {title:'💡 Logic Quickie',q:'If all A are B, and all B are C, what follows?',a:['All A are C','No A are C','Some C are not B','Nothing follows'],correct:0},
      {title:'🎯 Memory Mission',q:'Remember this sequence: STAR → MOON → SUN. Which comes second?',a:['STAR','MOON','SUN','EARTH'],correct:1},
      {title:'🧩 Pattern Quest',q:'Which number completes: 3, 9, 27, 81, ?',a:['162','189','216','243'],correct:3}
    ];
    var g=games[dayIndex()%games.length],body=document.getElementById('aymp-game-body');
    body.innerHTML='<div style="color:#ffd700;font-weight:800;letter-spacing:1px">AYMP DAILY GAME</div><h2 style="margin:8px 0 12px">'+g.title+'</h2><p style="color:#ddd;line-height:1.6">'+g.q+'</p>'+g.a.map(function(a,i){return '<button data-answer="'+i+'" style="display:block;width:100%;margin:9px 0;padding:12px;border-radius:14px;border:1px solid rgba(255,215,0,.35);background:#182850;color:#fff;text-align:left;cursor:pointer">'+String.fromCharCode(65+i)+'. '+a+'</button>'}).join('')+'<div id="aymp-game-result" style="margin-top:12px;font-weight:700"></div>';
    body.querySelectorAll('[data-answer]').forEach(function(btn){btn.onclick=function(){var ok=Number(btn.getAttribute('data-answer'))===g.correct;document.getElementById('aymp-game-result').textContent=ok?'🎉 Correct! Great job.':'🙂 Good try! The correct answer is '+g.a[g.correct]+'.';document.getElementById('aymp-game-result').style.color=ok?'#7dffb2':'#ffd98a'}});
  }
  function run(){
    var trends=document.getElementById('aymp-trends'); if(!trends) return false;
    var d=dayIndex();
    daily.forEach(function(c,i){var card=findCard(c.key);if(card)addToCard(card,c.items[d%7],c.icon,i)});
    if(!document.getElementById('aymp-daily-content-note')){
      var note=document.createElement('div');note.id='aymp-daily-content-note';note.style.cssText='text-align:center;margin:18px auto 0;color:#aaa;font-size:12px';note.textContent='🔄 AYMP Daily Content changes automatically each day.';trends.parentNode.appendChild(note);
    }
    return true;
  }
  function start(){var tries=0, timer=setInterval(function(){tries++;if(run()||tries>40)clearInterval(timer)},500)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
