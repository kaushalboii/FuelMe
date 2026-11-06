#!/bin/bash
# ==============================================================================
# FuelMe Backend One-Click Deploy Script for user@instabox-kaushals-mini-server
# ==============================================================================

set -e

echo "🚀 Starting FuelMe Backend Setup on $(hostname)..."

# Navigate to backend directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ or Docker."
    exit 1
fi

echo "📦 Node.js version: $(node -v)"
echo "📦 NPM version:     $(npm -v)"

# 2. Copy .env if not exists
if [ ! -f .env ]; then
    echo "⚙️ Creating .env from .env.example..."
    cp .env.example .env
fi

# 3. Install dependencies
echo "📥 Installing dependencies..."
npm install

# 4. Check deployment method
if command -v pm2 &> /dev/null; then
    echo "🌟 PM2 detected! Starting with PM2 process manager..."
    pm2 stop fuelme-backend 2>/dev/null || true
    pm2 start src/index.js --name "fuelme-backend"
    pm2 save
    echo "✅ FuelMe Backend running via PM2!"
    pm2 status
elif command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Docker Compose detected! Starting containers..."
    docker-compose up -d --build
    echo "✅ FuelMe Backend running via Docker!"
else
    echo "⚡ Starting natively with Node in background (nohup)..."
    pkill -f "node src/index.js" 2>/dev/null || true
    nohup node src/index.js > server.log 2>&1 &
    sleep 2
    echo "✅ FuelMe Backend started! (PID: $!)"
    echo "📄 Logs available at: $SCRIPT_DIR/server.log"
fi

echo "=========================================================="
echo "🎉 FuelMe Backend is LIVE on port 5000!"
echo "👉 Health Check: curl http://localhost:5000/health"
echo "=========================================================="
