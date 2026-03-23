"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  Badge,
  SectionHeader,
} from "@/components/ui/shell";
import { defaultProfile, formatCurrency } from "@/lib/store";
import {
  User,
  DollarSign,
  FileText,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Sample review data
const reviewData = {
  income: {
    wages: 62000,
    selfEmployment: 0,
    interest: 340,
    dividends: 0,
    other: 0,
    total: 62340,
  },
  deductions: {
    type: "Standard",
    amount: 13850,
  },
  credits: {
    total: 0,
    items: [] as string[],
  },
  taxableIncome: 48490,
  estimatedTax: 6217,
  withheld: 7800,
  refundOrOwed: 1583, // positive = refund
};

export default function ReviewPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const isRefund = reviewData.refundOrOwed > 0;

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      router.push("/tax-filing/success");
    }, 2000);
  };

  return (
    <AppShell hideNav>
      <ScreenHeader
        title={`Review - ${year}`}
        backHref={`/tax-filing/${year}/credits`}
      />
      <ProgressBar value={90} steps="Step 7 of 8" label="Review" />

      <ScreenContent className="space-y-4 pt-3">
        {/* Personal Info Summary */}
        <div className="animate-fade-up delay-1">
          <SectionHeader title="Personal Information" />
          <Card className="!p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-navy-light flex items-center justify-center">
                <User size={16} className="text-navy" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">
                  {defaultProfile.firstName} {defaultProfile.lastName}
                </p>
                <p className="text-[0.625rem] text-muted">
                  SSN: {defaultProfile.ssn} &middot;{" "}
                  {defaultProfile.filingStatus}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted">
              {defaultProfile.address.street},{" "}
              {defaultProfile.address.city},{" "}
              {defaultProfile.address.state}{" "}
              {defaultProfile.address.zip}
            </div>
          </Card>
        </div>

        {/* Income Summary */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Income" accent="green" />
          <Card className="!p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Wages & Salaries</span>
                <span className="font-semibold text-navy">
                  {formatCurrency(reviewData.income.wages)}
                </span>
              </div>
              {reviewData.income.interest > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Interest Income</span>
                  <span className="font-semibold text-navy">
                    {formatCurrency(reviewData.income.interest)}
                  </span>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
                <span className="font-bold text-navy">Total Income</span>
                <span className="font-black text-navy">
                  {formatCurrency(reviewData.income.total)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Deductions Summary */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Deductions" />
          <Card className="!p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-navy">
                  {reviewData.deductions.type} Deduction
                </p>
                <p className="text-[0.625rem] text-muted">
                  Single filer standard deduction
                </p>
              </div>
              <span className="text-sm font-bold text-navy">
                -{formatCurrency(reviewData.deductions.amount)}
              </span>
            </div>
          </Card>
        </div>

        {/* Tax Calculation */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="Tax Calculation" accent="red" />
          <Card className="!p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Taxable Income</span>
                <span className="font-semibold text-navy">
                  {formatCurrency(reviewData.taxableIncome)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Estimated Tax</span>
                <span className="font-semibold text-navy">
                  {formatCurrency(reviewData.estimatedTax)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Federal Tax Withheld</span>
                <span className="font-semibold text-brand-green">
                  -{formatCurrency(reviewData.withheld)}
                </span>
              </div>
              {reviewData.credits.total > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Tax Credits</span>
                  <span className="font-semibold text-brand-green">
                    -{formatCurrency(reviewData.credits.total)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Result Card */}
        <div className="animate-fade-up delay-5">
          <Card
            className={`text-center ${
              isRefund ? "!bg-brand-green-light border-brand-green/20" : "!bg-brand-red-light border-brand-red/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {isRefund ? (
                <CheckCircle2 size={20} className="text-brand-green" />
              ) : (
                <AlertCircle size={20} className="text-brand-red" />
              )}
              <p className="text-sm font-bold text-navy">
                {isRefund ? "Estimated Refund" : "Estimated Tax Owed"}
              </p>
            </div>
            <p
              className={`text-3xl font-black ${
                isRefund ? "text-brand-green" : "text-brand-red"
              }`}
            >
              {formatCurrency(Math.abs(reviewData.refundOrOwed))}
            </p>
            <p className="text-xs text-muted mt-1">
              {isRefund
                ? "You overpaid your taxes this year."
                : "Additional tax owed for this year."}
            </p>
          </Card>
        </div>

        {/* Submit */}
        <div className="animate-fade-up delay-6 space-y-3 pb-2">
          <Button
            onClick={handleSubmit}
            loading={submitting}
          >
            <FileText size={16} />
            Submit Filing
          </Button>
          <p className="text-[0.5625rem] text-center text-placeholder leading-relaxed">
            By submitting, you certify that the information provided is true
            and correct to the best of your knowledge.
          </p>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
