/* AYMP Global Trending v5 — visual live display with static-feed + direct fallback. */
(function(){
'use strict';
var CATS=[
['🌎','World Amazing News','world latest breaking news discovery'],['🤯','Amazing Facts & Discoveries','science discovery invention breakthrough'],['🎮','Global Games','gaming esports videogames'],['📚','Study & Education','education university students learning'],['🤖','AI & Technology','artificial intelligence technology robotics'],['🚀','Space & Science','space astronomy science NASA'],['🌿','Nature & Wildlife','wildlife nature biodiversity conservation'],['🏺','History & Culture','history archaeology culture heritage'],['⚽','Sports World','sports football cricket tennis'],['🎬','Entertainment','film music cinema entertainment']
];
var root=document.getElementById('aymp-trends'); if(!root)return;
var feed='assets/data/global-trending.json?v='+Date.now();
function esc(s){return String(s||'').replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c})}
function time(s){if(!s)return 'Recently';var d=new Date(s);return isNaN(d)?'Recently':d.toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}
function render(items,source){
 var grouped={}; CATS.forEach(function(c,i){grouped[i]=[]});
 (items||[]).forEach(function(a){var k=String(a.category||'').toLowerCase();var idx=CATS.findIndex(function(c){return c[1].toLowerCase()===k});if(idx>=0)grouped[idx].push(a)});
 root.innerHTML=CATS.map(function(c,i){var arr=grouped[i]||[];var stories=arr.slice(0,5).map(function(a){return '<a class="aymp-live-story" href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer"><div class="aymp-live-media">'+(a.image?'<img loading="lazy" src="'+esc(a.image)+'" alt="" onerror="this.style.display=\'none\'">':'<span>'+c[0]+'</span>')+'</div><div class="aymp-live-title">'+esc(a.title)+'</div><div class="aymp-live-meta">🌐 '+esc(a.source||source||'Verified source')+' · '+esc(time(a.date))+' · Read ↗</div></a>'}).join('');
 if(!stories)stories='<div class="aymp-empty">Waiting for a verified fresh story…</div>';
 return '<article class="global-trending-card" data-social-id="global-v5-'+i+'" data-category="'+esc(c[1])+'"><div class="aymp-cat-head"><span>'+c[0]+'</span><strong>'+esc(c[1])+'</strong><i>LIVE</i></div><div class="aymp-live-stories">'+stories+'</div></article>';}).join('');
 root.dataset.v5Ready='1';
 var note=document.getElementById('aymp-live-note');if(note)note.textContent='🔴 LIVE DISCOVERY · Data is refreshed periodically and each story opens its original source. AYMP does not invent news.';
}
function direct(){
 var all=[];var qs=CATS.map(function(c){return fetch('https://api.gdeltproject.org/api/v2/doc/doc?query='+encodeURIComponent(c[2])+'&mode=artlist&format=json&maxrecords=5&timespan=24h&sort=datedesc',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){(j.articles||[]).slice(0,5).forEach(function(a){all.push({category:c[1],title:a.title,url:a.url,date:a.seendate,source:a.domain||'GDELT',image:a.socialimage||''})})}).catch(function(){})});
 Promise.all(qs).then(function(){if(all.length)render(all,'GDELT')});
}
root.innerHTML='<div class="aymp-live-loading"><span class="aymp-pulse"></span><b>LIVE GLOBAL DISCOVERY</b><small>Connecting to fresh world stories…</small></div>';
fetch(feed,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('feed');return r.json()}).then(function(j){if(!Array.isArray(j.items)||!j.items.length)throw Error('empty');render(j.items,j.source||'AYMP Live Feed')}).catch(function(){direct()});
})();
