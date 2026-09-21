console.log("APP JS LOADED");
// KrushiMitra – Main App Logic
// Handles: district selection, language, all section updates, AI calls

let currentLang = 'en';
let currentDistrict = null;
let lastResult = null;

// ============================================================
// LANGUAGE SYSTEM
// ============================================================
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  const t = T[lang];
  document.querySelectorAll('[data-key]').forEach(el => {
    const k = el.getAttribute('data-key');
    if (t[k] !== undefined) el.innerHTML = t[k];
  });
  // Placeholders
  const locEl = document.getElementById('f-location');
  if (locEl) locEl.placeholder = lang === 'hi' ? 'उदा. पुणे, नासिक' : lang === 'mr' ? 'उदा. पुणे, नाशिक' : 'e.g. Pune, Nashik';
  const conEl = document.getElementById('f-concern');
  if (conEl) conEl.placeholder = t['concern-placeholder'] || '';
  // Re-apply district badge if active
  if (currentDistrict) updateDistrictBadge(currentDistrict);
}

// ============================================================
// DISTRICT DETECTION & BADGE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const locInput = document.getElementById('f-location');
  if (locInput) {
    locInput.addEventListener('input', function() {
      const key = normalizeDistrict(this.value);
      if (key) {
        currentDistrict = key;
        updateDistrictBadge(key);
        autoSelectSoil(DISTRICTS[key].dominantSoil);
        updateClimateSection(key);
      } else {
        document.getElementById('district-badge').classList.remove('visible');
        currentDistrict = null;
      }
    });
  }
  // Radio styling
  document.querySelectorAll('.radio-option input').forEach(inp => {
    inp.addEventListener('change', function() {
      this.closest('.radio-group').querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
      this.closest('.radio-option').classList.add('selected');
    });
  });
  // Init lang
  setLang('en');
  // Init climate with default
  updateClimateSection('pune');
});

function updateDistrictBadge(key) {
  const d = DISTRICTS[key];
  const badge = document.getElementById('district-badge');
  const t = T[currentLang];
  badge.innerHTML = `
    <div class="dib-title">📍 ${d.name} — ${d.region}</div>
    <div class="dib-grid">
      <div class="dib-item">${t['dib-rainfall']||'Avg Rainfall'}: <span>${d.avgRainfall}mm/yr</span></div>
      <div class="dib-item">${t['dib-soil']||'Soil'}: <span>${d.dominantSoil}</span></div>
      <div class="dib-item">${t['dib-known']||'Known For'}: <span>${d.knownFor}</span></div>
      <div class="dib-item">${d.kvk}</div>
    </div>`;
  badge.classList.add('visible');
}

function autoSelectSoil(soilName) {
  const map = { 'Black Soil': 'black', 'Red Soil': 'red', 'Laterite Soil': 'laterite', 'Sandy Soil': 'sandy', 'Alluvial Soil': 'alluvial' };
  const val = map[soilName] || 'black';
  document.querySelectorAll('input[name="soil"]').forEach(r => {
    r.checked = r.value === val;
    r.closest('.radio-option').classList.toggle('selected', r.value === val);
  });
}

// ============================================================
// CLIMATE SECTION
// ============================================================
function updateClimateSection(key) {
  const d = DISTRICTS[key];
  if (!d) return;
  // Cards
  document.getElementById('cl-temp-val').textContent = d.temperature + '°C';
  document.getElementById('cl-rain-val').textContent = d.avgRainfall + 'mm';
  document.getElementById('cl-hum-val').textContent = d.humidity + '%';
  document.getElementById('cl-district-name').textContent = d.name + ', Maharashtra';
  // Soil profile
  document.getElementById('cl-soil-type').textContent = d.dominantSoil;
  const seasonEl = document.querySelector('input[name="season"]:checked');
  const season = seasonEl ? seasonEl.value : 'kharif';
  const crops = d.majorCrops[season] || d.majorCrops.kharif;
  document.getElementById('cl-crops-list').textContent = crops.join(', ');
  // Rainfall chart
  renderRainfallChart(d);
}

