"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Badge,
  Button,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  FileText,
  DollarSign,
  Send,
  Sparkles,
  Phone,
} from "lucide-react";
import { formatCurrency } from "@/lib/store";

interface Step {
  title: string;
  done: boolean;
  expandable: boolean;
  detail?: string;
}

const steps: Step[] = [
  {
    title: "Complete Form 656",
    done: true,
    expandable: false,
  },
  {
    title: "Complete Form 433-A(OIC)",
    done: true,
    expandable: false,
  },
  {
    title: "Gather supporting documents",
    done: false,
    expandable: true,
    detail:
      "Collect the following: last 3 months of bank statements, last 2 pay stubs, current property tax statement, vehicle registration, monthly bills (rent/mortgage, utilities, insurance, healthcare). We will upload and organize these in your Document Center.",
  },
  {
    title: "Pay $205 application fee",
    done: false,
    expandable: true,
    detail:
      "The OIC application fee is $205 and must be submitted with your offer. If you qualify for Low Income Certification, this fee is waived. Based on your income, you may be eligible for the waiver.",
  },
  {
    title: "Submit 20% initial payment ($1,700)",
    done: false,
    expandable: true,
    detail:
      "For a Lump Sum offer, you must include 20% of your total offer amount with the application. For your $8,500 offer, that is $1,700. This payment is non-refundable if the IRS accepts your offer.",
  },
  {
    title: "Submit to IRS",
    done: false,
    expandable: true,
    detail:
      "Mail your completed package to the IRS OIC unit. The package includes: Form 656, Form 433-A(OIC), supporting documents, $205 application fee, and $1,700 initial payment. We will prepare the mailing package for you.",
  },
];

export default function ResolutionPlanPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <AppShell>
      <ScreenHeader title="Resolution Plan" backHref="/resolve" />
      <ProgressBar
        value={progressPercent}
        steps={`${completedCount} of ${steps.length}`}
        label="Progress"
      />

      <ScreenContent className="space-y-4 pt-3">
        {/* Recommendation Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-brand-green-light !border-transparent">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-brand-green shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-brand-green">Recommended: OIC Lump Sum</p>
                  <Badge variant="success">Best Option</Badge>
                </div>
                <p className="text-xs text-brand-green/80 leading-relaxed">
                  Settle your {formatCurrency(47250)} tax debt for just{" "}
                  {formatCurrency(8500)} -- saving you {formatCurrency(38750)} (82%)
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Checklist */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-4">Action Checklist</p>
            <div className="space-y-0">
              {steps.map((step, i) => {
                const isExpanded = expandedStep === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => {
                        if (step.expandable && !step.done) {
                          setExpandedStep(isExpanded ? null : i);
                        }
                      }}
                      className={`flex items-start gap-3 w-full text-left py-3 ${
                        i < steps.length - 1 ? "border-b border-border" : ""
                      } ${step.expandable && !step.done ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {step.done ? (
                        <CheckCircle2 size={20} className="text-brand-green shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={20} className="text-border-strong shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold ${
                            step.done ? "text-muted line-through" : "text-navy"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                      {step.expandable && !step.done && (
                        <ChevronDown
                          size={16}
                          className={`text-muted transition-transform duration-200 shrink-0 mt-1 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {isExpanded && step.detail && (
                      <div className="ml-8 pb-3 border-b border-border">
                        <p className="text-xs text-muted leading-relaxed">{step.detail}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-sm font-bold text-navy mb-3">Offer Summary</p>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Total Debt</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(47250)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Offer Amount</span>
                <span className="text-sm font-bold text-brand-green">{formatCurrency(8500)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Application Fee</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(205)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Initial Payment (20%)</span>
                <span className="text-sm font-semibold text-navy">{formatCurrency(1700)}</span>
              </div>
              <div className="border-t border-border pt-2.5 flex justify-between items-center">
                <span className="text-sm font-bold text-navy">Total Savings</span>
                <span className="text-lg font-black text-brand-green">{formatCurrency(38750)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-3 space-y-3">
          <Button href="/forms">
            <FileText size={16} />
            Begin Form 656
          </Button>
          <Button href="/expert" variant="outline">
            <Phone size={16} />
            Talk to Expert First
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
