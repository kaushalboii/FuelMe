'use client';

import React, { useState } from 'react';
import { 
  Heart, Sparkles, User, MessageSquare, Check, ShieldCheck, 
  Lock, Minus, Plus, Crown, Coffee, ArrowRight, Zap, CheckCircle2 
} from 'lucide-react';
import { Creator, SupportTransaction } from '@/lib/types';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';
import UpiPaymentModal from './UpiPaymentModal';

interface SupportWidgetProps {
  creator: Creator;
  onPaymentSuccess?: (tx: SupportTransaction) => void;
  defaultTab?: 'support' | 'membership';
}

export default function SupportWidget({ 
  creator, 
  onPaymentSuccess, 
  defaultTab = 'support' 
}: SupportWidgetProps) {
  const unit = getFuelUnitDetails(creator.fuelUnit);
  const basePrice = creator.unitPrice || 50;

  // Active Tab inside Widget (Support vs Membership)
  const [activeTab, setActiveTab] = useState<'support' | 'membership'>(defaultTab);

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
  const [membershipTierSelected, setMembershipTierSelected] = useState<{ name: string; price: number } | null>(null);

  // Quick preset counts
  const presetCounts = [1, 3, 5];

  // Quick preset Indian UPI amounts
  const presetAmounts = [50, 150, 250, 500];

  // Calculated total amount
  const computedAmount = membershipTierSelected
    ? membershipTierSelected.price
    : isCustomDirectAmount
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

  const handleSelectAmountChip = (amount: number) => {
    const calculatedUnits = Math.max(1, Math.round(amount / basePrice));
    if (amount % basePrice === 0) {
      setIsCustomDirectAmount(false);
      setUnitsCount(calculatedUnits);
    } else {
      setIsCustomDirectAmount(true);
      setCustomPriceInput(String(amount));
    }
  };

  const handleAppendEmoji = (emoji: string) => {
    setSupporterMessage((prev) => (prev ? `${prev} ${emoji}` : emoji));
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipTierSelected(null);
    setIsModalOpen(true);
  };

  const handleJoinMembership = (tier: { name: string; price: number }) => {
    setMembershipTierSelected(tier);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-200/90 shadow-xl shadow-stone-200/40 overflow-hidden transition-all duration-300">
      
      {/* Top Tab Bar: [ Support ☕ ] | [ Membership 👑 ] */}
      <div className="p-2 bg-[#FAF8F5] border-b border-stone-200/80 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            setActiveTab('support');
            setMembershipTierSelected(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'support'
              ? 'bg-white text-stone-950 shadow-sm border border-stone-200/80'
              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/40'
          }`}
        >
          <span className="text-base">☕</span>
          <span>Support</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('membership')}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'membership'
              ? 'bg-white text-stone-950 shadow-sm border border-stone-200/80'
              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/40'
          }`}
        >
          <span className="text-base">👑</span>
          <span>Membership</span>
        </button>
      </div>

      {/* VIEW 1: ONE-TIME SUPPORT FORM */}
      {activeTab === 'support' && (
        <form onSubmit={handleOpenPayment} className="p-6 sm:p-7 space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className="text-xl font-black text-stone-950 tracking-tight flex items-center gap-2">
                <span>Buy {creator.displayName} a {unit.name}</span>
                <span className="text-2xl">{unit.emoji}</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {formatINR(basePrice)} each · 100% direct to creator&apos;s UPI
              </p>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center text-lg shadow-sm border border-amber-200/60">
              {unit.emoji}
            </div>
          </div>

          {/* The Iconic BMC Quantity Selector Row */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex items-center justify-between gap-2 shadow-inner">
              
              {/* Left: Icon & Multiplier */}
              <div className="flex items-center gap-2 pl-1">
                <span className="text-2xl filter drop-shadow-sm select-none">{unit.emoji}</span>
                <span className="text-xs font-black text-stone-400 select-none">×</span>
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
                  className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
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
                  className="w-9 text-center font-black text-sm text-stone-900 bg-transparent focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>

            {/* Quick Amount Pills (Indian UPI friendly) */}
            <div className="flex items-center gap-1.5 justify-between">
              {presetAmounts.map((amt) => {
                const isSelected = computedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectAmountChip(amt)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-[#FFDD00] shadow-sm'
                        : 'bg-[#FAF8F5] text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    ₹{amt}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setIsCustomDirectAmount(!isCustomDirectAmount);
                  if (!isCustomDirectAmount) setCustomPriceInput(String(computedAmount));
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  isCustomDirectAmount
                    ? 'bg-amber-400 text-stone-950 font-black'
                    : 'text-stone-500 hover:text-stone-900 underline'
                }`}
              >
                Custom ₹
              </button>
            </div>

            {/* Custom Amount Input Box */}
            {isCustomDirectAmount && (
              <div className="pt-1 animate-in fade-in duration-200">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-stone-400">₹</span>
                  <input
                    type="number"
                    min="10"
                    max="100000"
                    step="10"
                    placeholder="Enter custom amount in ₹"
                    value={customPriceInput}
                    onChange={(e) => setCustomPriceInput(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-[#FFDD00] text-sm font-black text-stone-900 focus:outline-none focus:ring-4 focus:ring-[#FFDD00]/30 bg-white"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>

          {/* Supporter Name / Social Handle */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Name or @yoursocial <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isAnonymous ? 'Anonymous Supporter' : 'Name or @twitter / @github'}
                disabled={isAnonymous}
                value={isAnonymous ? '' : supporterName}
                onChange={(e) => setSupporterName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFDD00] focus:border-stone-400 transition-all disabled:opacity-60"
              />
            </div>
          </div>

          {/* Supporter Message (BMC Style) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Say something nice <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              
              {/* Quick Emojis Row */}
              <div className="flex items-center gap-1">
                {['❤️', '👏', '🔥', '☕', '🚀', '🎉'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleAppendEmoji(emoji)}
                    className="text-xs hover:scale-125 transition-transform cursor-pointer p-0.5"
                    title={`Add ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="Thank you for your open-source work! Keep it up ☕"
              value={supporterMessage}
              onChange={(e) => setSupporterMessage(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FFDD00] focus:border-stone-400 transition-all resize-none"
            />
          </div>

          {/* Checkboxes: Private & Anonymous */}
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

          {/* BMC's Signature Big Yellow Support Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-[#FFDD00] hover:bg-[#FACC15] active:scale-[0.98] text-stone-950 font-black text-base shadow-lg shadow-amber-200/60 hover:shadow-xl hover:shadow-amber-200/80 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Support {formatINR(computedAmount)}</span>
            <span className="text-xs font-bold text-stone-800 bg-stone-950/10 px-2.5 py-0.5 rounded-full">
              UPI ⚡
            </span>
          </button>

          {/* UPI Security Badge & Logos */}
          <div className="pt-1 text-center space-y-1.5">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant P2P Transfer · 0% Fee · Direct to Bank</span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Google Pay · PhonePe · Paytm · BHIM · Any UPI App
            </p>
          </div>

        </form>
      )}

      {/* VIEW 2: MEMBERSHIP TIERS INSIDE WIDGET */}
      {activeTab === 'membership' && (
        <div className="p-6 sm:p-7 space-y-4">
          <div className="text-center pb-2">
            <h4 className="text-lg font-black text-stone-950">Join {creator.displayName}&apos;s Club</h4>
            <p className="text-xs text-stone-500 mt-0.5">Recurring monthly supporter perks with 0% fee UPI</p>
          </div>

          <div className="space-y-3">
            {/* Tier 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2 hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black text-stone-900 text-sm">Chai Club ☕</h5>
                  <p className="text-[11px] text-stone-500">Supporter badge & exclusive updates</p>
                </div>
                <span className="text-sm font-black text-stone-900">₹99/mo</span>
              </div>
              <button
                type="button"
                onClick={() => handleJoinMembership({ name: 'Chai Club', price: 99 })}
                className="w-full py-2.5 rounded-xl bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
              >
                Join for ₹99/mo (UPI)
              </button>
            </div>

            {/* Tier 2 (Popular) */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-[#FFDD00] space-y-2 relative shadow-sm">
              <div className="absolute -top-2.5 right-4 bg-stone-900 text-[#FFDD00] text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                Most Popular
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black text-stone-900 text-sm">Fuel Club ⚡</h5>
                  <p className="text-[11px] text-stone-500">Early access & Discord / Telegram group</p>
                </div>
                <span className="text-sm font-black text-stone-900">₹299/mo</span>
              </div>
              <button
                type="button"
                onClick={() => handleJoinMembership({ name: 'Fuel Club', price: 299 })}
                className="w-full py-2.5 rounded-xl bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
              >
                Join for ₹299/mo (UPI)
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2 hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-black text-stone-900 text-sm">VIP Backer 👑</h5>
                  <p className="text-[11px] text-stone-500">1-on-1 monthly call & README sponsor</p>
                </div>
                <span className="text-sm font-black text-stone-900">₹999/mo</span>
              </div>
              <button
                type="button"
                onClick={() => handleJoinMembership({ name: 'VIP Backer', price: 999 })}
                className="w-full py-2.5 rounded-xl bg-[#FFDD00] hover:bg-amber-300 text-stone-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
              >
                Join for ₹999/mo (UPI)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <UpiPaymentModal
        creator={creator}
        amount={computedAmount}
        unitsCount={
          membershipTierSelected
            ? 1
            : isCustomDirectAmount
              ? Math.max(1, Math.round(computedAmount / basePrice))
              : unitsCount
        }
        supporterName={supporterName}
        supporterEmail={supporterEmail}
        supporterMessage={
          membershipTierSelected
            ? `👑 Joined ${membershipTierSelected.name} Membership`
            : isPrivate
              ? `🔒 [Private]: ${supporterMessage}`
              : supporterMessage
        }
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
