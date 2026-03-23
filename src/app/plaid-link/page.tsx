"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, Button, SectionHeader, ContextCard } from "@/components/ui/shell";
import { Search, Building2, Shield, Eye, Lock, Check, ChevronRight } from "lucide-react";

const popularBanks = [
  { name: "Chase", logo: "🏦" },
  { name: "Bank of America", logo: "🏛️" },
  { name: "Wells Fargo", logo: "🏦" },
  { name: "Citi", logo: "🏛️" },
  { name: "Capital One", logo: "🏦" },
];

const securityFeatures = [
  { icon: Lock, label: "Bank-level encryption", detail: "256-bit AES encryption protects your credentials" },
  { icon: Eye, label: "Read-only access", detail: "We can only view transactions, never move money" },
  { icon: Shield, label: "Secure connection", detail: "Powered by Plaid, trusted by millions" },
];

export default function PlaidLinkPage() {
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const filteredBanks = popularBanks.filter(
    (b) => !search || b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <ScreenHeader title="Connect Your Bank" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Header */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-green-light mx-auto mb-3">
            <Building2 size={28} className="text-brand-green" />
          </div>
          <p className="text-center text-sm text-muted leading-relaxed max-w-xs mx-auto">
            Connect your bank account to automatically verify income, expenses, and assets for your tax resolution analysis.
          </p>
        </div>

        {/* Search */}
        <div className="animate-fade-up delay-2">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder" />
            <input
              type="text"
              placeholder="Search your bank..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
            />
          </div>
        </div>

        {/* Popular Banks */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Popular Banks
          </p>
          <div className="space-y-2">
            {filteredBanks.map((bank) => (
              <button
                key={bank.name}
                onClick={() => setSelectedBank(bank.name)}
                className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl border transition-all duration-200 ${
                  selectedBank === bank.name
                    ? "border-brand-green bg-brand-green-light"
                    : "border-border bg-white hover:border-border-strong"
                }`}
              >
                <span className="text-2xl">{bank.logo}</span>
                <span className="text-sm font-semibold text-navy flex-1 text-left">{bank.name}</span>
                {selectedBank === bank.name ? (
                  <Check size={18} className="text-brand-green" />
                ) : (
                  <ChevronRight size={18} className="text-placeholder" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Security Reassurance */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Your Security
          </p>
          <Card className="!p-0 divide-y divide-border">
            {securityFeatures.map((feat) => (
              <div key={feat.label} className="flex items-center gap-3.5 px-4 py-3.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green-light shrink-0">
                  <feat.icon size={16} className="text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">{feat.label}</p>
                  <p className="text-xs text-muted">{feat.detail}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-5 space-y-3 pt-2">
          <Button variant="primary" disabled={!selectedBank}>
            <Building2 size={16} />
            Connect
          </Button>
          <Button variant="ghost" href="/dashboard">
            Skip for now
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
