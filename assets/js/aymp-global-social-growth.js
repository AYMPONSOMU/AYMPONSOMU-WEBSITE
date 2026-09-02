/* AYMP Global Social Growth System
   Additive front-end layer: referral links, social sharing prompts and campaign tracking.
   It never posts/messages to a visitor's accounts without their action.
   Referral attribution is stored locally until a shared backend is connected.
*/
(function(){
  'use strict';
  var SITE='https://aymp999.github.io/.in/';
  var KEY='aymp-referral-code';
  var src=new URLSearchParams(location.search).get('ref');
  if(src){ localStorage.setItem(KEY,src.slice(0,80)); localStorage.setItem('aymp-referral-seen',new Date().toISOString()); }

  var css=document.createElement('style');
  css.textContent='#aymp-global-social-growth{margin:32px auto;max-width:1100px;padding:26px 18px;border:1px solid rgba(255,215,0,.24);border-radius:22px;background:linear-gradient(135deg,rgba(9,18,45,.96),rgba(35,12,60,.96));box-shadow:0 12px 35px rgba(0,0,0,.22);text-align:center;color:#fff}#aymp-global-social-growth .aymp-gsg-inner{max-width:850px;margin:auto}.aymp-gsg-live{font-size:12px;letter-spacing:2px;font-weight:800;color:#ffd700}.aymp-gsg-inner h2{margin:8px 0;font-size:30px;color:#ffd700}.aymp-gsg-inner p{line-height:1.65;color:#ddd}.aymp-gsg-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:18px 0}.aymp-gsg-actions button,#aymp-social-follow-strip button{border:1px solid rgba(255,215,0,.5);border-radius:24px;padding:10px 15px;background:rgba(255,255,255,.08);color:#fff;font-weight:800;cursor:pointer}.aymp-gsg-actions button:hover,#aymp-social-follow-strip button:hover{transform:translateY(-1px);box-shadow:0 0 12px rgba(255,215,0,.22)}#aymp-global-social-growth small{display:block;color:#aaa;line-height:1.5}#aymp-social-follow-strip{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;margin:24px auto;padding:12px 14px;max-width:1100px;border-top:1px solid rgba(255,215,0,.14);border-bottom:1px solid rgba(255,215,0,.14);color:#ddd}#aymp-social-follow-strip span{font-weight:700}@media(max-width:600px){#aymp-global-social-growth{margin:22px 12px;padding:22px 14px}.aymp-gsg-inner h2{font-size:25px}.aymp-gsg-actions button,#aymp-social-follow-strip button{font-size:12px;padding:9px 11px}}@media(prefers-reduced-motion:reduce){.aymp-gsg-actions button:hover,#aymp-social-follow-strip button:hover{transform:none}}';
  document.head.appendChild(css);

  function campaignUrl(){
    var u=new URL(location.href);
    if(!u.searchParams.has('utm_source')) u.searchParams.set('utm_source','aymp');
    if(!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium','social_share');
    if(!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign','global_growth');
    return u.toString();
  }
  function getInviteUrl(){
    var code=localStorage.getItem(KEY);
    if(!code){ code='friend'+Math.random().toString(36).slice(2,8); localStorage.setItem(KEY,code); }
    return SITE+'?ref='+encodeURIComponent(code)+'&utm_source=aymp&utm_medium=referral&utm_campaign=global_growth';
  }
  function copy(url,msg){
    if(navigator.clipboard) navigator.clipboard.writeText(url).then(function(){alert(msg);});
    else { var area=document.createElement('textarea'); area.value=url; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); alert(msg); }
  }
  function share(){
    var data={title:document.title||'AYMP',text:'Discover AYMP — Astrology, Games, Global Discovery, Food and more.',url:campaignUrl()};
    if(navigator.share) navigator.share(data).catch(function(){}); else copy(data.url,'AYMP share link copied!');
  }
  function addGrowthCard(){
    if(document.getElementById('aymp-global-social-growth')) return;
    var box=document.createElement('section'); box.id='aymp-global-social-growth';
    box.innerHTML='<div class="aymp-gsg-inner"><div class="aymp-gsg-live">🌍 AYMP GLOBAL COMMUNITY</div><h2>Discover • Share • Invite</h2><p>Found something amazing? Share AYMP with friends and help the global community grow.</p><div class="aymp-gsg-actions"><button type="button" id="aymp-gsg-share">📤 Share AYMP</button><button type="button" id="aymp-gsg-invite">👥 Invite Friends</button><button type="button" id="aymp-gsg-copy">🔗 Copy Invite Link</button></div><small>Sharing always requires your action. This front-end version stores referral attribution on the visitor's device; a shared backend is required for global referral counting.</small></div>';
    var footer=document.querySelector('footer'); if(footer&&footer.parentNode) footer.parentNode.insertBefore(box,footer); else document.body.appendChild(box);
    box.querySelector('#aymp-gsg-share').onclick=share;
    box.querySelector('#aymp-gsg-copy').onclick=function(){copy(getInviteUrl(),'Your AYMP invite link is copied!');};
    box.querySelector('#aymp-gsg-invite').onclick=function(){var u=getInviteUrl();if(navigator.share) navigator.share({title:'Join AYMP Global',text:'Explore AYMP with me 🌍',url:u}).catch(function(){});else copy(u,'Invite link copied!');};
  }
  function addFollowStrip(){
    if(document.getElementById('aymp-social-follow-strip')) return;
    var s=document.createElement('div'); s.id='aymp-social-follow-strip';
    s.innerHTML='<span>🌎 Share AYMP on:</span><button data-s="facebook">Facebook</button><button data-s="linkedin">LinkedIn</button><button data-s="x">𝕏 X</button><button data-s="telegram">Telegram</button>';
    document.body.appendChild(s);
    var url=encodeURIComponent(campaignUrl());
    var links={facebook:'https://www.facebook.com/sharer/sharer.php?u='+url,linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+url,x:'https://twitter.com/intent/tweet?url='+url+'&text='+encodeURIComponent('Discover AYMP Global 🌍'),telegram:'https://t.me/share/url?url='+url+'&text='+encodeURIComponent('Discover AYMP Global 🌍')};
    s.querySelectorAll('button').forEach(function(b){b.onclick=function(){window.open(links[b.dataset.s],'_blank','noopener,noreferrer');};});
  }
  function init(){addGrowthCard();addFollowStrip();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
