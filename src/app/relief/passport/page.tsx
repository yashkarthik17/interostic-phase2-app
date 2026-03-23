"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Plane, AlertTriangle, CheckCircle2, DollarSign, Clock, Info } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const triggers = [
  "You owe more than $62,000 in assessed federal tax debt (including penalties and interest)",
  "The IRS has filed a Notice of Federal Tax Lien and your CDP rights have lapsed or been used",
  "The IRS has issued a levy",
  "Your debt has not been resolved through a payment plan, OIC, or CNC status",
];

const resolutions = [
  { title: "Pay in Full", desc: "Pay your entire tax debt to immediately resolve the certification" },
  { title: "Installment Agreement", desc: "Enter a compliant installment agreement with the IRS" },
  { title: "Offer in Compromise", desc: "Submit an OIC that is accepted or pending review" },
  { title: "CNC Status", desc: "Get placed in Currently Not Collectible status" },
  { title: "Dispute the Debt", desc: "If the assessment is wrong, challenge it through proper channels" },
  { title: "Request CDP Hearing", desc: "Exercise your Collection Due Process rights if applicable" },
];

const decertSteps = [
  "Resolve your debt using one of the methods above",
  "The IRS notifies the State Department within 30 days of resolution",
  "The State Department removes the certification",
  "Your passport application can proceed or your passport is reinstated",
  "If traveling urgently, call the IRS to expedite decertification",
];

export default function PassportPage() {
  return (
    <AppShell>
      <ScreenHeader title="Passport Certification" backHref="/relief" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          The IRS can certify seriously delinquent tax debt to the State
          Department, which may deny, revoke, or limit your passport.
          Here is what you need to know.
        </p>

        {/* Warning */}
        <div className="animate-fade-up delay-1">
          <ContextCard icon={AlertTriangle} title="Serious Consequence" variant="red">
            If your tax debt is certified, the State Department will not issue
            or renew your passport. If you are abroad, they may issue a
            limited passport only for return to the U.S.
          </ContextCard>
        </div>

        {/* What Triggers */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-brand-red" />
              <p className="text-sm font-bold text-navy">What Triggers Certification</p>
            </div>
            <div className="space-y-2.5">
              {triggers.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={14} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm text-navy leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-surface-alt rounded-xl p-3">
              <p className="text-xs text-muted">
                <span className="font-bold">Current threshold:</span> {formatCurrency(62000)} (adjusted annually for inflation)
              </p>
            </div>
          </Card>
        </div>

        {/* How to Resolve */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-navy">How to Resolve</p>
            </div>
            <div className="space-y-3">
              {resolutions.map((r, i) => (
                <div key={i} className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-navy">{r.title}</p>
                  <p className="text-xs text-muted mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Decertification Process */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Decertification Process</p>
            </div>
            <div className="space-y-3">
              {decertSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  <span className="w-5 h-5 rounded-full bg-navy-light text-navy text-[0.625rem] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              If you have imminent travel plans, the IRS may expedite the
              decertification process. Have your travel documentation ready when
              you call.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
