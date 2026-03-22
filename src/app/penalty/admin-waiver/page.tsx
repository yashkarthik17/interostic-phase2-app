"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
} from "@/components/ui/shell";
import { Shield, ChevronDown, Info, CheckCircle2 } from "lucide-react";

const waiverTypes = [
  {
    title: "First-Time Penalty Abatement (FTA)",
    summary:
      "The most commonly used administrative waiver. Available to taxpayers with a clean compliance history for the past 3 years.",
    requirements: [
      "No penalties (other than estimated tax) in prior 3 tax years",
      "All currently required returns are filed or on valid extension",
      "All tax due is paid, or you have an approved payment arrangement",
    ],
    tip: "You can request FTA over the phone by calling the IRS. No formal letter needed.",
  },
  {
    title: "IRM 20.1.1.3 - Reasonable Cause Assistant",
    summary:
      "The IRS uses an internal computer program (RCA) to evaluate penalty relief requests. Understanding how it works helps you frame your request.",
    requirements: [
      "The RCA checks for factors like compliance history and dates",
      "It evaluates whether a reasonable cause explanation was provided",
      "A human reviewer can override the RCA recommendation",
    ],
    tip: "Always provide a written explanation even if you think FTA applies -- it serves as a backup.",
  },
  {
    title: "Penalty Relief for Specific Situations",
    summary:
      "The IRS has internal guidance for specific circumstances that may not be covered by statute.",
    requirements: [
      "COVID-19 related delays or complications",
      "IRS system issues that affected filing or payment",
      "Transitional relief for new tax provisions",
      "IRS processing backlogs that caused missed deadlines",
    ],
    tip: "Check IRS.gov for current notices about automatic penalty relief programs.",
  },
];

export default function AdminWaiverPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="Administrative Waiver" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Administrative waivers are penalty relief options based on IRS internal
          policy and guidance rather than statute. These give the IRS discretion
          to remove penalties in the interest of fairness.
        </p>

        <div className="animate-fade-up delay-1">
          <div className="flex items-center gap-2 p-3 bg-navy-light rounded-xl mb-1">
            <Info size={16} className="text-navy shrink-0" />
            <p className="text-xs font-semibold text-navy">
              Administrative waivers are found in the Internal Revenue Manual (IRM),
              not the tax code. They reflect IRS policy decisions.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {waiverTypes.map((w, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-brand-blue shrink-0" />
                    <p className="text-sm font-bold text-navy">{w.title}</p>
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
                    <p className="text-sm text-navy leading-relaxed">{w.summary}</p>
                    <div className="space-y-2">
                      {w.requirements.map((req, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm text-navy">{req}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-surface-alt rounded-xl p-3">
                      <p className="text-xs text-muted">
                        <span className="font-bold">Tip:</span> {w.tip}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
