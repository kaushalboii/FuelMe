'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, Globe, Github, Twitter, Linkedin, Youtube, 
  Share2, Check, Heart, Zap, Sparkles, MessageSquare, Award, ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SupportWidget from '@/components/SupportWidget';
import GoalProgressBar from '@/components/GoalProgressBar';
import { Creator, SupportTransaction } from '@/lib/types';
import { getCreatorByUsername, getStoredTransactions } from '@/lib/store';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';

export default function CreatorProfileClient() {
  const params = useParams();
  const rawUsername = Array.isArray(params?.username) ? params.username[0] : (params?.username as string) || '';
  const username = decodeURIComponent(rawUsername).replace('@', '');

  const [creator, setCreator] = useState<Creator | null>(null);
  const [transactions, setTransactions] = useState<SupportTransaction[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'wall' | 'top'>('wall');

  const refreshData = () => {
    const c = getCreatorByUsername(username);
    if (c) {
      setCreator({ ...c });
      const txs = getStoredTransactions(c.username);
      setTransactions([...txs]);
    }
  };

  useEffect(() => {
    refreshData();
  }, [username]);

  if (!creator) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Creator @{username} not found</h2>
          <p className="text-sm text-slate-600 mt-2 mb-6">
            Want to claim this username for yourself? Create your 100% free UPI FuelMe page now!
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard/profile"
              className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 shadow-sm"
            >
              Claim @{username} Free
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const unit = getFuelUnitDetails(creator.fuelUnit);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Fuel ${creator.displayName} on FuelMe`,
        text: `Support ${creator.displayName}'s work directly via UPI on FuelMe!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const topSupporters = [...transactions].sort((a, b) => b.amount - a.amount).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      <Navbar />

      {/* Profile Banner */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 h-full flex items-end pb-4 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Discover more creators</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Creator Profile & Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Creator Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Avatar & Identifiers */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.displayName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm shadow">
                      {unit.emoji}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {creator.displayName}
                      </h1>
                      {creator.verified && (
                        <CheckCircle className="w-5 h-5 text-orange-500 fill-orange-100" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-500 font-mono">
                      @{creator.username}
                    </p>
                    <p className="text-xs font-medium text-orange-600 mt-0.5">
                      {creator.headline}
                    </p>
                  </div>
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 text-slate-700 text-xs font-bold transition-all"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Link Copied!' : 'Share'}
                </button>
              </div>

              {/* Bio */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {creator.bio}
                </p>
              </div>

              {/* Tags & Categories */}
              {creator.categories && creator.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {creator.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold"
                    >
                      #{cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                {creator.socials.github && (
                  <a
                    href={creator.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {creator.socials.twitter && (
                  <a
                    href={creator.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-600 hover:text-sky-500 hover:bg-slate-100 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {creator.socials.linkedin && (
                  <a
                    href={creator.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {creator.socials.youtube && (
                  <a
                    href={creator.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {creator.socials.website && (
                  <a
                    href={creator.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Goal Progress Bar if active */}
            {creator.goal && creator.goal.isActive && (
              <GoalProgressBar
                title={creator.goal.title}
                targetAmount={creator.goal.targetAmount}
                currentAmount={creator.goal.currentAmount}
              />
            )}

            {/* Supporter Wall & Community Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="font-extrabold text-slate-900 text-lg">Supporter Community</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {transactions.length} Fuels
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('wall')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeTab === 'wall' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Recent Wall
                  </button>
                  <button
                    onClick={() => setActiveTab('top')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeTab === 'top' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Leaderboard 🏆
                  </button>
                </div>
              </div>

              {/* Transactions List */}
              {activeTab === 'wall' ? (
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Be the first supporter to fuel {creator.displayName}! ⚡
                    </div>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                              {tx.supporterName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800">
                                {tx.supporterName}
                              </span>
                              <span className="text-[11px] text-slate-400 ml-2">
                                {tx.timestamp}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                            <span>{formatINR(tx.amount)}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({tx.fuelUnitsCount} × {unit.emoji})
                            </span>
                          </div>
                        </div>

                        {tx.supporterMessage && (
                          <p className="text-xs text-slate-600 pl-10 italic">
                            &ldquo;{tx.supporterMessage}&rdquo;
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Leaderboard View */
                <div className="space-y-3">
                  {topSupporters.map((tx, idx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                          idx === 0 ? 'bg-amber-400 text-amber-950' : idx === 1 ? 'bg-slate-300 text-slate-800' : 'bg-amber-200 text-amber-900'
                        }`}>
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{tx.supporterName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">Top Supporter</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
                        {formatINR(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Support Widget (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <SupportWidget
              creator={creator}
              onPaymentSuccess={(newTx) => {
                refreshData();
              }}
            />

            {/* Quick Safety info */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 space-y-1 text-center">
              <p className="font-semibold text-slate-700">🔒 Direct NPCI UPI Guarantee</p>
              <p className="text-[11px] text-slate-400">
                100% of proceeds settle directly into {creator.displayName}&apos;s account. FuelMe is free for creators.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
