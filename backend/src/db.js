import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initial seeded creators matching FuelMe frontend
const INITIAL_CREATORS = [
  {
    id: 'creator_1',
    username: 'kaushal',
    displayName: 'Kaushal',
    headline: 'Developer & Maker · Building developer tools',
    bio: 'Hey there! 👋 I build open-source CLI tools, dev utilities, and fullstack apps for developers and indie hackers.\n\nIf any of my code or tutorials saved you time, you can buy me a Chai! Every rupee directly funds domain renewals, server costs, and late-night coding sessions. ☕🇮🇳',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    upiId: 'kaushal@okaxis',
    fuelUnit: 'chai',
    unitPrice: 50,
    totalEarnings: 24500,
    totalSupporters: 148,
    verified: true,
    socials: {
      github: 'https://github.com/kaushalboii',
      twitter: 'https://twitter.com/kaushal',
      linkedin: 'https://linkedin.com/in/kaushal',
      website: 'https://kaushalboii.github.io/FuelMe/',
    },
    goal: {
      id: 'goal_1',
      title: 'Upgrade server capacity for fast builds',
      targetAmount: 50000,
      currentAmount: 24500,
      isActive: true,
    },
    categories: ['Developer', 'Open Source', 'Indie Maker'],
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'creator_2',
    username: 'ananya_codes',
    displayName: 'Ananya Verma',
    headline: 'CS Student & Tech Creator',
    bio: 'Sharing clean React, Next.js, and Python tutorials for college students across India. Support me to keep learning resources 100% free!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    upiId: 'ananya@ybl',
    fuelUnit: 'coffee',
    unitPrice: 50,
    totalEarnings: 15600,
    totalSupporters: 94,
    verified: true,
    socials: {
      github: 'https://github.com',
      youtube: 'https://youtube.com',
    },
    categories: ['Student', 'Developer'],
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'creator_3',
    username: 'rohan_tech',
    displayName: 'Rohan Roy',
    headline: 'YouTuber & Tech Reviewer',
    bio: 'Independent tech gear reviews in Hindi. No sponsored biased scripts. 100% honest tests funded directly by you guys!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    upiId: 'rohan@paytm',
    fuelUnit: 'fuel',
    unitPrice: 100,
    totalEarnings: 42000,
    totalSupporters: 210,
    verified: true,
    socials: {
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
    },
    categories: ['YouTube', 'Tech'],
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'creator_4',
    username: 'priya_designs',
    displayName: 'Priya Sundaram',
    headline: 'UI/UX Designer & Illustrator',
    bio: 'Creating free Figma community kits, Indian festive illustration packs, and open-source icons for builders.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    upiId: 'priya@okicici',
    fuelUnit: 'chai',
    unitPrice: 50,
    totalEarnings: 18200,
    totalSupporters: 112,
    verified: true,
    socials: {
      website: 'https://dribbble.com',
      twitter: 'https://twitter.com',
    },
    categories: ['Design', 'Illustrator'],
    createdAt: '2026-02-20T10:00:00Z',
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'txn_101',
    creatorUsername: 'kaushal',
    supporterName: 'Vikram Patel',
    supporterMessage: 'Your Next.js CLI boilerplate saved me 3 days of work on my startup! Keep building brother! 🔥',
    amount: 150,
    fuelUnitsCount: 3,
    isAnonymous: false,
    timestamp: '2 hours ago',
    status: 'completed',
    paymentMode: 'direct_upi',
    likesCount: 14,
  },
  {
    id: 'txn_102',
    creatorUsername: 'kaushal',
    supporterName: 'Arjun M.',
    supporterMessage: 'Buying you 5 chais for the awesome UPI payment integration docs! ☕☕☕☕☕',
    amount: 250,
    fuelUnitsCount: 5,
    isAnonymous: false,
    timestamp: '5 hours ago',
    status: 'completed',
    paymentMode: 'direct_upi',
    likesCount: 8,
  },
  {
    id: 'txn_103',
    creatorUsername: 'kaushal',
    supporterName: 'Sneha Rao',
    supporterMessage: 'Loved your tutorial on system design. More power to you!',
    amount: 100,
    fuelUnitsCount: 2,
    isAnonymous: false,
    timestamp: '1 day ago',
    status: 'completed',
    paymentMode: 'direct_upi',
    likesCount: 19,
  },
];

