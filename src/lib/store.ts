"use client";
import { createContext, useContext } from "react";

// Simple global store using localStorage for prototype persistence
export function getStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(`bt_${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function setStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`bt_${key}`, JSON.stringify(value));
}

export function clearStore(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`bt_${key}`);
}

// User profile type
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  filingStatus: string;
  address: { street: string; city: string; state: string; zip: string };
  situation: string;
  hasSpouse: boolean;
  spouseName: string;
  dependents: number;
  incomeSource: string;
  hasBusiness: boolean;
}

export const defaultProfile: UserProfile = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@email.com",
  phone: "(555) 123-4567",
  dob: "1985-03-15",
  ssn: "***-**-4589",
  filingStatus: "Single",
  address: { street: "123 Main St", city: "Los Angeles", state: "CA", zip: "90001" },
  situation: "I owe back taxes and need help resolving my debt",
  hasSpouse: false,
  spouseName: "",
  dependents: 0,
  incomeSource: "W-2 Employment",
  hasBusiness: false,
};

// Tax case data
export interface TaxCase {
  id: string;
  type: string;
  status: "active" | "pending" | "resolved";
  progress: number;
  totalDebt: number;
  resolution: string;
  years: string[];
  createdAt: string;
}

export const sampleCases: TaxCase[] = [
  { id: "1042", type: "OIC", status: "active", progress: 60, totalDebt: 47250, resolution: "Offer in Compromise", years: ["2021", "2022", "2023"], createdAt: "2026-01-15" },
  { id: "1038", type: "IA", status: "pending", progress: 85, totalDebt: 23800, resolution: "Installment Agreement", years: ["2022", "2023"], createdAt: "2026-02-01" },
  { id: "985", type: "PA", status: "resolved", progress: 100, totalDebt: 5300, resolution: "Penalty Abatement", years: ["2023"], createdAt: "2025-11-20" },
];

// Analysis state
export interface AnalysisState {
  entityType: "individual" | "business" | "both" | null;
  analysisDepth: "full" | "quick" | "penalty" | "csed" | null;
  step: number;
  pqAnswers: Record<string, string>;
  screeningAnswers: Record<string, string>;
  transcriptUploaded: boolean;
  assets: Record<string, number>;
  income: Record<string, number>;
  expenses: Record<string, number>;
  totalDebt: number;
  yearsOwed: { year: string; amount: number; source: string }[];
}

export const defaultAnalysis: AnalysisState = {
  entityType: null,
  analysisDepth: null,
  step: 0,
  pqAnswers: {},
  screeningAnswers: {},
  transcriptUploaded: false,
  assets: {},
  income: {},
  expenses: {},
  totalDebt: 47250,
  yearsOwed: [
    { year: "2021", amount: 18500, source: "transcript" },
    { year: "2022", amount: 15250, source: "transcript" },
    { year: "2023", amount: 13500, source: "transcript" },
  ],
};

// Resolution results
export interface ResolutionOption {
  id: string;
  name: string;
  shortName: string;
  savings: number;
  savingsPercent: number;
  monthlyPayment: number;
  duration: string;
  eligible: boolean;
  recommended: boolean;
  description: string;
}

export const sampleResolutions: ResolutionOption[] = [
  { id: "oic", name: "Offer in Compromise", shortName: "OIC", savings: 38750, savingsPercent: 82, monthlyPayment: 0, duration: "Lump Sum", eligible: true, recommended: true, description: "Settle your entire tax debt for $8,500 — a one-time payment that eliminates 82% of what you owe." },
  { id: "ia", name: "Installment Agreement", shortName: "IA", savings: 0, savingsPercent: 0, monthlyPayment: 657, duration: "72 months", eligible: true, recommended: false, description: "Pay your full balance over 72 months at $657/month through a Streamlined DDIA." },
  { id: "cnc", name: "Currently Not Collectible", shortName: "CNC", savings: 47250, savingsPercent: 100, monthlyPayment: 0, duration: "Until CSED", eligible: true, recommended: false, description: "Temporarily pause all IRS collection activity while you get back on your feet." },
  { id: "penalty", name: "Penalty Abatement", shortName: "PA", savings: 5300, savingsPercent: 11, monthlyPayment: 0, duration: "One-time", eligible: true, recommended: false, description: "Remove $5,300 in penalties through First-Time Abatement or Reasonable Cause." },
];

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export function formatPercent(n: number): string {
  return `${n}%`;
}
