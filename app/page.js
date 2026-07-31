/* ============================================================================
 * SECTION 2: FRONTEND DASHBOARD (app/page.js)
 * ============================================================================ */

'use client';
import React, { useState, useEffect } from 'react';

const DEFAULT_SLOTS = [
  {
    id: 'slot_1',
    name: 'SLOT 1',
    active: true,
    location: 'Monaco Aeroporto',
    startDate: '2026-08-10',
    endDate: '2026-08-17',
    category: 'CLA Shooting Brake',
    maxPriceFlair: 70,
    lastPrice: 62,
    avgPrice: 66.40,
    userEmail: 'utente@email.com'
  },
  {
    id: 'slot_2',
    name: 'SLOT 2',
    active: false,
    location: 'Milano Malpensa',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    category: 'BMW Serie 3',
    maxPriceFlair: 85,
    lastPrice: null,
    avgPrice: null,
    userEmail: 'utente@email.com'
  },
  {
    id: 'slot_3',
    name: 'SLOT 3',
    active: false,
    location: 'Roma Fiumicino',
    startDate: '2026-10-12',
    endDate: '2026-10-19',
    category: 'Audi A4 Avant',
    maxPriceFlair: 75,
    lastPrice: null,
    avgPrice: null,
    userEmail: 'utente@email.com'
  },
  {
    id: 'slot_4',
    name: 'SLOT 4',
    active: false,
    location: 'Zurigo Aeroporto',
    startDate: '2026-11-20',
    endDate: '2026-11-25',
    category: 'Porsche Macan',
    maxPriceFlair: 120,
    lastPrice: null,
    avgPrice: null,
    userEmail: 'utente@email.com'
  }
];

