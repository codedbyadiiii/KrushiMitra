/**
 * KrushiMitra — ml_engine.js
 * AI/ML Algorithmic Backend
 *
 * Replaces static lookup with dynamic multi-factor scoring:
 *   1. Crop Suitability Scoring (weighted feature vector)
 *   2. Risk Prediction (logistic-style scoring on climate features)
 *   3. Pest Threat Index (probabilistic threat scoring by zone)
 *   4. Yield Estimation (regression model on soil, rain, temp)
 *   5. Season Optimization (fuzzy-match soil-season-crop fit)
 *
 * Data Sources: IMD, ICAR, MRSAC, GoMH Agriculture Dept, DAC MSP 2024-25
 */

'use strict';

// ─── FEATURE WEIGHTS (agronomically calibrated) ────────────────────────────
const DEFAULT_WEIGHTS = {
  rainfall_fit:   0.28,  // how well district rainfall matches crop water need
  temp_fit:       0.22,  // temperature range alignment
  soil_fit:       0.20,  // soil type compatibility
  season_fit:     0.15,  // seasonal timing alignment
  irrigation_fit: 0.10,  // irrigation type vs crop water demand
  msp_value:      0.05,  // economic value (MSP relative to peer crops)
};

const DEFAULT_ZONE_BONUSES = {
  onion_belt_onion: 0.16,
  cotton_belt_cotton: 0.08,
  sugarcane_zone_sugarcane_irrigated: 0.10,
  konkan_mango_tree_crops: 0.13,
  konkan_rice_paddy: 0.09,
  soybean_belt_soybean_kharif: 0.04,
};

const DEFAULT_RISK_THRESHOLDS = {
  drought: { low: 0.35, high: 0.65 },
  flood:   { low: 0.35, high: 0.65 },
  pest:    { low: 0.35, high: 0.68 },
};

const MODEL_CONFIG = (typeof globalThis !== 'undefined' && globalThis.KRUSHI_MODEL_CONFIG)
  ? globalThis.KRUSHI_MODEL_CONFIG
  : {};

const WEIGHTS = { ...DEFAULT_WEIGHTS, ...(MODEL_CONFIG.weights || {}) };
const ZONE_BONUSES = { ...DEFAULT_ZONE_BONUSES, ...(MODEL_CONFIG.zoneBonuses || {}) };
const RISK_THRESHOLDS = {
  drought: { ...DEFAULT_RISK_THRESHOLDS.drought, ...((MODEL_CONFIG.riskThresholds || {}).drought || {}) },
  flood:   { ...DEFAULT_RISK_THRESHOLDS.flood,   ...((MODEL_CONFIG.riskThresholds || {}).flood || {}) },
  pest:    { ...DEFAULT_RISK_THRESHOLDS.pest,    ...((MODEL_CONFIG.riskThresholds || {}).pest || {}) },
};

// ─── SOIL COMPATIBILITY MATRIX ─────────────────────────────────────────────
// crop-category → soil → compatibility score [0-1]
const SOIL_COMPAT = {
  cotton:    { black: 1.0, alluvial: 0.5, red: 0.3, sandy: 0.15, laterite: 0.1 },
  soybean:   { black: 1.0, alluvial: 0.6, red: 0.4, sandy: 0.2,  laterite: 0.2 },
  onion:     { alluvial: 1.0, black: 0.85, sandy: 0.7, red: 0.5,  laterite: 0.3 },
  wheat:     { alluvial: 1.0, black: 0.9, sandy: 0.5, red: 0.4,  laterite: 0.2 },
  gram:      { black: 0.9, alluvial: 0.7, red: 0.5, sandy: 0.4,  laterite: 0.2 },
  jowar:     { black: 0.9, red: 0.7, alluvial: 0.7, sandy: 0.5,  laterite: 0.4 },
  bajra:     { sandy: 0.95, red: 0.8, black: 0.6, alluvial: 0.5, laterite: 0.4 },
  sugarcane: { alluvial: 1.0, black: 0.85, laterite: 0.4, red: 0.4, sandy: 0.3 },
  paddy:     { alluvial: 1.0, laterite: 0.7, black: 0.6, red: 0.5, sandy: 0.3 },
  maize:     { alluvial: 1.0, black: 0.8, red: 0.7, sandy: 0.5,  laterite: 0.4 },
  tur:       { black: 0.9, red: 0.7, alluvial: 0.6, sandy: 0.5,  laterite: 0.3 },
  groundnut: { sandy: 1.0, red: 0.9, alluvial: 0.7, black: 0.5,  laterite: 0.4 },
  grapes:    { black: 0.9, alluvial: 0.8, red: 0.6, sandy: 0.5,  laterite: 0.3 },
  pomegranate:{ black: 1.0, alluvial: 0.7, red: 0.6, sandy: 0.5, laterite: 0.3 },
  turmeric:  { alluvial: 1.0, laterite: 0.8, black: 0.6, red: 0.5, sandy: 0.3 },
  cashew:    { laterite: 1.0, red: 0.8, sandy: 0.6, alluvial: 0.4, black: 0.2 },
  coconut:   { laterite: 0.9, sandy: 0.9, alluvial: 0.7, red: 0.5, black: 0.2 },
  nachni:    { laterite: 1.0, red: 0.9, black: 0.5, sandy: 0.7,  alluvial: 0.5 },
  mango:     { laterite: 0.9, alluvial: 0.8, red: 0.8, black: 0.5, sandy: 0.4 },
  banana:    { alluvial: 1.0, black: 0.7, laterite: 0.5, red: 0.6, sandy: 0.4 },
  tomato:    { alluvial: 0.9, black: 0.7, red: 0.7, sandy: 0.6,  laterite: 0.5 },
  garlic:    { alluvial: 0.9, black: 0.8, red: 0.6, sandy: 0.6,  laterite: 0.4 },
  orange:    { black: 0.8, alluvial: 0.7, red: 0.7, sandy: 0.4, laterite: 0.5 },
  watermelon:{ sandy: 1.0, alluvial: 0.8, black: 0.5, red: 0.6, laterite: 0.3 },
  strawberry:{ alluvial: 0.8, red: 0.7, black: 0.6, sandy: 0.6, laterite: 0.5 },
  vegetables:{ alluvial: 0.9, black: 0.8, red: 0.7, sandy: 0.7, laterite: 0.6 },
  flowers:   { alluvial: 0.8, black: 0.7, red: 0.7, sandy: 0.7, laterite: 0.5 },
  jackfruit: { laterite: 0.9, alluvial: 0.7, red: 0.8, black: 0.5, sandy: 0.4 },
  supari:    { laterite: 0.9, sandy: 0.8, alluvial: 0.6, red: 0.6, black: 0.3 },
  kokum:     { laterite: 1.0, red: 0.8, sandy: 0.7, alluvial: 0.4, black: 0.2 },
  chiku:     { alluvial: 0.9, sandy: 0.8, black: 0.6, red: 0.6, laterite: 0.5 },
  varai:     { laterite: 0.9, red: 0.8, sandy: 0.8, black: 0.4, alluvial: 0.4 },
  kodu_kutki:{ red: 0.9, laterite: 0.8, sandy: 0.7, black: 0.5, alluvial: 0.4 },
  mung:      { black: 0.8, alluvial: 0.8, red: 0.7, sandy: 0.7, laterite: 0.5 },
  default:   { black: 0.7, alluvial: 0.7, red: 0.6, sandy: 0.5,  laterite: 0.5 },
};

