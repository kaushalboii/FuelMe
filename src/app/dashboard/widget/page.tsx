'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmbedBadgeGenerator from '@/components/EmbedBadgeGenerator';
import { Creator } from '@/lib/types';
import { getCreatorByUsername, getLoggedInUsername } from '@/lib/store';

export default function WidgetPage() {
  const [creator, setCreator] = useState<Creator | null>(null);

  useEffect(() => {
    const user = getLoggedInUsername();
    const c = getCreatorByUsername(user);
    if (c) {
      setCreator(c);
    }
  }, []);

  if (!creator) return null;

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <Link
            href={`/${creator.username}`}
            target="_blank"
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            View Live Page →
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Code className="w-6 h-6 text-orange-500" />
            <span>Embeddable Buttons, Badges & QR Standee</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Let your audience fuel you from anywhere — GitHub, your portfolio, your YouTube stream or physical events.
          </p>
        </div>

        <EmbedBadgeGenerator creator={creator} />

      </main>

      <Footer />
    </div>
  );
}