function renderRainfallChart(d) {
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  const rainOrder = [...d.monthlyRain.slice(5), ...d.monthlyRain.slice(0,5)];
  const maxR = Math.max(...rainOrder);
  const chart = document.getElementById('rainfall-chart');
  chart.innerHTML = rainOrder.map((r, i) => `
    <div class="bar-wrap">
      <div class="bar-val">${r}</div>
      <div class="bar" style="height:${Math.max(4, Math.round((r/maxR)*120))}px"></div>
      <div class="bar-label">${months[i]}</div>
    </div>`).join('');
}

// ============================================================
// PEST SECTION – District-specific
// ============================================================
const PEST_DATA = {
  // Vidarbha Cotton Belt
  vidarbha_cotton: [
    { name:'Pink Bollworm', badge:'🐛', stage:'Flowering to boll stage (Day 50–90)', time:'Morning',
      symptom:'Entry holes in bolls, pink larvae inside, premature boll shedding',
      pesticide:'Emamectin Benzoate 5 SG', dosage:'0.4 g/liter water', safety:'⚠️ Use PPE. Pre-harvest interval: 7 days.' },
    { name:'American Bollworm', badge:'🦋', stage:'Vegetative to fruiting (Day 25–70)', time:'Evening',
      symptom:'Holes in leaves & bolls, caterpillar visible on plant',
      pesticide:'Chlorpyrifos 20 EC', dosage:'2 ml/liter water', safety:'⚠️ Toxic to fish. Keep away from water bodies.' },
    { name:'Whitefly (YMV Vector)', badge:'🪰', stage:'Vegetative (Day 15–35)', time:'Morning',
      symptom:'Yellow mosaic on leaves, stunted growth, white insects under leaves',
      pesticide:'Imidacloprid 17.8 SL', dosage:'0.3 ml/liter water', safety:'⚠️ Safe for spiders. Harmful to bees – spray at dusk.' },
    { name:'Thrips', badge:'🔬', stage:'Seedling stage (Day 10–25)', time:'Morning',
      symptom:'Silver streaks on leaves, leaf curling, silvery appearance',
      pesticide:'Spinosad 45 SC', dosage:'0.3 ml/liter water', safety:'⚠️ Rotate with other insecticide classes.' }
  ],
  // Soybean / Marathwada
  soybean: [
    { name:'Aphid (Aphis glycines)', badge:'🐜', stage:'Early vegetative (Day 15–30)', time:'Morning or evening',
      symptom:'Leaf curling, sticky residue, sooty mold, yellowing',
      pesticide:'Imidacloprid 17.8 SL', dosage:'0.3 ml/liter water', safety:'⚠️ Wear gloves and mask during spraying. Keep children away.' },
    { name:'Pod Borer', badge:'🦗', stage:'Flowering stage (Day 45–65)', time:'Morning only',
      symptom:'Holes in pods, larvae visible, premature pod drop',
      pesticide:'Spinosad 45 SC', dosage:'0.3 ml/liter water', safety:'⚠️ Safe for spinsosad with honey bees. Do not mix with other chemicals.' },
    { name:'Leaf-eating Caterpillar', badge:'🐛', stage:'Mid stage (Day 30–50)', time:'Evening better',
      symptom:'Complete defoliation, irregular holes, caterpillars visible',
      pesticide:'Chlorpyrifos 20 EC', dosage:'2 ml/liter water', safety:'⚠️ Pre-harvest interval: 15 days. Do not apply near water sources.' },
    { name:'Yellow Mosaic Virus (via whitefly)', badge:'🍂', stage:'Any stage (whitefly vector)', time:'At first yellowing signs',
      symptom:'Yellow mosaic pattern on leaves, stunted plants, growth stops',
      pesticide:'Imidacloprid 17.8 SL', dosage:'0.3 ml/liter water', safety:'⚠️ Use YMV-1 resistant variety. Remove infected plants immediately.' }
  ],
  // Paddy / Konkan / Vidarbha
  paddy: [
    { name:'Brown Planthopper', badge:'🦗', stage:'Tillering to panicle (Day 30–70)', time:'Early morning',
      symptom:'Hopperburn – plants turn yellow-brown in patches, hopping insects at base',
      pesticide:'Buprofezin 25 SC', dosage:'2 ml/liter water', safety:'⚠️ Do not drain fields for 3 days after spray.' },
    { name:'Stem Borer', badge:'🐛', stage:'Seedling to tillering (Day 15–45)', time:'Evening',
      symptom:'Dead heart in vegetative stage, white ear at heading',
      pesticide:'Cartap Hydrochloride 4 G', dosage:'10 kg/acre (granule in field)', safety:'⚠️ Avoid inhalation. Keep livestock away.' },
    { name:'Blast (fungal disease)', badge:'🍄', stage:'All stages – seedling to panicle', time:'At first lesion',
      symptom:'Diamond-shaped gray lesions on leaves, panicle neck rot',
      pesticide:'Tricyclazole 75 WP', dosage:'0.6 g/liter water', safety:'⚠️ Spray twice with 7-day interval. Avoid spraying in rain.' },
    { name:'Leaf Folder', badge:'🌿', stage:'Vegetative stage (Day 25–55)', time:'Morning',
      symptom:'Longitudinally folded leaves, white streaks, larvae inside rolled leaf',
      pesticide:'Chlorpyrifos 20 EC', dosage:'2 ml/liter water', safety:'⚠️ PHI: 15 days. Do not apply near fish ponds.' }
  ],
  // Onion / Nashik, Ahmednagar, Sangli
  onion: [
    { name:'Thrips tabaci', badge:'🔬', stage:'All growth stages', time:'Morning',
      symptom:'Silver-white streaks on leaves, leaf tip scorching, stunted bulbs',
      pesticide:'Spinosad 45 SC', dosage:'0.3 ml/liter water', safety:'⚠️ Rotate with non-spinosid chemistry every 2 sprays.' },
    { name:'Purple Blotch (fungal)', badge:'🟣', stage:'Mid to late stage (Day 40–70)', time:'At first lesion',
      symptom:'Purple-brown lesions with yellow halo on leaves, tip die-back',
      pesticide:'Mancozeb 75 WP', dosage:'2.5 g/liter water', safety:'⚠️ PHI: 10 days. Avoid spraying 3 weeks before harvest.' },
    { name:'Downy Mildew', badge:'🌫️', stage:'Vegetative stage (Day 20–45)', time:'At first symptoms',
      symptom:'Violet-gray downy growth on leaves, yellowing, premature collapse',
      pesticide:'Metalaxyl + Mancozeb 72 WP', dosage:'2 g/liter water', safety:'⚠️ Apply preventively in humid conditions.' },
    { name:'Stemphylium Blight', badge:'🟤', stage:'Late bulb development (Day 60–80)', time:'Morning',
      symptom:'Small brown-yellow spots on leaves, black sooty growth',
      pesticide:'Iprodione 50 WP', dosage:'2 g/liter water', safety:'⚠️ PHI: 7 days.' }
  ],
  // Sugarcane / Kolhapur, Sangli
  sugarcane: [
    { name:'Pyrilla (Sugarcane Leafhopper)', badge:'🦗', stage:'Mid-season (Month 3–6)', time:'Morning',
      symptom:'Yellowish sticky leaves, sooty mold, hoppers jumping when disturbed',
      pesticide:'Chlorpyrifos 20 EC', dosage:'2 ml/liter water', safety:'⚠️ Avoid spray near honey bee colonies.' },
    { name:'Top Borer', badge:'🐛', stage:'Early crop (Month 2–4)', time:'Evening',
      symptom:'Dead heart, withered central shoot, bore holes with frass',
      pesticide:'Fipronil 0.3 G', dosage:'7 kg/acre (granule in crown)', safety:'⚠️ Apply granules in leaf whorls. Use PPE.' },
    { name:'Early Shoot Borer', badge:'🔴', stage:'Very early (Month 1–3)', time:'Morning',
      symptom:'Dead heart with characteristic sweet smell, small bore holes',
      pesticide:'Carbofuran 3 G', dosage:'10 kg/acre', safety:'⚠️ Highly toxic. Do not touch bare-handed. Keep away from water.' },
    { name:'Red Rot (fungal)', badge:'🍄', stage:'Stalk development (Month 5–10)', time:'At wilting signs',
      symptom:'Red discoloration inside stalk, sour smell, stalk drying',
      pesticide:'Carbendazim 50 WP', dosage:'1 g/liter water (set treatment)', safety:'⚠️ Use disease-free setts. No chemical cure once infected.' }
  ],
  // Mango / Ratnagiri, Sindhudurg, Nashik
  mango: [
    { name:'Mango Hopper', badge:'🦗', stage:'Flowering & fruiting (Feb–May)', time:'Evening',
      symptom:'Black sooty mold on flowers & leaves, flower drop, shriveling',
      pesticide:'Imidacloprid 17.8 SL', dosage:'0.3 ml/liter water', safety:'⚠️ Do not spray during open flower stage. Harmful to pollinators.' },
    { name:'Fruit Fly (Bactrocera)', badge:'🪰', stage:'Fruit development (Apr–Jun)', time:'Early morning',
      symptom:'Premature fruit drop, oozing wounds, maggots inside fallen fruit',
      pesticide:'Malathion 50 EC (in bait spray)', dosage:'1 ml + jaggery solution', safety:'⚠️ Use bait stations. PHI: 7 days.' },
    { name:'Stem Borer', badge:'🐛', stage:'Tree trunk (Year-round)', time:'At frass signs',
      symptom:'Frass (sawdust-like excreta) at base of trunk, wilting branches',
      pesticide:'Monocrotophos 36 SL (swab)', dosage:'Swab trunk with 10 ml/liter paste', safety:'⚠️ Highly toxic. Use with extreme caution. PPE mandatory.' },
    { name:'Powdery Mildew (Oidium)', badge:'⬜', stage:'Flowering (Jan–Mar)', time:'At first white powder',
      symptom:'White powdery coating on new leaves, flowers, young fruit',
      pesticide:'Sulphur 80 WP', dosage:'3 g/liter water', safety:'⚠️ Do not spray when temp >35°C. Avoid mixing with oil-based chemicals.' }
  ],
  // Banana / Jalgaon
  banana: [
    { name:'Banana Weevil (Rhizome)', badge:'🪲', stage:'All stages – rhizome damage', time:'At plant decline',
      symptom:'Tunnels in rhizome, yellowing & wilting, plants fall over',
      pesticide:'Chlorpyrifos 20 EC', dosage:'5 ml/plant (soil drench)', safety:'⚠️ Apply soil drench at planting. Use PPE.' },
    { name:'Sigatoka Leaf Spot', badge:'🟡', stage:'Vegetative to maturity', time:'At first yellow spots',
      symptom:'Yellow-brown spots with dark border on leaves, premature leaf death',
      pesticide:'Propiconazole 25 EC', dosage:'1 ml/liter water', safety:'⚠️ PHI: 14 days.' },
    { name:'Panama Wilt (Fusarium)', badge:'🦠', stage:'All stages – soil-borne', time:'At first yellowing',
      symptom:'Lower leaf yellowing, internal brown discoloration of stem, plant death',
      pesticide:'Carbendazim 50 WP (preventive)', dosage:'1 g/liter (soil drench)', safety:'⚠️ No cure once infected. Use resistant varieties (Nendran, G9).' },
    { name:'Thrips', badge:'🔬', stage:'Flowering stage', time:'Morning',
      symptom:'Silver streaks on fruit skin, deformed fruits, flower damage',
      pesticide:'Spinosad 45 SC', dosage:'0.3 ml/liter water', safety:'⚠️ PHI: 7 days.' }
  ],
  // Grapes / Nashik, Sangli, Pune
  grapes: [
    { name:'Downy Mildew (Plasmopara)', badge:'🌫️', stage:'Post-pruning to harvest', time:'At first oil spots',
      symptom:'Oil spots on leaves (upper), white downy growth (lower), berry rot',
      pesticide:'Metalaxyl + Mancozeb 72 WP', dosage:'2.5 g/liter water', safety:'⚠️ PHI: 21 days. Critical to spray before forecast rain.' },
    { name:'Powdery Mildew (Uncinula)', badge:'⬜', stage:'All growth stages', time:'At first white coating',
      symptom:'White powdery coating on shoots, leaves, berries – cracking',
      pesticide:'Sulphur 80 WP', dosage:'3 g/liter water', safety:'⚠️ Do not apply in high heat (>35°C). Interval 7–10 days.' },
    { name:'Thrips', badge:'🔬', stage:'Flowering to fruit set', time:'Early morning',
      symptom:'Russet skin on berries, deformed berries, flower damage',
      pesticide:'Spinosad 45 SC', dosage:'0.3 ml/liter water', safety:'⚠️ Rotate insecticide class to avoid resistance.' },
    { name:'Berry Borer', badge:'🪲', stage:'Fruit development', time:'Evening',
      symptom:'Entry holes in berries, single berry rot, larvae inside',
      pesticide:'Lambda-cyhalothrin 5 EC', dosage:'1 ml/liter water', safety:'⚠️ PHI: 14 days. Apply 2–3 times at 10-day intervals.' }
  ]
};

