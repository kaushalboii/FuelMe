'use client';

import { Creator, SupportTransaction } from './types';
import { INITIAL_CREATORS, INITIAL_TRANSACTIONS } from './data';

export { INITIAL_CREATORS, INITIAL_TRANSACTIONS };

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
