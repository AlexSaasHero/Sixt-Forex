/**
 * Persistent Data Store for SIXT Price Intelligence - All Stations View & Filter
 */

// Mappatura Macro Città e Stazioni Interne (con dati di prezzo)
export const CITY_STATIONS_MAP = {
  'Monaco di Baviera': [
    { id: 'MUC_AP', name: 'Monaco Aeroporto (MUC)', type: 'Aeroporto', currentPrice: 42, avgPrice: 48 },
    { id: 'MUC_HBF', name: 'Monaco Stazione Centrale (Hauptbahnhof)', type: 'Stazione', currentPrice: 38, avgPrice: 45 },
    { id: 'MUC_CTR', name: 'Monaco Centro / Stachus', type: 'Città', currentPrice: 36, avgPrice: 43 },
    { id: 'MUC_EAST', name: 'Monaco Ostbahnhof', type: 'Stazione', currentPrice: 37, avgPrice: 44 }
  ],
  'Würzburg': [
    { id: 'WUE_HBF', name: 'Würzburg Stazione Centrale', type: 'Stazione', currentPrice: 34, avgPrice: 39 },
    { id: 'WUE_CTR', name: 'Würzburg Nürnberger Str.', type: 'Città', currentPrice: 32, avgPrice: 37 }
  ],
  'Norimberga': [
    { id: 'NUE_AP', name: 'Norimberga Aeroporto (NUE)', type: 'Aeroporto', currentPrice: 39, avgPrice: 42 },
    { id: 'NUE_HBF', name: 'Norimberga Stazione Centrale', type: 'Stazione', currentPrice: 35, avgPrice: 40 }
  ],
  'Francoforte': [
    { id: 'FRA_AP', name: 'Francoforte Aeroporto (FRA)', type: 'Aeroporto', currentPrice: 46, avgPrice: 52 },
    { id: 'FRA_HBF', name: 'Francoforte Stazione Centrale', type: 'Stazione', currentPrice: 41, avgPrice: 47 },
    { id: 'FRA_WEST', name: 'Francoforte Ovest / Camberger Str.', type: 'Città', currentPrice: 39, avgPrice: 45 }
  ],
  'Milano': [
    { id: 'MIL_MXP', name: 'Milano Malpensa (MXP)', type: 'Aeroporto', currentPrice: 35, avgPrice: 41 },
    { id: 'MIL_LIN', name: 'Milano Linate (LIN)', type: 'Aeroporto', currentPrice: 37, avgPrice: 43 },
    { id: 'MIL_BGY', name: 'Milano Bergamo Orio al Serio (BGY)', type: 'Aeroporto', currentPrice: 31, avgPrice: 38 },
    { id: 'MIL_CTR', name: 'Milano Stazione Centrale', type: 'Stazione', currentPrice: 36, avgPrice: 42 }
  ],
  'Roma': [
    { id: 'ROM_FCO', name: 'Roma Fiumicino (FCO)', type: 'Aeroporto', currentPrice: 36, avgPrice: 42 },
    { id: 'ROM_CIA', name: 'Roma Ciampino (CIA)', type: 'Aeroporto', currentPrice: 33, avgPrice: 39 },
    { id: 'ROM_TER', name: 'Roma Stazione Termini', type: 'Stazione', currentPrice: 38, avgPrice: 44 }
  ],
  'Venezia': [
    { id: 'VCE_AP', name: 'Venezia Marco Polo (VCE)', type: 'Aeroporto', currentPrice: 40, avgPrice: 46 },
    { id: 'VCE_PR', name: 'Venezia Piazzale Roma', type: 'Città', currentPrice: 42, avgPrice: 49 },
    { id: 'VCE_ME', name: 'Venezia Mestre Stazione', type: 'Stazione', currentPrice: 36, avgPrice: 41 }
  ]
};

