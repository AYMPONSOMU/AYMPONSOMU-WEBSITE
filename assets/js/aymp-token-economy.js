/* AYMP Token Economy — additive homepage module
   Displays official project-supplied token contract addresses and future utility paths.
   No wallet connection, transaction signing, price promises, or investment guarantees.
*/
(function(){
  'use strict';
  if(document.getElementById('aymp-token-economy')) return;

  var tokens=[
    {name:'AYMP',address:'0x6D85F3435EA87459AFC269E215Fa262AbD6C4EA1',role:'AYMP ecosystem utility and future digital services',color:'#ffd86b'},
    {name:'999xyz999',address:'0xDF09Ebe8FC19C7345918f921c9C3dEda545c4AA7',role:'Participation, game and future reward utility',color:'#8ee7ff'}
  ];
  var base='https://aymp999.github.io/.in/';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function card(t){
    var bsc='https://bscscan.com/token/'+t.address;
    var swap='https://pancakeswap.finance/swap?outputCurrency='+t.address+'&chain=bsc';
    return '<article class="aymp-token-card">'+
      '<div class="aymp-token-badge">BEP-20 • BNB SMART CHAIN</div>'+
      '<h3 style="color:'+t.color+'">'+esc(t.name)+'</h3>'+
      '<p>'+esc(t.role)+'.</p>'+
      '<div class="aymp-token-address"><span>Contract</span><code>'+esc(t.address)+'</code><button type="button" data-copy="'+esc(t.address)+'">Copy</button></div>'+
      '<div class="aymp-token-actions"><a href="'+bsc+'" target="_blank" rel="noopener">🔎 View on BscScan</a><a href="'+swap+'" target="_blank" rel="noopener">🥞 Open PancakeSwap</a></div>'+
    '</article>';
  }
  var section=document.createElement('section');
  section.id='aymp-token-economy';
  section.innerHTML='<div class="aymp-token-wrap">'+
    '<div class="aymp-token-kicker">🔗 AYMP WEB3 ECOSYSTEM</div>'+ 
    '<h2>AYMP Future Digital Economy</h2>'+ 
    '<p class="aymp-token-intro">Two project tokens are being introduced as part of the growing AYMP ecosystem, with future utilities across digital experiences, games, services and community participation.</p>'+ 
    '<div class="aymp-token-grid">'+tokens.map(card).join('')+'</div>'+ 
    '<div class="aymp-future-income"><h3>💰 Future Utility & Earning Opportunities</h3><div class="aymp-income-grid">'+
      '<span>🎮 Game utilities & rewards</span><span>🌍 Community participation</span><span>🛍️ Future digital services</span><span>🤝 Referral opportunities</span><span>🔗 Web3 ecosystem utilities</span><span>🎁 Future reward programs</span>'+ 
    '</div><p>As the ecosystem develops, additional utilities and participation opportunities may be introduced. Availability, eligibility and terms may vary.</p></div>'+ 
    '<div class="aymp-token-note">⚠️ <strong>Important:</strong> Token prices and future income are not guaranteed. This page describes planned/project utilities and does not constitute investment advice or a promise of profit. Always verify the contract address and network before interacting with a token.</div>'+ 
    '<div class="aymp-token-cta"><a href="'+base+'" aria-label="Return to AYMP homepage">🌐 Explore AYMP</a></div>'+ 
  '</div>';
  var css=document.createElement('style');
  css.textContent='#aymp-token-economy{padding:64px 20px;background:linear-gradient(135deg,#07101f,#17112d 55%,#071a28);border-top:1px solid rgba(255,215,0,.25);border-bottom:1px solid rgba(255,215,0,.18);color:#fff}.aymp-token-wrap{max-width:1180px;margin:auto}.aymp-token-kicker{text-align:center;letter-spacing:3px;font-size:12px;font-weight:800;color:#d8c58a}.aymp-token-economy h2{text-align:center;color:#ffd86b;font:800 38px Georgia,serif;margin:9px 0 14px}.aymp-token-intro{max-width:850px;margin:0 auto 30px;text-align:center;color:#d7dce5;line-height:1.75}.aymp-token-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.aymp-token-card{padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:rgba(255,255,255,.055);box-shadow:0 14px 40px rgba(0,0,0,.2)}.aymp-token-badge{font-size:11px;letter-spacing:1.4px;color:#aeb7c7;font-weight:800}.aymp-token-card h3{font-size:30px;margin:8px 0}.aymp-token-card p{color:#d8dce5;line-height:1.6}.aymp-token-address{margin:16px 0;padding:12px;border-radius:14px;background:rgba(0,0,0,.25);display:grid;gap:6px}.aymp-token-address span{font-size:11px;color:#9ca8bb;text-transform:uppercase}.aymp-token-address code{font-size:11px;overflow-wrap:anywhere;color:#fff}.aymp-token-address button{justify-self:start;border:1px solid rgba(255,215,107,.5);border-radius:16px;padding:6px 11px;background:transparent;color:#ffd86b;cursor:pointer}.aymp-token-actions{display:flex;flex-wrap:wrap;gap:9px}.aymp-token-actions a,.aymp-token-cta a{display:inline-block;padding:10px 14px;border-radius:18px;text-decoration:none;color:#111;background:#ffd86b;font-weight:800}.aymp-token-actions a+a{background:#8ee7ff}.aymp-future-income{margin-top:24px;padding:24px;border-radius:22px;background:linear-gradient(135deg,rgba(255,216,107,.08),rgba(142,231,255,.07));border:1px solid rgba(255,255,255,.12)}.aymp-future-income h3{margin-top:0;color:#fff}.aymp-income-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.aymp-income-grid span{padding:12px;border-radius:13px;background:rgba(255,255,255,.055);color:#e7eaf0}.aymp-future-income p,.aymp-token-note{color:#aeb7c7;font-size:13px;line-height:1.6}.aymp-token-note{margin-top:18px;padding:15px;border-left:3px solid #ffd86b;background:rgba(255,255,255,.035)}.aymp-token-cta{text-align:center;margin-top:22px}.aymp-token-cta a{background:linear-gradient(45deg,#c9a227,#ffdf6b)}@media(max-width:700px){.aymp-token-grid{grid-template-columns:1fr}.aymp-income-grid{grid-template-columns:1fr}.aymp-token-economy h2{font-size:30px}.aymp-token-card{padding:18px}}';
  document.head.appendChild(css);
  var hero=document.querySelector('header');
  if(hero&&hero.parentNode) hero.parentNode.insertBefore(section,hero.nextSibling);
  else document.body.appendChild(section);
  section.querySelectorAll('[data-copy]').forEach(function(btn){btn.addEventListener('click',function(){var text=btn.getAttribute('data-copy'); if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){btn.textContent='Copied';setTimeout(function(){btn.textContent='Copy'},1400)});} });});
})();