function getPestDataForDistrict(key) {
  const d = DISTRICTS[key];
  if (!d) return PEST_DATA.soybean;
  const region = d.region;
  const crops = [...(d.majorCrops.kharif || []), ...(d.majorCrops.rabi || [])].join(',').toLowerCase();
  if (crops.includes('cotton') && (region === 'Vidarbha' || crops.includes('cotton'))) return PEST_DATA.vidarbha_cotton;
  if (crops.includes('mango')) return PEST_DATA.mango;
  if (crops.includes('banana')) return PEST_DATA.banana;
  if (crops.includes('grapes') || crops.includes('grape')) return PEST_DATA.grapes;
  if (crops.includes('sugarcane')) return PEST_DATA.sugarcane;
  if (crops.includes('paddy') && (region === 'Konkan' || d.avgRainfall > 1200)) return PEST_DATA.paddy;
  if (crops.includes('onion')) return PEST_DATA.onion;
  return PEST_DATA.soybean;
}

function renderPestSection(key) {
  const pests = getPestDataForDistrict(key);
  const d = DISTRICTS[key];
  const cropLabel = d ? `For ${d.name} (${d.knownFor.split(',')[0].trim()})` : '';
  document.getElementById('pest-district-label').textContent = cropLabel;
  document.getElementById('pest-cards').innerHTML = pests.map(p => `
    <div class="pest-card">
      <div class="pest-header">
        <div class="pest-badge">${p.badge}</div>
        <div>
          <h3>${p.name}</h3>
          <span class="stage-tag">${p.stage}</span>
        </div>
      </div>
      <div class="pest-info-row"><span class="pkey">⏰ Best Time:</span><span class="pval">${p.time}</span></div>
      <div class="pest-info-row"><span class="pkey">🔍 Symptoms:</span><span class="pval">${p.symptom}</span></div>
      <div class="pest-info-row"><span class="pkey">🧪 Pesticide:</span><span class="pval">${p.pesticide}</span></div>
      <div class="pest-info-row"><span class="pkey">💊 Dosage:</span><span class="pval">${p.dosage}</span></div>
      <div class="safety-box"><p>${p.safety}</p></div>
    </div>`).join('');
}

