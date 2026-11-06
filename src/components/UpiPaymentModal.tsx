'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Check, Copy, ExternalLink, Smartphone, QrCode, 
  ShieldCheck, AlertCircle, ArrowRight, Sparkles, Heart, Coffee, CheckCircle2
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

      generateUpiQrCode({
        upiId: creator.upiId,
        payeeName: creator.displayName,
        amount: amount,
        transactionNote: `Support ${creator.displayName} on FuelMe`,
        transactionRef: ref,
      }).then((url) => {
        setQrCodeDataUrl(url);
      }).catch((err) => {
        console.error('QR code error:', err);
      });
    }
  }, [isOpen, creator, amount]);

  if (!isOpen) return null;

  const paymentDetails = {
    upiId: creator.upiId,
    payeeName: creator.displayName,
    amount: amount,
    transactionNote: `Support ${creator.displayName} on FuelMe`,
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFDD00', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleConfirmPayment = () => {
    if (utrNumber.trim() && !isValidUtr(utrNumber.trim())) {
      setUtrError('Please enter a valid 12-digit UPI UTR number or leave blank');
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

    addSupportTransaction(newTx);
    setIsSubmitting(false);
    setStep('success');
    triggerCelebration();
    onSuccess(newTx);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden transform transition-all">
        
        {/* Modal Header (Clean BMC Card Header) */}
        <div className="bg-[#FAF8F5] p-6 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={creator.avatarUrl}
              alt={creator.displayName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FFDD00]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-stone-950 text-base">
                  Support {creator.displayName}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-500 text-white" />
              </div>
              <p className="text-xs font-semibold text-stone-500">
                {formatINR(amount)} · Direct 100% UPI transfer
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-stone-200/60 border border-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {step === 'pay' && (
            <>
              {/* Dynamic QR Code & Scanner Box */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="relative p-2.5 bg-white rounded-2xl shadow-sm border border-stone-200 flex-shrink-0">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan to Pay via UPI"
                      className="w-36 h-36 object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-stone-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-stone-400">
                      Generating QR...
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFDD00] text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm border border-amber-300">
                    SCAN & PAY
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black text-stone-900">
                    <QrCode className="w-4 h-4 text-amber-600" />
                    <span>Scan with ANY Indian UPI App</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Open Google Pay, PhonePe, Paytm, BHIM, CRED or any bank UPI app and scan this code.
                  </p>
                  
                  {/* Creator UPI ID */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Or send to UPI ID:
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <code className="text-xs font-mono font-bold text-stone-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200 select-all">
                        {creator.upiId}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedUpi ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile 1-Tap Launch Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                  On Mobile? Tap to open directly:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <a
                    href={appLinks.googlePay}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-center group bg-white shadow-sm"
                  >
                    <span className="text-xs font-black text-stone-800 group-hover:text-amber-800">Google Pay</span>
                    <span className="text-[10px] text-stone-400">Tez App</span>
                  </a>
                  <a
                    href={appLinks.phonePe}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-stone-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-center group bg-white shadow-sm"
                  >
                    <span className="text-xs font-black text-stone-800 group-hover:text-purple-800">PhonePe</span>
                    <span className="text-[10px] text-stone-400">UPI App</span>
                  </a>
                  <a
                    href={appLinks.paytm}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-stone-200 hover:border-sky-400 hover:bg-sky-50/50 transition-all text-center group bg-white shadow-sm"
                  >
                    <span className="text-xs font-black text-stone-800 group-hover:text-sky-800">Paytm</span>
                    <span className="text-[10px] text-stone-400">UPI App</span>
                  </a>
                  <a
                    href={appLinks.universal}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border-2 border-amber-300 bg-[#FFDD00]/30 hover:bg-[#FFDD00]/50 transition-all text-center group shadow-sm"
                  >
                    <span className="text-xs font-black text-stone-950">Any UPI</span>
                    <span className="text-[10px] text-stone-600">Chooser</span>
                  </a>
                </div>
              </div>

              {/* Zero fee promise */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="font-medium">
                  <strong>100% of {formatINR(amount)}</strong> goes directly to {creator.displayName}&apos;s bank. Zero fee deduction.
                </p>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full py-4 px-6 rounded-full bg-[#FFDD00] hover:bg-[#FACC15] active:scale-[0.98] text-stone-950 font-black text-base shadow-lg shadow-amber-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>I Have Completed Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-sm">
                🎉
              </div>
              <h4 className="text-2xl font-black text-stone-950">
                You&apos;re Awesome!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Thank you for supporting <strong>{creator.displayName}</strong> with {formatINR(amount)}. Your note is now visible on their supporter wall!
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#FFDD00] text-stone-950 font-black text-xs hover:bg-amber-300 shadow-md transition-all cursor-pointer"
                >
                  Back to Profile
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
