# ⚡ FuelMe — The Indian Alternative to Buy Me a Coffee

> **Fuel Your Favorite Indian Creators via Instant UPI — 0% Platform Fee · Direct to Bank Account**

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![UPI Powered](https://img.shields.io/badge/UPI-NPCI_Spec-emerald.svg)](https://www.npci.org.in/)
[![Zero Gateway Fee](https://img.shields.io/badge/Platform_Fee-0%25_Forever-blue.svg)](#)

**FuelMe** is a creator-support platform designed specifically for Indian developers, indie makers, students, artists, and open-source contributors.

Unlike international platforms (like Buy Me a Coffee or Patreon) that require complicated Stripe setups, charge a 5% cut, or face domestic INR bank blocks, **FuelMe uses the native NPCI UPI Direct Protocol**. 

100% of supporter contributions go straight into the creator's bank account with zero intermediary hold and zero commission.

---

## 🌟 Why FuelMe? (Zero-Block, Zero-Fee Guarantee)

| Feature | Buy Me a Coffee | Razorpay Direct | ⚡ **FuelMe** |
| :--- | :--- | :--- | :--- |
| **Platform Fee** | 5% | 2% + 18% GST | **0% (Free Forever)** |
| **Payment Gateway Account** | Required (Stripe) | Required (Merchant KYC) | **None Required** |
| **KYC / Business Approval** | Strict / Rejections | Business PAN / Audits | **Zero (Any active UPI ID works)** |
| **Settlement Time** | 7 – 14 Days | T+2 Business Days | **Instant (0 Seconds T+0)** |
| **UPI Intent on Mobile** | Limited / Redirects | Gateway iFrame | **Native 1-Tap (GPay, PhonePe, Paytm)** |
| **Domestic INR P2P Block** | Frequently Blocked | Requires Corporate entity | **Never Blocked (NPCI Standard)** |

---

## 🚀 Key Features

### 1. 🇮🇳 Native UPI Direct Protocol
- Generates dynamic, NPCI-standard UPI QR codes pre-filled with the exact amount and creator name.
- 1-Tap Mobile Intent schemes for **Google Pay (`tez://`)**, **PhonePe (`phonepe://`)**, **Paytm (`paytmmp://`)**, **BHIM (`bhim://`)**, and universal UPI chooser.
- Zero escrow: Funds move directly from supporter bank to creator bank.

### 2. 🎨 Personalized Creator Profiles
- Unique username URLs: `fuelme.in/@kaushal`
- Choose your signature Indian unit:
  - ⚡ **Fuel** (Standard)
  - ☕ **Chai** (Indian Classic)
  - 🥟 **Samosa** (Street Food)
  - ☕ **Coffee** (Premium)
  - 🚀 **Rocket Fuel** (Indie Builder)
  - 🍕 **Pizza** (Comfort slice)
- Goal Tracker with live progress bar (e.g., *"Upgrade Dev RAM: ₹9,350 / ₹15,000"*).
- Supporter Wall with public messages and a Top Supporters Leaderboard.

### 3. 🛠️ Creator Dashboard & Embeds
- Real-time earnings summary, supporter count, and fee-savings calculator.
- Searchable transaction history with 12-digit UPI UTR reference tracking.
- **GitHub README Badges**: Auto-generated dynamic SVG badges (`/api/badge/[username]`).
- **Printable Desk Standee**: Ready-to-print high-resolution QR standee card for YouTube livestreams, hackathon desks, or college fairs.

---

## 💻 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Interactive FX**: `canvas-confetti`, `qrcode` generator
- **State & Storage**: Client-side resilient LocalStorage sync + API route foundation

---

## 🏃 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/kaushalboii/FuelMe.git
cd FuelMe

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view FuelMe in your browser.

- Demo Creator Page: [http://localhost:3000/kaushal](http://localhost:3000/kaushal)
- Creator Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Profile & UPI Setup: [http://localhost:3000/dashboard/profile](http://localhost:3000/dashboard/profile)
- Embed Badges & Standee: [http://localhost:3000/dashboard/widget](http://localhost:3000/dashboard/widget)
- Explore Creators: [http://localhost:3000/explore](http://localhost:3000/explore)

---

## 🚢 Deploy for Free to Vercel

You can deploy FuelMe in under 60 seconds with zero server costs:

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your `FuelMe` repository and click **Deploy**.
4. That's it! Your custom domain or `.vercel.app` URL is live worldwide.

---

## 📄 License

MIT © [Kaushal](https://github.com/kaushalboii) — Built with ❤️ for the Indian Creator & Developer Community 🇮🇳
