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
import { CheckCircle2, Clock, DollarSign, AlertTriangle, Info, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const timelineSteps = [
  { label: "Submitted", status: "done" as const, code: "" },
  { label: "TC 971 AC 043", status: "done" as const, code: "Pending IA indicator" },
  { label: "Levy Protection", status: "active" as const, code: "Collection paused" },
  { label: "Approved (TC 971 AC 063)", status: "pending" as const, code: "Approval posted" },
  { label: "First Payment Due", status: "pending" as const, code: "Mar 28, 2026" },
];

const agreementDetails = [
  { label: "Monthly Payment", value: "$657/mo" },
  { label: "Agreement Type", value: "Streamlined DDIA" },
  { label: "Payment Date", value: "28th of each month" },
  { label: "Remaining Balance", value: formatCurrency(46593) },
  { label: "Payment Progress", value: "1 of 72 payments" },
  { label: "FTP Penalty Rate", value: "0.25%/mo (reduced from 0.5%)" },
];

const complianceRequirements = [
  "File all future tax returns on time",
  "Pay all future taxes when due",
  "Make all installment payments on time",
];

export default function PostSubmissionIaPage() {
  return (
    <AppShell>
      <ScreenHeader title="IA Status" backHref="/cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Status Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-brand-green-light !border-transparent">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-brand-green" />
              <div>
                <p className="text-sm font-bold text-brand-green">Active - Streamlined DDIA</p>
                <p className="text-xs text-brand-green/80 mt-0.5">
                  Your installment agreement is in effect
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-4">Timeline</p>
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
                      <div
                        className={`w-2 h-2 rounded-full ${
                          step.status === "active" ? "bg-white" : "bg-white"
                        }`}
                      />
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
                    {step.code && (
                      <p className="text-xs text-muted mt-0.5">{step.code}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Agreement Details */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">Agreement Details</p>
            </div>
            <div className="space-y-3">
              {agreementDetails.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <span className="text-sm text-muted">{d.label}</span>
                  <span className="text-sm font-semibold text-navy">{d.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* FTP Penalty Note */}
        <div className="animate-fade-up delay-3">
          <div className="flex items-start gap-2 p-3 bg-brand-green-light rounded-xl">
            <Info size={16} className="text-brand-green shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-brand-green leading-relaxed">
              Because you are in a compliant installment agreement, your Failure to
              Pay penalty is reduced from 0.5% to 0.25% per month. This saves you
              money over the life of the agreement.
            </p>
          </div>
        </div>

        {/* Compliance Requirements */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-800" />
              <p className="text-sm font-bold text-navy">Compliance Requirements</p>
            </div>
            <p className="text-xs text-muted mb-3">
              Your installment agreement will remain in effect as long as you meet
              these requirements:
            </p>
            <div className="space-y-2.5">
              {complianceRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{req}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-5 space-y-3">
          <Button href="/billing">Make a Payment</Button>
          <Button href="/submissions" variant="outline">
            View Payment History
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