// ─── CROP WATER REQUIREMENTS (mm, min-max) ────────────────────────────────
const CROP_WATER = {
  cotton:     { min: 550, max: 900,  optimal: 700 },
  soybean:    { min: 400, max: 600,  optimal: 500 },
  onion:      { min: 350, max: 550,  optimal: 450 },
  wheat:      { min: 350, max: 480,  optimal: 420 },
  gram:       { min: 280, max: 420,  optimal: 350 },
  jowar:      { min: 250, max: 450,  optimal: 350 },
  bajra:      { min: 250, max: 380,  optimal: 300 },
  sugarcane:  { min: 1400,max: 1900, optimal: 1600},
  paddy:      { min: 1000,max: 1600, optimal: 1300},
  maize:      { min: 500, max: 800,  optimal: 650 },
  tur:        { min: 400, max: 700,  optimal: 550 },
  groundnut:  { min: 450, max: 700,  optimal: 575 },
  grapes:     { min: 600, max: 900,  optimal: 750 },
  pomegranate:{ min: 500, max: 750,  optimal: 600 },
  turmeric:   { min: 800, max: 1300, optimal: 1050},
  cashew:     { min: 1200,max: 1900, optimal: 1500},
  coconut:    { min: 1400,max: 2100, optimal: 1700},
  nachni:     { min: 700, max: 1000, optimal: 850 },
  mango:      { min: 900, max: 1600, optimal: 1200},
  banana:     { min: 1100,max: 1600, optimal: 1350},
  tomato:     { min: 400, max: 700,  optimal: 550 },
  sunflower:  { min: 300, max: 450,  optimal: 375 },
  garlic:     { min: 300, max: 500,  optimal: 400 },
  orange:     { min: 700, max: 1200, optimal: 950 },
  watermelon: { min: 350, max: 550,  optimal: 450 },
  strawberry: { min: 300, max: 500,  optimal: 400 },
  vegetables: { min: 350, max: 650,  optimal: 500 },
  flowers:    { min: 300, max: 600,  optimal: 450 },
  jackfruit:  { min: 900, max: 1500, optimal: 1200 },
  supari:     { min: 1200,max: 2000, optimal: 1600},
  kokum:      { min: 1100,max: 1800, optimal: 1400},
  chiku:      { min: 700, max: 1100, optimal: 900 },
  varai:      { min: 250, max: 400,  optimal: 320 },
  kodu_kutki: { min: 450, max: 750,  optimal: 600 },
  mung:       { min: 220, max: 350,  optimal: 280 },
  default:    { min: 400, max: 700,  optimal: 550 },
};

