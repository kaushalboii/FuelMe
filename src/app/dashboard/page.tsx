'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  IndianRupee, Users, TrendingUp, ShieldCheck, Share2, 
  ExternalLink, Settings, Download, Search, Check, Heart, Code, Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoalProgressBar from '@/components/GoalProgressBar';
import { Creator, SupportTransaction } from '@/lib/types';
import { getCreatorByUsername, getStoredTransactions, getLoggedInUsername } from '@/lib/store';
import { formatINR, getFuelUnitDetails, getCreatorUrl } from '@/lib/utils';

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
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p className="text-stone-500 text-sm">Loading creator dashboard...</p>
      </div>
    );
  }

  const unit = getFuelUnitDetails(creator.fuelUnit);

  const handleCopyLink = () => {
    const url = getCreatorUrl(creator.username);
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

  const feeSaved = Math.round(creator.totalEarnings * 0.05);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-stone-200/90 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={creator.avatarUrl}
              alt={creator.displayName}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#FFDD00]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900">
                  Welcome back, {creator.displayName}!
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  @{creator.username}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>UPI ID Active: <strong className="text-stone-900 font-mono">{creator.upiId}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied!' : 'Copy Page Link'}
            </button>

            <Link
              href={`/${creator.username}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              <span>View Public Page</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FFDD00] hover:bg-amber-300 text-stone-950 text-xs font-black shadow-sm transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Edit Page & UPI</span>
            </Link>
          </div>
        </div>

        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span>Total Received</span>
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {formatINR(creator.totalEarnings)}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <span>✓ 100% directly in your bank account</span>
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span>Total Supporters</span>
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {creator.totalSupporters}
            </p>
            <p className="text-[11px] text-stone-500">
              Avg. {formatINR(averageDonation)} per contribution
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span>Platform Fee Paid</span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-700 tracking-tight">
              ₹0 <span className="text-sm font-semibold text-stone-400">(0%)</span>
            </p>
            <p className="text-[11px] text-emerald-800 font-bold">
              Saved ~{formatINR(feeSaved)} vs Buy Me a Coffee (5%)
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">BMC Tools</span>
              <h4 className="text-sm font-bold mt-1">Embed Badges & Standee</h4>
              <p className="text-xs text-stone-400 mt-1">GitHub README buttons and printable desk cards.</p>
            </div>
            <Link
              href="/dashboard/widget"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-black text-[#FFDD00] hover:text-amber-200 transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Get Embed Codes →</span>
            </Link>
          </div>

        </div>

        {/* Goal Section if configured */}
        {creator.goal && creator.goal.isActive && (
          <div className="bg-white p-6 rounded-[2rem] border border-stone-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">Active Campaign Goal</h3>
              <Link href="/dashboard/profile" className="text-xs text-amber-700 hover:underline font-bold">
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
        <div className="bg-white rounded-[2rem] border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-stone-900">Supporter Log</h3>
              <p className="text-xs text-stone-500">Real-time log of supporters who bought you a {unit.name}</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search supporters or UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#faf8f5] border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#FFDD00]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-stone-500 font-bold uppercase tracking-wider border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3.5">Supporter</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Message</th>
                  <th className="px-6 py-3.5">UPI Reference / UTR</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-stone-400">
                      No contributions match your search.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-stone-900 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-950 font-black flex items-center justify-center text-xs">
                          {tx.supporterName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span>{tx.supporterName}</span>
                          {tx.supporterEmail && (
                            <span className="block text-[10px] text-stone-400 font-normal">
                              {tx.supporterEmail}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-black text-stone-900">
                        {formatINR(tx.amount)}
                        <span className="text-[10px] text-stone-400 font-normal ml-1">
                          ({tx.fuelUnitsCount} × {unit.emoji})
                        </span>
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate text-stone-600 italic">
                        {tx.supporterMessage ? `“${tx.supporterMessage}”` : '—'}
                      </td>

                      <td className="px-6 py-4 font-mono text-[11px] text-stone-500">
                        {tx.utrNumber || tx.id}
                      </td>

                      <td className="px-6 py-4 text-stone-400">
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