// ============================================================
// GET RECOMMENDATION + AI CALL
// ============================================================
async function getRecommendation() {
  const locVal = document.getElementById('f-location').value.trim();
  const size = document.getElementById('f-size').value || '2';
  const soilEl = document.querySelector('input[name="soil"]:checked');
  const seasonEl = document.querySelector('input[name="season"]:checked');
  const irrEl = document.querySelector('input[name="irr"]:checked');
  const concern = document.getElementById('f-concern').value.trim();

  const soil = soilEl ? soilEl.value : 'black';
  const season = seasonEl ? seasonEl.value : 'kharif';

  const distKey = normalizeDistrict(locVal) || 'pune';
  const dist = DISTRICTS[distKey];
  currentDistrict = distKey;

  // Update all sections immediately with district data
  updateClimateSection(distKey);
  renderPestSection(distKey);

  const btn = document.querySelector('.submit-btn');
  btn.innerHTML = '⏳ Analyzing...';
  btn.disabled = true;

  showSection('recommend');
  document.getElementById('rec-loading').classList.add('visible');
  document.getElementById('ai-result').style.display = 'none';

  const districtContext = `
District: ${dist.name} (${dist.region}, Maharashtra)
Average Annual Rainfall: ${dist.avgRainfall}mm
Average Temperature: ${dist.temperature}°C
Humidity: ${dist.humidity}%
Dominant Soil: ${dist.dominantSoil}
Available Soils: ${dist.soilTypes.join(', ')}
Kharif Crops: ${dist.majorCrops.kharif.join(', ')}
Rabi Crops: ${dist.majorCrops.rabi.join(', ')}
Summer Crops: ${dist.majorCrops.summer.join(', ')}
Drought Risk: ${dist.droughtRisk}, Flood Risk: ${dist.floodRisk}, Pest Risk: ${dist.pestRisk}
Known For: ${dist.knownFor}
${dist.notes}
Farmer's Inputs: Soil=${soil}, Season=${season}, Size=${size} acres, Irrigation=${irrEl?.value||'drip'}
${concern ? `Farmer concern: ${concern}` : ''}
`;

  const prompt = `You are an expert Maharashtra agricultural advisor. Based on this REAL district data:

${districtContext}

Provide a JSON recommendation. Respond ONLY with valid JSON, no markdown backticks.

{
  "cropName": "Best crop name for this district & season",
  "yield": "Expected yield e.g. 14-16 Q/acre",
  "sowingDate": "e.g. June 15-25",
  "duration": "e.g. 90-95 days",
  "confidence": "percentage e.g. 88%",
  "suitableSoil": "soil type from district",
  "waterRequirement": "e.g. 450-600 mm",
  "mspPrice": "Current MSP from district data e.g. Rs.4892/quintal",
  "analysis": "2-3 sentence expert analysis in ${currentLang === 'mr' ? 'Marathi' : currentLang === 'hi' ? 'Hindi' : 'English'} about why this crop suits ${dist.name} this season, mention district-specific factors",
  "droughtRisk": "${dist.droughtRisk}",
  "floodRisk": "${dist.floodRisk}",
  "pestRisk": "${dist.pestRisk}",
  "riskSuggestions": ["4 district-specific risk suggestions mentioning local conditions, rivers, soil, known threats"],
  "calendarEvents": [
    {"month":"Month Year","day":"DD","icon":"emoji","title":"Task","desc":"Brief description","tag":"Tag"}
  ]
}`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await resp.json();
    const raw = data.content.map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    lastResult = result;
    renderResult(result, dist, locVal, size, season);
  } catch (err) {
    console.error(err);
    document.getElementById('rec-loading').classList.remove('visible');
    fallback(dist, season, locVal, size);
  } finally {
    btn.innerHTML = T[currentLang]['btn-get-rec'] || '🌾 Get AI Recommendation';
    btn.disabled = false;
  }
}