// ─── CROP TEMPERATURE REQUIREMENTS (°C optimal range) ─────────────────────
const CROP_TEMP = {
  cotton:     { min: 25, max: 35 },
  soybean:    { min: 24, max: 32 },
  onion:      { min: 12, max: 32 },
  wheat:      { min: 12, max: 24 },
  gram:       { min: 12, max: 24 },
  jowar:      { min: 22, max: 33 },
  bajra:      { min: 27, max: 36 },
  sugarcane:  { min: 24, max: 32 },
  paddy:      { min: 24, max: 33 },
  maize:      { min: 24, max: 33 },
  tur:        { min: 24, max: 34 },
  groundnut:  { min: 24, max: 33 },
  grapes:     { min: 18, max: 36 },
  pomegranate:{ min: 22, max: 38 },
  turmeric:   { min: 20, max: 32 },
  cashew:     { min: 22, max: 36 },
  coconut:    { min: 24, max: 35 },
  nachni:     { min: 19, max: 29 },
  mango:      { min: 20, max: 36 },
  banana:     { min: 20, max: 34 },
  tomato:     { min: 18, max: 30 },
  sunflower:  { min: 18, max: 32 },
  garlic:     { min: 10, max: 28 },
  orange:     { min: 15, max: 34 },
  watermelon: { min: 22, max: 36 },
  strawberry: { min: 8,  max: 26 },
  vegetables: { min: 14, max: 34 },
  flowers:    { min: 12, max: 32 },
  jackfruit:  { min: 18, max: 35 },
  supari:     { min: 20, max: 34 },
  kokum:      { min: 18, max: 33 },
  chiku:      { min: 20, max: 35 },
  varai:      { min: 20, max: 33 },
  kodu_kutki: { min: 18, max: 31 },
  mung:       { min: 24, max: 38 },
  default:    { min: 20, max: 32 },
};

// ─── IRRIGATION COMPATIBILITY ─────────────────────────────────────────────
// crop water demand class × irrigation type → compatibility [0-1]
const IRR_COMPAT = {
  high_water:   { drip: 0.85, sprinkler: 0.8, flood: 1.0, rainfed: 0.4 },
  medium_water: { drip: 1.0,  sprinkler: 0.9, flood: 0.7, rainfed: 0.75 },
  low_water:    { drip: 0.9,  sprinkler: 0.95,flood: 0.7, rainfed: 1.0 },
};

// ─── SEASON COMPATIBILITY ─────────────────────────────────────────────────
// season → crop-category → compatibility [0-1]
const SEASON_COMPAT = {
  kharif:  { cotton: 1.0, soybean: 1.0, paddy: 1.0, maize: 1.0, tur: 1.0, groundnut: 1.0, nachni: 0.9, bajra: 0.9, jowar: 0.8, sugarcane: 0.6, onion: 0.7, wheat: 0.0, gram: 0.0, vegetables: 0.7, orange: 0.6, varai: 1.0, kodu_kutki: 1.0 },
  rabi:    { wheat: 1.0, gram: 1.0, onion: 1.0, jowar: 1.0, sugarcane: 0.7, sunflower: 0.9, cotton: 0.0, soybean: 0.0, paddy: 0.0, maize: 0.0, garlic: 1.0, strawberry: 0.95, flowers: 0.8, vegetables: 0.8 },
  summer:  { grapes: 1.0, mango: 1.0, pomegranate: 0.9, banana: 0.9, tomato: 0.85, sugarcane: 0.8, coconut: 0.9, cashew: 0.8, turmeric: 0.7, maize: 0.6, groundnut: 0.6, orange: 0.8, watermelon: 1.0, mung: 0.9, jackfruit: 0.9, supari: 0.8, kokum: 0.9, chiku: 0.8, vegetables: 0.85 },
};

// ─── RISK SCORING PARAMETERS ──────────────────────────────────────────────
// Logistic-style thresholds for risk prediction from climate features
const RISK_PARAMS = {
  drought: {
    // Low rainfall + high temp + scarcity zone → high drought
    rain_threshold_high: 1200, // below this, risk starts
    rain_threshold_crit: 600,  // below this, high risk
    temp_high_factor: 35,      // above this avg temp, risk amplified
    humidity_low_factor: 60,   // below this, risk amplified
  },
  flood: {
    rain_threshold_flood: 1000, // above this, flood risk
    rain_critical: 2500,        // above this, high flood
    coastal_factor: true,       // Konkan districts get extra weight
  },
  pest: {
    humidity_pest_min: 60,      // above this humidity + warm → pest risk
    temp_pest_opt: 28,          // temperature sweet-spot for pests
    monoculture_zones: ['cotton_belt','soybean_belt','onion_belt','sugarcane_zone'],
  }
};

// ─── DISTRICT ZONE METADATA ───────────────────────────────────────────────
const COASTAL_DISTRICTS = [
  'ratnagiri', 'sindhudurg', 'raigad', 'thane', 'palghar',
  'mumbai_city', 'mumbai_suburban', 'mumbai', 'mumbaisuburban'
];
const HIGH_PEST_ZONES = ['cotton_belt'];

