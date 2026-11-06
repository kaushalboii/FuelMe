# ☕ FuelMe Backend API Server

Standalone backend for **FuelMe** (Buy Me a Coffee for India).  
Designed to run on your mini-server (`user@instabox-kaushals-mini-server`) while the frontend is hosted statically on **GitHub Pages**.

---

## 🚀 Quick Start on `user@instabox-kaushals-mini-server`

### Option 1: 1-Click Script (Recommended)
On your mini-server, clone or pull the repo and run:
```bash
cd FuelMe/backend
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Docker Compose
```bash
cd FuelMe/backend
docker compose up -d --build
```

### Option 3: Standard Node / PM2
```bash
cd FuelMe/backend
npm install
# With PM2 (auto-restart on crash/reboot):
pm2 start src/index.js --name "fuelme-backend"
pm2 save
pm2 startup
```

---

## 🌐 Connecting the GitHub Pages Frontend to your Server

1. Open your FuelMe Dashboard on GitHub Pages:
   **[https://kaushalboii.github.io/FuelMe/dashboard/profile/](https://kaushalboii.github.io/FuelMe/dashboard/profile/)**
2. In the **"Server & Backend Settings"** section:
   * Enter your server URL (e.g. `http://YOUR_SERVER_IP:5000` or `https://api.yourdomain.com`).
   * Click **"Save Server URL & Test"**.
3. The frontend will now automatically sync creators and support transactions live with your mini-server!
4. *(If your server is ever offline, the frontend automatically falls back to local storage with zero downtime).*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check and creator count |
| `GET` | `/api/creators` | List all creators (supports `?category=` and `?search=`) |
| `GET` | `/api/creators/:username` | Get specific creator profile & stats |
| `POST` | `/api/creators` | Create or update a creator profile |
| `GET` | `/api/creators/:username/transactions` | List all supporter payments for creator |
| `POST` | `/api/creators/:username/transactions` | Record a new support transaction |
| `POST` | `/api/transactions/:id/like` | Heart-like a supporter note |
| `POST` | `/api/upi/verify-utr` | Validate 12-digit UPI UTR reference |
| `GET` | `/api/creators/:username/qr` | Dynamic UPI QR code (JSON or image) |
| `GET` | `/api/creators/:username/badge.svg` | Live dynamic SVG badge |

---

## 🔒 Security & Persistence
* **Database**: Persistent JSON storage with atomic writes in `./data/db.json` (auto-created on first run).
* **CORS**: Configured for `https://kaushalboii.github.io` and local development.
* **Direct UPI**: Zero bank middlemen. Payments route peer-to-peer using NPCI UPI protocol.
