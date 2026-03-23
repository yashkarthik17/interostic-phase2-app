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
  ToggleSwitch,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { formatCurrency } from "@/lib/store";
import { DollarSign, Info } from "lucide-react";

interface DeductionField {
  id: string;
  label: string;
  placeholder: string;
}

const itemizedFields: DeductionField[] = [
  { id: "mortgage", label: "Mortgage Interest", placeholder: "$0.00" },
  { id: "stateTax", label: "State & Local Taxes (SALT)", placeholder: "$0.00" },
  { id: "charitable", label: "Charitable Contributions", placeholder: "$0.00" },
  { id: "medical", label: "Medical Expenses (above 7.5% AGI)", placeholder: "$0.00" },
];

const standardDeductionAmount = 13850;

export default function DeductionsPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const [useItemized, setUseItemized] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const updateValue = (id: string, v: string) => {
    setValues((prev) => ({ ...prev, [id]: v }));
  };

  const parseAmount = (v: string) => {
    const num = parseFloat(v.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const itemizedTotal = itemizedFields.reduce(
    (sum, f) => sum + parseAmount(values[f.id] || "0"),
    0
  );

  const totalDeduction = useItemized ? itemizedTotal : standardDeductionAmount;

  return (
    <AppShell hideNav>
      <ScreenHeader
        title={`Deductions - ${year}`}
        backHref={`/tax-filing/${year}/income`}
      />
      <ProgressBar value={55} steps="Step 5 of 8" label="Deductions" />

      <ScreenContent className="space-y-4 pt-3">
        {/* Standard vs Itemized Toggle */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-navy">Deduction Type</p>
                <p className="text-xs text-muted">
                  {useItemized
                    ? "Itemize your deductions"
                    : `Standard deduction: ${formatCurrency(standardDeductionAmount)}`}
                </p>
              </div>
              <ToggleSwitch
                checked={useItemized}
                onChange={setUseItemized}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUseItemized(false)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  !useItemized
                    ? "bg-navy text-white"
                    : "bg-surface-alt text-muted"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setUseItemized(true)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  useItemized
                    ? "bg-navy text-white"
                    : "bg-surface-alt text-muted"
                }`}
              >
                Itemized
              </button>
            </div>
          </Card>
        </div>

        {/* Standard info or itemized fields */}
        {!useItemized ? (
          <div className="animate-fade-up delay-2">
            <ContextCard icon={Info} title="Standard Deduction" variant="blue">
              For {year}, the standard deduction for single filers is{" "}
              {formatCurrency(standardDeductionAmount)}. This is automatically
              applied. Choose itemized only if your deductions exceed this
              amount.
            </ContextCard>
          </div>
        ) : (
          <div className="animate-fade-up delay-2 space-y-3">
            <SectionHeader title="Itemized Deductions" accent="green" />
            {itemizedFields.map((field) => (
              <Card key={field.id} className="!p-4">
                <FormInput
                  label={field.label}
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(v) => updateValue(field.id, v)}
                />
              </Card>
            ))}
          </div>
        )}

        {/* Running Total */}
        <div className="animate-fade-up delay-3">
          <Card className="!bg-brand-green-light border-brand-green/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                <DollarSign size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                  Total Deduction
                </p>
                <p className="text-xl font-black text-brand-green">
                  {formatCurrency(totalDeduction)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Continue */}
        <div className="animate-fade-up delay-4 pt-2 pb-2">
          <Button
            onClick={() => router.push(`/tax-filing/${year}/credits`)}
          >
            Continue to Credits
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
