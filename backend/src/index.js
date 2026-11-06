import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';
import { generateUpiUri, generateQrDataUrl, generateQrSvg, isValidUpiId, isValidUtr } from './upi.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic CORS configuration allowing GitHub Pages & local development
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    // Allow all GitHub Pages subdomains by default
    if (origin.endsWith('.github.io') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for P2P UPI client access
  },
  credentials: true,
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root / Health Check
app.get('/', (req, res) => {
  res.json({
    name: 'FuelMe Backend API',
    description: 'UPI Creator Support Platform Server',
    status: 'online',
    version: '1.0.0',
    documentation: '/health',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  const creators = db.getCreators();
  res.json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    creatorsCount: creators.length,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/creators - List all creators
app.get('/api/creators', (req, res) => {
  const { category, search } = req.query;
  let creators = db.getCreators();

  if (category && category !== 'All') {
    creators = creators.filter((c) => c.categories && c.categories.includes(category));
  }

  if (search) {
    const q = String(search).toLowerCase();
    creators = creators.filter((c) =>
      c.displayName.toLowerCase().includes(q) ||
      c.username.toLowerCase().includes(q) ||
      c.headline.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: creators.length, creators });
});

// GET /api/creators/:username - Get creator profile
app.get('/api/creators/:username', (req, res) => {
  const creator = db.getCreator(req.params.username);
  if (!creator) {
    return res.status(404).json({ success: false, error: 'Creator not found' });
  }
  res.json({ success: true, creator });
});

// POST /api/creators - Create or update creator profile
app.post('/api/creators', (req, res) => {
  const { username, displayName, upiId, headline, bio, avatarUrl, fuelUnit, unitPrice, socials, goal, categories } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  if (upiId && !isValidUpiId(upiId)) {
    return res.status(400).json({ success: false, error: 'Invalid UPI ID format (must be handle@bank)' });
  }

  try {
    const saved = db.saveCreator({
      username,
      displayName,
      upiId,
      headline,
      bio,
      avatarUrl,
      fuelUnit,
      unitPrice,
      socials,
      goal,
      categories,
    });
    res.json({ success: true, creator: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/creators/:username/transactions - Get creator supporter transactions
app.get('/api/creators/:username/transactions', (req, res) => {
  const transactions = db.getTransactions(req.params.username);
  res.json({ success: true, count: transactions.length, transactions });
});

// POST /api/creators/:username/transactions - Record a new support transaction
app.post('/api/creators/:username/transactions', (req, res) => {
  const creator = db.getCreator(req.params.username);
  if (!creator) {
    return res.status(404).json({ success: false, error: 'Creator not found' });
  }

  const { amount, unitsCount, supporterName, supporterEmail, supporterMessage, isAnonymous, utrNumber } = req.body;

  if (!amount || Number(amount) < 1) {
    return res.status(400).json({ success: false, error: 'Amount must be at least ₹1' });
  }

  if (utrNumber && !isValidUtr(utrNumber)) {
    return res.status(400).json({ success: false, error: 'UTR number must be exactly 12 digits' });
  }

  const newTx = db.addTransaction({
    creatorUsername: creator.username,
    amount: Number(amount),
    fuelUnitsCount: Number(unitsCount) || 1,
    supporterName,
    supporterEmail,
    supporterMessage,
    isAnonymous: Boolean(isAnonymous),
    utrNumber,
  });

  res.status(201).json({ success: true, transaction: newTx });
});

// POST /api/transactions/:id/like - Like a transaction
app.post('/api/transactions/:id/like', (req, res) => {
  const likes = db.likeTransaction(req.params.id);
  res.json({ success: true, likesCount: likes });
});

// POST /api/upi/verify-utr - Validate UTR format
app.post('/api/upi/verify-utr', (req, res) => {
  const { utr } = req.body;
  const valid = isValidUtr(utr);
  res.json({
    success: true,
    isValid: valid,
    message: valid ? 'Valid 12-digit UPI UTR number' : 'Invalid UTR format (must be exactly 12 digits)',
  });
});

// GET /api/creators/:username/qr - Dynamic QR Code endpoint
app.get('/api/creators/:username/qr', async (req, res) => {
  const creator = db.getCreator(req.params.username);
  if (!creator) {
    return res.status(404).json({ success: false, error: 'Creator not found' });
  }

  const amount = Number(req.query.amount) || creator.unitPrice || 50;
  const note = req.query.note || `Support ${creator.displayName} on FuelMe`;

  const upiUri = generateUpiUri({
    upiId: creator.upiId,
    payeeName: creator.displayName,
    amount: amount,
    transactionNote: note,
  });

  const format = req.query.format || 'json';

  try {
    if (format === 'svg') {
      const svg = await generateQrSvg(upiUri);
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(svg);
    }

    const dataUrl = await generateQrDataUrl(upiUri);
    if (format === 'image' || format === 'png') {
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      res.setHeader('Content-Type', 'image/png');
      return res.send(imgBuffer);
    }

    res.json({
      success: true,
      creator: creator.username,
      amount,
      upiUri,
      qrDataUrl: dataUrl,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to generate QR code' });
  }
});

// GET /api/creators/:username/badge.svg - Live SVG badge
app.get('/api/creators/:username/badge.svg', (req, res) => {
  const creator = db.getCreator(req.params.username);
  const name = creator ? creator.displayName : req.params.username;
  const label = `Buy ${name} a chai`;
  const status = `0% Fee UPI`;

  const labelWidth = Math.max(90, label.length * 8 + 30);
  const statusWidth = 80;
  const totalWidth = labelWidth + statusWidth;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="${label}: ${status}">
    <clipPath id="a">
      <rect width="${totalWidth}" height="28" rx="8" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#a)">
      <rect width="${labelWidth}" height="28" fill="#FFDD00"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="28" fill="#18181b"/>
    </g>
    <g text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, sans-serif" font-size="11" font-weight="bold">
      <text x="${labelWidth / 2}" y="18" fill="#18181b">☕ ${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="18" fill="#FFDD00">${status}</text>
    </g>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.send(svg);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🚀 FuelMe API Server running on port ${PORT}`);
  console.log(`📍 Local URL:     http://localhost:${PORT}`);
  console.log(`🌐 Health check:  http://localhost:${PORT}/health`);
  console.log(`📦 Database:      Persistent JSON file DB active`);
  console.log(`⚡ Ready for user@instabox-kaushals-mini-server`);
  console.log(`===============================================`);
});
