/**
 * Persistent Data Store for SIXT Price Intelligence - Full Stations & ACRISS Codes Integration
 */

// 1. Mappatura completa Stazioni divise per Macro Città
export const CITY_STATIONS_MAP = {
  'Monaco di Baviera': [
    { id: 'MUC_ALL', name: 'Tutte le stazioni di Monaco' },
    { id: 'MUC_AP', name: 'Monaco Aeroporto (MUC)' },
    { id: 'MUC_HBF', name: 'Monaco Stazione Centrale (Hauptbahnhof)' },
    { id: 'MUC_CTR', name: 'Monaco Centro / Stachus' },
    { id: 'MUC_EAST', name: 'Monaco Ostbahnhof' }
  ],
  'Würzburg': [
    { id: 'WUE_ALL', name: 'Tutte le stazioni di Würzburg' },
    { id: 'WUE_HBF', name: 'Würzburg Stazione Centrale' },
    { id: 'WUE_CTR', name: 'Würzburg Nürnberger Str.' }
  ],
  'Norimberga': [
    { id: 'NUE_ALL', name: 'Tutte le stazioni di Norimberga' },
    { id: 'NUE_AP', name: 'Norimberga Aeroporto (NUE)' },
    { id: 'NUE_HBF', name: 'Norimberga Stazione Centrale' }
  ],
  'Francoforte': [
    { id: 'FRA_ALL', name: 'Tutte le stazioni di Francoforte' },
    { id: 'FRA_AP', name: 'Francoforte Aeroporto (FRA)' },
    { id: 'FRA_HBF', name: 'Francoforte Stazione Centrale' },
    { id: 'FRA_WEST', name: 'Francoforte Ovest / Camberger Str.' }
  ],
  'Milano': [
    { id: 'MIL_ALL', name: 'Tutte le stazioni di Milano' },
    { id: 'MIL_MXP', name: 'Milano Malpensa (MXP)' },
    { id: 'MIL_LIN', name: 'Milano Linate (LIN)' },
    { id: 'MIL_BGY', name: 'Milano Bergamo Orio al Serio (BGY)' },
    { id: 'MIL_CTR', name: 'Milano Stazione Centrale' }
  ],
  'Roma': [
    { id: 'ROM_ALL', name: 'Tutte le stazioni di Roma' },
    { id: 'ROM_FCO', name: 'Roma Fiumicino (FCO)' },
    { id: 'ROM_CIA', name: 'Roma Ciampino (CIA)' },
    { id: 'ROM_TER', name: 'Roma Stazione Termini' },
    { id: 'ROM_TIB', name: 'Roma Stazione Tiburtina' }
  ],
  'Venezia': [
    { id: 'VCE_ALL', name: 'Tutte le stazioni di Venezia' },
    { id: 'VCE_AP', name: 'Venezia Marco Polo (VCE)' },
    { id: 'VCE_PR', name: 'Venezia Piazzale Roma' },
    { id: 'VCE_ME', name: 'Venezia Mestre Stazione' }
  ]
};

