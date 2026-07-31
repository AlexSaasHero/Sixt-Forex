/**
 * Persistent Data Store for SIXT Price Tracker
 * Manages 4 slots, station & full ACRISS category metadata, historical price logs, and notification events.
 */

// Lista Punti di Ritiro e Stazioni Sixt Principali
export const SIXT_STATIONS = [
  // --- AEROPORTI ITALIA ---
  { id: 'IT_MXP', name: 'Milano Malpensa Aeroporto T1 (MXP)', group: 'Aeroporti Italia' },
  { id: 'IT_LIN', name: 'Milano Linate Aeroporto (LIN)', group: 'Aeroporti Italia' },
  { id: 'IT_BGY', name: 'Bergamo Orio al Serio Aeroporto (BGY)', group: 'Aeroporti Italia' },
  { id: 'IT_FCO', name: 'Roma Fiumicino Aeroporto (FCO)', group: 'Aeroporti Italia' },
  { id: 'IT_CIA', name: 'Roma Ciampino Aeroporto (CIA)', group: 'Aeroporti Italia' },
  { id: 'IT_VCE', name: 'Venezia Marco Polo Aeroporto (VCE)', group: 'Aeroporti Italia' },
  { id: 'IT_TRS', name: 'Trieste Ronchi dei Legionari Aeroporto (TRS)', group: 'Aeroporti Italia' },
  { id: 'IT_BLQ', name: 'Bologna Guglielmo Marconi Aeroporto (BLQ)', group: 'Aeroporti Italia' },
  { id: 'IT_NAP', name: 'Napoli Capodichino Aeroporto (NAP)', group: 'Aeroporti Italia' },
  { id: 'IT_TRN', name: 'Torino Caselle Aeroporto (TRN)', group: 'Aeroporti Italia' },
  { id: 'IT_PSA', name: 'Pisa Galileo Galilei Aeroporto (PSA)', group: 'Aeroporti Italia' },
  { id: 'IT_FLR', name: 'Firenze Peretola Aeroporto (FLR)', group: 'Aeroporti Italia' },
  { id: 'IT_CTA', name: 'Catania Fontanarossa Aeroporto (CTA)', group: 'Aeroporti Italia' },
  { id: 'IT_PMO', name: 'Palermo Falcone Borsellino Aeroporto (PMO)', group: 'Aeroporti Italia' },
  { id: 'IT_CAG', name: 'Cagliari Elmas Aeroporto (CAG)', group: 'Aeroporti Italia' },
  { id: 'IT_OLB', name: 'Olbia Costa Smeralda Aeroporto (OLB)', group: 'Aeroporti Italia' },

  // --- STAZIONI & CITTÀ ITALIA ---
  { id: 'IT_MIL_CENTRALE', name: 'Milano Stazione Centrale', group: 'Stazioni & Città Italia' },
  { id: 'IT_ROM_TERMINI', name: 'Roma Stazione Termini', group: 'Stazioni & Città Italia' },
  { id: 'IT_VEN_PZLE_ROMA', name: 'Venezia Piazzale Roma', group: 'Stazioni & Città Italia' },
  { id: 'IT_FLR_CENTRALE', name: 'Firenze Stazione Santa Maria Novella', group: 'Stazioni & Città Italia' },
  { id: 'IT_NAP_CENTRALE', name: 'Napoli Stazione Centrale', group: 'Stazioni & Città Italia' },
  { id: 'IT_TOR_PORTA_NUOVA', name: 'Torino Stazione Porta Nuova', group: 'Stazioni & Città Italia' },

  // --- AEROPORTI INTERNAZIONALI PRINCIPALI ---
  { id: 'DE_MUC', name: 'Monaco di Baviera Aeroporto (MUC)', group: 'Aeroporti Internazionali' },
  { id: 'DE_FRA', name: 'Francoforte sul Meno Aeroporto (FRA)', group: 'Aeroporti Internazionali' },
  { id: 'DE_BER', name: 'Berlino Brandeburgo Aeroporto (BER)', group: 'Aeroporti Internazionali' },
  { id: 'AT_VIE', name: 'Vienna Schwechat Aeroporto (VIE)', group: 'Aeroporti Internazionali' },
  { id: 'ES_BCN', name: 'Barcellona El Prat Aeroporto (BCN)', group: 'Aeroporti Internazionali' },
  { id: 'ES_MAD', name: 'Madrid Barajas Aeroporto (MAD)', group: 'Aeroporti Internazionali' },
  { id: 'FR_CDG', name: 'Parigi Charles de Gaulle Aeroporto (CDG)', group: 'Aeroporti Internazionali' },
  { id: 'FR_NCE', name: 'Nizza Costa Azzurra Aeroporto (NCE)', group: 'Aeroporti Internazionali' }
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
    location: 'DE_MUC',
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
    location: 'IT_MXP',
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
