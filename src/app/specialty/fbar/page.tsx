"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { Globe, ChevronDown, AlertTriangle, CheckCircle2, DollarSign, Info } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const penaltyTiers = [
  {
    label: "Non-Willful (per violation)",
    amount: "$10,000 per account per year",
    severity: "warning" as const,
  },
  {
    label: "Willful",
    amount: "Greater of $100,000 or 50% of account balance",
    severity: "danger" as const,
  },
  {
    label: "Criminal",
    amount: "Up to $500,000 fine and/or 10 years imprisonment",
    severity: "danger" as const,
  },
];

const filingRequirements = [
  "You are a U.S. person (citizen, resident, entity)",
  "You had a financial interest in or signature authority over foreign accounts",
  "The aggregate value exceeded $10,000 at any time during the calendar year",
  "Filed electronically through BSA E-Filing System (not with your tax return)",
  "Due April 15 with automatic extension to October 15",
];

const resolutionOptions = [
  {
    title: "Streamlined Filing Compliance",
    desc: "For non-willful violations. File 3 years of returns and 6 years of FBARs with a certification statement. Penalties reduced or eliminated.",
    good: true,
  },
  {
    title: "Delinquent FBAR Submission",
    desc: "If you have reasonable cause for late filing and no underreported income, you can submit late FBARs with an explanation. Penalties may be waived.",
    good: true,
  },
  {
    title: "Voluntary Disclosure Practice",
    desc: "For willful violations. Submit through IRS Criminal Investigation. Higher penalties but protection from criminal prosecution.",
    good: false,
  },
  {
    title: "Reasonable Cause Defense",
    desc: "Challenge non-willful penalties by showing you had reasonable cause for not filing. Factors include reliance on a tax professional, lack of knowledge of the requirement.",
    good: true,
  },
];

export default function FbarPage() {
  const [showResolutions, setShowResolutions] = useState(true);

  return (
    <AppShell>
      <ScreenHeader title="FBAR Penalties" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          The Report of Foreign Bank and Financial Accounts (FBAR) is one of the
          most heavily penalized reporting requirements. Understanding your
          obligations and options is critical.
        </p>

        {/* Penalty Tiers */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-brand-red" />
              <p className="text-sm font-bold text-navy">Penalty Amounts</p>
            </div>
            <div className="space-y-3">
              {penaltyTiers.map((tier, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                  <span className="text-sm text-navy">{tier.label}</span>
                  <Badge variant={tier.severity}>{tier.amount}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Filing Requirements */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">Who Must File</p>
            </div>
            <div className="space-y-2.5">
              {filingRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{req}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Resolution Options */}
        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowResolutions(!showResolutions)}
              className="flex items-center justify-between w-full text-left"
            >
              <p className="text-sm font-bold text-navy">Resolution Options</p>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-200 ${showResolutions ? "rotate-180" : ""}`}
              />
            </button>
            {showResolutions && (
              <div className="mt-3 pt-3 border-t border-border space-y-3">
                {resolutionOptions.map((opt, i) => (
                  <div key={i} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-navy">{opt.title}</p>
                      {opt.good && <Badge variant="success">Recommended</Badge>}
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <Card className="!bg-warning-light !border-transparent">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-800 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">Willfulness Matters</p>
                <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                  The difference between a $10,000 penalty and a $100,000+ penalty
                  comes down to whether your failure to file was "willful." Even
                  reckless disregard can be considered willful. Get professional
                  advice before making any disclosures.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
