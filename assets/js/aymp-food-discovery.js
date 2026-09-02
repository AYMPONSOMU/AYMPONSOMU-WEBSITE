/* AYMP Food Discovery v1 — additive daily rotation + local engagement */
(function(){
'use strict';
var foods=[
['🇮🇳','India','Masala Dosa','Crisp fermented rice-and-lentil crepe served with sambar and chutney.','Rice, urad dal, salt; soak, grind, ferment, spread thin and cook on a hot tawa.'],
['🇮🇳','India','Pongal','Comforting rice-and-lentil dish with a gentle savory spice profile.','Rice, moong dal, pepper, cumin, ginger; cook together until soft and season.'],
['🇮🇳','India','Chole Bhature','Spiced chickpeas paired with fluffy fried bread.','Chickpeas, onion, tomato, spices, flour; simmer the chickpeas and prepare the bhature dough before frying.'],
['🇮🇳','India','Pani Puri','Popular street snack with crisp shells, filling and tangy flavored water.','Puri shells, potato, chickpeas, herbs and spiced water; fill and serve immediately.'],
['🇮🇳','India','Idli Sambar','Soft steamed fermented rice-and-lentil cakes with vegetable sambar.','Idli batter and sambar vegetables; ferment batter, steam portions and serve with sambar.'],
['🇮🇹','Italy','Margherita Pizza','Classic pizza built around tomato, mozzarella and basil.','Pizza dough, tomato, mozzarella, basil; stretch dough, top lightly and bake at high heat.'],
['🇮🇹','Italy','Pasta Carbonara','Silky pasta traditionally finished with egg, cheese and pepper.','Pasta, egg, hard cheese, pepper and suitable cured pork; toss off heat to form a creamy coating.'],
['🇫🇷','France','Crêpe','Thin French pancake that works with sweet or savory fillings.','Flour, eggs, milk and butter; whisk a thin batter and cook quickly in a lightly greased pan.'],
['🇫🇷','France','Ratatouille','Colorful vegetable dish built around Mediterranean produce and herbs.','Eggplant, zucchini, tomato, onion and herbs; cook vegetables gently until tender.'],
['🇪🇸','Spain','Paella','Famous rice dish associated with Spanish culinary tradition.','Short-grain rice, vegetables, saffron and suitable protein; cook rice gently in seasoned stock.'],
['🇬🇷','Greece','Greek Salad','Fresh salad combining vegetables, herbs and feta.','Tomato, cucumber, onion, olives, feta and olive oil; cut, combine and dress just before serving.'],
['🇹🇷','Türkiye','Menemen','Warm egg dish with tomato, pepper and spices.','Eggs, tomato, green pepper and spices; soften vegetables and gently cook the eggs through.'],
['🇯🇵','Japan','Sushi','Seasoned rice prepared with selected fillings or toppings.','Sushi rice, rice vinegar, nori and suitable fillings; season rice, cool and shape with fillings.'],
['🇯🇵','Japan','Ramen','Japanese noodle soup with broth, noodles and toppings.','Noodles, broth, vegetables and selected toppings; prepare broth, cook noodles and assemble hot.'],
['🇰🇷','South Korea','Bibimbap','Rice bowl topped with colorful vegetables and a savory sauce.','Rice, vegetables, egg and gochujang-style sauce; arrange toppings over hot rice and mix before eating.'],
['🇹🇭','Thailand','Pad Thai','Stir-fried rice noodles balanced with sweet, sour and savory flavors.','Rice noodles, vegetables, egg and sauce; soak noodles and stir-fry quickly with the seasoning.'],
['🇻🇳','Vietnam','Pho','Aromatic noodle soup with herbs and a fragrant broth.','Rice noodles, broth, herbs and suitable protein; prepare broth, cook noodles and assemble with herbs.'],
['🇨🇳','China','Dumplings','Filled dough parcels found across many Chinese regional traditions.','Dumpling wrappers, vegetables and selected filling; fill, seal and steam, boil or pan-cook.'],
['🇲🇽','Mexico','Tacos','Flexible street-food style dish with tortillas and flavorful fillings.','Corn or flour tortillas, vegetables and selected filling; warm tortillas and assemble with toppings.'],
['🇧🇷','Brazil','Pão de Queijo','Small Brazilian cheese breads with a chewy center.','Tapioca starch, cheese, eggs and milk; mix, shape and bake until puffed.'],
['🇱🇧','Lebanon','Hummus','Creamy chickpea dip commonly served with bread and vegetables.','Chickpeas, tahini, lemon and garlic; blend until smooth and adjust seasoning.'],
['🇪🇹','Ethiopia','Injera','Spongy fermented flatbread traditionally paired with flavorful dishes.','Teff-based batter; ferment, pour thinly and cook until the surface sets.'],
['🇲🇦','Morocco','Couscous','Steamed semolina grains served with vegetables and aromatic seasoning.','Couscous, vegetables, broth and spices; steam or hydrate grains and serve with the cooked topping.'],
['🇺🇸','USA','Pancakes','Soft griddle cakes often served with fruit or syrup.','Flour, eggs, milk and baking powder; mix gently and cook small rounds on a hot griddle.'],
['🇬🇧','UK','Fish and Chips','Classic British combination of battered fish and fried potatoes.','Fish, batter and potatoes; coat fish, fry until crisp and serve with hot chips.'],
['🇩🇪','Germany','Pretzel','Twisted baked bread with a characteristic chewy crust.','Flour, yeast, water and salt; shape, dip in alkaline solution and bake until browned.'],
['🇦🇺','Australia','Pavlova','Meringue-based dessert with crisp edges and soft center.','Egg whites, sugar and suitable toppings; whip, shape and bake gently before topping.'],
['🇮🇩','Indonesia','Nasi Goreng','Flavorful fried rice with vegetables and optional protein.','Cooked rice, aromatics, vegetables and seasoning; stir-fry quickly over high heat.'],
['🇵🇭','Philippines','Adobo','Slow-cooked savory dish known for a balanced salty-tangy flavor.','Suitable protein, vinegar, soy-style seasoning, garlic and spices; simmer gently until tender.'],
['🇵🇪','Peru','Ceviche','Citrus-marinated seafood dish with fresh herbs and vegetables.','Fresh seafood, citrus, onion and herbs; combine shortly before serving and keep properly chilled.'],
['🇮🇷','Iran','Tahdig','Golden crisp rice layer prized in Persian cooking.','Rice, oil or butter and seasoning; cook rice so the bottom develops a crisp golden layer.'],
['🇮🇱','Levant','Shakshuka','Eggs gently cooked in a rich tomato and pepper sauce.','Tomato, peppers, onion, eggs and spices; simmer sauce then cook eggs gently on top.'],
['🇮🇳','India','Gulab Jamun','Soft milk-based sweets soaked in fragrant syrup.','Milk-solid dough, flour and sugar syrup; shape, fry gently and soak in warm syrup.'],
['🇮🇳','India','Jalebi','Crisp spiral sweet soaked in fragrant sugar syrup.','Fermented-style batter and sugar syrup; pipe spirals into hot oil and soak briefly in syrup.'],
['🇫🇷','France','Crème Brûlée','Silky baked custard finished with a thin caramelized sugar crust.','Cream, egg yolks, sugar and vanilla; bake gently, chill and caramelize sugar on top.'],
['🇹🇷','Türkiye','Baklava','Layered pastry dessert with nuts and sweet syrup.','Thin pastry sheets, nuts, butter and syrup; layer, bake until crisp and finish with syrup.'],
['🇮🇳','India','Pav Bhaji','Spiced mashed vegetable curry served with toasted bread rolls.','Mixed vegetables, pav bhaji spices and rolls; cook and mash vegetables, then toast the bread.'],
['🇱🇰','Sri Lanka','Kottu Roti','Chopped flatbread stir-fried with vegetables and selected fillings.','Flatbread, vegetables, seasoning and optional protein; chop and stir-fry together on a hot surface.'],
['🇳🇵','Nepal','Momo','Steamed filled dumplings popular across Himalayan food culture.','Dumpling wrappers and seasoned filling; fold, steam thoroughly and serve with sauce.']
];
function day(){return Math.floor(Date.now()/86400000)}
function esc(s){return String(s||'').replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c})}
function key(i){return 'aymp-food-social-'+i}
function state(i){try{return JSON.parse(localStorage.getItem(key(i))||'{"likes":0,"comments":[]}')}catch(e){return {likes:0,comments:[]}}}
function save(i,s){try{localStorage.setItem(key(i),JSON.stringify(s))}catch(e){}}
function social(i){var s=state(i);return '<div class="aymp-food-social"><button data-food-like="'+i+'">❤️ Like <b>'+s.likes+'</b></button><button data-food-comment="'+i+'">💬 Comment <b>'+s.comments.length+'</b></button><button data-food-share="'+i+'">📤 Share</button><button data-food-repost="'+i+'">🔁 Repost</button></div>'}
function render(){var grid=document.querySelector('#aymp-food-grid');if(!grid)return;var start=(day()*7)%foods.length,items=[];for(var j=0;j<9;j++)items.push(foods[(start+j)%foods.length]);grid.innerHTML=items.map(function(f,idx){var id=(start+idx)%foods.length;return '<article class="aymp-food-card" data-food-index="'+id+'"><div class="aymp-food-visual"><span>'+f[0]+'</span></div><div class="aymp-food-body"><div class="aymp-food-meta">'+esc(f[1])+' • '+(idx===0?'✨ TODAY\'S FEATURE':'DAILY DISCOVERY')+'</div><h2>'+esc(f[2])+'</h2><p>'+esc(f[3])+'</p><details><summary>👨‍🍳 Ingredients & Preparation</summary><div><b>Ingredients:</b> '+esc(f[4].split(';')[0])+'<br><b>Method:</b> '+esc(f[4].split(';').slice(1).join(';'))+'</div></details>'+social(id)+'</div></article>'}).join('');bind(grid)}
function bind(grid){grid.querySelectorAll('[data-food-like]').forEach(function(b){b.onclick=function(){var i=+b.dataset.foodLike,s=state(i);s.likes++;save(i,s);render()}});grid.querySelectorAll('[data-food-comment]').forEach(function(b){b.onclick=function(){var i=+b.dataset.foodComment,s=state(i),c=prompt('Write your comment');if(c&&c.trim()){s.comments.push({text:c.trim(),at:Date.now()});save(i,s);render()}}});grid.querySelectorAll('[data-food-share]').forEach(function(b){b.onclick=function(){var card=b.closest('.aymp-food-card'),name=card.querySelector('h2').textContent,url=location.href+'#food-'+b.dataset.foodShare;if(navigator.share)navigator.share({title:'AYMP Food Discovery: '+name,text:'Discover '+name+' on AYMP',url:url}).catch(function(){});else navigator.clipboard&&navigator.clipboard.writeText(url)}});grid.querySelectorAll('[data-food-repost]').forEach(function(b){b.onclick=function(){var card=b.closest('.aymp-food-card'),name=card.querySelector('h2').textContent,url=location.href+'#food-'+b.dataset.foodRepost;if(navigator.share)navigator.share({title:'AYMP Repost: '+name,text:'I discovered '+name+' on AYMP Food Discovery.',url:url}).catch(function(){});else navigator.clipboard&&navigator.clipboard.writeText(url)}})}
function start(){var old=document.querySelector('.grid');if(!old)return;old.id='aymp-food-grid';old.classList.add('aymp-food-grid');render();var d=document.createElement('div');d.className='aymp-food-note';d.textContent='🍽️ Daily rotation: new dishes are selected automatically each day. Likes and comments are saved on this device.';old.parentNode.insertBefore(d,old.nextSibling)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
