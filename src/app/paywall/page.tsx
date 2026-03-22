"use client";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";
import { Crown, Check, Lock, Zap, Shield, BarChart3, FileText, MessageCircle } from "lucide-react";

const proFeatures = [
  { icon: BarChart3, label: "Unlimited tax analysis & resolution strategies" },
  { icon: FileText, label: "Complete IRS form preparation & generation" },
  { icon: MessageCircle, label: "AI-powered tax assistant with unlimited queries" },
  { icon: Shield, label: "Expert handoff to licensed professionals" },
  { icon: Zap, label: "Real-time transcript monitoring & alerts" },
  { icon: Crown, label: "Priority support & case management" },
];

export default function PaywallPage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center text-center pt-8 pb-4">
        {/* Lock icon */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-navy-light mb-5">
            <Lock size={32} className="text-navy" />
          </div>
        </div>

        {/* Header */}
        <div className="animate-fade-up delay-2 mb-6">
          <h1 className="text-xl font-bold text-navy mb-2">Unlock Full Access</h1>
          <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
            This feature requires a Pro subscription. Upgrade to get the full power of BlastTax.
          </p>
        </div>

        {/* What's included */}
        <div className="animate-fade-up delay-3 w-full text-left mb-6">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
            What&apos;s included in Pro
          </p>
          <div className="space-y-3">
            {proFeatures.map((feat) => (
              <div key={feat.label} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-green-light shrink-0">
                  <feat.icon size={15} className="text-brand-green" />
                </div>
                <span className="text-sm font-medium text-navy">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="animate-fade-up delay-4 w-full bg-surface-alt border border-border rounded-2xl p-5 mb-6">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-3xl font-black text-navy">$49</span>
            <span className="text-sm font-semibold text-muted">/month</span>
          </div>
          <p className="text-xs text-muted">Cancel anytime. No long-term contracts.</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-brand-green" />
              <span className="text-xs font-semibold text-muted">7-day free trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-brand-green" />
              <span className="text-xs font-semibold text-muted">Money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-5 w-full space-y-3">
          <Button variant="primary" onClick={() => router.push("/billing")}>
            <Crown size={16} />
            Upgrade to Pro
          </Button>
          <Button variant="ghost" onClick={() => router.back()}>
            Maybe Later
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
