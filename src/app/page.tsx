'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, Smartphone, ShieldCheck, Heart, Sparkles, Check, 
  ArrowRight, IndianRupee, QrCode, Code, Users, Gift, ChevronRight, Award, Coffee
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [claimUsername, setClaimUsername] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>(150);
  const [coffeeCount, setCoffeeCount] = useState<number>(3);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = claimUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (clean) {
      router.push(`/dashboard/profile`);
    } else {
      router.push(`/dashboard/profile`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      <Navbar />

      {/* Hero Section (BMC Style) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-950 text-xs font-bold shadow-sm">
                <span>☕ Indian Version of Buy Me a Coffee</span>
                <span>·</span>
                <span className="text-emerald-700 font-extrabold">100% Free UPI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.12]">
                Give your audience an easy way to say <span className="underline decoration-[#FFDD00] decoration-wavy decoration-2">thanks.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                FuelMe makes supporting creators fun and effortless. Fans in India can buy you a Chai ☕, support your open-source work ⚡, or fund your next project with ₹10, ₹50, ₹100 or any custom amount — <strong>directly via UPI with 0% platform cuts</strong>.
              </p>

              {/* BMC's Signature Claim Handle Bar */}
              <form onSubmit={handleClaim} className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="p-1.5 bg-white rounded-full border-2 border-stone-200/90 shadow-md flex items-center justify-between gap-1 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                  <span className="pl-4 text-xs font-black text-stone-400 select-none font-mono">
                    fuelme.in/
                  </span>
                  <input
                    type="text"
                    placeholder="yourname"
                    value={claimUsername}
                    onChange={(e) => setClaimUsername(e.target.value)}
                    className="w-full px-1 py-2 text-xs font-bold text-stone-900 bg-transparent focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-full bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-100 cursor-pointer"
                  >
                    Start my page
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 pl-2 text-center lg:text-left">
                  It&apos;s free, takes 1 minute, and requires zero KYC documents.
                </p>
              </form>

              {/* Quick stats / Highlights */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-bold text-stone-500">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>0% Platform Commission</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Google Pay, PhonePe, Paytm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Instant ₹ T+0 to Bank</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signature BMC Card Live Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-[2.5rem] bg-white p-6 shadow-xl border border-stone-200/90 space-y-4">
                
                {/* Creator Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Kaushal"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FFDD00]"
                  />
                  <div>
                    <h3 className="font-black text-stone-950 text-sm">Kaushal</h3>
                    <p className="text-[11px] font-mono text-stone-500">@kaushal · Developer & Maker</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  If you enjoy my open-source tools and tutorials, you can buy me a Chai! Every contribution keeps the servers running. ☕🇮🇳
                </p>

                {/* BMC Signature Pill Row */}
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">☕</span>
                    <span className="text-xs font-bold text-stone-400">×</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 3, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => {
                          setCoffeeCount(cnt);
                          setSelectedAmount(cnt * 50);
                        }}
                        className={`w-9 h-9 rounded-full font-black text-xs transition-all ${
                          coffeeCount === cnt
                            ? 'bg-[#FFDD00] text-stone-950 shadow-sm scale-105'
                            : 'bg-white border border-stone-200 text-stone-700'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-black text-stone-900 bg-white px-2 py-1 rounded-full border border-stone-200">
                    {formatINR(coffeeCount * 50)}
                  </span>
                </div>

                {/* Supporter note mock */}
                <div className="p-3 rounded-2xl bg-[#faf8f5] border border-stone-200 text-xs italic text-stone-600">
                  &ldquo;Loved your open-source script for Indian payment testing! Keep building bro 🔥&rdquo;
                </div>

                {/* Big Button Link to Demo */}
                <Link
                  href="/kaushal"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all group"
                >
                  <span>Support {formatINR(selectedAmount)} via UPI</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="pt-2 flex items-center justify-between text-[10px] text-stone-400">
                  <span>Direct UPI Transfer</span>
                  <span className="text-emerald-700 font-bold">0% Cut · NPCI Spec</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section (BMC 5% vs FuelMe 0%) */}
      <section id="zero-fee" className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Why FuelMe?
            </span>
            <h2 className="text-3xl font-black text-stone-950 tracking-tight">
              Built for How Indians Actually Pay
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              International platforms force Indian creators through Stripe documentation, weekly delays, and high fees. We made it zero-middleman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-[2rem] bg-[#faf8f5] border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-400 uppercase">Original</span>
              <h3 className="text-lg font-bold text-stone-900">Buy Me a Coffee</h3>
              <div className="text-2xl font-black text-rose-500">
                5% Platform Fee
              </div>
              <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <li>✕ Requires Stripe account</li>
                <li>✕ Frequent Indian domestic card blocks</li>
                <li>✕ 7 to 14 days payout delay</li>
              </ul>
            </div>

            <div className="p-6 rounded-[2rem] bg-[#faf8f5] border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-400 uppercase">Payment Gateway</span>
              <h3 className="text-lg font-bold text-stone-900">Razorpay / Cashfree</h3>
              <div className="text-2xl font-black text-amber-600">
                2% + 18% GST
              </div>
              <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <li>✕ Requires business PAN & website audit</li>
                <li>✕ Hard for students & independent hobbyists</li>
                <li>✕ T+2 days settlement</li>
              </ul>
            </div>

            <div className="p-6 rounded-[2rem] bg-amber-50/80 border-2 border-amber-400 space-y-3 relative shadow-md">
              <div className="absolute -top-3 right-5 bg-stone-950 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Best For India
              </div>
              <span className="text-xs font-bold text-amber-800 uppercase">Direct NPCI Protocol</span>
              <h3 className="text-lg font-black text-stone-950 flex items-center gap-1.5">
                <span>FuelMe</span>
                <span className="text-amber-500">⚡</span>
              </h3>
              <div className="text-2xl font-black text-emerald-700">
                0% Fee · Free Forever
              </div>
              <ul className="space-y-2 text-xs text-stone-700 font-medium pt-2 border-t border-amber-200">
                <li className="flex items-center gap-1.5 text-emerald-800 font-bold">✓ 100% directly to your bank account</li>
                <li className="flex items-center gap-1.5">✓ No business documents or KYC delays</li>
                <li className="flex items-center gap-1.5">✓ Instant T+0 second settlement</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3 Step How It Works */}
      <section id="how-it-works" className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-stone-950 tracking-tight">
              Start Receiving Support in 3 Steps
            </h2>
            <p className="text-xs text-stone-600">
              No merchant gateway approvals or complicated code required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFDD00] text-stone-950 font-black text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-black text-stone-900 text-base">Claim Your Page</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Choose your unique URL like <code>fuelme.in/@kaushal</code> and enter your existing Google Pay, PhonePe, or Paytm UPI ID.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFDD00] text-stone-950 font-black text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-black text-stone-900 text-base">Share Your Link</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Add your FuelMe button to your GitHub README, personal portfolio, YouTube description, or Twitter bio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm space-y-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFDD00] text-stone-950 font-black text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-black text-stone-900 text-base">Receive 100% via UPI</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Supporters tap to pay or scan the dynamic QR code with any UPI app. Funds instantly arrive in your bank account with zero fees.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to start receiving support?
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            Join Indian developers, students, and makers building on their own terms.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFDD00] text-stone-950 hover:bg-amber-300 font-black text-xs shadow-xl transition-all hover:scale-105 active:scale-100"
            >
              <span>Create My Free Creator Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
