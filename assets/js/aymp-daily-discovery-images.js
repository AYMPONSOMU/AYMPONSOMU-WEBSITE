/* AYMP Daily Discovery Images — additive visual layer. */
document.addEventListener('DOMContentLoaded', function () {
  function initDailyImages() {
    var wow = document.getElementById('aymp-wow-card');
    if (!wow || document.getElementById('aymp-daily-visuals')) return;

    var fallback = [
      {url:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85',title:'Earth from Space',type:'COSMIC WONDER',text:'A reminder of how extraordinary our shared planet looks from beyond its atmosphere.'},
      {url:'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85',title:'A Galaxy Far Away',type:'SPACE DISCOVERY',text:'The night sky is filled with distant galaxies, each carrying clues about the history of the universe.'},
      {url:'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1400&q=85',title:'Into the Cosmos',type:'COSMIC EXPLORATION',text:'Modern astronomy continues to reveal objects and phenomena that challenge our imagination.'},
      {url:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',title:'A World of Hidden Beauty',type:'NATURE WONDER',text:'Landscapes around the world show how geology, climate and life can create astonishing forms.'},
      {url:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85',title:'Nature Changes Every Day',type:'NATURE DISCOVERY',text:'Light, water, weather and living systems constantly transform the world around us.'},
      {url:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85',title:'The Quiet World of Plants',type:'HERBAL WONDER',text:'Plants have remarkable structures and survival strategies that continue to inspire research.'},
      {url:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=85',title:'Green Intelligence',type:'PLANT DISCOVERY',text:'Leaves, roots and flowers interact with their environment in surprisingly sophisticated ways.'},
      {url:'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=85',title:'A Living Planet',type:'EARTH WONDER',text:'Forests, oceans and skies form interconnected systems that make life on Earth possible.'},
      {url:'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=85',title:'Stars, Light and Time',type:'ASTRONOMY',text:'Every star we see carries information about a distant place and an earlier moment in cosmic history.'},
      {url:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=85',title:'Wild Earth',type:'NATURE WONDER',text:'Earths wild places reveal patterns of adaptation, resilience and extraordinary biodiversity.'},
      {url:'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85',title:'Forest Secrets',type:'NATURE & PLANTS',text:'A forest is a living network where countless organisms interact in ways scientists are still studying.'},
      {url:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',title:'Mountain Mysteries',type:'EARTH DISCOVERY',text:'Mountains preserve clues about Earths geological history and create unique habitats for life.'}
    ];

    var day = Math.floor(Date.now() / 86400000);
    function render(images) {
      if (!images || !images.length) images = fallback;
      var main = images[day % images.length];
      var gallery = [];
      for (var i = 0; i < 6; i++) gallery.push(images[(day * 7 + i * 13) % images.length]);
      var imageHtml = '<div style="margin:22px 0 18px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,215,0,.3);box-shadow:0 14px 45px rgba(0,0,0,.35);position:relative">' +
        '<img src="' + main.url + '" alt="' + main.title + ' — AYMP Daily Discovery" loading="eager" style="width:100%;height:390px;object-fit:cover;display:block">' +
        '<div style="position:absolute;left:16px;bottom:16px;padding:8px 13px;border-radius:20px;background:rgba(0,0,0,.72);color:#ffd700;font-weight:700;font-size:12px;letter-spacing:1px">' + main.type + '</div>' +
        '</div>' +
        '<h3 style="color:#fff;text-align:center;font-size:27px;margin:8px 0">' + main.title + '</h3>' +
        '<p style="color:#ddd;text-align:center;max-width:720px;margin:0 auto 20px">' + main.text + '</p>';
      var existing = wow.innerHTML;
      var insertAt = existing.indexOf('<div style="font-size:46px;text-align:center">');
      if (insertAt >= 0) {
        var firstEnd = existing.indexOf('</div>', insertAt) + 6;
        wow.innerHTML = existing.slice(0, insertAt) + imageHtml + existing.slice(firstEnd);
      } else if (!wow.querySelector('img')) {
        wow.insertAdjacentHTML('afterbegin', imageHtml);
      }
      var visuals = document.createElement('div');
      visuals.id = 'aymp-daily-visuals';
      visuals.style.cssText = 'max-width:1200px;margin:28px auto 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;';
      visuals.innerHTML = gallery.map(function (item, i) {
        return '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;border-radius:18px;overflow:hidden;border:1px solid rgba(255,215,0,.18);background:rgba(255,255,255,.05);transition:transform .25s ease" title="Open image source">' +
          '<img src="' + item.url + '" alt="AYMP Daily Discovery ' + item.type + '" loading="lazy" style="width:100%;height:155px;object-fit:cover;display:block">' +
          '<div style="padding:10px;color:#eee;font-size:12px;font-weight:600">' + (i === 0 ? '✨ Today’s featured image' : item.type) + '</div></a>';
      }).join('');
      var section = document.createElement('div');
      section.style.cssText = 'margin-top:32px;';
      section.innerHTML = '<div style="text-align:center;color:#ffd700;font-size:13px;letter-spacing:2px;font-weight:700;margin-bottom:12px">🖼️ AYMP DAILY DISCOVERY GALLERY · ROTATING IMAGE POOL</div>';
      section.appendChild(visuals);
      wow.parentNode.appendChild(section);
    }
    /* The main WOW image now uses the curated daily pool above. Wikimedia is not allowed to replace it with an unpredictable result. */
    render(fallback);
  }
  initDailyImages();
});
