'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Smartphone, ShieldCheck, Heart, Sparkles, Check, 
  ArrowRight, IndianRupee, QrCode, Code, Users, Gift, ChevronRight, Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';

export default function HomePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [supporterName, setSupporterName] = useState('Rahul');
  const [supporterMsg, setSupporterMsg] = useState('Keep building great open-source tools! ⚡');

  const presetAmounts = [20, 50, 100, 200, 500];

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-400/20 via-amber-300/20 to-red-400/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>The Indian Creator Support Platform · 100% Free UPI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Your talent deserves a little <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">Fuel. ⚡</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A creator-support platform designed specifically for Indian developers, indie makers, students, artists and creators.
                <strong className="text-slate-800 font-semibold"> No Stripe account required. No 5% platform fee cut. No KYC blocks.</strong> Direct UPI support straight to your bank account.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/dashboard/profile"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Claim Your FuelMe Page (Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/kaushal"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>See Live Demo (@kaushal)</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>0% Platform Commission</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>GPay, PhonePe, Paytm & BHIM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Instant ₹ T+0 Direct Settlement</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200/80">
                {/* Badge header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      alt="Kaushal"
                      className="w-12 h-12 rounded-xl object-cover border border-orange-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Kaushal</h3>
                      <p className="text-[11px] font-mono text-slate-500">@kaushal · Developer & Maker</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    ⚡ Fuel Me
                  </span>
                </div>

                {/* Body message */}
                <div className="py-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you enjoy my open-source tools and projects, you can fuel my work! Every little contribution helps keep the servers running. ☕🇮🇳
                  </p>

                  {/* Preset Amount Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Choose Support Amount
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedAmount(amt)}
                          className={`py-2 rounded-xl text-xs font-black transition-all ${
                            selectedAmount === amt
                              ? 'bg-orange-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supporter inputs mock */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex justify-between items-center">
                      <span className="text-slate-400">Supporter:</span>
                      <span className="font-semibold">{supporterName}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 italic text-[11px]">
                      &ldquo;{supporterMsg}&rdquo;
                    </div>
                  </div>

                  {/* Total preview */}
                  <div className="pt-2">
                    <Link
                      href="/kaushal"
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all group"
                    >
                      <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span>Support with {formatINR(selectedAmount)} via UPI</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Illustrative checkout preview</span>
                  <span className="text-emerald-600 font-semibold">100% Free · NPCI Spec</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section: Why FuelMe is 100% Free & Zero-Block */}
      <section id="zero-fee" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Why We Built FuelMe
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Designed Around How Indians Actually Pay
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              International platforms force Indian creators through complicated Stripe KYC, foreign currency conversions, and high cuts. We believe independent makers should receive every single rupee they earn.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Buy Me a Coffee */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Traditional Platform</span>
                <h3 className="text-xl font-bold text-slate-900">Buy Me a Coffee</h3>
              </div>
              <div className="text-2xl font-black text-rose-500">
                5% Fee <span className="text-xs text-slate-500 font-normal">+ Stripe charges</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Requires Stripe account with strict compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>No native deep-linked UPI intent for PhonePe/GPay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Weekly or monthly payout holds (up to 7-14 days)</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Standard Payment Gateways */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Indian Gateways</span>
                <h3 className="text-xl font-bold text-slate-900">Razorpay / Cashfree</h3>
              </div>
              <div className="text-2xl font-black text-amber-600">
                2% + 18% GST <span className="text-xs text-slate-500 font-normal">per transaction</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>Requires registered business PAN, GSTIN, or audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>High rejection rate for individual students & hobbyists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>T+2 settlement delay and risk of account freeze</span>
                </li>
              </ul>
            </div>

            {/* Card 3: FuelMe (Winner) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-orange-50 to-amber-50 border-2 border-orange-500 shadow-xl space-y-4 relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Best For Indian Makers
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-600 uppercase">Zero Middleman</span>
                <h3 className="text-xl font-black text-slate-950 flex items-center gap-1.5">
                  <span>FuelMe</span>
                  <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                </h3>
              </div>
              <div className="text-2xl font-black text-emerald-600">
                0% Commission <span className="text-xs text-slate-500 font-normal">Forever Free</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Direct Peer-to-Peer UPI:</strong> 100% of money arrives immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero KYC Hurdles:</strong> Just paste your existing UPI ID and go</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>No Account Suspensions:</strong> Money is never held in an escrow</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section id="how-it-works" className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Get Started in 30 Seconds
            </h2>
            <p className="text-sm text-slate-600">
              No technical setup, no payment gateway approvals, no waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Create Your Page</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your username (e.g. <code>fuelme.in/@kaushal</code>), upload an avatar, pick your fuel unit (Chai ☕ or Fuel ⚡) and enter your existing UPI ID.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Share Your Fuel Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Put your link in your GitHub README, YouTube description, Twitter/X bio, personal portfolio, or print our ready-made QR standee card.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Receive 100% via UPI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supporters tap to pay or scan the dynamic QR code with any UPI app. Funds instantly arrive in your bank account with zero cuts or delays.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Standout Features */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Features Built for Indian Makers
            </h2>
            <p className="text-sm text-slate-600">
              Everything you need to turn appreciation into tangible support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">1-Tap UPI Intent</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                On mobile, supporters can launch Google Pay, PhonePe, Paytm, or BHIM with a single tap. The amount and payee details are pre-filled automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Dynamic UPI QR Codes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desktop visitors get a high-resolution QR code that can be scanned by any smartphone camera or UPI scanner for frictionless payments.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">GitHub README Badges</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Auto-generate markdown and HTML badges for your open-source repositories to turn GitHub stars into active supporters.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Campaign Goals</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Set milestones for a new keyboard, college tuition, hosting costs, or podcast mic with a real-time progress bar.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Supporter Wall & Messages</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Read heartfelt thank-you notes from people who find your tutorials, repos, and designs valuable.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Indian Signature Units</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose between Chai ☕, Samosa 🥟, Coffee ☕, Rocket Fuel 🚀, or Pizza 🍕 to match your creative identity.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to get fueled by your audience?
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Join the movement of Indian developers, students, and indie hackers earning directly with zero platform cuts.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span>Claim Your Free Page in 30 Seconds</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
