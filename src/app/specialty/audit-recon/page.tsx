"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Search, ChevronDown, CheckCircle2, AlertTriangle, FileText, Info } from "lucide-react";

const whatIsIt = `Audit reconsideration is a process that allows you to reopen a closed audit when you have new information the IRS did not consider, or when the IRS made changes to your return that you disagree with. It is essentially a second chance to present your case.`;

const whenToUse = [
  "You did not receive or respond to the original audit notice",
  "You have documentation that was not previously provided to the IRS",
  "The IRS made mathematical or factual errors in the audit",
  "You disagree with the IRS's disallowance of deductions or credits",
  "An SFR (Substitute for Return) was filed and you want to submit your actual return",
];

const processSteps = [
  {
    title: "Gather Documentation",
    detail: "Collect all receipts, records, and documents that support the items in question. The stronger your documentation, the better your outcome.",
  },
  {
    title: "Write a Request Letter",
    detail: "Explain why you are requesting reconsideration, which items you disagree with, and what new information you are providing. Be specific and factual.",
  },
  {
    title: "Submit to the IRS",
    detail: "Mail your request, supporting documents, and a copy of the original audit report to the IRS. You can also submit through Form 12661 or by visiting a local IRS office.",
  },
  {
    title: "IRS Review",
    detail: "An IRS examiner will review your new information. They may request additional documents or schedule a meeting. Processing takes 2-6 months typically.",
  },
  {
    title: "Decision",
    detail: "The IRS will issue a revised report if they agree with your information, or uphold the original findings if they do not. You can appeal an unfavorable decision.",
  },
];

const docsNeeded = [
  "Copy of the original audit notice or report",
  "Supporting documentation for disputed items",
  "A detailed written explanation of your position",
  "Any correspondence from the original audit",
  "Proof of payment if you claim credits for taxes paid",
];

export default function AuditReconPage() {
  const [showProcess, setShowProcess] = useState(true);

  return (
    <AppShell>
      <ScreenHeader title="Audit Reconsideration" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Did you miss an audit notice or have new information? Audit
          reconsideration gives you another chance.
        </p>

        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">What Is Audit Reconsideration?</p>
            <p className="text-sm text-navy leading-relaxed">{whatIsIt}</p>
          </Card>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Search size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">When to Request Reconsideration</p>
            </div>
            <div className="space-y-2.5">
              {whenToUse.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowProcess(!showProcess)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-teal" />
                <p className="text-sm font-bold text-navy">The Process</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${showProcess ? "rotate-180" : ""}`} />
            </button>
            {showProcess && (
              <div className="mt-3 pt-3 border-t border-border space-y-4">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-navy-light text-navy text-xs font-bold flex items-center justify-center shrink-0">
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
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} className="text-muted" />
              <p className="text-sm font-bold text-navy">Documents to Prepare</p>
            </div>
            <div className="space-y-2.5">
              {docsNeeded.map((doc, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-surface-alt text-muted text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy">{doc}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-warning-light rounded-xl">
            <AlertTriangle size={16} className="text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              Audit reconsideration does not stop collection activity. If you owe
              money based on the original audit, the IRS may continue collecting
              while your request is being processed.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
