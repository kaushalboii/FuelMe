'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Code, ExternalLink, Printer, QrCode, Zap } from 'lucide-react';
import { Creator } from '@/lib/types';
import { generateUpiQrCode } from '@/lib/upi';
import { formatINR } from '@/lib/utils';

interface EmbedBadgeGeneratorProps {
  creator: Creator;
}

export default function EmbedBadgeGenerator({ creator }: EmbedBadgeGeneratorProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [standeeQrUrl, setStandeeQrUrl] = useState<string>('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fuelme.in';
  const profileUrl = `${baseUrl}/${creator.username}`;

  // Generate a QR code for the creator's profile / default fuel amount
  useEffect(() => {
    generateUpiQrCode({
      upiId: creator.upiId,
      payeeName: creator.displayName,
      amount: creator.unitPrice || 50,
      transactionNote: `Fuel ${creator.displayName} on FuelMe`,
    }).then(setStandeeQrUrl);
  }, [creator]);

  const markdownSnippet = `[![Fuel ${creator.displayName}](${baseUrl}/api/badge/${creator.username})](${profileUrl})`;

  const htmlSnippet = `<a href="${profileUrl}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/⚡_Fuel_${encodeURIComponent(creator.displayName)}-UPI_0%25_Fee-orange?style=for-the-badge" alt="Fuel ${creator.displayName}" />
</a>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePrintStandee = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* GitHub & Website Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-orange-500" />
            <span>Embed Buttons & Badges</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Add FuelMe to your GitHub repository README, portfolio, personal blog, or Substack.
          </p>
        </div>

        {/* Live Preview Button */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">Live Button Preview:</span>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-extrabold shadow-md hover:shadow-orange-500/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Fuel {creator.displayName}</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">UPI</span>
            </a>
          </div>
          <span className="text-xs text-slate-400">Links to {profileUrl}</span>
        </div>

        {/* Markdown Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">GitHub README (Markdown)</label>
            <button
              onClick={() => handleCopy(markdownSnippet, 'markdown')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              {copiedType === 'markdown' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'markdown' ? 'Copied' : 'Copy Markdown'}
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto">
            {markdownSnippet}
          </pre>
        </div>

        {/* HTML Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Website & Portfolio (HTML)</label>
            <button
              onClick={() => handleCopy(htmlSnippet, 'html')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'html' ? 'Copied' : 'Copy HTML'}
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto">
            {htmlSnippet}
          </pre>
        </div>
      </div>

      {/* Printable QR Standee for Creator Desk / Stream */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-orange-500" />
              <span>Printable Desk Standee & Stream Overlay</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Print this high-resolution card for your YouTube stream background, hackathon desk, or coffee meetups!
            </p>
          </div>

          <button
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            Print Card
          </button>
        </div>

        {/* Standee Preview Card */}
        <div className="max-w-xs mx-auto p-6 rounded-3xl bg-gradient-to-b from-orange-500 to-amber-500 text-white text-center shadow-xl border-4 border-white space-y-4">
          <div className="flex items-center justify-center gap-1.5 font-black text-sm uppercase tracking-widest bg-white/20 py-1 px-3 rounded-full mx-auto w-fit">
            <Zap className="w-4 h-4 fill-white" /> FuelMe 🇮🇳
          </div>

          <div>
            <h4 className="text-xl font-black">Fuel {creator.displayName}</h4>
            <p className="text-xs text-orange-100 font-mono">@{creator.username}</p>
          </div>

          <div className="p-3 bg-white rounded-2xl shadow-inner mx-auto w-44 h-44 flex items-center justify-center">
            {standeeQrUrl ? (
              <img src={standeeQrUrl} alt="Standee QR" className="w-full h-full object-contain" />
            ) : (
              <div className="text-slate-400 text-xs">Loading QR...</div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold text-orange-100">Scan with any UPI app</p>
            <p className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded text-white inline-block">
              UPI ID: {creator.upiId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

