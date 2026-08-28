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
  var css=document.createElement('style');
  css.textContent='.aymp-social-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:18px auto 4px;padding:10px}.aymp-social-bar button{cursor:pointer;border:1px solid rgba(255,215,0,.55);border-radius:20px;padding:8px 12px;background:rgba(10,25,55,.92);color:#fff;font-weight:600;font-family:inherit}.aymp-social-bar button:hover{transform:translateY(-1px);box-shadow:0 0 10px rgba(255,215,0,.35)}@media(max-width:600px){.aymp-social-bar{gap:5px}.aymp-social-bar button{font-size:12px;padding:8px 9px}}';
  document.head.appendChild(css);
  function start(){init();var observer=new MutationObserver(function(){init()});observer.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
