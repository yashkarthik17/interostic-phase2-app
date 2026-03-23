"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  Badge,
  SectionHeader,
  StickyFooter,
  ContextCard,
} from "@/components/ui/shell";
import {
  Info,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  FileText,
  MessageSquare,
} from "lucide-react";

type PenaltyType =
  | "failure-to-file"
  | "failure-to-pay"
  | "accuracy"
  | "other";
type AbatementReason = "first-time" | "reasonable-cause" | "written-advice";

export default function Form843Page() {
  const [penaltyType, setPenaltyType] = useState<PenaltyType | null>(null);
  const [taxPeriod, setTaxPeriod] = useState("2021");
  const [reason, setReason] = useState<AbatementReason>("first-time");
  const [explanation, setExplanation] = useState("");

  const penalties: {
    key: PenaltyType;
    label: string;
    desc: string;
    amount: string;
  }[] = [
    {
      key: "failure-to-file",
      label: "Failure to File",
      desc: "Penalty for not filing your return by the due date",
      amount: "$2,100",
    },
    {
      key: "failure-to-pay",
      label: "Failure to Pay",
      desc: "Penalty for not paying taxes owed by the due date",
      amount: "$1,850",
    },
    {
      key: "accuracy",
      label: "Accuracy-Related",
      desc: "Penalty for underpayment due to negligence or error",
      amount: "$1,350",
    },
    {
      key: "other",
      label: "Other Penalty",
      desc: "Estimated tax penalty, information return penalty, etc.",
      amount: "Varies",
    },
  ];

  const reasons: {
    key: AbatementReason;
    icon: React.ElementType;
    label: string;
    desc: string;
  }[] = [
    {
      key: "first-time",
      icon: ShieldCheck,
      label: "First-Time Penalty Abatement",
      desc: "You have a clean compliance history for the past 3 years with no prior penalties.",
    },
    {
      key: "reasonable-cause",
      icon: AlertCircle,
      label: "Reasonable Cause",
      desc: "Circumstances beyond your control prevented timely filing or payment (illness, disaster, etc.).",
    },
    {
      key: "written-advice",
      icon: FileText,
      label: "Written Advice from IRS",
      desc: "You relied on incorrect written advice from the IRS that led to the penalty.",
    },
  ];

  return (
    <AppShell hideNav>
      <ScreenHeader title="Form 843" backHref="/forms" />
      <ProgressBar
        value={50}
        steps="Step 1 of 2"
        label="Penalty Abatement"
      />
      <ScreenContent className="space-y-5 pt-3">
        {/* Guide */}
        <div className="animate-fade-up delay-1">
          <ContextCard icon={Info} title="Penalty Abatement Request" variant="green">
            Form 843 is used to request a refund or abatement of certain
            penalties and interest. Select the penalty type and provide your
            reason for abatement.
          </ContextCard>
        </div>

        {/* Penalty Type Selection */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Penalty Type
          </p>
          <Card className="space-y-2">
            {penalties.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPenaltyType(p.key)}
                className={`flex items-center gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                  penaltyType === p.key
                    ? "border-brand-green bg-brand-green-light"
                    : "border-border bg-white hover:border-border-strong"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-[2px] shrink-0 transition-all ${
                    penaltyType === p.key
                      ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                      : "border-border-strong bg-white"
                  }`}
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-navy">{p.label}</p>
                    <span className="text-xs font-bold text-navy">
                      {p.amount}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{p.desc}</p>
                </div>
              </button>
            ))}
          </Card>
        </div>

        {/* Tax Period */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Tax Period Affected
          </p>
          <Card>
            <div className="flex gap-2">
              {["2021", "2022", "2023"].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setTaxPeriod(year)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                    taxPeriod === year
                      ? "bg-navy text-white"
                      : "bg-surface-alt text-muted hover:bg-border"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Reason for Abatement */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Reason for Abatement
          </p>
          <div className="space-y-3">
            {reasons.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setReason(r.key)}
                className={`flex items-start gap-3 w-full text-left transition-all`}
              >
                <Card
                  className={`flex-1 ${
                    reason === r.key
                      ? "!border-brand-green !bg-brand-green-light/30"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
                        reason === r.key
                          ? "bg-brand-green-light"
                          : "bg-surface-alt"
                      }`}
                    >
                      <r.icon
                        size={16}
                        className={
                          reason === r.key
                            ? "text-brand-green"
                            : "text-muted"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-navy">{r.label}</p>
                        {reason === r.key && (
                          <Badge variant="success">Selected</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="animate-fade-up delay-5">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Supporting Explanation
          </p>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={14} className="text-muted" />
              <p className="text-xs font-semibold text-muted">
                Describe the circumstances that led to the penalty
              </p>
            </div>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Example: I was unable to file my 2021 return on time due to a medical emergency that required hospitalization from March through May 2022..."
              rows={5}
              className="w-full px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all resize-none"
            />
            <p className="text-[0.625rem] font-semibold text-placeholder mt-1.5">
              Be specific about dates, events, and how they prevented compliance.
            </p>
          </Card>
        </div>

        {/* Tip */}
        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-3 p-4 bg-info-light rounded-2xl">
            <Info size={18} className="text-info shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-info mb-1">Pro Tip</p>
              <p className="text-xs text-info/80 font-semibold leading-relaxed">
                First-Time Penalty Abatement has the highest success rate. If
                you&apos;ve been compliant for the past 3 years, this is usually
                the strongest option.
              </p>
            </div>
          </div>
        </div>

      </ScreenContent>
      <StickyFooter>
        <Button href="/forms" disabled={!penaltyType}>
          Submit Claim
          <ChevronRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
