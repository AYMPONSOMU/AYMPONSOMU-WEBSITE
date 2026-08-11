// AYMP 12 Lagna x Life Concern x 9 Planet Mapping Engine v1
// Reads the central mapping matrix and exposes a single safe resolver for the Personal Guidance flow.
(function () {
  'use strict';

  const MAPPING_URL = 'data/aymp_lagna_life_concern_planet_mapping_v1.json';
  let mappingPromise = null;

  function loadMapping() {
    if (!mappingPromise) {
      mappingPromise = fetch(MAPPING_URL, { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error('AYMP Lagna/Life Concern mapping could not be loaded.');
        return r.json();
      });
    }
    return mappingPromise;
  }

  function resolveOverride(db, lagnaId, concernId) {
    const overrides = db && db.matrix && Array.isArray(db.matrix.overrides) ? db.matrix.overrides : [];
    return overrides.find(function (x) {
      return x.lagna_id === lagnaId && x.life_concern_id === concernId;
    }) || null;
  }

  function defaultMapping(db) {
    return Object.assign({}, (db && db.matrix && db.matrix.default) || {
      planetary_focus: [], matched_planet_rule_ids: [], approved_herb_ids: [], approved_yantra_ids: [],
      mantra_ids: [], talisman_ids: [], status: 'research_mapping_pending', verification_status: 'pending'
    });
  }

  function resolve(db, lagnaId, concernId) {
    const override = resolveOverride(db, lagnaId, concernId);
    const result = override ? Object.assign(defaultMapping(db), override) : defaultMapping(db);
    result.lagna_id = lagnaId;
    result.life_concern_id = concernId;
    return result;
  }

  window.AYMPResearchMapping = {
    load: loadMapping,
    resolve: function (lagnaId, concernId) {
      return loadMapping().then(function (db) { return resolve(db, lagnaId, concernId); });
    }
  };

  window.dispatchEvent(new CustomEvent('aymp:research-mapping-ready'));
})();