function renderResult(result, dist, loc, size, season) {
  document.getElementById('rec-loading').classList.remove('visible');
  document.getElementById('ai-result').style.display = 'block';

  document.getElementById('rec-crop-name').textContent = '🌱 ' + result.cropName;
  document.getElementById('rec-sub-text').textContent = `Best match for ${dist.name} · ${dist.dominantSoil} · ${season.charAt(0).toUpperCase()+season.slice(1)}`;
  document.getElementById('rec-yield').textContent = result.yield;
  document.getElementById('rec-sow').textContent = result.sowingDate;
  document.getElementById('rec-dur').textContent = result.duration;
  document.getElementById('rec-conf').textContent = result.confidence;
  document.getElementById('rec-soil-val').textContent = result.suitableSoil || dist.dominantSoil;
  document.getElementById('rec-water-val').textContent = result.waterRequirement;
  document.getElementById('rec-msp-val').textContent = result.mspPrice;
  document.getElementById('ai-analysis-text').innerHTML = `<strong>${dist.name} District Analysis:</strong><br>${result.analysis}`;

  // Hero card
  document.getElementById('hero-crop-name').textContent = '🌱 ' + result.cropName;
  document.getElementById('hero-crop-detail').textContent = `Sowing: ${result.sowingDate} · ${dist.name}`;
  document.getElementById('hero-yield').textContent = (result.yield||'').split(' ')[0];
  const days = (result.duration||'90').replace(/\D/g,'') || '90';
  document.getElementById('hero-days').textContent = days;
  document.getElementById('hero-conf').textContent = result.confidence;
  updateRiskPills(result.droughtRisk, result.floodRisk, result.pestRisk);

  // Risk section
  renderRisk(result.droughtRisk, result.floodRisk, result.pestRisk, result.riskSuggestions);

  // Calendar
  if (result.calendarEvents?.length > 0) {
    renderAICalendar(result.calendarEvents, result.cropName, dist.name, size, season);
  }

  // Dashboard
  updateDashboard(result, dist, size, season);
}

