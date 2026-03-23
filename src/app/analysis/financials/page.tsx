"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, TrendingDown, ArrowRight, Info, Calculator } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button, SectionHeader, ContextCard, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore, formatCurrency } from "@/lib/store";

interface FinancialRow {
  key: string;
  label: string;
  allowable?: number; // IRS National Standard
}

const incomeRows: FinancialRow[] = [
  { key: "wages", label: "Wages / Salary" },
  { key: "selfEmployment", label: "Self-Employment" },
  { key: "retirement", label: "Retirement / Social Security" },
  { key: "otherIncome", label: "Other Income" },
];

const expenseRows: FinancialRow[] = [
  { key: "housing", label: "Housing & Utilities", allowable: 2003 },
  { key: "utilities", label: "Utilities (if separate)", allowable: 394 },
  { key: "food", label: "Food & Clothing", allowable: 785 },
  { key: "transportation", label: "Transportation", allowable: 588 },
  { key: "healthcare", label: "Health Care", allowable: 75 },
  { key: "insurance", label: "Health Insurance", allowable: 462 },
  { key: "taxes", label: "Current Tax Payments" },
  { key: "courtOrdered", label: "Court-Ordered Payments" },
];

function AmountInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [text, setText] = useState(value > 0 ? value.toString() : "");

  useEffect(() => {
    setText(value > 0 ? value.toString() : "");
  }, [value]);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">$</span>
      <input
        type="text"
        inputMode="numeric"
        value={text}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          setText(raw);
          onChange(raw ? parseInt(raw, 10) : 0);
        }}
        placeholder="0"
        className="w-full pl-7 pr-3 py-2.5 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-bold text-navy text-right placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all"
      />
    </div>
  );
}

export default function FinancialsPage() {
  const router = useRouter();
  const [income, setIncome] = useState<Record<string, number>>({});
  const [expenses, setExpenses] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedIncome = getStore<Record<string, number>>("fin_income", {
      wages: 5200,
      selfEmployment: 0,
      retirement: 0,
      otherIncome: 300,
    });
    const savedExpenses = getStore<Record<string, number>>("fin_expenses", {
      housing: 1800,
      utilities: 250,
      food: 650,
      transportation: 450,
      healthcare: 50,
      insurance: 380,
      taxes: 400,
      courtOrdered: 0,
    });
    setIncome(savedIncome);
    setExpenses(savedExpenses);
    setMounted(true);
  }, []);

  const updateIncome = (key: string, val: number) => {
    const updated = { ...income, [key]: val };
    setIncome(updated);
    setStore("fin_income", updated);
    const analysis = getStore("analysis", {});
    setStore("analysis", { ...analysis, income: updated });
  };

  const updateExpense = (key: string, val: number) => {
    const updated = { ...expenses, [key]: val };
    setExpenses(updated);
    setStore("fin_expenses", updated);
    const analysis = getStore("analysis", {});
    setStore("analysis", { ...analysis, expenses: updated });
  };

  const totalIncome = Object.values(income).reduce((s, v) => s + v, 0);
  const totalExpenses = Object.values(expenses).reduce((s, v) => s + v, 0);
  const mdi = totalIncome - totalExpenses;

  if (!mounted) return null;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Income & Expenses" backHref="/analysis/assets" />
      <ProgressBar value={85} label="Step 5 of 6" steps="Financials" />

      <ScreenContent>
        <div className="space-y-5 pt-2">
          {/* Monthly Income */}
          <div className="animate-fade-up">
            <SectionHeader title="Monthly Income" subtitle="Your total household income before deductions." accent="green" />
            <Card>
              <div className="space-y-4">
                {incomeRows.map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-navy flex-1 min-w-0">{row.label}</label>
                    <div className="w-[130px]">
                      <AmountInput value={income[row.key] || 0} onChange={(v) => updateIncome(row.key, v)} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-bold text-navy">Total Income</span>
                  <span className="text-base font-black text-brand-green">{formatCurrency(totalIncome)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Monthly Expenses */}
          <div className="animate-fade-up delay-2">
            <SectionHeader title="Monthly Expenses" subtitle="The IRS compares your expenses to their National Standards." accent="red" />
            <Card>
              <div className="space-y-4">
                {/* Header for allowable column */}
                <div className="flex items-center justify-end gap-2 mb-1">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-muted">
                    <Info size={10} /> IRS Allowable
                  </div>
                </div>

                {expenseRows.map((row) => (
                  <div key={row.key}>
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-navy flex-1 min-w-0">{row.label}</label>
                      <div className="w-[130px]">
                        <AmountInput value={expenses[row.key] || 0} onChange={(v) => updateExpense(row.key, v)} />
                      </div>
                    </div>
                    {row.allowable && (expenses[row.key] || 0) > 0 && (
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            (expenses[row.key] || 0) <= row.allowable
                              ? "bg-brand-green-light text-brand-green"
                              : "bg-warning-light text-warning"
                          }`}
                        >
                          {(expenses[row.key] || 0) <= row.allowable ? (
                            <>Within IRS limit ({formatCurrency(row.allowable)})</>
                          ) : (
                            <>IRS allows {formatCurrency(row.allowable)} (+{formatCurrency((expenses[row.key] || 0) - row.allowable)} over)</>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm font-bold text-navy">Total Expenses</span>
                  <span className="text-base font-black text-danger">{formatCurrency(totalExpenses)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* MDI Card - Prominent */}
          <div className="animate-fade-up delay-4">
            <ContextCard
              icon={Calculator}
              title="Monthly Disposable Income (MDI)"
              variant={mdi > 0 ? "green" : "blue"}
            >
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className={`text-2xl font-black ${mdi > 0 ? "text-brand-green" : "text-brand-blue"}`}>
                  {formatCurrency(Math.abs(mdi))}
                  {mdi < 0 && <span className="text-xs font-semibold text-muted ml-1">(deficit)</span>}
                </span>
                <Badge variant={mdi > 0 ? "success" : mdi === 0 ? "warning" : "info"}>
                  {mdi > 0 ? "Positive" : mdi === 0 ? "Break Even" : "Negative"}
                </Badge>
              </div>
              <p>
                {mdi > 0
                  ? "This amount factors into the IRS calculation for your Reasonable Collection Potential (RCP) and monthly payment amounts."
                  : "A negative MDI may qualify you for Currently Not Collectible (CNC) status or a reduced Offer in Compromise."}
              </p>
            </ContextCard>
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <Button onClick={() => router.push("/analysis/processing")}>
          Analyze My Options <ArrowRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
