"use client";
import { AppShell, ScreenHeader, ScreenContent, Card } from "@/components/ui/shell";
import { Calculator, DollarSign, Home, TrendingUp, BarChart3, BookOpen } from "lucide-react";

export default function MethodologyPage() {
  return (
    <AppShell>
      <ScreenHeader title="Calculation Methodology" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Intro */}
        <div className="animate-fade-up delay-1">
          <div className="bg-navy rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={16} className="text-brand-green" />
              <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                How We Calculate
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Our calculations follow the IRS Internal Revenue Manual (IRM) guidelines. Here is exactly how we determine your Reasonable Collection Potential and recommended offer amount.
            </p>
          </div>
        </div>

        {/* RCP Calculation */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light shrink-0">
                <BarChart3 size={18} className="text-brand-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Reasonable Collection Potential (RCP)</p>
                <p className="text-xs text-muted">IRM 5.8.4.3</p>
              </div>
            </div>
            <div className="bg-surface-alt rounded-xl p-4 mb-3">
              <p className="text-xs font-mono text-navy font-bold text-center">
                RCP = Asset Equity + Future Income
              </p>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              The RCP represents the minimum amount the IRS expects to collect from you. It is the sum of your net realizable asset equity and your future income over the remaining collection period. This is the starting point for any Offer in Compromise amount.
            </p>
          </Card>
        </div>

        {/* MDI Calculation */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light shrink-0">
                <DollarSign size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Monthly Disposable Income (MDI)</p>
                <p className="text-xs text-muted">IRM 5.8.4.4</p>
              </div>
            </div>
            <div className="bg-surface-alt rounded-xl p-4 mb-3">
              <p className="text-xs font-mono text-navy font-bold text-center">
                MDI = Gross Monthly Income - Allowable Expenses
              </p>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-3">
              Monthly Disposable Income is calculated by subtracting IRS-allowable living expenses from your total gross monthly income. The IRS uses National Standards and local standards to determine what constitutes an allowable expense.
            </p>
            <div className="space-y-2">
              <p className="text-[0.625rem] font-bold text-muted uppercase tracking-wider">Allowable Expense Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {["Food & Clothing", "Housing & Utilities", "Transportation", "Health Care", "Taxes (current)", "Court-ordered payments"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2 px-3 py-2 bg-surface-alt rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    <span className="text-[0.6875rem] font-medium text-navy">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* IRS National Standards */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info-light shrink-0">
                <BookOpen size={18} className="text-info" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">IRS National Standards</p>
                <p className="text-xs text-muted">Updated annually</p>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-3">
              The IRS publishes standard amounts for basic living expenses. These caps determine the maximum deduction allowed regardless of your actual spending.
            </p>
            <div className="bg-surface-alt rounded-xl divide-y divide-border overflow-hidden">
              {[
                { cat: "Food, Clothing & Misc.", single: "$785", family4: "$1,694" },
                { cat: "Out-of-Pocket Health", under65: "$75", over65: "$153" },
                { cat: "Housing (varies by county)", note: "County-specific", note2: "ALE tables" },
                { cat: "Transportation (ownership)", one: "$588", two: "$1,176" },
                { cat: "Transportation (operating)", one: "$282", two: "$564" },
              ].map((row) => (
                <div key={row.cat} className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-xs font-medium text-navy">{row.cat}</span>
                  <div className="text-right">
                    {row.single && (
                      <span className="text-xs font-bold text-navy">{row.single} - {row.family4}</span>
                    )}
                    {row.under65 && (
                      <span className="text-xs font-bold text-navy">{row.under65} - {row.over65}</span>
                    )}
                    {row.note && (
                      <span className="text-xs font-semibold text-muted">{row.note}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Asset Equity Calculations */}
        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-light shrink-0">
                <Home size={18} className="text-violet" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Asset Equity Calculations</p>
                <p className="text-xs text-muted">Net Realizable Equity (NRE)</p>
              </div>
            </div>
            <div className="bg-surface-alt rounded-xl p-4 mb-3">
              <p className="text-xs font-mono text-navy font-bold text-center">
                NRE = (FMV x Quick Sale Value%) - Encumbrances
              </p>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-3">
              The IRS calculates Net Realizable Equity using a quick sale value, typically 80% of Fair Market Value (FMV), minus any outstanding loans or liens.
            </p>
            <div className="space-y-2">
              {[
                { asset: "Real Estate", qsv: "80% of FMV", note: "Minus mortgage balance" },
                { asset: "Vehicles", qsv: "80% of FMV", note: "Minus loan balance" },
                { asset: "Bank Accounts", qsv: "100% of balance", note: "Minus $1,000 buffer" },
                { asset: "Retirement", qsv: "80% of balance", note: "Minus taxes & penalties" },
                { asset: "Life Insurance", qsv: "100% of CSV", note: "Cash surrender value only" },
              ].map((item) => (
                <div key={item.asset} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="text-xs font-semibold text-navy">{item.asset}</span>
                    <span className="text-[0.625rem] text-placeholder ml-2">{item.note}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-blue">{item.qsv}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Future Income */}
        <div className="animate-fade-up delay-6">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light shrink-0">
                <TrendingUp size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Future Income Calculations</p>
                <p className="text-xs text-muted">Based on offer type</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-surface-alt rounded-xl p-4">
                <p className="text-xs font-bold text-navy mb-1">Lump Sum Offer (Cash)</p>
                <p className="text-xs font-mono text-brand-blue font-bold mb-1">Future Income = MDI x 12 months</p>
                <p className="text-[0.625rem] text-muted">Must pay within 5 months of acceptance. 20% deposit required with application.</p>
              </div>
              <div className="bg-surface-alt rounded-xl p-4">
                <p className="text-xs font-bold text-navy mb-1">Periodic Payment Offer</p>
                <p className="text-xs font-mono text-brand-blue font-bold mb-1">Future Income = MDI x 24 months</p>
                <p className="text-[0.625rem] text-muted">Payments spread over 6-24 months. Must make monthly payments during IRS review.</p>
              </div>
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