// ============================================================
// RISK SECTION
// ============================================================
function renderRisk(drought, flood, pest, suggestions) {
  const map = {
    low: ['low','Low Risk','risk-text-low'],
    medium: ['medium','Medium Risk','risk-text-medium'],
    high: ['high','High Risk','risk-text-high']
  };
  const set = (fillId, textId, lv) => {
    const f = document.getElementById(fillId), t = document.getElementById(textId);
    if (!f||!t) return;
    const d = map[lv] || map.low;
    f.className = `risk-fill ${d[0]}`;
    t.className = d[2];
    t.textContent = d[1];
  };
  set('drought-fill','drought-text', drought||'low');
  set('flood-fill','flood-text', flood||'low');
  set('pest-fill','pest-text', pest||'medium');

  const icons = ['🌱','🔍','💧','🧪','⚠️','📊'];
  const box = document.getElementById('risk-suggestions');
  if (box && suggestions) {
    box.innerHTML = suggestions.map((s, i) =>
      `<div class="suggestion-item"><div class="s-icon">${icons[i%icons.length]}</div><p>${s}</p></div>`
    ).join('');
  }
}

function updateRiskPills(d, f, p) {
  const cl = l => l==='high'?'risk-high':l==='medium'?'risk-med':'risk-low';
  const cap = s => (s||'low').charAt(0).toUpperCase()+(s||'low').slice(1);
  const dp = document.getElementById('hero-drought-pill');
  const fp = document.getElementById('hero-flood-pill');
  const pp = document.getElementById('hero-pest-pill');
  if(dp){dp.className=`risk-pill ${cl(d)}`;dp.textContent=`🌵 Drought: ${cap(d)}`;}
  if(fp){fp.className=`risk-pill ${cl(f)}`;fp.textContent=`🌊 Flood: ${cap(f)}`;}
  if(pp){pp.className=`risk-pill ${cl(p)}`;pp.textContent=`🐛 Pest: ${cap(p)}`;}
}

