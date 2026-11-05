'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, IndianRupee, Users, TrendingUp, ShieldCheck, Share2, 
  ExternalLink, Settings, Download, Search, Check, Heart, Code
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoalProgressBar from '@/components/GoalProgressBar';
import { Creator, SupportTransaction } from '@/lib/types';
import { getCreatorByUsername, getStoredTransactions, getLoggedInUsername } from '@/lib/store';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';

export default function DashboardPage() {
  const [username, setUsername] = useState('kaushal');
  const [creator, setCreator] = useState<Creator | null>(null);
  const [transactions, setTransactions] = useState<SupportTransaction[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = getLoggedInUsername();
    setUsername(user);
    const c = getCreatorByUsername(user);
    if (c) {
      setCreator(c);
      const txs = getStoredTransactions(c.username);
      setTransactions(txs);
    }
  }, []);

  if (!creator) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading creator dashboard...</p>
      </div>
    );
  }

  const unit = getFuelUnitDetails(creator.fuelUnit);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${creator.username}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredTransactions = transactions.filter((t) => 
    t.supporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.supporterMessage && t.supporterMessage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (t.utrNumber && t.utrNumber.includes(searchQuery))
  );

  const averageDonation = transactions.length > 0 
    ? Math.round(creator.totalEarnings / transactions.length) 
    : 0;

  // Amount saved compared to a 5% platform fee like Buy Me a Coffee
  const feeSaved = Math.round(creator.totalEarnings * 0.05);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-8">
        
        {/* Top Header & Quick Profile Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={creator.avatarUrl}
              alt={creator.displayName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Welcome back, {creator.displayName}!
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">
                  @{creator.username}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>UPI ID Active: <strong className="text-slate-800 font-mono">{creator.upiId}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied!' : 'Copy Page Link'}
            </button>

            <Link
              href={`/${creator.username}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Public Page</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Edit Page & UPI</span>
            </Link>
          </div>
        </div>

        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Earnings */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Received</span>
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              {formatINR(creator.totalEarnings)}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span>✓ 100% directly in your bank account</span>
            </p>
          </div>

          {/* Total Supporters */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Fuels</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              {creator.totalSupporters}
            </p>
            <p className="text-[11px] text-slate-500">
              Avg. {formatINR(averageDonation)} per contribution
            </p>
          </div>

          {/* Platform Fee Saved */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Platform Fee Paid</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-600 tracking-tight">
              ₹0 <span className="text-sm font-semibold text-slate-400">(0%)</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold">
              You saved ~{formatINR(feeSaved)} vs BMC (5%)
            </p>
          </div>

          {/* Embed Tools Shortcut */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Creator Tools</span>
              <h4 className="text-sm font-bold mt-1">Embed Badges & QR Standee</h4>
              <p className="text-xs text-slate-400 mt-1">Get GitHub README badges and desk QR cards.</p>
            </div>
            <Link
              href="/dashboard/widget"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Open Embed Generator →</span>
            </Link>
          </div>

        </div>

        {/* Goal Section if configured */}
        {creator.goal && creator.goal.isActive && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Active Campaign Goal</h3>
              <Link href="/dashboard/profile" className="text-xs text-orange-600 hover:underline font-semibold">
                Edit Goal
              </Link>
            </div>
            <GoalProgressBar
              title={creator.goal.title}
              targetAmount={creator.goal.targetAmount}
              currentAmount={creator.goal.currentAmount}
            />
          </div>
        )}

        {/* Transactions / Supporter History Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Supporter Log & Contributions</h3>
              <p className="text-xs text-slate-500">Real-time log of supporters who fueled your work</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search supporters or UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Supporter</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Message</th>
                  <th className="px-6 py-3.5">UPI Reference / UTR</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      No contributions match your search.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                          {tx.supporterName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span>{tx.supporterName}</span>
                          {tx.supporterEmail && (
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {tx.supporterEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-black text-orange-600">
                        {formatINR(tx.amount)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({tx.fuelUnitsCount} × {unit.emoji})
                        </span>
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                        {tx.supporterMessage ? `“${tx.supporterMessage}”` : '—'}
                      </td>

                      <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                        {tx.utrNumber || tx.id}
                      </td>

                      <td className="px-6 py-4 text-slate-400">
                        {tx.timestamp}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                          Received
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