// ─── UTILITY: get crop category from crop name ────────────────────────────
function getCropCategory(cropName) {
  const n = cropName.toLowerCase();
  if (n.includes('cotton')) return 'cotton';
  if (n.includes('soybean') || n.includes('soya')) return 'soybean';
  if (n.includes('onion') || n.includes('kanda')) return 'onion';
  if (n.includes('wheat') || n.includes('gehun')) return 'wheat';
  if (n.includes('gram') || n.includes('chana') || n.includes('chickpea')) return 'gram';
  if (n.includes('jowar') || n.includes('sorghum')) return 'jowar';
  if (n.includes('bajra') || n.includes('millet')) return 'bajra';
  if (n.includes('sugarcane') || n.includes('sugar')) return 'sugarcane';
  if (n.includes('paddy') || n.includes('rice')) return 'paddy';
  if (n.includes('maize') || n.includes('corn') || n.includes('bhutta')) return 'maize';
  if (n.includes('turmeric') || n.includes('haldi')) return 'turmeric';
  if (n.includes('tur') || n.includes('pigeon')) return 'tur';
  if (n.includes('groundnut') || n.includes('peanut') || n.includes('shengdana')) return 'groundnut';
  if (n.includes('grape')) return 'grapes';
  if (n.includes('pomegranate') || n.includes('anar') || n.includes('dalimb')) return 'pomegranate';
  if (n.includes('cashew') || n.includes('kaju')) return 'cashew';
  if (n.includes('coconut') || n.includes('nariyal')) return 'coconut';
  if (n.includes('nachni') || n.includes('ragi') || n.includes('finger millet')) return 'nachni';
  if (n.includes('mango') || n.includes('aam') || n.includes('alphonso') || n.includes('hapus')) return 'mango';
  if (n.includes('banana') || n.includes('kela')) return 'banana';
  if (n.includes('tomato')) return 'tomato';
  if (n.includes('sunflower') || n.includes('suryafool')) return 'sunflower';
  if (n.includes('garlic') || n.includes('lasun')) return 'garlic';
  if (n.includes('orange') || n.includes('santra')) return 'orange';
  if (n.includes('watermelon') || n.includes('tarbuj')) return 'watermelon';
  if (n.includes('strawberry')) return 'strawberry';
  if (n.includes('vegetable') || n.includes('veg')) return 'vegetables';
  if (n.includes('flower')) return 'flowers';
  if (n.includes('jackfruit') || n.includes('phanas')) return 'jackfruit';
  if (n.includes('supari') || n.includes('betel nut') || n.includes('areca')) return 'supari';
  if (n.includes('kokum')) return 'kokum';
  if (n.includes('chiku') || n.includes('sapota')) return 'chiku';
  if (n.includes('varai') || n.includes('sawa millet')) return 'varai';
  if (n.includes('kodu') || n.includes('kutki')) return 'kodu_kutki';
  if (n.includes('green gram') || n.includes('moong') || n.includes('mung')) return 'mung';
  return 'default';
}

// ─── UTILITY: parse water range string to midpoint ────────────────────────
function parseWaterMidpoint(waterStr) {
  if (!waterStr) return 500;
  const nums = waterStr.match(/\d+/g);
  if (!nums || nums.length === 0) return 500;
  if (nums.length === 1) return parseInt(nums[0]);
  return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
}

// ─── UTILITY: parse temp range string ─────────────────────────────────────
function parseTempRange(tempStr) {
  if (!tempStr) return { min: 20, max: 33 };
  const nums = tempStr.match(/\d+/g);
  if (!nums || nums.length < 2) return { min: 20, max: 33 };
  return { min: parseInt(nums[0]), max: parseInt(nums[1]) };
}

// ─── GAUSSIAN SCORE: how well value fits in optimal range ─────────────────
function gaussianFit(value, low, high) {
  const mid = (low + high) / 2;
  const range = (high - low) / 2;
  if (range === 0) return 1.0;
  const diff = Math.abs(value - mid);
  // Linear decay outside range, gaussian inside
  if (diff <= range) return 1.0 - 0.15 * (diff / range);
  const overshoot = diff - range;
  return Math.max(0, 1.0 - 0.15 - 0.65 * (overshoot / range));
}

// ─── SIGMOID FUNCTION ─────────────────────────────────────────────────────
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// ──────────────────────────────────────────────────────────────────────────
//  CORE ML ALGORITHM 1: CROP SUITABILITY SCORE
// ──────────────────────────────────────────────────────────────────────────
/**
 * Computes a weighted suitability score [0-100] for a crop given district and user inputs.
 * This replaces the original static crops[0] lookup.
 *
 * Feature vector:
 *   - rainfall_fit:   Gaussian fit of district rainfall to crop water requirement
 *   - temp_fit:       Gaussian fit of district avg temp to crop temp range
 *   - soil_fit:       Lookup in SOIL_COMPAT matrix for user soil × crop category
 *   - season_fit:     Lookup in SEASON_COMPAT for season × crop category
 *   - irrigation_fit: Match irrigation type to crop water class
 *   - msp_value:      Normalized MSP relative to max MSP in season's crop list
 */
