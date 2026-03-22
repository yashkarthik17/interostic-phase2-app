"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
} from "@/components/ui/shell";
import { PauseCircle, ChevronDown, CheckCircle2, AlertTriangle, Clock, FileText, Info } from "lucide-react";

const sections = [
  {
    title: "What CNC Means",
    content:
      "Currently Not Collectible (CNC) is an IRS status that temporarily pauses all collection activity against you. The IRS acknowledges that requiring payment would create an economic hardship. Your debt does not go away, but the IRS stops pursuing it actively.",
  },
  {
    title: "How It Works",
    content:
      "Once placed in CNC status, the IRS stops sending collection notices, will not levy your bank accounts or wages, and will not file new tax liens (though existing liens remain). Your account is marked with Transaction Code 530, and your case is shelved until your financial situation changes.",
  },
];

const qualificationCriteria = [
  "Your income is at or below IRS allowable living expense standards",
  "You have no significant assets that could be liquidated",
  "Paying your tax debt would prevent you from meeting basic needs",
  "You have explored and do not qualify for other payment options",
  "You are current on all filing requirements",
];

const csedInfo = [
  "The 10-year collection statute (CSED) continues to run while in CNC",
  "If your debt reaches the CSED, it is permanently written off",
  "This is one of the key advantages of CNC over other options",
  "Interest and penalties continue to accrue, but this rarely matters if CSED expires",
];

const reEvalTriggers = [
  "Significant increase in income (IRS monitors annually via returns)",
  "Acquisition of assets (inheritance, property purchase)",
  "Change in filing status that increases household income",
  "Failure to file required tax returns",
  "IRS periodic review (typically every 1-2 years)",
];

export default function CncPage() {
  const [expanded, setExpanded] = useState<string | null>("what");

  const toggle = (key: string) => setExpanded(expanded === key ? null : key);

  return (
    <AppShell>
      <ScreenHeader title="Currently Not Collectible" backHref="/relief" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          If paying your tax debt would make it impossible to cover basic living
          expenses, CNC status can give you breathing room while the clock runs
          on your debt.
        </p>

        {/* What CNC Means & How It Works */}
        {sections.map((s, i) => (
          <div key={s.title} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
            <Card>
              <p className="text-sm font-bold text-navy mb-2">{s.title}</p>
              <p className="text-sm text-navy leading-relaxed">{s.content}</p>
            </Card>
          </div>
        ))}

        {/* Qualification */}
        <div className="animate-fade-up delay-3">
          <Card>
            <button onClick={() => toggle("qualify")} className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-green" />
                <p className="text-sm font-bold text-navy">Qualification Criteria</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${expanded === "qualify" ? "rotate-180" : ""}`} />
            </button>
            {expanded === "qualify" && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                {qualificationCriteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="text-sm text-navy">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* CSED */}
        <div className="animate-fade-up delay-4">
          <Card>
            <button onClick={() => toggle("csed")} className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-teal" />
                <p className="text-sm font-bold text-navy">CSED Implications</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${expanded === "csed" ? "rotate-180" : ""}`} />
            </button>
            {expanded === "csed" && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                <div className="bg-brand-green-light rounded-xl p-3 mb-2">
                  <p className="text-xs font-semibold text-brand-green">
                    Key advantage: The collection clock keeps ticking while you are in CNC.
                  </p>
                </div>
                {csedInfo.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Clock size={14} className="text-teal shrink-0 mt-0.5" />
                    <span className="text-sm text-navy">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Re-evaluation Triggers */}
        <div className="animate-fade-up delay-5">
          <Card>
            <button onClick={() => toggle("reeval")} className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-800" />
                <p className="text-sm font-bold text-navy">Re-evaluation Triggers</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${expanded === "reeval" ? "rotate-180" : ""}`} />
            </button>
            {expanded === "reeval" && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                <p className="text-xs text-muted mb-2">
                  CNC is not permanent. The IRS will periodically review your status:
                </p>
                {reEvalTriggers.map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <AlertTriangle size={14} className="text-amber-800 shrink-0 mt-0.5" />
                    <span className="text-sm text-navy">{t}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Form 433-F */}
        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">Form 433-F Overview</p>
            </div>
            <p className="text-sm text-navy leading-relaxed mb-3">
              To request CNC status, the IRS will typically require you to complete
              Form 433-F, Collection Information Statement. This form documents:
            </p>
            <div className="space-y-2">
              {[
                "Monthly income from all sources",
                "Monthly living expenses (housing, food, transportation, healthcare)",
                "Assets (bank accounts, investments, vehicles, property)",
                "Other financial obligations",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-light text-navy text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
