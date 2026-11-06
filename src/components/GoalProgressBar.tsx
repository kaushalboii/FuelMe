'use client';

import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface GoalProgressBarProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
}

export default function GoalProgressBar({ title, targetAmount, currentAmount }: GoalProgressBarProps) {
  const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Target className="w-4 h-4 text-orange-500" />
          <span>Creator Goal</span>
        </div>
        <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
          {percentage}% Funded
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-900 leading-snug">
        {title}
      </p>

      {/* Progress Bar Container */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-500 shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Raised <strong className="text-slate-800 font-bold">{formatINR(currentAmount)}</strong></span>
          <span>Target <strong className="text-slate-800 font-bold">{formatINR(targetAmount)}</strong></span>
        </div>
      </div>
    </div>
  );
}