class Database {
  constructor() {
    this.data = {
      creators: [...INITIAL_CREATORS],
      transactions: [...INITIAL_TRANSACTIONS],
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        console.log(`[Database] Loaded ${this.data.creators.length} creators and ${this.data.transactions.length} transactions from ${DB_FILE}`);
      } else {
        this.persist();
        console.log(`[Database] Seeded new database at ${DB_FILE}`);
      }
    } catch (err) {
      console.error('[Database] Failed to load database file, using in-memory defaults:', err);
    }
  }

  persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('[Database] Failed to persist database:', err);
    }
  }

  getCreators() {
    return this.data.creators;
  }

  getCreator(username) {
    if (!username) return null;
    const clean = username.toLowerCase().replace('@', '');
    return this.data.creators.find((c) => c.username.toLowerCase() === clean) || null;
  }

  saveCreator(creatorData) {
    const cleanUsername = (creatorData.username || '').toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUsername) throw new Error('Invalid username');

    const index = this.data.creators.findIndex((c) => c.username.toLowerCase() === cleanUsername);

    if (index >= 0) {
      this.data.creators[index] = {
        ...this.data.creators[index],
        ...creatorData,
        username: cleanUsername,
        updatedAt: new Date().toISOString(),
      };
    } else {
      const newCreator = {
        id: `creator_${Date.now()}`,
        username: cleanUsername,
        displayName: creatorData.displayName || cleanUsername,
        headline: creatorData.headline || 'Creator on FuelMe',
        bio: creatorData.bio || 'Welcome to my FuelMe creator page!',
        avatarUrl: creatorData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        upiId: creatorData.upiId,
        fuelUnit: creatorData.fuelUnit || 'chai',
        unitPrice: Number(creatorData.unitPrice) || 50,
        totalEarnings: 0,
        totalSupporters: 0,
        verified: false,
        socials: creatorData.socials || {},
        goal: creatorData.goal || null,
        categories: creatorData.categories || ['Creator'],
        createdAt: new Date().toISOString(),
      };
      this.data.creators.push(newCreator);
    }

    this.persist();
    return this.getCreator(cleanUsername);
  }

  getTransactions(creatorUsername) {
    if (!creatorUsername) return [];
    const clean = creatorUsername.toLowerCase().replace('@', '');
    return this.data.transactions
      .filter((t) => t.creatorUsername.toLowerCase() === clean)
      .sort((a, b) => (b.createdAt || 0) > (a.createdAt || 0) ? 1 : -1);
  }

  addTransaction(tx) {
    const newTx = {
      id: tx.id || `txn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      creatorUsername: (tx.creatorUsername || '').toLowerCase().replace('@', ''),
      supporterName: tx.isAnonymous ? 'Generous Supporter' : (tx.supporterName || 'A Supporter'),
      supporterEmail: tx.supporterEmail || undefined,
      supporterMessage: tx.supporterMessage || undefined,
      amount: Number(tx.amount) || 50,
      fuelUnitsCount: Number(tx.fuelUnitsCount) || 1,
      isAnonymous: Boolean(tx.isAnonymous),
      timestamp: 'Just now',
      utrNumber: tx.utrNumber || undefined,
      status: 'completed',
      paymentMode: 'direct_upi',
      likesCount: 1,
      createdAt: new Date().toISOString(),
    };

    this.data.transactions.unshift(newTx);

    // Update creator stats
    const creator = this.getCreator(newTx.creatorUsername);
    if (creator) {
      creator.totalEarnings = (creator.totalEarnings || 0) + newTx.amount;
      creator.totalSupporters = (creator.totalSupporters || 0) + 1;
      if (creator.goal && creator.goal.isActive) {
        creator.goal.currentAmount = (creator.goal.currentAmount || 0) + newTx.amount;
      }
    }

    this.persist();
    return newTx;
  }

  likeTransaction(id) {
    const tx = this.data.transactions.find((t) => t.id === id);
    if (tx) {
      tx.likesCount = (tx.likesCount || 0) + 1;
      this.persist();
      return tx.likesCount;
    }
    return 1;
  }
}

export const db = new Database();
