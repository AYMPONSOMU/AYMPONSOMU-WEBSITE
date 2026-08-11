// AYMP Lagna Research Result Engine v3
// Connects calculated sidereal Lagna + life concern to the AYMP planetary research database.
// Unverified mappings remain explicitly pending; this module does not invent Yantra/Herb assignments.
(function () {
  'use strict';

  const RULES_URL = 'data/aymp_lagna_research_rules_v1.json';
  const PLANETARY_DB_URL = 'data/planetary_research_database_v1.json';
  let rulesPromise = null;
  let planetaryPromise = null;
  let mounted = false;

  function loadRules() {
    if (!rulesPromise) {
      rulesPromise = fetch(RULES_URL, { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error('AYMP Lagna research rules could not be loaded.');
        return r.json();
      });
    }
    return rulesPromise;
  }

  function loadPlanetaryDatabase() {
    if (!planetaryPromise) {
      planetaryPromise = fetch(PLANETARY_DB_URL, { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error('AYMP Planetary Research Database could not be loaded.');
        return r.json();
      });
    }
    return planetaryPromise;
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];
    });
  }

  function lagnaId(chart) {
    const name = String((chart && chart.lagna) || '').toLowerCase();
    const map = {
      aries:'mesha', taurus:'rishabha', gemini:'mithuna', cancer:'kataka',
      leo:'simha', virgo:'kanya', libra:'tula', scorpio:'vrischika',
      sagittarius:'dhanus', capricorn:'makara', aquarius:'kumbha', pisces:'meena'
    };
    return map[name] || '';
  }

  function concernKey(value) {
    const v = String(value || '').toLowerCase();
    if (v === 'business' || v.indexOf('business') >= 0 || v.indexOf('economic') >= 0 || v.indexOf('finance') >= 0) return 'business';
    if (v === 'enemy_opposition' || v.indexOf('enemy') >= 0 || v.indexOf('opposition') >= 0) return 'enemy_opposition';
    if (v === 'janavashyam' || v.indexOf('janavash') >= 0 || v.indexOf('social influence') >= 0) return 'janavashyam';
    if (v === 'child_parenthood' || v.indexOf('child') >= 0 || v.indexOf('parenthood') >= 0) return 'child_parenthood';
    if (v === 'speech_vak_siddhi' || v.indexOf('speech') >= 0 || v.indexOf('vak') >= 0) return 'speech_vak_siddhi';
    if (v === 'marriage' || v.indexOf('marriage') >= 0) return 'marriage';
    if (v === 'love' || v.indexOf('love') >= 0) return 'love_relationship';
    if (v === 'career' || v.indexOf('career') >= 0 || v.indexOf('profession') >= 0) return 'career';
    if (v === 'property_family' || v.indexOf('property') >= 0 || v.indexOf('family') >= 0) return 'property_family';
    if (v === 'mental_peace' || v.indexOf('mental') >= 0 || v.indexOf('peace') >= 0) return 'mental_peace';
    if (v === 'legal_conflict' || v.indexOf('legal') >= 0 || v.indexOf('conflict') >= 0) return 'legal_conflict';
    if (v === 'health_wellbeing' || v.indexOf('health') >= 0 || v.indexOf('well-being') >= 0 || v.indexOf('wellbeing') >= 0) return 'health_wellbeing';
    return 'other';
  }

  function findPlanetaryLagnaRule(db, lagna) {
    const rules = db && Array.isArray(db.lagna_research_rules) ? db.lagna_research_rules : [];
    return rules.find(function (r) { return String(r.lagna || '').toLowerCase() === String(lagna || '').toLowerCase(); }) || null;
  }

  function planetById(db, id) {
    const planets = db && Array.isArray(db.planets) ? db.planets : [];
    return planets.find(function (p) { return p.id === id; }) || null;
  }

  function focusIds(rule) {
    if (!rule) return [];
    return Array.isArray(rule.planetary_focus) ? rule.planetary_focus : [];
  }

  function addStyles() {
    if (document.getElementById('aympLagnaResearchResultCSS')) return;
    const style = document.createElement('style');
    style.id = 'aympLagnaResearchResultCSS';
    style.textContent = `
      .aymp-lagna-result{margin-top:18px;padding:16px;border:1px solid rgba(255,215,120,.25);border-radius:18px;background:linear-gradient(145deg,rgba(55,36,80,.78),rgba(20,14,35,.82));color:#fff}
      .aymp-lagna-result h3{margin:0 0 5px}.aymp-lagna-result .sub{opacity:.68;margin:0 0 13px;font-size:.82rem}
      .aymp-lagna-result select{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,215,120,.28);background:#211a35;color:#fff;font-size:.95rem}
      .aymp-lagna-result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}
      .aymp-lagna-result-card{padding:12px;border-radius:12px;border:1px solid rgba(255,215,120,.16);background:rgba(255,255,255,.035)}
      .aymp-lagna-result-card b{display:block;color:#ffd66a;margin-bottom:5px}.aymp-lagna-result-card p{margin:0;line-height:1.45;font-size:.86rem}
      .aymp-lagna-herbs{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}.aymp-lagna-herbs span{padding:5px 8px;border-radius:999px;background:rgba(255,215,120,.09);border:1px solid rgba(255,215,120,.16);font-size:.72rem;color:#ffe39a}
      .aymp-lagna-pending{padding:13px;border-radius:12px;border:1px dashed rgba(255,215,120,.28);margin-top:12px;color:#ddd;line-height:1.5}
      .aymp-lagna-status{display:inline-block;margin-top:10px;color:#ffd66a;font-size:.72rem}
      .aymp-planetary-link-wrap{margin-top:14px;padding:13px;border-radius:13px;border:1px solid rgba(255,215,120,.14);background:rgba(0,0,0,.12)}
      .aymp-planetary-link-title{margin:0 0 4px;color:#ffd66a;font-size:1rem}.aymp-planetary-link-sub{margin:0 0 10px;opacity:.65;font-size:.76rem}
      .aymp-planetary-link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .aymp-planetary-link-card{padding:10px;border-radius:11px;border:1px solid rgba(255,215,120,.16);background:rgba(255,215,120,.045)}
      .aymp-planetary-link-card.focus{border-color:rgba(255,215,120,.55);background:rgba(255,215,120,.10)}
      .aymp-planetary-link-card strong{display:block;font-size:.84rem}.aymp-planetary-link-card small{display:block;margin-top:3px;opacity:.6;font-size:.68rem}
      .aymp-planetary-link-card .pstatus{display:block;margin-top:7px;color:#ffd66a;font-size:.64rem}.aymp-planetary-meta{margin-top:8px;font-size:.65rem;opacity:.5}
      .aymp-focus-badge{display:inline-block;margin-top:5px;padding:3px 6px;border-radius:999px;background:#ffd66a;color:#171026;font-size:.58rem;font-weight:700}
      .aymp-whatsapp-wrap{margin-top:14px;padding:14px;border-radius:14px;border:1px solid rgba(37,211,102,.28);background:rgba(37,211,102,.055)}
      .aymp-whatsapp-btn{display:block;text-align:center;text-decoration:none;padding:13px 16px;border-radius:12px;background:#25d366;color:#071b0e;font-weight:800;font-size:.95rem;box-shadow:0 0 18px rgba(37,211,102,.18)}
      .aymp-whatsapp-note{margin:7px 0 0;text-align:center;font-size:.68rem;opacity:.68;line-height:1.45}
      @media(max-width:600px){.aymp-lagna-result-grid{grid-template-columns:1fr}.aymp-planetary-link-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  function planetaryConnectionHTML(planetaryDb, rule) {
    const planets = planetaryDb && Array.isArray(planetaryDb.planets) ? planetaryDb.planets.slice().sort(function(a,b){ return Number(a.order||0)-Number(b.order||0); }) : [];
    if (!planets.length) return '<div class="aymp-lagna-pending">Planetary Research Database is currently unavailable.</div>';
    const focus = focusIds(rule);
    const focusNames = focus.map(function(id){ const p=planetById(planetaryDb,id); return p ? p.name_en : id; }).join(', ');
    const cards = planets.map(function(p){
      const r = p.research || {};
      const isFocus = focus.indexOf(p.id) >= 0;
      const status = r.verification_status || 'pending';
      return '<div class="aymp-planetary-link-card' + (isFocus ? ' focus' : '') + '">' +
        '<strong>' + esc(p.name_en) + '</strong>' +
        '<small>' + esc(p.name_ta || '') + '</small>' +
        (isFocus ? '<span class="aymp-focus-badge">LAGNA FOCUS</span>' : '') +
        '<span class="pstatus">Research: ' + esc(status) + '</span>' +
        (r.affected_status ? '<small>Status: ' + esc(r.affected_status) + '</small>' : '') +
        '</div>';
    }).join('');
    return '<div class="aymp-planetary-link-wrap"><h4 class="aymp-planetary-link-title">🌌 9 Planetary Research Connection</h4>' +
      '<p class="aymp-planetary-link-sub">The calculated Lagna now connects automatically to the planetary research database.</p>' +
      '<div class="aymp-planetary-link-grid">' + cards + '</div>' +
      (focus.length ? '<div class="aymp-planetary-meta">Current Lagna research focus: ' + esc(focusNames) + '</div>' : '<div class="aymp-planetary-meta">No approved planetary focus mapping is recorded for this Lagna yet.</div>') +
      '</div>';
  }

  function whatsappBaseHref() {
    const existing = document.querySelector('a.whatsapp[href]') || document.querySelector('a[href*="wa.me/"]');
    return existing ? existing.getAttribute('href') : 'https://wa.me/';
  }

  function whatsappHTML(chart, concernText, planetaryRule) {
    const focus = focusIds(planetaryRule);
    const focusNames = focus.map(function(id){ const p = planetById(window.AYMPPlanetaryResearchDB || {}, id); return p ? p.name_en : id; }).join(', ');
    const message = [
      'AYMP Personalized Research Consultation',
      'Lagna: ' + (chart.lagna || 'Pending'),
      'Ascendant: ' + (chart.ascendantText || 'Pending'),
      'Life Concern: ' + concernText,
      focusNames ? 'Lagna Research Focus: ' + focusNames : 'Planetary Focus: Pending research verification',
      '',
      'I would like to discuss my personalized AYMP research guidance.'
    ].join('\n');
    const href = whatsappBaseHref();
    const separator = href.indexOf('?') >= 0 ? '&' : '?';
    const finalHref = href.replace(/[?&]text=[^&]*/i, '') + separator + 'text=' + encodeURIComponent(message);
    return '<div class="aymp-whatsapp-wrap">' +
      '<a class="aymp-whatsapp-btn" target="_blank" rel="noopener" href="' + esc(finalHref) + '">💬 Discuss This Concern on WhatsApp</a>' +
      '<p class="aymp-whatsapp-note">Your selected Lagna, concern and current research focus will be included in the WhatsApp message.</p>' +
      '</div>';
  }

  function renderPendingBase(chart, concernText, planetaryDb, rule) {
    return '<div class="aymp-lagna-result-grid">' +
      '<div class="aymp-lagna-result-card"><b>Lagna</b><p>' + esc(chart.lagna) + ' — ' + esc(chart.ascendantText || '') + '</p></div>' +
      '<div class="aymp-lagna-result-card"><b>Research Concern</b><p>' + esc(concernText) + '</p></div>' +
      '</div>' +
      planetaryConnectionHTML(planetaryDb, rule) +
      '<div class="aymp-lagna-pending">Research rule pending for this Lagna / concern. No Yantra, herb or planetary mapping is being invented automatically.</div>' +
      whatsappHTML(chart, concernText, rule) +
      '<span class="aymp-lagna-status">Status: pending AYMP research verification</span>';
  }

  function mount(rules, planetaryDb) {
    if (mounted) return;
    const host = document.getElementById('aympPlanetaryResearchSection') || document.getElementById('guidanceForm');
    if (!host) return;
    addStyles();
    window.AYMPPlanetaryResearchDB = planetaryDb;
    const section = document.createElement('section');
    section.id = 'aympLagnaResearchResult';
    section.className = 'aymp-lagna-result';
    section.innerHTML = `
      <h3>🧿 Personalized Lagna Research Result</h3>
      <p class="sub">Lagna → life concern → planetary research database → Yantra / Herb research pathway</p>
      <select id="aympResearchConcernSelect" aria-label="Research concern">
        <option value="business">Business / Economic Improvement</option>
        <option value="enemy_opposition">Enemy / Opposition Concerns</option>
        <option value="janavashyam">Social Influence / Janavashyam Research</option>
        <option value="child_parenthood">Children / Parenthood Concerns</option>
        <option value="speech_vak_siddhi">Speech / Vāk Siddhi Research</option>
        <option value="marriage">Marriage / Relationship Concerns</option>
        <option value="love_relationship">Love / Relationship Concerns</option>
        <option value="career">Career / Profession</option>
        <option value="property_family">Property / Family Concerns</option>
        <option value="mental_peace">Mental Peace / Stress</option>
        <option value="legal_conflict">Legal / Conflict Concerns</option>
        <option value="health_wellbeing">Health / Well-being</option>
        <option value="other">Other Personal Concern</option>
      </select>
      <div id="aympLagnaResearchResultBody"></div>
    `;
    host.parentNode.insertBefore(section, host.nextSibling);
    mounted = true;

    function render() {
      const body = document.getElementById('aympLagnaResearchResultBody');
      const select = document.getElementById('aympResearchConcernSelect');
      const chart = window.AYMPBirthChart || {};
      const id = lagnaId(chart);
      const lagna = id && rules.rules ? rules.rules[id] : null;
      const concern = concernKey(select.value);
      const concernText = select.selectedOptions[0].textContent;
      const planetaryRule = findPlanetaryLagnaRule(planetaryDb, chart.lagna);
      const rule = lagna && lagna.life_concern ? lagna : null;

      if (!chart.lagna) {
        body.innerHTML = '<div class="aymp-lagna-pending">Awaiting the calculated Vedic Lagna. Submit valid birth details first.</div>' + planetaryConnectionHTML(planetaryDb, null);
        return;
      }

      if (!rule || (concern !== 'business' && id !== 'rishabha')) {
        body.innerHTML = renderPendingBase(chart, concernText, planetaryDb, planetaryRule);
        return;
      }

      if (id === 'rishabha' && concern === 'business') {
        const planets = (rule.planet_group_names_en || rule.planet_group || []).join(', ');
        const herbs = (rule.herb_set || []).map(function (h) { return '<span>' + esc(h.name_en) + '</span>'; }).join('');
        const proc = rule.traditional_procedure && rule.traditional_procedure.sequence ? rule.traditional_procedure.sequence : [];
        const procedure = proc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
        const linkedRule = planetaryRule || rule;
        body.innerHTML = '<div class="aymp-lagna-result-grid">' +
          '<div class="aymp-lagna-result-card"><b>Lagna</b><p>' + esc(chart.lagna) + ' — ' + esc(chart.ascendantText || '') + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Life Concern</b><p>' + esc(rule.life_concern) + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Planet Group</b><p>' + esc(planets) + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Yantra / Copper Record</b><p>Yantra selection: pending approved AYMP record.<br>6×6 copper plate • talisman research record</p></div>' +
          '<div class="aymp-lagna-result-card" style="grid-column:1/-1"><b>Research Herb Set</b><div class="aymp-lagna-herbs">' + herbs + '</div></div>' +
          '<div class="aymp-lagna-result-card" style="grid-column:1/-1"><b>Traditional Procedure Record</b><ol>' + procedure + '</ol></div>' +
          '</div>' +
          planetaryConnectionHTML(planetaryDb, linkedRule) +
          whatsappHTML(chart, concernText, linkedRule) +
          '<span class="aymp-lagna-status">Status: user-provided research rule • verification pending • not a guaranteed outcome</span>';
      }
    }

    document.getElementById('aympResearchConcernSelect').addEventListener('change', render);
    render();
    window.addEventListener('aymp:birth-chart-updated', render);
  }

  async function boot() {
    try {
      const values = await Promise.all([loadRules(), loadPlanetaryDatabase()]);
      const rules = values[0];
      const planetaryDb = values[1];
      const tryMount = function () { mount(rules, planetaryDb); };
      tryMount();
      const timer = setInterval(function () {
        if (window.AYMPBirthChart || document.getElementById('aympPlanetaryResearchSection')) {
          tryMount();
          if (mounted) clearInterval(timer);
        }
      }, 500);
      setTimeout(function () { clearInterval(timer); }, 20000);
      const original = window.AYMPLagnaEngine && window.AYMPLagnaEngine.calculateFromForm;
      if (original && !original.__aympWrapped) {
        const wrapped = async function () {
          const result = await original.apply(this, arguments);
          window.AYMPBirthChart = result;
          window.dispatchEvent(new CustomEvent('aymp:birth-chart-updated', { detail: result }));
          return result;
        };
        wrapped.__aympWrapped = true;
        window.AYMPLagnaEngine.calculateFromForm = wrapped;
      }
    } catch (e) {
      console.error('AYMP Lagna Research Result:', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();