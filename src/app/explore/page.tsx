'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, CheckCircle, ArrowRight, Heart, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Creator } from '@/lib/types';
import { getStoredCreators } from '@/lib/store';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';

export default function ExplorePage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setCreators(getStoredCreators());
  }, []);

  const categories = ['All', 'Developer', 'Open Source', 'Student', 'Indie Maker', 'Design', 'YouTube'];

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || (c.categories && c.categories.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full space-y-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Indian Talent 🇮🇳</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore & Fuel Incredible Creators
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Support indie developers building open-source projects, students sharing free tutorials, and artists crafting digital works. Every UPI contribution empowers real makers.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, skill, or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => {
            const unit = getFuelUnitDetails(creator.fuelUnit);
            return (
              <div
                key={creator.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.displayName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                            {creator.displayName}
                          </h3>
                          {creator.verified && (
                            <CheckCircle className="w-4 h-4 text-orange-500 fill-orange-100" />
                          )}
                        </div>
                        <p className="text-xs font-mono text-slate-500">@{creator.username}</p>
                      </div>
                    </div>

                    <span className="text-lg bg-orange-50 p-2 rounded-xl border border-orange-100">
                      {unit.emoji}
                    </span>
                  </div>

                  {/* Headline & Bio */}
                  <div>
                    <p className="text-xs font-bold text-orange-600 mb-1">{creator.headline}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {creator.bio}
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1.5">
                    {creator.categories.map((c) => (
                      <span key={c} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">Total Support</span>
                    <strong className="text-slate-900 font-bold">{formatINR(creator.totalEarnings)}</strong>
                  </div>

                  <Link
                    href={`/${creator.username}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-700 text-xs font-bold transition-all group-hover:bg-orange-600 group-hover:text-white"
                  >
                    <span>Fuel {creator.displayName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
