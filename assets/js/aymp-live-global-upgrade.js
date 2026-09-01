/* AYMP Live Global Upgrade v3 — fast parallel loading + guaranteed fallback. */
(function(){
'use strict';
var CACHE='aymp-live-global-v3-',DAY=function(){return Math.floor(Date.now()/86400000)};
var categories=[
['📚','Study & Education','education students learning scholarship university'],
['🎮','Global Games','gaming videogames esports game development'],
['🤖','AI & Technology','artificial intelligence AI robotics technology computing'],
['🚀','Space & Science','space astronomy NASA science discovery physics'],
['🌍','World Amazing News','world global discovery breakthrough remarkable achievement'],
['🌿','Nature & Wildlife','wildlife biodiversity nature environment conservation'],
['🏺','History & Culture','archaeology ancient history culture heritage'],
['⚽','Sports World','sports football cricket tennis athletics'],
['🎬','Entertainment','film music entertainment cinema streaming'],
['💡','Amazing Facts & Discoveries','invention discovery breakthrough fascinating unusual']
];
var editorial=[
['🌌','Cosmic Discovery','Look up tonight: the sky changes every day, and even familiar objects can reveal something new when observed carefully.'],
['🧠','One-Minute Learning','Choose one unfamiliar idea today and explain it in your own words.'],
['🎮','Play & Learn','A good puzzle is a tiny laboratory: test an idea, change your strategy and try again.'],
['🌿','Nature Close-Up','Observe one plant, bird or insect without disturbing it. Small details can reveal remarkable adaptations.'],
['🏺','Past Meets Present','An old object can tell a modern story about technology, trade, food, language or people.'],
['💡','Wonder Question','Instead of asking only “what happened?”, ask “how do we know?”']
];
function esc(s){return String(s||'').replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c})}
function cached(i){try{var x=JSON.parse(localStorage.getItem(CACHE+i)||'null');return x&&x.day===DAY()&&Array.isArray(x.items)?x.items:null}catch(e){return null}}
function save(i,items){try{localStorage.setItem(CACHE+i,JSON.stringify({day:DAY(),items:items}))}catch(e){}}
function timeoutFetch(url){var ctrl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctrl)ctrl.abort()},5000);return fetch(url,{cache:'no-store',signal:ctrl?ctrl.signal:undefined}).then(function(r){clearTimeout(t);if(!r.ok)throw 0;return r.text()}).then(function(t){var j=JSON.parse(t);return j.articles||[]})}
function gdelt(q){return timeoutFetch('https://api.gdeltproject.org/api/v2/doc/doc?query='+encodeURIComponent(q)+'&mode=artlist&format=json&maxrecords=3&timespan=48h&sort=datedesc').then(function(a){return a.filter(function(x){return x&&x.title&&x.url}).slice(0,2).map(function(x){return {title:x.title,url:x.url}})})}
function rss(q){var rssurl='https://news.google.com/rss/search?q='+encodeURIComponent(q)+'&hl=en-US&gl=US&ceid=US:en';return timeoutFetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rssurl)).then(function(t){return JSON.parse(t).items||[]}).then(function(a){return a.filter(function(x){return x&&x.title&&x.link}).slice(0,2).map(function(x){return {title:x.title,url:x.link}})})}
function load(i){var old=cached(i);if(old)return Promise.resolve({i:i,items:old});var c=categories[i];return gdelt(c[2]).catch(function(){return rss(c[2])}).catch(function(){return []}).then(function(items){save(i,items);return {i:i,items:items}})}
function card(c,i,items){if(!items.length){var e=editorial[(DAY()+i)%editorial.length];return '<article class="global-trending-card" data-social-id="trend-'+i+'" data-category="'+esc(c[1])+'" style="padding:20px;border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.18);min-height:190px"><div style="font-size:32px">'+c[0]+'</div><div style="color:#ffd700;font-weight:800;font-size:12px;margin:7px 0">#'+(i+1)+' · '+esc(c[1])+'</div><h4 style="color:#fff;margin:6px 0;font-size:20px">'+esc(e[1])+'</h4><p style="color:#ccc;line-height:1.6;margin:0">'+esc(e[2])+'</p><div style="color:#8fd3ff;font-size:12px;margin-top:12px">🌐 Daily discovery · Live source unavailable right now</div></article>'}return '<article class="global-trending-card" data-social-id="trend-'+i+'" data-category="'+esc(c[1])+'" style="padding:20px;border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.18);min-height:190px"><div style="font-size:32px">'+c[0]+'</div><div style="color:#ffd700;font-weight:800;font-size:12px;margin:7px 0">#'+(i+1)+' · '+esc(c[1].toUpperCase())+'</div>'+items.map(function(a){return '<a href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer" style="display:block;color:#fff;text-decoration:none;padding:9px 0;border-top:1px solid rgba(255,255,255,.09)"><div style="font-weight:750;line-height:1.45">'+esc(a.title)+'</div><div style="font-size:11px;color:#9ecfff;margin-top:5px">🌐 Live source · Read story ↗</div></a>'}).join('')+'</article>'}
function render(el,results){el.innerHTML=results.sort(function(a,b){return a.i-b.i}).map(function(r){return card(categories[r.i],r.i,r.items)}).join('');el.setAttribute('data-aymp-live-ready','1');var note=document.getElementById('aymp-live-note');if(!note){note=document.createElement('div');note.id='aymp-live-note';note.style.cssText='text-align:center;color:#aaa;font-size:12px;margin:16px auto';el.parentNode.appendChild(note)}note.textContent='🌍 Live stories refresh when available; AYMP keeps daily discovery content visible if a source is unavailable.'}
function run(el){if(el.getAttribute('data-aymp-live-loading')==='1')return;el.setAttribute('data-aymp-live-loading','1');el.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:25px;color:#ddd">🌍 Loading today’s global stories…</div>';Promise.all(categories.map(function(_,i){return load(i)})).then(function(results){render(el,results)}).catch(function(){render(el,categories.map(function(_,i){return {i:i,items:[]}}))})}
function start(){var n=0,t=setInterval(function(){var el=document.getElementById('aymp-trends');if(el){clearInterval(t);run(el)}else if(++n>20)clearInterval(t)},250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
