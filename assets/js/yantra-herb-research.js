// AYMP Yantra • Herb • Tantric Research module
// Standalone module: does not replace guidance.js or music logic.
(function () {
  'use strict';

  const DB_URL = 'data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[c]));
  }

  function createButton() {
    const form = document.getElementById('guidanceForm');
    if (!form || document.getElementById('yantraHerbResearchBtn')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'yantraHerbResearchBtn';
    button.className = 'yantra-herb-research-btn';
    button.innerHTML = '🔱 YANTRA • HERB • TANTRIC RESEARCH';

    form.appendChild(button);
    button.addEventListener('click', openResearch);
  }

  async function openResearch() {
    let db;
    try {
      const response = await fetch(DB_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error('Database loading failed');
      db = await response.json();
    } catch (error) {
      alert('Research Database could not be loaded. Please try again.');
      console.error('AYMP Research Database:', error);
      return;
    }

    let modal = document.getElementById('aympResearchModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'aympResearchModal';
      modal.className = 'aymp-research-modal';
      document.body.appendChild(modal);
    }

    const herbs = db.herbs || [];
    const yantras = db.yantras || [];
    const planets = (db.planetary_analysis && db.planetary_analysis.planets) || [];
    const concerns = (db.research_guidance && db.research_guidance.life_concerns) || [];

    modal.innerHTML = `
      <div class="aymp-research-panel">
        <button type="button" class="aymp-research-close" aria-label="Close">×</button>
        <h2>🔱 AYMP RESEARCH GUIDANCE</h2>
        <p class="aymp-research-intro">Yantra • Herb • Tantric Research</p>

        <div class="research-section">
          <h3>🌌 9 Planetary Research</h3>
          <div class="research-grid">
            ${planets.map(p => `<div class="research-card"><strong>${esc(p.name_ta)}</strong><span>${esc(p.name_en)}</span></div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🎯 Guidance Area</h3>
          <div class="research-grid">
            ${concerns.map(c => `<div class="research-card"><strong>${esc(c.label_ta)}</strong></div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🌿 35 Herbal Research Records</h3>
          <div class="research-list">
            ${herbs.map(h => `<div class="research-row"><strong>${esc(h.name_ta)}</strong><span>${esc(h.name_en)}</span></div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🔱 Yantra Research</h3>
          <div class="research-grid yantra-image-grid">
            ${yantras.map(y => `
              <div class="research-card yantra-card">
                <img src="images/${esc(y.image)}" alt="${esc(y.name_en)}" loading="lazy"
                  onerror="this.style.display='none'; this.nextElementSibling.classList.add('image-missing');">
                <strong>${esc(y.name_en)}</strong>
                <span class="yantra-image-status">Traditional Yantra Image</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="research-disclaimer">
          Traditional/spiritual research information is presented for educational and research purposes. Individual research mappings should be verified before publication or use.
        </div>
      </div>`;

    modal.querySelector('.aymp-research-close').onclick = () => modal.remove();
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); }, { once: true });
  }

  function init() { createButton(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
