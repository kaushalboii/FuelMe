'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Check, Copy, ExternalLink, Smartphone, QrCode, 
  ShieldCheck, AlertCircle, ArrowRight, Sparkles, Heart, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Creator, SupportTransaction } from '@/lib/types';
import { generateUpiQrCode, generateUpiUri, getAppSpecificUpiLinks, isValidUtr, generateTxnRef } from '@/lib/upi';
import { formatINR, getFuelUnitDetails } from '@/lib/utils';
import { addSupportTransaction } from '@/lib/store';

interface UpiPaymentModalProps {
  creator: Creator;
  amount: number;
  unitsCount: number;
  supporterName: string;
  supporterEmail: string;
  supporterMessage: string;
  isAnonymous: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tx: SupportTransaction) => void;
}

export default function UpiPaymentModal({
  creator,
  amount,
  unitsCount,
  supporterName,
  supporterEmail,
  supporterMessage,
  isAnonymous,
  isOpen,
  onClose,
  onSuccess,
}: UpiPaymentModalProps) {
  const [step, setStep] = useState<'pay' | 'confirm' | 'success'>('pay');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unitDetails = getFuelUnitDetails(creator.fuelUnit);

  useEffect(() => {
    if (isOpen) {
      setStep('pay');
      setUtrNumber('');
      setUtrError('');
      const ref = generateTxnRef();
      setTxnRef(ref);

      // Generate dynamic QR Code for this exact amount & creator
      generateUpiQrCode({
        upiId: creator.upiId,
        payeeName: creator.displayName,
        amount: amount,
        transactionNote: `Fuel ${creator.displayName} on FuelMe`,
        transactionRef: ref,
      }).then((url) => {
        setQrCodeDataUrl(url);
      }).catch((err) => {
        console.error('QR code generation error:', err);
      });
    }
  }, [isOpen, creator, amount]);

  if (!isOpen) return null;

  const paymentDetails = {
    upiId: creator.upiId,
    payeeName: creator.displayName,
    amount: amount,
    transactionNote: `Fuel ${creator.displayName} on FuelMe`,
    transactionRef: txnRef,
  };

  const appLinks = getAppSpecificUpiLinks(paymentDetails);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(creator.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#10b981', '#3b82f6', '#ec4899'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleConfirmPayment = () => {
    if (utrNumber.trim() && !isValidUtr(utrNumber.trim())) {
      setUtrError('Please enter a valid 12-digit UPI UTR number or leave it blank');
      return;
    }

    setIsSubmitting(true);

    const displayName = isAnonymous ? 'Generous Supporter' : (supporterName.trim() || 'A Supporter');

    const newTx: SupportTransaction = {
      id: txnRef,
      creatorUsername: creator.username,
      supporterName: displayName,
      supporterEmail: supporterEmail.trim() || undefined,
      supporterMessage: supporterMessage.trim() || undefined,
      amount: amount,
      fuelUnitsCount: unitsCount,
      isAnonymous: isAnonymous,
      timestamp: 'Just now',
      utrNumber: utrNumber.trim() || undefined,
      status: 'completed',
      paymentMode: 'direct_upi',
    };

    // Save to local persistence
    addSupportTransaction(newTx);

    setIsSubmitting(false);
    setStep('success');
    triggerCelebration();
    onSuccess(newTx);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-white" /> Direct UPI · 0% Fee
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            Fuel {creator.displayName}
          </h3>
          <p className="text-orange-100 text-sm mt-0.5">
            Paying {formatINR(amount)} ({unitsCount} × {unitDetails.emoji} {unitDetails.name}) directly to creator
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'pay' && (
            <div className="space-y-6">
              {/* QR Code and Desktop Instructions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="relative p-2 bg-white rounded-xl shadow-md border border-slate-200 flex-shrink-0">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan to Pay via UPI"
                      className="w-40 h-40 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-xs text-slate-400">
                      Generating QR...
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    SCAN & PAY
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <QrCode className="w-4 h-4 text-orange-500" />
                    <span>Scan with ANY Indian UPI App</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open Google Pay, PhonePe, Paytm, BHIM, CRED or any bank app on your phone and scan this QR code.
                  </p>
                  
                  {/* Verified UPI ID */}
                  <div className="pt-2">
                    <span className="text-[11px] font-medium text-slate-500 block">Creator UPI ID:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono font-semibold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 select-all">
                        {creator.upiId}
                      </code>
                      <button
                        onClick={handleCopyUpi}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedUpi ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile 1-Tap UPI Launch Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-orange-500" />
                    On Mobile? Tap to open directly:
                  </span>
                  <span className="text-[11px] text-slate-500">Zero redirects</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={appLinks.googlePay}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/30 transition-all text-center group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600">Google Pay</span>
                    <span className="text-[10px] text-slate-400">Tez UPI</span>
                  </a>
                  <a
                    href={appLinks.phonePe}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/30 transition-all text-center group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-600">PhonePe</span>
                    <span className="text-[10px] text-slate-400">UPI App</span>
                  </a>
                  <a
                    href={appLinks.paytm}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/30 transition-all text-center group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-sky-600">Paytm</span>
                    <span className="text-[10px] text-slate-400">UPI Wallet</span>
                  </a>
                  <a
                    href={appLinks.universal}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all text-center group"
                  >
                    <span className="text-xs font-bold text-orange-700">Any UPI</span>
                    <span className="text-[10px] text-orange-500">Chooser</span>
                  </a>
                </div>
              </div>

              {/* Zero-block guarantee note */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold">Direct Peer-to-Peer Transfer:</strong> 100% of your {formatINR(amount)} goes directly into {creator.displayName}&apos;s bank account. FuelMe charges ₹0 and does not hold any funds.
                </p>
              </div>

              {/* Proceed to verification button */}
              <button
                onClick={() => setStep('confirm')}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>I Have Completed Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Confirm Your Support</h4>
                <p className="text-xs text-slate-500">
                  Payment of <span className="font-semibold text-slate-800">{formatINR(amount)}</span> to {creator.displayName} ({creator.upiId})
                </p>
              </div>

              {/* UTR Input (Optional but helpful for verification) */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span>12-Digit UPI UTR / Reference No. (Optional)</span>
                  <span className="text-[11px] text-slate-400">Found on receipt</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="e.g. 431289054321"
                  value={utrNumber}
                  onChange={(e) => {
                    setUtrNumber(e.target.value.replace(/\D/g, ''));
                    setUtrError('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {utrError && <p className="text-xs text-rose-500 font-medium">{utrError}</p>}
                <p className="text-[11px] text-slate-400">
                  You can find the 12-digit UPI reference number in your Google Pay, PhonePe, or Paytm receipt.
                </p>
              </div>

              {/* Supporter details recap */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Supporter Name:</span>
                  <span className="font-semibold text-slate-800">{isAnonymous ? 'Anonymous' : (supporterName || 'A Supporter')}</span>
                </div>
                {supporterMessage && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Message:</span>
                    <span className="font-medium text-slate-700 italic max-w-[200px] truncate">&ldquo;{supporterMessage}&rdquo;</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                  <span className="text-slate-700">Total Contribution:</span>
                  <span className="text-orange-600">{formatINR(amount)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('pay')}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Back to QR
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isSubmitting}
                  className="flex-2 py-3 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
                >
                  {isSubmitting ? 'Verifying...' : 'Complete & Post to Wall 🎉'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900">Thank You So Much!</h4>
                <p className="text-sm text-slate-600 mt-1">
                  You just fueled <strong className="text-slate-900">{creator.displayName}</strong> with <strong className="text-orange-600">{formatINR(amount)}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-100 text-left space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-orange-900">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Support Certificate</span>
                </div>
                <p className="text-slate-600">
                  Your message has been posted on {creator.displayName}&apos;s FuelMe wall!
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Reference: #{txnRef}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