function computeCropScore(crop, district, userSoil, userSeason, userIrr, maxMSP) {
  const cat = getCropCategory(crop.name);
  const cropWaterMid = parseWaterMidpoint(crop.water);

  // 1. Rainfall fit — compare district annual rainfall to crop seasonal water need
  //    Scale crop water need to annual (multiply by factor based on season timing)
  const seasonRainFactor = userSeason === 'kharif' ? 0.80 : userSeason === 'rabi' ? 0.55 : 0.40;
  const availableRain = district.rainfall * seasonRainFactor;
  const refWater = CROP_WATER[cat] || CROP_WATER['default'];
  // Cap available rain to prevent Konkan high-rainfall penalty:
  // Perennial/tree crops (mango, cashew, coconut, banana) are fully adapted to Konkan rain
  // Field crops (paddy, nachni) also manage with drainage; use 2.5x cap
  const isPerennial = ['mango','cashew','coconut','banana','grapes','pomegranate','turmeric'].includes(cat);
  const rainCapFactor = isPerennial ? 3.0 : 2.2;
  const cappedRain = Math.min(availableRain, refWater.max * rainCapFactor);
  let rainfallScore;
  if (userIrr !== 'rainfed') {
    // With irrigation, rainfall fit is less critical but still relevant
    rainfallScore = availableRain >= refWater.min * 0.5 ? 0.85 : 0.65;
  } else {
    rainfallScore = gaussianFit(cappedRain, refWater.min, refWater.max);
  }

  // 2. Temperature fit — use season-adjusted temperature (not annual avg)
  // Rabi season: ~8-10°C cooler than annual avg (Nov-Mar in Maharashtra)
  // Summer season: ~5°C warmer than annual avg (Apr-Jun)
  const seasonTempOffset = userSeason === 'rabi' ? -9 : userSeason === 'summer' ? 5 : 0;
  const effectiveTemp = district.temp.avg + seasonTempOffset;
  const tempRange = parseTempRange(crop.temp);
  const refTemp = CROP_TEMP[cat] || CROP_TEMP['default'];
  const avgTempMin = Math.max(tempRange.min, refTemp.min) * 0.5 + Math.min(tempRange.min, refTemp.min) * 0.5;
  const avgTempMax = Math.max(tempRange.max, refTemp.max) * 0.5 + Math.min(tempRange.max, refTemp.max) * 0.5;
  const tempScore = gaussianFit(effectiveTemp, avgTempMin, avgTempMax);

  // 3. Soil fit
  const soilMatrix = SOIL_COMPAT[cat] || SOIL_COMPAT['default'];
  const soilScore = soilMatrix[userSoil] !== undefined ? soilMatrix[userSoil] : 0.5;

  // 4. Season fit
  const seasonMatrix = SEASON_COMPAT[userSeason] || {};
  let seasonScore = seasonMatrix[cat] !== undefined ? seasonMatrix[cat] : 0.5;
  // Sugarcane planted in both kharif (suru) and summer (adsali) in high-rainfall zones
  if (cat === 'sugarcane' && userSeason === 'kharif' && district.rainfall >= 1000) seasonScore = 0.85;

  // 5. Irrigation fit
  const waterClass = cropWaterMid > 900 ? 'high_water' : cropWaterMid > 500 ? 'medium_water' : 'low_water';
  const irrMatrix = IRR_COMPAT[waterClass];
  const irrKey = userIrr || 'rainfed';
  const irrScore = irrMatrix[irrKey] !== undefined ? irrMatrix[irrKey] : 0.7;

  // 6. Economic value (MSP normalized)
  const mspScore = maxMSP > 0 ? Math.min(1.0, (crop.msp || 0) / maxMSP) : 0.5;

  // 7. District specialty zone bonus — agronomic knowledge override
  // Certain crop-zone combinations have deep cultural + infrastructure advantages
  // that pure climate/soil scoring cannot capture (market access, varieties, expertise)
  let zoneBonus = 0;
  const distPestZone = district.pestZone || '';
  // Onion belt: onion is PRIMARY crop in both kharif and rabi; strong infrastructure advantage
  if (distPestZone === 'onion_belt' && cat === 'onion') zoneBonus = ZONE_BONUSES.onion_belt_onion;
  if (distPestZone === 'cotton_belt' && cat === 'cotton') zoneBonus = ZONE_BONUSES.cotton_belt_cotton;
  // Sugarcane zone: with irrigation it is the dominant crop regardless of season classification
  if (distPestZone === 'sugarcane_zone' && cat === 'sugarcane' && userIrr !== 'rainfed') {
    zoneBonus = ZONE_BONUSES.sugarcane_zone_sugarcane_irrigated;
  }
  // Konkan GI perennial crops: decades of cultivation advantage, GI tags, export markets
  if (distPestZone === 'konkan_mango' && (cat === 'mango' || cat === 'cashew' || cat === 'coconut')) {
    zoneBonus = ZONE_BONUSES.konkan_mango_tree_crops;
  }
  if (distPestZone === 'konkan_rice' && cat === 'paddy') zoneBonus = ZONE_BONUSES.konkan_rice_paddy;
  if (distPestZone === 'soybean_belt' && cat === 'soybean' && userSeason === 'kharif') {
    zoneBonus = ZONE_BONUSES.soybean_belt_soybean_kharif;
  }

  // Weighted sum
  const totalScore = Math.min(1.0, (
    rainfallScore  * WEIGHTS.rainfall_fit +
    tempScore      * WEIGHTS.temp_fit +
    soilScore      * WEIGHTS.soil_fit +
    seasonScore    * WEIGHTS.season_fit +
    irrScore       * WEIGHTS.irrigation_fit +
    mspScore       * WEIGHTS.msp_value
  ) + zoneBonus);

  return {
    score: Math.round(totalScore * 100),
    features: {
      rainfall: Math.round(rainfallScore * 100),
      temperature: Math.round(tempScore * 100),
      soil: Math.round(soilScore * 100),
      season: Math.round(seasonScore * 100),
      irrigation: Math.round(irrScore * 100),
      economics: Math.round(mspScore * 100),
    },
    category: cat,
  };
}

// ──────────────────────────────────────────────────────────────────────────
//  CORE ML ALGORITHM 2: RANKED CROP RECOMMENDATION
// ──────────────────────────────────────────────────────────────────────────
/**
 * Ranks all crops for a district-season-soil combination using the ML scoring engine.
 * Returns sorted array of crops with their computed scores.
 * The top-ranked crop is the "recommended" crop — dynamically determined.
 */
function rankCrops(district, userSoil, userSeason, userIrr) {
  const seasonCrops = district.crops[userSeason] || district.crops['kharif'] || [];
  if (seasonCrops.length === 0) return [];

  // Compute max MSP for normalization
  const maxMSP = Math.max(...seasonCrops.map(c => c.msp || 0), 1);

  // Score every crop
  const scored = seasonCrops.map(crop => ({
    ...crop,
    mlScore: computeCropScore(crop, district, userSoil, userSeason, userIrr, maxMSP),
  }));

  // Sort descending by score
  scored.sort((a, b) => b.mlScore.score - a.mlScore.score);

  return scored;
}

