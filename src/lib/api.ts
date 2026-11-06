import { Creator, SupportTransaction } from './types';
import { 
  getStoredCreators, 
  getCreatorByUsername as getLocalCreator, 
  saveCreator as saveLocalCreator,
  getStoredTransactions as getLocalTransactions,
  addSupportTransaction as addLocalTransaction
} from './store';

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fuelme_api_url');
    if (saved && saved.trim()) return saved.trim().replace(/\/$/, '');
  }
  return DEFAULT_API_URL.replace(/\/$/, '');
}

export function setApiBaseUrl(url: string) {
  if (typeof window !== 'undefined') {
    if (!url || !url.trim()) {
      localStorage.removeItem('fuelme_api_url');
    } else {
      localStorage.setItem('fuelme_api_url', url.trim().replace(/\/$/, ''));
    }
  }
}

export async function checkServerHealth(url?: string): Promise<{ ok: boolean; message: string; uptime?: number }> {
  const target = (url || getApiBaseUrl()).replace(/\/$/, '');
  if (!target) {
    return { ok: false, message: 'No server URL configured (running in client-only mode)' };
  }

  try {
    const res = await fetch(`${target}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return { ok: true, message: `Connected to FuelMe server (uptime: ${data.uptimeSeconds}s)`, uptime: data.uptimeSeconds };
    }
    return { ok: false, message: `Server responded with status ${res.status}` };
  } catch (err: any) {
    return { ok: false, message: `Could not connect to ${target} (${err.message || 'Network error'})` };
  }
}

/**
 * Fetch creators (with automatic fallback to local store)
 */
export async function getCreatorsApi(): Promise<Creator[]> {
  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/creators`, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (data.creators) return data.creators;
      }
    } catch (e) {
      console.warn('[FuelMe API] Remote fetch failed, falling back to local storage:', e);
    }
  }
  return getStoredCreators();
}

/**
 * Fetch creator by username
 */
export async function getCreatorApi(username: string): Promise<Creator | null> {
  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/creators/${encodeURIComponent(username)}`, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (data.creator) return data.creator;
      }
    } catch (e) {
      console.warn('[FuelMe API] Remote fetch failed, falling back to local storage:', e);
    }
  }
  return getLocalCreator(username) || null;
}

/**
 * Save creator profile to server (and local cache)
 */
export async function saveCreatorApi(creator: Creator): Promise<Creator> {
  // Always update local cache
  saveLocalCreator(creator);

  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/creators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creator),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.creator) return data.creator;
      }
    } catch (e) {
      console.warn('[FuelMe API] Remote save failed, preserved in local storage:', e);
    }
  }
  return creator;
}

/**
 * Fetch transactions
 */
export async function getTransactionsApi(username: string): Promise<SupportTransaction[]> {
  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/creators/${encodeURIComponent(username)}/transactions`, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (data.transactions) return data.transactions;
      }
    } catch (e) {
      console.warn('[FuelMe API] Remote fetch failed, falling back to local storage:', e);
    }
  }
  return getLocalTransactions(username);
}

/**
 * Record new support transaction
 */
export async function addTransactionApi(tx: SupportTransaction): Promise<SupportTransaction> {
  // Always update local cache
  addLocalTransaction(tx);

  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/creators/${encodeURIComponent(tx.creatorUsername)}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tx),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.transaction) return data.transaction;
      }
    } catch (e) {
      console.warn('[FuelMe API] Remote transaction recording failed, preserved in local storage:', e);
    }
  }
  return tx;
}

/**
 * Like transaction
 */
export async function likeTransactionApi(id: string): Promise<number> {
  const apiUrl = getApiBaseUrl();
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/transactions/${encodeURIComponent(id)}/like`, {
        method: 'POST',
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.likesCount === 'number') return data.likesCount;
      }
    } catch (e) {
      // safe fallback
    }
  }
  return 1;
}
