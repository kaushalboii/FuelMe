'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, User, MessageSquare, Check, ShieldCheck, Zap } from 'lucide-react';
import { Creator, SupportTransaction } from '@/lib/types';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';
import UpiPaymentModal from './UpiPaymentModal';

interface SupportWidgetProps {
  creator: Creator;
  onPaymentSuccess?: (tx: SupportTransaction) => void;
}

export default function SupportWidget({ creator, onPaymentSuccess }: SupportWidgetProps) {
  const unit = getFuelUnitDetails(creator.fuelUnit);
  const basePrice = creator.unitPrice || 50;

  // Selected unit count (1, 3, 5, 10, or custom)
  const [selectedUnits, setSelectedUnits] = useState<number>(3);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Supporter Inputs
  const [supporterName, setSupporterName] = useState('');
  const [supporterEmail, setSupporterEmail] = useState('');
  const [supporterMessage, setSupporterMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate final amount
  const computedAmount = isCustomMode
    ? Math.max(10, Number(customAmount) || 10)
    : selectedUnits * basePrice;

  const presetUnits = [1, 3, 5, 10];

  const handleSelectPreset = (u: number) => {
    setIsCustomMode(false);
    setSelectedUnits(u);
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Widget Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white relative">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            <Zap className="w-3.5 h-3.5 fill-orange-400 stroke-none" />
            <span>Support {creator.displayName}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Direct UPI · 0% Cut
          </span>
        </div>
        <h3 className="text-xl font-extrabold tracking-tight">
          {unit.verb} {unit.emoji}
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          1 {unit.name} = {formatINR(basePrice)}. Every contribution goes directly into {creator.displayName}&apos;s verified UPI ID.
        </p>
      </div>

      {/* Widget Form */}
      <form onSubmit={handleOpenPayment} className="p-6 space-y-5">
        {/* Unit Selection Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select {unit.name}s
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presetUnits.map((count) => {
              const active = !isCustomMode && selectedUnits === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleSelectPreset(count)}
                  className={`py-3 px-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 ${
                    active
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-sm ring-2 ring-orange-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{unit.emoji}</span>
                  <span className="text-sm font-black">× {count}</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formatINR(count * basePrice)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                isCustomMode
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'text-slate-600 border-dashed border-slate-300 hover:border-slate-400'
              }`}
            >
              {isCustomMode ? '✓ Custom Amount Active' : '+ Enter custom ₹ amount'}
            </button>
          </div>

          {isCustomMode && (
            <div className="pt-2 animate-in fade-in duration-200">
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Custom Support Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  step="10"
                  placeholder="e.g. 500"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-800"
                  required={isCustomMode}
                />
              </div>
            </div>
          )}
        </div>

        {/* Name & Anonymous */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Name or Social Handle
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAnonymous ? 'Anonymous Supporter' : 'e.g. Rohan, @buildwithrahul'}
                disabled={isAnonymous}
                value={isAnonymous ? '' : supporterName}
                onChange={(e) => setSupporterName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Anonymous Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-slate-600 font-medium">
              Make my support contribution anonymous
            </span>
          </label>

          {/* Message textarea */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Say something nice (Optional)
            </label>
            <div className="relative">
              <textarea
                rows={2}
                placeholder={`Thanks for building this! Keep it up 🔥`}
                value={supporterMessage}
                onChange={(e) => setSupporterMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
        >
          <Zap className="w-5 h-5 fill-white" />
          <span>Fuel with {formatINR(computedAmount)}</span>
          <span className="text-xs font-normal opacity-90">via UPI</span>
        </button>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>NPCI Standard · Directly into {creator.upiId}</span>
        </div>
      </form>

      {/* Payment Modal */}
      <UpiPaymentModal
        creator={creator}
        amount={computedAmount}
        unitsCount={isCustomMode ? Math.max(1, Math.round(computedAmount / basePrice)) : selectedUnits}
        supporterName={supporterName}
        supporterEmail={supporterEmail}
        supporterMessage={supporterMessage}
        isAnonymous={isAnonymous}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(tx) => {
          if (onPaymentSuccess) {
            onPaymentSuccess(tx);
          }
        }}
      />
    </div>
  );
}
