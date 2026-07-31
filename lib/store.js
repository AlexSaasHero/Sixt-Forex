/**
 * Persistent Data Store for SIXT Price Tracker
 * Manages 4 slots, historical price logs, and notification events.
 */

const initialSlots = [
  {
    id: 'slot_1',
    name: 'Slot 1',
    active: true,
    userEmail: 'utente@email.com',
    location: 'Monaco Aeroporto',
    startDate: '2026-08-10',
    endDate: '2026-08-17',
    category: 'CLA Shooting Brake',
    maxPriceFlair: 70,
    lastPrice: 62,
    avgPrice: 66.40,
    lastChecked: new Date().toISOString(),
    history: [
      { timestamp: new Date(Date.now() - 3600000 * 20).toISOString(), price: 68 },
      { timestamp: new Date(Date.now() - 3600000 * 15).toISOString(), price: 69 },
      { timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), price: 66 },
      { timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), price: 64 },
      { timestamp: new Date().toISOString(), price: 62 }
    ]
  },
  {
    id: 'slot_2',
    name: 'Slot 2',
    active: false,
    userEmail: 'utente@email.com',
    location: 'Milano Malpensa',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    category: 'BMW Serie 3',
    maxPriceFlair: 85,
    lastPrice: null,
    avgPrice: null,
    lastChecked: null,
    history: []
  },
  {
    id: 'slot_3',
    name: 'Slot 3',
    active: false,
    userEmail: 'utente@email.com',
    location: 'Roma Fiumicino',
    startDate: '2026-10-12',
    endDate: '2026-10-19',
    category: 'Audi A4 Avant',
    maxPriceFlair: 75,
    lastPrice: null,
    avgPrice: null,
    lastChecked: null,
    history: []
  },
  {
    id: 'slot_4',
    name: 'Slot 4',
    active: false,
    userEmail: 'utente@email.com',
    location: 'Zurigo Aeroporto',
    startDate: '2026-11-20',
    endDate: '2026-11-25',
    category: 'Porsche Macan',
    maxPriceFlair: 120,
    lastPrice: null,
    avgPrice: null,
    lastChecked: null,
    history: []
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
  const newHistory = [...(slot.history || []), { timestamp: new Date().toISOString(), price: newPrice }];
  
  const sum = newHistory.reduce((acc, curr) => acc + curr.price, 0);
  const avgPrice = parseFloat((sum / newHistory.length).toFixed(2));

  slotsData[index] = {
    ...slot,
    lastPrice: newPrice,
    avgPrice: avgPrice,
    lastChecked: new Date().toISOString(),
    history: newHistory
  };

  return slotsData[index];
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
