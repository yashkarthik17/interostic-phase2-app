"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  StepIndicator,
  Card,
  Button,
  Badge,
  IconCircle,
  SectionHeader,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  TrendingDown,
  AlertCircle,
  DollarSign,
  ArrowRight,
  MessageCircle,
  Star,
} from "lucide-react";

const changes = [
  {
    label: "Offer amount adjusted",
    from: "$8,500",
    to: "$9,200",
    reason:
      "Slightly increased to improve acceptance probability based on recent IRS acceptance data for your region.",
  },
  {
    label: "Added penalty abatement",
    from: "Not included",
    to: "Included",
    reason:
      "Your 3-year clean compliance history qualifies you for First-Time Penalty Abatement, saving an additional ~$2,100.",
  },
];

export default function HandoffRecommendationPage() {
  return (
    <AppShell hideNav>
      <ScreenHeader title="Expert Handoff" backHref="/handoff/review" />
      <StepIndicator steps={["Documents", "Review", "Expert", "Accept"]} current={2} />
      <ScreenContent className="space-y-5 pt-3">
        {/* Expert Card */}
        <div className="animate-fade-up delay-1">
          <Card className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-navy text-white font-bold text-sm shrink-0">
              MC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">Michael Chen, EA</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Star size={11} className="text-warning fill-warning" />
                <span className="text-xs font-bold text-navy">4.9</span>
                <span className="text-xs text-placeholder">|</span>
                <span className="text-xs font-semibold text-muted">
                  15 years exp
                </span>
              </div>
            </div>
            <Badge variant="success">Reviewed</Badge>
          </Card>
        </div>

        {/* Recommended Strategy */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Recommended Strategy
          </p>
          <Card className="bg-navy">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-brand-green" />
              <p className="text-xs font-bold text-brand-green uppercase tracking-wider">
                Expert Recommendation
              </p>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Offer in Compromise + Penalty Abatement
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              A dual strategy: submit an OIC to settle your core debt, combined
              with First-Time Penalty Abatement to remove additional penalties.
              This maximizes your total savings.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  Debt
                </p>
                <p className="text-sm font-black text-white">$47,250</p>
              </div>
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  You Pay
                </p>
                <p className="text-sm font-black text-brand-green">$9,200</p>
              </div>
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  Savings
                </p>
                <p className="text-sm font-black text-brand-green">81%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Changes Suggested */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Changes From Original Plan
          </p>
          <div className="space-y-3">
            {changes.map((change) => (
              <Card key={change.label}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={14} className="text-warning" />
                  <p className="text-sm font-bold text-navy">{change.label}</p>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 bg-surface-alt rounded-lg text-xs font-bold text-muted">
                    {change.from}
                  </span>
                  <ArrowRight size={14} className="text-placeholder" />
                  <span className="px-2.5 py-1 bg-brand-green-light rounded-lg text-xs font-bold text-brand-green">
                    {change.to}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {change.reason}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="animate-fade-up delay-4">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              Why This Strategy
            </p>
            <div className="space-y-2.5">
              {[
                "Higher OIC acceptance rate with adjusted offer amount",
                "Additional $2,100 savings through penalty abatement",
                "Clean compliance record strengthens both applications",
                "Dual approach gives IRS multiple reasons to grant relief",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="text-brand-green shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="animate-fade-up delay-5 space-y-3 pb-2">
          <Button href="/handoff/acceptance">
            Accept Recommendation
            <ChevronRight size={16} />
          </Button>
          <Button href="/expert/chat" variant="outline">
            <MessageCircle size={16} />
            Discuss With Expert
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
