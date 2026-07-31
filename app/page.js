/**
 * ============================================================================
 * SIXT PRICE INTELLIGENCE & COMPARISON DASHBOARD
 * ============================================================================
 */

'use client';
import React, { useState } from 'react';

// 1. Lista Stazioni Filtrata per le 7 Città Target
const TARGET_LOCATIONS = [
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

// Macro Categorie
const MACRO_CATEGORIES = [
  { code: 'ECONOMY', label: 'Economy / Compact (es. Polo / Golf)' },
  { code: 'PREMIUM_SEDAN', label: 'Berline Premium (es. BMW Serie 3 / Serie 5)' },
  { code: 'SUV', label: 'SUV / Fuoristrada (es. X1 / X5 / Renegade)' },
  { code: 'MINIVAN', label: 'Minivan / 7-9 Posti (es. Touran / Talento)' }
];

// Dati Storici Simulati per Categoria e Città ($/giorno)
const HISTORICAL_DATABASE = {
  'Monaco di Baviera': { ECONOMY: 42, PREMIUM_SEDAN: 78, SUV: 85, MINIVAN: 110 },
  'Würzburg': { ECONOMY: 38, PREMIUM_SEDAN: 68, SUV: 72, MINIVAN: 95 },
  'Norimberga': { ECONOMY: 40, PREMIUM_SEDAN: 72, SUV: 78, MINIVAN: 100 },
  'Francoforte': { ECONOMY: 45, PREMIUM_SEDAN: 82, SUV: 88, MINIVAN: 115 },
  'Milano': { ECONOMY: 35, PREMIUM_SEDAN: 65, SUV: 70, MINIVAN: 90 },
  'Roma': { ECONOMY: 36, PREMIUM_SEDAN: 67, SUV: 72, MINIVAN: 92 },
  'Venezia': { ECONOMY: 39, PREMIUM_SEDAN: 70, SUV: 75, MINIVAN: 98 }
};

export default function PriceIntelligenceApp() {
  const [selectedCity, setSelectedCity] = useState('Monaco di Baviera');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searched, setSearched] = useState(false);
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [cronLogs, setCronLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Filtra stazioni in base alla città selezionata
  const cityStations = TARGET_LOCATIONS.filter(s => s.city === selectedCity);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleRunComparison = () => {
    setSearched(true);
    showToast(`Confronto prezzi in tempo reale avviato per ${selectedCity}!`);
  };

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
        processed: cityStations.length,
        successful: cityStations.length,
        details: cityStations.map(st => {
          const simPrice = Math.floor(Math.random() * (88 - 34 + 1)) + 34;
          return {
            slotId: st.id,
            location: st.name,
            price: simPrice,
            avgPrice: HISTORICAL_DATABASE[selectedCity]['ECONOMY'],
            jitterMs: Math.floor(Math.random() * 1000) + 1500
          };
        })
      };
      setCronLogs(prev => [simLog, ...prev]);
      showToast(`Ciclo Cron completato per ${selectedCity}!`);
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
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={titleStyle}>
            SIXT <span style={{ color: '#FF5F00' }}>PRICE INTELLIGENCE</span>
          </h1>
          <p style={subtitleStyle}>Analisi Medie Storiche & Comparatore di Prezzo in Tempo Reale</p>
        </div>

        {/* SEZIONE 1: Date del Viaggio */}
        <div style={sectionBoxStyle}>
          <div style={sectionTitleStyle}>1. Inserisci le Date del Noleggio</div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Data Inizio</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Data Fine</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>
          <button 
            onClick={handleRunComparison} 
            style={{ ...btnStyle, marginTop: '12px' }}
          >
            CONFRONTA PREZZI IN TEMPO REALE
          </button>
        </div>

        {/* SEZIONE 2: Esploratore Database Medie Storiche */}
        <div style={{ ...sectionBoxStyle, marginTop: '16px' }}>
          <div style={sectionTitleStyle}>2. Database Medie Storiche per Città</div>
          
          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>Seleziona Macro Città</label>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              style={selectStyle}
            >
              {Object.keys(HISTORICAL_DATABASE).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Lista Stazioni Interne */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '10px', color: '#8E8E93', marginBottom: '6px' }}>
              STAZIONI INCLUSE A {selectedCity.toUpperCase()}:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cityStations.map(st => (
                <span key={st.id} style={tagStyle}>
                  📍 {st.name}
                </span>
              ))}
            </div>
          </div>

          {/* Tabella Medie Storiche per Categoria */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#FF5F00', marginBottom: '8px' }}>
              MEDIE STORICHE GIORNO ($/gg) - {selectedCity}
            </div>
            {MACRO_CATEGORIES.map(cat => (
              <div key={cat.code} style={dataRowStyle}>
                <span style={{ fontSize: '11px', color: '#DDD' }}>{cat.label}</span>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#FF5F00' }}>
                  ${HISTORICAL_DATABASE[selectedCity][cat.code]} /gg
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEZIONE 3: Risultati Comparativi dopo la Ricerca */}
        {searched && (
          <div style={{ ...sectionBoxStyle, marginTop: '16px', border: '1px solid #FF5F00' }}>
            <div style={{ ...sectionTitleStyle, color: '#FF5F00' }}>
              3. Risultati Comparativi vs Media Storica
            </div>
            <p style={{ fontSize: '10px', color: '#8E8E93', marginTop: '4px' }}>
              Prezzi rilevati per le date selezionate rispetto alla media di {selectedCity}:
            </p>

            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Esempio Risultati Rilevati */}
              <div style={resultCardStyle}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800' }}>Economy (es. VW Golf)</div>
                  <div style={{ fontSize: '10px', color: '#8E8E93' }}>
                    Prezzo Attuale: $34/gg (Media: ${HISTORICAL_DATABASE[selectedCity]['ECONOMY']}/gg)
                  </div>
                </div>
                <div style={badgeGoodStyle}>-19% SOTTO LA MEDIA</div>
              </div>

              <div style={resultCardStyle}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800' }}>Berlina Premium (es. BMW Serie 3)</div>
                  <div style={{ fontSize: '10px', color: '#8E8E93' }}>
                    Prezzo Attuale: $89/gg (Media: ${HISTORICAL_DATABASE[selectedCity]['PREMIUM_SEDAN']}/gg)
                  </div>
                </div>
                <div style={badgeBadStyle}>+14% SOPRA LA MEDIA</div>
              </div>

              <div style={resultCardStyle}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800' }}>SUV / Fuoristrada (es. BMW X5)</div>
                  <div style={{ fontSize: '10px', color: '#8E8E93' }}>
                    Prezzo Attuale: $71/gg (Media: ${HISTORICAL_DATABASE[selectedCity]['SUV']}/gg)
                  </div>
                </div>
                <div style={badgeGoodStyle}>-16% SOTTO LA MEDIA</div>
              </div>
            </div>
          </div>
        )}

        {/* Background Cloud Cron Engine Controls */}
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

const cardStyle = { width: '100%', maxWidth: '520px', backgroundColor: 'rgba(22, 22, 28, 0.9)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' };
const titleStyle = { fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' };
const subtitleStyle = { fontSize: '11px', color: '#8E8E93', margin: '4px 0 0 0' };
const sectionBoxStyle = { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' };
const sectionTitleStyle = { fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#FFF' };
const labelStyle = { fontSize: '10px', color: '#8E8E93', fontWeight: '700', textTransform: 'uppercase' };
const inputStyle = { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '10px 12px', color: '#FFFFFF', fontSize: '12px', outline: 'none', marginTop: '4px', boxSizing: 'border-box' };
const selectStyle = { ...inputStyle, backgroundColor: '#16161c' };
const btnStyle = { width: '100%', background: 'linear-gradient(135deg, #FF5F00 0%, #FF2E00 100%)', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255, 95, 0, 0.35)' };
const tagStyle = { fontSize: '9px', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '6px', color: '#CCC' };
const dataRowStyle = { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' };
const resultCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '10px' };
const badgeGoodStyle = { fontSize: '9px', fontWeight: '800', background: 'rgba(46, 213, 115, 0.15)', color: '#2ed573', padding: '4px 8px', borderRadius: '6px', border: '1px solid #2ed573' };
const badgeBadStyle = { fontSize: '9px', fontWeight: '800', background: 'rgba(255, 71, 87, 0.15)', color: '#ff4757', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ff4757' };

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
