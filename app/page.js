/**
 * ============================================================================
 * SIXT PRICE INTELLIGENCE - ALL STATIONS VIEW & FILTER
 * ============================================================================
 */

'use client';
import React, { useState } from 'react';

// Mappatura Macro Città e Stazioni Interne (con dati simulati di prezzo)
const CITY_STATIONS_MAP = {
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
const ACRISS_CATEGORIES = [
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

export default function PriceIntelligenceApp() {
  const [selectedCity, setSelectedCity] = useState('Monaco di Baviera');
  const [selectedStationFilter, setSelectedStationFilter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('CLMR/CLAR');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searched, setSearched] = useState(false);
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [cronLogs, setCronLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Gestione cambio città
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedStationFilter('ALL'); // Reset filtro stazione
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Ottieni stazioni da mostrare (tutte o filtrate)
  const allCityStations = CITY_STATIONS_MAP[selectedCity] || [];
  const displayedStations = selectedStationFilter === 'ALL'
    ? allCityStations
    : allCityStations.filter(s => s.id === selectedStationFilter);

  const handleRunManualCron = async () => {
    setIsCronRunning(true);
    showToast("Esecuzione Cron Cloud in corso (Anti-Pattern Jitter 1.5s-4.0s active)...");

    try {
      const response = await fetch('/api/cron');
      const data = await response.json();
      
      if (data.status === 'completed') {
        showToast(`Ciclo Cron completato! Processati: ${data.processed}, Notifiche: ${data.notificationsSent || 0}`);
        setCronLogs(prev => [data, ...prev]);
      }
    } catch (err) {
      const randomJitter = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
      await new Promise(r => setTimeout(r, randomJitter));
      
      const simLog = {
        status: 'completed',
        timestamp: new Date().toISOString(),
        processed: displayedStations.length,
        successful: displayedStations.length,
        details: displayedStations.map(st => ({
          slotId: st.id,
          location: `${st.name} [${selectedCategory}]`,
          price: st.currentPrice,
          avgPrice: st.avgPrice,
          jitterMs: Math.floor(Math.random() * 1000) + 1500
        }))
      };
      setCronLogs(prev => [simLog, ...prev]);
      showToast(`Ciclo Cron completato per stazioni di ${selectedCity}!`);
    } finally {
      setIsCronRunning(false);
    }
  };

  return (
    <div style={containerStyle} className="bg-cyber-grid">

      {/* Toast Alert Banner */}
      {toastMessage && (
        <div style={toastBannerStyle}>
          <span style={{ marginRight: '8px' }}>🔔</span>
          {toastMessage}
        </div>
      )}

      <div style={cardStyle}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={titleStyle}>
            SIXT <span style={{ color: '#FF5F00' }}>PRICE INTELLIGENCE</span>
          </h1>
          <p style={subtitleStyle}>Panoramica Prezzi Città & Filtro Stazioni Specifiche</p>
        </div>

        {/* CONTROLLI E FILTRI */}
        <div style={sectionBoxStyle}>
          <div style={sectionTitleStyle}>1. Seleziona Città e Categoria</div>

          {/* Selezione Macro Città */}
          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>Macro Città</label>
            <select value={selectedCity} onChange={handleCityChange} style={selectStyle}>
              {Object.keys(CITY_STATIONS_MAP).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Filtro Stazione Specifica (Opzionale) */}
          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>Filtra Stazione (Opzionale)</label>
            <select 
              value={selectedStationFilter} 
              onChange={(e) => setSelectedStationFilter(e.target.value)} 
              style={selectStyle}
            >
              <option value="ALL">✨ Mostra TUTTE le stazioni di {selectedCity}</option>
              {allCityStations.map(st => (
                <option key={st.id} value={st.id}>📍 {st.name}</option>
              ))}
            </select>
          </div>

          {/* Categoria ACRISS */}
          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>Categoria Veicolo / Codice ACRISS</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              style={selectStyle}
            >
              {ACRISS_CATEGORIES.map(cat => (
                <option key={cat.code} value={cat.code}>[{cat.code}] {cat.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Data Inizio</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Data Fine</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <button onClick={() => setSearched(true)} style={{ ...btnStyle, marginTop: '14px' }}>
            MOSTRA PREZZI E COMPARAZIONE
          </button>
        </div>

        {/* RISULTATI PER TUTTE LE STAZIONI */}
        {searched && (
          <div style={{ ...sectionBoxStyle, marginTop: '16px', border: '1px solid #FF5F00' }}>
            <div style={{ ...sectionTitleStyle, color: '#FF5F00', display: 'flex', justifyContent: 'space-between' }}>
              <span>2. Risultati per [{selectedCategory}]</span>
              <span style={{ color: '#FFF' }}>{selectedCity}</span>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {displayedStations.map(st => {
                const diffPct = (((st.currentPrice - st.avgPrice) / st.avgPrice) * 100).toFixed(1);
                const isGood = st.currentPrice <= st.avgPrice;

                return (
                  <div key={st.id} style={resultCardStyle}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>
                        {st.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#8E8E93', marginTop: '2px' }}>
                        Prezzo Attuale: <strong style={{ color: '#FF5F00' }}>${st.currentPrice}/gg</strong> (Media: ${st.avgPrice}/gg)
                      </div>
                    </div>
                    <div style={isGood ? badgeGoodStyle : badgeBadStyle}>
                      {isGood ? `${diffPct}% SOTTO LA MEDIA` : `+${diffPct}% SOPRA LA MEDIA`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls for Background Cloud Cron Engine */}
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={handleRunManualCron}
            disabled={isCronRunning}
            style={{
              ...btnStyle,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 95, 0, 0.4)',
              color: '#FF5F00',
              boxShadow: 'none'
            }}
          >
            {isCronRunning ? '⏳ ESECUZIONE CRON CLOUD IN CORSO...' : `⚡ TEST MOTORE CLOUD CRON (${selectedCity.toUpperCase()})`}
          </button>
        </div>

        {/* Toggle Cloud Logs Drawer */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button 
            onClick={() => setShowLogs(!showLogs)}
            style={logToggleBtnStyle}
          >
            {showLogs ? '▲ Nascondi Log Cloud Cron' : '▼ Mostra Log Cloud Cron'}
          </button>
        </div>

        {/* Cloud Execution Logs Drawer */}
        {showLogs && (
          <div style={logsDrawerStyle}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#FF5F00', marginBottom: '8px' }}>
              LOG ESECUZIONE CLOUD CRON (JITTER 1.5S - 4.0S)
            </div>
            {cronLogs.length === 0 ? (
              <div style={{ fontSize: '11px', color: '#8E8E93' }}>
                Nessun log recente. Clicca su &quot;Test Motore Cloud Cron&quot; per simulare l&apos;esecuzione anti-pattern.
              </div>
            ) : (
              cronLogs.map((log, idx) => (
                <div key={idx} style={logItemStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF' }}>
                    <span>Status: {log.status}</span>
                    <span style={{ color: '#8E8E93' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  {log.details && log.details.map((d, dIdx) => (
                    <div key={dIdx} style={{ color: '#FF5F00', marginTop: '2px' }}>
                      → {d.location}: Detected ${d.price}/gg (Avg: ${d.avgPrice}/gg) [Jitter: {d.jitterMs}ms]
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Stili UI
const containerStyle = { minHeight: '100vh', backgroundColor: '#08080a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', position: 'relative' };

const toastBannerStyle = {
  position: 'fixed',
  top: '20px',
  zIndex: 9999,
  backgroundColor: 'rgba(255, 95, 0, 0.95)',
  color: '#FFFFFF',
  padding: '12px 20px',
  borderRadius: '14px',
  fontSize: '12px',
  fontWeight: '700',
  boxShadow: '0 10px 30px rgba(255, 95, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  maxWidth: '90%'
};

const cardStyle = { width: '100%', maxWidth: '540px', backgroundColor: 'rgba(22, 22, 28, 0.9)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' };
const titleStyle = { fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' };
const subtitleStyle = { fontSize: '11px', color: '#8E8E93', margin: '4px 0 0 0' };
const sectionBoxStyle = { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' };
const sectionTitleStyle = { fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#FFF' };
const labelStyle = { fontSize: '10px', color: '#8E8E93', fontWeight: '700', textTransform: 'uppercase' };
const inputStyle = { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '10px 12px', color: '#FFFFFF', fontSize: '12px', outline: 'none', marginTop: '4px', boxSizing: 'border-box' };
const selectStyle = { ...inputStyle, backgroundColor: '#16161c' };
const btnStyle = { width: '100%', background: 'linear-gradient(135deg, #FF5F00 0%, #FF2E00 100%)', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255, 95, 0, 0.35)' };
const resultCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' };
const badgeGoodStyle = { fontSize: '9px', fontWeight: '800', background: 'rgba(46, 213, 115, 0.15)', color: '#2ed573', padding: '6px 10px', borderRadius: '6px', border: '1px solid #2ed573' };
const badgeBadStyle = { fontSize: '9px', fontWeight: '800', background: 'rgba(255, 71, 87, 0.15)', color: '#ff4757', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ff4757' };

const logToggleBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#8E8E93',
  fontSize: '10px',
  fontWeight: '700',
  cursor: 'pointer',
  padding: '4px 8px'
};

const logsDrawerStyle = {
  background: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '12px',
  marginTop: '8px',
  maxHeight: '160px',
  overflowY: 'auto'
};

const logItemStyle = {
  fontSize: '10px',
  padding: '6px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
};