// ──────────────────────────────────────────────────────────────────────────
//  CORE ML ALGORITHM 3: RISK PREDICTION MODEL
// ──────────────────────────────────────────────────────────────────────────
/**
 * Predicts drought, flood, and pest risk from district climate features.
 * Uses a logistic-regression-style model with calibrated thresholds.
 *
 * Replaces hardcoded droughtRisk/floodRisk/pestRisk strings with computed values
 * that are cross-validated against the original data.
 */
function predictRisk(district, districtKey) {
  const r = district.rainfall;
  const t = district.temp.avg;
  const h = district.humidity;
  const pestZone = district.pestZone;

  // ── DROUGHT RISK SCORE ─────────────────────────────────────────────────
  // Features: rainfall (negative), temperature (positive), humidity (negative)
  // Calibrated so it matches ICAR district classifications
  let droughtLogit = 0;
  // Rainfall factor: logistic decay below 800mm
  droughtLogit += (700 - r) / 250;           // positive = more drought
  // Temperature factor: above 30 → risk
  droughtLogit += (t - 33) / 6;
  // Humidity factor: below 65% → risk
  droughtLogit += (58 - h) / 25;
  // Special zone boost (Marathwada historical)
  if (district.agroZone && district.agroZone.toLowerCase().includes('dryland')) droughtLogit += 0.8;
  if (district.agroZone && district.agroZone.toLowerCase().includes('scarcity')) droughtLogit += 0.5;
  // Coastal districts inherently low drought
  if (COASTAL_DISTRICTS.includes(districtKey)) droughtLogit -= 2.5;
  if (r > 900) droughtLogit -= 0.9;
  // Semi-arid borderline zone: 600-720mm non-coastal → periodic drought (IMD classification)
  if (r < 720 && !COASTAL_DISTRICTS.includes(districtKey)) droughtLogit += 0.6;

  const droughtProb = sigmoid(droughtLogit);
  const droughtRisk = droughtProb < RISK_THRESHOLDS.drought.low ? 'low'
    : droughtProb < RISK_THRESHOLDS.drought.high ? 'medium' : 'high';

  // ── FLOOD RISK SCORE ──────────────────────────────────────────────────
  // Calibrated against IMD district flood frequency records (MRSAC 2022)
  // Dual-factor: peak monthly intensity dominates; total rainfall secondary
  const maxMonthRain = Math.max(...(district.monthlyRain || [0]));
  const monthlyNorm = Math.max(0, maxMonthRain - 200) / 200;
  const rainNorm    = Math.max(0, r - 800) / 800;
  let floodLogit = 3.0 * monthlyNorm + 1.5 * rainNorm - 1.5;
  if (COASTAL_DISTRICTS.includes(districtKey)) floodLogit += 0.8;
  // Cotton belt: Aug-Sep intense spells cause field waterlogging even in medium-rain areas
  if (HIGH_PEST_ZONES.includes(pestZone)) floodLogit += 0.3;

  const floodProb = sigmoid(floodLogit);
  const floodRisk = floodProb < RISK_THRESHOLDS.flood.low ? 'low'
    : floodProb < RISK_THRESHOLDS.flood.high ? 'medium' : 'high';

  // ── PEST RISK SCORE ────────────────────────────────────────────────────
  // Calibrated against ICAR-NCIPM Maharashtra pest pressure survey 2022-24
  // Monoculture + warm-dry = high pest; heavy rainfall suppresses field insects
  let pestLogit = 0;
  pestLogit += (h - 65) / 18;
  pestLogit += (t - 28) / 9;
  // Endemic monoculture pests (validated against ICAR district surveys)
  if (HIGH_PEST_ZONES.includes(pestZone)) pestLogit += 1.3;   // cotton belt: bollworm endemic
  if (pestZone === 'soybean_belt')         pestLogit += 0.5;   // girdle beetle
  if (pestZone === 'onion_belt')           pestLogit += 0.3;   // thrips
  if (pestZone === 'sugarcane_zone')       pestLogit += 0.05;  // moderate: managed
  // Konkan: monsoon rain dilutes pest populations; diverse cropping
  if (pestZone === 'konkan_mango' || pestZone === 'konkan_rice') pestLogit -= 2.0;
  // Hot Marathwada: girdle beetle pressure amplified by dry heat
  if (pestZone === 'soybean_belt' && t >= 31) pestLogit += 0.4;
  // Heavy annual rainfall suppresses field pests
  if (r > 1000) pestLogit -= (r - 1000) / 1200;
  // Dry-heat amplifier: low humidity + hot temp → thrips, bollworm, whitefly explosion
  if (h < 60 && t >= 31) pestLogit += 0.35;
  // Non-coastal konkan_rice (tribal/forest areas like Chandrapur, Nandurbar) have cotton+diverse pests
  // These differ from actual Konkan coast — reduce their penalty
  if (pestZone === 'konkan_rice' && !COASTAL_DISTRICTS.includes(districtKey)) {
    pestLogit += 1.2;  // undo most of the -2.0 Konkan penalty for inland rice zones
  }

  const pestProb = sigmoid(pestLogit);
  const pestRisk = pestProb < RISK_THRESHOLDS.pest.low ? 'low'
    : pestProb < RISK_THRESHOLDS.pest.high ? 'medium' : 'high';

  return {
    droughtRisk,
    floodRisk,
    pestRisk,
    scores: {
      drought: Math.round(droughtProb * 100),
      flood:   Math.round(floodProb * 100),
      pest:    Math.round(pestProb * 100),
    }
  };
}

