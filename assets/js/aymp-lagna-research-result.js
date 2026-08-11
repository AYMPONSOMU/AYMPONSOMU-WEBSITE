// AYMP Lagna Research Result Engine v1
// Connects the calculated sidereal Lagna to the approved/user-provided research rules.
// Unverified mappings remain explicitly pending; this module does not invent Yantra/Herb assignments.
(function () {
  'use strict';

  const RULES_URL = 'data/aymp_lagna_research_rules_v1.json';
  let rulesPromise = null;
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
    if (v === 'marriage' || v.indexOf('marriage') >= 0) return 'marriage';
    if (v === 'love' || v.indexOf('love') >= 0) return 'love_relationship';
    if (v === 'public' || v.indexOf('public') >= 0 || v.indexOf('visibility') >= 0 || v.indexOf('promotion') >= 0) return 'public_success';
    return 'business';
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
      @media(max-width:600px){.aymp-lagna-result-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function mount(rules) {
    if (mounted) return;
    const host = document.getElementById('aympPlanetaryResearchSection') || document.getElementById('guidanceForm');
    if (!host) return;
    addStyles();
    const section = document.createElement('section');
    section.id = 'aympLagnaResearchResult';
    section.className = 'aymp-lagna-result';
    section.innerHTML = `
      <h3>🧿 Personalized Lagna Research Result</h3>
      <p class="sub">Lagna → research concern → planetary research rule → Yantra / Herb research pathway</p>
      <select id="aympResearchConcernSelect" aria-label="Research concern">
        <option value="business">Business / Economic Improvement</option>
        <option value="marriage">Marriage / Relationship Concerns</option>
        <option value="love_relationship">Love / Relationship Concerns</option>
        <option value="public_success">Public Life / Visibility Success</option>
      </select>
      <div id="aympLagnaResearchResultBody"></div>
    `;
    host.parentNode.insertBefore(section, host.nextSibling);
    mounted = true;

    function render() {
      const body = document.getElementById('aympLagnaResearchResultBody');
      const chart = window.AYMPBirthChart || {};
      const id = lagnaId(chart);
      const lagna = id && rules.rules ? rules.rules[id] : null;
      const concern = concernKey(document.getElementById('aympResearchConcernSelect').value);
      const rule = lagna && lagna.life_concern ? lagna : null;

      if (!chart.lagna) {
        body.innerHTML = '<div class="aymp-lagna-pending">Awaiting the calculated Vedic Lagna. Submit valid birth details first.</div>';
        return;
      }
      if (!rule || !rule.life_concern || (concern !== 'business' && id !== 'rishabha')) {
        body.innerHTML = '<div class="aymp-lagna-result-grid"><div class="aymp-lagna-result-card"><b>Lagna</b><p>' + esc(chart.lagna) + ' — ' + esc(chart.ascendantText || '') + '</p></div><div class="aymp-lagna-result-card"><b>Research Concern</b><p>' + esc(document.getElementById('aympResearchConcernSelect').selectedOptions[0].textContent) + '</p></div></div><div class="aymp-lagna-pending">Research rule pending for this Lagna / concern. No Yantra, herb or planetary mapping is being invented automatically.</div><span class="aymp-lagna-status">Status: pending AYMP research verification</span>';
        return;
      }

      if (id === 'rishabha' && concern === 'business') {
        const planets = (rule.planet_group_names_en || rule.planet_group || []).join(', ');
        const herbs = (rule.herb_set || []).map(function (h) { return '<span>' + esc(h.name_en) + '</span>'; }).join('');
        const proc = rule.traditional_procedure && rule.traditional_procedure.sequence ? rule.traditional_procedure.sequence : [];
        const procedure = proc.map(function (x, i) { return '<li>' + esc(x) + '</li>'; }).join('');
        body.innerHTML = '<div class="aymp-lagna-result-grid">' +
          '<div class="aymp-lagna-result-card"><b>Lagna</b><p>' + esc(chart.lagna) + ' — ' + esc(chart.ascendantText || '') + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Life Concern</b><p>' + esc(rule.life_concern) + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Planet Group</b><p>' + esc(planets) + '</p></div>' +
          '<div class="aymp-lagna-result-card"><b>Yantra / Copper Record</b><p>Yantra selection: pending approved AYMP record.<br>6×6 copper plate • talisman research record</p></div>' +
          '<div class="aymp-lagna-result-card" style="grid-column:1/-1"><b>Research Herb Set</b><div class="aymp-lagna-herbs">' + herbs + '</div></div>' +
          '<div class="aymp-lagna-result-card" style="grid-column:1/-1"><b>Traditional Procedure Record</b><ol>' + procedure + '</ol></div>' +
          '</div><span class="aymp-lagna-status">Status: user-provided research rule • verification pending • not a guaranteed outcome</span>';
      }
    }

    document.getElementById('aympResearchConcernSelect').addEventListener('change', render);
    render();
    window.addEventListener('aymp:birth-chart-updated', render);
  }

  async function boot() {
    try {
      const rules = await loadRules();
      const tryMount = function () { mount(rules); };
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
