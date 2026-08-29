/* AYMP Games Hub v1 — first playable game, additive to existing Game Zone. */
(function(){
'use strict';
var questions=[
 {q:'Which planet is known as the Red Planet?',a:['Venus','Mars','Jupiter','Mercury'],c:1},
 {q:'Which ocean is the largest?',a:['Atlantic','Indian','Arctic','Pacific'],c:3},
 {q:'How many sides does a hexagon have?',a:['5','6','7','8'],c:1},
 {q:'Which animal is famous for changing its skin colour?',a:['Cheetah','Chameleon','Penguin','Giraffe'],c:1},
 {q:'What is H₂O commonly called?',a:['Oxygen','Salt','Water','Hydrogen'],c:2}
];
function init(){
 var zone=document.querySelector('.wrap'); if(!zone||document.getElementById('aymp-brain-game'))return;
 var box=document.createElement('section');box.id='aymp-brain-game';box.style.cssText='margin-top:38px;padding:28px;border-radius:24px;background:linear-gradient(135deg,rgba(255,215,0,.10),rgba(74,96,180,.10));border:1px solid rgba(255,215,0,.28);box-shadow:0 15px 50px rgba(0,0,0,.25)';
 box.innerHTML='<div style="text-align:center;color:#ffd700;letter-spacing:2px;font-size:12px;font-weight:800">🎮 PLAYABLE GAME · V1</div><h2 style="text-align:center;color:#fff;font-size:30px;margin:8px 0">🧠 AYMP Daily Brain Challenge</h2><p id="aymp-game-status" style="text-align:center;color:#ccc">5 questions · Try to beat your best score!</p><div id="aymp-question"></div><div id="aymp-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px"></div><div id="aymp-result" style="text-align:center;margin-top:18px"></div>';
 zone.appendChild(box);
 var n=0,score=0,answered=false,qs=questions.slice().sort(function(){return Math.random()-.5});
 function render(){
  if(n>=qs.length){
   var best=Math.max(score,Number(localStorage.getItem('aympBrainBest')||0));localStorage.setItem('aympBrainBest',best);
   document.getElementById('aymp-question').innerHTML='<h3 style="color:#ffd700;text-align:center;font-size:28px">🏆 Challenge Complete!</h3><p style="color:#eee;text-align:center;font-size:20px">Your Score: <b>'+score+'/'+qs.length+'</b></p><p style="color:#bbb;text-align:center">Best Score: '+best+'/'+qs.length+'</p>';
   document.getElementById('aymp-options').innerHTML='<button id="aymp-play-again" style="padding:13px;border:0;border-radius:22px;background:#ffd700;color:#111;font-weight:800;cursor:pointer">🔄 Play Again</button>';
   document.getElementById('aymp-play-again').onclick=function(){n=0;score=0;qs=questions.slice().sort(function(){return Math.random()-.5});render()};return;
  }
  answered=false;var x=qs[n];document.getElementById('aymp-game-status').textContent='Question '+(n+1)+' of '+qs.length+' · Score '+score;
  document.getElementById('aymp-question').innerHTML='<h3 style="color:#fff;text-align:center;font-size:22px;line-height:1.45">'+x.q+'</h3>';
  var op=document.getElementById('aymp-options');op.innerHTML='';x.a.forEach(function(t,i){var b=document.createElement('button');b.textContent=t;b.style.cssText='padding:14px;border:1px solid rgba(255,215,0,.3);border-radius:16px;background:rgba(255,255,255,.07);color:#fff;font-size:16px;font-weight:700;cursor:pointer';b.onclick=function(){if(answered)return;answered=true;if(i===x.c){score++;b.textContent='✅ '+t;document.getElementById('aymp-result').innerHTML='<span style="color:#8cff9a;font-weight:800">Correct! +1 point</span>'}else{b.textContent='❌ '+t;document.getElementById('aymp-result').innerHTML='<span style="color:#ffb0b0">Not quite — the correct answer is '+x.a[x.c]+'.</span>'}setTimeout(function(){document.getElementById('aymp-result').innerHTML='';n++;render()},850)};op.appendChild(b)});
 }
 render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
