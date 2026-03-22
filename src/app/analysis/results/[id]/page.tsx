"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle, XCircle, ArrowLeft, Phone, Clock, DollarSign, Shield, AlertTriangle, FileText, Calendar, TrendingUp } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { getStore, formatCurrency, sampleResolutions } from "@/lib/store";

const detailContent: Record<string, {
  sections: { title: string; icon: React.ElementType; items: { label: string; value: string; highlight?: boolean }[] }[];
  eligibility: { label: string; met: boolean }[];
  keyFacts: string[];
}> = {
  oic: {
    sections: [
      {
        title: "Offer Details",
        icon: DollarSign,
        items: [
          { label: "Offer Amount", value: "$8,500", highlight: true },
          { label: "RCP Calculation", value: "Based on assets + future income" },
          { label: "Lump Sum Option", value: "20% upfront ($1,700), rest in 5 payments" },
          { label: "Periodic Option", value: "$354/month for 24 months" },
        ],
      },
      {
        title: "RCP Breakdown",
        icon: TrendingUp,
        items: [
          { label: "Net Asset Equity", value: "$3,200" },
          { label: "Future Income (12 mo)", value: "$5,300" },
          { label: "Total RCP", value: "$8,500", highlight: true },
        ],
      },
    ],
    eligibility: [
      { label: "All tax returns filed", met: true },
      { label: "Current on estimated payments", met: true },
      { label: "Not in bankruptcy", met: true },
      { label: "Offer exceeds RCP", met: true },
      { label: "5-year compliance commitment", met: true },
    ],
    keyFacts: [
      "Application fee: $205 (waived for low-income)",
      "Processing time: 6-12 months",
      "Collection paused during review",
      "Must stay compliant for 5 years after acceptance",
      "Accepted offers become public record",
    ],
  },
  ia: {
    sections: [
      {
        title: "Payment Options",
        icon: Calendar,
        items: [
          { label: "Streamlined DDIA", value: "$657/month for 72 months", highlight: true },
          { label: "Guaranteed IA", value: "Available if debt < $10,000" },
          { label: "Partial Pay IA", value: "$520/month (reduced based on expenses)" },
          { label: "Total Payments", value: "$47,304 (full balance + interest)" },
        ],
      },
      {
        title: "Agreement Terms",
        icon: FileText,
        items: [
          { label: "Setup Fee", value: "$31 (Direct Debit) / $130 (Standard)" },
          { label: "Interest Rate", value: "Continues to accrue" },
          { label: "Penalty Accrual", value: "Reduced to 0.25%/month" },
          { label: "Duration", value: "Up to 72 months" },
        ],
      },
    ],
    eligibility: [
      { label: "All tax returns filed", met: true },
      { label: "Debt under $50,000 (Streamlined)", met: true },
      { label: "Can full pay within 72 months", met: true },
      { label: "No prior IA default", met: true },
    ],
    keyFacts: [
      "Liens may still be filed",
      "Payments via Direct Debit save on fees",
      "Can request payment amount changes if income changes",
      "Default triggers full collection activity",
      "One-time skip payment allowed per year",
    ],
  },
  cnc: {
    sections: [
      {
        title: "How CNC Works",
        icon: Shield,
        items: [
          { label: "Monthly Payment", value: "$0/month", highlight: true },
          { label: "Status", value: "Collection activity paused" },
          { label: "Duration", value: "Until CSED or financial change" },
          { label: "CSED Date", value: "Approx. April 2033" },
        ],
      },
      {
        title: "CSED Implications",
        icon: Clock,
        items: [
          { label: "Collection Statute", value: "10 years from assessment" },
          { label: "Time Remaining", value: "~7 years" },
          { label: "If CSED expires", value: "Debt is legally uncollectible" },
          { label: "Extensions", value: "OIC filing, IA request, or bankruptcy pauses CSED" },
        ],
      },
    ],
    eligibility: [
      { label: "Unable to pay (MDI is $0 or negative)", met: true },
      { label: "Expenses within IRS standards", met: true },
      { label: "Reviewed annually by IRS", met: true },
    ],
    keyFacts: [
      "IRS may still file a federal tax lien",
      "Tax refunds will be applied to debt",
      "IRS reviews financial status periodically",
      "Income increase may trigger re-evaluation",
      "Penalties and interest continue to accrue",
    ],
  },
  penalty: {
    sections: [
      {
        title: "Penalty Relief Options",
        icon: DollarSign,
        items: [
          { label: "First-Time Abatement", value: "Remove $3,800 in penalties", highlight: true },
          { label: "Reasonable Cause", value: "Remove $1,500 in additional penalties" },
          { label: "Total Relief", value: "$5,300", highlight: true },
        ],
      },
      {
        title: "Penalty Breakdown",
        icon: AlertTriangle,
        items: [
          { label: "Failure to File", value: "$2,100 (5%/month, max 25%)" },
          { label: "Failure to Pay", value: "$1,800 (0.5%/month)" },
          { label: "Estimated Tax Penalty", value: "$900" },
          { label: "Accuracy Penalty", value: "$500" },
        ],
      },
    ],
    eligibility: [
      { label: "Clean compliance history (3 years)", met: true },
      { label: "All returns currently filed", met: true },
      { label: "All taxes currently paid or in agreement", met: true },
      { label: "Reasonable cause documentation", met: true },
    ],
    keyFacts: [
      "FTA is the easiest and most common relief method",
      "Can be combined with other resolution strategies",
      "Reasonable cause requires documented hardship",
      "Interest on abated penalties is also removed",
      "Can be requested by phone for FTA",
    ],
  },
};

