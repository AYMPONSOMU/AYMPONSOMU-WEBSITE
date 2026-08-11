// AYMP Personal Research Cycle Engine v1
// Creates a local 90-day consultation/research cycle from the validated birth chart + concern.
// No medical or guaranteed outcome claims are generated.
(function () {
  'use strict';

  const STORAGE_KEY = 'AYMP_PERSONAL_RESEARCH_CYCLES_V1';
  const DAYS = 90;

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function dateOnly(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function addDays(dateString, days) {
    const d = new Date(dateString + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return dateOnly(d);
  }

  function readCycles() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"records":[]}');
      return parsed && Array.isArray(parsed.records) ? parsed : { records: [] };
    } catch (_) {
      return { records: [] };
    }
  }

  function writeCycles(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
  }

  function makeId() {
    return 'AYMP-' + dateOnly(new Date()).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function concernLabel(key) {
    const map = {
      business: 'Business / Economic Improvement',
      marriage: 'Marriage / Relationship',
      love_relationship: 'Love / Relationship',
      public_success: 'Public Life / Visibility Success',
      enemy_opposition: 'Enemy / Opposition Concerns',
      social_influence: 'Social Influence / Janavashyam Research',
      children_parenthood: 'Children / Parenthood Concerns',
      speech_vak_siddhi: 'Speech / Vāk Siddhi Research',
      career: 'Career / Profession',
      property_family: 'Property / Family',
      mental_peace: 'Mental Peace / Stress',
      legal_conflict: 'Legal / Conflict',
      health_wellbeing: 'Health / Well-being',
      other: 'Other Personal Concern'
    };
    return map[key] || key;
  }

  function getBirthChart() { return window.AYMPBirthChart || {}; }

  function currentConcern() {
    const select = document.getElementById('aympResearchConcernSelect');
    return select ? select.value : 'business';
  }

  function buildCycle() {
    const chart = getBirthChart();
    if (!chart.lagna) return null;

    const now = new Date();
    const start = dateOnly(now);
    const record = {
      research_id: makeId(),
      person_id: 'browser-local',
      created_at: new Date().toISOString(),
      birth: {
        date: chart.birthDate || '',
        time: chart.birthTime || '',
        place: chart.birthPlace || '',
        timezone: chart.timezone || '',
        latitude: chart.latitude == null ? null : chart.latitude,
        longitude: chart.longitude == null ? null : chart.longitude,
        lagna: chart.lagna || '',
        ascendant_degree: chart.ascendantDegree == null ? null : chart.ascendantDegree
      },
      concern: {
        key: currentConcern(),
        label: concernLabel(currentConcern())
      },
      planetary_focus: [],
      yantra_research_id: '',
      herb_research_ids: [],
      mantra_research_id: '',
      guidance_schedule: [],
      cycle: {
        number: 1,
        start_date: start,
        review_date: addDays(start, DAYS),
        duration_days: DAYS,
        status: 'active'
      },
      review: {
        previous_cycle_id: null,
        current_concern: currentConcern(),
        notes: '',
        next_research_direction: ''
      }
    };

    const data = readCycles();
    const samePerson = data.records.filter(function (r) {
      return r.birth && r.birth.date === record.birth.date && r.birth.time === record.birth.time && r.birth.place === record.birth.place;
    });

    samePerson.forEach(function (r) {
      if (r.cycle && r.cycle.status === 'active') r.cycle.status = 'superseded';
    });

    const completedNumbers = samePerson.map(function (r) { return Number(r.cycle && r.cycle.number || 0); });
    record.cycle.number = (completedNumbers.length ? Math.max.apply(null, completedNumbers) : 0) + 1;
    record.review.previous_cycle_id = samePerson.length ? samePerson[samePerson.length - 1].research_id : null;

    data.records.push(record);
    writeCycles(data);
    return record;
  }

  function renderCycle(record) {
    const host = document.getElementById('aympPersonalResearchCycle');
    if (!host || !record) return;
    host.innerHTML = `
      <div class="aymp-cycle-head"><span>🔱 AYMP Personal Research Cycle</span><b>90 DAYS</b></div>
      <div class="aymp-cycle-grid">
        <div><small>Research ID</small><strong>${esc(record.research_id)}</strong></div>
        <div><small>Cycle</small><strong>#${esc(record.cycle.number)}</strong></div>
        <div><small>Start</small><strong>${esc(record.cycle.start_date)}</strong></div>
        <div><small>Review</small><strong>${esc(record.cycle.review_date)}</strong></div>
        <div><small>Lagna</small><strong>${esc(record.birth.lagna)}</strong></div>
        <div><small>Concern</small><strong>${esc(record.concern.label)}</strong></div>
      </div>
      <div class="aymp-cycle-note">This is a personalized AYMP traditional/spiritual research consultation record. A new research cycle should be reviewed after 90 days rather than automatically repeating the previous method.</div>
    `;
  }

  function addStyles() {
    if (document.getElementById('aympPersonalResearchCycleCSS')) return;
    const s = document.createElement('style');
    s.id = 'aympPersonalResearchCycleCSS';
    s.textContent = `
      #aympPersonalResearchCycle{margin-top:14px;padding:15px;border:1px solid rgba(255,215,120,.22);border-radius:16px;background:rgba(20,14,35,.72);color:#fff}
      .aymp-cycle-head{display:flex;justify-content:space-between;gap:10px;align-items:center;color:#ffd66a;margin-bottom:11px}
      .aymp-cycle-head b{font-size:.68rem;padding:4px 7px;border-radius:999px;background:rgba(255,214,106,.12)}
      .aymp-cycle-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.aymp-cycle-grid>div{padding:9px;border-radius:10px;background:rgba(255,255,255,.035)}
      .aymp-cycle-grid small{display:block;opacity:.55;font-size:.65rem;margin-bottom:3px}.aymp-cycle-grid strong{font-size:.78rem}
      .aymp-cycle-note{margin-top:10px;font-size:.7rem;line-height:1.5;opacity:.7}
      @media(max-width:600px){.aymp-cycle-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(s);
  }

  function mount() {
    if (document.getElementById('aympPersonalResearchCycle')) return;
    const anchor = document.getElementById('aympLagnaResearchResult');
    if (!anchor) return;
    addStyles();
    const host = document.createElement('section');
    host.id = 'aympPersonalResearchCycle';
    host.innerHTML = '<div class="aymp-cycle-note">Submit valid birth details to create the 90-day research cycle.</div>';
    anchor.parentNode.insertBefore(host, anchor.nextSibling);

    window.addEventListener('aymp:birth-chart-updated', function () {
      const record = buildCycle();
      if (record) renderCycle(record);
    });

    const existing = getBirthChart();
    if (existing.lagna) {
      const record = buildCycle();
      if (record) renderCycle(record);
    }
  }

  function boot() {
    const timer = setInterval(function () {
      mount();
      if (document.getElementById('aympPersonalResearchCycle')) clearInterval(timer);
    }, 500);
    setTimeout(function () { clearInterval(timer); }, 20000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.AYMPResearchCycles = { create: buildCycle, list: readCycles };
})();
