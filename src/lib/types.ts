export type FuelUnit = 'fuel' | 'chai' | 'coffee' | 'samosa' | 'pizza' | 'rocket';

export interface Creator {
  id: string;
  username: string;
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  upiId: string; // The UPI VPA: e.g. kaushal@okaxis
  fuelUnit: FuelUnit;
  unitPrice: number; // default base unit e.g. ₹20 or ₹50
  categories: string[];
  socials: {
    twitter?: string;
    github?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
  goal?: {
    title: string;
    targetAmount: number;
    currentAmount: number;
    isActive: boolean;
  };
  totalEarnings: number;
  totalSupporters: number;
  themeColor?: string;
  verified?: boolean;
}

export interface SupportTransaction {
  id: string;
  creatorUsername: string;
  supporterName: string;
  supporterEmail?: string;
  supporterMessage?: string;
  amount: number;
  fuelUnitsCount: number;
  isAnonymous: boolean;
  timestamp: string;
  utrNumber?: string;
  status: 'completed' | 'pending' | 'verified';
  paymentMode: 'direct_upi' | 'gateway';
}

export interface PresetAmount {
  units: number;
  amount: number;
  label: string;
  icon: string;
  popular?: boolean;
}
