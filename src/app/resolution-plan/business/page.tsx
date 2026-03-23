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
  SectionHeader,
  StickyFooter,
  ContextCard,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  FileText,
  Building2,
  Sparkles,
  Phone,
  AlertTriangle,
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
    title: "Complete Form 656 (Business)",
    done: false,
    expandable: true,
    detail:
      "The business OIC uses a separate Form 656 for each business entity. If you have personal and business tax debt, you may need to submit separate offers for each.",
  },
  {
    title: "Complete Form 433-B(OIC)",
    done: false,
    expandable: true,
    detail:
      "Form 433-B(OIC) is the business version of the financial disclosure form. It requires detailed information about business assets, income, expenses, and accounts receivable.",
  },
  {
    title: "Gather business financial documents",
    done: false,
    expandable: true,
    detail:
      "Collect: 6 months of business bank statements, profit & loss statements, balance sheets, accounts receivable aging report, accounts payable report, business asset valuations, lease agreements, and business tax returns for past 3 years.",
  },
  {
    title: "Resolve payroll tax compliance",
    done: false,
    expandable: true,
    detail:
      "All employment tax returns (Forms 941, 940) must be current. Any outstanding payroll tax deposits must be made current. The IRS will not accept a business OIC if the business is not in current compliance.",
  },
  {
    title: "Pay application fee and initial payment",
    done: false,
    expandable: true,
    detail:
      "The same $205 application fee and 20% initial payment (for lump sum offers) apply to business OICs. Each separate offer requires its own fee.",
  },
  {
    title: "Submit to IRS",
    done: false,
    expandable: true,
    detail:
      "Business OICs are processed by the same IRS OIC unit. Include all forms, financial documentation, and payments in a single package for each entity.",
  },
];

const businessConsiderations = [
  "Business must be current on all payroll tax deposits",
  "All required business tax returns must be filed",
  "Active businesses may face different RCP calculations",
  "Business assets are valued at quick-sale value (typically 80% of FMV)",
  "Accounts receivable are included in the RCP calculation",
  "The IRS may require the business to maintain certain cash reserves",
];

export default function BusinessResolutionPlanPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <AppShell>
      <ScreenHeader title="Business Resolution Plan" backHref="/resolve" />
      <ProgressBar
        value={progressPercent}
        steps={`${completedCount} of ${steps.length}`}
        label="Progress"
      />

      <ScreenContent className="space-y-4 pt-3">
        {/* Banner */}
        <div className="animate-fade-up">
          <Card className="!bg-navy-light !border-transparent">
            <div className="flex items-start gap-3">
              <Building2 size={18} className="text-navy shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-navy">Business Tax Resolution</p>
                <p className="text-xs text-navy/70 mt-1 leading-relaxed">
                  Business tax debt resolution has additional requirements compared
                  to individual cases. This plan accounts for those differences.
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

        {/* Business-Specific Considerations */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-800" />
              <p className="text-sm font-bold text-navy">Business-Specific Requirements</p>
            </div>
            <div className="space-y-2.5">
              {businessConsiderations.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </ScreenContent>
      <StickyFooter>
        <div className="space-y-3">
          <Button href="/forms">
            <FileText size={16} />
            Begin Form 656 (Business)
          </Button>
          <Button href="/expert" variant="outline">
            <Phone size={16} />
            Talk to Expert First
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
