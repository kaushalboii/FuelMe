'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, User, MessageSquare, Check, ShieldCheck, Zap, Lock, Minus, Plus } from 'lucide-react';
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

  // Selected unit count (1, 3, 5, or custom stepper)
  const [unitsCount, setUnitsCount] = useState<number>(3);
  const [customPriceInput, setCustomPriceInput] = useState<string>('');
  const [isCustomDirectAmount, setIsCustomDirectAmount] = useState<boolean>(false);

  // Supporter Inputs
  const [supporterName, setSupporterName] = useState('');
  const [supporterEmail, setSupporterEmail] = useState('');
  const [supporterMessage, setSupporterMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick preset counts
  const presetCounts = [1, 3, 5];

  // Calculated total amount
  const computedAmount = isCustomDirectAmount
    ? Math.max(10, Number(customPriceInput) || 10)
    : unitsCount * basePrice;

  const handleIncrement = () => {
    setIsCustomDirectAmount(false);
    setUnitsCount((prev) => Math.min(100, prev + 1));
  };

  const handleDecrement = () => {
    setIsCustomDirectAmount(false);
    setUnitsCount((prev) => Math.max(1, prev - 1));
  };

  const handleSelectCount = (count: number) => {
    setIsCustomDirectAmount(false);
    setUnitsCount(count);
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-200/90 shadow-xl shadow-stone-200/50 overflow-hidden transition-all">
      {/* Widget Card Header (BMC Signature Header) */}
      <div className="p-6 pb-5 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <span>Buy {creator.displayName} a {unit.name}</span>
            <span className="text-2xl">{unit.emoji}</span>
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {formatINR(basePrice)} each · Direct to creator&apos;s UPI
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shadow-sm">
          {unit.emoji}
        </div>
      </div>

      {/* Widget Body Form */}
      <form onSubmit={handleOpenPayment} className="p-6 space-y-5">
        
        {/* The Iconic BMC Quantity Selector Row */}
        <div className="space-y-2">
          <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-stone-200/70 flex items-center justify-between gap-3">
            
            {/* Left: Icon & Multiplier */}
            <div className="flex items-center gap-2.5">
              <span className="text-2xl filter drop-shadow-sm">{unit.emoji}</span>
              <span className="text-sm font-black text-stone-400">×</span>
            </div>

            {/* Middle: 1, 3, 5 Pills */}
            <div className="flex items-center gap-1.5">
              {presetCounts.map((count) => {
                const isSelected = !isCustomDirectAmount && unitsCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleSelectCount(count)}
                    className={`w-10 h-10 rounded-full font-black text-sm transition-all duration-150 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#FFDD00] text-stone-950 shadow-md ring-2 ring-[#FFDD00]/50 scale-105'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>

            {/* Right: Stepper Counter [ - ] [ count ] [ + ] */}
            <div className="flex items-center bg-white rounded-full border border-stone-200 p-1 shadow-sm">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <input
                type="number"
                min="1"
                max="500"
                value={isCustomDirectAmount ? '' : unitsCount}
                onChange={(e) => {
                  setIsCustomDirectAmount(false);
                  const val = parseInt(e.target.value) || 1;
                  setUnitsCount(Math.min(500, Math.max(1, val)));
                }}
                className="w-10 text-center font-black text-sm text-stone-900 bg-transparent focus:outline-none"
              />

              <button
                type="button"
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Custom ₹ amount toggle */}
          <div className="flex items-center justify-between text-[11px] px-1 text-stone-500">
            <span>Total: <strong className="text-stone-900 font-bold">{formatINR(computedAmount)}</strong></span>
            <button
              type="button"
              onClick={() => {
                setIsCustomDirectAmount(!isCustomDirectAmount);
                if (!isCustomDirectAmount) setCustomPriceInput(String(computedAmount));
              }}
              className="text-amber-800 hover:text-amber-900 font-semibold underline"
            >
              {isCustomDirectAmount ? 'Switch back to unit selector' : 'Or enter custom amount in ₹'}
            </button>
          </div>

          {isCustomDirectAmount && (
            <div className="pt-1 animate-in fade-in duration-200">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">₹</span>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  step="10"
                  placeholder="Enter custom ₹ amount (e.g. 250)"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-[#FFDD00] text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#FFDD00]/50"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Supporter Name / Handle */}
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1.5">
            Your Name or @social <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isAnonymous ? 'Anonymous Supporter' : 'e.g. Arjun Mehta or @twitter'}
              disabled={isAnonymous}
              value={isAnonymous ? '' : supporterName}
              onChange={(e) => setSupporterName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#faf8f5] border border-stone-200 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFDD00] focus:border-stone-400 transition-all disabled:opacity-60"
            />
          </div>
        </div>

        {/* Supporter Message (BMC Style) */}
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-1.5">
            Say something nice <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder={`Thank you for your work! Keep building awesome stuff ⚡`}
            value={supporterMessage}
            onChange={(e) => setSupporterMessage(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-[#faf8f5] border border-stone-200 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFDD00] focus:border-stone-400 transition-all resize-none"
          />
        </div>

        {/* Checkbox Options */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
            />
            <span className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-stone-400" />
              Make this message private (only visible to creator)
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
            />
            <span className="text-xs text-stone-600 font-medium">
              Support anonymously
            </span>
          </label>
        </div>

        {/* BMC's Signature Big Yellow Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-[#FFDD00] hover:bg-[#FACC15] active:scale-[0.99] text-stone-950 font-black text-base shadow-lg shadow-amber-200/60 hover:shadow-xl hover:shadow-amber-200/80 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Support {formatINR(computedAmount)}</span>
          <span className="text-xs font-semibold text-stone-700 bg-stone-950/10 px-2 py-0.5 rounded-full">
            UPI ⚡
          </span>
        </button>

        {/* UPI Trust Badge */}
        <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant UPI transfer · 0% fee · Direct to bank</span>
        </div>
      </form>

      {/* Payment Modal */}
      <UpiPaymentModal
        creator={creator}
        amount={computedAmount}
        unitsCount={isCustomDirectAmount ? Math.max(1, Math.round(computedAmount / basePrice)) : unitsCount}
        supporterName={supporterName}
        supporterEmail={supporterEmail}
        supporterMessage={isPrivate ? `🔒 [Private]: ${supporterMessage}` : supporterMessage}
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
