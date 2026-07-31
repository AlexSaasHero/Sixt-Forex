import './globals.css';

export const metadata = {
  title: 'SIXT Price Tracker - Apple Cyber-Dark Cloud Monitor',
  description: 'Automated 24/7 Cloud Sixt Car Rental Price Tracking every 4-5 hours with dynamic jitter & email alerts.',
  keywords: 'Sixt, car rental, price tracker, cloud monitoring, deal alert',
  authors: [{ name: 'Sixt Founder Team' }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