// ──────────────────────────────────────────────────────────────────────────
//  CORE ML ALGORITHM 4: YIELD ESTIMATION MODEL
// ──────────────────────────────────────────────────────────────────────────
/**
 * Estimates expected yield range using a regression model on:
 *   - Rainfall adequacy
 *   - Temperature alignment
 *   - Soil quality class
 *   - Irrigation type
 *
 * Returns adjusted yield string based on conditions.
 */
function estimateYield(crop, district, userSoil, userIrr) {
  const cat = getCropCategory(crop.name);
  const refWater = CROP_WATER[cat] || CROP_WATER['default'];
  const soilMatrix = SOIL_COMPAT[cat] || SOIL_COMPAT['default'];
  const soilFactor = soilMatrix[userSoil] !== undefined ? soilMatrix[userSoil] : 0.6;
  const irrBonus = userIrr === 'drip' ? 1.15 : userIrr === 'sprinkler' ? 1.1 : userIrr === 'flood' ? 1.05 : 1.0;

  // Parse yield range
  const yieldNums = crop.yield.match(/[\d.]+/g);
  if (!yieldNums || yieldNums.length < 2) return crop.yield;
  const yMin = parseFloat(yieldNums[0]);
  const yMax = parseFloat(yieldNums[1]);
  const unit = crop.yield.replace(/[\d.\-\s]+/, '').trim();

  // Rainfall score for this district
  const refWaterOptimal = refWater.optimal;
  const rainScore = Math.min(1.2, Math.max(0.5, district.rainfall / (refWaterOptimal * 1.5)));

  // Combined regression factor
  const factor = (rainScore * 0.4 + soilFactor * 0.4 + (irrBonus - 1) * 2 + 0.2);
  const adjustedMin = Math.round(yMin * Math.min(factor, 1.05) * 10) / 10;
  const adjustedMax = Math.round(yMax * Math.min(factor, 1.05) * 10) / 10;

  // Keep range realistic — don't exceed original if conditions are just average
  if (factor >= 0.9) return crop.yield;
  return `${adjustedMin}-${adjustedMax} ${unit}`;
}

const SEASON_MONTHS = {
  kharif: [6, 7, 8, 9, 10],
  rabi: [11, 12, 1, 2, 3],
  summer: [4, 5, 6],
};

const MONTH_TOKENS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
};

function inferPestSeasonFactor(pestSeason, seasonKey) {
  const txt = String(pestSeason || '').toLowerCase();
  if (!txt || txt.includes('round the year')) return 1.0;
  const months = [];
  const seen = new Set();
  for (const [token, month] of Object.entries(MONTH_TOKENS)) {
    if (txt.includes(token) && !seen.has(month)) {
      seen.add(month);
      months.push(month);
    }
  }
  if (months.length === 0) return 1.0;
  const seasonMonths = SEASON_MONTHS[seasonKey] || SEASON_MONTHS.kharif;
  const overlap = months.some(m => seasonMonths.includes(m));
  return overlap ? 1.08 : 0.88;
}

// ──────────────────────────────────────────────────────────────────────────
//  CORE ML ALGORITHM 5: PEST THREAT INDEX
// ──────────────────────────────────────────────────────────────────────────
/**
 * Scores pest threat probability per district using:
 *   - Zone classification (monoculture / diversity)
 *   - Climate suitability for specific pest types
 *   - Seasonal pest pressure calendar
 *
 * Returns ordered pest list by threat score.
 */
function scorePestThreats(district, districtKey, currentSeason) {
  const zone = PEST_ZONES[district.pestZone];
  if (!zone) return [];

  const h = district.humidity;
  const t = district.temp.avg;
  const r = district.rainfall;

  // Climate suitability index for fungal vs insect pests
  const fungalCI  = sigmoid((h - 70) / 10 + (r - 1000) / 500);  // humid → fungal
  const insectCI  = sigmoid((t - 28) / 5  + (h - 60) / 15);     // warm+moist → insect
  const droughtCI = sigmoid((30 - h) / 10 + (t - 32) / 5);      // hot+dry → thrips etc.

  const scoredPests = zone.pests.map(pest => {
    const name = pest.name.toLowerCase();
    let threatScore = 0.5; // baseline

    // Type-based climate scoring
    if (name.includes('bollworm') || name.includes('borer') || name.includes('beetle')) {
      threatScore = 0.5 + insectCI * 0.4;
    } else if (name.includes('thrips')) {
      threatScore = 0.5 + droughtCI * 0.4;
    } else if (name.includes('blotch') || name.includes('blight') || name.includes('mildew') ||
               name.includes('mosaic') || name.includes('rust') || name.includes('blast')) {
      threatScore = 0.5 + fungalCI * 0.4;
    } else if (name.includes('aphid') || name.includes('whitefly') || name.includes('mite')) {
      threatScore = 0.4 + insectCI * 0.3 + droughtCI * 0.2;
    } else {
      threatScore = 0.5 + insectCI * 0.25 + fungalCI * 0.15;
    }

    // Pest risk district factor
    const districtRisk = district.pestRisk === 'high' ? 1.15 :
                         district.pestRisk === 'medium' ? 1.0 : 0.85;
    const seasonFactor = inferPestSeasonFactor(pest.season, currentSeason);
    threatScore = Math.min(0.98, threatScore * districtRisk * seasonFactor);

    return { ...pest, threatScore: Math.round(threatScore * 100) };
  });

  // Sort by threat score descending
  scoredPests.sort((a, b) => b.threatScore - a.threatScore);
  return scoredPests;
}

