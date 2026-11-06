import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FuelMe — Indian Alternative to Buy Me a Coffee (UPI 0% Fee)',
  description: 'A creator-support platform designed specifically for Indian developers, indie makers, students, and creators. Receive support instantly via UPI with zero gateway cuts and no KYC holds.',
  keywords: ['Buy Me a Coffee India', 'UPI Creator Support', 'FuelMe', 'ChaiTip', 'Indian Indie Makers', 'Direct UPI'],
  openGraph: {
    title: 'FuelMe — Fuel Your Favorite Indian Creators via UPI',
    description: 'Instant creator appreciation with ₹10, ₹20, ₹50, ₹100 or custom amounts using UPI. 0% platform fee.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#FFDD00] selection:text-stone-900 font-sans">
        {children}
      </body>
    </html>
  );
}

