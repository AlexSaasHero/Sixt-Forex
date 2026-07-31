# SIXT Price Tracker - Web App Architecture

Automated 24/7 Cloud Car Rental Price Monitoring System for **Sixt**, featuring a scheduled **Backend Cron Engine (every 4–5 hours)** and an **Apple Cyber-Dark Frontend Dashboard**.

---

## 🌟 Key Architectural Features

### 1. Scheduled Backend Cron Engine (`app/api/cron/route.js`)
- **Interval Frequency**: Configured for **288 minutes (~4.8 hours)**. This optimal balance lowers block rates near 0% while providing continuous round-the-clock price surveillance.
- **Anti-Pattern Jitter Engine**: Applies a random delay of **1.5s to 4.0s** between target requests to simulate natural human browsing behavior.
- **Automatic Moving Average**: Computes historical average rental prices ($) per location and category.
- **Instant Email Alerts**: Automatically dispatches low-price notifications whenever `Current Price < Historical Average` and `Current Price <= User Max Price Threshold`.

### 2. Apple Cyber-Dark Frontend Dashboard (`app/page.js`)
- **Visual Design**: Sleek dark theme featuring glassmorphism (`backdrop-filter: blur(20px)`), Sixt brand orange (`#FF5F00`), glowing badges, and micro-animations.
- **Multi-Slot System**: Supports **4 active monitoring slots**, each with independent location, rental dates, car categories, price thresholds, and stats.
- **Bilingual i18n Support**: Instant client-side language toggle between **Italian 🇮🇹** and **English 🇬🇧**.
- **Manual Cron Test Trigger**: Interactive test button with live anti-pattern jitter simulation and real-time execution log drawer.

---

## 📁 Directory & File Structure

```
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── route.js      # Backend Cron Engine (4-5h frequency, anti-pattern jitter)
│   │   └── slots/
│   │       └── route.js      # REST API for Slot CRUD & Log History
│   ├── globals.css           # Global Cyber-Dark CSS design system
│   ├── layout.js             # Root HTML5 Layout & SEO Meta
│   └── page.js               # Apple Cyber-Dark React Dashboard UI
├── lib/
│   └── store.js              # Data persistence helper for 4 slots & price history
├── index.html                # Standalone single-file interactive preview
├── vercel.json               # Vercel Cron configuration (every 5 hours)
├── package.json              # Next.js & React dependencies
└── README.md                 # Technical Documentation
```

---

## ⚡ Deployment & Cron Scheduling Setup

### Vercel Deployment (Recommended)
1. Push the project to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. The included `vercel.json` will automatically schedule the Backend Cron Engine at `/api/cron` every 5 hours (`0 */5 * * *`).

### External Cron Services (cron-job.org / GitHub Actions / Cloudflare Workers)
You can also trigger the endpoint using an external webhook ping:
```bash
curl -X GET https://your-domain.com/api/cron
```

---

## 🧪 Local Testing & Interactive Preview

You can preview the full interactive Apple Cyber-Dark interface and test the 4-slot cron jitter engine immediately by opening `index.html` in any web browser or hosting via a lightweight local server:

```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.
