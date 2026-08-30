/* AYMP Token Introduction Layer — display only. No blockchain balance is claimed. */
(function(){
  'use strict';
  function init(){
    if(document.getElementById('aymp-token-bar')) return;
    var bar=document.createElement('div');
    bar.id='aymp-token-bar';
    bar.innerHTML='<div class="aymp-token-inner">'+
      '<a href="token.html" class="aymp-token-item" aria-label="AYMP token">🪙 <strong>AYMP</strong> : <span>0</span></a>'+
      '<a href="token.html" class="aymp-token-item" aria-label="999xyz999 token">💠 <strong>999xyz999</strong> : <span>0</span></a>'+
      '<a href="token.html" class="aymp-token-info">TOKEN WORLD →</a>'+
      '</div>';
    var css=document.createElement('style');
    css.id='aymp-token-style';
    css.textContent='#aymp-token-bar{position:sticky;top:0;z-index:10000;width:100%;background:rgba(4,8,25,.94);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,215,0,.28);box-shadow:0 3px 18px rgba(0,0,0,.25)}.aymp-token-inner{max-width:1200px;margin:auto;min-height:44px;padding:6px 14px;display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap}.aymp-token-item,.aymp-token-info{font-family:system-ui,sans-serif;text-decoration:none;color:#fff;border:1px solid rgba(255,215,0,.25);background:rgba(255,255,255,.045);border-radius:22px;padding:7px 12px;font-size:13px;font-weight:700}.aymp-token-item strong{color:#ffd700}.aymp-token-info{color:#ffd700;border-color:rgba(255,215,0,.45)}.aymp-token-item:hover,.aymp-token-info:hover{transform:translateY(-1px);border-color:#ffd700}@media(max-width:600px){.aymp-token-inner{gap:5px;padding:5px 8px}.aymp-token-item,.aymp-token-info{font-size:11px;padding:6px 9px}.aymp-token-info{display:none}}';
    document.head.appendChild(css);
    document.body.insertBefore(bar,document.body.firstChild);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