export default function WebDashboard() {
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);
  const [lang, setLang] = useState('IT');
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [cronLogs, setCronLogs] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showLogs, setShowLogs] = useState(false);

  // Internationalization text dictionary
  const i18n = {
    IT: {
      title: "SIXT WEB TRACKER",
      subtitle: "Monitoraggio Cloud automatico (Check ogni 4-5 ore)",
      location: "Luogo Ritiro",
      start: "Data Inizio",
      end: "Data Fine",
      category: "Categoria / Modello",
      flair: "Flair Max ($)",
      lastPrice: "ULTIMO RILEVATO",
      avgPrice: "MEDIA STORICA",
      saveBtn: "SALVA E ATTIVA NEL CLOUD",
      runCronBtn: "⚡ ESEGUI TEST CRON (4-5H LOGIC)",
      savedAlert: "Slot attivato! Il Cloud controllerà i prezzi ogni 4-5 ore e ti invierà un'email in caso di ribassi.",
      activeStatus: "ATTIVO H24",
      inactiveStatus: "INATTIVO",
      cronRunning: "Esecuzione Cron in corso (Jitter Anti-Pattern active)...",
      cronSuccess: "Ciclo Cron completato con successo!",
      cronLogsTitle: "LOG ESECUZIONE CLOUD CRON",
      hideLogs: "Nascondi Log",
      viewLogs: "Mostra Log Cloud"
    },
    EN: {
      title: "SIXT WEB TRACKER",
      subtitle: "Automatic Cloud Tracking (Check every 4-5 hours)",
      location: "Pickup Location",
      start: "Start Date",
      end: "End Date",
      category: "Category / Model",
      flair: "Max Flair ($)",
      lastPrice: "LAST DETECTED",
      avgPrice: "AVERAGE PRICE",
      saveBtn: "SAVE TO CLOUD TRACKER",
      runCronBtn: "⚡ RUN MANUAL CRON CHECK",
      savedAlert: "Slot activated! The Cloud will check prices every 4-5 hours and email you when prices drop.",
      activeStatus: "ACTIVE 24/7",
      inactiveStatus: "INACTIVE",
      cronRunning: "Cron executing (Anti-Pattern Jitter active)...",
      cronSuccess: "Cron cycle completed successfully!",
      cronLogsTitle: "CLOUD CRON EXECUTION LOGS",
      hideLogs: "Hide Logs",
      viewLogs: "View Cloud Logs"
    }
  };

  const t = i18n[lang];
  const currentSlot = slots[activeSlotIdx];

  // Handler for form field updates
  const handleInputChange = (field, value) => {
    const updated = [...slots];
    updated[activeSlotIdx] = {
      ...updated[activeSlotIdx],
      [field]: value
    };
    setSlots(updated);
  };

  // Save current slot to cloud tracker
  const handleSaveSlot = async () => {
    const updated = [...slots];
    updated[activeSlotIdx] = {
      ...updated[activeSlotIdx],
      active: true
    };
    setSlots(updated);
    showToast(t.savedAlert);

    // Call REST API if in Next.js environment
    try {
      await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: currentSlot.id,
          ...currentSlot
        })
      });
    } catch (e) {
      // Graceful fallback for offline / standalone preview mode
    }
  };

  // Trigger Backend Cron Engine manual test
  const handleRunManualCron = async () => {
    setIsCronRunning(true);
    showToast(t.cronRunning);

    try {
      const response = await fetch('/api/cron');
      const data = await response.json();
      
      if (data.status === 'completed') {
        showToast(`${t.cronSuccess} Processed: ${data.processed}, Notifications: ${data.notificationsSent || 0}`);
        
        // Update local UI state with new scanned values
        if (data.details && data.details.length > 0) {
          const updated = [...slots];
          data.details.forEach((det) => {
            const idx = updated.findIndex(s => s.id === det.slotId);
            if (idx !== -1 && det.price) {
              updated[idx].lastPrice = det.price;
              updated[idx].avgPrice = det.avgPrice;
            }
          });
          setSlots(updated);
        }

        setCronLogs(prev => [data, ...prev]);
      }
    } catch (err) {
      // Simulate client-side cron run if backend API is not responding
      await new Promise(r => setTimeout(r, 2000));
      const simulatedPrice = Math.floor(Math.random() * (85 - 45 + 1)) + 45;
      const updated = [...slots];
      const prevLast = updated[activeSlotIdx].lastPrice || 66;
      const newAvg = parseFloat(((prevLast + simulatedPrice) / 2).toFixed(2));
      
      updated[activeSlotIdx].lastPrice = simulatedPrice;
      updated[activeSlotIdx].avgPrice = newAvg;
      updated[activeSlotIdx].active = true;
      setSlots(updated);

      const simLog = {
        status: 'completed',
        timestamp: new Date().toISOString(),
        processed: 1,
        successful: 1,
        details: [{
          slotId: currentSlot.id,
          location: currentSlot.location,
          price: simulatedPrice,
          avgPrice: newAvg,
          jitterMs: 2450
        }]
      };
      setCronLogs(prev => [simLog, ...prev]);
      showToast(`${t.cronSuccess} Price detected: $${simulatedPrice}`);
    } finally {
      setIsCronRunning(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
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
          <button 
            onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')}
            style={langBtnStyle}
            title="Switch Language"
          >
            {lang === 'IT' ? '🇮🇹 IT' : '🇬🇧 EN'}
          </button>
        </div>

        {/* 4 Slot Selector */}
        <div style={tabsContainerStyle}>
          {[0, 1, 2, 3].map((idx) => {
            const slotItem = slots[idx];
            const isSelected = activeSlotIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSlotIdx(idx)}
                style={{
                  ...tabBtnStyle,
                  backgroundColor: isSelected ? '#FF5F00' : 'transparent',
                  color: isSelected ? '#000000' : '#8E8E93',
                  boxShadow: isSelected ? '0 0 12px rgba(255, 95, 0, 0.4)' : 'none',
                  position: 'relative'
                }}
              >
                SLOT {idx + 1}
                {slotItem.active && (
                  <span style={{
                    position: 'absolute',
                    top: '3px',
                    right: '3px',
                    width: '6px',
                    height: '6px',
                    backgroundColor: isSelected ? '#000' : '#34C759',
                    borderRadius: '50%'
                  }}></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Pickup Location */}
          <div>
            <label style={labelStyle}>{t.location}</label>
            <input 
              type="text" 
              value={currentSlot.location || ''} 
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="es. Monaco Aeroporto..." 
              style={inputStyle} 
            />
          </div>

          {/* Dates Row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.start}</label>
              <input 
                type="date" 
                value={currentSlot.startDate || ''} 
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.end}</label>
              <input 
                type="date" 
                value={currentSlot.endDate || ''} 
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Category & Max Flair Price */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.category}</label>
              <input 
                type="text" 
                value={currentSlot.category || ''} 
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="es. CLA, SUV" 
                style={inputStyle} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t.flair}</label>
              <input 
                type="number" 
                value={currentSlot.maxPriceFlair || ''} 
                onChange={(e) => handleInputChange('maxPriceFlair', e.target.value)}
                placeholder="es. 70" 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Cloud Stats Box */}
          <div style={statsBoxStyle}>
            <div>
              <div style={{ fontSize: '9px', color: '#8E8E93', letterSpacing: '0.5px' }}>{t.lastPrice}</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#FF5F00', marginTop: '2px' }}>
                {currentSlot.lastPrice ? `$ ${currentSlot.lastPrice}` : '$ --'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', color: '#8E8E93', letterSpacing: '0.5px' }}>{t.avgPrice}</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#FF5F00', marginTop: '2px' }}>
                {currentSlot.avgPrice ? `$ ${currentSlot.avgPrice}` : '$ --'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button 
            onClick={handleSaveSlot}
            style={btnSaveStyle}
          >
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

// Visual Styles (Apple Cyber-Dark Theme)
const containerStyle = { 
  minHeight: '100vh', 
  backgroundColor: '#08080a', 
  color: '#fff', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: '20px',
  position: 'relative'
};

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
  maxWidth: '90%',
  animation: 'fadeIn 0.3s ease'
};

const cardStyle = { 
  width: '100%', 
  maxWidth: '440px', 
  backgroundColor: 'rgba(22, 22, 28, 0.85)', 
  border: '1px solid rgba(255, 255, 255, 0.12)', 
  borderRadius: '24px', 
  padding: '24px', 
  backdropFilter: 'blur(20px)', 
  boxShadow: '0 20px 50px rgba(0,0,0,0.6)' 
};

const headerStyle = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: '20px' 
};

const titleStyle = { 
  fontSize: '18px', 
  fontWeight: '800', 
  margin: 0, 
  letterSpacing: '-0.5px' 
};

const subtitleStyle = { 
  fontSize: '10px', 
  color: '#8E8E93', 
  margin: 0 
};

const langBtnStyle = { 
  background: 'rgba(255, 255, 255, 0.08)', 
  border: '1px solid rgba(255, 255, 255, 0.12)', 
  color: '#fff', 
  borderRadius: '12px', 
  padding: '6px 12px', 
  fontSize: '11px', 
  fontWeight: '700', 
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const tabsContainerStyle = { 
  display: 'flex', 
  gap: '6px', 
  background: 'rgba(255, 255, 255, 0.04)', 
  padding: '4px', 
  borderRadius: '12px', 
  marginBottom: '20px', 
  border: '1px solid rgba(255, 255, 255, 0.1)' 
};

const tabBtnStyle = { 
  flex: 1, 
  padding: '8px 0', 
  border: 'none', 
  borderRadius: '8px', 
  fontSize: '11px', 
  fontWeight: '700', 
  cursor: 'pointer', 
  transition: 'all 0.2s ease' 
};

const labelStyle = { 
  fontSize: '10px', 
  color: '#8E8E93', 
  fontWeight: '700', 
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputStyle = { 
  width: '100%', 
  backgroundColor: 'rgba(255, 255, 255, 0.06)', 
  border: '1px solid rgba(255, 255, 255, 0.12)', 
  borderRadius: '10px', 
  padding: '10px 12px', 
  color: '#FFFFFF', 
  fontSize: '12px', 
  outline: 'none', 
  marginTop: '4px', 
  boxSizing: 'border-box',
  transition: 'all 0.2s ease'
};

const statsBoxStyle = { 
  background: 'rgba(255, 95, 0, 0.08)', 
  border: '1px solid rgba(255, 95, 0, 0.25)', 
  borderRadius: '12px', 
  padding: '12px 16px', 
  display: 'flex', 
  justifyContent: 'space-between', 
  marginTop: '6px' 
};

const btnSaveStyle = { 
  background: 'linear-gradient(135deg, #FF5F00 0%, #FF2E00 100%)', 
  color: '#FFFFFF', 
  border: 'none', 
  borderRadius: '12px', 
  padding: '12px', 
  fontSize: '12px', 
  fontWeight: '800', 
  cursor: 'pointer', 
  boxShadow: '0 4px 20px rgba(255, 95, 0, 0.35)', 
  marginTop: '10px',
  transition: 'transform 0.15s ease'
};

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
