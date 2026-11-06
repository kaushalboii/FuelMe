'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, Heart, Sparkles, Check, ArrowRight, IndianRupee, QrCode, 
  Code, Users, Gift, ChevronRight, Award, Coffee, Star, ShieldCheck,
  ChevronDown, MessageSquare, ExternalLink, Play, Globe, CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';
import { INITIAL_CREATORS } from '@/lib/data';

export default function HomePage() {
  const router = useRouter();
  const [claimUsername, setClaimUsername] = useState('');
  const [coffeeCount, setCoffeeCount] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('Developers');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = claimUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (clean) {
      router.push(`/dashboard/profile?username=${clean}`);
    } else {
      router.push(`/dashboard/profile`);
    }
  };

  const categories = ['Developers', 'YouTubers', 'Designers', 'Writers', 'Students', 'Open Source'];

  const faqs = [
    {
      q: 'How do I receive payments?',
      a: 'Directly into your bank account via your existing UPI ID (Google Pay, PhonePe, Paytm, or BHIM). When a supporter pays, the money moves peer-to-peer into your account within seconds (instant T+0 settlement).'
    },
    {
      q: 'Is FuelMe really 100% free with 0% platform fee?',
      a: 'Yes! Unlike Buy Me a Coffee (which charges 5% plus international currency conversion fees) or Patreon (8-12%), FuelMe leverages the open NPCI UPI infrastructure. We take 0% commission, and you keep 100% of what your supporters give you.'
    },
    {
      q: 'Do my supporters need an account or app download to support me?',
      a: 'No! Supporters do not need to register, log in, or install anything. They simply click your link or scan the QR code with any UPI app already installed on their phone.'
    },
    {
      q: 'Can I add a "Buy me a chai / coffee" badge to my GitHub README or website?',
      a: 'Absolutely! FuelMe provides one-click SVG badges for your GitHub repositories, HTML/iframe code for your personal blog or portfolio, and printable desk QR standees for events and conferences.'
    },
    {
      q: 'Do I need a business bank account or complex KYC verification?',
      a: 'None at all! You can connect your existing personal UPI ID (like yourname@okaxis, yourname@ybl, or yourname@paytm). No business PAN card, GST number, or lengthy audits required.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans selection:bg-[#FFDD00] selection:text-stone-900">
      <Navbar />

      {/* Hero Section (Signature Buy Me a Coffee Layout) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & BMC Claim Bar */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/90 text-stone-900 text-xs font-bold shadow-sm">
                <span className="text-base">☕</span>
                <span>The Indian Alternative to Buy Me a Coffee</span>
                <span className="text-stone-300">|</span>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> 0% Platform Fee
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.12]">
                Give your audience an easy way to say <span className="relative inline-block">
                  <span className="relative z-10">thanks.</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFDD00] -z-0 rounded-sm"></span>
                </span>
              </h1>

              {/* BMC Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                FuelMe makes supporting Indian creators fun and easy. In just a couple of taps, your fans can buy you a coffee ☕ or support your work using <strong>instant UPI (GPay, PhonePe, Paytm)</strong> — directly to your bank account with zero fees.
              </p>

              {/* The Iconic BMC Claim Bar */}
              <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="p-2 bg-white rounded-full border-2 border-stone-200 shadow-md flex items-center justify-between gap-1 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-[#FFDD00]/20 transition-all">
                  <span className="pl-4 text-sm font-black text-stone-400 select-none font-mono">
                    fuelme.in/
                  </span>
                  <input
                    type="text"
                    placeholder="yourname"
                    value={claimUsername}
                    onChange={(e) => setClaimUsername(e.target.value)}
                    className="w-full px-1 py-1.5 text-sm font-bold text-stone-900 bg-transparent focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Start my page
                  </button>
                </div>
                <p className="text-xs text-stone-500 mt-2 pl-2 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  It&apos;s free, takes 1 minute, and requires zero KYC documents.
                </p>
              </form>

              {/* Creator Avatars Social Proof Pill */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Kaushal" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Ananya" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Rohan" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Priya" />
                </div>
                <div className="text-xs font-bold text-stone-700">
                  <div className="flex items-center text-amber-500 text-[11px]">
                    ★★★★★
                  </div>
                  <span>Loved by 10,000+ Indian creators & makers</span>
                </div>
              </div>

            </div>

            {/* Right Column: Signature BMC Card Interactive Live Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-[2.5rem] bg-white p-6 sm:p-7 shadow-xl shadow-stone-200/60 border border-stone-200/90 space-y-4">
                
                {/* Creator Header */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Kaushal"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#FFDD00]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-stone-950 text-base">Kaushal</h3>
                      <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-500 text-white" />
                    </div>
                    <p className="text-xs font-mono text-stone-500">@kaushal · Developer & Maker</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  If you enjoy my open-source tools and tutorials, you can buy me a Chai! Every contribution keeps the servers running. ☕🇮🇳
                </p>

                {/* BMC Signature Pill Row */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">☕</span>
                    <span className="text-xs font-bold text-stone-400">×</span>
                  </div>
                  
                  {/* Pills 1, 3, 5 */}
                  <div className="flex items-center gap-1.5">
                    {[1, 3, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setCoffeeCount(cnt)}
                        className={`w-9 h-9 rounded-full font-black text-xs transition-all ${
                          coffeeCount === cnt
                            ? 'bg-[#FFDD00] text-stone-950 shadow-sm scale-105 ring-2 ring-[#FFDD00]/50'
                            : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-black text-stone-900 bg-white px-2.5 py-1 rounded-full border border-stone-200 shadow-sm">
                    {formatINR(coffeeCount * 50)}
                  </span>
                </div>

                {/* Supporter note mock */}
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/70 text-xs text-stone-600 flex items-start gap-2">
                  <span className="text-base">💬</span>
                  <p className="italic">
                    &ldquo;Loved your open-source script for Indian payment testing! Keep building bro 🔥&rdquo;
                  </p>
                </div>

                {/* Big Button Link to Demo */}
                <Link
                  href="/kaushal"
                  className="w-full py-3.5 px-4 rounded-full bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all group hover:scale-[1.02] active:scale-95"
                >
                  <span>Support {formatINR(coffeeCount * 50)} (UPI ⚡)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Direct NPCI UPI
                  </span>
                  <span className="text-emerald-700 font-black">0% Platform Cut</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Creators Showcase Bar / Carousel (BMC CreatorsCarousel) */}
      <section className="py-12 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-stone-950 tracking-tight">
                Discover creators earning with FuelMe
              </h2>
              <p className="text-xs text-stone-500">
                Over 10,000+ developers, writers, artists, and students accept direct UPI support.
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#FFDD00] text-stone-950 shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Creators Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_CREATORS.map((c) => (
              <Link
                key={c.id}
                href={`/${c.username}`}
                className="p-4 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={c.avatarUrl}
                    alt={c.displayName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-black text-stone-900 text-sm group-hover:text-amber-600 transition-colors">
                      {c.displayName}
                    </h4>
                    <p className="text-[11px] font-mono text-stone-500">@{c.username}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                  {c.bio}
                </p>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 flex items-center gap-1">
                    ☕ {c.totalSupporters || 100}+ coffees
                  </span>
                  <span className="text-[11px] font-black text-amber-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Support <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Ways to Earn (Donations, Memberships, Badges) */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-[#FFDD00] px-3.5 py-1.5 rounded-full">
              Everything You Need
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Designed for how creators actually earn
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Accept one-time support, recurring monthly memberships, and embed badges on your GitHub repositories or personal portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Support / Donations */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200/90 shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                ☕
              </div>
              <h3 className="text-xl font-black text-stone-950">
                Direct UPI Support
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Fans can buy you a coffee for ₹50, ₹100, ₹200 or any custom amount. They don&apos;t need an account or credit card. Just a 1-tap UPI payment.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100 font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Instant settlement to your bank</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Leave personalized supporter messages</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Optional anonymous support</li>
              </ul>
            </div>

            {/* 2. Memberships */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200/90 shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                👑
              </div>
              <h3 className="text-xl font-black text-stone-950">
                Monthly Memberships
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Earn a predictable recurring income by accepting monthly support from your biggest fans with customized tiers and perks.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100 font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> ₹99, ₹299, ₹999 custom tiers</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Exclusive patron-only posts</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Discord & Telegram community perks</li>
              </ul>
            </div>

            {/* 3. Embed Badges & Standees */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200/90 shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl">
                🏷️
              </div>
              <h3 className="text-xl font-black text-stone-950">
                GitHub Badges & QR Standees
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Add the iconic &ldquo;Buy me a coffee&rdquo; button to your README or generate a high-res printable QR standee for your desk or meetup.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100 font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Dynamic SVG badges for GitHub</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> One-click HTML embed snippet</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Ready-to-print PDF desk standee</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Comparison Table Section (ComparisonTableRows) */}
      <section id="zero-fee" className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Why FuelMe?
            </span>
            <h2 className="text-3xl font-black text-stone-950 tracking-tight">
              FuelMe vs. Traditional Creator Platforms
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              International platforms charge high commissions, convert currency with forex loss, and hold your money for weeks. We fixed that for India.
            </p>
          </div>

          {/* Detailed Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-[2rem] border border-stone-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-stone-200 text-stone-700 font-black">
                  <th className="py-4 px-6">Feature</th>
                  <th className="py-4 px-6 bg-[#FFDD00]/30 text-stone-950">FuelMe (India UPI)</th>
                  <th className="py-4 px-6">Buy Me a Coffee</th>
                  <th className="py-4 px-6">Patreon</th>
                  <th className="py-4 px-6">Razorpay Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-bold text-stone-900">Platform Cut</td>
                  <td className="py-4 px-6 bg-[#FFDD00]/10 font-black text-emerald-700">0% (Completely Free)</td>
                  <td className="py-4 px-6 text-rose-600">5% Platform Fee</td>
                  <td className="py-4 px-6 text-rose-600">8% to 12% Fee</td>
                  <td className="py-4 px-6 text-amber-700">2% + 18% GST</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-bold text-stone-900">Payment Methods</td>
                  <td className="py-4 px-6 bg-[#FFDD00]/10 font-black text-stone-950">All Indian UPI Apps (GPay, PhonePe, Paytm)</td>
                  <td className="py-4 px-6">Stripe / Credit Cards</td>
                  <td className="py-4 px-6">International Cards</td>
                  <td className="py-4 px-6">Gateway Checkout</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-bold text-stone-900">Payout Speed</td>
                  <td className="py-4 px-6 bg-[#FFDD00]/10 font-black text-emerald-700">Instant T+0 (Direct to Bank)</td>
                  <td className="py-4 px-6 text-stone-500">7 to 14 days delay</td>
                  <td className="py-4 px-6 text-stone-500">Monthly payout</td>
                  <td className="py-4 px-6 text-stone-500">T+2 business days</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-bold text-stone-900">KYC Requirements</td>
                  <td className="py-4 px-6 bg-[#FFDD00]/10 font-black text-emerald-700">Zero (Just your UPI ID)</td>
                  <td className="py-4 px-6 text-stone-500">Strict Stripe verification</td>
                  <td className="py-4 px-6 text-stone-500">Tax forms & Passport</td>
                  <td className="py-4 px-6 text-stone-500">Business PAN & Audits</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-bold text-stone-900">Supporter Sign-up Needed?</td>
                  <td className="py-4 px-6 bg-[#FFDD00]/10 font-black text-emerald-700">No account required</td>
                  <td className="py-4 px-6 text-stone-500">Account required</td>
                  <td className="py-4 px-6 text-stone-500">Account required</td>
                  <td className="py-4 px-6 text-stone-500">OTP / Form fill</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Wall of Love / Reviews Section (reviews.BZz7F_lg.css) */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-[#FFDD00] px-3.5 py-1.5 rounded-full">
              Wall of Love
            </span>
            <h2 className="text-3xl font-black text-stone-950 tracking-tight">
              Loved by creators across India
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Here is what independent makers, developers, and educators say about FuelMe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;I used to lose 5% plus international conversion charges on Buy Me a Coffee. With FuelMe, Indian developers tip me directly on Google Pay and money hits my HDFC bank account in 3 seconds!&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Kaushal" className="w-9 h-9 rounded-full object-cover ring-1 ring-amber-300" />
                <div>
                  <h5 className="font-bold text-stone-900 text-xs">Kaushal</h5>
                  <p className="text-[10px] text-stone-500">Fullstack Indie Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;Setting up Stripe in India as a college student without a registered business was impossible. FuelMe let me set up my page in literally 60 seconds with just my college UPI ID.&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Ananya" className="w-9 h-9 rounded-full object-cover ring-1 ring-amber-300" />
                <div>
                  <h5 className="font-bold text-stone-900 text-xs">Ananya Verma</h5>
                  <p className="text-[10px] text-stone-500">CS Student & Tech Creator</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;My YouTube subscribers love that they can tip ₹20 or ₹50 without typing credit card numbers or OTP passwords. Scan and done! The 0% fee is incredible.&rdquo;
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Rohan" className="w-9 h-9 rounded-full object-cover ring-1 ring-amber-300" />
                <div>
                  <h5 className="font-bold text-stone-900 text-xs">Rohan Roy</h5>
                  <p className="text-[10px] text-stone-500">Tech Reviewer & YouTuber</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions (FaqComp.CPZ3nUQi.css) */}
      <section id="faq" className="py-20 bg-white border-t border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-[#FFDD00] px-3.5 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl font-black text-stone-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Got questions? Here is everything you need to know about FuelMe.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/90 overflow-hidden bg-[#FAF8F5] transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-stone-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-amber-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-600' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Call To Action Banner */}
      <section className="py-20 bg-[#FFDD00] text-stone-950 border-t border-amber-300">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl mx-auto shadow-md">
            ☕
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
            Ready to give your audience an easy way to say thanks?
          </h2>
          <p className="text-sm sm:text-base text-stone-800 max-w-lg mx-auto font-medium">
            Join thousands of Indian creators, developers, and makers. 100% free, direct to bank, zero fees forever.
          </p>
          
          <form onSubmit={handleClaim} className="pt-4 max-w-md mx-auto">
            <div className="p-2 bg-white rounded-full border-2 border-stone-950 shadow-xl flex items-center justify-between gap-1">
              <span className="pl-4 text-sm font-black text-stone-400 select-none font-mono">
                fuelme.in/
              </span>
              <input
                type="text"
                placeholder="yourname"
                value={claimUsername}
                onChange={(e) => setClaimUsername(e.target.value)}
                className="w-full px-1 py-1.5 text-sm font-bold text-stone-900 bg-transparent focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-black text-xs transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              >
                Start my page
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
