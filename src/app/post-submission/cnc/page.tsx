"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { PauseCircle, CheckCircle2, Clock, AlertTriangle, Info } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const statusDetails = [
  { label: "Status", value: "Currently Not Collectible" },
  { label: "Transaction Code", value: "TC 530" },
  { label: "Effective Date", value: "Jan 20, 2026" },
  { label: "Total Debt", value: formatCurrency(47250) },
  { label: "CSED Expiration", value: "Apr 15, 2032" },
  { label: "Annual Review", value: "Next: Jan 2027" },
];

const whatHappensNow = [
  "The IRS will not send collection notices or make phone calls",
  "No bank levies, wage garnishments, or asset seizures",
  "Existing liens remain in place but no new liens will be filed",
  "Interest and penalties continue to accrue (but this usually does not matter)",
  "The CSED clock continues to run in your favor",
  "Refunds from future returns may be applied to your balance",
];

const stayCompliant = [
  "File all future tax returns on time",
  "Pay all future taxes when due (do not create new debt)",
  "Report any significant changes in income or assets",
  "Respond to any IRS correspondence promptly",
];

export default function PostSubmissionCncPage() {
  return (
    <AppShell>
      <ScreenHeader title="CNC Status" backHref="/cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Status Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-navy-light !border-transparent">
            <div className="flex items-center gap-3">
              <PauseCircle size={20} className="text-navy" />
              <div>
                <p className="text-sm font-bold text-navy">Currently Not Collectible</p>
                <p className="text-xs text-navy/70 mt-0.5">
                  IRS collection activity is paused on your account
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Details */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-3">Account Details</p>
            <div className="space-y-3">
              {statusDetails.map((d, i) => (
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

        {/* CSED Countdown */}
        <div className="animate-fade-up delay-2">
          <Card className="!bg-brand-green-light !border-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-brand-green">CSED Clock Is Running</p>
            </div>
            <p className="text-xs text-brand-green/80 leading-relaxed">
              The 10-year collection statute continues to count down while you
              are in CNC status. If your debt reaches the CSED expiration date,
              it is permanently written off. This is one of the key benefits of
              CNC over other resolution options.
            </p>
          </Card>
        </div>

        {/* What Happens Now */}
        <div className="animate-fade-up delay-3">
          <Card>
            <p className="text-sm font-bold text-navy mb-3">What Happens Now</p>
            <div className="space-y-2.5">
              {whatHappensNow.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stay Compliant */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-800" />
              <p className="text-sm font-bold text-navy">Stay Compliant</p>
            </div>
            <p className="text-xs text-muted mb-3">
              To maintain your CNC status, you must continue to meet these
              requirements:
            </p>
            <div className="space-y-2.5">
              {stayCompliant.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-warning-light rounded-xl">
            <Info size={16} className="text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              The IRS reviews CNC cases periodically. If your income increases
              significantly, they may remove CNC status and resume collection
              activity. We will monitor your account and notify you of any changes.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