// ============================================================
// CALENDAR SECTION
// ============================================================
function renderAICalendar(events, cropName, location, size, season) {
  document.getElementById('cal-crop-title').textContent = `${cropName} – ${season.charAt(0).toUpperCase()+season.slice(1)} Season`;
  document.getElementById('cal-location').textContent = `📍 ${location}, Maharashtra · ${size} Acres`;
  const byMonth = {};
  events.forEach(ev => { if(!byMonth[ev.month]) byMonth[ev.month]=[]; byMonth[ev.month].push(ev); });
  document.getElementById('calendar-timeline').innerHTML = Object.entries(byMonth).map(([m, evs]) => `
    <div class="month-group">
      <div class="month-label">${m}</div>
      ${evs.map(ev => `
        <div class="cal-event">
          <div class="ev-day">${ev.day}</div>
          <div class="ev-icon">${ev.icon||'📌'}</div>
          <div class="ev-info"><h4>${ev.title}</h4><p>${ev.desc}</p></div>
          <span class="ev-tag">${ev.tag||'Task'}</span>
        </div>`).join('')}
    </div>`).join('');
}

// ============================================================
// DASHBOARD SECTION
// ============================================================
function updateDashboard(result, dist, size, season) {
  const cap = s => (s||'').charAt(0).toUpperCase()+(s||'').slice(1);
  const infoEl = document.getElementById('dash-info');
  if (infoEl) infoEl.innerHTML = `📍 ${dist.name}, Maharashtra · ${size} Acres · ${cap(season)} Season<br>AI crop plan ready. Recommended: <strong>${result.cropName}</strong>`;
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('dash-temp', dist.temperature + '°C');
  set('dash-rain', dist.avgRainfall + 'mm');
  set('dash-sow', result.sowingDate || '–');
  set('dash-crop', (result.cropName||'–').replace(/[\u{1F300}-\u{1FFFF}]/gu,'').trim());
  set('dash-yield', result.yield || '–');
  set('dash-days', result.duration || '–');
  set('dash-next-task', `🌱 Land prep & sowing: ${result.sowingDate}`);
  set('dash-next-date', `Check Pest Guide for ${dist.name}-specific pest threats`);
  set('dash-known', dist.knownFor);
  set('dash-region', dist.region);
  set('dash-kvk', dist.kvk);
}

