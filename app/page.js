/**
 * ============================================================================
 * SIXT PRICE INTELLIGENCE - MULTILANGUAGE & CAR-RATING FEEDBACK SYSTEM
 * ============================================================================
 */

'use client';
import React, { useState } from 'react';

// Mappatura Stazioni per Macro Città
const CITY_STATIONS_MAP = {
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
const ACRISS_CATEGORIES = [
  { code: 'ECMR', name: 'Berlina - Fiat 500 (Man)' },
  { code: 'CLMR/CLAR', name: 'Berlina Premium - VW Golf (Man/Auto)' },
  { code: 'FDAR', name: 'Berlina Premium - Alfa Romeo Giulia (Auto)' },
  { code: 'FWAR', name: 'Station Wagon - BMW Serie 3 Touring (Auto)' },
  { code: 'LDAR', name: 'Berlina Premium - BMW Serie 5 (Auto)' },
  { code: 'XFAR', name: 'SUV Premium - BMW X5 (Auto)' }
];

// Dizionario Traduzioni Bilingue (IT / EN)
const I18N = {
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
    feedbackSuccess: "Grazie per la recensione! 🚗🔥",
    runCronBtn: "⚡ ESEGUI TEST CRON (4-5H LOGIC)",
    cronRunning: "Esecuzione Cron in corso (Jitter Anti-Pattern active)...",
    cronSuccess: "Ciclo Cron completato con successo!",
    cronLogsTitle: "LOG ESECUZIONE CLOUD CRON",
    hideLogs: "Nascondi Log Cloud",
    viewLogs: "Mostra Log Cloud"
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
    feedbackSuccess: "Thank you for your review! 🚗🔥",
    runCronBtn: "⚡ RUN MANUAL CRON CHECK",
    cronRunning: "Cron executing (Anti-Pattern Jitter active)...",
    cronSuccess: "Cron cycle completed successfully!",
    cronLogsTitle: "CLOUD CRON EXECUTION LOGS",
    hideLogs: "Hide Cloud Logs",
    viewLogs: "View Cloud Logs"
  }
};

