"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronDown, ChevronUp, FileText, Edit3, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button, FormInput, ToggleSwitch, SectionHeader, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore, formatCurrency, defaultAnalysis } from "@/lib/store";

interface YearEntry {
  year: string;
  amount: number;
  source: "transcript" | "manual";
  penalty: number;
  interest: number;
  tax: number;
  sfr: boolean;
}

function defaultYears(): YearEntry[] {
  return defaultAnalysis.yearsOwed.map((y) => ({
    year: y.year,
    amount: y.amount,
    source: y.source as "transcript" | "manual",
    penalty: Math.round(y.amount * 0.18),
    interest: Math.round(y.amount * 0.12),
    tax: Math.round(y.amount * 0.7),
    sfr: false,
  }));
}

export default function CaseInfoPage() {
  const router = useRouter();
  const [years, setYears] = useState<YearEntry[]>(defaultYears);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [addingYear, setAddingYear] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<YearEntry[]>("case_years", []);
    if (saved.length > 0) setYears(saved);
    setMounted(true);
  }, []);

  const saveYears = (updated: YearEntry[]) => {
    setYears(updated);
    setStore("case_years", updated);
    const total = updated.reduce((s, y) => s + y.amount, 0);
    const analysis = getStore("analysis", {});
    setStore("analysis", {
      ...analysis,
      totalDebt: total,
      yearsOwed: updated.map((y) => ({ year: y.year, amount: y.amount, source: y.source })),
    });
  };

  const addYear = () => {
    if (!newYear || !newAmount) return;
    const amt = parseFloat(newAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(amt)) return;
    const entry: YearEntry = {
      year: newYear,
      amount: amt,
      source: "manual",
      penalty: Math.round(amt * 0.18),
      interest: Math.round(amt * 0.12),
      tax: Math.round(amt * 0.7),
      sfr: false,
    };
    saveYears([...years, entry].sort((a, b) => a.year.localeCompare(b.year)));
    setAddingYear(false);
    setNewYear("");
    setNewAmount("");
  };

  const removeYear = (year: string) => {
    saveYears(years.filter((y) => y.year !== year));
  };

  const toggleSfr = (year: string) => {
    saveYears(years.map((y) => (y.year === year ? { ...y, sfr: !y.sfr } : y)));
  };

  const totalDebt = years.reduce((s, y) => s + y.amount, 0);

  if (!mounted) return null;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Tax Debt Inventory" backHref="/analysis/transcript" />
      <ProgressBar value={55} label="Step 3 of 6" steps="Case Info" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          <div className="animate-fade-up">
            <SectionHeader title="Year-by-Year Breakdown" subtitle="Review and confirm the tax debt for each year." accent="blue" />
          </div>

          {/* Total Debt - Prominent with red accent */}
          <div className="animate-fade-up delay-1">
            <div className="bg-gradient-to-r from-brand-red to-brand-red/90 rounded-2xl p-5 shadow-[var(--shadow-lift)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Total Debt</span>
                  <p className="text-3xl font-black text-white mt-0.5">{formatCurrency(totalDebt)}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-white/70 uppercase">Across</span>
                  <p className="text-xl font-black text-white">{years.length} year{years.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Year Cards */}
          {years.map((y, i) => (
            <div key={y.year} className={`animate-fade-up delay-${Math.min(i + 2, 6)}`}>
              <Card className="!p-0 overflow-hidden">
                <button
                  onClick={() => setExpandedYear(expandedYear === y.year ? null : y.year)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-navy-light to-surface-alt rounded-xl shrink-0 shadow-[var(--shadow-card)]">
                    <span className="text-sm font-black text-navy">{y.year}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-navy">{formatCurrency(y.amount)}</span>
                      <Badge variant={y.source === "transcript" ? "primary" : "warning"}>
                        {y.source === "transcript" ? (
                          <><FileText size={10} /> Transcript</>
                        ) : (
                          <><Edit3 size={10} /> Manual</>
                        )}
                      </Badge>
                    </div>
                    {y.sfr && (
                      <span className="text-[10px] font-semibold text-warning mt-0.5 flex items-center gap-1">
                        <AlertCircle size={10} /> Substitute for Return (SFR)
                      </span>
                    )}
                  </div>
                  {expandedYear === y.year ? (
                    <ChevronUp size={16} className="text-muted shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-muted shrink-0" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedYear === y.year ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-border px-4 py-3 bg-surface-alt space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 shadow-[var(--shadow-card)]">
                        <span className="text-[10px] font-semibold text-muted uppercase block mb-0.5">Tax</span>
                        <span className="text-sm font-bold text-navy">{formatCurrency(y.tax)}</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-[var(--shadow-card)]">
                        <span className="text-[10px] font-semibold text-muted uppercase block mb-0.5">Penalty</span>
                        <span className="text-sm font-bold text-danger">{formatCurrency(y.penalty)}</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-[var(--shadow-card)]">
                        <span className="text-[10px] font-semibold text-muted uppercase block mb-0.5">Interest</span>
                        <span className="text-sm font-bold text-warning">{formatCurrency(y.interest)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-navy">Substitute for Return (SFR)</span>
                        <ToggleSwitch checked={y.sfr} onChange={() => toggleSfr(y.year)} />
                      </div>
                      <button onClick={() => removeYear(y.year)} className="flex items-center gap-1 text-xs font-semibold text-danger hover:text-danger/80 transition-colors">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {/* Add Year */}
          {addingYear ? (
            <Card className="animate-fade-up">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy">Add Tax Year</h3>
                <div className="grid grid-cols-2 gap-3">
                  <FormInput label="Tax Year" placeholder="2020" value={newYear} onChange={setNewYear} />
                  <FormInput label="Amount Owed" placeholder="$10,000" value={newAmount} onChange={setNewAmount} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setAddingYear(false)} full={false}>
                    Cancel
                  </Button>
                  <Button onClick={addYear} full={false}>
                    Add Year
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <button
              onClick={() => setAddingYear(true)}
              className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border-strong rounded-2xl text-sm font-bold text-muted hover:text-navy hover:border-navy transition-all duration-200"
            >
              <Plus size={16} /> Add Another Year
            </button>
          )}

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <Button onClick={() => router.push("/analysis/assets")}>
          Continue <ArrowRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
