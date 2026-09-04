/* AYMP Global Trending v5 — reliable live discovery with source fallback and manual refresh. */
(function(){
'use strict';
var CACHE='aymp-global-v5-',MAX_AGE=30*60*1000;
var categories=[
['📚','Study & Education','education students learning university scholarship'],
['🎮','Global Games','gaming videogames esports game development'],
['🤖','AI & Technology','artificial intelligence robotics technology computing'],
['🚀','Space & Science','space astronomy science discovery'],
['🌍','World Amazing News','global world latest breakthrough discovery'],
['🌿','Nature & Wildlife','wildlife biodiversity conservation nature'],
['🏺','History & Culture','archaeology history heritage culture'],
['⚽','Sports World','sports football cricket athletics'],
['🎬','Entertainment','film music cinema entertainment'],
['💡','Amazing Facts & Discoveries','invention discovery breakthrough fascinating']
];
function esc(s){return String(s==null?'':s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]||c})}
function request(url,ms){var ctrl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctrl)ctrl.abort()},ms);return fetch(url,{cache:'no-store',signal:ctrl?ctrl.signal:undefined}).then(function(r){clearTimeout(t);if(!r.ok)throw Error('HTTP '+r.status);return r.json()})}
function cacheGet(i){try{var x=JSON.parse(localStorage.getItem(CACHE+i)||'null');return x&&Date.now()-x.time<MAX_AGE&&Array.isArray(x.items)?x.items:null}catch(e){return null}}
function cacheSet(i,items){try{localStorage.setItem(CACHE+i,JSON.stringify({time:Date.now(),items:items}))}catch(e){}}
function clean(items){return (items||[]).filter(function(x){return x&&x.title&&x.url}).slice(0,3)}
function gdelt(q){var u='https://api.gdeltproject.org/api/v2/doc/doc?query='+encodeURIComponent(q)+'&mode=artlist&format=json&maxrecords=6&timespan=24h&sort=datedesc';return request(u,8000).then(function(j){return clean((j.articles||[]).map(function(x){return {title:x.title,url:x.url,date:x.seendate||'',domain:x.domain||''}}))})}
function rss(q){var feed='https://news.google.com/rss/search?q='+encodeURIComponent(q+' when:1d')+'&hl=en-US&gl=US&ceid=US:en';return request('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(feed),8000).then(function(j){return clean((j.items||[]).map(function(x){return {title:x.title,url:x.link,date:x.pubDate||'',domain:''}}))})}
function loadOne(i,force){var old=force?null:cacheGet(i);if(old)return Promise.resolve({i:i,items:old,source:'AYMP cache'});var c=categories[i];return gdelt(c[2]).then(function(items){if(!items.length)throw Error('empty');cacheSet(i,items);return {i:i,items:items,source:'GDELT'}}).catch(function(){return rss(c[2]).then(function(items){cacheSet(i,items);return {i:i,items:items,source:'Google News RSS'}}).catch(function(){return {i:i,items:[],source:'temporarily unavailable'}})})}
function dateLabel(v){if(!v)return 'Recent';var s=String(v),m=s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);if(m)return m[3]+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(m[2])-1]+' '+m[1]+' · '+m[4]+':'+m[5];var d=new Date(v);return isNaN(d.getTime())?'Recent':d.toLocaleString([], {year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}
function card(c,r,i){var body=r.items.length?r.items.map(function(a){return '<a href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer" style="display:block;color:#fff;text-decoration:none;padding:12px 0;border-top:1px solid rgba(255,255,255,.09)"><div style="font-weight:800;line-height:1.45">'+esc(a.title)+'</div><div style="font-size:11px;color:#9ecfff;margin-top:6px">🌐 '+esc(r.source)+' · '+esc(dateLabel(a.date))+(a.domain?' · '+esc(a.domain):'')+' · Read ↗</div></a>'}).join(''):'<div style="color:#aaa;line-height:1.6;padding-top:10px">No verified fresh story was returned in the last 24 hours. AYMP will try again on refresh.</div>';return '<article class="global-trending-card" data-social-id="global-v5-'+i+'" data-category="'+esc(c[1])+'" style="padding:20px;border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.18);min-height:190px"><div style="font-size:32px">'+c[0]+'</div><div style="color:#ffd700;font-weight:800;font-size:12px;margin:7px 0">'+esc(c[1])+'</div>'+body+'</article>'}
function run(el,force){el.dataset.v4Ready='0';el.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:30px;color:#ddd">🌍 Checking verified global stories…</div>';var out=[],next=0,active=0,done=0;function launch(){while(active<2&&next<categories.length){(function(i){active++;loadOne(i,force).then(function(r){out[i]=r}).catch(function(){out[i]={i:i,items:[],source:'temporarily unavailable'}}).finally(function(){active--;done++;if(done===categories.length){el.innerHTML=out.map(function(r,j){return card(categories[j],r,j)}).join('');el.dataset.v4Ready='1';var n=document.getElementById('aymp-live-note');if(n)n.textContent='🌍 Fresh stories are checked from the last 24 hours. Stories link to their original sources; unavailable categories are never filled with invented news.';var b=document.getElementById('aymp-refresh');if(b){b.disabled=false;b.textContent='🔄 Refresh Global Trending'}}else launch()})})(next++)}}launch()}
function start(){var el=document.getElementById('aymp-trends');if(!el)return;var b=document.getElementById('aymp-refresh');if(b)b.addEventListener('click',function(){b.disabled=true;b.textContent='⏳ Refreshing…';run(el,true)});run(el,false)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
