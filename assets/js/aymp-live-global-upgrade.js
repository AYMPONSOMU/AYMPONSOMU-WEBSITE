/* AYMP Live Global Upgrade — keeps existing cards and adds real current stories. */
(function(){
  'use strict';
  var CACHE='aymp-live-global-v2-';
  var categories=[
    {icon:'📚',name:'Study & Education',q:'(education OR students OR learning OR scholarship OR university)'},
    {icon:'🎮',name:'Global Games',q:'(gaming OR videogames OR esports OR "game development")'},
    {icon:'🤖',name:'AI & Technology',q:'("artificial intelligence" OR AI OR robotics OR technology OR computing)'},
    {icon:'🚀',name:'Space & Science',q:'(space OR astronomy OR NASA OR "science discovery" OR physics)'},
    {icon:'🌍',name:'World Amazing News',q:'(world OR global) (discovery OR breakthrough OR remarkable OR achievement)'},
    {icon:'🌿',name:'Nature & Wildlife',q:'(wildlife OR biodiversity OR nature OR environment OR conservation)'},
    {icon:'🏺',name:'History & Culture',q:'(archaeology OR "ancient history" OR culture OR heritage)'},
    {icon:'⚽',name:'Sports World',q:'(sports OR football OR cricket OR tennis OR athletics)'},
    {icon:'🎬',name:'Entertainment',q:'(film OR music OR entertainment OR cinema OR streaming)'},
    {icon:'💡',name:'Amazing Facts & Discoveries',q:'(invention OR discovery OR breakthrough OR fascinating OR unusual)'}
  ];
  var editorial=[
    ['🌌','Cosmic Discovery','Look up tonight: the sky changes every day, and even familiar objects can reveal something new when observed carefully.'],
    ['🧠','One-Minute Learning','Choose one unfamiliar idea today and explain it in your own words. If you cannot explain it simply, keep exploring.'],
    ['🎮','Play & Learn','A good puzzle is a tiny laboratory: test an idea, make a mistake, change your strategy and try again.'],
    ['🌿','Nature Close-Up','Observe one plant, bird or insect without disturbing it. Small details often reveal remarkable adaptations.'],
    ['🏺','Past Meets Present','An old object can tell a modern story about technology, trade, food, language or the people who used it.'],
    ['💡','Wonder Question','Instead of asking only “what happened?”, ask “how do we know?” That single question is a powerful discovery tool.']
  ];
  function day(){return Math.floor(Date.now()/86400000)}
  function esc(s){return String(s||'').replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}
  function waitForTrends(done){
    var tries=0,t=setInterval(function(){
      var el=document.getElementById('aymp-trends');
      if(el){clearInterval(t);done(el);}
      else if(++tries>40){clearInterval(t);}
    },500);
  }
  function cached(i){try{var x=JSON.parse(localStorage.getItem(CACHE+i)||'null');if(x&&x.day===day()&&Array.isArray(x.items))return x.items;}catch(e){}return null}
  function save(i,items){try{localStorage.setItem(CACHE+i,JSON.stringify({day:day(),items:items}));}catch(e){}}
  function gdelt(q){
    var url='https://api.gdeltproject.org/api/v2/doc/doc?query='+encodeURIComponent(q)+'&mode=artlist&format=json&maxrecords=2&timespan=48h&sort=datedesc';
    return fetch(url,{cache:'no-store'}).then(function(r){return r.text().then(function(txt){if(!r.ok)throw 0;try{return JSON.parse(txt)}catch(e){throw 0;}})}).then(function(x){return (x.articles||[]).filter(function(a){return a&&a.title&&a.url}).slice(0,2)});
  }
  function rss2json(q){
    var rss='https://news.google.com/rss/search?q='+encodeURIComponent(q)+'&hl=en-US&gl=US&ceid=US:en';
    var url='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rss);
    return fetch(url,{cache:'no-store'}).then(function(r){return r.json()}).then(function(x){return (x.items||[]).filter(function(a){return a&&a.title&&a.link}).slice(0,2).map(function(a){return {title:a.title,url:a.link,domain:a.author||''}})});
  }
  function load(i){
    var c=categories[i],old=cached(i);
    if(old)return Promise.resolve({i:i,items:old,cached:true});
    return gdelt(c.q).catch(function(){return rss2json(c.q)}).then(function(items){save(i,items);return {i:i,items:items}}).catch(function(){return {i:i,items:[]}});
  }
  function card(c,i,items){
    if(!items.length){
      var e=editorial[(day()+i)%editorial.length];
      return '<article class="global-trending-card" data-social-id="trend-'+i+'" style="padding:20px;border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.18);min-height:190px"><div style="font-size:32px">'+c.icon+'</div><div style="color:#ffd700;font-weight:800;font-size:12px;margin:7px 0">#'+(i+1)+' · AYMP DAILY DISCOVERY</div><h4 style="color:#fff;margin:6px 0;font-size:20px">'+e[1]+'</h4><p style="color:#ccc;line-height:1.6;margin:0">'+e[2]+'</p><div style="color:#8fd3ff;font-size:12px;margin-top:12px">Live source temporarily unavailable · discovery content shown</div></article>';
    }
    return '<article class="global-trending-card" data-social-id="trend-'+i+'" style="padding:20px;border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.18);min-height:190px"><div style="font-size:32px">'+c.icon+'</div><div style="color:#ffd700;font-weight:800;font-size:12px;margin:7px 0">#'+(i+1)+' · '+esc(c.name.toUpperCase())+'</div>'+items.map(function(a){return '<a href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer" style="display:block;color:#fff;text-decoration:none;padding:9px 0;border-top:1px solid rgba(255,255,255,.09)"><div style="font-weight:750;line-height:1.45">'+esc(a.title)+'</div><div style="font-size:11px;color:#9ecfff;margin-top:5px">🌐 Live global source · Read story ↗</div></a>'}).join('')+'</article>';
  }
  function render(el,results){
    el.innerHTML=results.sort(function(a,b){return a.i-b.i}).map(function(r){return card(categories[r.i],r.i,r.items)}).join('');
    el.setAttribute('data-aymp-live-ready','1');
    var note=document.getElementById('aymp-live-note');
    if(!note){note=document.createElement('div');note.id='aymp-live-note';note.style.cssText='text-align:center;color:#aaa;font-size:12px;margin:16px auto';el.parentNode.appendChild(note)}
    note.textContent='🌍 Live global stories refresh automatically. AYMP also keeps a daily discovery fallback when a feed is unavailable.';
  }
  function run(el){
    if(el.getAttribute('data-aymp-live-loading')==='1')return;
    el.setAttribute('data-aymp-live-loading','1');
    var cachedResults=categories.map(function(_,i){var x=cached(i);return x?{i:i,items:x}:null}).filter(Boolean);
    if(cachedResults.length===categories.length){render(el,cachedResults);return;}
    el.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:25px;color:#ddd">🌍 Loading today\'s global stories…</div>';
    var results=[];
    function next(i){
      if(i>=categories.length){render(el,results);return;}
      load(i).then(function(r){results.push(r);next(i+1)});
    }
    next(0);
  }
  waitForTrends(run);
})();
