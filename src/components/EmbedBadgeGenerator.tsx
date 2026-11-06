'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Code, ExternalLink, Printer, QrCode, Zap } from 'lucide-react';
import { Creator } from '@/lib/types';
import { generateUpiQrCode } from '@/lib/upi';
import { formatINR, getBaseUrl, getCreatorUrl } from '@/lib/utils';

interface EmbedBadgeGeneratorProps {
  creator: Creator;
}

export default function EmbedBadgeGenerator({ creator }: EmbedBadgeGeneratorProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [standeeQrUrl, setStandeeQrUrl] = useState<string>('');
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    const base = getBaseUrl();
    const prof = getCreatorUrl(creator.username);
    setBaseUrl(base);
    setProfileUrl(prof);

    generateUpiQrCode({
      upiId: creator.upiId,
      payeeName: creator.displayName,
      amount: creator.unitPrice || 50,
      transactionNote: `Fuel ${creator.displayName} on FuelMe`,
    }).then(setStandeeQrUrl);
  }, [creator]);

  const markdownSnippet = `[![Fuel ${creator.displayName}](${baseUrl}/api/badge/${creator.username})](${profileUrl})`;

  const htmlSnippet = `<a href="${profileUrl}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/☕_Buy_Me_a_Coffee-0%25_Fee_UPI-FFDD00?style=for-the-badge&logoColor=black&labelColor=18181b" alt="Buy ${creator.displayName} a coffee" />
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
    <div className="space-y-8 font-sans">
      {/* GitHub & Website Badges */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-amber-500" />
            <span>Embed Buttons & Badges</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Add FuelMe to your GitHub repository README, portfolio, personal blog, or Substack.
          </p>
        </div>

        {/* Live Preview Button */}
        <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-500">Live Button Preview:</span>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFDD00] text-stone-950 text-xs font-black shadow-sm hover:scale-105 transition-all"
            >
              <span>☕ Buy {creator.displayName} a coffee</span>
              <span className="bg-stone-950/10 px-2 py-0.5 rounded-full text-[10px]">UPI</span>
            </a>
          </div>
          <span className="text-xs font-mono text-stone-400 break-all">{profileUrl}</span>
        </div>

        {/* Markdown Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-700">GitHub README (Markdown)</label>
            <button
              onClick={() => handleCopy(markdownSnippet, 'markdown')}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
            >
              {copiedType === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'markdown' ? 'Copied' : 'Copy Markdown'}
            </button>
          </div>
          <pre className="p-3.5 bg-stone-900 text-stone-200 rounded-2xl text-xs font-mono overflow-x-auto">
            {markdownSnippet}
          </pre>
        </div>

        {/* HTML Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-700">Website & Portfolio (HTML)</label>
            <button
              onClick={() => handleCopy(htmlSnippet, 'html')}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
            >
              {copiedType === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedType === 'html' ? 'Copied' : 'Copy HTML'}
            </button>
          </div>
          <pre className="p-3.5 bg-stone-900 text-stone-200 rounded-2xl text-xs font-mono overflow-x-auto">
            {htmlSnippet}
          </pre>
        </div>
      </div>

      {/* Printable QR Standee for Creator Desk / Stream */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-amber-500" />
              <span>Printable Desk Standee & Stream Overlay</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Print this high-resolution card for your YouTube stream background, hackathon desk, or coffee meetups!
            </p>
          </div>

          <button
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            Print Card
          </button>
        </div>

        {/* Standee Preview Card */}
        <div className="max-w-xs mx-auto p-6 rounded-[2.5rem] bg-[#FFDD00] text-stone-950 text-center shadow-xl border-4 border-white space-y-4">
          <div className="flex items-center justify-center gap-1.5 font-black text-xs uppercase tracking-widest bg-stone-950 text-white py-1 px-3 rounded-full mx-auto w-fit">
            <span>⚡ FuelMe 🇮🇳</span>
          </div>

          <div>
            <h4 className="text-xl font-black">Buy {creator.displayName} a coffee</h4>
            <p className="text-xs text-stone-800 font-mono font-bold">@{creator.username}</p>
          </div>

          <div className="p-3 bg-white rounded-2xl shadow-inner mx-auto w-44 h-44 flex items-center justify-center">
            {standeeQrUrl ? (
              <img src={standeeQrUrl} alt="Standee QR" className="w-full h-full object-contain" />
            ) : (
              <div className="text-stone-400 text-xs">Loading QR...</div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-black text-stone-900">Scan with any UPI app</p>
            <p className="text-[10px] font-mono bg-white/70 px-2.5 py-0.5 rounded-full text-stone-900 inline-block font-bold">
              UPI: {creator.upiId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
