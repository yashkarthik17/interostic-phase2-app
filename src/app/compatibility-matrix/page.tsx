"use client";
import { AppShell, ScreenHeader, ScreenContent, Card } from "@/components/ui/shell";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type Compat = "yes" | "no" | "conditional";

interface MatrixEntry {
  combo: string;
  r1: string;
  r2: string;
  status: Compat;
  note: string;
}

const matrix: MatrixEntry[] = [
  { combo: "OIC + PA", r1: "OIC", r2: "PA", status: "yes", note: "Apply for Penalty Abatement before or alongside your OIC to reduce overall liability." },
  { combo: "OIC + IA", r1: "OIC", r2: "IA", status: "conditional", note: "Cannot run simultaneously. An IA can serve as a backup if the OIC is rejected." },
  { combo: "OIC + CNC", r1: "OIC", r2: "CNC", status: "conditional", note: "CNC can be requested while preparing an OIC but must transition once OIC is filed." },
  { combo: "IA + CNC", r1: "IA", r2: "CNC", status: "no", note: "Mutually exclusive. CNC means you cannot make payments; IA requires payments." },
  { combo: "IA + PA", r1: "IA", r2: "PA", status: "yes", note: "Request Penalty Abatement to reduce balance before setting up your Installment Agreement." },
  { combo: "CNC + PA", r1: "CNC", r2: "PA", status: "yes", note: "Penalty Abatement can be requested while in CNC status to reduce the outstanding balance." },
  { combo: "OIC + CDP", r1: "OIC", r2: "CDP", status: "conditional", note: "An OIC can be proposed during a CDP hearing as an alternative to collection action." },
  { combo: "IA + CDP", r1: "IA", r2: "CDP", status: "conditional", note: "An IA can be proposed during a CDP hearing if you want to set up payments instead." },
  { combo: "PA + SFR", r1: "PA", r2: "SFR", status: "no", note: "Must file original returns to replace SFRs before Penalty Abatement can be considered." },
  { combo: "OIC + OIC", r1: "OIC", r2: "OIC", status: "no", note: "Cannot have multiple OICs pending. Must withdraw or receive a decision before resubmitting." },
];

const statusConfig: Record<Compat, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  yes: { icon: CheckCircle2, color: "text-brand-green", bg: "bg-brand-green-light", label: "Compatible" },
  no: { icon: XCircle, color: "text-brand-red", bg: "bg-brand-red-light", label: "Incompatible" },
  conditional: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning-light", label: "Conditional" },
};

export default function CompatibilityMatrixPage() {
  return (
    <AppShell>
      <ScreenHeader title="Compatibility Matrix" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Intro */}
        <div className="animate-fade-up delay-1">
          <p className="text-sm text-muted leading-relaxed mb-2">
            Not all tax resolution strategies can be combined. Use this guide to understand which options work together and which are mutually exclusive.
          </p>
        </div>

        {/* Legend */}
        <div className="animate-fade-up delay-2 flex gap-3">
          {(["yes", "no", "conditional"] as Compat[]).map((status) => {
            const config = statusConfig[status];
            return (
              <div key={status} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg}`}>
                <config.icon size={12} className={config.color} />
                <span className={`text-[0.625rem] font-bold ${config.color}`}>{config.label}</span>
              </div>
            );
          })}
        </div>

        {/* Matrix Cards */}
        <div className="animate-fade-up delay-3 space-y-2.5">
          {matrix.map((entry) => {
            const config = statusConfig[entry.status];
            const StatusIcon = config.icon;
            return (
              <Card key={entry.combo} className="!p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-navy-light text-[0.625rem] font-black text-navy">
                      {entry.r1}
                    </span>
                    <span className="text-xs text-placeholder font-bold">+</span>
                    <span className="px-2 py-0.5 rounded-md bg-navy-light text-[0.625rem] font-black text-navy">
                      {entry.r2}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg}`}>
                    <StatusIcon size={12} className={config.color} />
                    <span className={`text-[0.625rem] font-bold ${config.color}`}>{config.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">{entry.note}</p>
              </Card>
            );
          })}
        </div>

        {/* Info Note */}
        <div className="animate-fade-up delay-4">
          <div className="flex items-start gap-3 bg-info-light border border-info/10 rounded-2xl p-4">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs text-info leading-relaxed">
              Compatibility may vary based on your specific situation, timing, and the IRS office handling your case. Consult a tax professional if you plan to pursue multiple strategies simultaneously.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
