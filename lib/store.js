/**
 * Persistent Data Store for SIXT Price Tracker
 * Manages 4 slots, station & full ACRISS category metadata, historical price logs, and notification events.
 */

export const SIXT_STATIONS = [
  { id: 'DE123', name: 'Monaco di Baviera Aeroporto (MUC)' },
  { id: 'IT456', name: 'Milano Malpensa Aeroporto (MXP)' },
  { id: 'IT789', name: 'Roma Fiumicino Aeroporto (FCO)' },
  { id: 'DE999', name: 'Berlino Aeroporto (BER)' },
  { id: 'AT111', name: 'Vienna Aeroporto (VIE)' }
];

export const SIXT_CATEGORIES = [
  { code: 'MCMR', name: 'Berlina - Citroën C1 (Manuale) - 2P/3D' },
  { code: 'ECMR', name: 'Berlina - Fiat 500 (Manuale) - 4P/3D' },
  { code: 'EDMR', name: 'Berlina - VW Polo (Manuale) - 5P/5D' },
  { code: 'CCMR/CCAR', name: 'Berlina Premium - MINI Hatch (Man/Auto) - 4P/3D' },
  { code: 'CDMR', name: 'Berlina - Fiat Tipo (Manuale) - 5P/5D' },
  { code: 'CLMR/CLAR', name: 'Berlina Premium - VW Golf (Man/Auto) - 5P/5D' },
  { code: 'CWMR', name: 'Station Wagon - Fiat Tipo SW (Manuale) - 5P/5D' },
  { code: 'IDMR/IDAR', name: 'Berlina Premium - Alfa Romeo Giulietta (Man/Auto) - 5P/5D' },
  { code: 'ILMR/ILAR', name: 'Berlina Premium - BMW Serie 1 (Man/Auto) - 5P/5D' },
  { code: 'SDMR/SDAR', name: 'Berlina Premium - BMW Serie 2 Active Tourer (Man/Auto) - 5P/5D' },
  { code: 'SWAR', name: 'Station Wagon Premium - BMW Serie 2 Grand Tourer (Auto) - 5P/5D' },
  { code: 'FDAR', name: 'Berlina Premium - Alfa Romeo Giulia (Auto) - 5P/5D' },
  { code: 'FWAR', name: 'Station Wagon Premium - BMW Serie 3 Touring (Auto) - 5P/5D' },
  { code: 'PDAR', name: 'Berlina Premium - Audi A5 Sportback (Auto) - 5P/5D' },
  { code: 'LDAR', name: 'Berlina Premium - BMW Serie 5 (Auto) - 5P/5D' },
  { code: 'LWAR', name: 'Station Wagon Premium - BMW Serie 5 Touring (Auto) - 5P/5D' },
  { code: 'XCAR', name: 'Berlina Premium - BMW Serie 6 GT (Auto) - 5P/5D' },
  { code: 'XDAR', name: 'Berlina Premium - BMW Serie 7 (Auto) - 5P/5D' },
  { code: 'XSAR', name: 'Berlina Premium - BMW Serie 8 (Auto) - 5P/5D' },
  { code: 'FSAR', name: 'Coupé Premium - BMW Serie 2 Coupé (Auto) - 4P/3D' },
  { code: 'LSAR', name: 'Coupé Premium - BMW Serie 4 Gran Coupé (Auto) - 5P/5D' },
  { code: 'CVMR', name: 'Minivan - Fiat Qubo (Manuale) - 5P/5D' },
  { code: 'IVAR', name: 'Minivan - VW Touran 7S (Auto) - 7P/5D' },
  { code: 'SVAR', name: 'Minivan - Peugeot 5008 (Auto) - 7P/5D' },
  { code: 'FVMR/FVAR', name: 'Minivan - Fiat Talento (Man/Auto) - 9P/5D' },
  { code: 'CTMR/CTAR', name: 'Cabriolet - Fiat 500C (Man/Auto) - 4P/3D' },
  { code: 'STAR', name: 'Cabriolet - BMW Serie 2 Cabrio (Auto) - 4P/3D' },
  { code: 'LTAR', name: 'Cabriolet - BMW Serie 4 Cabrio (Auto) - 4P/3D' },
  { code: 'PTAR', name: 'Cabriolet - BMW Z4 (Auto) - 2P/3D' },
  { code: 'CFMR', name: 'Fuoristrada / SUV - Fiat 500X (Manuale) - 5P/5D' },
  { code: 'IFMR/IFAR', name: 'Fuoristrada / SUV - Jeep Renegade (Man/Auto) - 5P/5D' },
  { code: 'SFMR/SFAR', name: 'Fuoristrada / SUV - Ford Kuga (Man/Auto) - 5P/5D' },
  { code: 'FFAR', name: 'Fuoristrada / SUV - BMW X1 (Auto) - 5P/5D' },
  { code: 'PFAR', name: 'Fuoristrada / SUV - Jaguar I-Pace (Auto) - 5P/5D' },
  { code: 'XFAR', name: 'Fuoristrada / SUV - BMW X5 (Auto) - 5P/5D' }
];

const initialSlots = [
  {
    id: 'slot_1',
    name: 'Slot 1',
    active: true,
    email: 'utente@email.com',
    location: 'DE123',
    startDate: '2026-08-10',
    endDate: '2026-08-17',
    category: 'LSAR',
    maxPrice: 85,
    history: [85, 82, 79, 74, 71],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_2',
    name: 'Slot 2',
    active: true,
    email: 'utente@email.com',
    location: 'IT456',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    category: 'XFAR',
    maxPrice: 140,
    history: [140, 135, 128, 130, 122],
    lastChecked: new Date().toISOString()
  },
  {
    id: 'slot_3',
    name: 'Slot 3',
    active: false,
    email: '',
    location: '',
    startDate: '',
    endDate: '',
    category: '',
    maxPrice: '',
    history: [],
    lastChecked: null
  },
  {
    id: 'slot_4',
    name: 'Slot 4',
    active: false,
    email: '',
    location: '',
    startDate: '',
    endDate: '',
    category: '',
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

export async function getSlotById(id) {
  return slotsData.find(s => s.id === id || s.id === `slot_${id + 1}`) || slotsData[0];
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
