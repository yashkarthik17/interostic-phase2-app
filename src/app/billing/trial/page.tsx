"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import {
  Clock,
  Check,
  Zap,
  Shield,
  BarChart3,
  MessageCircle,
  FileText,
  HeadphonesIcon,
} from "lucide-react";

const trialFeatures = [
  { icon: BarChart3, label: "Full tax analysis & reports", color: "blue" as const },
  { icon: Shield, label: "Expert consultation access", color: "green" as const },
  { icon: MessageCircle, label: "Unlimited AI chat", color: "violet" as const },
  { icon: FileText, label: "IRS form generation", color: "teal" as const },
  { icon: HeadphonesIcon, label: "Priority support", color: "navy" as const },
];

export default function TrialPage() {
  const daysRemaining = 12;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Free Trial" backHref="/billing" />

      <ScreenContent className="space-y-5 pt-2">
        {/* Days Counter */}
        <div className="animate-fade-up delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-center">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-green/10" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock size={16} className="text-brand-green" />
                <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                  Trial Active
                </span>
              </div>

              <div className="text-6xl font-black text-white mb-2">{daysRemaining}</div>
              <p className="text-base font-semibold text-white/60">days remaining</p>

              {/* Progress bar */}
              <div className="mt-5 mx-auto max-w-[200px]">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-green rounded-full transition-all duration-600"
                    style={{ width: `${((14 - daysRemaining) / 14) * 100}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-white/30 mt-1.5">
                  {14 - daysRemaining} of 14 days used
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Features */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            What&apos;s Included in Your Trial
          </p>
          <Card>
            <div className="space-y-3.5">
              {trialFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-green-light">
                    <Check size={14} className="text-brand-green" />
                  </div>
                  <span className="text-sm font-medium text-navy">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upgrade CTA */}
        <div className="animate-fade-up delay-3">
          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green-light mx-auto mb-3">
              <Zap size={22} className="text-brand-green" />
            </div>
            <h3 className="text-base font-bold text-navy mb-1">Ready to upgrade?</h3>
            <p className="text-sm text-muted mb-4">
              Keep all your Pro features without interruption.
            </p>
            <Button href="/billing/plans">
              Upgrade Now
            </Button>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
