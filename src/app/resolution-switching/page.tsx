"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { ArrowRightLeft, CheckCircle2, AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/store";

interface ResOption {
  id: string;
  name: string;
  shortName: string;
  savings: number;
  savingsPercent: number;
  monthly: number;
  duration: string;
  csedImpact: string;
}

const currentStrategy: ResOption = {
  id: "oic",
  name: "Offer in Compromise",
  shortName: "OIC",
  savings: 38750,
  savingsPercent: 82,
  monthly: 0,
  duration: "Lump Sum ($8,500)",
  csedImpact: "Tolls CSED while pending",
};

const alternatives: ResOption[] = [
  {
    id: "ia",
    name: "Installment Agreement",
    shortName: "IA",
    savings: 0,
    savingsPercent: 0,
    monthly: 657,
    duration: "72 months",
    csedImpact: "Does not toll CSED",
  },
  {
    id: "cnc",
    name: "Currently Not Collectible",
    shortName: "CNC",
    savings: 47250,
    savingsPercent: 100,
    monthly: 0,
    duration: "Until CSED expires",
    csedImpact: "Does not toll CSED",
  },
  {
    id: "ppia",
    name: "Partial Pay Installment Agreement",
    shortName: "PPIA",
    savings: 18900,
    savingsPercent: 40,
    monthly: 394,
    duration: "72 months",
    csedImpact: "Does not toll CSED",
  },
];

export default function ResolutionSwitchingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedAlt = alternatives.find((a) => a.id === selected);

  return (
    <AppShell>
      <ScreenHeader title="Switch Strategy" backHref="/resolve" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Current Strategy */}
        <div className="animate-fade-up delay-1">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Current Strategy
          </p>
          <Card className="border-brand-green !p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-green" />
                <span className="text-sm font-bold text-navy">{currentStrategy.name}</span>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase">Savings</p>
                <p className="text-sm font-bold text-brand-green">{currentStrategy.savingsPercent}%</p>
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase">Payment</p>
                <p className="text-sm font-bold text-navy">{currentStrategy.duration}</p>
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase">CSED</p>
                <p className="text-[0.625rem] font-semibold text-warning">{currentStrategy.csedImpact}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Alternative Options */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Alternative Options
          </p>
          <div className="space-y-2.5">
            {alternatives.map((alt) => (
              <button
                key={alt.id}
                onClick={() => setSelected(alt.id)}
                className="w-full text-left"
              >
                <Card className={`!p-4 ${selected === alt.id ? "border-brand-blue" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navy">{alt.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-navy-light text-[0.625rem] font-black text-navy">
                      {alt.shortName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[0.625rem] font-semibold text-muted uppercase">Savings</p>
                      <p className="text-sm font-bold text-navy">{alt.savingsPercent}%</p>
                    </div>
                    <div>
                      <p className="text-[0.625rem] font-semibold text-muted uppercase">Monthly</p>
                      <p className="text-sm font-bold text-navy">
                        {alt.monthly > 0 ? formatCurrency(alt.monthly) : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.625rem] font-semibold text-muted uppercase">Duration</p>
                      <p className="text-[0.6875rem] font-semibold text-navy">{alt.duration}</p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison with Current */}
        {selectedAlt && (
          <div className="animate-fade-up delay-3">
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
              Impact Assessment
            </p>
            <Card className="!p-4">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRightLeft size={16} className="text-brand-blue" />
                <span className="text-sm font-bold text-navy">
                  {currentStrategy.shortName} vs {selectedAlt.shortName}
                </span>
              </div>

              <div className="space-y-3">
                {/* Savings comparison */}
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-xs text-muted">Savings Difference</span>
                  <span className={`text-xs font-bold ${selectedAlt.savingsPercent > currentStrategy.savingsPercent ? "text-brand-green" : selectedAlt.savingsPercent < currentStrategy.savingsPercent ? "text-brand-red" : "text-navy"}`}>
                    {selectedAlt.savingsPercent > currentStrategy.savingsPercent ? "+" : ""}
                    {selectedAlt.savingsPercent - currentStrategy.savingsPercent}%
                  </span>
                </div>

                {/* Monthly payment */}
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-xs text-muted">Monthly Payment</span>
                  <span className="text-xs font-bold text-navy">
                    {selectedAlt.monthly > 0 ? formatCurrency(selectedAlt.monthly) + "/mo" : "No monthly payment"}
                  </span>
                </div>

                {/* CSED Impact */}
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-xs text-muted">CSED Impact</span>
                  <span className="text-xs font-bold text-navy">{selectedAlt.csedImpact}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-muted">Timeline</span>
                  <span className="text-xs font-bold text-navy">{selectedAlt.duration}</span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-2.5 mt-4 p-3 bg-warning-light rounded-xl">
                <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Switching strategies may impact your current case progress. Any pending submissions for your current strategy will need to be withdrawn.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* CTA */}
        <div className="animate-fade-up delay-4 space-y-3 pt-2">
          <Button variant="primary" disabled={!selected}>
            <ArrowRightLeft size={16} />
            Switch Strategy
          </Button>
          <Button variant="ghost" href="/resolve">
            Keep Current Strategy
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
