// AYMP Yantra • Herb • Tantric Research module
// English-first UI + built-in multilingual translation for the research workspace.
(function () {
  'use strict';

  const DB_URL = 'data/aymp_cosmic_yantra_herb_tantric_guidance_v2.json';
  const SESSION_KEY = 'aympResearchSession_v1';
  const LANG_KEY = 'aympResearchLanguage_v1';

  const LANGS = [
    ['en', 'English'], ['ta', 'தமிழ்'], ['ms', 'Bahasa Melayu'], ['zh', '中文'],
    ['hi', 'हिन्दी'], ['te', 'తెలుగు'], ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം']
  ];

  const I18N = {
    en:{title:'🔱 AYMP RESEARCH GUIDANCE',intro:'Yantra • Herb • Tantric Research — Phase 1',birth:'🪔 Birth Details Received',name:'Name',dob:'Date of Birth',time:'Birth Time',place:'Birth Place',notEntered:'Not entered',inputNote:'These details are the input for the research flow. No planetary position or planet-to-herb/Yantra relationship is invented by this module.',flow:'🧭 Research Flow',concern:'🎯 Select the Research Concern',selected:'Selected research pathway:',notSelected:'Not selected',planetary:'🌌 9 Planetary Research',planetNote:'This is the analysis workspace. Actual planetary positions, houses, signs and strength/challenge findings must come from the approved AYMP calculation/research framework before a herb, Yantra or mantra is selected.',position:'Position',house:'House',sign:'Sign',strength:'Strength / Challenge',pending:'Research mapping pending',yantra:'🔱 Yantra Research — 8 Phase 1 Records',herb:'🌿 35 Herbal Research Records',mapping:'🧿 Research Mapping Result',planetFinding:'Planetary finding',selectedYantra:'Selected Yantra',selectedHerbs:'Selected Herb(s)',mantra:'Mantra reference',talisman:'Talisman research',traditional:'Traditional guidance',awaitChart:'Awaiting approved birth-chart analysis',awaitMapping:'Awaiting approved research mapping',awaitMantra:'Awaiting approved mantra record',awaitTalisman:'Awaiting approved talisman record',awaitNotes:'Awaiting verified research notes',save:'💾 SAVE RESEARCH INTAKE',reset:'↺ RESET CONCERN',saved:'✓ Research intake saved for this browser session.',disclaimer:'Traditional/spiritual research information is presented for educational and research purposes. Individual research mappings should be verified before publication or use. This module does not guarantee medical, financial, relationship, or life outcomes.',language:'Language',close:'Close',researchRecord:'Yantra Research Record',detailsPending:'Research details pending',researchPath:'Research pathway',selectLanguage:'Select language',business:'Business Growth',marriage:'Marriage / Relationship Concerns',love:'Love / Relationship Concerns',public:'Public Life Success',promotion:'Promotion / Visibility Success',other:'Other Personal Guidance',flow_birth:'Birth Details',flow_planet:'Planetary Analysis',flow_guidance:'Research Guidance',flow_details:'Herb • Yantra • Tantric Details',flow_result:'Personal Guidance Result'},
    ta:{title:'🔱 AYMP ஆராய்ச்சி வழிகாட்டுதல்',intro:'யந்த்ரம் • மூலிகை • தாந்த்ரீக ஆராய்ச்சி — கட்டம் 1',birth:'🪔 பிறந்த விவரங்கள் பெறப்பட்டன',name:'பெயர்',dob:'பிறந்த தேதி',time:'பிறந்த நேரம்',place:'பிறந்த இடம்',notEntered:'உள்ளிடப்படவில்லை',inputNote:'இந்த விவரங்கள் ஆராய்ச்சி செயல்முறைக்கான உள்ளீடுகள். இந்த தொகுதி தானாக கிரக நிலை அல்லது கிரகம்–மூலிகை/யந்த்ர தொடர்பை உருவாக்காது.',flow:'🧭 ஆராய்ச்சி செயல்முறை',concern:'🎯 ஆராய்ச்சி பிரச்சினையைத் தேர்ந்தெடுக்கவும்',selected:'தேர்ந்தெடுத்த ஆராய்ச்சி பாதை:',notSelected:'தேர்ந்தெடுக்கப்படவில்லை',planetary:'🌌 9 கிரக ஆராய்ச்சி',planetNote:'இது பகுப்பாய்வு பணியிடம். மூலிகை, யந்த்ரம் அல்லது மந்திரம் தேர்வு செய்வதற்கு முன் அங்கீகரிக்கப்பட்ட AYMP கணக்கீடு/ஆராய்ச்சி முறையிலிருந்து கிரக நிலை, பாவம், ராசி மற்றும் பலம்/சவால் தகவல்கள் வர வேண்டும்.',position:'நிலை',house:'பாவம்',sign:'ராசி',strength:'பலம் / சவால்',pending:'ஆராய்ச்சி mapping நிலுவையில்',yantra:'🔱 யந்த்ர ஆராய்ச்சி — கட்டம் 1 இல் 8 பதிவுகள்',herb:'🌿 35 மூலிகை ஆராய்ச்சி பதிவுகள்',mapping:'🧿 ஆராய்ச்சி Mapping முடிவு',planetFinding:'கிரகக் கண்டறிதல்',selectedYantra:'தேர்ந்தெடுத்த யந்த்ரம்',selectedHerbs:'தேர்ந்தெடுத்த மூலிகை(கள்)',mantra:'மந்திர குறிப்பு',talisman:'தாயத்து ஆராய்ச்சி',traditional:'பாரம்பரிய வழிகாட்டுதல்',awaitChart:'அங்கீகரிக்கப்பட்ட ஜாதக பகுப்பாய்வுக்காக காத்திருக்கிறது',awaitMapping:'அங்கீகரிக்கப்பட்ட ஆராய்ச்சி mapping-க்காக காத்திருக்கிறது',awaitMantra:'அங்கீகரிக்கப்பட்ட மந்திர பதிவுக்காக காத்திருக்கிறது',awaitTalisman:'அங்கீகரிக்கப்பட்ட தாயத்து பதிவுக்காக காத்திருக்கிறது',awaitNotes:'சரிபார்க்கப்பட்ட ஆராய்ச்சி குறிப்புகளுக்காக காத்திருக்கிறது',save:'💾 ஆராய்ச்சி விவரங்களை சேமிக்கவும்',reset:'↺ பிரச்சினையை மீட்டமைக்கவும்',saved:'✓ இந்த browser session-ல் ஆராய்ச்சி விவரங்கள் சேமிக்கப்பட்டன.',disclaimer:'பாரம்பரிய/ஆன்மீக ஆராய்ச்சி தகவல்கள் கல்வி மற்றும் ஆராய்ச்சி நோக்கத்திற்காக வழங்கப்படுகின்றன. வெளியிடுவதற்கு அல்லது பயன்படுத்துவதற்கு முன் தனிப்பட்ட mapping-களை சரிபார்க்க வேண்டும். மருத்துவம், நிதி, உறவு அல்லது வாழ்க்கை முடிவுகள் உறுதி செய்யப்படுவதில்லை.',language:'மொழி',close:'மூடு',researchRecord:'யந்த்ர ஆராய்ச்சி பதிவு',detailsPending:'ஆராய்ச்சி விவரங்கள் நிலுவையில்',researchPath:'ஆராய்ச்சி பாதை',selectLanguage:'மொழியைத் தேர்ந்தெடுக்கவும்',business:'வியாபார வளர்ச்சி',marriage:'திருமணம் / உறவு தொடர்பான பிரச்சினைகள்',love:'காதல் / உறவு பிரச்சினைகள்',public:'பொதுவாழ்வில் வெற்றி',promotion:'விளம்பரம் / Visibility வெற்றி',other:'மற்ற தனிப்பட்ட வழிகாட்டுதல்',flow_birth:'பிறந்த விவரங்கள்',flow_planet:'கிரக பகுப்பாய்வு',flow_guidance:'ஆராய்ச்சி வழிகாட்டுதல்',flow_details:'மூலிகை • யந்த்ரம் • தாந்த்ரீக விவரங்கள்',flow_result:'தனிப்பட்ட வழிகாட்டுதல் முடிவு'},
    ms:{title:'🔱 PANDUAN PENYELIDIKAN AYMP',intro:'Yantra • Herba • Penyelidikan Tantrik — Fasa 1',birth:'🪔 Maklumat Kelahiran Diterima',name:'Nama',dob:'Tarikh Lahir',time:'Masa Lahir',place:'Tempat Lahir',notEntered:'Belum dimasukkan',inputNote:'Maklumat ini menjadi input untuk aliran penyelidikan. Modul ini tidak mencipta kedudukan planet atau hubungan planet-herba/Yantra secara automatik.',flow:'🧭 Aliran Penyelidikan',concern:'🎯 Pilih Fokus Penyelidikan',selected:'Laluan penyelidikan dipilih:',notSelected:'Belum dipilih',planetary:'🌌 Penyelidikan 9 Planet',planetNote:'Ini ialah ruang analisis. Kedudukan planet, rumah, tanda dan kekuatan/cabaran sebenar mesti datang daripada rangka kerja pengiraan/penyelidikan AYMP yang diluluskan sebelum herba, Yantra atau mantra dipilih.',position:'Kedudukan',house:'Rumah',sign:'Tanda',strength:'Kekuatan / Cabaran',pending:'Pemetaan penyelidikan belum selesai',yantra:'🔱 Penyelidikan Yantra — 8 Rekod Fasa 1',herb:'🌿 35 Rekod Penyelidikan Herba',mapping:'🧿 Hasil Pemetaan Penyelidikan',planetFinding:'Penemuan planet',selectedYantra:'Yantra dipilih',selectedHerbs:'Herba dipilih',mantra:'Rujukan mantra',talisman:'Penyelidikan talisman',traditional:'Panduan tradisional',awaitChart:'Menunggu analisis carta kelahiran yang diluluskan',awaitMapping:'Menunggu pemetaan penyelidikan yang diluluskan',awaitMantra:'Menunggu rekod mantra yang diluluskan',awaitTalisman:'Menunggu rekod talisman yang diluluskan',awaitNotes:'Menunggu nota penyelidikan yang disahkan',save:'💾 SIMPAN INPUT PENYELIDIKAN',reset:'↺ SET SEMULA FOKUS',saved:'✓ Input penyelidikan disimpan untuk sesi pelayar ini.',disclaimer:'Maklumat penyelidikan tradisional/kerohanian diberikan untuk tujuan pendidikan dan penyelidikan. Pemetaan individu perlu disahkan sebelum diterbitkan atau digunakan. Modul ini tidak menjamin hasil perubatan, kewangan, hubungan atau kehidupan.',language:'Bahasa',close:'Tutup',researchRecord:'Rekod Penyelidikan Yantra',detailsPending:'Butiran penyelidikan belum selesai',researchPath:'Laluan penyelidikan',selectLanguage:'Pilih bahasa',business:'Pertumbuhan Perniagaan',marriage:'Isu Perkahwinan / Hubungan',love:'Isu Cinta / Hubungan',public:'Kejayaan Kehidupan Awam',promotion:'Kejayaan Promosi / Keterlihatan',other:'Panduan Peribadi Lain',flow_birth:'Maklumat Kelahiran',flow_planet:'Analisis Planet',flow_guidance:'Panduan Penyelidikan',flow_details:'Herba • Yantra • Butiran Tantrik',flow_result:'Hasil Panduan Peribadi'},
    zh:{title:'🔱 AYMP 研究指导',intro:'Yantra • 草药 • 密宗研究 — 第一阶段',birth:'🪔 已收到出生资料',name:'姓名',dob:'出生日期',time:'出生时间',place:'出生地点',notEntered:'未填写',inputNote:'这些资料用于研究流程。本模块不会自行编造行星位置或行星与草药/Yantra之间的关系。',flow:'🧭 研究流程',concern:'🎯 选择研究方向',selected:'已选择的研究路径：',notSelected:'未选择',planetary:'🌌 九大行星研究',planetNote:'这是分析工作区。选择草药、Yantra或咒语之前，实际的行星位置、宫位、星座及强弱/挑战结果必须来自经过批准的AYMP计算/研究框架。',position:'位置',house:'宫位',sign:'星座',strength:'优势 / 挑战',pending:'研究映射待完成',yantra:'🔱 Yantra 研究 — 第一阶段8项记录',herb:'🌿 35项草药研究记录',mapping:'🧿 研究映射结果',planetFinding:'行星分析结果',selectedYantra:'选择的Yantra',selectedHerbs:'选择的草药',mantra:'咒语参考',talisman:'护符研究',traditional:'传统指导',awaitChart:'等待批准的出生星盘分析',awaitMapping:'等待批准的研究映射',awaitMantra:'等待批准的咒语记录',awaitTalisman:'等待批准的护符记录',awaitNotes:'等待已验证的研究说明',save:'💾 保存研究资料',reset:'↺ 重置方向',saved:'✓ 研究资料已保存到本次浏览器会话。',disclaimer:'传统/灵性研究信息仅用于教育和研究。发布或使用前应验证个人研究映射。本模块不保证医疗、财务、关系或人生结果。',language:'语言',close:'关闭',researchRecord:'Yantra研究记录',detailsPending:'研究详情待完成',researchPath:'研究路径',selectLanguage:'选择语言',business:'商业发展',marriage:'婚姻 / 关系问题',love:'爱情 / 关系问题',public:'公众生活成功',promotion:'宣传 / 曝光成功',other:'其他个人指导',flow_birth:'出生资料',flow_planet:'行星分析',flow_guidance:'研究指导',flow_details:'草药 • Yantra • 密宗详情',flow_result:'个人指导结果'},
    hi:{title:'🔱 AYMP अनुसंधान मार्गदर्शन',intro:'Yantra • Herb • Tantric Research — चरण 1',birth:'🪔 जन्म विवरण प्राप्त',name:'नाम',dob:'जन्म तिथि',time:'जन्म समय',place:'जन्म स्थान',notEntered:'दर्ज नहीं किया गया',inputNote:'ये विवरण अनुसंधान प्रक्रिया के इनपुट हैं। यह मॉड्यूल ग्रह स्थिति या ग्रह-हर्ब/Yantra संबंध स्वयं नहीं बनाता।',flow:'🧭 अनुसंधान प्रक्रिया',concern:'🎯 अनुसंधान विषय चुनें',selected:'चयनित अनुसंधान मार्ग:',notSelected:'चयनित नहीं',planetary:'🌌 9 ग्रह अनुसंधान',planetNote:'यह विश्लेषण कार्यक्षेत्र है। हर्ब, Yantra या मंत्र चुनने से पहले वास्तविक ग्रह स्थिति, भाव, राशि और शक्ति/चुनौती के निष्कर्ष स्वीकृत AYMP गणना/अनुसंधान ढांचे से आने चाहिए।',position:'स्थिति',house:'भाव',sign:'राशि',strength:'शक्ति / चुनौती',pending:'अनुसंधान मैपिंग लंबित',yantra:'🔱 Yantra अनुसंधान — चरण 1 के 8 रिकॉर्ड',herb:'🌿 35 हर्ब अनुसंधान रिकॉर्ड',mapping:'🧿 अनुसंधान मैपिंग परिणाम',planetFinding:'ग्रह निष्कर्ष',selectedYantra:'चयनित Yantra',selectedHerbs:'चयनित हर्ब',mantra:'मंत्र संदर्भ',talisman:'ताबीज अनुसंधान',traditional:'पारंपरिक मार्गदर्शन',awaitChart:'स्वीकृत जन्म-कुंडली विश्लेषण की प्रतीक्षा',awaitMapping:'स्वीकृत अनुसंधान मैपिंग की प्रतीक्षा',awaitMantra:'स्वीकृत मंत्र रिकॉर्ड की प्रतीक्षा',awaitTalisman:'स्वीकृत ताबीज रिकॉर्ड की प्रतीक्षा',awaitNotes:'सत्यापित अनुसंधान नोट्स की प्रतीक्षा',save:'💾 अनुसंधान विवरण सहेजें',reset:'↺ विषय रीसेट करें',saved:'✓ अनुसंधान विवरण इस ब्राउज़र सत्र में सहेजे गए।',disclaimer:'पारंपरिक/आध्यात्मिक अनुसंधान जानकारी केवल शिक्षा और अनुसंधान के लिए है। प्रकाशन या उपयोग से पहले व्यक्तिगत मैपिंग सत्यापित करें। यह मॉड्यूल चिकित्सा, वित्तीय, संबंध या जीवन परिणामों की गारंटी नहीं देता।',language:'भाषा',close:'बंद करें',researchRecord:'Yantra अनुसंधान रिकॉर्ड',detailsPending:'अनुसंधान विवरण लंबित',researchPath:'अनुसंधान मार्ग',selectLanguage:'भाषा चुनें',business:'व्यवसाय विकास',marriage:'विवाह / संबंध समस्याएँ',love:'प्रेम / संबंध समस्याएँ',public:'सार्वजनिक जीवन में सफलता',promotion:'प्रचार / दृश्यता सफलता',other:'अन्य व्यक्तिगत मार्गदर्शन',flow_birth:'जन्म विवरण',flow_planet:'ग्रह विश्लेषण',flow_guidance:'अनुसंधान मार्गदर्शन',flow_details:'हर्ब • Yantra • तांत्रिक विवरण',flow_result:'व्यक्तिगत मार्गदर्शन परिणाम'}
  };

  // The remaining languages fall back to English until their reviewed translations are added.
  ['te','kn','ml'].forEach(code => { I18N[code] = Object.assign({}, I18N.en); });

  const concernKey = {business:'business',marriage:'marriage',love_relationship:'love',public_success:'public',promotion_visibility:'promotion',other:'other'};

  function getLang() {
    try { const saved = localStorage.getItem(LANG_KEY); if (I18N[saved]) return saved; } catch (_) {}
    return 'en';
  }
  function setLang(lang) { try { localStorage.setItem(LANG_KEY, lang); } catch (_) {} }
  function t(key) { return (I18N[getLang()] && I18N[getLang()][key]) || I18N.en[key] || key; }
  function esc(value) { return String(value ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c])); }

  function readBirthDetails() {
    const form = document.getElementById('guidanceForm');
    if (!form) return {};
    const get = (...names) => { for (const name of names) { const el = form.querySelector(`[name="${name}"], #${name}`); if (el && el.value) return el.value.trim(); } return ''; };
    return {name:get('name','fullName','userName','guidanceName'),dob:get('dob','dateOfBirth','birthDate','guidanceDob'),birth_time:get('birth_time','birthTime','timeOfBirth','guidanceTime'),birth_place:get('birth_place','birthPlace','placeOfBirth','guidancePlace')};
  }

  function createButton() {
    const form = document.getElementById('guidanceForm');
    if (!form || document.getElementById('yantraHerbResearchBtn')) return;
    const button = document.createElement('button');
    button.type='button'; button.id='yantraHerbResearchBtn'; button.className='yantra-herb-research-btn';
    button.innerHTML='🔱 YANTRA • HERB • TANTRIC RESEARCH';
    form.appendChild(button); button.addEventListener('click', openResearch);
  }
  function getStoredSession(){try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)||'{}')}catch(_){return {}}}
  function storeSession(data){try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(data))}catch(_){}
  }
  function cardClassFor(value){return value?'research-card':'research-card research-pending';}

  function renderWorkspace(modal, db, birth, selectedConcern) {
    const herbs=db.herbs||[], yantras=db.yantras||[], planets=(db.planetary_analysis&&db.planetary_analysis.planets)||[], concerns=(db.research_guidance&&db.research_guidance.life_concerns)||[], flow=(db.guidance_flow&&db.guidance_flow.steps)||[];
    const concern=concerns.find(c=>c.id===selectedConcern)||null;
    const currentLang=getLang();

    modal.innerHTML=`
      <div class="aymp-research-panel">
        <button type="button" class="aymp-research-close" aria-label="${esc(t('close'))}">×</button>
        <div class="research-language-bar"><label for="aympResearchLanguage">🌐 ${esc(t('language'))}</label><select id="aympResearchLanguage" aria-label="${esc(t('selectLanguage'))}">${LANGS.map(([code,label])=>`<option value="${code}" ${code===currentLang?'selected':''}>${label}</option>`).join('')}</select></div>
        <h2>${esc(t('title'))}</h2><p class="aymp-research-intro">${esc(t('intro'))}</p>

        <div class="research-section research-birth-summary"><h3>${esc(t('birth'))}</h3><div class="research-grid birth-grid">
          <div class="research-card"><strong>${esc(t('name'))}</strong><span>${esc(birth.name||t('notEntered'))}</span></div>
          <div class="research-card"><strong>${esc(t('dob'))}</strong><span>${esc(birth.dob||t('notEntered'))}</span></div>
          <div class="research-card"><strong>${esc(t('time'))}</strong><span>${esc(birth.birth_time||t('notEntered'))}</span></div>
          <div class="research-card"><strong>${esc(t('place'))}</strong><span>${esc(birth.birth_place||t('notEntered'))}</span></div>
        </div><p class="research-note">${esc(t('inputNote'))}</p></div>

        <div class="research-section"><h3>${esc(t('flow'))}</h3><div class="research-flow">${flow.map((step,i)=>`<div class="flow-step"><b>${i+1}</b><span>${esc(t('flow_'+String(step).toLowerCase())||String(step).replaceAll('_',' '))}</span></div>`).join('')}</div></div>

        <div class="research-section"><h3>${esc(t('concern'))}</h3><div class="research-concern-grid">${concerns.map(c=>`<button type="button" class="research-concern-btn ${c.id===selectedConcern?'active':''}" data-concern="${esc(c.id)}">${esc(t(concernKey[c.id])||c.label_en||c.label_ta||c.id)}</button>`).join('')}</div>
          <div class="selected-concern-box"><strong>${esc(t('selected'))}</strong><span>${esc(concern?(t(concernKey[concern.id])||concern.label_en||concern.label_ta):t('notSelected'))}</span></div>
        </div>

        <div class="research-section research-analysis-workspace"><h3>${esc(t('planetary'))}</h3><p class="research-note">${esc(t('planetNote'))}</p><div class="research-grid planetary-analysis-grid">${planets.map(p=>`<div class="${cardClassFor(p.research_interpretation)} planet-analysis-card"><strong>${esc(p.name_en)}</strong><div class="planet-field"><b>${esc(t('position'))}</b><em>${esc(p.planetary_position||t('pending'))}</em></div><div class="planet-field"><b>${esc(t('house'))}</b><em>${esc(p.house||t('pending'))}</em></div><div class="planet-field"><b>${esc(t('sign'))}</b><em>${esc(p.sign||t('pending'))}</em></div><div class="planet-field"><b>${esc(t('strength'))}</b><em>${esc(p.strength_or_challenge||t('pending'))}</em></div><small>${esc(p.research_interpretation||t('pending'))}</small></div>`).join('')}</div></div>

        <div class="research-section"><h3>${esc(t('yantra'))}</h3><div class="research-grid yantra-image-grid">${yantras.map(y=>`<div class="research-card yantra-card"><img src="images/${esc(y.image)}" alt="${esc(y.name_en)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-missing');"><strong>${esc(y.name_en)}</strong><small>${esc(y.research_summary||t('detailsPending'))}</small></div>`).join('')}</div></div>

        <div class="research-section"><h3>${esc(t('herb'))}</h3><div class="research-list">${herbs.map(h=>`<div class="research-row"><strong>${esc(h.name_en)}</strong></div>`).join('')}</div></div>

        <div class="research-section research-next-step"><h3>${esc(t('mapping'))}</h3><div class="research-mapping-box">
          <div><b>${esc(t('planetFinding'))}</b><span>${esc(t('awaitChart'))}</span></div><div><b>${esc(t('selectedYantra'))}</b><span>${esc(t('awaitMapping'))}</span></div><div><b>${esc(t('selectedHerbs'))}</b><span>${esc(t('awaitMapping'))}</span></div><div><b>${esc(t('mantra'))}</b><span>${esc(t('awaitMantra'))}</span></div><div><b>${esc(t('talisman'))}</b><span>${esc(t('awaitTalisman'))}</span></div><div><b>${esc(t('traditional'))}</b><span>${esc(t('awaitNotes'))}</span></div>
        </div><div class="research-action-row"><button type="button" id="saveResearchSessionBtn" class="research-primary-btn">${esc(t('save'))}</button><button type="button" id="resetResearchConcernBtn" class="research-secondary-btn">${esc(t('reset'))}</button></div><p id="researchSaveStatus" class="research-save-status" aria-live="polite"></p></div>

        <div class="research-disclaimer">${esc(t('disclaimer'))}</div>
      </div>`;

    modal.querySelector('.aymp-research-close').onclick=()=>modal.remove();
    modal.querySelector('#aympResearchLanguage').onchange=e=>{setLang(e.target.value);renderWorkspace(modal,db,birth,selectedConcern);};
    modal.querySelectorAll('.research-concern-btn').forEach(btn=>btn.addEventListener('click',()=>{const next=btn.getAttribute('data-concern')||'';storeSession({birth,selectedConcern:next,savedAt:new Date().toISOString()});renderWorkspace(modal,db,birth,next);}));
    const saveBtn=modal.querySelector('#saveResearchSessionBtn'),resetBtn=modal.querySelector('#resetResearchConcernBtn'),status=modal.querySelector('#researchSaveStatus');
    if(saveBtn)saveBtn.onclick=()=>{storeSession({birth,selectedConcern:selectedConcern||'',savedAt:new Date().toISOString()});if(status)status.textContent=t('saved');};
    if(resetBtn)resetBtn.onclick=()=>{storeSession({birth,selectedConcern:'',savedAt:new Date().toISOString()});renderWorkspace(modal,db,birth,'');};
  }

  async function openResearch(){
    let db; try{const response=await fetch(DB_URL,{cache:'no-store'});if(!response.ok)throw new Error('Database loading failed');db=await response.json();}catch(error){alert('Research Database could not be loaded. Please try again.');console.error('AYMP Research Database:',error);return;}
    let modal=document.getElementById('aympResearchModal');if(!modal){modal=document.createElement('div');modal.id='aympResearchModal';modal.className='aymp-research-modal';document.body.appendChild(modal);}
    const birth=readBirthDetails(),stored=getStoredSession();const selectedConcern=stored.birth&&JSON.stringify(stored.birth)===JSON.stringify(birth)?(stored.selectedConcern||''):'';
    renderWorkspace(modal,db,birth,selectedConcern);modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();},{once:true});
  }
  function init(){createButton();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
