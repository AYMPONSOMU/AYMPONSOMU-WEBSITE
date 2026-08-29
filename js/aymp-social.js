/* AYMP Social Interaction Layer
   Additive only: Like, Comment, Repost, Share and Copy Link.
   Works across existing cards, Today's Wow, Global Trending and Daily Discovery images.
   Likes/comments are local until a shared backend + login system is connected.
*/
(function(){
  'use strict';
  function makeBar(card,index){
    if(!card || card.querySelector('.aymp-social-bar')) return;
    var key=card.getAttribute('data-social-id') || ('card-'+index+'-'+location.pathname+'-'+(card.textContent||'').trim().slice(0,50));
    var wrap=document.createElement('div'); wrap.className='aymp-social-bar'; wrap.setAttribute('data-social-id',key);
    wrap.innerHTML='<button type="button" data-action="like">👍 <span>Like</span> <b>0</b></button>'+
      '<button type="button" data-action="comment">💬 <span>Comment</span></button>'+
      '<button type="button" data-action="repost">🔁 <span>Repost</span></button>'+
      '<button type="button" data-action="share">📤 <span>Share</span></button>'+
      '<button type="button" data-action="copy">🔗 <span>Copy Link</span></button>';
    card.appendChild(wrap);
    var count=Number(localStorage.getItem('aymp-like-'+key)||0);
    wrap.querySelector('[data-action="like"] b').textContent=count;
    wrap.addEventListener('click',function(e){
      var btn=e.target.closest('button'); if(!btn) return;
      var action=btn.getAttribute('data-action'),url=location.href;
      if(action==='like'){
        count++; localStorage.setItem('aymp-like-'+key,count); btn.querySelector('b').textContent=count; btn.querySelector('span').textContent='Liked';
      } else if(action==='comment'){
        var text=prompt('Share your comment about this AYMP content:');
        if(text){localStorage.setItem('aymp-comment-'+key,text);alert('Thank you for your comment!');}
      } else if(action==='repost' || action==='share'){
        if(navigator.share){navigator.share({title:document.title,text:action==='repost'?'Discover this AYMP content':'Discover this on AYMP',url:url}).catch(function(){});}
        else if(navigator.clipboard){navigator.clipboard.writeText(url).then(function(){alert(action==='repost'?'Link copied. You can repost it on social media.':'Link copied. Share it with your friends.');});}
      } else if(action==='copy'){
        if(navigator.clipboard) navigator.clipboard.writeText(url).then(function(){alert('AYMP link copied!');});
        else {var area=document.createElement('textarea');area.value=url;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();alert('AYMP link copied!');}
      }
    });
  }
  function init(){
    var selectors=['[data-aymp-social]','.daily-discovery-card','.global-trending-card','#aymp-wow-card','#aymp-trends > a','#aymp-trends > article','#aymp-daily-visuals a','.card'];
    document.querySelectorAll(selectors.join(',')).forEach(makeBar);
  }
  function addGameZone(){
    if(location.pathname.split('/').pop()!=='index.html' && location.pathname!=='/.in/' && location.pathname!=='/.in') return;
    if(document.getElementById('aymp-game-zone-entry')) return;
    var section=document.createElement('section');
    section.id='aymp-game-zone-entry';
    section.style.cssText='padding:55px 20px;background:linear-gradient(135deg,rgba(9,12,42,.98),rgba(35,12,60,.98));border-top:1px solid rgba(255,215,0,.22);border-bottom:1px solid rgba(255,215,0,.22)';
    section.innerHTML='<div style="max-width:1200px;margin:auto;text-align:center">'+
      '<div style="font-size:13px;letter-spacing:3px;color:#cfc6a0;font-weight:800">🎮 AYMP GAME WORLD</div>'+ 
      '<h2 style="font-family:Georgia,serif;color:#ffd700;font-size:40px;margin:8px 0 12px">Play • Learn • Discover</h2>'+ 
      '<p style="color:#ddd;max-width:760px;margin:0 auto 25px;line-height:1.7">Enter the AYMP Game Zone and play the growing collection of games, challenges and interactive experiences.</p>'+ 
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+
        '<a href="game-zone.html" style="display:inline-block;padding:14px 24px;border-radius:30px;background:linear-gradient(45deg,#c9a227,#ffdf6b);color:#111;text-decoration:none;font-weight:900">🎮 OPEN GAME ZONE</a>'+ 
        '<a href="games/aymp-runner.html" style="display:inline-block;padding:14px 24px;border-radius:30px;background:rgba(255,255,255,.08);border:1px solid rgba(255,215,0,.45);color:#fff;text-decoration:none;font-weight:900">🌌 PLAY COSMIC RUNNER</a>'+ 
      '</div>'+ 
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:28px auto 0;max-width:900px;text-align:left">'+
        '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🧠 Daily Quiz</div>'+ 
        '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🌌 Cosmic Runner</div>'+ 
        '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🧩 Puzzle Games</div>'+ 
        '<div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,0,.14);color:#eee">🌍 Global Games</div>'+ 
      '</div>'+ 
    '</div>';
    var footer=document.querySelector('footer');
    if(footer&&footer.parentNode) footer.parentNode.insertBefore(section,footer); else document.body.appendChild(section);
  }
  var css=document.createElement('style');
  css.textContent='.aymp-social-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:18px auto 4px;padding:10px}.aymp-social-bar button{cursor:pointer;border:1px solid rgba(255,215,0,.55);border-radius:20px;padding:8px 12px;background:rgba(10,25,55,.92);color:#fff;font-weight:600;font-family:inherit}.aymp-social-bar button:hover{transform:translateY(-1px);box-shadow:0 0 10px rgba(255,215,0,.35)}@media(max-width:600px){.aymp-social-bar{gap:5px}.aymp-social-bar button{font-size:12px;padding:8px 9px}}';
  document.head.appendChild(css);
  function start(){
    init();
    addGameZone();
    var observer=new MutationObserver(function(){init();addGameZone()});
    observer.observe(document.body,{childList:true,subtree:true});
    if(!document.querySelector('script[data-aymp-global-daily-content]')){
      var daily=document.createElement('script');
      daily.src='assets/js/aymp-global-daily-content.js?v=1';
      daily.async=true;
      daily.setAttribute('data-aymp-global-daily-content','1');
      document.body.appendChild(daily);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
