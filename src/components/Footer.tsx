import React from 'react';
import Link from 'next/link';
import { Heart, CheckCircle, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] text-stone-600 border-t border-stone-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFDD00] border border-amber-300 flex items-center justify-center text-stone-950 font-black text-xl shadow-sm">
                ☕
              </div>
              <span className="text-xl font-black text-stone-950 tracking-tight">
                Fuel<span className="text-amber-500">Me</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              The Indian alternative to Buy Me a Coffee. Powered by direct UPI payments with 0% platform cuts, no KYC holds, and zero middlemen.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>100% Free · Direct to Bank</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs font-medium text-stone-600">
              <li>
                <Link href="/explore" className="hover:text-stone-950 transition-colors">
                  Explore Creators
                </Link>
              </li>
              <li>
                <Link href="/kaushal" className="hover:text-stone-950 transition-colors">
                  Demo Creator Page (@kaushal)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-stone-950 transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/widget" className="hover:text-stone-950 transition-colors">
                  Embed Badges & QR Standee
                </Link>
              </li>
            </ul>
          </div>

          {/* Comparison */}
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-4">Fee Comparison</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Buy Me a Coffee:</span>
                <span className="text-rose-600 font-bold">5% + Stripe delay</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Payment Gateways:</span>
                <span className="text-amber-700 font-bold">2% + GST + Audits</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-stone-900 font-black">FuelMe:</span>
                <span className="text-emerald-700 font-black">0% · Instant T+0</span>
              </li>
            </ul>
          </div>

          {/* UPI Security */}
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-4">NPCI Standard</h4>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              FuelMe creates valid NPCI UPI intent strings and QR codes. Money moves directly from supporter UPI apps to creator accounts without touching any intermediary escrow.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-700 font-semibold">
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>GPay · PhonePe · Paytm · BHIM</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} FuelMe. Built for Indian Developers, Indie Hackers, Students & Creators 🇮🇳</p>
          <div className="flex items-center gap-1.5 text-stone-600 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in India for makers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
