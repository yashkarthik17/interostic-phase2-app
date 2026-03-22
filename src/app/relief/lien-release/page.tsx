"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { Link2, ChevronDown, CheckCircle2, Clock, FileText, Info } from "lucide-react";

const releaseTypes = [
  {
    title: "Lien Release",
    badge: "Full Removal",
    badgeVariant: "success" as const,
    description:
      "The IRS must release a lien within 30 days after you pay your tax debt in full or the debt becomes unenforceable (CSED expiration). The lien filing is removed from public records.",
    triggers: [
      "Tax debt paid in full",
      "CSED expiration (10-year statute)",
      "Accepted OIC with full payment",
      "Bond posted to cover the tax debt",
    ],
  },
  {
    title: "Lien Discharge",
    badge: "Property-Specific",
    badgeVariant: "info" as const,
    description:
      "A discharge removes the lien from a specific property while keeping it on other assets. This is commonly used when selling a home or refinancing.",
    triggers: [
      "Property sale with IRS receiving fair share of proceeds",
      "Property value is less than the amount of senior liens",
      "Partial payment to the IRS from sale proceeds",
      "Application via Form 14135",
    ],
  },
  {
    title: "Lien Subordination",
    badge: "Priority Change",
    badgeVariant: "warning" as const,
    description:
      "Subordination moves the IRS lien behind another creditor's lien. This allows you to refinance a mortgage or obtain a loan, which may actually help the IRS get paid faster.",
    triggers: [
      "Refinancing at a lower rate frees up money for tax payments",
      "New lien holder is providing funds that benefit IRS collection",
      "Application via Form 14134",
      "IRS determines subordination will facilitate payment",
    ],
  },
  {
    title: "Lien Withdrawal",
    badge: "Best Outcome",
    badgeVariant: "success" as const,
    description:
      "A withdrawal removes the public Notice of Federal Tax Lien entirely. It is different from a release because it treats the filing as if it never happened, improving your credit.",
    triggers: [
      "You enter a Direct Debit Installment Agreement (DDIA)",
      "The lien was filed prematurely or not in accordance with procedures",
      "Withdrawal is in the best interest of both the taxpayer and government",
      "The debt is $25,000 or less and payable within 60 months via DDIA",
    ],
  },
];

const timeline = [
  { step: "Submit Application", time: "Day 1" },
  { step: "IRS Reviews Request", time: "30-45 days" },
  { step: "Additional Info Requested (if needed)", time: "45-60 days" },
  { step: "Decision Issued", time: "60-90 days" },
  { step: "Lien Action Recorded", time: "30 days after approval" },
];

export default function LienReleasePage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="Lien & Levy Release" backHref="/relief" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          A federal tax lien can make it difficult to sell property, get credit,
          or run a business. Here are the ways to remove or reduce its impact.
        </p>

        <div className="space-y-3">
          {releaseTypes.map((type, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link2 size={14} className="text-warning shrink-0" />
                      <p className="text-sm font-bold text-navy">{type.title}</p>
                    </div>
                    <Badge variant={type.badgeVariant}>{type.badge}</Badge>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border space-y-3">
                    <p className="text-sm text-navy leading-relaxed">{type.description}</p>
                    <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                      When This Applies
                    </p>
                    <div className="space-y-2">
                      {type.triggers.map((t, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm text-navy">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Timeline Expectations</p>
            </div>
            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 last:pb-0 relative">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[9px] top-5 bottom-0 w-px bg-border" />
                  )}
                  <div className="w-[18px] h-[18px] rounded-full bg-navy-light flex items-center justify-center shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-navy" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-navy">{t.step}</span>
                    <span className="text-xs font-semibold text-muted">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              Levy release is different from lien release. If the IRS has levied
              (seized) your wages or bank account, contact us immediately -- there
              are strict deadlines to challenge a levy.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
