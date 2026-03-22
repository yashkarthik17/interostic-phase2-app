"use client";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { Lightbulb, Clock, DollarSign, TrendingDown, Shield, Zap, Star, ChevronRight } from "lucide-react";

const strategies = [
  {
    id: "oic-lump",
    name: "Lump Sum OIC",
    match: "Best Match",
    recommended: true,
    timing: "6-12 months to process",
    costBenefit: "Pay $8,500 to settle $47,250 (82% savings)",
    description: "Submit a one-time offer to settle your entire debt. Best when you have limited assets and low disposable income.",
    pros: ["Largest potential savings", "Debt fully resolved", "Fresh start"],
    cons: ["Long processing time", "Tolls CSED", "20% deposit required"],
  },
  {
    id: "oic-periodic",
    name: "Periodic Payment OIC",
    match: "Good Fit",
    recommended: false,
    timing: "6-12 months to process",
    costBenefit: "Pay $12,200 over 24 months (74% savings)",
    description: "Spread your OIC payment over 6-24 months while the offer is being reviewed. Higher total but more manageable.",
    pros: ["No large lump sum needed", "Significant savings", "Payments during review"],
    cons: ["Higher total than lump sum", "Must make payments during review", "Tolls CSED"],
  },
  {
    id: "ia-streamlined",
    name: "Streamlined IA",
    match: "Backup Plan",
    recommended: false,
    timing: "2-4 weeks to set up",
    costBenefit: "Pay $657/month for 72 months (full balance)",
    description: "Guaranteed approval for balances under $50K. No financial disclosure required. Predictable monthly payments.",
    pros: ["Fast approval", "No financials needed", "Does not toll CSED"],
    cons: ["No debt reduction", "6-year commitment", "Interest continues"],
  },
  {
    id: "cnc",
    name: "Currently Not Collectible",
    match: "If Hardship",
    recommended: false,
    timing: "1-4 weeks",
    costBenefit: "No payments while in hardship status",
    description: "Pause all IRS collection. The 10-year clock keeps running. Best when you temporarily cannot afford any payments.",
    pros: ["No payments required", "CSED keeps running", "Quick to obtain"],
    cons: ["Debt not resolved", "Lien may remain", "Annual review possible"],
  },
];

const timingConsiderations = [
  { icon: Clock, label: "Tax filing season (Jan-Apr) means slower IRS processing" },
  { icon: DollarSign, label: "Submit OIC when income is lowest for better RCP" },
  { icon: TrendingDown, label: "Asset values fluctuate -- time your submission strategically" },
  { icon: Shield, label: "File before CSED tolling events to preserve your timeline" },
];

export default function StrategicPlaysPage() {
  return (
    <AppShell>
      <ScreenHeader title="Strategic Plays" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Expert Recommendation Callout */}
        <div className="animate-fade-up delay-1">
          <div className="bg-brand-green-light border border-brand-green/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green/10 shrink-0">
                <Star size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-green-dark mb-1">Expert Recommendation</p>
                <p className="text-xs text-brand-green-dark/80 leading-relaxed">
                  Based on your financial profile, a <strong>Lump Sum Offer in Compromise</strong> offers the highest potential savings. Your RCP of $8,500 is well below your total debt of $47,250.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Strategies */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Available Strategies
          </p>
          <div className="space-y-3">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className={`!p-4 ${strategy.recommended ? "border-brand-green" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className={strategy.recommended ? "text-brand-green" : "text-muted"} />
                    <span className="text-sm font-bold text-navy">{strategy.name}</span>
                  </div>
                  <Badge variant={strategy.recommended ? "success" : "primary"}>{strategy.match}</Badge>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-3">{strategy.description}</p>

                {/* Cost-Benefit */}
                <div className="bg-surface-alt rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <DollarSign size={13} className="text-brand-blue" />
                    <span className="text-xs font-bold text-navy">Cost-Benefit</span>
                  </div>
                  <p className="text-xs text-muted">{strategy.costBenefit}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock size={11} className="text-placeholder" />
                    <span className="text-[0.625rem] text-placeholder">{strategy.timing}</span>
                  </div>
                </div>

                {/* Pros / Cons */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[0.625rem] font-bold text-brand-green uppercase mb-1.5">Pros</p>
                    {strategy.pros.map((pro) => (
                      <p key={pro} className="text-xs text-muted mb-1 flex items-start gap-1.5">
                        <span className="text-brand-green mt-0.5 shrink-0">+</span> {pro}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-bold text-brand-red uppercase mb-1.5">Cons</p>
                    {strategy.cons.map((con) => (
                      <p key={con} className="text-xs text-muted mb-1 flex items-start gap-1.5">
                        <span className="text-brand-red mt-0.5 shrink-0">-</span> {con}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Timing Considerations */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Timing Considerations
          </p>
          <Card className="!p-0 divide-y divide-border">
            {timingConsiderations.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy-light shrink-0">
                  <item.icon size={14} className="text-navy" />
                </div>
                <p className="text-xs font-medium text-muted leading-snug">{item.label}</p>
              </div>
            ))}
          </Card>
        </div>

        <div className="animate-fade-up delay-4 pt-2">
          <Button variant="primary" href="/resolve">
            <Lightbulb size={16} />
            Choose Strategy
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
