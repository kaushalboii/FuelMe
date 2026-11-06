'use client';

import { Creator, SupportTransaction } from './types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'c1',
    username: 'kaushal',
    displayName: 'Kaushal',
    headline: 'Developer, Builder & Indie Maker 🇮🇳',
    bio: 'Hey! I build open-source tools, developer utilities, and web apps for Indian creators. If you find my work helpful or enjoy the tools I build, fuel me with a Chai or support my projects! Every little contribution helps keep the servers running.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    upiId: 'kaushal@okaxis',
    fuelUnit: 'fuel',
    unitPrice: 50,
    categories: ['Developer', 'Open Source', 'Indie Maker'],
    socials: {
      github: 'https://github.com/kaushalboii',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
    goal: {
      title: 'Upgrade Dev Machine RAM & Fast Cloud Server for FuelMe',
      targetAmount: 15000,
      currentAmount: 9350,
      isActive: true,
    },
    totalEarnings: 14250,
    totalSupporters: 48,
    themeColor: '#f97316',
    verified: true,
  },
  {
    id: 'c2',
    username: 'ananya_codes',
    displayName: 'Ananya Sharma',
    headline: 'CS Student & Open-Source Contributor',
    bio: 'Writing code for community projects and sharing free DSA & Web3 tutorials in Hindi & English for college students across India.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    upiId: 'ananya@oksbi',
    fuelUnit: 'chai',
    unitPrice: 20,
    categories: ['Student', 'Tutorials', 'DSA'],
    socials: {
      github: 'https://github.com',
      youtube: 'https://youtube.com',
    },
    goal: {
      title: 'Pay Semester Exam & Cloud Certification Fees',
      targetAmount: 8000,
      currentAmount: 5600,
      isActive: true,
    },
    totalEarnings: 8200,
    totalSupporters: 64,
    themeColor: '#ea580c',
    verified: true,
  },
  {
    id: 'c3',
    username: 'rohan_tech',
    displayName: 'Rohan Verma',
    headline: 'Tech YouTuber & Indie Maker',
    bio: 'Reviewing dev gear, testing Indian SaaS products, and building mini-SaaS products in public on YouTube & X.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    upiId: 'rohanverma@paytm',
    fuelUnit: 'coffee',
    unitPrice: 100,
    categories: ['YouTube', 'Reviews', 'SaaS'],
    socials: {
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
    },
    totalEarnings: 32400,
    totalSupporters: 112,
    themeColor: '#f59e0b',
    verified: true,
  },
  {
    id: 'c4',
    username: 'priya_designs',
    displayName: 'Priya Sundaram',
    headline: 'UI/UX Designer & Design Systems Maker',
    bio: 'Crafting free Figma kits, mobile UI components, and design tips for Indian startups and freelancers.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    upiId: 'priyadesigns@ybl',
    fuelUnit: 'chai',
    unitPrice: 30,
    categories: ['Design', 'Figma', 'UI/UX'],
    socials: {
      twitter: 'https://twitter.com',
      website: 'https://dribbble.com',
    },
    totalEarnings: 19600,
    totalSupporters: 73,
    themeColor: '#ec4899',
    verified: true,
  }
];