export default function PriceIntelligenceApp() {
  const [lang, setLang] = useState('IT');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // Feedback Form State
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Main Form State
  const [selectedCity, setSelectedCity] = useState('Monaco di Baviera');
  const [selectedStationFilter, setSelectedStationFilter] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('CLMR/CLAR');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searched, setSearched] = useState(false);

  // Cloud Cron Engine State
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [cronLogs, setCronLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const t = I18N[lang];

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedStationFilter('ALL');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleSendFeedback = () => {
    if (!username || !comment) {
      alert(lang === 'IT' ? 'Compila tutti i campi!' : 'Please fill in all fields!');
      return;
    }
    showToast(`${t.feedbackSuccess} (${username} - ${rating}/5 🚗)`);
    setShowFeedbackModal(false);
    setUsername('');
    setComment('');
    setRating(5);
  };

  const allCityStations = CITY_STATIONS_MAP[selectedCity] || [];
  const displayedStations = selectedStationFilter === 'ALL'
    ? allCityStations
    : allCityStations.filter(s => s.id === selectedStationFilter);

  const handleRunManualCron = async () => {
    setIsCronRunning(true);
    showToast(t.cronRunning);

    try {
      const response = await fetch('/api/cron');
      const data = await response.json();
      
      if (data.status === 'completed') {
        showToast(`${t.cronSuccess} Processed: ${data.processed}, Notifications: ${data.notificationsSent || 0}`);
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
      showToast(`${t.cronSuccess} (${selectedCity})`);
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
        
        {/* Top Navigation Bar: 3-Dots Menu (Left) & Flags (Right) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          
          {/* Menu 3 Puntini (Feedback) */}
          <button 
            onClick={() => setShowFeedbackModal(!showFeedbackModal)} 
            style={iconBtnStyle}
            title="Feedback"
          >
            ⋮
          </button>

          {/* Selettore Lingua con Bandierine */}
          <button 
            onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')} 
            style={langBtnStyle}
          >
            {lang === 'IT' ? '🇮🇹 IT' : '🇬🇧 EN'}
          </button>
        </div>

        {/* Header App */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={titleStyle}>
            SIXT <span style={{ color: '#FF5F00' }}>PRICE INTELLIGENCE</span>
          </h1>
          <p style={subtitleStyle}>{t.subtitle}</p>
        </div>

        {/* MODALE FEEDBACK (Se aperta) */}
        {showFeedbackModal && (
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#FF5F00' }}>{t.feedbackTitle}</span>
              <button onClick={() => setShowFeedbackModal(false)} style={{ background: 'none', border: 'none', color: '#8E8E93', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            </div>

            <input 
              type="text" 
              placeholder={t.usernamePlaceholder} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={inputStyle} 
            />

            {/* Rating con 5 Macchinine 🚗 */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '10px', color: '#8E8E93', marginBottom: '4px' }}>{t.ratingLabel}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: '18px',
                      cursor: 'pointer',
                      filter: star <= rating ? 'none' : 'grayscale(100%) opacity(0.3)',
                      transition: 'transform 0.1s ease'
                    }}
                  >
                    🚗
                  </span>
                ))}
              </div>
            </div>

            <textarea 
              placeholder={t.commentPlaceholder} 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              style={{ ...inputStyle, minHeight: '60px', marginTop: '10px', resize: 'vertical' }} 
            />

            <button onClick={handleSendFeedback} style={{ ...btnStyle, marginTop: '10px' }}>
              {t.btnSubmitFeedback}
            </button>
          </div>
        )}

        {/* CONTROLLI E FILTRI */}
        <div style={sectionBoxStyle}>
          <div style={sectionTitleStyle}>{t.sec1}</div>

          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>{t.macroCity}</label>
            <select value={selectedCity} onChange={handleCityChange} style={selectStyle}>
              {Object.keys(CITY_STATIONS_MAP).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>{t.filterStation}</label>
            <select 
              value={selectedStationFilter} 
              onChange={(e) => setSelectedStationFilter(e.target.value)} 
              style={selectStyle}
            >
              <option value="ALL">{t.allStations} {selectedCity}</option>
              {allCityStations.map(st => (
                <option key={st.id} value={st.id}>📍 {st.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>{t.category}</label>
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

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.startDate}</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.endDate}</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <button onClick={() => setSearched(true)} style={{ ...btnStyle, marginTop: '14px' }}>
            {t.btnSearch}
          </button>
        </div>

        {/* RISULTATI */}
        {searched && (
          <div style={{ ...sectionBoxStyle, marginTop: '16px', border: '1px solid #FF5F00' }}>
            <div style={{ ...sectionTitleStyle, color: '#FF5F00', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.sec2} [{selectedCategory}]</span>
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
                        {t.currentPrice}: <strong style={{ color: '#FF5F00' }}>${st.currentPrice}/gg</strong> ({t.avgPrice}: ${st.avgPrice}/gg)
                      </div>
                    </div>
                    <div style={isGood ? badgeGoodStyle : badgeBadStyle}>
                      {isGood ? `${diffPct}% ${t.belowAvg}` : `+${diffPct}% ${t.aboveAvg}`}
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
            {isCronRunning ? '⏳ CRON CLOUD EXECUTING...' : t.runCronBtn}
          </button>
        </div>

        {/* Toggle Cloud Logs Drawer */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button 
            onClick={() => setShowLogs(!showLogs)}
            style={logToggleBtnStyle}
          >
            {showLogs ? `▲ ${t.hideLogs}` : `▼ ${t.viewLogs}`}
          </button>
        </div>

        {/* Cloud Execution Logs Drawer */}
        {showLogs && (
          <div style={logsDrawerStyle}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#FF5F00', marginBottom: '8px' }}>
              {t.cronLogsTitle} (JITTER 1.5S - 4.0S)
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
const iconBtnStyle = { background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', borderRadius: '10px', padding: '6px 12px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' };
const langBtnStyle = { background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', borderRadius: '10px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' };
const modalStyle = { background: 'rgba(15, 15, 20, 0.95)', border: '1px solid #FF5F00', borderRadius: '16px', padding: '14px', marginBottom: '16px', boxShadow: '0 10px 30px rgba(255, 95, 0, 0.2)' };
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
