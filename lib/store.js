/**
 * Persistent Data Store for SIXT Price Intelligence - Multilanguage & Car-Rating Feedback System
 */

// Dizionario Traduzioni Bilingue (IT / EN)
export const I18N = {
  IT: {
    subtitle: "Panoramica Prezzi Città & Filtro Stazioni",
    sec1: "1. Seleziona Città e Categoria",
    macroCity: "Macro Città",
    filterStation: "Filtra Stazione (Opzionale)",
    allStations: "✨ Mostra TUTTE le stazioni di",
    category: "Categoria Veicolo / Codice ACRISS",
    startDate: "Data Inizio",
    endDate: "Data Fine",
    btnSearch: "MOSTRA PREZZI E COMPARAZIONE",
    sec2: "2. Risultati per",
    currentPrice: "Prezzo Attuale",
    avgPrice: "Media",
    belowAvg: "SOTTO LA MEDIA",
    aboveAvg: "SOPRA LA MEDIA",
    feedbackTitle: "Lascia un Feedback",
    usernamePlaceholder: "Il tuo Username (es. @tuo_handle)",
    ratingLabel: "Valutazione dell'esperienza:",
    commentPlaceholder: "Scrivi qui cosa ne pensi o come possiamo migliorare...",
    btnSubmitFeedback: "INVIA FEEDBACK",
    feedbackSuccess: "Grazie per la recensione! 🚗🔥"
  },
  EN: {
    subtitle: "City Price Intelligence & Station Filtering",
    sec1: "1. Select City and Category",
    macroCity: "Macro City",
    filterStation: "Filter Station (Optional)",
    allStations: "✨ Show ALL stations in",
    category: "Vehicle Category / ACRISS Code",
    startDate: "Start Date",
    endDate: "End Date",
    btnSearch: "SHOW PRICES & COMPARISON",
    sec2: "2. Results for",
    currentPrice: "Current Price",
    avgPrice: "Avg",
    belowAvg: "BELOW AVERAGE",
    aboveAvg: "ABOVE AVERAGE",
    feedbackTitle: "Leave Feedback",
    usernamePlaceholder: "Your Username (e.g., @your_handle)",
    ratingLabel: "Experience Rating:",
    commentPlaceholder: "Tell us what you think or how we can improve...",
    btnSubmitFeedback: "SUBMIT FEEDBACK",
    feedbackSuccess: "Thank you for your review! 🚗🔥"
  }
};

// Mappatura Stazioni per Macro Città
export const CITY_STATIONS_MAP = {
  'Monaco di Baviera': [
    { id: 'MUC_AP', name: 'Monaco Aeroporto (MUC)', currentPrice: 42, avgPrice: 48 },
    { id: 'MUC_HBF', name: 'Monaco Stazione Centrale', currentPrice: 38, avgPrice: 45 },
    { id: 'MUC_CTR', name: 'Monaco Centro / Stachus', currentPrice: 36, avgPrice: 43 }
  ],
  'Würzburg': [
    { id: 'WUE_HBF', name: 'Würzburg Stazione Centrale', currentPrice: 34, avgPrice: 39 },
    { id: 'WUE_CTR', name: 'Würzburg Nürnberger Str.', currentPrice: 32, avgPrice: 37 }
  ],
  'Norimberga': [
    { id: 'NUE_AP', name: 'Norimberga Aeroporto (NUE)', currentPrice: 39, avgPrice: 42 },
    { id: 'NUE_HBF', name: 'Norimberga Stazione Centrale', currentPrice: 35, avgPrice: 40 }
  ],
  'Francoforte': [
    { id: 'FRA_AP', name: 'Francoforte Aeroporto (FRA)', currentPrice: 46, avgPrice: 52 },
    { id: 'FRA_HBF', name: 'Francoforte Stazione Centrale', currentPrice: 41, avgPrice: 47 }
  ],
  'Milano': [
    { id: 'MIL_MXP', name: 'Milano Malpensa (MXP)', currentPrice: 35, avgPrice: 41 },
    { id: 'MIL_LIN', name: 'Milano Linate (LIN)', currentPrice: 37, avgPrice: 43 },
    { id: 'MIL_CTR', name: 'Milano Stazione Centrale', currentPrice: 36, avgPrice: 42 }
  ],
  'Roma': [
    { id: 'ROM_FCO', name: 'Roma Fiumicino (FCO)', currentPrice: 36, avgPrice: 42 },
    { id: 'ROM_TER', name: 'Roma Stazione Termini', currentPrice: 38, avgPrice: 44 }
  ],
  'Venezia': [
    { id: 'VCE_AP', name: 'Venezia Marco Polo (VCE)', currentPrice: 40, avgPrice: 46 },
    { id: 'VCE_ME', name: 'Venezia Mestre Stazione', currentPrice: 36, avgPrice: 41 }
  ]
};

// Codici ACRISS
export const ACRISS_CATEGORIES = [
  { code: 'ECMR', name: 'Berlina - Fiat 500 (Man)' },
  { code: 'CLMR/CLAR', name: 'Berlina Premium - VW Golf (Man/Auto)' },
  { code: 'FDAR', name: 'Berlina Premium - Alfa Romeo Giulia (Auto)' },
  { code: 'FWAR', name: 'Station Wagon - BMW Serie 3 Touring (Auto)' },
  { code: 'LDAR', name: 'Berlina Premium - BMW Serie 5 (Auto)' },
  { code: 'XFAR', name: 'SUV Premium - BMW X5 (Auto)' }
];

let userFeedbacks = [];
let cronExecutionLogs = [];

export async function addFeedback(feedback) {
  userFeedbacks.unshift({
    id: `fb_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...feedback
  });
  return userFeedbacks[0];
}

export async function getFeedbacks() {
  return userFeedbacks;
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
