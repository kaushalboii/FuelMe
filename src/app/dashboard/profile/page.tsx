'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Save, Check, AlertCircle, ArrowLeft, Zap, Smartphone, 
  Globe, Github, Twitter, Linkedin, Youtube, Target, RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Creator, FuelUnit } from '@/lib/types';
import { getCreatorByUsername, saveCreator, getLoggedInUsername, setLoggedInUsername } from '@/lib/store';
import { isValidUpiId } from '@/lib/upi';
import { formatINR } from '@/lib/utils';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('kaushal');
  const [creator, setCreator] = useState<Creator | null>(null);

  // Form Fields
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [upiId, setUpiId] = useState('');
  const [fuelUnit, setFuelUnit] = useState<FuelUnit>('fuel');
  const [unitPrice, setUnitPrice] = useState<number>(50);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [website, setWebsite] = useState('');

  // Goal
  const [hasGoal, setHasGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState<number>(10000);

  // Status
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const user = getLoggedInUsername();
    setCurrentUser(user);
    const c = getCreatorByUsername(user);
    if (c) {
      setCreator(c);
      setDisplayName(c.displayName);
      setUsername(c.username);
      setHeadline(c.headline);
      setBio(c.bio);
      setUpiId(c.upiId);
      setFuelUnit(c.fuelUnit);
      setUnitPrice(c.unitPrice || 50);
      setAvatarUrl(c.avatarUrl);
      setGithub(c.socials.github || '');
      setTwitter(c.socials.twitter || '');
      setLinkedin(c.socials.linkedin || '');
      setYoutube(c.socials.youtube || '');
      setWebsite(c.socials.website || '');

      if (c.goal) {
        setHasGoal(c.goal.isActive);
        setGoalTitle(c.goal.title);
        setGoalTarget(c.goal.targetAmount);
      }
    }
  }, []);

  if (!creator) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidUpiId(upiId)) {
      setErrorMsg('Please enter a valid Indian UPI ID (e.g., yourname@okaxis, handle@paytm, name@ybl)');
      return;
    }

    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUsername) {
      setErrorMsg('Please enter a valid alphanumeric username');
      return;
    }

    const updated: Creator = {
      ...creator,
      username: cleanUsername,
      displayName: displayName.trim(),
      headline: headline.trim(),
      bio: bio.trim(),
      upiId: upiId.trim(),
      fuelUnit: fuelUnit,
      unitPrice: Number(unitPrice) || 50,
      avatarUrl: avatarUrl.trim() || creator.avatarUrl,
      socials: {
        github: github.trim() || undefined,
        twitter: twitter.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        youtube: youtube.trim() || undefined,
        website: website.trim() || undefined,
      },
      goal: hasGoal
        ? {
            title: goalTitle.trim() || 'Creator Project Goal',
            targetAmount: Number(goalTarget) || 5000,
            currentAmount: creator.goal ? creator.goal.currentAmount : 0,
            isActive: true,
          }
        : undefined,
    };

    saveCreator(updated);
    setLoggedInUsername(cleanUsername);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const unitOptions: { id: FuelUnit; label: string; emoji: string }[] = [
    { id: 'fuel', label: 'Fuel (⚡ Standard)', emoji: '⚡' },
    { id: 'chai', label: 'Chai (☕ Indian Classic)', emoji: '☕' },
    { id: 'samosa', label: 'Samosa (🥟 Street Food)', emoji: '🥟' },
    { id: 'coffee', label: 'Coffee (☕ Premium)', emoji: '☕' },
    { id: 'rocket', label: 'Rocket (🚀 Indie Builder)', emoji: '🚀' },
    { id: 'pizza', label: 'Pizza (🍕 Slice of support)', emoji: '🍕' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <Link
            href={`/${creator.username}`}
            target="_blank"
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            View Live Page →
          </Link>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Creator Profile & Payment Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize your public FuelMe page, configure your zero-fee UPI ID, and set campaign goals.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Payment Method (Most Important!) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                  Primary Payment Method
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-orange-500" />
                  <span>Your Personal / Merchant UPI ID</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Payments from supporters go directly to this UPI ID without any platform deductions or delays.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                0% Fee · No Middlemen
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700">
                UPI ID (Virtual Payment Address - VPA) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. kaushal@okaxis or yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <p className="text-[11px] text-slate-400">
                Supported: Google Pay (<code>@okaxis</code>, <code>@okhdfcbank</code>), PhonePe (<code>@ybl</code>, <code>@ibl</code>), Paytm (<code>@paytm</code>), BHIM (<code>@upi</code>), and all Indian banks.
              </p>
            </div>
          </div>

          {/* Section 2: Creator Branding */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Page Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Unique Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Headline / Subtitle
              </label>
              <input
                type="text"
                placeholder="e.g. Developer, Builder & Indie Maker 🇮🇳"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                About You & What You Create (Bio)
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 leading-relaxed"
                placeholder="Tell your supporters what you are building and why their fuel matters..."
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Profile Photo / Avatar Image URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Section 3: Fuel Unit & Pricing */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Support Unit & Pricing</h3>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Choose your signature item:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {unitOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFuelUnit(opt.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      fuelUnit === opt.id
                        ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 font-bold text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Default Base Price per unit (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="10"
                  step="5"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Recommended: ₹20 (Chai), ₹50 (Fuel/Samosa), or ₹100 (Coffee)</p>
            </div>
          </div>

          {/* Section 4: Campaign Goal */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-slate-900">Campaign Goal</h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasGoal}
                  onChange={(e) => setHasGoal(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-xs font-bold text-slate-700">Enable Goal</span>
              </label>
            </div>

            {hasGoal && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Goal Title / Purpose
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Upgrade Dev RAM & Server Hosting"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Target Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min="500"
                      step="500"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Social Handles */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  placeholder="https://x.com/..."
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {saveSuccess && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  Profile updated successfully!
                </span>
              )}
            </div>

            <button
              type="submit"
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
}