// Lista Codici ACRISS
export const ACRISS_CATEGORIES = [
  { code: 'MCMR', name: 'Berlina - Citroën C1 (Manuale)' },
  { code: 'ECMR', name: 'Berlina - Fiat 500 (Manuale)' },
  { code: 'EDMR', name: 'Berlina - VW Polo (Manuale)' },
  { code: 'CCMR/CCAR', name: 'Berlina Premium - MINI Hatch (Man/Auto)' },
  { code: 'CDMR', name: 'Berlina - Fiat Tipo (Manuale)' },
  { code: 'CLMR/CLAR', name: 'Berlina Premium - VW Golf (Man/Auto)' },
  { code: 'CWMR', name: 'Station Wagon - Fiat Tipo SW (Manuale)' },
  { code: 'IDMR/IDAR', name: 'Berlina Premium - Alfa Romeo Giulietta (Man/Auto)' },
  { code: 'ILMR/ILAR', name: 'Berlina Premium - BMW Serie 1 (Man/Auto)' },
  { code: 'SDMR/SDAR', name: 'Berlina Premium - BMW Serie 2 Active Tourer (Man/Auto)' },
  { code: 'SWAR', name: 'Station Wagon Premium - BMW Serie 2 Grand Tourer (Auto)' },
  { code: 'FDAR', name: 'Berlina Premium - Alfa Romeo Giulia (Auto)' },
  { code: 'FWAR', name: 'Station Wagon Premium - BMW Serie 3 Touring (Auto)' },
  { code: 'PDAR', name: 'Berlina Premium - Audi A5 Sportback (Auto)' },
  { code: 'LDAR', name: 'Berlina Premium - BMW Serie 5 (Auto)' },
  { code: 'LWAR', name: 'Station Wagon Premium - BMW Serie 5 Touring (Auto)' },
  { code: 'XCAR', name: 'Berlina Premium - BMW Serie 6 GT (Auto)' },
  { code: 'XDAR', name: 'Berlina Premium - BMW Serie 7 (Auto)' },
  { code: 'XSAR', name: 'Berlina Premium - BMW Serie 8 (Auto)' },
  { code: 'FSAR', name: 'Coupé Premium - BMW Serie 2 Coupé (Auto)' },
  { code: 'LSAR', name: 'Coupé Premium - BMW Serie 4 Gran Coupé (Auto)' },
  { code: 'CVMR', name: 'Minivan - Fiat Qubo (Manuale)' },
  { code: 'IVAR', name: 'Minivan - VW Touran 7S (Auto)' },
  { code: 'SVAR', name: 'Minivan - Peugeot 5008 (Auto)' },
  { code: 'FVMR/FVAR', name: 'Minivan - Fiat Talento (Man/Auto)' },
  { code: 'CTMR/CTAR', name: 'Cabriolet - Fiat 500C (Man/Auto)' },
  { code: 'STAR', name: 'Cabriolet - BMW Serie 2 Cabrio (Auto)' },
  { code: 'LTAR', name: 'Cabriolet - BMW Serie 4 Cabrio (Auto)' },
  { code: 'PTAR', name: 'Cabriolet - BMW Z4 (Auto)' },
  { code: 'CFMR', name: 'Fuoristrada / SUV - Fiat 500X (Manuale)' },
  { code: 'IFMR/IFAR', name: 'Fuoristrada / SUV - Jeep Renegade (Man/Auto)' },
  { code: 'SFMR/SFAR', name: 'Fuoristrada / SUV - Ford Kuga (Man/Auto)' },
  { code: 'FFAR', name: 'Fuoristrada / SUV - BMW X1 (Auto)' },
  { code: 'PFAR', name: 'Fuoristrada / SUV - Jaguar I-Pace (Auto)' },
  { code: 'XFAR', name: 'Fuoristrada / SUV - BMW X5 (Auto)' }
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
    history: [52, 50, 48, 44, 42],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_2',
    name: 'Slot 2',
    active: true,
    email: 'utente@email.com',
    city: 'Milano',
    stationId: 'MIL_MXP',
    category: 'XFAR',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
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
