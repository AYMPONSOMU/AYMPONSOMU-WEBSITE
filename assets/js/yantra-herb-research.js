// AYMP Yantra • Herb • Tantric Research module
// Phase 1: 35 herbs + 8 Yantras + 9-planet research structure.
// Phase 2 UI: select life concern and open the research-mapping workspace.
// Standalone module: does not replace guidance.js or music logic.
(function () {
  'use strict';

  const DB_URL = 'data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';
  const SESSION_KEY = 'aympResearchSession_v1';

  function esc(value) {
    return String(value ?? '').replace(/[&<>\"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#039;'
    }[c]));
  }

  function readBirthDetails() {
    const form = document.getElementById('guidanceForm');
    if (!form) return {};
    const get = (...names) => {
      for (const name of names) {
        const el = form.querySelector(`[name="${name}"], #${name}`);
        if (el && el.value) return el.value.trim();
      }
      return '';
    };
    return {
      name: get('name', 'fullName', 'userName', 'guidanceName'),
      dob: get('dob', 'dateOfBirth', 'birthDate', 'guidanceDob'),
      birth_time: get('birth_time', 'birthTime', 'timeOfBirth', 'guidanceTime'),
      birth_place: get('birth_place', 'birthPlace', 'placeOfBirth', 'guidancePlace')
    };
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

  function cardClassFor(value) {
    return value ? 'research-card' : 'research-card research-pending';
  }

  function getStoredSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}'); }
    catch (_) { return {}; }
  }

  function storeSession(data) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch (_) {}
  }

  function renderWorkspace(modal, db, birth, selectedConcern) {
    const herbs = db.herbs || [];
    const yantras = db.yantras || [];
    const planets = (db.planetary_analysis && db.planetary_analysis.planets) || [];
    const concerns = (db.research_guidance && db.research_guidance.life_concerns) || [];
    const flow = (db.guidance_flow && db.guidance_flow.steps) || [];
    const concern = concerns.find(c => c.id === selectedConcern) || null;

    modal.innerHTML = `
      <div class="aymp-research-panel">
        <button type="button" class="aymp-research-close" aria-label="Close">×</button>
        <h2>🔱 AYMP RESEARCH GUIDANCE</h2>
        <p class="aymp-research-intro">Yantra • Herb • Tantric Research — Phase 1</p>

        <div class="research-section research-birth-summary">
          <h3>🪔 Birth Details Received</h3>
          <div class="research-grid birth-grid">
            <div class="research-card"><strong>Name</strong><span>${esc(birth.name || 'Not entered')}</span></div>
            <div class="research-card"><strong>Date of Birth</strong><span>${esc(birth.dob || 'Not entered')}</span></div>
            <div class="research-card"><strong>Birth Time</strong><span>${esc(birth.birth_time || 'Not entered')}</span></div>
            <div class="research-card"><strong>Birth Place</strong><span>${esc(birth.birth_place || 'Not entered')}</span></div>
          </div>
          <p class="research-note">These details are the input for the research flow. No planetary position or planet-to-herb/yantra relationship is invented by this module.</p>
        </div>

        <div class="research-section">
          <h3>🧭 Research Flow</h3>
          <div class="research-flow">
            ${flow.map((step, i) => `<div class="flow-step"><b>${i + 1}</b><span>${esc(String(step).replaceAll('_', ' '))}</span></div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🎯 Select the Research Concern</h3>
          <div class="research-concern-grid">
            ${concerns.map(c => `
              <button type="button" class="research-concern-btn ${c.id === selectedConcern ? 'active' : ''}" data-concern="${esc(c.id)}">
                ${esc(c.label_ta)}
              </button>`).join('')}
          </div>
          <div class="selected-concern-box">
            <strong>Selected research pathway:</strong>
            <span>${esc(concern ? concern.label_ta : 'Not selected')}</span>
          </div>
        </div>

        <div class="research-section research-analysis-workspace">
          <h3>🌌 9 Planetary Research</h3>
          <p class="research-note">This is the analysis workspace. The actual planetary positions, houses, signs and strength/challenge findings must come from the approved AYMP calculation/research framework before a herb, Yantra or mantra is selected.</p>
          <div class="research-grid planetary-analysis-grid">
            ${planets.map(p => `
              <div class="${cardClassFor(p.research_interpretation)} planet-analysis-card">
                <strong>${esc(p.name_ta)}</strong>
                <span>${esc(p.name_en)}</span>
                <div class="planet-field"><b>Position</b><em>${esc(p.planetary_position || 'Pending')}</em></div>
                <div class="planet-field"><b>House</b><em>${esc(p.house || 'Pending')}</em></div>
                <div class="planet-field"><b>Sign</b><em>${esc(p.sign || 'Pending')}</em></div>
                <div class="planet-field"><b>Strength / Challenge</b><em>${esc(p.strength_or_challenge || 'Pending')}</em></div>
                <small>${esc(p.research_interpretation || 'Research mapping pending')}</small>
              </div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🔱 Yantra Research — 8 Phase 1 Records</h3>
          <div class="research-grid yantra-image-grid">
            ${yantras.map(y => `
              <div class="research-card yantra-card">
                <img src="images/${esc(y.image)}" alt="${esc(y.name_en)}" loading="lazy"
                  onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                <strong>${esc(y.name_en)}</strong>
                <span>${esc(y.name_ta || 'Yantra Research Record')}</span>
                <small>${esc(y.research_summary || 'Research details pending')}</small>
              </div>`).join('')}
          </div>
        </div>

        <div class="research-section">
          <h3>🌿 35 Herbal Research Records</h3>
          <div class="research-list">
            ${herbs.map(h => `
              <div class="research-row">
                <strong>${esc(h.name_ta)}</strong>
                <span>${esc(h.name_en)}</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="research-section research-next-step">
          <h3>🧿 Research Mapping Result</h3>
          <div class="research-mapping-box">
            <div><b>Planetary finding</b><span>Awaiting approved birth-chart analysis</span></div>
            <div><b>Selected Yantra</b><span>Awaiting approved research mapping</span></div>
            <div><b>Selected Herb(s)</b><span>Awaiting approved research mapping</span></div>
            <div><b>Mantra reference</b><span>Awaiting approved mantra record</span></div>
            <div><b>Talisman research</b><span>Awaiting approved talisman record</span></div>
            <div><b>Traditional guidance</b><span>Awaiting verified research notes</span></div>
          </div>
          <div class="research-action-row">
            <button type="button" id="saveResearchSessionBtn" class="research-primary-btn">💾 SAVE RESEARCH INTAKE</button>
            <button type="button" id="resetResearchConcernBtn" class="research-secondary-btn">↺ RESET CONCERN</button>
          </div>
          <p id="researchSaveStatus" class="research-save-status" aria-live="polite"></p>
        </div>

        <div class="research-disclaimer">
          Traditional/spiritual research information is presented for educational and research purposes. Individual research mappings should be verified before publication or use. This module does not guarantee medical, financial, relationship, or life outcomes.
        </div>
      </div>`;

    modal.querySelector('.aymp-research-close').onclick = () => modal.remove();
    modal.querySelectorAll('.research-concern-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextConcern = btn.getAttribute('data-concern') || '';
        storeSession({ birth, selectedConcern: nextConcern, savedAt: new Date().toISOString() });
        renderWorkspace(modal, db, birth, nextConcern);
      });
    });

    const saveBtn = modal.querySelector('#saveResearchSessionBtn');
    const resetBtn = modal.querySelector('#resetResearchConcernBtn');
    const status = modal.querySelector('#researchSaveStatus');
    if (saveBtn) saveBtn.onclick = () => {
      storeSession({ birth, selectedConcern: selectedConcern || '', savedAt: new Date().toISOString() });
      if (status) status.textContent = '✓ Research intake saved for this browser session.';
    };
    if (resetBtn) resetBtn.onclick = () => {
      storeSession({ birth, selectedConcern: '', savedAt: new Date().toISOString() });
      renderWorkspace(modal, db, birth, '');
    };
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

    const birth = readBirthDetails();
    const stored = getStoredSession();
    const selectedConcern = stored.birth && JSON.stringify(stored.birth) === JSON.stringify(birth)
      ? (stored.selectedConcern || '') : '';

    renderWorkspace(modal, db, birth, selectedConcern);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); }, { once: true });
  }

  function init() { createButton(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
