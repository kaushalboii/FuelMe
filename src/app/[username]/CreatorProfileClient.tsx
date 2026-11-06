'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, Globe, Github, Twitter, Linkedin, Youtube, 
  Share2, Check, Heart, Zap, Sparkles, MessageSquare, Award, ArrowLeft,
  Coffee, Target, Lock, Crown, Users, Send
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SupportWidget from '@/components/SupportWidget';
import UpiPaymentModal from '@/components/UpiPaymentModal';
import GoalProgressBar from '@/components/GoalProgressBar';
import { Creator, SupportTransaction } from '@/lib/types';
import { getCreatorByUsername, getStoredTransactions } from '@/lib/store';
import { formatINR, getFuelUnitDetails, getCreatorUrl } from '@/lib/utils';

export default function CreatorProfileClient() {
  const params = useParams();
  const rawUsername = Array.isArray(params?.username) ? params.username[0] : (params?.username as string) || '';
  const username = decodeURIComponent(rawUsername).replace('@', '');

  const [creator, setCreator] = useState<Creator | null>(null);
  const [transactions, setTransactions] = useState<SupportTransaction[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'support' | 'membership' | 'posts'>('support');
  const [likedMap, setLikedMap] = useState<Record<string, number>>({});
  const [membershipModal, setMembershipModal] = useState<{ amount: number; tierName: string } | null>(null);

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
      <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 text-3xl">
            ☕
          </div>
          <h2 className="text-2xl font-black text-stone-900">Creator @{username} not found</h2>
          <p className="text-sm text-stone-600 mt-2 mb-6">
            Want this username for your creator page? Create your free UPI FuelMe page now!
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard/profile"
              className="px-5 py-2.5 rounded-2xl bg-[#FFDD00] text-stone-950 text-xs font-black hover:bg-amber-300 shadow-sm transition-colors"
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
    const url = getCreatorUrl(creator.username);
    if (navigator.share) {
      navigator.share({
        title: `Buy ${creator.displayName} a ${unit.name} on FuelMe`,
        text: `Support ${creator.displayName}'s work directly via UPI on FuelMe!`,
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      <Navbar />

      {/* Profile Cover Banner */}
      <div className="relative h-44 sm:h-56 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 overflow-hidden">
        <div className="absolute inset-0 bg-stone-950/10 backdrop-blur-[1px]" />
        <div className="max-w-6xl mx-auto px-4 h-full flex items-end pb-4 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Creators</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 pb-24 flex-grow w-full">
        
        {/* Creator Info Card (Clean BMC Card) */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm relative mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
            
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative">
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-md bg-stone-100"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFDD00] text-stone-950 flex items-center justify-center text-base shadow border-2 border-white">
                  {unit.emoji}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {creator.displayName}
                  </h1>
                  {creator.verified && (
                    <CheckCircle className="w-5 h-5 text-amber-500 fill-amber-50" />
                  )}
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    Creator
                  </span>
                </div>

                <p className="text-xs font-bold text-stone-500 font-mono">
                  fuelme.in/@{creator.username}
                </p>

                <p className="text-xs font-semibold text-amber-800 mt-0.5">
                  {creator.headline}
                </p>

                {/* Supporters & Fuels Counter */}
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-stone-600 font-medium">
                  <span className="flex items-center gap-1">
                    <strong className="text-stone-900 font-bold">{creator.totalSupporters}</strong> supporters
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <strong className="text-stone-900 font-bold">{formatINR(creator.totalEarnings)}</strong> raised
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied!' : 'Share Page'}
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line max-w-3xl">
              {creator.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 pt-4 border-t border-stone-100">
            {creator.socials.github && (
              <a
                href={creator.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                className="p-2 rounded-full text-stone-500 hover:text-sky-500 hover:bg-stone-100 transition-colors"
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
                className="p-2 rounded-full text-stone-500 hover:text-blue-600 hover:bg-stone-100 transition-colors"
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
                className="p-2 rounded-full text-stone-500 hover:text-rose-600 hover:bg-stone-100 transition-colors"
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
                className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* BMC Navigation Tabs: Support | Memberships | Posts */}
        <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-stone-200/80 mb-8 pb-3">
          <button
            onClick={() => setActiveTab('support')}
            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all ${
              activeTab === 'support'
                ? 'bg-[#FFDD00] text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
            }`}
          >
            Support ☕
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all ${
              activeTab === 'membership'
                ? 'bg-[#FFDD00] text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
            }`}
          >
            Membership 👑
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all ${
              activeTab === 'posts'
                ? 'bg-[#FFDD00] text-stone-950 shadow-sm'
                : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
            }`}
          >
            Posts 📝
          </button>
        </div>

        {/* Tab 1: Support View (Card + Feed) */}
        {activeTab === 'support' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Supporter Feed & Creator Goal (7 cols) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              
              {/* Creator Goal */}
              {creator.goal && creator.goal.isActive && (
                <GoalProgressBar
                  title={creator.goal.title}
                  targetAmount={creator.goal.targetAmount}
                  currentAmount={creator.goal.currentAmount}
                />
              )}

              {/* Recent Supporters Feed (BMC Signature Feed) */}
              <div className="bg-white rounded-[2rem] p-6 border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <h3 className="font-black text-stone-900 text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span>Recent Supporters</span>
                  </h3>
                  <span className="text-xs font-bold text-stone-500">
                    {transactions.length} contributions
                  </span>
                </div>

                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 text-xs">
                      Be the first supporter to buy {creator.displayName} a {unit.name}! ☕
                    </div>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-100 space-y-2 hover:border-amber-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-950 font-black flex items-center justify-center text-xs shadow-inner">
                              {tx.supporterName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-900">
                                <strong>{tx.supporterName}</strong> bought {tx.fuelUnitsCount} {unit.plural.toLowerCase()}
                              </p>
                              <p className="text-[10px] text-stone-400">
                                {tx.timestamp}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-black text-amber-900 bg-[#FFDD00]/70 px-2.5 py-1 rounded-full">
                            {formatINR(tx.amount)}
                          </span>
                        </div>

                        {tx.supporterMessage && (
                          <p className="text-xs text-stone-700 pl-12 italic leading-relaxed">
                            &ldquo;{tx.supporterMessage}&rdquo;
                          </p>
                        )}

                        <div className="pl-12 pt-1 flex items-center gap-3">
                          <button
                            onClick={() => handleLike(tx.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-rose-500 transition-colors"
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedMap[tx.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span>{(likedMap[tx.id] || 0) + 1}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Support Widget Sticky (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4 order-1 lg:order-2">
              <SupportWidget
                creator={creator}
                onPaymentSuccess={() => {
                  refreshData();
                }}
              />
            </div>

          </div>
        )}

        {/* Tab 2: Memberships View (BMC Club Style) */}
        {activeTab === 'membership' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center max-w-lg mx-auto space-y-1 mb-8">
              <h3 className="text-2xl font-black text-stone-900">Membership Tiers</h3>
              <p className="text-xs text-stone-500">
                Support {creator.displayName} on a monthly basis and unlock exclusive supporter perks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-lg">
                    ☕
                  </div>
                  <h4 className="font-bold text-stone-900 text-base">Chai Club</h4>
                  <div className="text-2xl font-black text-stone-900">
                    ₹99 <span className="text-xs font-semibold text-stone-400">/ month</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-1.5">✓ Supporter badge on profile</li>
                    <li className="flex items-center gap-1.5">✓ Access to exclusive updates</li>
                    <li className="flex items-center gap-1.5">✓ My eternal gratitude!</li>
                  </ul>
                </div>
                <button
                  onClick={() => setMembershipModal({ amount: 99, tierName: 'Chai Club' })}
                  className="w-full py-3 rounded-2xl bg-[#FFDD00] text-stone-950 font-black text-xs hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Join for ₹99/mo (UPI)
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#FFDD00] shadow-md space-y-4 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-5 bg-stone-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Popular
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-lg">
                    ⚡
                  </div>
                  <h4 className="font-bold text-stone-900 text-base">Fuel Club</h4>
                  <div className="text-2xl font-black text-stone-900">
                    ₹299 <span className="text-xs font-semibold text-stone-400">/ month</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-1.5">✓ All Chai Club benefits</li>
                    <li className="flex items-center gap-1.5">✓ Early access to new open-source repos</li>
                    <li className="flex items-center gap-1.5">✓ Private Discord / Telegram group</li>
                  </ul>
                </div>
                <button
                  onClick={() => setMembershipModal({ amount: 299, tierName: 'Fuel Club' })}
                  className="w-full py-3 rounded-2xl bg-[#FFDD00] text-stone-950 font-black text-xs hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Join for ₹299/mo (UPI)
                </button>
              </div>

              {/* Tier 3 */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-lg">
                    👑
                  </div>
                  <h4 className="font-bold text-stone-900 text-base">Believer</h4>
                  <div className="text-2xl font-black text-stone-900">
                    ₹999 <span className="text-xs font-semibold text-stone-400">/ month</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                    <li className="flex items-center gap-1.5">✓ All Fuel Club benefits</li>
                    <li className="flex items-center gap-1.5">✓ 1-on-1 monthly 30-min call</li>
                    <li className="flex items-center gap-1.5">✓ Name featured in project README</li>
                  </ul>
                </div>
                <button
                  onClick={() => setMembershipModal({ amount: 999, tierName: 'Believer VIP' })}
                  className="w-full py-3 rounded-2xl bg-[#FFDD00] text-stone-950 font-black text-xs hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Join for ₹999/mo (UPI)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Creator Posts */}
        {activeTab === 'posts' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Announcement · 3 days ago
              </span>
              <h4 className="text-lg font-black text-stone-900">
                Welcome to my FuelMe page! 🚀
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hey everyone! I moved over from Buy Me a Coffee to FuelMe so Indian supporters can send support directly with 0% platform deductions via UPI. Huge thanks to everyone who has fueled my recent work!
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Project Update · 1 week ago
              </span>
              <h4 className="text-lg font-black text-stone-900">
                New open-source release is out!
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Check out the latest release on my GitHub. If you found it helpful, consider buying me a Chai ☕!
              </p>
            </div>
          </div>
        )}

      </div>

      {membershipModal && (
        <UpiPaymentModal
          creator={creator}
          amount={membershipModal.amount}
          unitsCount={1}
          supporterName=""
          supporterEmail=""
          supporterMessage={`Joined ${membershipModal.tierName} 👑`}
          isAnonymous={false}
          isOpen={true}
          onClose={() => setMembershipModal(null)}
          onSuccess={() => {
            setMembershipModal(null);
            refreshData();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
