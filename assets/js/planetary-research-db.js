// AYMP Planetary Research Database bridge
// Loads the dedicated planetary database and merges it into the existing
// Yantra • Herb • Tantric research database before the research workspace reads it.
(function () {
  'use strict';

  const PLANETARY_DB_URL = 'data/planetary_research_database_v1.json';
  const GUIDANCE_DB_URL = 'data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';
  const originalFetch = window.fetch.bind(window);
  let planetaryPromise = null;

  function loadPlanetaryDatabase() {
    if (!planetaryPromise) {
      planetaryPromise = originalFetch(PLANETARY_DB_URL, { cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('Planetary Research Database could not be loaded.');
          return response.json();
        });
    }
    return planetaryPromise;
  }

  function mergePlanetaryResearch(guidanceDb, planetaryDb) {
    const result = Object.assign({}, guidanceDb);
    const sourcePlanets = Array.isArray(planetaryDb.planets) ? planetaryDb.planets : [];

    result.planetary_analysis = Object.assign({}, result.planetary_analysis || {});
    result.planetary_analysis.planets = sourcePlanets.map(function (planet) {
      const research = planet.research || {};
      return {
        id: planet.id,
        name_en: planet.name_en,
        name_ta: planet.name_ta,
        order: planet.order,
        planetary_position: research.position || '',
        house: research.house || '',
        sign: research.sign || '',
        strength_or_challenge: [research.strength || '', research.challenge || '']
          .filter(Boolean).join(' / '),
        research_interpretation: research.research_interpretation || '',
        affected_status: research.affected_status || 'pending',
        source_references: research.source_references || [],
        verification_status: research.verification_status || 'pending',
        approved_links: planet.approved_links || {
          herb_ids: [], yantra_ids: [], mantra_ids: [], talisman_ids: []
        }
      };
    });

    result.planetary_research_database = {
      id: planetaryDb.database && planetaryDb.database.id,
      name: planetaryDb.database && planetaryDb.database.name,
      version: planetaryDb.database && planetaryDb.database.version,
      status_policy: planetaryDb.database && planetaryDb.database.status_policy
    };

    return result;
  }

  // The existing research module fetches the guidance database itself.
  // Intercept only that request and transparently merge the dedicated
  // planetary database. All other fetch requests remain untouched.
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const isGuidanceDatabase = url.indexOf(GUIDANCE_DB_URL) !== -1;

    if (!isGuidanceDatabase) return originalFetch(input, init);

    return Promise.all([
      originalFetch(input, init).then(function (response) {
        if (!response.ok) throw new Error('Guidance database could not be loaded.');
        return response.json();
      }),
      loadPlanetaryDatabase()
    ]).then(function (values) {
      const merged = mergePlanetaryResearch(values[0], values[1]);
      return new Response(JSON.stringify(merged), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    });
  };

  window.AYMPPlanetaryResearch = {
    databaseUrl: PLANETARY_DB_URL,
    version: '1.0.0',
    load: loadPlanetaryDatabase
  };

  console.log('AYMP Planetary Research Database bridge ready');
})();
