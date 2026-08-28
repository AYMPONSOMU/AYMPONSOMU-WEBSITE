/* AYMP Social Interaction Layer
   Additive only: Like, Comment, Repost, Share and Copy Link.
   Comments are stored locally until a shared backend is connected.
*/
(function(){
  'use strict';
  function init(){
    var cards=document.querySelectorAll('[data-aymp-social], .daily-discovery-card, .global-trending-card');
    if(!cards.length) return;
    cards.forEach(function(card,index){
      if(card.querySelector('.aymp-social-bar')) return;
      var key=card.getAttribute('data-social-id') || ('card-'+index+'-'+location.pathname);
      var wrap=document.createElement('div'); wrap.className='aymp-social-bar';
      wrap.innerHTML='<button data-action="like">👍 <span>Like</span> <b>0</b></button>'+
        '<button data-action="comment">💬 <span>Comment</span></button>'+
        '<button data-action="repost">🔁 <span>Repost</span></button>'+
        '<button data-action="share">📤 <span>Share</span></button>'+
        '<button data-action="copy">🔗 <span>Copy Link</span></button>';
      card.appendChild(wrap);
      var count=Number(localStorage.getItem('aymp-like-'+key)||0);
      wrap.querySelector('[data-action="like"] b').textContent=count;
      wrap.addEventListener('click',function(e){
        var btn=e.target.closest('button'); if(!btn) return;
        var action=btn.getAttribute('data-action');
        if(action==='like'){
          count++; localStorage.setItem('aymp-like-'+key,count);
          btn.querySelector('b').textContent=count;
        }
        if(action==='comment'){
          var text=prompt('Share your comment about this AYMP discovery:');
          if(text){ localStorage.setItem('aymp-comment-'+key,text); alert('Thank you for your comment!'); }
        }
        if(action==='repost'){
          navigator.clipboard?.writeText(location.href); alert('Link copied. You can repost it on your social media.');
        }
        if(action==='share'){
          if(navigator.share) navigator.share({title:document.title,text:'Discover this on AYMP',url:location.href}).catch(function(){});
          else { navigator.clipboard?.writeText(location.href); alert('Link copied. Share it with your friends.'); }
        }
        if(action==='copy'){
          navigator.clipboard?.writeText(location.href).then(function(){alert('Link copied!');});
        }
      });
    });
  }
  var css=document.createElement('style');
  css.textContent='.aymp-social-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:18px auto;padding:10px}.aymp-social-bar button{cursor:pointer;border:1px solid rgba(255,215,0,.55);border-radius:20px;padding:8px 12px;background:rgba(10,25,55,.9);color:#fff;font-weight:600}.aymp-social-bar button:hover{transform:translateY(-1px);box-shadow:0 0 10px rgba(255,215,0,.35)}';
  document.head.appendChild(css);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
