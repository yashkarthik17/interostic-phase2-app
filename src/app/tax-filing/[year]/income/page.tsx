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
  FormInput,
} from "@/components/ui/shell";
import { Check } from "lucide-react";

interface IncomeType {
  id: string;
  label: string;
  description: string;
  fields: { label: string; placeholder: string; key: string }[];
}

const incomeTypes: IncomeType[] = [
  {
    id: "w2",
    label: "W-2 (Employment)",
    description: "Wages, salaries, tips from an employer",
    fields: [
      { label: "Employer Name", placeholder: "e.g., Acme Corp", key: "employer" },
      { label: "Wages (Box 1)", placeholder: "$0.00", key: "wages" },
      { label: "Federal Tax Withheld (Box 2)", placeholder: "$0.00", key: "withheld" },
    ],
  },
  {
    id: "1099nec",
    label: "1099-NEC (Self-Employment)",
    description: "Freelance or independent contractor income",
    fields: [
      { label: "Payer Name", placeholder: "e.g., Client LLC", key: "payer" },
      { label: "Nonemployee Compensation", placeholder: "$0.00", key: "amount" },
    ],
  },
  {
    id: "1099int",
    label: "1099-INT (Interest)",
    description: "Interest income from banks or investments",
    fields: [
      { label: "Institution Name", placeholder: "e.g., Chase Bank", key: "institution" },
      { label: "Interest Income", placeholder: "$0.00", key: "interest" },
    ],
  },
  {
    id: "1099div",
    label: "1099-DIV (Dividends)",
    description: "Dividend income from stocks or mutual funds",
    fields: [
      { label: "Brokerage / Fund Name", placeholder: "e.g., Vanguard", key: "fund" },
      { label: "Ordinary Dividends", placeholder: "$0.00", key: "dividends" },
    ],
  },
  {
    id: "1099g",
    label: "1099-G (Government Payments)",
    description: "Unemployment compensation, tax refunds",
    fields: [
      { label: "Agency", placeholder: "e.g., State Unemployment", key: "agency" },
      { label: "Amount", placeholder: "$0.00", key: "amount" },
    ],
  },
  {
    id: "other",
    label: "Other Income",
    description: "Rental, alimony, gambling, jury duty, etc.",
    fields: [
      { label: "Description", placeholder: "e.g., Rental income", key: "desc" },
      { label: "Amount", placeholder: "$0.00", key: "amount" },
    ],
  },
];

export default function IncomePage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set(["w2"]));
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});

  const toggleIncome = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateField = (typeId: string, fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [typeId]: { ...(prev[typeId] || {}), [fieldKey]: value },
    }));
  };

  return (
    <AppShell hideNav>
      <ScreenHeader
        title={`Income - ${year}`}
        backHref={`/tax-filing/${year}`}
      />
      <ProgressBar value={40} steps="Step 4 of 8" label="Income" />

      <ScreenContent className="space-y-4 pt-3">
        <div className="animate-fade-up delay-1">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1">
            Select Your Income Sources
          </p>
          <p className="text-xs text-muted mb-3">
            Check all that apply for tax year {year}.
          </p>
        </div>

        {/* Income Type Checkboxes */}
        <div className="space-y-2">
          {incomeTypes.map((type, i) => {
            const isSelected = selected.has(type.id);
            return (
              <div
                key={type.id}
                className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
              >
                {/* Checkbox row */}
                <button
                  onClick={() => toggleIncome(type.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200 text-left ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light/50"
                      : "border-border bg-white hover:border-border-strong"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-brand-green border-brand-green"
                        : "border-border-strong bg-white"
                    }`}
                  >
                    {isSelected && (
                      <Check size={13} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy">
                      {type.label}
                    </p>
                    <p className="text-[0.625rem] text-muted">{type.description}</p>
                  </div>
                </button>

                {/* Entry form when selected */}
                {isSelected && (
                  <Card className="mt-2 !p-4 border-brand-green/20 bg-brand-green-light/20">
                    <div className="space-y-3">
                      {type.fields.map((field) => (
                        <FormInput
                          key={field.key}
                          label={field.label}
                          placeholder={field.placeholder}
                          value={formData[type.id]?.[field.key] || ""}
                          onChange={(v) =>
                            updateField(type.id, field.key, v)
                          }
                        />
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue */}
        <div className="animate-fade-up delay-6 pt-2 pb-2">
          <Button
            onClick={() => router.push(`/tax-filing/${year}/deductions`)}
          >
            Continue to Deductions
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
