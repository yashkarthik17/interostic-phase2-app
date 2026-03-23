"use client";
import { useParams } from "next/navigation";
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
import { XCircle, AlertTriangle, ChevronRight, Info, RefreshCw } from "lucide-react";

const failureData: Record<
  string,
  {
    title: string;
    status: string;
    statusVariant: "danger" | "warning";
    whatHappened: string;
    reasons: string[];
    nextSteps: string[];
    alternatives: { label: string; href: string }[];
  }
> = {
  "ia-default": {
    title: "Installment Agreement Default",
    status: "Defaulted",
    statusVariant: "danger",
    whatHappened:
      "Your installment agreement has been terminated due to non-compliance. The IRS may now resume full collection activity including levies and liens.",
    reasons: [
      "Missed one or more monthly payments",
      "Failed to file a required tax return",
      "Incurred a new tax liability",
      "Provided inaccurate financial information",
      "Did not respond to an IRS modification request",
    ],
    nextSteps: [
      "Contact the IRS immediately to discuss reinstatement",
      "Pay any missed payments as soon as possible",
      "File any delinquent returns before requesting reinstatement",
      "Request a Collection Due Process hearing if you receive a Final Notice",
      "Consider switching to a different resolution strategy if reinstatement is denied",
    ],
    alternatives: [
      { label: "Request Reinstatement", href: "/resolve" },
      { label: "Offer in Compromise", href: "/resolve" },
      { label: "Currently Not Collectible", href: "/relief/cnc" },
    ],
  },
  "oic-rejection": {
    title: "Offer in Compromise Rejected",
    status: "Rejected",
    statusVariant: "danger",
    whatHappened:
      "The IRS has rejected your Offer in Compromise. This means they believe you can pay more than the amount you offered, or you did not meet the eligibility requirements.",
    reasons: [
      "Your Reasonable Collection Potential (RCP) exceeds your offer amount",
      "Incomplete or inaccurate financial disclosure",
      "Not current on all filing requirements",
      "Accrued new tax debt during the OIC process",
      "Failed to make required estimated tax payments",
      "The IRS believes the full amount is collectible",
    ],
    nextSteps: [
      "Appeal the rejection within 30 days to the IRS Independent Office of Appeals",
      "Review the rejection letter for the specific reason",
      "Gather additional documentation to support a lower RCP",
      "Consider submitting a new OIC with updated financial information",
      "Explore alternative resolution options",
    ],
    alternatives: [
      { label: "File an Appeal", href: "/resolve" },
      { label: "Installment Agreement", href: "/resolve" },
      { label: "Currently Not Collectible", href: "/relief/cnc" },
    ],
  },
  "cnc-removal": {
    title: "CNC Status Removed",
    status: "Removed",
    statusVariant: "warning",
    whatHappened:
      "The IRS has removed your Currently Not Collectible status and may resume collection activity. This typically happens when your financial situation improves.",
    reasons: [
      "Your income increased significantly based on recent tax returns",
      "You acquired assets or property",
      "You failed to file a required tax return",
      "Periodic IRS review determined you can now pay",
      "Your financial situation changed materially",
    ],
    nextSteps: [
      "Review your current financial situation honestly",
      "Determine if you now qualify for an installment agreement or OIC",
      "If your finances have not actually improved, request re-evaluation for CNC",
      "File any delinquent returns immediately",
      "Contact a tax professional to assess your options",
    ],
    alternatives: [
      { label: "Request CNC Re-evaluation", href: "/relief/cnc" },
      { label: "Installment Agreement", href: "/resolve" },
      { label: "Offer in Compromise", href: "/resolve" },
    ],
  },
  "penalty-denial": {
    title: "Penalty Abatement Denied",
    status: "Denied",
    statusVariant: "danger",
    whatHappened:
      "Your request for penalty abatement has been denied. The IRS determined that you did not meet the requirements for First-Time Abatement or Reasonable Cause.",
    reasons: [
      "Prior penalties within the 3-year lookback period (FTA)",
      "Not all required returns were filed at time of request",
      "Reasonable cause explanation was insufficient or unsupported",
      "Documentation did not adequately support your claim",
      "The penalty type was not eligible for abatement",
    ],
    nextSteps: [
      "Review the denial letter for the specific reason",
      "Appeal to the IRS Independent Office of Appeals within 30 days",
      "Provide additional documentation to support reasonable cause",
      "Consider requesting abatement under a different provision",
      "Include the penalty in an OIC or installment agreement if appeal fails",
    ],
    alternatives: [
      { label: "File an Appeal", href: "/resolve" },
      { label: "Try Different Strategy", href: "/penalty" },
      { label: "Include in OIC", href: "/resolve" },
    ],
  },
};

const defaultData = failureData["ia-default"];

export default function FailurePage() {
  const params = useParams();
  const type = (params.type as string) || "ia-default";
  const data = failureData[type] || defaultData;

  return (
    <AppShell>
      <ScreenHeader title={data.title} backHref="/cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Status Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-danger-light !border-transparent">
            <div className="flex items-center gap-3">
              <XCircle size={20} className="text-danger" />
              <div>
                <p className="text-sm font-bold text-danger">{data.status}</p>
                <p className="text-xs text-danger/80 mt-0.5">
                  Action required to protect your interests
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* What Happened */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">What Happened</p>
            <p className="text-sm text-navy leading-relaxed">{data.whatHappened}</p>
          </Card>
        </div>

        {/* Reasons */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-brand-red" />
              <p className="text-sm font-bold text-navy">Possible Reasons</p>
            </div>
            <div className="space-y-2.5">
              {data.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={14} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{reason}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="animate-fade-up delay-3">
          <Card>
            <p className="text-sm font-bold text-navy mb-3">What to Do Next</p>
            <div className="space-y-3">
              {data.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-light text-navy text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-navy">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alternative Options */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Alternative Options
          </p>
          <div className="space-y-2.5">
            {data.alternatives.map((alt, i) => (
              <Button key={i} href={alt.href} variant={i === 0 ? "primary" : "outline"}>
                <RefreshCw size={16} />
                {alt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-5">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              A setback does not mean the end. Many taxpayers successfully resolve
              their cases after an initial denial or default. The key is to act
              quickly and explore all available options.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