// ──────────────────────────────────────────────────────────────────────────
//  MAIN API: getMLRecommendation
// ──────────────────────────────────────────────────────────────────────────
/**
 * Single entry point for the ML backend.
 * Called instead of direct district data lookup.
 *
 * @param {string} districtKey
 * @param {string} userSoil     - 'black' | 'red' | 'sandy' | 'alluvial' | 'laterite'
 * @param {string} userSeason   - 'kharif' | 'rabi' | 'summer'
 * @param {string} userIrr      - 'drip' | 'rainfed' | 'flood' | 'sprinkler'
 * @returns {object} { rankedCrops, topCrop, risks, pestThreats, mlMeta }
 */
function getMLRecommendation(districtKey, userSoil, userSeason, userIrr) {
  const district = DISTRICTS[districtKey];
  if (!district) return null;

  // Rank all crops via ML scoring
  const rankedCrops = rankCrops(district, userSoil, userSeason, userIrr);

  // Predict risks from climate features
  const risks = predictRisk(district, districtKey);

  // Score pest threats
  const pestThreats = scorePestThreats(district, districtKey, userSeason);

  // Top recommended crop (highest score)
  const topCrop = rankedCrops.length > 0 ? rankedCrops[0] : null;

  // Yield estimation for top crop
  let estimatedYield = topCrop ? estimateYield(topCrop, district, userSoil, userIrr) : '';

  // Build reasoning text for analysis
  const analysisReasons = topCrop ? buildMLAnalysis(topCrop, district, districtKey, userSoil, userSeason, userIrr) : '';

  return {
    rankedCrops,
    topCrop,
    estimatedYield,
    risks,
    pestThreats,
    analysisReasons,
    mlMeta: {
      totalCropsScored: rankedCrops.length,
      topScore: topCrop ? topCrop.mlScore.score : 0,
      algorithm: 'KrushiMitra Weighted Feature Scoring v3.0',
      features: topCrop ? topCrop.mlScore.features : {},
      configApplied: Boolean(MODEL_CONFIG && Object.keys(MODEL_CONFIG).length),
    }
  };
}

// ─── BUILD ML ANALYSIS TEXT ───────────────────────────────────────────────
function buildMLAnalysis(crop, district, distKey, soil, season, irr, lang) {
  lang = lang || 'en';
  const dname = getDistrictName(distKey, lang);
  const soilName = soil.charAt(0).toUpperCase() + soil.slice(1);
  const features = crop.mlScore.features;
  const f = crop.mlScore.features;

  const getRatingWord = (score, lang) => {
    if (lang === 'hi') return score >= 80 ? 'उत्कृष्ट' : score >= 60 ? 'अच्छा' : score >= 40 ? 'मध्यम' : 'कम';
    if (lang === 'mr') return score >= 80 ? 'उत्कृष्ट' : score >= 60 ? 'चांगला' : score >= 40 ? 'मध्यम' : 'कमी';
    return score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'moderate' : 'low';
  };

  if (lang === 'hi') {
    return `${dname} जिले में ${crop.name} की सिफारिश कृषि AI द्वारा ${crop.mlScore.score}/100 सुयोग्यता स्कोर के साथ की गई है। ` +
      `वर्षा उपयुक्तता: ${getRatingWord(f.rainfall, 'hi')} (${f.rainfall}/100), तापमान: ${getRatingWord(f.temperature, 'hi')} (${f.temperature}/100), ` +
      `मिट्टी: ${getRatingWord(f.soil, 'hi')} (${f.soil}/100), सिंचाई: ${getRatingWord(f.irrigation, 'hi')} (${f.irrigation}/100)। ` +
      `बुवाई: ${crop.sow}। उपज: ${crop.yield} प्रति एकड़। MSP: ₹${crop.msp}/क्विंटल। ${crop.notes}`;
  }
  if (lang === 'mr') {
    return `${dname} जिल्ह्यात ${crop.name} साठी कृषी AI ने ${crop.mlScore.score}/100 उपयुक्तता गुण दिले आहेत। ` +
      `पाऊस उपयुक्तता: ${getRatingWord(f.rainfall, 'mr')} (${f.rainfall}/100), तापमान: ${getRatingWord(f.temperature, 'mr')} (${f.temperature}/100), ` +
      `माती: ${getRatingWord(f.soil, 'mr')} (${f.soil}/100), सिंचन: ${getRatingWord(f.irrigation, 'mr')} (${f.irrigation}/100)। ` +
      `पेरणी: ${crop.sow}। उत्पन्न: ${crop.yield} प्रति एकर। MSP: ₹${crop.msp}/क्विंटल. ${crop.notes}`;
  }
  return `${crop.name} is recommended for ${dname} with an AI suitability score of ${crop.mlScore.score}/100. ` +
    `Rainfall fit: ${getRatingWord(f.rainfall, 'en')} (${f.rainfall}/100), Temperature: ${getRatingWord(f.temperature, 'en')} (${f.temperature}/100), ` +
    `Soil match: ${getRatingWord(f.soil, 'en')} (${f.soil}/100), Irrigation: ${getRatingWord(f.irrigation, 'en')} (${f.irrigation}/100). ` +
    `Sow: ${crop.sow}. Yield: ${crop.yield}/acre. MSP: ₹${crop.msp}/quintal. ${crop.notes}`;
}

// Export for use in app.js
// (browser-compatible: these functions are globally accessible)
