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
} from "@/components/ui/shell";
import { formatCurrency } from "@/lib/store";
import { Check, DollarSign, Zap } from "lucide-react";

interface TaxCredit {
  id: string;
  name: string;
  shortName: string;
  description: string;
  estimatedAmount: number;
}

const availableCredits: TaxCredit[] = [
  {
    id: "ctc",
    name: "Child Tax Credit",
    shortName: "CTC",
    description: "Up to $2,000 per qualifying child under 17.",
    estimatedAmount: 2000,
  },
  {
    id: "eitc",
    name: "Earned Income Tax Credit",
    shortName: "EITC",
    description: "For low to moderate income workers and families.",
    estimatedAmount: 3995,
  },
  {
    id: "education",
    name: "Education Credits",
    shortName: "EDU",
    description: "American Opportunity or Lifetime Learning Credit.",
    estimatedAmount: 2500,
  },
  {
    id: "ev",
    name: "Electric Vehicle Credit",
    shortName: "EV",
    description: "For purchasing a new or used qualified EV.",
    estimatedAmount: 7500,
  },
  {
    id: "energy",
    name: "Energy Efficient Home Credit",
    shortName: "ENERGY",
    description: "For qualifying home improvements like solar panels.",
    estimatedAmount: 3200,
  },
];

export default function CreditsPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleCredit = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalCredits = availableCredits
    .filter((c) => selected.has(c.id))
    .reduce((sum, c) => sum + c.estimatedAmount, 0);

  return (
    <AppShell hideNav>
      <ScreenHeader
        title={`Credits - ${year}`}
        backHref={`/tax-filing/${year}/deductions`}
      />
      <ProgressBar value={70} steps="Step 6 of 8" label="Credits" />

      <ScreenContent className="space-y-4 pt-3">
        <div className="animate-fade-up delay-1">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1">
            Available Tax Credits
          </p>
          <p className="text-xs text-muted mb-3">
            Select the credits you may be eligible for in {year}.
          </p>
        </div>

        {/* Credit checklist */}
        <div className="space-y-2">
          {availableCredits.map((credit, i) => {
            const isSelected = selected.has(credit.id);
            return (
              <div
                key={credit.id}
                className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
              >
                <button
                  onClick={() => toggleCredit(credit.id)}
                  className={`w-full text-left px-4 py-4 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light/50"
                      : "border-border bg-white hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? "bg-brand-green border-brand-green"
                          : "border-border-strong bg-white"
                      }`}
                    >
                      {isSelected && (
                        <Check
                          size={13}
                          className="text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-navy">
                          {credit.name}
                        </p>
                        <span className="text-xs font-bold text-brand-green">
                          {formatCurrency(credit.estimatedAmount)}
                        </span>
                      </div>
                      <p className="text-[0.625rem] text-muted leading-relaxed">
                        {credit.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Estimated Total */}
        <div className="animate-fade-up delay-6">
          <Card className="!bg-navy">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Zap size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold text-white/50 uppercase tracking-wider">
                  Estimated Credits
                </p>
                <p className="text-xl font-black text-brand-green">
                  {formatCurrency(totalCredits)}
                </p>
              </div>
              {selected.size > 0 && (
                <span className="ml-auto text-[0.625rem] font-semibold text-white/40">
                  {selected.size} credit{selected.size > 1 ? "s" : ""} selected
                </span>
              )}
            </div>
          </Card>
        </div>

        {/* Continue */}
        <div className="pt-2 pb-2">
          <Button
            onClick={() => router.push(`/tax-filing/${year}/review`)}
          >
            Continue to Review
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
