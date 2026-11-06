'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Compass, LayoutDashboard, UserCheck, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { getLoggedInUsername } from '@/lib/store';

export default function Navbar() {
  const [username, setUsername] = useState('kaushal');

  useEffect(() => {
    setUsername(getLoggedInUsername());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        {/* Brand: FuelMe (Buy Me a Coffee Style) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#FFDD00] border border-amber-300 flex items-center justify-center text-stone-950 font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
            ☕
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-stone-950">
                Fuel<span className="text-amber-500">Me</span>
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-stone-900 border border-amber-200 uppercase tracking-wider">
                🇮🇳 0% UPI
              </span>
            </div>
            <span className="text-[10px] text-stone-500 font-medium -mt-1 hidden sm:inline">
              Buy Me a Coffee for India
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-stone-700">
          <Link href="/explore" className="hover:text-stone-950 transition-colors flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-stone-500" />
            Explore Creators
          </Link>
          <Link href="/#zero-fee" className="hover:text-stone-950 transition-colors flex items-center gap-1.5 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            0% Platform Fee
          </Link>
          <Link href="/#faq" className="hover:text-stone-950 transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/explore"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 hover:bg-stone-200/60 transition-all"
          >
            Log in
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-stone-900 border border-stone-300 bg-white hover:bg-stone-50 transition-all shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-stone-600" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-stone-950 bg-[#FFDD00] hover:bg-amber-300 shadow-sm transition-all hover:scale-105 active:scale-100"
          >
            <span>Start my page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
