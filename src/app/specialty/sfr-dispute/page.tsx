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
import { FileX, ChevronDown, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const whatIsSfr = `When you don't file a tax return, the IRS may file one for you called a Substitute for Return (SFR). The problem is that the IRS only uses income information reported to them (W-2s, 1099s) and gives you NO deductions, credits, or exemptions you're entitled to. This almost always results in a higher tax bill than you actually owe.`;

const signs = [
  "Your transcript shows TC 150 with a 'SFR' or '6020(b)' indicator",
  "You received a Notice of Deficiency (CP3219A) for a year you did not file",
  "Your assessed tax balance seems much higher than it should be",
  "You see deductions of $0 on your account transcript",
];

const disputeSteps = [
  {
    title: "Prepare Your Original Return",
    detail: "File the original return for the SFR year with all legitimate deductions, credits, and exemptions. This replaces the SFR assessment.",
  },
  {
    title: "Gather Supporting Documents",
    detail: "Collect W-2s, 1099s, receipts for deductions, and any other documentation that supports your actual tax liability.",
  },
  {
    title: "Request Audit Reconsideration",
    detail: "If the SFR assessment is already on your account, you may need to request audit reconsideration using Form 12661 or a written request.",
  },
  {
    title: "Submit to the IRS",
    detail: "Mail your original return and supporting documents to the IRS. Include a cover letter explaining that you are replacing the SFR.",
  },
  {
    title: "Monitor Your Account",
    detail: "Check your transcript for TC 29X (adjustment) entries that reduce your balance to reflect your actual return.",
  },
];

export default function SfrDisputePage() {
  const [showSteps, setShowSteps] = useState(true);

  return (
    <AppShell>
      <ScreenHeader title="SFR Dispute" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          If the IRS filed a return on your behalf, you likely owe less than they
          calculated. Here is how to fix it.
        </p>

        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">What Is a Substitute for Return?</p>
            <p className="text-sm text-navy leading-relaxed">{whatIsSfr}</p>
          </Card>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileX size={14} className="text-warning" />
              <p className="text-sm font-bold text-navy">Signs You Have an SFR</p>
            </div>
            <div className="space-y-2.5">
              {signs.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{s}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center justify-between w-full text-left"
            >
              <p className="text-sm font-bold text-navy">How to Dispute an SFR</p>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-200 ${showSteps ? "rotate-180" : ""}`}
              />
            </button>
            {showSteps && (
              <div className="mt-3 pt-3 border-t border-border space-y-4">
                {disputeSteps.map((step, i) => (
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
            )}
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <div className="flex items-start gap-2 p-3 bg-brand-green-light rounded-xl">
            <Info size={16} className="text-brand-green shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-brand-green leading-relaxed">
              Filing your original return usually results in a significant reduction
              in your tax balance. Many taxpayers see their liability drop by 30-60%
              after replacing an SFR.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
