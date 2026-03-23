"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Users, CheckCircle2, AlertTriangle, FileText, Info } from "lucide-react";

const whatIsIt = `If you filed a joint return and your share of the refund was taken (offset) to pay your spouse's separate debt -- such as past-due child support, federal student loans, or their individual tax debt -- you may be an "injured spouse." Form 8379 allows you to recover your portion of the joint refund.`;

const qualifyingDebts = [
  "Past-due child support",
  "Past-due federal student loans",
  "State income tax obligations",
  "Certain other federal debts (non-tax)",
  "Your spouse's individual tax debt from a prior year",
];

const filingSteps = [
  {
    title: "Determine If You Qualify",
    detail: "You must have reported income (wages, interest, etc.) on the joint return and made tax payments (withholding, estimated payments) or claimed a refundable credit.",
  },
  {
    title: "Complete Form 8379",
    detail: "Enter your allocation of income, deductions, credits, and payments. The IRS will calculate your share of the joint refund.",
  },
  {
    title: "When to File",
    detail: "You can attach Form 8379 to your joint return when filing, or file it separately after your refund has been offset. If filing separately, send it to the IRS service center where you filed your return.",
  },
  {
    title: "Processing Time",
    detail: "Allow up to 11 weeks if filed electronically with your return, or up to 14 weeks if filed by mail or submitted after the return was filed.",
  },
];

export default function InjuredSpousePage() {
  return (
    <AppShell>
      <ScreenHeader title="Injured Spouse" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          If your tax refund was taken to pay your spouse's debt, you may be able
          to get your share back.
        </p>

        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Users size={14} className="text-violet" />
              <p className="text-sm font-bold text-navy">What Is Injured Spouse Relief?</p>
            </div>
            <p className="text-sm text-navy leading-relaxed">{whatIsIt}</p>
          </Card>
        </div>

        <div className="animate-fade-up delay-1">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              Injured Spouse (Form 8379) is different from Innocent Spouse (Form
              8857). Injured spouse is about getting your refund back. Innocent
              spouse is about removing liability for your spouse's tax errors.
            </p>
          </div>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-warning" />
              <p className="text-sm font-bold text-navy">Debts That Trigger Offset</p>
            </div>
            <div className="space-y-2.5">
              {qualifyingDebts.map((debt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{debt}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">How to File Form 8379</p>
            </div>
            <div className="space-y-4">
              {filingSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-green-light text-brand-green text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{step.title}</p>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">Community Property States</p>
            <p className="text-sm text-navy leading-relaxed mb-3">
              If you live in a community property state, special rules apply to how
              income and deductions are allocated between spouses. The community
              property states are:
            </p>
            <div className="flex flex-wrap gap-2">
              {["AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI"].map((st) => (
                <span
                  key={st}
                  className="px-2.5 py-1 rounded-lg bg-surface-alt text-xs font-semibold text-muted"
                >
                  {st}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
