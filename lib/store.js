/**
 * Persistent Data Store for SIXT Price Intelligence & Comparison Dashboard
 */

// 1. Target Locations for the 7 Cities
export const TARGET_LOCATIONS = [
  // MONACO DI BAVIERA
  { id: 'MUC_AP', city: 'Monaco di Baviera', name: 'Monaco Aeroporto (MUC)', type: 'Aeroporto' },
  { id: 'MUC_HBF', city: 'Monaco di Baviera', name: 'Monaco Stazione Centrale (Hauptbahnhof)', type: 'Stazione' },
  { id: 'MUC_CTR', city: 'Monaco di Baviera', name: 'Monaco Centro / Stachus', type: 'Città' },

  // WÜRZBURG
  { id: 'WUE_HBF', city: 'Würzburg', name: 'Würzburg Stazione Centrale', type: 'Stazione' },
  { id: 'WUE_CTR', city: 'Würzburg', name: 'Würzburg Nürnberger Str.', type: 'Città' },

  // NORIMBERGA
  { id: 'NUE_AP', city: 'Norimberga', name: 'Norimberga Aeroporto (NUE)', type: 'Aeroporto' },
  { id: 'NUE_HBF', city: 'Norimberga', name: 'Norimberga Stazione Centrale', type: 'Stazione' },

  // FRANCOFORTE
  { id: 'FRA_AP', city: 'Francoforte', name: 'Francoforte Aeroporto (FRA)', type: 'Aeroporto' },
  { id: 'FRA_HBF', city: 'Francoforte', name: 'Francoforte Stazione Centrale', type: 'Stazione' },

  // MILANO
  { id: 'MIL_MXP', city: 'Milano', name: 'Milano Malpensa (MXP)', type: 'Aeroporto' },
  { id: 'MIL_LIN', city: 'Milano', name: 'Milano Linate (LIN)', type: 'Aeroporto' },
  { id: 'MIL_BGY', city: 'Milano', name: 'Milano Bergamo Orio al Serio (BGY)', type: 'Aeroporto' },
  { id: 'MIL_CTR', city: 'Milano', name: 'Milano Stazione Centrale', type: 'Stazione' },

  // ROMA
  { id: 'ROM_FCO', city: 'Roma', name: 'Roma Fiumicino (FCO)', type: 'Aeroporto' },
  { id: 'ROM_CIA', city: 'Roma', name: 'Roma Ciampino (CIA)', type: 'Aeroporto' },
  { id: 'ROM_TER', city: 'Roma', name: 'Roma Stazione Termini', type: 'Stazione' },

  // VENEZIA
  { id: 'VCE_AP', city: 'Venezia', name: 'Venezia Marco Polo (VCE)', type: 'Aeroporto' },
  { id: 'VCE_PR', city: 'Venezia', name: 'Venezia Piazzale Roma', type: 'Città' },
  { id: 'VCE_ME', city: 'Venezia', name: 'Venezia Mestre Stazione', type: 'Stazione' }
];

// 2. Macro Categories
export const MACRO_CATEGORIES = [
  { code: 'ECONOMY', label: 'Economy / Compact (es. Polo / Golf)' },
  { code: 'PREMIUM_SEDAN', label: 'Berline Premium (es. BMW Serie 3 / Serie 5)' },
  { code: 'SUV', label: 'SUV / Fuoristrada (es. X1 / X5 / Renegade)' },
  { code: 'MINIVAN', label: 'Minivan / 7-9 Posti (es. Touran / Talento)' }
];

// 3. Historical Database per City ($/giorno)
export const HISTORICAL_DATABASE = {
  'Monaco di Baviera': { ECONOMY: 42, PREMIUM_SEDAN: 78, SUV: 85, MINIVAN: 110 },
  'Würzburg': { ECONOMY: 38, PREMIUM_SEDAN: 68, SUV: 72, MINIVAN: 95 },
  'Norimberga': { ECONOMY: 40, PREMIUM_SEDAN: 72, SUV: 78, MINIVAN: 100 },
  'Francoforte': { ECONOMY: 45, PREMIUM_SEDAN: 82, SUV: 88, MINIVAN: 115 },
  'Milano': { ECONOMY: 35, PREMIUM_SEDAN: 65, SUV: 70, MINIVAN: 90 },
  'Roma': { ECONOMY: 36, PREMIUM_SEDAN: 67, SUV: 72, MINIVAN: 92 },
  'Venezia': { ECONOMY: 39, PREMIUM_SEDAN: 70, SUV: 75, MINIVAN: 98 }
};

const initialSlots = [
  {
    id: 'slot_1',
    name: 'Slot 1',
    active: true,
    email: 'utente@email.com',
    city: 'Monaco di Baviera',
    stationId: 'MUC_AP',
    category: 'PREMIUM_SEDAN',
    startDate: '2026-08-10',
    endDate: '2026-08-17',
    maxPrice: 75,
    history: [85, 82, 79, 74, 71],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_2',
    name: 'Slot 2',
    active: true,
    email: 'utente@email.com',
    city: 'Milano',
    stationId: 'MIL_MXP',
    category: 'SUV',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    maxPrice: 70,
    history: [75, 72, 68, 65, 62],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_3',
    name: 'Slot 3',
    active: false,
    email: '',
    city: 'Roma',
    stationId: 'ROM_FCO',
    category: 'ECONOMY',
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
    category: 'MINIVAN',
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
