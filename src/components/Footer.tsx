import React from 'react';
import Link from 'next/link';
import { Zap, Heart, Shield, CheckCircle, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Fuel<span className="text-orange-500">Me</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The Indian alternative to Buy Me a Coffee. Powered by direct UPI payments with 0% platform cuts, no KYC holds, and zero middlemen.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-3 py-1.5 rounded-lg w-fit">
              <CheckCircle className="w-3.5 h-3.5" />
              100% Free · Direct to Bank Account
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  Explore Creators
                </Link>
              </li>
              <li>
                <Link href="/kaushal" className="hover:text-white transition-colors">
                  Demo Creator Page (@kaushal)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/widget" className="hover:text-white transition-colors">
                  Embed Badges & QR Standee
                </Link>
              </li>
            </ul>
          </div>

          {/* Comparison */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Why FuelMe?</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Buy Me a Coffee:</span>
                <span className="text-rose-400 font-semibold">5% fee + Stripe hold</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Razorpay Direct:</span>
                <span className="text-amber-400 font-semibold">2% + GST + Business KYC</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-white font-bold">FuelMe UPI:</span>
                <span className="text-emerald-400 font-bold">0% fee · Instant ₹ Direct</span>
              </li>
            </ul>
          </div>

          {/* UPI Security */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">NPCI Standard</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              FuelMe creates valid NPCI UPI intent strings and QR codes. Money moves directly from supporter UPI apps to creator accounts without touching any intermediary escrow.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Smartphone className="w-4 h-4 text-orange-400" />
              <span>GPay · PhonePe · Paytm · BHIM · CRED</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FuelMe. Built for Indian Developers, Indie Hackers, Students & Creators 🇮🇳</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in India for makers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

