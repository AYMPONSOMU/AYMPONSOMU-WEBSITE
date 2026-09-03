/* AYMP Auto Global Sharing System — Phase 1
   Additive only. Creates a ready-to-share package from the current AYMP page.
   It does not auto-post, auto-message, create fake engagement, or access user accounts.
*/
(function(){
  'use strict';
  if(window.__AYMP_AUTO_GLOBAL_SHARING_V1__) return;
  window.__AYMP_AUTO_GLOBAL_SHARING_V1__=true;

  var SITE='https://aymp999.github.io/.in/';
  var params=new URLSearchParams(location.search);
  var ref=params.get('ref');

  function cleanText(v,max){
    return String(v||'').replace(/\s+/g,' ').trim().slice(0,max||240);
  }
  function pageTitle(){
    var h=document.querySelector('h1');
    return cleanText(h?h.textContent:document.title||'AYMP Global',110);
  }
  function pageDescription(){
    var meta=document.querySelector('meta[name="description"]');
    if(meta&&meta.content) return cleanText(meta.content,220);
    var p=document.querySelector('main p, .hero-content p, section p');
    return cleanText(p?p.textContent:'Discover AYMP — Astrology, Games, Global Discovery, Food and more.',220);
  }
  function shareUrl(){
    var u=new URL(location.href);
    if(!u.searchParams.has('utm_source')) u.searchParams.set('utm_source','aymp');
    if(!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium','social');
    if(!u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign','global_growth');
    if(ref && !u.searchParams.has('ref')) u.searchParams.set('ref',ref.slice(0,80));
    return u.toString();
  }
  function inviteUrl(){
    var code=localStorage.getItem('aymp-referral-code');
    if(!code){
      code='friend'+Math.random().toString(36).slice(2,8);
      localStorage.setItem('aymp-referral-code',code);
    }
    return SITE+'?ref='+encodeURIComponent(code)+'&utm_source=aymp&utm_medium=referral&utm_campaign=global_growth';
  }
  function shareText(){
    return '🌍 '+pageTitle()+'\n\n'+pageDescription()+'\n\nDiscover more on AYMP:';
  }
  function copy(value,message){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(value).then(function(){alert(message);}).catch(function(){fallbackCopy(value,message);});
    }else fallbackCopy(value,message);
  }
  function fallbackCopy(value,message){
    var a=document.createElement('textarea');
    a.value=value; a.setAttribute('readonly',''); a.style.position='fixed'; a.style.opacity='0';
    document.body.appendChild(a); a.select();
    try{document.execCommand('copy');}catch(e){}
    a.remove(); alert(message);
  }
  function openShare(url){window.open(url,'_blank','noopener,noreferrer');}
  function nativeShare(){
    var data={title:pageTitle(),text:shareText(),url:shareUrl()};
    if(navigator.share) navigator.share(data).catch(function(){});
    else copy(data.text+'\n'+data.url,'AYMP share package copied!');
  }
  function addStyles(){
    if(document.getElementById('aymp-auto-global-sharing-style')) return;
    var s=document.createElement('style');
    s.id='aymp-auto-global-sharing-style';
    s.textContent='\n#aymp-auto-global-sharing{max-width:1100px;margin:28px auto;padding:22px 18px;border:1px solid rgba(255,215,0,.24);border-radius:22px;background:linear-gradient(135deg,rgba(8,18,45,.97),rgba(38,14,62,.97));color:#fff;box-shadow:0 12px 35px rgba(0,0,0,.2)}#aymp-auto-global-sharing .ags-head{text-align:center}#aymp-auto-global-sharing .ags-kicker{font-size:11px;letter-spacing:2px;color:#ffd700;font-weight:900}#aymp-auto-global-sharing h2{margin:7px 0;color:#ffd700;font-size:28px}#aymp-auto-global-sharing p{color:#ddd;line-height:1.6}.ags-preview{margin:16px auto;padding:15px;border-radius:15px;background:rgba(255,255,255,.055);border:1px solid rgba(255,215,0,.13);text-align:left}.ags-preview strong{color:#ffd700}.ags-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:16px}.ags-actions button{border:1px solid rgba(255,215,0,.5);border-radius:22px;padding:10px 13px;background:rgba(255,255,255,.08);color:#fff;font-weight:800;cursor:pointer}.ags-actions button:hover{transform:translateY(-1px);box-shadow:0 0 12px rgba(255,215,0,.2)}#aymp-auto-global-sharing small{display:block;text-align:center;color:#aaa;margin-top:13px;line-height:1.5}@media(max-width:600px){#aymp-auto-global-sharing{margin:20px 12px;padding:20px 13px}#aymp-auto-global-sharing h2{font-size:24px}.ags-actions button{font-size:12px;padding:9px 10px}}';
    document.head.appendChild(s);
  }
  function addPanel(){
    if(document.getElementById('aymp-auto-global-sharing')) return;
    var box=document.createElement('section');
    box.id='aymp-auto-global-sharing';
    box.setAttribute('data-aymp-social','auto-global-sharing-v1');
    box.innerHTML='<div class="ags-head"><div class="ags-kicker">🌍 AYMP AUTO GLOBAL SHARING — PHASE 1</div><h2>One Content • Many Sharing Channels</h2><p>AYMP automatically prepares this page for fast human sharing. Choose a channel when you are ready.</p></div><div class="ags-preview"><strong>'+escapeHtml(pageTitle())+'</strong><br><span>'+escapeHtml(pageDescription())+'</span><br><br><span>🔗 '+escapeHtml(shareUrl())+'</span></div><div class="ags-actions"><button type="button" data-ags="native">📤 Share</button><button type="button" data-ags="whatsapp">💬 WhatsApp</button><button type="button" data-ags="facebook">Facebook</button><button type="button" data-ags="linkedin">LinkedIn</button><button type="button" data-ags="x">𝕏 X</button><button type="button" data-ags="telegram">Telegram</button><button type="button" data-ags="copy">🔗 Copy Link</button><button type="button" data-ags="package">📋 Copy Share Package</button><button type="button" data-ags="invite">👥 Copy Invite Link</button></div><small>Human action is always required. Phase 1 does not auto-post or auto-message. Referral attribution remains local until a shared backend is connected.</small>';
    var footer=document.querySelector('footer');
    if(footer&&footer.parentNode) footer.parentNode.insertBefore(box,footer); else document.body.appendChild(box);

    var u=encodeURIComponent(shareUrl());
    var txt=encodeURIComponent(shareText());
    var links={
      whatsapp:'https://wa.me/?text='+txt+'%20'+u,
      facebook:'https://www.facebook.com/sharer/sharer.php?u='+u,
      linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+u,
      x:'https://twitter.com/intent/tweet?text='+txt+'&url='+u,
      telegram:'https://t.me/share/url?url='+u+'&text='+txt
    };
    box.querySelectorAll('[data-ags]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var a=btn.getAttribute('data-ags');
        if(a==='native') nativeShare();
        else if(a==='copy') copy(shareUrl(),'AYMP link copied!');
        else if(a==='package') copy(shareText()+'\n'+shareUrl(),'AYMP share package copied!');
        else if(a==='invite') copy(inviteUrl(),'AYMP invite link copied!');
        else if(links[a]) openShare(links[a]);
      });
    });
  }
  function escapeHtml(v){return String(v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}

  function init(){addStyles();addPanel();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
