"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
  IconCircle,
} from "@/components/ui/shell";
import {
  AlertTriangle,
  Shield,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  FileText,
  Heart,
  CloudRain,
  Sword,
  XCircle,
  Users,
  Star,
} from "lucide-react";
import { formatCurrency } from "@/lib/store";

const penalties = [
  { label: "Failure to File", amount: 3200 },
  { label: "Failure to Pay", amount: 2100 },
];

const totalPenalties = 5300;

const eligibilityChecks = [
  "No penalties in prior 3 years",
  "All required returns filed",
  "Current on payments or in agreement",
];

const reasonableCauses = [
  "Serious illness or incapacitation",
  "Natural disaster",
  "Death in immediate family",
  "Fire, casualty, or other disturbance",
  "Inability to obtain records",
];

const strategyLinks = [
  { href: "/penalty/statutory", icon: FileText, color: "teal" as const, title: "Statutory Exceptions", desc: "Penalty removal based on specific tax code provisions" },
  { href: "/penalty/admin-waiver", icon: Shield, color: "blue" as const, title: "Administrative Waiver", desc: "IRS discretionary waivers and internal guidance" },
  { href: "/penalty/disaster", icon: CloudRain, color: "warning" as const, title: "Disaster Relief", desc: "Federally declared disaster area relief" },
  { href: "/penalty/combat-zone", icon: Sword, color: "navy" as const, title: "Combat Zone Relief", desc: "Extensions for active military in combat zones" },
  { href: "/penalty/irs-error", icon: XCircle, color: "red" as const, title: "IRS Error Removal", desc: "Penalties caused by incorrect IRS advice or errors" },
  { href: "/penalty/spouse-relief", icon: Users, color: "violet" as const, title: "Spouse Relief", desc: "Innocent or injured spouse relief (Form 8857)" },
];

export default function PenaltyPage() {
  const [showReasonable, setShowReasonable] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="Penalty Abatement" backHref="/resolve" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          You may be eligible to have your penalties reduced or removed entirely.
          Here is what we found.
        </p>

        {/* Current Penalties */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-brand-red" />
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                Current Penalties
              </p>
            </div>
            <div className="space-y-2.5 mb-3">
              {penalties.map((p) => (
                <div key={p.label} className="flex justify-between items-center">
                  <span className="text-sm text-navy">{p.label}</span>
                  <span className="text-sm font-bold text-brand-red">
                    {formatCurrency(p.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-navy">Total Penalties</span>
              <span className="text-lg font-black text-brand-red">
                {formatCurrency(totalPenalties)}
              </span>
            </div>
          </Card>
        </div>

        {/* FTA Strategy - Recommended */}
        <div className="animate-fade-up delay-2">
          <Card className="!border-brand-green">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-brand-green" />
                <p className="text-sm font-bold text-navy">First-Time Abatement</p>
              </div>
              <Badge variant="success">RECOMMENDED</Badge>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-4">
              The IRS will remove penalties for taxpayers with a clean compliance
              history. This is the simplest and most effective approach.
            </p>

            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
              Eligibility Checks
            </p>
            <div className="space-y-2 mb-4">
              {eligibilityChecks.map((check) => (
                <div key={check} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span className="text-sm text-navy">{check}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between bg-brand-green-light rounded-xl px-4 py-3 mb-4">
              <span className="text-sm font-semibold text-brand-green">Potential Savings</span>
              <span className="text-lg font-black text-brand-green">
                {formatCurrency(totalPenalties)}
              </span>
            </div>

            <Button href="/resolution-plan">Apply for Relief</Button>
          </Card>
        </div>

        {/* Reasonable Cause */}
        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowReasonable(!showReasonable)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-violet" />
                <p className="text-sm font-bold text-navy">Reasonable Cause</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-200 ${
                  showReasonable ? "rotate-180" : ""
                }`}
              />
            </button>

            {showReasonable && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted leading-relaxed mb-3">
                  If you don't qualify for First-Time Abatement, you may still get
                  penalties removed by demonstrating reasonable cause. The IRS
                  considers your specific circumstances.
                </p>
                <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
                  Qualifying Reasons
                </p>
                <div className="space-y-2 mb-3">
                  {reasonableCauses.map((cause, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-violet-light text-violet text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-navy">{cause}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  You will need to provide documentation supporting your claim,
                  such as medical records, insurance claims, or death certificates.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* More Strategies */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Other Penalty Relief Strategies
          </p>
          <div className="space-y-2.5">
            {strategyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3.5 p-4 bg-white border border-border rounded-2xl transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <IconCircle icon={item.icon} color={item.color} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy">{item.title}</p>
                  <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-placeholder shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
