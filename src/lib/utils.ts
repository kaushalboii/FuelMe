import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FuelUnit } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getBaseUrl(): string {
  if (typeof window === 'undefined') return 'https://kaushalboii.github.io/FuelMe';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${window.location.origin}${basePath}`;
}

export function getCreatorUrl(username: string): string {
  const clean = username.replace('@', '');
  return `${getBaseUrl()}/${clean}/`;
}

export function getFuelUnitDetails(unit: FuelUnit) {
  switch (unit) {
    case 'chai':
      return { emoji: '☕', name: 'Chai', plural: 'Chais', verb: 'Buy me a chai' };
    case 'coffee':
      return { emoji: '☕', name: 'Coffee', plural: 'Coffees', verb: 'Buy me a coffee' };
    case 'samosa':
      return { emoji: '🥟', name: 'Samosa', plural: 'Samosas', verb: 'Buy me a samosa' };
    case 'pizza':
      return { emoji: '🍕', name: 'Pizza', plural: 'Pizzas', verb: 'Fuel me with pizza' };
    case 'rocket':
      return { emoji: '🚀', name: 'Rocket Fuel', plural: 'Rocket Fuels', verb: 'Rocket fuel my project' };
    case 'fuel':
    default:
      return { emoji: '⚡', name: 'Fuel', plural: 'Fuels', verb: 'Fuel my work' };
  }
}