// 2. Lista completa Codici ACRISS / Categorie
export const ACRISS_CATEGORIES = [
  { code: 'MCMR', name: 'Berlina - Citroën C1 (Manuale)', baseAvg: 35 },
  { code: 'ECMR', name: 'Berlina - Fiat 500 (Manuale)', baseAvg: 38 },
  { code: 'EDMR', name: 'Berlina - VW Polo (Manuale)', baseAvg: 42 },
  { code: 'CCMR/CCAR', name: 'Berlina Premium - MINI Hatch (Man/Auto)', baseAvg: 46 },
  { code: 'CDMR', name: 'Berlina - Fiat Tipo (Manuale)', baseAvg: 45 },
  { code: 'CLMR/CLAR', name: 'Berlina Premium - VW Golf (Man/Auto)', baseAvg: 48 },
  { code: 'CWMR', name: 'Station Wagon - Fiat Tipo SW (Manuale)', baseAvg: 52 },
  { code: 'IDMR/IDAR', name: 'Berlina Premium - Alfa Romeo Giulietta (Man/Auto)', baseAvg: 55 },
  { code: 'ILMR/ILAR', name: 'Berlina Premium - BMW Serie 1 (Man/Auto)', baseAvg: 58 },
  { code: 'SDMR/SDAR', name: 'Berlina Premium - BMW Serie 2 Active Tourer (Man/Auto)', baseAvg: 62 },
  { code: 'SWAR', name: 'Station Wagon Premium - BMW Serie 2 Grand Tourer (Auto)', baseAvg: 68 },
  { code: 'FDAR', name: 'Berlina Premium - Alfa Romeo Giulia (Auto)', baseAvg: 72 },
  { code: 'FWAR', name: 'Station Wagon Premium - BMW Serie 3 Touring (Auto)', baseAvg: 76 },
  { code: 'PDAR', name: 'Berlina Premium - Audi A5 Sportback (Auto)', baseAvg: 82 },
  { code: 'LDAR', name: 'Berlina Premium - BMW Serie 5 (Auto)', baseAvg: 88 },
  { code: 'LWAR', name: 'Station Wagon Premium - BMW Serie 5 Touring (Auto)', baseAvg: 92 },
  { code: 'XCAR', name: 'Berlina Premium - BMW Serie 6 GT (Auto)', baseAvg: 105 },
  { code: 'XDAR', name: 'Berlina Premium - BMW Serie 7 (Auto)', baseAvg: 135 },
  { code: 'XSAR', name: 'Berlina Premium - BMW Serie 8 (Auto)', baseAvg: 155 },
  { code: 'FSAR', name: 'Coupé Premium - BMW Serie 2 Coupé (Auto)', baseAvg: 78 },
  { code: 'LSAR', name: 'Coupé Premium - BMW Serie 4 Gran Coupé (Auto)', baseAvg: 95 },
  { code: 'CVMR', name: 'Minivan - Fiat Qubo (Manuale)', baseAvg: 58 },
  { code: 'IVAR', name: 'Minivan - VW Touran 7S (Auto)', baseAvg: 85 },
  { code: 'SVAR', name: 'Minivan - Peugeot 5008 (Auto)', baseAvg: 90 },
  { code: 'FVMR/FVAR', name: 'Minivan - Fiat Talento (Man/Auto)', baseAvg: 110 },
  { code: 'CTMR/CTAR', name: 'Cabriolet - Fiat 500C (Man/Auto)', baseAvg: 65 },
  { code: 'STAR', name: 'Cabriolet - BMW Serie 2 Cabrio (Auto)', baseAvg: 85 },
  { code: 'LTAR', name: 'Cabriolet - BMW Serie 4 Cabrio (Auto)', baseAvg: 105 },
  { code: 'PTAR', name: 'Cabriolet - BMW Z4 (Auto)', baseAvg: 120 },
  { code: 'CFMR', name: 'Fuoristrada / SUV - Fiat 500X (Manuale)', baseAvg: 55 },
  { code: 'IFMR/IFAR', name: 'Fuoristrada / SUV - Jeep Renegade (Man/Auto)', baseAvg: 62 },
  { code: 'SFMR/SFAR', name: 'Fuoristrada / SUV - Ford Kuga (Man/Auto)', baseAvg: 70 },
  { code: 'FFAR', name: 'Fuoristrada / SUV - BMW X1 (Auto)', baseAvg: 78 },
  { code: 'PFAR', name: 'Fuoristrada / SUV - Jaguar I-Pace (Auto)', baseAvg: 115 },
  { code: 'XFAR', name: 'Fuoristrada / SUV - BMW X5 (Auto)', baseAvg: 130 }
];

const initialSlots = [
  {
    id: 'slot_1',
    name: 'Slot 1',
    active: true,
    email: 'utente@email.com',
    city: 'Monaco di Baviera',
    stationId: 'MUC_AP',
    category: 'CLMR/CLAR',
    startDate: '2026-08-10',
    endDate: '2026-08-17',
    maxPrice: 45,
    history: [52, 50, 48, 44, 41],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_2',
    name: 'Slot 2',
    active: true,
    email: 'utente@email.com',
    city: 'Milano',
    stationId: 'MIL_MXP',
    category: 'LSAR',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    category: 'XFAR',
    maxPrice: 120,
    history: [140, 135, 128, 130, 122],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_3',
    name: 'Slot 3',
    active: false,
    email: '',
    city: 'Roma',
    stationId: 'ROM_FCO',
    category: 'EDMR',
    startDate: '',
    endDate: '',
    maxPrice: '',
    history: [],
    lastChecked: null
  },
  {
    id: 'slot_4',
    name: 'Slot 4',
    active: false,
    email: '',
    city: 'Francoforte',
    stationId: 'FRA_AP',
    category: 'LDAR',
    startDate: '',
    endDate: '',
    maxPrice: '',
    history: [],
    lastChecked: null
  }
];

let slotsData = [...initialSlots];
let cronExecutionLogs = [];

export async function getSlots() {
  return slotsData;
}

export async function updateSlot(slotId, updateFields) {
  const index = slotsData.findIndex(s => s.id === slotId);
  if (index !== -1) {
    slotsData[index] = {
      ...slotsData[index],
      ...updateFields,
      active: true
    };
    return slotsData[index];
  }
  return null;
}

export async function savePriceRecordAndCalculateAvg(slotId, newPrice) {
  const index = slotsData.findIndex(s => s.id === slotId);
  if (index === -1) return { avgPrice: newPrice };

  const slot = slotsData[index];
  const newHistory = [...(slot.history || []), newPrice];
  
  const sum = newHistory.reduce((acc, curr) => acc + curr, 0);
  const avgPrice = parseFloat((sum / newHistory.length).toFixed(2));

  slotsData[index] = {
    ...slot,
    lastChecked: new Date().toISOString(),
    history: newHistory
  };

  return {
    ...slotsData[index],
    lastPrice: newPrice,
    avgPrice: avgPrice
  };
}

export async function addCronLog(logEntry) {
  cronExecutionLogs.unshift({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...logEntry
  });
  if (cronExecutionLogs.length > 50) cronExecutionLogs.pop();
}

export async function getCronLogs() {
  return cronExecutionLogs;
}