// ============================================================
// FALLBACK (no internet)
// ============================================================
function fallback(dist, season, loc, size) {
  const crop = dist.majorCrops[season]?.[0] || 'Soybean';
  const sowDate = season==='kharif'?'June 15–25': season==='rabi'?'Oct 15–Nov 5':'Feb 10–25';
  const topMsp = Object.entries(dist.msp||{})[0];
  const result = {
    cropName: crop,
    yield: '12–16 Q/acre',
    sowingDate: sowDate,
    duration: '90 Days',
    confidence: '80%',
    suitableSoil: dist.dominantSoil,
    waterRequirement: Math.round(dist.avgRainfall * 0.6) + '–' + Math.round(dist.avgRainfall * 0.8) + ' mm',
    mspPrice: topMsp ? `₹${topMsp[1]}/quintal (${topMsp[0]})` : '–',
    analysis: `<strong>${dist.name} (${dist.region})</strong> – Avg rainfall: ${dist.avgRainfall}mm/yr. ${dist.notes} <em>(Offline mode – connect to internet for Claude AI full analysis.)</em>`,
    droughtRisk: dist.droughtRisk,
    floodRisk: dist.floodRisk,
    pestRisk: dist.pestRisk,
    riskSuggestions: [
      `Use certified ${crop} varieties suited for ${dist.name}'s ${dist.dominantSoil}.`,
      `Pest risk is ${dist.pestRisk} in ${dist.name}${dist.pestRisk==='high'?' – weekly monitoring from Day 15 is mandatory':' – monitor every 10 days'}.`,
      dist.avgRainfall < 700 ? `Low rainfall district (${dist.avgRainfall}mm/yr) – supplemental drip irrigation is critical.` : `Good rainfall (${dist.avgRainfall}mm/yr) in ${dist.name} – rainfed farming is viable.`,
      `Contact ${dist.kvk} for free soil testing and PM Fasal Bima Yojana enrollment.`
    ],
    calendarEvents: []
  };
  lastResult = result;
  renderResult(result, dist, loc, size, season);
  renderPestSection(normalizeDistrict(loc) || 'pune');
}

// ============================================================
// NAVIGATION
// ============================================================
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('active');
  window.scrollTo(0, 0);
  // Update section-specific content when navigating
  if (id === 'climate' && currentDistrict) updateClimateSection(currentDistrict);
  if (id === 'pest' && currentDistrict) renderPestSection(currentDistrict);
  if (id === 'risk' && currentDistrict && !lastResult) {
    const d = DISTRICTS[currentDistrict];
    renderRisk(d.droughtRisk, d.floodRisk, d.pestRisk, [
      `Monitor conditions specific to ${d.name}.`,
      `Drought risk is ${d.droughtRisk} in this district.`,
      `Pest risk is ${d.pestRisk} – check Pest Guide tab.`,
      `Contact ${d.kvk} for local advisory.`
    ]);
  }
}
