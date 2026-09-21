// ============================================================
// KrushiMitra – data.js
// Real Maharashtra district data (IMD / MRSAC / ICAR / GoMH)
// All 36 districts
// ============================================================

const DISTRICTS = {
  pune: {
    name:"Pune", region:"Western Maharashtra", division:"Pune",
    temp:30, rainfall:650, humidity:72, soilTypes:["Black Soil","Red Soil","Sandy Loam"],
    dominantSoil:"black",
    monthlyRain:[5,3,8,12,35,135,195,145,85,40,10,4],
    kharif:["Soybean","Bajra","Maize","Tur (Pigeon Pea)"],
    rabi:["Wheat","Gram (Chickpea)","Rabi Jowar","Sunflower"],
    summer:["Onion","Vegetables","Watermelon"],
    bestCrop:{kharif:{name:"Soybean",yield:"14–16 Q/acre",sow:"June 10–20",days:90,water:"450–600mm",temp:"25–30°C",msp:4892},
              rabi:{name:"Gram (Chickpea)",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"300–400mm",temp:"15–25°C",msp:5440},
              summer:{name:"Onion",yield:"60–80 Q/acre",sow:"Nov–Dec",days:110,water:"350–450mm",temp:"20–28°C",msp:800}},
    droughtRisk:"low", floodRisk:"low", pestRisk:"medium",
    notes:"Plateau region, medium rainfall, major soybean & onion belt.",
    specialPests:["Aphids","Soybean Pod Borer","Whitefly"],
    mspCrops:{soybean:4892, chickpea:5440, wheat:2275, bajra:2500}
  },
  nashik: {
    name:"Nashik", region:"North Maharashtra", division:"Nashik",
    temp:28, rainfall:700, humidity:68, soilTypes:["Black Soil","Sandy Loam","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[6,4,9,14,38,145,210,155,90,42,12,5],
    kharif:["Soybean","Bajra","Maize","Cotton","Onion"],
    rabi:["Wheat","Gram","Onion","Garlic"],
    summer:["Grapes","Onion","Tomato"],
    bestCrop:{kharif:{name:"Onion (Kharif)",yield:"80–100 Q/acre",sow:"June 15–30",days:95,water:"400–500mm",temp:"25–30°C",msp:800},
              rabi:{name:"Wheat",yield:"18–22 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"15–22°C",msp:2275},
              summer:{name:"Grapes",yield:"100–120 Q/acre",sow:"Jul (pruning)",days:120,water:"600–700mm",temp:"20–35°C",msp:2500}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"medium",
    notes:"Famous for grapes, onion & garlic. Godavari basin district.",
    specialPests:["Thrips","Downy Mildew","Onion Purple Blotch"],
    mspCrops:{soybean:4892, wheat:2275, onion:800, bajra:2500}
  },
  nagpur: {
    name:"Nagpur", region:"Vidarbha", division:"Nagpur",
    temp:33, rainfall:1050, humidity:65, soilTypes:["Black Soil","Red Laterite","Sandy Loam"],
    dominantSoil:"black",
    monthlyRain:[8,5,10,15,45,185,280,250,135,60,12,6],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Wheat","Gram","Rabi Jowar"],
    summer:["Orange (Nagpur Santra)","Vegetables"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"8–12 Q/acre",sow:"June 1–15",days:180,water:"700–900mm",temp:"28–35°C",msp:6620},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"300–400mm",temp:"15–22°C",msp:5440},
              summer:{name:"Nagpur Orange",yield:"200–250 Q/acre",sow:"perennial",days:365,water:"700–900mm",temp:"25–33°C",msp:3500}},
    droughtRisk:"medium", floodRisk:"medium", pestRisk:"high",
    notes:"Vidarbha cotton belt. Famous for Nagpur Orange (Santra). High pink bollworm risk.",
    specialPests:["Pink Bollworm","American Bollworm","Whitefly","Mealy Bug"],
    mspCrops:{cotton:6620, soybean:4892, wheat:2275, gram:5440}
  },
  aurangabad: {
    name:"Aurangabad (CSNM)", region:"Marathwada", division:"Aurangabad",
    temp:32, rainfall:665, humidity:60, soilTypes:["Black Soil","Medium Black","Shallow Black"],
    dominantSoil:"black",
    monthlyRain:[4,3,7,11,32,120,175,145,75,35,8,3],
    kharif:["Cotton","Soybean","Bajra","Tur"],
    rabi:["Rabi Jowar","Wheat","Gram","Sunflower"],
    summer:["Vegetables","Mung"],
    bestCrop:{kharif:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 15–25",days:90,water:"400–550mm",temp:"25–32°C",msp:4892},
              rabi:{name:"Rabi Jowar",yield:"20–25 Q/acre",sow:"Oct 20–Nov 5",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Green Gram (Mung)",yield:"4–5 Q/acre",sow:"Mar–Apr",days:65,water:"200–250mm",temp:"28–35°C",msp:8558}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"high",
    notes:"Marathwada drought-prone. Soybean & cotton dominant. Water scarcity common.",
    specialPests:["Soybean Girdle Beetle","Cotton Bollworm","Aphids"],
    mspCrops:{soybean:4892, cotton:6620, jowar:3180, mung:8558}
  },
  latur: {
    name:"Latur", region:"Marathwada", division:"Aurangabad",
    temp:33, rainfall:620, humidity:58, soilTypes:["Deep Black","Medium Black"],
    dominantSoil:"black",
    monthlyRain:[4,2,6,10,28,115,165,140,70,32,7,3],
    kharif:["Soybean","Tur","Cotton","Bajra"],
    rabi:["Rabi Jowar","Gram","Wheat","Sunflower"],
    summer:["Mung","Vegetables"],
    bestCrop:{kharif:{name:"Soybean",yield:"11–14 Q/acre",sow:"June 20–30",days:92,water:"380–500mm",temp:"26–33°C",msp:4892},
              rabi:{name:"Rabi Jowar",yield:"18–22 Q/acre",sow:"Oct 25–Nov 10",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Tur (Pigeon Pea)",yield:"6–8 Q/acre",sow:"June (long dur.)",days:200,water:"400–600mm",temp:"26–33°C",msp:7000}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"medium",
    notes:"High drought risk zone. Famous for Tur (red gram). Deep black cotton soil.",
    specialPests:["Tur Pod Fly","Soybean Stem Fly","Aphids"],
    mspCrops:{soybean:4892, tur:7000, jowar:3180, gram:5440}
  },
  solapur: {
    name:"Solapur", region:"Southern Maharashtra", division:"Pune",
    temp:34, rainfall:510, humidity:55, soilTypes:["Black Soil","Sandy Loam","Shallow Black"],
    dominantSoil:"black",
    monthlyRain:[3,2,5,8,22,100,150,130,65,28,6,2],
    kharif:["Bajra","Cotton","Tur","Soybean"],
    rabi:["Kharif Jowar","Gram","Sunflower","Rabi Jowar"],
    summer:["Pomegranate","Vegetables"],
    bestCrop:{kharif:{name:"Cotton",yield:"7–10 Q/acre",sow:"June 1–15",days:175,water:"500–700mm",temp:"28–35°C",msp:6620},
              rabi:{name:"Gram",yield:"7–9 Q/acre",sow:"Oct 20–Nov 5",days:110,water:"250–350mm",temp:"15–22°C",msp:5440},
              summer:{name:"Pomegranate",yield:"80–100 Q/acre",sow:"perennial",days:365,water:"500–700mm",temp:"25–35°C",msp:3500}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"medium",
    notes:"Lowest rainfall district. Pomegranate & jowar speciality. Frequent drought years.",
    specialPests:["Cotton Bollworm","Pomegranate Butterfly","Thrips"],
    mspCrops:{cotton:6620, gram:5440, jowar:3180, bajra:2500}
  },
  kolhapur: {
    name:"Kolhapur", region:"Southern Maharashtra", division:"Kolhapur",
    temp:27, rainfall:1100, humidity:80, soilTypes:["Laterite","Red Laterite","Alluvial"],
    dominantSoil:"laterite",
    monthlyRain:[12,8,15,22,65,240,330,290,155,70,20,10],
    kharif:["Paddy","Sugarcane","Soybean","Groundnut"],
    rabi:["Wheat","Gram","Vegetables"],
    summer:["Sugarcane","Banana","Vegetables"],
    bestCrop:{kharif:{name:"Sugarcane",yield:"350–450 Q/acre",sow:"Feb–Mar ratoon",days:365,water:"1500–1800mm",temp:"25–30°C",msp:3150},
              rabi:{name:"Wheat",yield:"16–20 Q/acre",sow:"Nov 5–20",days:110,water:"400–500mm",temp:"15–22°C",msp:2275},
              summer:{name:"Paddy",yield:"20–25 Q/acre",sow:"June 15–30",days:130,water:"1000–1400mm",temp:"25–32°C",msp:2183}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"High rainfall zone. Sugarcane dominant. Panchaganga river flood risk.",
    specialPests:["Stem Borer (Sugarcane)","Brown Plant Hopper","Leaf Roller"],
    mspCrops:{sugarcane:3150, wheat:2275, soybean:4892, paddy:2183}
  },
  satara: {
    name:"Satara", region:"Southern Maharashtra", division:"Pune",
    temp:28, rainfall:800, humidity:73, soilTypes:["Black Soil","Laterite","Red Soil"],
    dominantSoil:"black",
    monthlyRain:[8,5,10,16,45,165,240,200,105,48,14,6],
    kharif:["Soybean","Bajra","Paddy","Cotton"],
    rabi:["Wheat","Gram","Jowar","Sunflower"],
    summer:["Strawberry","Vegetables","Tomato"],
    bestCrop:{kharif:{name:"Soybean",yield:"13–16 Q/acre",sow:"June 10–20",days:90,water:"450–600mm",temp:"25–30°C",msp:4892},
              rabi:{name:"Wheat",yield:"18–22 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Strawberry",yield:"40–60 Q/acre",sow:"Sept–Oct",days:120,water:"500–600mm",temp:"15–22°C",msp:3000}},
    droughtRisk:"low", floodRisk:"low", pestRisk:"medium",
    notes:"Famous for Mahabaleshwar strawberries. Diverse agro climate.",
    specialPests:["Pod Borer","Whitefly","Stem Fly"],
    mspCrops:{soybean:4892, wheat:2275, gram:5440, bajra:2500}
  },
  sangli: {
    name:"Sangli", region:"Southern Maharashtra", division:"Kolhapur",
    temp:29, rainfall:570, humidity:68, soilTypes:["Black Soil","Sandy Loam","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[5,3,7,12,30,120,165,145,70,32,10,4],
    kharif:["Sugarcane","Soybean","Cotton","Groundnut"],
    rabi:["Grapes","Turmeric","Wheat","Gram"],
    summer:["Turmeric","Banana","Grapes"],
    bestCrop:{kharif:{name:"Turmeric",yield:"80–100 Q/acre",sow:"May–June",days:210,water:"800–1000mm",temp:"25–32°C",msp:7000},
              rabi:{name:"Grapes",yield:"100–150 Q/acre",sow:"perennial",days:365,water:"600–800mm",temp:"20–35°C",msp:3000},
              summer:{name:"Sugarcane",yield:"350–420 Q/acre",sow:"Feb–Mar",days:365,water:"1500mm",temp:"25–30°C",msp:3150}},
    droughtRisk:"medium", floodRisk:"medium", pestRisk:"medium",
    notes:"Turmeric capital of India. Major grapes belt. Krishna-Warna flood risk.",
    specialPests:["Turmeric Rhizome Fly","Grape Downy Mildew","Thrips"],
    mspCrops:{turmeric:7000, sugarcane:3150, soybean:4892, gram:5440}
  },
  ahmednagar: {
    name:"Ahmednagar", region:"Western Maharashtra", division:"Nashik",
    temp:31, rainfall:600, humidity:64, soilTypes:["Black Soil","Sandy Loam","Shallow Black"],
    dominantSoil:"black",
    monthlyRain:[4,3,7,12,30,125,175,150,75,35,9,4],
    kharif:["Soybean","Bajra","Cotton","Onion"],
    rabi:["Wheat","Gram","Onion","Sunflower"],
    summer:["Onion","Vegetables","Pomegranate"],
    bestCrop:{kharif:{name:"Onion",yield:"70–90 Q/acre",sow:"June 15–30",days:95,water:"350–450mm",temp:"25–32°C",msp:800},
              rabi:{name:"Onion (Rabi)",yield:"80–100 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"350–450mm",temp:"15–25°C",msp:800},
              summer:{name:"Soybean",yield:"13–15 Q/acre",sow:"June 10–20",days:90,water:"420–560mm",temp:"25–31°C",msp:4892}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"medium",
    notes:"Largest onion producing district. Major soybean zone.",
    specialPests:["Onion Thrips","Purple Blotch","Pod Borer"],
    mspCrops:{soybean:4892, onion:800, wheat:2275, gram:5440}
  },
  amravati: {
    name:"Amravati", region:"Vidarbha", division:"Amravati",
    temp:33, rainfall:890, humidity:65, soilTypes:["Black Soil","Deep Black","Sandy Loam"],
    dominantSoil:"black",
    monthlyRain:[6,4,9,14,40,165,245,220,115,52,10,5],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Orange","Vegetables"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"8–12 Q/acre",sow:"June 1–15",days:175,water:"650–850mm",temp:"28–35°C",msp:6620},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"300–400mm",temp:"15–22°C",msp:5440},
              summer:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 10–20",days:90,water:"430–560mm",temp:"27–33°C",msp:4892}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Cotton dominant Vidarbha district. High pest pressure on cotton.",
    specialPests:["Pink Bollworm","Whitefly","Helicoverpa"],
    mspCrops:{cotton:6620, soybean:4892, gram:5440, tur:7000}
  },
  yavatmal: {
    name:"Yavatmal", region:"Vidarbha", division:"Amravati",
    temp:34, rainfall:950, humidity:64, soilTypes:["Black Soil","Deep Black"],
    dominantSoil:"black",
    monthlyRain:[7,4,9,14,42,175,265,235,120,55,11,5],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Gram","Wheat","Jowar"],
    summer:["Vegetables","Mung"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"9–13 Q/acre",sow:"June 1–15",days:180,water:"700–900mm",temp:"28–35°C",msp:6620},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 20–Nov 5",days:110,water:"300–400mm",temp:"15–22°C",msp:5440},
              summer:{name:"Tur",yield:"6–8 Q/acre",sow:"June",days:200,water:"400–600mm",temp:"27–34°C",msp:7000}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Cotton suicide district – high input costs. Known for pink bollworm crisis.",
    specialPests:["Pink Bollworm","American Bollworm","Thrips","Whitefly"],
    mspCrops:{cotton:6620, soybean:4892, tur:7000, gram:5440}
  },
  wardha: {
    name:"Wardha", region:"Vidarbha", division:"Nagpur",
    temp:33, rainfall:1000, humidity:65, soilTypes:["Black Soil","Deep Black","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[7,4,9,15,42,175,270,245,125,56,11,5],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Gram","Wheat","Jowar"],
    summer:["Orange","Vegetables"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"9–12 Q/acre",sow:"June 1–15",days:180,water:"700–850mm",temp:"28–34°C",msp:6620},
              rabi:{name:"Wheat",yield:"17–21 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"15–22°C",msp:2275},
              summer:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 10–20",days:90,water:"430–560mm",temp:"27–33°C",msp:4892}},
    droughtRisk:"low", floodRisk:"medium", pestRisk:"high",
    notes:"Wardha river basin. Mahatma Gandhi's Sevagram ashram. Cotton dominant.",
    specialPests:["Pink Bollworm","Pod Borer","Stem Fly"],
    mspCrops:{cotton:6620, soybean:4892, wheat:2275, gram:5440}
  },
  jalgaon: {
    name:"Jalgaon", region:"North Maharashtra", division:"Nashik",
    temp:35, rainfall:630, humidity:61, soilTypes:["Black Soil","Alluvial","Sandy Loam"],
    dominantSoil:"black",
    monthlyRain:[4,3,6,12,28,125,175,155,72,32,8,3],
    kharif:["Cotton","Banana","Soybean","Bajra"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Banana","Vegetables"],
    bestCrop:{kharif:{name:"Banana",yield:"250–350 Q/acre",sow:"Feb–Mar",days:365,water:"1200–1500mm",temp:"25–35°C",msp:3000},
              rabi:{name:"Wheat",yield:"18–22 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Cotton",yield:"8–11 Q/acre",sow:"June 1–15",days:175,water:"600–800mm",temp:"28–35°C",msp:6620}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"medium",
    notes:"Banana capital of India. Tapti river alluvial deposits. Hot summer region.",
    specialPests:["Banana Stem Weevil","Cotton Bollworm","Thrips"],
    mspCrops:{cotton:6620, wheat:2275, banana:3000, soybean:4892}
  },
  nanded: {
    name:"Nanded", region:"Marathwada", division:"Aurangabad",
    temp:32, rainfall:870, humidity:64, soilTypes:["Deep Black","Medium Black","Red Laterite"],
    dominantSoil:"black",
    monthlyRain:[6,4,8,13,38,160,235,205,110,50,10,5],
    kharif:["Soybean","Cotton","Tur","Paddy"],
    rabi:["Rabi Jowar","Gram","Wheat"],
    summer:["Mung","Vegetables"],
    bestCrop:{kharif:{name:"Soybean",yield:"13–16 Q/acre",sow:"June 15–25",days:90,water:"420–560mm",temp:"26–32°C",msp:4892},
              rabi:{name:"Rabi Jowar",yield:"20–25 Q/acre",sow:"Oct 20–Nov 5",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Cotton",yield:"8–11 Q/acre",sow:"June 1–15",days:175,water:"650–850mm",temp:"27–34°C",msp:6620}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Godavari basin. Sikh holy city. Soybean and cotton major crops.",
    specialPests:["Soybean Girdle Beetle","Pod Borer","Bollworm"],
    mspCrops:{soybean:4892, cotton:6620, jowar:3180, tur:7000}
  },
  chandrapur: {
    name:"Chandrapur", region:"Vidarbha", division:"Nagpur",
    temp:34, rainfall:1280, humidity:70, soilTypes:["Black Soil","Red Laterite","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[9,6,11,17,48,200,305,270,145,65,13,6],
    kharif:["Paddy","Cotton","Soybean","Tur"],
    rabi:["Gram","Wheat","Jowar"],
    summer:["Paddy","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"20–28 Q/acre",sow:"June 15–30",days:130,water:"1000–1400mm",temp:"25–32°C",msp:2183},
              rabi:{name:"Wheat",yield:"16–20 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Cotton",yield:"9–12 Q/acre",sow:"June 1–15",days:180,water:"700–900mm",temp:"28–35°C",msp:6620}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"high",
    notes:"High rainfall tribal district. Tadoba Tiger Reserve area. Paddy dominant.",
    specialPests:["Stem Borer (Paddy)","Brown Plant Hopper","Pink Bollworm"],
    mspCrops:{paddy:2183, cotton:6620, soybean:4892, wheat:2275}
  },
  ratnagiri: {
    name:"Ratnagiri", region:"Konkan", division:"Konkan",
    temp:28, rainfall:3100, humidity:85, soilTypes:["Laterite","Red Laterite","Coastal Sandy"],
    dominantSoil:"laterite",
    monthlyRain:[20,12,18,25,90,600,820,720,380,150,35,15],
    kharif:["Paddy","Nachni (Ragi)","Kaju (Cashew)"],
    rabi:["Vegetables","Beans"],
    summer:["Alphonso Mango","Kokum","Cashew"],
    bestCrop:{kharif:{name:"Paddy (Kari Joha)",yield:"18–22 Q/acre",sow:"June 10–20",days:130,water:"1200–1600mm",temp:"26–30°C",msp:2183},
              rabi:{name:"Nachni (Ragi)",yield:"8–12 Q/acre",sow:"June–July",days:120,water:"800–1000mm",temp:"20–28°C",msp:3846},
              summer:{name:"Alphonso Mango",yield:"80–120 Q/acre",sow:"perennial",days:365,water:"1000–1500mm",temp:"24–33°C",msp:8000}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"Highest rainfall in MH. Alphonso mango (GI tag). Konkan coastal zone.",
    specialPests:["Mango Hoppers","Paddy Stem Borer","Cashew Stem Borer"],
    mspCrops:{paddy:2183, ragi:3846, mango:8000, cashew:5000}
  },
  parbhani: {
    name:"Parbhani", region:"Marathwada", division:"Aurangabad",
    temp:32, rainfall:830, humidity:62, soilTypes:["Deep Black","Medium Black"],
    dominantSoil:"black",
    monthlyRain:[5,3,8,12,35,155,220,190,100,45,9,4],
    kharif:["Cotton","Soybean","Tur","Bajra"],
    rabi:["Rabi Jowar","Gram","Wheat"],
    summer:["Mung","Vegetables"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"8–11 Q/acre",sow:"June 5–20",days:175,water:"650–850mm",temp:"27–33°C",msp:6620},
              rabi:{name:"Rabi Jowar",yield:"20–24 Q/acre",sow:"Oct 20–Nov 5",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Soybean",yield:"12–14 Q/acre",sow:"June 15–25",days:90,water:"400–530mm",temp:"26–32°C",msp:4892}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"high",
    notes:"VNMKV agricultural university. Cotton-soybean belt. Drought-prone Marathwada.",
    specialPests:["Bollworm","Girdle Beetle","Thrips"],
    mspCrops:{cotton:6620, soybean:4892, jowar:3180, gram:5440}
  },
  beed: {
    name:"Beed", region:"Marathwada", division:"Aurangabad",
    temp:33, rainfall:600, humidity:59, soilTypes:["Black Soil","Medium Black","Red Soil"],
    dominantSoil:"black",
    monthlyRain:[4,2,6,10,26,115,160,135,68,30,7,3],
    kharif:["Cotton","Soybean","Bajra","Tur"],
    rabi:["Rabi Jowar","Gram","Sunflower"],
    summer:["Pomegranate","Vegetables"],
    bestCrop:{kharif:{name:"Soybean",yield:"11–14 Q/acre",sow:"June 20–30",days:90,water:"380–500mm",temp:"26–33°C",msp:4892},
              rabi:{name:"Rabi Jowar",yield:"18–22 Q/acre",sow:"Oct 25–Nov 10",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Cotton",yield:"7–10 Q/acre",sow:"June 1–15",days:175,water:"550–750mm",temp:"27–34°C",msp:6620}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"medium",
    notes:"Drought prone. Known for sugarcane worker migration. Semi-arid.",
    specialPests:["Pod Borer","Whitefly","Stem Fly"],
    mspCrops:{soybean:4892, cotton:6620, jowar:3180, gram:5440}
  },
  osmanabad: {
    name:"Osmanabad (Dharashiv)", region:"Marathwada", division:"Aurangabad",
    temp:32, rainfall:730, humidity:62, soilTypes:["Black Soil","Deep Black","Medium Black"],
    dominantSoil:"black",
    monthlyRain:[5,3,7,12,32,140,200,170,85,40,9,4],
    kharif:["Soybean","Tur","Cotton","Bajra"],
    rabi:["Rabi Jowar","Gram","Wheat"],
    summer:["Mung","Vegetables"],
    bestCrop:{kharif:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 15–25",days:90,water:"400–550mm",temp:"26–32°C",msp:4892},
              rabi:{name:"Tur (Pigeon Pea)",yield:"6–8 Q/acre",sow:"June",days:200,water:"400–600mm",temp:"25–32°C",msp:7000},
              summer:{name:"Rabi Jowar",yield:"20–24 Q/acre",sow:"Oct 20–Nov 5",days:115,water:"250–350mm",temp:"15–25°C",msp:3180}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"medium",
    notes:"Marathwada drought zone. Known for Tur production.",
    specialPests:["Tur Pod Fly","Girdle Beetle","Aphids"],
    mspCrops:{soybean:4892, tur:7000, jowar:3180, gram:5440}
  },
  jalna: {
    name:"Jalna", region:"Marathwada", division:"Aurangabad",
    temp:33, rainfall:740, humidity:61, soilTypes:["Black Soil","Medium Black","Sandy Black"],
    dominantSoil:"black",
    monthlyRain:[5,3,7,11,32,140,205,175,88,40,9,4],
    kharif:["Soybean","Cotton","Bajra","Tur"],
    rabi:["Rabi Jowar","Gram","Wheat","Mosambi"],
    summer:["Mosambi (Sweet Lime)","Vegetables"],
    bestCrop:{kharif:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 15–25",days:90,water:"400–550mm",temp:"26–33°C",msp:4892},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"280–380mm",temp:"15–22°C",msp:5440},
              summer:{name:"Sweet Lime (Mosambi)",yield:"200–280 Q/acre",sow:"perennial",days:365,water:"700–900mm",temp:"25–32°C",msp:4000}},
    droughtRisk:"high", floodRisk:"low", pestRisk:"medium",
    notes:"Seed capital of Maharashtra. Mosambi & soybean belt.",
    specialPests:["Aphids","Citrus Psylla","Pod Borer"],
    mspCrops:{soybean:4892, gram:5440, jowar:3180, mosambi:4000}
  },
  hingoli: {
    name:"Hingoli", region:"Marathwada", division:"Aurangabad",
    temp:32, rainfall:920, humidity:65, soilTypes:["Black Soil","Deep Black"],
    dominantSoil:"black",
    monthlyRain:[6,4,8,13,38,170,245,210,110,50,10,5],
    kharif:["Soybean","Cotton","Tur","Paddy"],
    rabi:["Rabi Jowar","Gram","Wheat"],
    summer:["Turmeric","Mung"],
    bestCrop:{kharif:{name:"Soybean",yield:"13–16 Q/acre",sow:"June 15–25",days:90,water:"430–570mm",temp:"26–32°C",msp:4892},
              rabi:{name:"Rabi Jowar",yield:"20–25 Q/acre",sow:"Oct 20–Nov 5",days:115,water:"250–350mm",temp:"15–25°C",msp:3180},
              summer:{name:"Turmeric",yield:"80–100 Q/acre",sow:"May–June",days:210,water:"800–1000mm",temp:"25–32°C",msp:7000}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Smallest Marathwada district. Soybean and turmeric growing area.",
    specialPests:["Girdle Beetle","Thrips","Pod Borer"],
    mspCrops:{soybean:4892, jowar:3180, tur:7000, turmeric:7000}
  },
  nandurbar: {
    name:"Nandurbar", region:"North Maharashtra", division:"Nashik",
    temp:34, rainfall:900, humidity:67, soilTypes:["Sandy Loam","Black Soil","Alluvial"],
    dominantSoil:"sandy",
    monthlyRain:[6,4,8,14,40,175,260,230,115,52,11,5],
    kharif:["Paddy","Maize","Soybean","Tur"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Maize","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"18–24 Q/acre",sow:"June 15–30",days:130,water:"1000–1300mm",temp:"26–33°C",msp:2183},
              rabi:{name:"Wheat",yield:"16–20 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Maize",yield:"20–25 Q/acre",sow:"June 15–25",days:85,water:"500–700mm",temp:"26–33°C",msp:2090}},
    droughtRisk:"low", floodRisk:"medium", pestRisk:"medium",
    notes:"Tribal district. Tapi valley alluvial. Paddy & maize cultivation.",
    specialPests:["Stem Borer","Fall Armyworm (Maize)","BPH"],
    mspCrops:{paddy:2183, wheat:2275, maize:2090, soybean:4892}
  },
  dhule: {
    name:"Dhule", region:"North Maharashtra", division:"Nashik",
    temp:33, rainfall:650, humidity:62, soilTypes:["Black Soil","Sandy Loam","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[4,3,7,13,30,130,185,160,78,36,9,4],
    kharif:["Cotton","Soybean","Bajra","Maize"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Vegetables","Maize"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"8–11 Q/acre",sow:"June 5–20",days:175,water:"600–800mm",temp:"28–34°C",msp:6620},
              rabi:{name:"Wheat",yield:"18–22 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 10–20",days:90,water:"420–560mm",temp:"26–33°C",msp:4892}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"medium",
    notes:"Tapi valley. Cotton and soybean growing district.",
    specialPests:["Bollworm","Aphids","Pod Borer"],
    mspCrops:{cotton:6620, soybean:4892, wheat:2275, gram:5440}
  },
  akola: {
    name:"Akola", region:"Vidarbha", division:"Amravati",
    temp:34, rainfall:780, humidity:62, soilTypes:["Black Soil","Deep Black","Sandy Loam"],
    dominantSoil:"black",
    monthlyRain:[5,3,8,13,35,155,225,195,100,45,9,4],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Vegetables","Orange"],
    bestCrop:{kharif:{name:"Cotton (BT)",yield:"8–12 Q/acre",sow:"June 1–15",days:175,water:"650–850mm",temp:"28–35°C",msp:6620},
              rabi:{name:"Wheat",yield:"17–21 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Tur",yield:"6–8 Q/acre",sow:"June",days:200,water:"400–600mm",temp:"27–34°C",msp:7000}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"PKGV agricultural university. Cotton dominant Vidarbha district.",
    specialPests:["Pink Bollworm","Helicoverpa","Whitefly"],
    mspCrops:{cotton:6620, soybean:4892, tur:7000, wheat:2275}
  },
  buldhana: {
    name:"Buldhana", region:"Vidarbha", division:"Amravati",
    temp:33, rainfall:760, humidity:63, soilTypes:["Black Soil","Sandy Black","Alluvial"],
    dominantSoil:"black",
    monthlyRain:[5,3,8,13,34,148,215,188,98,44,9,4],
    kharif:["Cotton","Soybean","Tur","Orange"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Orange","Vegetables"],
    bestCrop:{kharif:{name:"Cotton",yield:"8–11 Q/acre",sow:"June 5–20",days:175,water:"650–850mm",temp:"28–34°C",msp:6620},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"300–400mm",temp:"15–22°C",msp:5440},
              summer:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 10–20",days:90,water:"420–560mm",temp:"27–33°C",msp:4892}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Lonar crater lake district. Cotton and orange growing area.",
    specialPests:["Pink Bollworm","Aphids","Girdle Beetle"],
    mspCrops:{cotton:6620, soybean:4892, gram:5440, tur:7000}
  },
  washim: {
    name:"Washim", region:"Vidarbha", division:"Amravati",
    temp:33, rainfall:820, humidity:64, soilTypes:["Black Soil","Deep Black"],
    dominantSoil:"black",
    monthlyRain:[5,3,8,13,36,158,228,198,102,46,9,4],
    kharif:["Cotton","Soybean","Tur","Paddy"],
    rabi:["Wheat","Gram","Jowar"],
    summer:["Vegetables","Mung"],
    bestCrop:{kharif:{name:"Soybean",yield:"12–15 Q/acre",sow:"June 10–20",days:90,water:"420–560mm",temp:"27–33°C",msp:4892},
              rabi:{name:"Gram",yield:"8–10 Q/acre",sow:"Oct 25–Nov 10",days:110,water:"300–400mm",temp:"15–22°C",msp:5440},
              summer:{name:"Cotton",yield:"8–11 Q/acre",sow:"June 1–15",days:175,water:"650–850mm",temp:"28–35°C",msp:6620}},
    droughtRisk:"medium", floodRisk:"low", pestRisk:"high",
    notes:"Vidarbha cotton-soybean dual zone.",
    specialPests:["Pink Bollworm","Pod Borer","Whitefly"],
    mspCrops:{soybean:4892, cotton:6620, gram:5440, wheat:2275}
  },
  gondia: {
    name:"Gondia", region:"Vidarbha", division:"Nagpur",
    temp:32, rainfall:1380, humidity:72, soilTypes:["Sandy Loam","Red Laterite","Alluvial"],
    dominantSoil:"sandy",
    monthlyRain:[9,6,11,16,46,210,345,305,160,72,14,6],
    kharif:["Paddy","Soybean","Kodu Kutki"],
    rabi:["Wheat","Gram","Vegetables"],
    summer:["Paddy (summer)","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"22–28 Q/acre",sow:"June 15–30",days:130,water:"1100–1500mm",temp:"26–32°C",msp:2183},
              rabi:{name:"Wheat",yield:"16–20 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Kodu Kutki (Millets)",yield:"6–8 Q/acre",sow:"June–July",days:90,water:"500–700mm",temp:"24–32°C",msp:3000}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"Rice bowl of Vidarbha. High rainfall tribal district.",
    specialPests:["Stem Borer","BPH","Gall Midge"],
    mspCrops:{paddy:2183, wheat:2275, soybean:4892, gram:5440}
  },
  bhandara: {
    name:"Bhandara", region:"Vidarbha", division:"Nagpur",
    temp:32, rainfall:1250, humidity:72, soilTypes:["Sandy Loam","Alluvial","Red Laterite"],
    dominantSoil:"alluvial",
    monthlyRain:[8,5,10,16,44,195,320,285,148,66,13,6],
    kharif:["Paddy","Soybean","Tur"],
    rabi:["Wheat","Gram","Vegetables"],
    summer:["Paddy","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"22–28 Q/acre",sow:"June 15–30",days:130,water:"1100–1400mm",temp:"26–32°C",msp:2183},
              rabi:{name:"Wheat",yield:"16–20 Q/acre",sow:"Nov 5–20",days:115,water:"400–500mm",temp:"14–22°C",msp:2275},
              summer:{name:"Tur",yield:"6–8 Q/acre",sow:"June",days:200,water:"400–600mm",temp:"26–33°C",msp:7000}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"Wainganga river area. Major rice producing district.",
    specialPests:["Stem Borer","BPH","Leaf Folder"],
    mspCrops:{paddy:2183, wheat:2275, tur:7000, soybean:4892}
  },
  gadchiroli: {
    name:"Gadchiroli", region:"Vidarbha", division:"Nagpur",
    temp:33, rainfall:1600, humidity:74, soilTypes:["Red Laterite","Alluvial","Sandy Loam"],
    dominantSoil:"laterite",
    monthlyRain:[10,7,12,17,50,260,400,355,185,82,16,7],
    kharif:["Paddy","Nachni","Kodu"],
    rabi:["Wheat","Gram","Vegetables"],
    summer:["Maize","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"20–26 Q/acre",sow:"June 15–30",days:130,water:"1100–1500mm",temp:"26–33°C",msp:2183},
              rabi:{name:"Nachni (Ragi)",yield:"8–12 Q/acre",sow:"June–July",days:120,water:"800–1000mm",temp:"20–28°C",msp:3846},
              summer:{name:"Maize",yield:"18–22 Q/acre",sow:"June 15–25",days:85,water:"500–700mm",temp:"26–33°C",msp:2090}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"low",
    notes:"Dense forest tribal district. Naxal-affected. Paddy and millets dominant.",
    specialPests:["Stem Borer","Blast (Paddy)","BPH"],
    mspCrops:{paddy:2183, ragi:3846, maize:2090, gram:5440}
  },
  raigad: {
    name:"Raigad", region:"Konkan", division:"Konkan",
    temp:29, rainfall:2800, humidity:83, soilTypes:["Laterite","Coastal Sandy","Alluvial"],
    dominantSoil:"laterite",
    monthlyRain:[18,10,16,22,80,550,730,650,340,130,30,12],
    kharif:["Paddy","Nachni","Kaju"],
    rabi:["Vegetables","Beans"],
    summer:["Mango","Cashew","Vegetables"],
    bestCrop:{kharif:{name:"Paddy",yield:"18–24 Q/acre",sow:"June 10–20",days:130,water:"1200–1600mm",temp:"26–30°C",msp:2183},
              rabi:{name:"Nachni (Ragi)",yield:"8–12 Q/acre",sow:"June–July",days:120,water:"800–1000mm",temp:"20–28°C",msp:3846},
              summer:{name:"Mango",yield:"80–120 Q/acre",sow:"perennial",days:365,water:"1000–1400mm",temp:"24–33°C",msp:6000}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"Near Mumbai. Konkan coastal zone. Rice and mango dominant.",
    specialPests:["Mango Hopper","Stem Borer","Blast"],
    mspCrops:{paddy:2183, ragi:3846, mango:6000, cashew:5000}
  },
  sindhudurg: {
    name:"Sindhudurg", region:"Konkan", division:"Konkan",
    temp:28, rainfall:3500, humidity:85, soilTypes:["Laterite","Coastal Sandy","Red Laterite"],
    dominantSoil:"laterite",
    monthlyRain:[22,13,18,24,85,680,910,800,410,160,38,16],
    kharif:["Paddy","Nachni","Coconut"],
    rabi:["Vegetables","Beans"],
    summer:["Cashew","Coconut","Mango"],
    bestCrop:{kharif:{name:"Paddy",yield:"18–22 Q/acre",sow:"June 10–20",days:130,water:"1200–1600mm",temp:"25–30°C",msp:2183},
              rabi:{name:"Cashew",yield:"4–6 Q/acre",sow:"perennial",days:365,water:"1200–1600mm",temp:"24–32°C",msp:5000},
              summer:{name:"Coconut",yield:"80–100 nuts/tree",sow:"perennial",days:365,water:"1200–2000mm",temp:"26–32°C",msp:3200}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"low",
    notes:"Highest rainfall district. Tourism coast. Cashew and coconut economy.",
    specialPests:["Coconut Beetle","Cashew Stem Borer","Mango Hopper"],
    mspCrops:{paddy:2183, cashew:5000, coconut:3200, ragi:3846}
  },
  thane: {
    name:"Thane", region:"Konkan", division:"Konkan",
    temp:29, rainfall:2500, humidity:82, soilTypes:["Laterite","Alluvial","Coastal Sandy"],
    dominantSoil:"laterite",
    monthlyRain:[16,9,14,20,70,490,650,580,310,120,27,11],
    kharif:["Paddy","Nachni","Vegetables"],
    rabi:["Vegetables","Flowers"],
    summer:["Vegetables","Flowers","Mango"],
    bestCrop:{kharif:{name:"Paddy",yield:"18–24 Q/acre",sow:"June 10–20",days:130,water:"1100–1500mm",temp:"26–30°C",msp:2183},
              rabi:{name:"Nachni",yield:"8–12 Q/acre",sow:"June–July",days:120,water:"800–1000mm",temp:"20–28°C",msp:3846},
              summer:{name:"Vegetables",yield:"varies",sow:"Oct–Nov",days:90,water:"300–500mm",temp:"20–28°C",msp:2500}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"medium",
    notes:"Near Mumbai. Peri-urban agriculture. Flowers and vegetables dominant.",
    specialPests:["Stem Borer","Leafhopper","BPH"],
    mspCrops:{paddy:2183, ragi:3846, vegetables:2500}
  },
  palghar: {
    name:"Palghar", region:"Konkan", division:"Konkan",
    temp:29, rainfall:2200, humidity:80, soilTypes:["Laterite","Alluvial","Sandy Loam"],
    dominantSoil:"laterite",
    monthlyRain:[15,9,13,19,65,430,580,520,280,110,24,10],
    kharif:["Paddy","Nachni","Vegetables"],
    rabi:["Vegetables","Flowers","Chikoo"],
    summer:["Chikoo (Sapodilla)","Mango","Banana"],
    bestCrop:{kharif:{name:"Paddy",yield:"18–24 Q/acre",sow:"June 10–20",days:130,water:"1100–1500mm",temp:"26–30°C",msp:2183},
              rabi:{name:"Chikoo (Sapodilla)",yield:"100–150 Q/acre",sow:"perennial",days:365,water:"1000–1500mm",temp:"25–32°C",msp:4000},
              summer:{name:"Nachni",yield:"8–12 Q/acre",sow:"June–July",days:120,water:"800–1000mm",temp:"20–28°C",msp:3846}},
    droughtRisk:"low", floodRisk:"medium", pestRisk:"medium",
    notes:"Dahanu chikoo famous. Tribal farming area. Vanganga river.",
    specialPests:["Stem Borer","Mealybug","Fruitfly"],
    mspCrops:{paddy:2183, chikoo:4000, ragi:3846, mango:6000}
  },
  mumbaiCity: {
    name:"Mumbai City", region:"Konkan", division:"Konkan",
    temp:30, rainfall:2400, humidity:80, soilTypes:["Alluvial","Coastal Sandy"],
    dominantSoil:"alluvial",
    monthlyRain:[14,8,12,18,60,460,610,540,290,115,25,10],
    kharif:["Vegetables","Flowers"],
    rabi:["Vegetables","Flowers"],
    summer:["Vegetables","Flowers"],
    bestCrop:{kharif:{name:"Leafy Vegetables",yield:"30–40 Q/acre",sow:"June–Oct",days:60,water:"400–600mm",temp:"26–30°C",msp:2500},
              rabi:{name:"Flowers",yield:"varies",sow:"Oct–Nov",days:90,water:"200–300mm",temp:"22–28°C",msp:5000},
              summer:{name:"Leafy Vegetables",yield:"30–40 Q/acre",sow:"Feb–Apr",days:60,water:"300–400mm",temp:"26–32°C",msp:2500}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"low",
    notes:"Urban. Minimal agriculture. Coastal high rainfall zone.",
    specialPests:["Mite","Aphids","Fruitfly"],
    mspCrops:{vegetables:2500, flowers:5000}
  },
  mumbaiSuburban: {
    name:"Mumbai Suburban", region:"Konkan", division:"Konkan",
    temp:30, rainfall:2350, humidity:80, soilTypes:["Alluvial","Laterite","Coastal Sandy"],
    dominantSoil:"alluvial",
    monthlyRain:[14,8,12,18,60,445,600,530,285,112,24,10],
    kharif:["Paddy","Vegetables"],
    rabi:["Vegetables","Flowers"],
    summer:["Vegetables","Flowers"],
    bestCrop:{kharif:{name:"Paddy",yield:"16–22 Q/acre",sow:"June 10–20",days:130,water:"1000–1400mm",temp:"26–30°C",msp:2183},
              rabi:{name:"Vegetables",yield:"30–40 Q/acre",sow:"Oct–Nov",days:60,water:"200–300mm",temp:"22–28°C",msp:2500},
              summer:{name:"Flowers",yield:"varies",sow:"Feb–Mar",days:90,water:"300–400mm",temp:"26–32°C",msp:5000}},
    droughtRisk:"low", floodRisk:"high", pestRisk:"low",
    notes:"Peri-urban. Paddy and vegetable cultivation near city.",
    specialPests:["Stem Borer","BPH","Aphids"],
    mspCrops:{paddy:2183, vegetables:2500, flowers:5000}
  }
};

// Normalize district name to key
function getDistrictKey(name) {
  if (!name) return null;
  const n = name.trim().toLowerCase()
    .replace(/\s+/g,'')
    .replace(/[().]/g,'')
    .replace('csnm','')
    .replace('chhatrapatisambahjinagar','aurangabad')
    .replace('sambhajinagar','aurangabad')
    .replace('dharashiv','osmanabad');

  const aliases = {
    pune:'pune', nashik:'nashik', nagpur:'nagpur',
    aurangabad:'aurangabad', latur:'latur', solapur:'solapur',
    kolhapur:'kolhapur', satara:'satara', sangli:'sangli',
    ahmednagar:'ahmednagar', amravati:'amravati', yavatmal:'yavatmal',
    wardha:'wardha', jalgaon:'jalgaon', nanded:'nanded',
    chandrapur:'chandrapur', ratnagiri:'ratnagiri', parbhani:'parbhani',
    beed:'beed', osmanabad:'osmanabad', jalna:'jalna',
    hingoli:'hingoli', nandurbar:'nandurbar', dhule:'dhule',
    akola:'akola', buldhana:'buldhana', washim:'washim',
    gondia:'gondia', bhandara:'bhandara', gadchiroli:'gadchiroli',
    raigad:'raigad', sindhudurg:'sindhudurg', thane:'thane',
    palghar:'palghar', mumbaicity:'mumbaiCity', mumbaisuburban:'mumbaiSuburban',
    'mumbaicitysuburban':'mumbaiSuburban'
  };
  for (const [k, v] of Object.entries(aliases)) {
    if (n.includes(k)) return v;
  }
  return null;
}

// Translations
const T = {
  en: {
    // navbar
    'nav-home':'Home','nav-input':'Farm Details','nav-climate':'Climate',
    'nav-rec':'Crop Advice','nav-risk':'Risk','nav-cal':'Calendar',
    'nav-pest':'Pest Guide','nav-dash':'Dashboard',
    // hero
    'hero-title':'KrushiMitra','hero-tagline':'Smart Farming Assistant',
    'hero-desc':'District-wise accurate crop recommendations, real Maharashtra agricultural data, climate analysis, pest guidance, and complete farming calendar — for all 36 districts.',
    'btn-start':'🌱 Get Recommendation','btn-dash':'View Dashboard',
    'home-card-label':'Recommended Crop','home-yield-key':'Per Acre',
    'home-days-key':'Days','home-conf-key':'Accuracy',
    // features
    'feat1-t':'Climate Analysis','feat1-d':'Real IMD data for all 36 Maharashtra districts — rainfall, temperature, humidity.',
    'feat2-t':'Crop Recommendation','feat2-d':'Best crops for your district, soil type and season based on historical data.',
    'feat3-t':'Farm Calendar','feat3-d':'Day-by-day sowing, fertilizer, pest, irrigation schedule specific to your district.',
    'feat4-t':'Pest & Disease Guide','feat4-d':'District-specific pest risk and pesticide schedule based on agro-climatic zone.',
    // form
    'input-title':'Farm Details','input-desc':'Enter your farm details to get district-specific recommendations.',
    'lbl-location':'📍 District','lbl-size':'🏔️ Land Size (Acres)',
    'db-title':'District Info','lbl-soil':'🪨 Soil Type',
    'soil-black':'Black Soil','soil-red':'Red Soil','soil-sandy':'Sandy Soil',
    'soil-alluvial':'Alluvial Soil','soil-lat':'Laterite Soil',
    'lbl-season':'🌤️ Season','s-kharif':'Kharif (Jun–Oct)','s-rabi':'Rabi (Nov–Mar)','s-summer':'Summer (Apr–Jun)',
    'lbl-irr':'💧 Irrigation','i-drip':'Drip','i-rain':'Rainfed','i-flood':'Flood','i-sprinkler':'Sprinkler',
    'lbl-concern':'💬 Any specific concern? (optional)','submit-btn':'🌾 Get Recommendation',
    // climate
    'climate-title':'Climate Analysis','climate-desc':'District-specific climate data from IMD records',
    'cl-temp':'Temperature','cl-rain':'Annual Rainfall','cl-hum':'Humidity','cl-region':'Agro-Zone',
    'chart-title':'📊 Monthly Rainfall (mm) — Jun to May',
    'soil-info-title':'Soil Types in This District',
    // recommend
    'rec-title':'Crop Recommendation','rec-desc':'Based on district data, soil type, and season',
    'rec-badge':'✅ Recommended','rec-yield-k':'Expected Yield','rec-sow-k':'Sowing Date',
    'rec-dur-k':'Duration','rec-msp-k':'MSP/Quintal',
    'rd-soil-k':'Suitable Soil','rd-water-k':'Water Needed','rd-temp-k':'Ideal Temp',
    'analysis-title':'📋 Crop Analysis','loading-text':'Analyzing district data...',
    // risk
    'risk-title':'Risk Assessment','risk-desc':'District-specific agricultural risk analysis',
    'r-drought-t':'Drought Risk','r-flood-t':'Flood Risk','r-pest-t':'Pest Risk',
    'sug-title':'💡 Risk Mitigation Tips',
    // calendar
    'cal-title':'Farm Calendar','cal-desc':'District-specific crop schedule',
    // pest
    'pest-title':'Pest & Disease Guide','pest-desc':'Identification, timing and pesticide schedule',
    // dashboard
    'dash-title':'Farm Dashboard','dash-desc':'Complete overview of your farm plan',
    'dash-welcome':'Welcome, Farmer! 🙏',
    'dash-rec-title':'Recommended Crop','dash-risk-title':'Risk Overview',
    'dk-crop':'Crop','dk-yield':'Expected Yield','dk-duration':'Duration',
    'dk-season':'Season','dk-soil':'Soil',
    'dk-drought':'Drought','dk-flood':'Flood','dk-pest':'Pest','dk-zone':'Agro Zone',
    'nt-label':'⏭ Next Task',
    'dm-temp-k':'Temperature','dm-rain-k':'Avg Rainfall','dm-sow-k':'Sowing Date','dm-msp-k':'MSP/Qtl',
    // risk labels
    'low':'Low Risk','medium':'Medium Risk','high':'High Risk'
  },
  hi: {
    'nav-home':'होम','nav-input':'खेत विवरण','nav-climate':'जलवायु',
    'nav-rec':'फसल सलाह','nav-risk':'जोखिम','nav-cal':'कैलेंडर',
    'nav-pest':'कीट मार्गदर्शिका','nav-dash':'डैशबोर्ड',
    'hero-title':'कृषिमित्र','hero-tagline':'स्मार्ट कृषि सहायक',
    'hero-desc':'सभी 36 जिलों के लिए जिलेवार सटीक फसल सिफारिश, वास्तविक महाराष्ट्र कृषि डेटा, जलवायु विश्लेषण।',
    'btn-start':'🌱 सिफारिश पाएं','btn-dash':'डैशबोर्ड देखें',
    'home-card-label':'अनुशंसित फसल','home-yield-key':'प्रति एकड़','home-days-key':'दिन','home-conf-key':'सटीकता',
    'feat1-t':'जलवायु विश्लेषण','feat1-d':'सभी 36 जिलों के लिए IMD डेटा।',
    'feat2-t':'फसल सिफारिश','feat2-d':'मिट्टी, मौसम और ऐतिहासिक डेटा के आधार पर।',
    'feat3-t':'खेत कैलेंडर','feat3-d':'बुवाई से कटाई तक दैनिक कृषि शेड्यूल।',
    'feat4-t':'कीट मार्गदर्शिका','feat4-d':'जिलेवार कीट जोखिम और कीटनाशक शेड्यूल।',
    'input-title':'खेत विवरण','input-desc':'जिलेवार सिफारिश के लिए अपना विवरण दर्ज करें।',
    'lbl-location':'📍 जिला','lbl-size':'🏔️ भूमि क्षेत्र (एकड़)',
    'db-title':'जिला जानकारी','lbl-soil':'🪨 मिट्टी का प्रकार',
    'soil-black':'काली मिट्टी','soil-red':'लाल मिट्टी','soil-sandy':'बलुई मिट्टी',
    'soil-alluvial':'जलोढ़ मिट्टी','soil-lat':'लैटेराइट मिट्टी',
    'lbl-season':'🌤️ मौसम','s-kharif':'खरीफ (जून–अक्टूबर)','s-rabi':'रबी (नवम्बर–मार्च)','s-summer':'ग्रीष्म (अप्रैल–जून)',
    'lbl-irr':'💧 सिंचाई','i-drip':'ड्रिप','i-rain':'वर्षा आधारित','i-flood':'बाढ़','i-sprinkler':'स्प्रिंकलर',
    'lbl-concern':'💬 कोई विशेष समस्या? (वैकल्पिक)','submit-btn':'🌾 सिफारिश पाएं',
    'climate-title':'जलवायु विश्लेषण','climate-desc':'IMD रिकॉर्ड से जिलेवार जलवायु डेटा',
    'cl-temp':'तापमान','cl-rain':'वार्षिक वर्षा','cl-hum':'आर्द्रता','cl-region':'कृषि क्षेत्र',
    'chart-title':'📊 मासिक वर्षा (मिमी) — जून से मई',
    'soil-info-title':'इस जिले में मिट्टी के प्रकार',
    'rec-title':'फसल सिफारिश','rec-desc':'जिला डेटा, मिट्टी और मौसम के आधार पर',
    'rec-badge':'✅ अनुशंसित','rec-yield-k':'अपेक्षित उपज','rec-sow-k':'बुवाई की तारीख',
    'rec-dur-k':'अवधि','rec-msp-k':'MSP/क्विंटल',
    'rd-soil-k':'उपयुक्त मिट्टी','rd-water-k':'पानी की जरूरत','rd-temp-k':'आदर्श तापमान',
    'analysis-title':'📋 फसल विश्लेषण','loading-text':'जिला डेटा विश्लेषण हो रहा है...',
    'risk-title':'जोखिम मूल्यांकन','risk-desc':'जिलेवार कृषि जोखिम विश्लेषण',
    'r-drought-t':'सूखा जोखिम','r-flood-t':'बाढ़ जोखिम','r-pest-t':'कीट जोखिम',
    'sug-title':'💡 जोखिम कम करने के सुझाव',
    'cal-title':'खेत कैलेंडर','cal-desc':'जिलेवार फसल शेड्यूल',
    'pest-title':'कीट और रोग मार्गदर्शिका','pest-desc':'पहचान, समय और कीटनाशक शेड्यूल',
    'dash-title':'खेत डैशबोर्ड','dash-desc':'आपकी खेत योजना का पूर्ण अवलोकन',
    'dash-welcome':'स्वागत है, किसान भाई! 🙏',
    'dash-rec-title':'अनुशंसित फसल','dash-risk-title':'जोखिम अवलोकन',
    'dk-crop':'फसल','dk-yield':'अपेक्षित उपज','dk-duration':'अवधि',
    'dk-season':'मौसम','dk-soil':'मिट्टी',
    'dk-drought':'सूखा','dk-flood':'बाढ़','dk-pest':'कीट','dk-zone':'कृषि क्षेत्र',
    'nt-label':'⏭ अगला कार्य',
    'dm-temp-k':'तापमान','dm-rain-k':'औसत वर्षा','dm-sow-k':'बुवाई की तारीख','dm-msp-k':'MSP/क्विंटल',
    'low':'कम जोखिम','medium':'मध्यम जोखिम','high':'उच्च जोखिम'
  },
  mr: {
    'nav-home':'मुखपृष्ठ','nav-input':'शेत माहिती','nav-climate':'हवामान',
    'nav-rec':'पीक शिफारस','nav-risk':'धोका','nav-cal':'दिनदर्शिका',
    'nav-pest':'कीटक मार्गदर्शिका','nav-dash':'डॅशबोर्ड',
    'hero-title':'कृषिमित्र','hero-tagline':'स्मार्ट शेती सहायक',
    'hero-desc':'सर्व 36 जिल्ह्यांसाठी जिल्हावार अचूक पीक शिफारस, खरे महाराष्ट्र कृषी डेटा, हवामान विश्लेषण.',
    'btn-start':'🌱 शिफारस मिळवा','btn-dash':'डॅशबोर्ड पहा',
    'home-card-label':'शिफारस केलेले पीक','home-yield-key':'प्रति एकर','home-days-key':'दिवस','home-conf-key':'अचूकता',
    'feat1-t':'हवामान विश्लेषण','feat1-d':'सर्व 36 जिल्ह्यांसाठी IMD डेटा.',
    'feat2-t':'पीक शिफारस','feat2-d':'माती, हंगाम व ऐतिहासिक डेटावर आधारित.',
    'feat3-t':'शेत दिनदर्शिका','feat3-d':'पेरणीपासून कापणीपर्यंत दैनिक शेती वेळापत्रक.',
    'feat4-t':'कीटक व रोग मार्गदर्शिका','feat4-d':'जिल्हावार कीटक धोका व कीटकनाशक वेळापत्रक.',
    'input-title':'शेत माहिती','input-desc':'जिल्हावार शिफारसीसाठी माहिती भरा.',
    'lbl-location':'📍 जिल्हा','lbl-size':'🏔️ जमीन क्षेत्र (एकर)',
    'db-title':'जिल्हा माहिती','lbl-soil':'🪨 मातीचा प्रकार',
    'soil-black':'काळी माती','soil-red':'लाल माती','soil-sandy':'वालुकामय माती',
    'soil-alluvial':'गाळाची माती','soil-lat':'लॅटेराइट माती',
    'lbl-season':'🌤️ हंगाम','s-kharif':'खरीप (जून–ऑक्टोबर)','s-rabi':'रब्बी (नोव्हेंबर–मार्च)','s-summer':'उन्हाळी (एप्रिल–जून)',
    'lbl-irr':'💧 सिंचनाचा प्रकार','i-drip':'ठिबक','i-rain':'पावसावर आधारित','i-flood':'पूर सिंचन','i-sprinkler':'तुषार',
    'lbl-concern':'💬 कोणतीही विशेष समस्या? (पर्यायी)','submit-btn':'🌾 शिफारस मिळवा',
    'climate-title':'हवामान विश्लेषण','climate-desc':'IMD नोंदींमधून जिल्हावार हवामान डेटा',
    'cl-temp':'तापमान','cl-rain':'वार्षिक पाऊस','cl-hum':'आर्द्रता','cl-region':'कृषी क्षेत्र',
    'chart-title':'📊 मासिक पाऊस (मिमी) — जून ते मे',
    'soil-info-title':'या जिल्ह्यातील मातीचे प्रकार',
    'rec-title':'पीक शिफारस','rec-desc':'जिल्हा डेटा, माती व हंगामावर आधारित',
    'rec-badge':'✅ शिफारस केलेले','rec-yield-k':'अपेक्षित उत्पन्न','rec-sow-k':'पेरणीची तारीख',
    'rec-dur-k':'कालावधी','rec-msp-k':'MSP/क्विंटल',
    'rd-soil-k':'योग्य माती','rd-water-k':'पाण्याची गरज','rd-temp-k':'आदर्श तापमान',
    'analysis-title':'📋 पीक विश्लेषण','loading-text':'जिल्हा डेटाचे विश्लेषण होत आहे...',
    'risk-title':'धोका मूल्यांकन','risk-desc':'जिल्हावार कृषी धोका विश्लेषण',
    'r-drought-t':'दुष्काळ धोका','r-flood-t':'पूर धोका','r-pest-t':'कीटक धोका',
    'sug-title':'💡 धोका कमी करण्याचे सुझाव',
    'cal-title':'शेत दिनदर्शिका','cal-desc':'जिल्हावार पीक वेळापत्रक',
    'pest-title':'कीटक व रोग मार्गदर्शिका','pest-desc':'ओळख, वेळ व कीटकनाशक वेळापत्रक',
    'dash-title':'शेत डॅशबोर्ड','dash-desc':'तुमच्या शेत योजनेचे संपूर्ण विहंगावलोकन',
    'dash-welcome':'स्वागत आहे, शेतकरी बंधू! 🙏',
    'dash-rec-title':'शिफारस केलेले पीक','dash-risk-title':'धोका अवलोकन',
    'dk-crop':'पीक','dk-yield':'अपेक्षित उत्पन्न','dk-duration':'कालावधी',
    'dk-season':'हंगाम','dk-soil':'माती',
    'dk-drought':'दुष्काळ','dk-flood':'पूर','dk-pest':'कीटक','dk-zone':'कृषी क्षेत्र',
    'nt-label':'⏭ पुढील नियोजित कार्य',
    'dm-temp-k':'तापमान','dm-rain-k':'सरासरी पाऊस','dm-sow-k':'पेरणीची तारीख','dm-msp-k':'MSP/क्विंटल',
    'low':'कमी धोका','medium':'मध्यम धोका','high':'उच्च धोका'
  }
};

// Calendar templates per crop type
const CALENDAR_TEMPLATES = {
  soybean: [
    {month:"June",events:[
      {type:"prep",title:"Land Preparation",desc:"Deep ploughing 2–3 times. Apply FYM 5 tonnes/acre. Level the field."},
      {type:"sow",title:"Sowing",desc:"Use JS-335 / JS-9305 seeds. Sow at 3–4 cm depth, row spacing 45 cm. Seed rate 30 kg/acre."},
      {type:"fert",title:"Basal Fertilizer",desc:"Apply SSP 100 kg/acre + MOP 30 kg/acre at sowing. Seed treatment with Rhizobium & PSB."}
    ]},
    {month:"July",events:[
      {type:"pest",title:"Pest Monitoring",desc:"Girdle beetle & semilooper from day 20–30. Use yellow sticky traps for early detection."},
      {type:"irr",title:"Irrigation (if needed)",desc:"If no rain for 7+ days, give 25mm supplemental irrigation at branching stage."},
      {type:"fert",title:"Top Dressing",desc:"Urea 10 kg/acre at 25 days after sowing if plants show yellowing."}
    ]},
    {month:"August",events:[
      {type:"pest",title:"Pesticide Spray",desc:"Spray Quinalphos 25 EC @ 2ml/litre for pod borer. Do in morning before 9am."},
      {type:"mon",title:"Monitoring",desc:"Watch for yellow mosaic virus – remove infected plants immediately. Check pod borers."},
      {type:"irr",title:"Pod Development Irrigation",desc:"Critical stage. Ensure moisture at flowering (45–55 days) and pod filling (65–75 days)."}
    ]},
    {month:"September",events:[
      {type:"harv",title:"Harvest",desc:"Harvest when 95% pods turn brown/yellow (90–95 days). Moisture < 12%. Expected: 12–16 Q/acre."}
    ]}
  ],
  cotton: [
    {month:"June",events:[
      {type:"prep",title:"Land Preparation",desc:"Deep ploughing. Apply FYM 8–10 tonnes/acre. Ridges and furrows at 90 cm."},
      {type:"sow",title:"BT Cotton Sowing",desc:"Use approved BT hybrid. Sow at 3–5 cm depth, spacing 90x60 cm. One seed per hill."},
      {type:"fert",title:"Basal Dose",desc:"NPK 50:25:25 kg/acre. Apply in furrow at sowing. Mix with soil properly."}
    ]},
    {month:"July",events:[
      {type:"pest",title:"Early Pest Watch",desc:"Aphids & jassids from week 3–4. Yellow sticky traps. Spray neem oil 5ml/litre preventively."},
      {type:"fert",title:"Top Dressing",desc:"Urea 25 kg/acre at 30–35 days. Second dose at 60 days."},
      {type:"irr",title:"Irrigation",desc:"Give irrigation at 10-day intervals in dry periods. Critical at squaring & boll formation."}
    ]},
    {month:"August",events:[
      {type:"pest",title:"Bollworm Management",desc:"Monitor for bollworm entry holes. Set pheromone traps. Spray Chlorpyriphos if infestation > 5%."},
      {type:"pest",title:"Pink Bollworm Alert",desc:"From boll formation – check for pink bollworm. Use Emamectin Benzoate 5 SG @ 0.4g/litre."},
    ]},
    {month:"September",events:[
      {type:"mon",title:"Boll Development",desc:"Monitor boll opening. Protect from excessive rain damage. Continue pest scouting."}
    ]},
    {month:"October",events:[
      {type:"harv",title:"First Picking",desc:"Pick when 60–70% bolls open. 3–4 pickings needed. Keep cotton dry. MSP: ₹6,620/quintal."}
    ]}
  ],
  paddy: [
    {month:"June",events:[
      {type:"prep",title:"Nursery Preparation",desc:"Raise nursery 25–30 days before transplanting. Seed rate 10 kg/acre for nursery."},
      {type:"sow",title:"Transplanting",desc:"Transplant 25–30 day seedlings. 2–3 seedlings per hill. Row spacing 20x15 cm."},
      {type:"fert",title:"Basal Fertilizer",desc:"NPK 40:20:20 kg/acre at transplanting. Apply in standing water."}
    ]},
    {month:"July",events:[
      {type:"irr",title:"Water Management",desc:"Maintain 5–7 cm standing water. Drain for 5 days at tillering for better root development."},
      {type:"pest",title:"BPH & Stem Borer",desc:"Check for brown plant hopper & stem borer. Set light traps. Spray Chlorpyriphos if needed."},
      {type:"fert",title:"Top Dressing",desc:"Urea 20 kg/acre at active tillering (25–30 days). Second dose at panicle initiation."}
    ]},
    {month:"August",events:[
      {type:"pest",title:"Blast Disease",desc:"If blast observed, spray Tricyclazole 75 WP @ 0.6g/litre water. Avoid excess nitrogen."},
      {type:"mon",title:"Monitoring",desc:"Watch for neck blast at heading stage. Maintain proper water level."}
    ]},
    {month:"September",events:[
      {type:"harv",title:"Harvest",desc:"Harvest at 80–85% grain maturity (yellowing). Moisture 18–20%. Thresh immediately after cutting."}
    ]}
  ],
  wheat: [
    {month:"November",events:[
      {type:"prep",title:"Land Preparation",desc:"Fine tilth with 3 ploughings. Apply FYM 5 tonnes/acre. Level field for uniform irrigation."},
      {type:"sow",title:"Sowing",desc:"Use GW-322/HD-2781. Seed rate 40 kg/acre. Row spacing 22.5 cm. Depth 5–6 cm."},
      {type:"fert",title:"Basal Dose",desc:"NPK 50:30:25 kg/acre at sowing. Mix properly in soil."}
    ]},
    {month:"December",events:[
      {type:"irr",title:"Crown Root Irrigation (CRI)",desc:"First irrigation 20–22 days after sowing – critical Crown Root Initiation (CRI) stage."},
      {type:"fert",title:"Top Dressing",desc:"Urea 25 kg/acre at CRI stage for tillering boost."},
      {type:"mon",title:"Monitoring",desc:"Watch for yellow rust and aphids. Use certified disease-free seed."}
    ]},
    {month:"January",events:[
      {type:"irr",title:"Jointing Irrigation",desc:"Second irrigation at jointing (45 days). Third at booting stage (60–65 days)."},
      {type:"pest",title:"Aphid Management",desc:"If aphids seen, spray Dimethoate 30 EC @ 1.5ml/litre in morning hours."}
    ]},
    {month:"February",events:[
      {type:"irr",title:"Grain Filling Irrigation",desc:"Irrigation at milky stage (80–85 days). Stop watering 15 days before harvest."},
      {type:"mon",title:"Terminal Heat Watch",desc:"If temperature rises above 35°C, spray Sulphur 80 WP @ 3g/litre for heat protection."}
    ]},
    {month:"March",events:[
      {type:"harv",title:"Harvest",desc:"Harvest when golden-yellow (Grain moisture 12–14%). Thresh and dry properly. Expected 18–22 Q/acre."}
    ]}
  ],
  sugarcane: [
    {month:"February",events:[
      {type:"prep",title:"Land Preparation & Planting",desc:"Deep furrows 90 cm apart. Plant 3-bud setts. Cover with soil. Apply 250 kg FYM/acre."},
      {type:"fert",title:"Basal Fertilizer",desc:"NPK 50:60:60 kg/acre at planting. Essential for good establishment."}
    ]},
    {month:"March",events:[
      {type:"irr",title:"Irrigation",desc:"Irrigate every 7–10 days in summer. Critical establishment phase."},
      {type:"pest",title:"Early Shoot Borer",desc:"Watch for early shoot borer from April. Remove and destroy affected shoots. Set pheromone traps."}
    ]},
    {month:"June",events:[
      {type:"fert",title:"Top Dressing",desc:"Urea 50 kg/acre at grand growth period start. Potash 30 kg/acre."}
    ]},
    {month:"November",events:[
      {type:"harv",title:"Harvest",desc:"Cut at 12 months. Check brix value (should be >18). Expected: 350–450 Q/acre."}
    ]}
  ],
  gram: [
    {month:"October",events:[
      {type:"prep",title:"Land Preparation",desc:"Fine seedbed. Apply FYM 3 tonnes/acre. Good drainage essential."},
      {type:"sow",title:"Sowing",desc:"Use JG-11/Vijay variety. Seed rate 30 kg/acre. Depth 8–10 cm. Row spacing 30 cm."},
      {type:"fert",title:"Basal Dose",desc:"SSP 100 kg/acre. Urea 15 kg/acre. Rhizobium seed treatment is must."}
    ]},
    {month:"November",events:[
      {type:"pest",title:"Pest Monitoring",desc:"Watch for gram pod borer (Helicoverpa). Set pheromone traps from vegetative stage."},
      {type:"irr",title:"Irrigation",desc:"Pre-sowing irrigation. Light irrigation at flowering if dry conditions persist."}
    ]},
    {month:"December",events:[
      {type:"pest",title:"Pod Borer Spray",desc:"If pod borer crosses ETL, spray Chlorpyriphos 20 EC @ 2ml/litre. Morning spray preferred."},
      {type:"mon",title:"Wilt Disease",desc:"Chickpea wilt can cause 30–40% loss. No chemical cure – use resistant varieties. Remove affected plants."}
    ]},
    {month:"February",events:[
      {type:"harv",title:"Harvest",desc:"Harvest when pods turn brown (90–110 days). Moisture 15–18%. Expected: 8–10 Q/acre."}
    ]}
  ]
};

// Get calendar for a crop
function getCalendarForCrop(cropName) {
  const c = cropName.toLowerCase();
  if (c.includes('soybean') || c.includes('soya')) return CALENDAR_TEMPLATES.soybean;
  if (c.includes('cotton')) return CALENDAR_TEMPLATES.cotton;
  if (c.includes('paddy') || c.includes('rice')) return CALENDAR_TEMPLATES.paddy;
  if (c.includes('wheat')) return CALENDAR_TEMPLATES.wheat;
  if (c.includes('sugarcane')) return CALENDAR_TEMPLATES.sugarcane;
  if (c.includes('gram') || c.includes('chickpea')) return CALENDAR_TEMPLATES.gram;
  // Generic fallback
  return CALENDAR_TEMPLATES.soybean;
}

// Pest data per district type
const PEST_DATA = {
  vidarbha_cotton: [
    {name:"Pink Bollworm",stage:"Boll Formation (50–80 days)",time:"August–October",emoji:"🐛",
     sym:"Circular holes in bolls, damaged fibres, red larvae inside",
     pesticide:"Emamectin Benzoate 5 SG",dosage:"0.4 g/litre water",spray:"Morning before 9 AM",
     safety:"⚠️ Do not spray on flowering day. Honeybee risk – avoid evening sprays."},
    {name:"Whitefly",stage:"Seedling to Vegetative (10–40 days)",time:"July–September",emoji:"🦋",
     sym:"Yellowish-white specks on leaves, honeydew, sooty mould",
     pesticide:"Imidacloprid 17.8 SL",dosage:"0.3 ml/litre water",spray:"Early morning",
     safety:"⚠️ Highly toxic to bees. Do not apply near flowering."},
    {name:"American Bollworm",stage:"Square to Boll (40–90 days)",time:"August–November",emoji:"🐝",
     sym:"Flower shedding, entry holes in squares and bolls",
     pesticide:"Chlorpyriphos 20 EC",dosage:"2 ml/litre water",spray:"Evening spray better",
     safety:"⚠️ PHI 15 days. Keep away from water bodies."},
    {name:"Aphids (Cotton)",stage:"Early seedling (15–30 days)",time:"July–August",emoji:"🦗",
     sym:"Curling leaves, sticky honeydew, stunted growth",
     pesticide:"Dimethoate 30 EC",dosage:"1.5 ml/litre water",spray:"Morning preferred",
     safety:"⚠️ Wear gloves and mask. Safe for children 24hrs."}
  ],
  soybean_belt: [
    {name:"Girdle Beetle",stage:"Seedling to Vegetative (15–35 days)",time:"July–August",emoji:"🐞",
     sym:"Girdle marks on stems, wilting of shoots, stem breaking",
     pesticide:"Chlorpyriphos 20 EC",dosage:"2 ml/litre water",spray:"Early morning",
     safety:"⚠️ PHI 15 days. Avoid spraying before rain."},
    {name:"Pod Borer (Soybean)",stage:"Pod Formation (45–65 days)",time:"August–September",emoji:"🐛",
     sym:"Holes in pods, larvae inside pods, damaged seeds",
     pesticide:"Quinalphos 25 EC",dosage:"2 ml/litre water",spray:"Morning before 9 AM",
     safety:"⚠️ Safe for spinosad – bee friendly option available."},
    {name:"Yellow Mosaic Virus",stage:"Any (Whitefly transmitted)",time:"June–September",emoji:"🍂",
     sym:"Yellow mosaic patches on leaves, leaf curling, stunted growth",
     pesticide:"Imidacloprid 17.8 SL (for whitefly vector)",dosage:"0.3 ml/litre water",spray:"Preventive weekly spray",
     safety:"⚠️ Remove infected plants immediately. Use YMV-resistant variety JS-335."},
    {name:"Semilooper Caterpillar",stage:"Vegetative (20–40 days)",time:"July–August",emoji:"🐌",
     sym:"Skeletonized leaves, irregular defoliation, droppings on leaves",
     pesticide:"Indoxacarb 14.5 SC",dosage:"1 ml/litre water",spray:"Evening spray",
     safety:"⚠️ PHI 7 days. Do not mix with alkaline pesticides."}
  ],
  konkan_rice: [
    {name:"Brown Plant Hopper (BPH)",stage:"Vegetative to Flowering (30–70 days)",time:"July–September",emoji:"🦟",
     sym:"Hopperburn (circular patches of drying plants), yellowish plants",
     pesticide:"Buprofezin 25 SC",dosage:"2 ml/litre water",spray:"Root zone application",
     safety:"⚠️ Avoid draining water for 3 days after spray. Safe to fish in 5 days."},
    {name:"Stem Borer (Paddy)",stage:"Seedling to Tillering (15–50 days)",time:"June–August",emoji:"🐛",
     sym:"Dead heart (early), White ear (late), entry holes in stem",
     pesticide:"Cartap Hydrochloride 4G",dosage:"8 kg/acre in standing water",spray:"Morning broadcast",
     safety:"⚠️ Do not spray when fish are present in paddy field."},
    {name:"Blast Disease (Paddy)",stage:"Tillering & Neck stage (30–65 days)",time:"July–September",emoji:"🌿",
     sym:"Diamond-shaped lesions on leaves, neck rot, panicle collapse",
     pesticide:"Tricyclazole 75 WP",dosage:"0.6 g/litre water",spray:"Start preventive spray at booting",
     safety:"⚠️ PHI 3 days. Do not apply during rain."},
    {name:"Leaf Folder",stage:"Vegetative to Panicle (35–65 days)",time:"July–August",emoji:"🌱",
     sym:"Longitudinal folded leaves, white linear marks, visible larvae",
     pesticide:"Chlorpyriphos 20 EC",dosage:"2 ml/litre water",spray:"Morning",
     safety:"⚠️ PHI 15 days. Avoid near water sources."}
  ],
  general_maharashtra: [
    {name:"Aphids",stage:"Early Stage (15–30 days)",time:"July–August",emoji:"🦗",
     sym:"Curling leaves, yellowish specks, sticky honeydew, colony on underside",
     pesticide:"Imidacloprid 17.8 SL",dosage:"0.3 ml/litre water",spray:"Morning or evening",
     safety:"⚠️ Wear gloves and mask during spray. Keep children away."},
    {name:"Pod Borer (General)",stage:"Flowering/Pod Stage (45–65 days)",time:"August–September",emoji:"🐛",
     sym:"Holes in pods, larvae inside pods, frass on leaves",
     pesticide:"Quinalphos 25 EC",dosage:"2 ml/litre water",spray:"Early morning",
     safety:"⚠️ PHI 15 days. Do not apply near standing water."},
    {name:"Whitefly",stage:"Vegetative (20–50 days)",time:"July–September",emoji:"🦋",
     sym:"White winged insects under leaves, yellowing, honeydew",
     pesticide:"Thiamethoxam 25 WG",dosage:"0.4 g/litre water",spray:"Morning preferred",
     safety:"⚠️ Very toxic to bees. Avoid flowering period sprays."},
    {name:"Yellow Mosaic Virus",stage:"Any stage",time:"June–September",emoji:"🍂",
     sym:"Yellow-green mosaic on leaves, leaf distortion, stunted plants",
     pesticide:"Control vector (Whitefly) with Neem oil 5ml/litre",dosage:"5 ml/litre water",spray:"Weekly preventive",
     safety:"⚠️ Remove infected plants. Use resistant varieties. No direct chemical cure."}
  ]
};

function getPestDataForDistrict(distKey) {
  const d = DISTRICTS[distKey];
  if (!d) return PEST_DATA.general_maharashtra;
  const region = d.region.toLowerCase();
  if ((region.includes('vidarbha') && d.kharif.some(c=>c.toLowerCase().includes('cotton')))) {
    return PEST_DATA.vidarbha_cotton;
  }
  if (d.region.includes('Konkan') || distKey === 'ratnagiri' || distKey === 'sindhudurg' || distKey === 'raigad') {
    return PEST_DATA.konkan_rice;
  }
  if (d.kharif.some(c=>c.toLowerCase().includes('soybean'))) {
    return PEST_DATA.soybean_belt;
  }
  return PEST_DATA.general_maharashtra;
}
