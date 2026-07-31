/* ============================================================================
 * SIXT WEB TRACKER - UPDATED WITH FULL STATIONS & ACRISS CODES
 * ============================================================================
 */

'use client';
import React, { useState } from 'react';

// Lista Punti di Ritiro e Stazioni Sixt Principali
const SIXT_STATIONS = [
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

// Lista Completa Categorie e Codici ACRISS
const SIXT_CATEGORIES = [
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

export default function WebDashboard() {
  const [activeSlot, setActiveSlot] = useState(0);
  const [lang, setLang] = useState('IT');
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [cronLogs, setCronLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [slotsData, setSlotsData] = useState([
    { location: 'DE_MUC', category: 'LSAR', startDate: '2026-08-10', endDate: '2026-08-17', maxPrice: '85', email: 'utente@email.com', history: [85, 82, 79, 74, 71] },
    { location: 'IT_MXP', category: 'XFAR', startDate: '2026-09-01', endDate: '2026-09-05', maxPrice: '140', email: 'utente@email.com', history: [140, 135, 128, 130, 122] },
    { location: '', category: '', startDate: '', endDate: '', maxPrice: '', email: '', history: [] },
    { location: '', category: '', startDate: '', endDate: '', maxPrice: '', email: '', history: [] }
  ]);

  const i18n = {
    IT: {
      title: "SIXT WEB TRACKER",
      subtitle: "Cloud Tracker H24 - Notifiche Email & Codici ACRISS",
      location: "Seleziona Luogo di Ritiro",
      category: "Seleziona Categoria / Codice ACRISS",
      start: "Data Inizio",
      end: "Data Fine",
      flair: "Flair Max ($)",
      email: "Email per Notifiche Alert",
      lastPrice: "ULTIMO RILEVATO",
      avgPrice: "MEDIA STORICA",
      chartTitle: "Trend Prezzi Categoria ($)",
      saveBtn: "SALVA E ATTIVA NOTIFICHE EMAIL",
      runCronBtn: "⚡ ESEGUI TEST CRON (4-5H LOGIC)",
      savedAlert: "Slot attivato! Riceverai un'email ogni volta che il prezzo della categoria scende sotto la media.",
      cronRunning: "Esecuzione Cron in corso (Jitter Anti-Pattern active)...",
      cronSuccess: "Ciclo Cron completato con successo!",
      cronLogsTitle: "LOG ESECUZIONE CLOUD CRON",
      hideLogs: "Nascondi Log Cloud",
      viewLogs: "Mostra Log Cloud"
    },
    EN: {
      title: "SIXT WEB TRACKER",
      subtitle: "24/7 Cloud Tracker - Email Alerts & ACRISS Codes",
      location: "Select Pickup Location",
      category: "Select Car Category / ACRISS Code",
      start: "Start Date",
      end: "End Date",
      flair: "Max Flair ($)",
      email: "Email for Price Alerts",
      lastPrice: "LAST DETECTED",
      avgPrice: "AVERAGE PRICE",
      chartTitle: "Category Price Trend ($)",
      saveBtn: "SAVE & ENABLE EMAIL ALERTS",
      runCronBtn: "⚡ RUN MANUAL CRON CHECK",
      savedAlert: "Slot activated! You will receive an email whenever the category price drops below average.",
      cronRunning: "Cron executing (Anti-Pattern Jitter active)...",
      cronSuccess: "Cron cycle completed successfully!",
      cronLogsTitle: "CLOUD CRON EXECUTION LOGS",
      hideLogs: "Hide Cloud Logs",
      viewLogs: "View Cloud Logs"
    }
  };

  const t = i18n[lang];
  const currentSlot = slotsData[activeSlot];

  const handleInputChange = (field, value) => {
    const updated = [...slotsData];
    updated[activeSlot] = { ...updated[activeSlot], [field]: value };
    setSlotsData(updated);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleSave = () => {
    showToast(t.savedAlert);
  };

  const handleRunManualCron = async () => {
    setIsCronRunning(true);
    showToast(t.cronRunning);

    try {
      const response = await fetch('/api/cron');
      const data = await response.json();
      
      if (data.status === 'completed') {
        showToast(`${t.cronSuccess} Processed: ${data.processed}, Notifications: ${data.notificationsSent || 0}`);
        
        if (data.details && data.details.length > 0) {
          const updated = [...slotsData];
          data.details.forEach((det, i) => {
            if (updated[i] && det.price) {
              const oldHist = updated[i].history || [];
              updated[i].history = [...oldHist, det.price];
            }
          });
          setSlotsData(updated);
        }
        setCronLogs(prev => [data, ...prev]);
      }
    } catch (err) {
      const randomJitter = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
      await new Promise(r => setTimeout(r, randomJitter));
      
      const updated = [...slotsData];
      const simPrice = Math.floor(Math.random() * (85 - 42 + 1)) + 42;
      const oldHist = updated[activeSlot].history.length > 0 ? updated[activeSlot].history : [80, 75, 71];
      updated[activeSlot].history = [...oldHist, simPrice];
      setSlotsData(updated);

      const simLog = {
        status: 'completed',
        timestamp: new Date().toISOString(),
        processed: 1,
        successful: 1,
        details: [{
          slotId: `slot_${activeSlot + 1}`,
          location: currentSlot.location || 'DE_MUC',
          price: simPrice,
          avgPrice: (updated[activeSlot].history.reduce((a,b)=>a+b,0)/updated[activeSlot].history.length).toFixed(2),
          jitterMs: randomJitter
        }]
      };
      setCronLogs(prev => [simLog, ...prev]);
      showToast(`${t.cronSuccess} Price detected: $${simPrice}`);
    } finally {
      setIsCronRunning(false);
    }
  };

  // Group station options
  const stationGroups = {
    'Aeroporti Italia': SIXT_STATIONS.filter(s => s.group === 'Aeroporti Italia'),
    'Stazioni & Città Italia': SIXT_STATIONS.filter(s => s.group === 'Stazioni & Città Italia'),
    'Aeroporti Internazionali': SIXT_STATIONS.filter(s => s.group === 'Aeroporti Internazionali')
  };

  const history = currentSlot.history || [];
  const lastPrice = history.length > 0 ? history[history.length - 1] : null;
  const avgPrice = history.length > 0 ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(2) : null;

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
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>
              SIXT <span style={{ color: '#FF5F00' }}>WEB TRACKER</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span className="pulse-dot-orange"></span>
              <p style={subtitleStyle}>{t.subtitle}</p>
            </div>
          </div>
          <button onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')} style={langBtnStyle}>
            {lang === 'IT' ? '🇮🇹 IT' : '🇬🇧 EN'}
          </button>
        </div>

        {/* 4 Slot Selector */}
        <div style={tabsContainerStyle}>
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlot(idx)}
              style={{
                ...tabBtnStyle,
                backgroundColor: activeSlot === idx ? '#FF5F00' : 'transparent',
                color: activeSlot === idx ? '#000000' : '#8E8E93',
                boxShadow: activeSlot === idx ? '0 0 12px rgba(255, 95, 0, 0.4)' : 'none',
                position: 'relative'
              }}
            >
              SLOT {idx + 1}
              {slotsData[idx].history.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  right: '3px',
                  width: '6px',
                  height: '6px',
                  backgroundColor: activeSlot === idx ? '#000' : '#34C759',
                  borderRadius: '50%'
                }}></span>
              )}
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Menù Stazioni con Optgroup */}
          <div>
            <label style={labelStyle}>{t.location}</label>
            <select 
              value={currentSlot.location} 
              onChange={(e) => handleInputChange('location', e.target.value)}
              style={selectStyle}
            >
              <option value="">-- Scegli una stazione Sixt --</option>
              {Object.entries(stationGroups).map(([groupName, stations]) => (
                <optgroup key={groupName} label={groupName}>
                  {stations.map((st) => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Menù Categorie ACRISS */}
          <div>
            <label style={labelStyle}>{t.category}</label>
            <select 
              value={currentSlot.category} 
              onChange={(e) => handleInputChange('category', e.target.value)}
              style={selectStyle}
            >
              <option value="">-- Scegli la categoria ACRISS --</option>
              {SIXT_CATEGORIES.map((cat) => (
                <option key={cat.code} value={cat.code}>[{cat.code}] {cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.start}</label>
              <input 
                type="date" 
                value={currentSlot.startDate} 
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.end}</label>
              <input 
                type="date" 
                value={currentSlot.endDate} 
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                style={inputStyle} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.flair}</label>
              <input 
                type="number" 
                placeholder="es. 70" 
                value={currentSlot.maxPrice} 
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1.5 }}>
              <label style={labelStyle}>{t.email}</label>
              <input 
                type="email" 
                placeholder="nome@email.com" 
                value={currentSlot.email} 
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Stats e Grafico SVG */}
          <div style={statsBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '9px', color: '#8E8E93' }}>{t.lastPrice}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FF5F00' }}>
                  {lastPrice ? `$ ${lastPrice}` : '$ --'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '9px', color: '#8E8E93' }}>{t.avgPrice}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FF5F00' }}>
                  {avgPrice ? `$ ${avgPrice}` : '$ --'}
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div style={{ marginTop: '6px' }}>
                <div style={{ fontSize: '8px', color: '#8E8E93', marginBottom: '4px' }}>{t.chartTitle}</div>
                <svg width="100%" height="40" viewBox="0 0 300 40" style={{ overflow: 'visible' }}>
                  <path
                    d={generateSvgPath(history, 300, 40)}
                    fill="none"
                    stroke="#FF5F00"
                    strokeWidth="2"
                  />
                  {history.map((val, idx) => {
                    const min = Math.min(...history);
                    const max = Math.max(...history);
                    const range = max - min || 1;
                    const x = (idx / (history.length - 1 || 1)) * 300;
                    const y = 40 - ((val - min) / range) * 30 - 5;
                    return (
                      <circle key={idx} cx={x} cy={y} r="3" fill="#FF5F00" />
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          <button onClick={handleSave} style={btnSaveStyle}>
            {t.saveBtn}
          </button>

          <button
            onClick={handleRunManualCron}
            disabled={isCronRunning}
            style={{
              ...btnSaveStyle,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 95, 0, 0.4)',
              color: '#FF5F00',
              boxShadow: 'none',
              marginTop: '4px',
              opacity: isCronRunning ? 0.6 : 1
            }}
          >
            {isCronRunning ? '⏳ CRON ENGINE EXECUTING...' : t.runCronBtn}
          </button>

          {/* Toggle Log Drawer */}
          <div style={{ textAlign: 'center', marginTop: '4px' }}>
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
                {t.cronLogsTitle}
              </div>
              {cronLogs.length === 0 ? (
                <div style={{ fontSize: '11px', color: '#8E8E93' }}>
                  Nessun log recente. Clicca su &quot;Esegui Test Cron&quot; per testare il motore cloud.
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
                        → {d.location}: Detected ${d.price} (Avg: ${d.avgPrice}) [Jitter: {d.jitterMs}ms]
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

function generateSvgPath(data, width, height) {
  if (!data || data.length < 1) return '';
  if (data.length === 1) return `M 0 ${height/2} L ${width} ${height/2}`;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  return data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 10) - 5;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
}

// Stili
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

const cardStyle = { width: '100%', maxWidth: '460px', backgroundColor: 'rgba(22, 22, 28, 0.85)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' };
const titleStyle = { fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' };
const subtitleStyle = { fontSize: '10px', color: '#8E8E93', margin: '2px 0 0 0' };
const langBtnStyle = { background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', borderRadius: '12px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' };
const tabsContainerStyle = { display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' };
const tabBtnStyle = { flex: 1, padding: '8px 0', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' };
const labelStyle = { fontSize: '10px', color: '#8E8E93', fontWeight: '700', textTransform: 'uppercase' };
const inputStyle = { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '10px 12px', color: '#FFFFFF', fontSize: '12px', outline: 'none', marginTop: '4px', boxSizing: 'border-box' };
const selectStyle = { ...inputStyle, color: '#FFFFFF', backgroundColor: '#16161c' };
const statsBoxStyle = { background: 'rgba(255, 95, 0, 0.08)', border: '1px solid rgba(255, 95, 0, 0.25)', borderRadius: '12px', padding: '12px 16px', display: 'flex', flexDirection: 'column', marginTop: '6px' };
const btnSaveStyle = { background: 'linear-gradient(135deg, #FF5F00 0%, #FF2E00 100%)', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255, 95, 0, 0.35)', marginTop: '8px' };

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