export default function ResolutionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const option = sampleResolutions.find((r) => r.id === id);
  const detail = detailContent[id];

  if (!option || !detail) {
    return (
      <AppShell hideNav>
        <ScreenHeader title="Not Found" backHref="/analysis/results" />
        <ScreenContent>
          <p className="text-sm text-muted pt-8 text-center">Resolution option not found.</p>
        </ScreenContent>
      </AppShell>
    );
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title={option.name} backHref="/analysis/results" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          {/* Hero Card */}
          <div className="animate-fade-up">
            <Card className={`!bg-navy ${option.recommended ? "ring-1 ring-brand-green/30" : ""}`}>
              <div className="text-center space-y-2">
                {option.recommended && (
                  <Badge variant="success">Recommended Option</Badge>
                )}
                <p className="text-3xl font-black text-white">
                  {option.id === "oic"
                    ? formatCurrency(47250 - option.savings)
                    : option.monthlyPayment > 0
                    ? `${formatCurrency(option.monthlyPayment)}/mo`
                    : "$0/mo"}
                </p>
                <p className="text-xs text-white/60">
                  {option.savingsPercent > 0 && `Save ${option.savingsPercent}% (${formatCurrency(option.savings)})`}
                  {option.id === "cnc" && "No payments until financial situation changes"}
                </p>
              </div>
            </Card>
          </div>

          {/* Detail Sections */}
          {detail.sections.map((section, si) => (
            <div key={si} className={`animate-fade-up delay-${Math.min(si + 1, 6)}`}>
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-navy-light rounded-lg">
                    <section.icon size={16} className="text-navy" />
                  </div>
                  <h3 className="text-sm font-bold text-navy">{section.title}</h3>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, ii) => (
                    <div key={ii} className="flex items-center justify-between">
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className={`text-sm font-bold ${item.highlight ? "text-brand-green" : "text-navy"}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {/* Eligibility Checklist */}
          <div className="animate-fade-up delay-3">
            <Card>
              <h3 className="text-sm font-bold text-navy mb-3">Eligibility Checklist</h3>
              <div className="space-y-2.5">
                {detail.eligibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.met ? (
                      <CheckCircle size={16} className="text-brand-green shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-danger shrink-0" />
                    )}
                    <span className="text-xs font-medium text-navy">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Key Facts */}
          <div className="animate-fade-up delay-4">
            <Card>
              <h3 className="text-sm font-bold text-navy mb-3">Key Facts</h3>
              <div className="space-y-2">
                {detail.keyFacts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-navy mt-1.5 shrink-0" />
                    <span className="text-xs text-muted leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="animate-fade-up delay-5 space-y-3 pt-2 pb-4">
            <Button onClick={() => router.push("/expert")}>
              <Phone size={16} /> Discuss with Expert
            </Button>
            <Button variant="outline" onClick={() => router.push("/analysis/results")}>
              <ArrowLeft size={16} /> Back to All Options
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
