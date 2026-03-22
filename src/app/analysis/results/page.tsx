"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowRight, BarChart3, Phone, ChevronRight, TrendingDown, Shield } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { getStore, formatCurrency, formatPercent, sampleResolutions } from "@/lib/store";

export default function ResultsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [totalDebt, setTotalDebt] = useState(47250);

  useEffect(() => {
    const analysis = getStore<{ totalDebt?: number }>("analysis", {});
    if (analysis.totalDebt) setTotalDebt(analysis.totalDebt);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Sort by savings (highest first)
  const sorted = [...sampleResolutions].sort((a, b) => b.savingsPercent - a.savingsPercent);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Your Resolution Options" backHref="/analysis/financials" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          {/* Debt Summary */}
          <div className="animate-fade-up">
            <Card className="!bg-navy">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl shrink-0">
                  <TrendingDown size={22} className="text-brand-green" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-white/50 uppercase">Total Tax Debt</span>
                  <p className="text-2xl font-black text-white">{formatCurrency(totalDebt)}</p>
                </div>
                <Badge variant="success">4 Options</Badge>
              </div>
            </Card>
          </div>

          {/* Resolution Cards */}
          {sorted.map((option, i) => (
            <div key={option.id} className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}>
              <Card
                onClick={() => router.push(`/analysis/results/${option.id}`)}
                className={option.recommended ? "!border-brand-green ring-1 ring-brand-green/20" : ""}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-navy">{option.name}</h3>
                      {option.recommended && (
                        <Badge variant="success">
                          <Star size={10} /> RECOMMENDED
                        </Badge>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-muted mt-1 shrink-0" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4">
                    {option.savingsPercent > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted">Save</span>
                        <span className="text-sm font-black text-brand-green">{formatPercent(option.savingsPercent)}</span>
                      </div>
                    )}
                    {option.monthlyPayment > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted">Monthly</span>
                        <span className="text-sm font-bold text-navy">{formatCurrency(option.monthlyPayment)}/mo</span>
                      </div>
                    ) : option.id === "oic" ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted">Pay</span>
                        <span className="text-sm font-bold text-navy">{formatCurrency(totalDebt - option.savings)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted">Monthly</span>
                        <span className="text-sm font-bold text-navy">{formatCurrency(0)}/mo</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted">Duration</span>
                      <span className="text-sm font-bold text-navy">{option.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted leading-relaxed">{option.description}</p>

                  {/* Savings bar */}
                  {option.savingsPercent > 0 && (
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold mb-1">
                        <span className="text-muted">Savings</span>
                        <span className="text-brand-green">{formatCurrency(option.savings)}</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-green rounded-full transition-all duration-1000"
                          style={{ width: `${option.savingsPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="animate-fade-up delay-5 space-y-3 pt-2 pb-4">
            <Button onClick={() => router.push("/analysis/compare")}>
              <BarChart3 size={16} /> Compare Options
            </Button>
            <Button variant="secondary" onClick={() => router.push("/expert")}>
              <Phone size={16} /> Talk to Expert
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
