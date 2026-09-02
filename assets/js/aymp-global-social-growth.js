/* AYMP Global Social Growth System
   Additive growth layer: referral links, social follow/share prompts, campaign tracking,
   and return-visit prompts. No automatic posting or messaging without user action.
*/
(function(){
  'use strict';
  var SITE='https://aymp999.github.io/.in/';
  var KEY='aymp-referral-code';
  var src=new URLSearchParams(location.search).get('ref');
  if(src){ localStorage.setItem(KEY,src.slice(0,80)); localStorage.setItem('aymp-referral-seen',new Date().toISOString()); }

  function campaignUrl(){
    var u=new URL(location.href);
    if(!u.searchParams.has('utm_source')) u.searchParams.set('utm_source','aymp');
    if(!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium','social_share');
    if(!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign','global_growth');
    return u.toString();
  }
  function share(){
    var data={title:document.title||'AYMP',text:'Discover AYMP — Astrology, Games, Global Discovery, Food and more.',url:campaignUrl()};
    if(navigator.share) navigator.share(data).catch(function(){});
    else if(navigator.clipboard) navigator.clipboard.writeText(data.url).then(function(){alert('AYMP share link copied!');});
  }
  function addGrowthCard(){
    if(document.getElementById('aymp-global-social-growth')) return;
    var box=document.createElement('section'); box.id='aymp-global-social-growth';
    box.innerHTML='<div class="aymp-gsg-inner">'+
      '<div class="aymp-gsg-live">🌍 AYMP GLOBAL COMMUNITY</div>'+
      '<h2>Discover • Share • Invite</h2>'+
      '<p>Found something amazing? Share AYMP with friends and help the global community grow.</p>'+
      '<div class="aymp-gsg-actions">'+
      '<button type="button" id="aymp-gsg-share">📤 Share AYMP</button>'+
      '<button type="button" id="aymp-gsg-invite">👥 Invite Friends</button>'+
      '<button type="button" id="aymp-gsg-copy">🔗 Copy Invite Link</button>'+
      '</div><small>Sharing always requires your action — AYMP never posts to your social accounts automatically.</small>'+
      '</div>';
    var footer=document.querySelector('footer');
    if(footer&&footer.parentNode) footer.parentNode.insertBefore(box,footer); else document.body.appendChild(box);
    box.querySelector('#aymp-gsg-share').onclick=share;
    box.querySelector('#aymp-gsg-copy').onclick=function(){
      var code=localStorage.getItem(KEY)||('friend'+Math.random().toString(36).slice(2,8));
      localStorage.setItem(KEY,code);
      var u=SITE+'?ref='+encodeURIComponent(code)+'&utm_source=aymp&utm_medium=referral&utm_campaign=global_growth';
      if(navigator.clipboard) navigator.clipboard.writeText(u).then(function(){alert('Your AYMP invite link is copied!');});
    };
    box.querySelector('#aymp-gsg-invite').onclick=function(){
      var code=localStorage.getItem(KEY)||('friend'+Math.random().toString(36).slice(2,8));
      localStorage.setItem(KEY,code);
      var u=SITE+'?ref='+encodeURIComponent(code)+'&utm_source=aymp&utm_medium=referral&utm_campaign=global_growth';
      if(navigator.share) navigator.share({title:'Join AYMP Global',text:'Explore AYMP with me 🌍',url:u}).catch(function(){});
      else if(navigator.clipboard) navigator.clipboard.writeText(u).then(function(){alert('Invite link copied!');});
    };
  }
  function addFollowStrip(){
    if(document.getElementById('aymp-social-follow-strip')) return;
    var s=document.createElement('div'); s.id='aymp-social-follow-strip';
    s.innerHTML='<span>🌎 Follow AYMP & discover new content:</span>'+
      '<button data-s="facebook">Facebook</button><button data-s="linkedin">LinkedIn</button><button data-s="x">𝕏 X</button><button data-s="telegram">Telegram</button>';
    document.body.appendChild(s);
    var links={facebook:'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(campaignUrl()),linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(campaignUrl()),x:'https://twitter.com/intent/tweet?url='+encodeURIComponent(campaignUrl())+'&text='+encodeURIComponent('Discover AYMP Global 🌍'),telegram:'https://t.me/share/url?url='+encodeURIComponent(campaignUrl())+'&text='+encodeURIComponent('Discover AYMP Global 🌍')};
    s.querySelectorAll('button').forEach(function(b){b.onclick=function(){window.open(links[b.dataset.s],'_blank','noopener,noreferrer');};});
  }
  function init(){ addGrowthCard(); addFollowStrip(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
