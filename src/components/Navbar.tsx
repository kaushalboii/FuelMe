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
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand: FuelMe (BMC Style) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-[#FFDD00] flex items-center justify-center text-stone-950 font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-stone-950">
                Fuel<span className="text-amber-600">Me</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase tracking-wider">
                🇮🇳 UPI 0%
              </span>
            </div>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-stone-600">
          <Link href="/explore" className="hover:text-stone-950 transition-colors flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            Explore Creators
          </Link>
          <Link href="/#zero-fee" className="hover:text-stone-950 transition-colors flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            0% Fee Guarantee
          </Link>
          <Link href="/#how-it-works" className="hover:text-stone-950 transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/${username}`}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 hover:bg-stone-200/60 transition-all"
          >
            <span>@{username}</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-stone-900 border border-stone-300 hover:bg-white transition-all shadow-sm"
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
