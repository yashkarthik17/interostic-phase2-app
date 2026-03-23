"use client";
import { useState } from "react";
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
import { CheckCircle2, Clock, ChevronDown, AlertTriangle, Info, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const timelineSteps = [
  { label: "Application Submitted", status: "done" as const, detail: "Feb 15, 2026" },
  { label: "Application Fee & Initial Payment", status: "done" as const, detail: "$205 fee + $1,700 (20%) paid" },
  { label: "Assigned to Offer Examiner", status: "done" as const, detail: "Case assigned Mar 5, 2026" },
  { label: "Financial Review", status: "active" as const, detail: "Examiner reviewing Form 433-A(OIC)" },
  { label: "Decision", status: "pending" as const, detail: "Accept, reject, or counter-offer" },
  { label: "Compliance Period", status: "pending" as const, detail: "5 years of filing & payment compliance" },
];

const complianceReminders = [
  "Continue filing all tax returns on time while the OIC is pending",
  "Make all estimated tax payments if applicable",
  "Do not accrue any new tax liabilities",
  "Respond promptly to any IRS requests for information",
  "Keep copies of everything you send to the IRS",
];

export default function PostSubmissionOicPage() {
  const [showCounter, setShowCounter] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="OIC Status" backHref="/cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Status Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-info-light !border-transparent">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-info" />
              <div>
                <p className="text-sm font-bold text-info">Under Review</p>
                <p className="text-xs text-info/80 mt-0.5">
                  Your Offer in Compromise is being evaluated by an IRS examiner
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Offer Summary */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-navy">Your Offer</p>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Total Tax Debt</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(47250)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Offer Amount</span>
                <span className="text-sm font-semibold text-brand-green">{formatCurrency(8500)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Payment Type</span>
                <span className="text-sm font-semibold text-navy">Lump Sum</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Savings</span>
                <Badge variant="success">82% ({formatCurrency(38750)})</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-sm font-bold text-navy mb-4">Processing Timeline</p>
            <div className="space-y-0">
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 pb-5 last:pb-0 relative">
                  {i < timelineSteps.length - 1 && (
                    <div
                      className={`absolute left-[9px] top-5 bottom-0 w-px ${
                        step.status === "done" ? "bg-brand-green" : "bg-border"
                      }`}
                    />
                  )}
                  <div
                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.status === "done"
                        ? "bg-brand-green"
                        : step.status === "active"
                        ? "bg-brand-blue"
                        : "bg-border"
                    }`}
                  >
                    {step.status === "done" ? (
                      <CheckCircle2 size={12} className="text-white" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        step.status === "pending" ? "text-muted" : "text-navy"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Counter-Offer Section */}
        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowCounter(!showCounter)}
              className="flex items-center justify-between w-full text-left"
            >
              <p className="text-sm font-bold text-navy">What If I Get a Counter-Offer?</p>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-200 ${showCounter ? "rotate-180" : ""}`}
              />
            </button>
            {showCounter && (
              <div className="mt-3 pt-3 border-t border-border space-y-3">
                <p className="text-sm text-navy leading-relaxed">
                  The IRS may propose a different amount if they calculate a higher
                  Reasonable Collection Potential (RCP). You have several options:
                </p>
                <div className="space-y-2.5">
                  {[
                    "Accept the counter-offer and pay the revised amount",
                    "Negotiate by providing additional documentation to support a lower RCP",
                    "Reject the counter-offer and explore other resolution options",
                    "Appeal the rejection to the IRS Independent Office of Appeals",
                  ].map((opt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-navy-light text-navy text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-navy">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Compliance Reminders */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-800" />
              <p className="text-sm font-bold text-navy">Compliance Reminders</p>
            </div>
            <div className="space-y-2.5">
              {complianceReminders.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{r}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-warning-light rounded-xl">
            <Info size={16} className="text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              While your OIC is pending, the IRS generally cannot levy your
              property. However, the 10-year collection statute is tolled (paused)
              during this time plus 30 days.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