export const INITIAL_TRANSACTIONS: SupportTransaction[] = [
  {
    id: 'tx_101',
    creatorUsername: 'kaushal',
    supporterName: 'Arjun Mehta',
    supporterEmail: 'arjun@example.com',
    supporterMessage: 'Loved your open-source script for Indian payment testing! Keep building amazing stuff bro.',
    amount: 150,
    fuelUnitsCount: 3,
    isAnonymous: false,
    timestamp: '2 hours ago',
    utrNumber: '431289054321',
    status: 'completed',
    paymentMode: 'direct_upi',
  },
  {
    id: 'tx_102',
    creatorUsername: 'kaushal',
    supporterName: 'Anonymous Supporter',
    supporterMessage: 'Fuel for the next project! ⚡ Proud of what you are making for Indian indie devs.',
    amount: 500,
    fuelUnitsCount: 10,
    isAnonymous: true,
    timestamp: 'Yesterday',
    utrNumber: '431198765432',
    status: 'completed',
    paymentMode: 'direct_upi',
  },
  {
    id: 'tx_103',
    creatorUsername: 'kaushal',
    supporterName: 'Sneha Patel',
    supporterEmail: 'sneha@example.com',
    supporterMessage: 'Small token of appreciation for your clean UI designs and helpful insights!',
    amount: 200,
    fuelUnitsCount: 4,
    isAnonymous: false,
    timestamp: '3 days ago',
    utrNumber: '431056789012',
    status: 'completed',
    paymentMode: 'direct_upi',
  },
  {
    id: 'tx_104',
    creatorUsername: 'kaushal',
    supporterName: 'Vikram Rao',
    supporterMessage: 'Chai on me ☕! Your tutorials saved me hours on my college capstone.',
    amount: 100,
    fuelUnitsCount: 2,
    isAnonymous: false,
    timestamp: '5 days ago',
    utrNumber: '430912345678',
    status: 'completed',
    paymentMode: 'direct_upi',
  },
];

// Helper functions for LocalStorage persistence
const CREATORS_STORAGE_KEY = 'fuelme_creators';
const TRANSACTIONS_STORAGE_KEY = 'fuelme_transactions';
const CURRENT_USER_KEY = 'fuelme_current_user';

export function getStoredCreators(): Creator[] {
  if (typeof window === 'undefined') return INITIAL_CREATORS;
  try {
    const raw = localStorage.getItem(CREATORS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(INITIAL_CREATORS));
      return INITIAL_CREATORS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CREATORS;
  }
}

export function getCreatorByUsername(username: string): Creator | undefined {
  const creators = getStoredCreators();
  const cleanUsername = username.toLowerCase().replace('@', '');
  return creators.find((c) => c.username.toLowerCase() === cleanUsername);
}

export function saveCreator(updatedCreator: Creator): void {
  if (typeof window === 'undefined') return;
  const creators = getStoredCreators();
  const index = creators.findIndex((c) => c.username.toLowerCase() === updatedCreator.username.toLowerCase());
  if (index >= 0) {
    creators[index] = updatedCreator;
  } else {
    creators.push(updatedCreator);
  }
  localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(creators));
}

export function getStoredTransactions(creatorUsername?: string): SupportTransaction[] {
  if (typeof window === 'undefined') return INITIAL_TRANSACTIONS;
  try {
    const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    let list: SupportTransaction[] = raw ? JSON.parse(raw) : INITIAL_TRANSACTIONS;
    if (!raw) {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
    }
    if (creatorUsername) {
      const clean = creatorUsername.toLowerCase().replace('@', '');
      return list.filter((t) => t.creatorUsername.toLowerCase() === clean);
    }
    return list;
  } catch (e) {
    return INITIAL_TRANSACTIONS;
  }
}

export function addSupportTransaction(transaction: SupportTransaction): void {
  if (typeof window === 'undefined') return;
  const list = getStoredTransactions();
  const updatedList = [transaction, ...list];
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(updatedList));

  // Also update creator stats
  const creators = getStoredCreators();
  const creatorIndex = creators.findIndex((c) => c.username.toLowerCase() === transaction.creatorUsername.toLowerCase());
  if (creatorIndex >= 0) {
    const c = creators[creatorIndex];
    c.totalEarnings += transaction.amount;
    c.totalSupporters += 1;
    if (c.goal && c.goal.isActive) {
      c.goal.currentAmount += transaction.amount;
    }
    localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(creators));
  }
}

export function getLoggedInUsername(): string {
  if (typeof window === 'undefined') return 'kaushal';
  return localStorage.getItem(CURRENT_USER_KEY) || 'kaushal';
}

export function setLoggedInUsername(username: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENT_USER_KEY, username.toLowerCase().replace('@', ''));
}

