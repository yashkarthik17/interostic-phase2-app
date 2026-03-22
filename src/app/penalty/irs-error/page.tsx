"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
} from "@/components/ui/shell";
import { XCircle, ChevronDown, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

const errorTypes = [
  {
    title: "Erroneous Written Advice (IRC 6404(f))",
    description:
      "If you relied on incorrect written advice from the IRS and were penalized as a result, the IRS is required to remove the penalty. This is one of the strongest bases for penalty removal.",
    requirements: [
      "You made a written request to the IRS for advice",
      "You provided accurate and complete information",
      "You reasonably relied on the IRS written response",
      "The penalty resulted from following that advice",
    ],
  },
  {
    title: "IRS Ministerial Act Errors (IRC 6404(e))",
    description:
      "When an IRS employee makes an error or causes an unreasonable delay in performing a ministerial or managerial act, the resulting interest and penalties can be abated.",
    requirements: [
      "The error was made by an IRS employee",
      "The act was ministerial (procedural, not judgment-based)",
      "There was an unreasonable error or delay",
      "You were not at fault for the error",
    ],
  },
  {
    title: "IRS Processing Delays",
    description:
      "Sometimes IRS internal backlogs or system issues cause late posting of payments, misapplied credits, or delayed processing that trigger penalties.",
    requirements: [
      "Payment was timely but posted late by the IRS",
      "Credit was misapplied to wrong tax period",
      "IRS system error generated incorrect penalty",
      "Processing backlog caused missed deadline attribution",
    ],
  },
  {
    title: "Incorrect IRS Notice",
    description:
      "If the IRS sent a notice with incorrect information, wrong amounts, or to the wrong address, and that led to penalties, you can request removal.",
    requirements: [
      "The notice contained factual errors",
      "The notice was sent to an incorrect address",
      "The penalty was based on incorrect IRS records",
      "You can demonstrate the correct information",
    ],
  },
];

export default function IrsErrorPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="IRS Error Removal" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          When penalties result from IRS mistakes, you have the right to have them
          removed. The IRS makes errors more often than you might think -- and the
          law provides clear remedies.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-danger-light !border-transparent">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-danger shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-danger">Documentation is Key</p>
                <p className="text-xs text-danger/80 mt-1 leading-relaxed">
                  Keep copies of all IRS correspondence, payment confirmations, and
                  any written advice you received. This evidence is critical for
                  proving an IRS error.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          {errorTypes.map((err, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <XCircle size={14} className="text-brand-red shrink-0" />
                    <p className="text-sm font-bold text-navy">{err.title}</p>
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
                    <p className="text-sm text-navy leading-relaxed">{err.description}</p>
                    <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                      What You Need to Show
                    </p>
                    <div className="space-y-2">
                      {err.requirements.map((req, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm text-navy">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} className="text-muted" />
              <p className="text-sm font-bold text-navy">How to Request Removal</p>
            </div>
            <div className="space-y-2.5">
              {[
                "Call the IRS at 800-829-1040 and explain the error",
                "Write a letter referencing the specific notice and error",
                "Include supporting documentation (copies, not originals)",
                "Request abatement under IRC 6404(e) or 6404(f) as applicable",
                "If denied, you can appeal through the IRS Independent Office of Appeals",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy-light text-navy text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
