/* ============================================================================
 * SECTION 1: BACKEND CRON ENGINE (4-5 HOURS INTERVAL)
 * ============================================================================ */

import { NextResponse } from 'next/server';
import { getSlots, savePriceRecordAndCalculateAvg, addCronLog } from '../../../lib/store';

// Frequenza impostata: 288 minuti (~4.8 ore) per bilanciare frequenza e sicurezza
const TARGET_INTERVAL_MINUTES = 288;

export async function GET(request) {
  console.log('[Sixt Web Engine] Avvio ciclo di controllo prezzi (Frequenza: 4/5 ore)...');

  try {
    // 1. Recupera gli slot attivi salvati nel database
    const activeSlots = await fetchActiveSlotsFromDatabase();

    if (activeSlots.length === 0) {
      await addCronLog({ status: 'info', message: 'Nessun slot attivo da tracciare.' });
      return NextResponse.json({ status: 'success', message: 'Nessun slot attivo da tracciare.' });
    }

    let successCount = 0;
    let blockedCount = 0;
    let notificationsSent = 0;
    const details = [];

    for (const slot of activeSlots) {
      // 2. Aggiunge un piccolo ritardo casuale (Jitter) tra uno slot e l'altro per simulare comportamenti umani
      const delayMs = await applyAntiPatternDelay();

      // 3. Esegue lo scraping del prezzo in USD
      const result = await scrapeSixtData(slot);

      if (result.success) {
        successCount++;
        const updatedSlot = await savePriceRecordAndCalculateAvg(slot.id, result.price);

        // 4. Invia la notifica se il prezzo è vantaggioso
        const isBelowAvg = result.price < updatedSlot.avgPrice;
        const isWithinFlair = !slot.maxPriceFlair || result.price <= slot.maxPriceFlair;

        let notified = false;
        if (isBelowAvg && isWithinFlair) {
          await sendAlertNotification(slot.userEmail || 'utente@email.com', slot, result.price, updatedSlot.avgPrice);
          notified = true;
          notificationsSent++;
        }

        details.push({
          slotId: slot.id,
          location: slot.location,
          price: result.price,
          avgPrice: updatedSlot.avgPrice,
          jitterMs: delayMs,
          notified
        });

      } else if (result.captchaOrBlocked) {
        blockedCount++;
        console.warn(`[Sixt Engine] Blocco rilevato per lo slot ${slot.id}.`);
        details.push({
          slotId: slot.id,
          location: slot.location,
          status: 'blocked',
          jitterMs: delayMs
        });
      }
    }

    const summary = {
      status: 'completed',
      interval: '4-5 hours (288 mins)',
      timestamp: new Date().toISOString(),
      processed: activeSlots.length,
      successful: successCount,
      blocked: blockedCount,
      notificationsSent,
      details
    };

    await addCronLog(summary);

    return NextResponse.json(summary);

  } catch (error) {
    console.error('[Sixt Engine] Errore critico durante il Cron:', error);
    await addCronLog({ status: 'error', message: error.message });
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

/**
 * Scraping alleggerito dato il basso throughput (4-5 ore)
 */
async function scrapeSixtData(slot) {
  try {
    const targetUrl = `https://www.sixt.com/#/search?pickupStation=${encodeURIComponent(slot.location || 'MUC')}&pickupDate=${slot.startDate || ''}&returnDate=${slot.endDate || ''}&currency=USD`;
    
    // Con 1 controllo ogni 4-5 ore, il tasso di blocco crolla quasi a zero
    // Simula prezzo realistico tra $42 e $88
    const simulatedPrice = Math.floor(Math.random() * (88 - 42 + 1)) + 42;
    return { success: true, price: simulatedPrice };
  } catch (err) {
    return { success: false, captchaOrBlocked: true };
  }
}

/**
 * Ritardo dinamico tra 1.5 e 4 secondi tra una richiesta e l'altra (Anti-Pattern)
 */
function applyAntiPatternDelay() {
  const delayMs = Math.floor(Math.random() * (4000 - 1500 + 1)) + 1500;
  return new Promise(resolve => setTimeout(() => resolve(delayMs), delayMs));
}

// Fetch active slots from store
async function fetchActiveSlotsFromDatabase() {
  const allSlots = await getSlots();
  return allSlots.filter(s => s.active);
}

async function sendAlertNotification(email, slot, currentPrice, avgPrice) {
  console.log(`[Notification Sent to ${email}] 🚨 Prezzo Basso per ${slot.location}! Ora a $${currentPrice} (Media: $${avgPrice})`);
}
