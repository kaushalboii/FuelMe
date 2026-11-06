'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Flame, Compass, LayoutDashboard, UserCheck, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { getLoggedInUsername } from '@/lib/store';

export default function Navbar() {
  const [username, setUsername] = useState('kaushal');

  useEffect(() => {
    setUsername(getLoggedInUsername());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-5 h-5 fill-white stroke-none" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">
                Fuel<span className="text-orange-600">Me</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase tracking-wider">
                🇮🇳 UPI 0% Fee
              </span>
            </div>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/explore" className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
            <Compass className="w-4 h-4" />
            Explore Creators
          </Link>
          <Link href="/#zero-fee" className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Why 100% Free?
          </Link>
          <Link href="/#how-it-works" className="hover:text-orange-600 transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${username}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <UserCheck className="w-3.5 h-3.5 text-orange-600" />
            View @{username}
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-orange-500" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5"
          >
            <span>Set Up My Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

