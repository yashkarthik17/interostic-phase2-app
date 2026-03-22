"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
} from "@/components/ui/shell";
import { Heart, Gift, AlertTriangle } from "lucide-react";

const reasons = [
  "Too expensive",
  "Not using it enough",
  "Found an alternative",
  "Missing features I need",
  "Too complicated to use",
  "Resolved my tax issue",
  "Other",
];

export default function CancelPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggleReason(reason: string) {
    setSelected((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Cancel Subscription" backHref="/billing" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Header */}
        <div className="animate-fade-up delay-1 text-center py-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-danger-light mx-auto mb-3">
            <Heart size={24} className="text-danger" />
          </div>
          <h2 className="text-lg font-bold text-navy mb-1">We&apos;re sorry to see you go</h2>
          <p className="text-sm text-muted">
            Before you cancel, we&apos;d love to understand why.
          </p>
        </div>

        {/* Retention Offer */}
        <div className="animate-fade-up delay-2">
          <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-brand-green bg-brand-green-light p-5">
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-green/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={18} className="text-brand-green" />
                <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                  Special Offer
                </span>
              </div>
              <h3 className="text-base font-bold text-navy mb-1">
                Stay for 50% off next 3 months
              </h3>
              <p className="text-sm text-muted mb-3">
                Pay just $24.50/month instead of $49/month. That&apos;s $73.50 in savings.
              </p>
              <Badge variant="success">$73.50 savings</Badge>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="animate-fade-up delay-3">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              Tell us why you&apos;re leaving
            </p>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => toggleReason(reason)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-150 ${
                    selected.includes(reason)
                      ? "bg-navy-light border-[1.5px] border-brand-blue text-navy"
                      : "bg-surface-alt border-[1.5px] border-transparent text-muted hover:border-border"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-5 h-5 rounded-md border-[1.5px] transition-colors ${
                      selected.includes(reason)
                        ? "bg-brand-blue border-brand-blue"
                        : "border-border-strong"
                    }`}
                  >
                    {selected.includes(reason) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {reason}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Warning */}
        <div className="animate-fade-up delay-4">
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-warning-light">
            <AlertTriangle size={16} className="text-warning mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Your plan will remain active until Mar 31, 2026. After that, you&apos;ll lose access to Pro features.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="animate-fade-up delay-5 space-y-3">
          <Button href="/billing" variant="primary">
            Keep My Plan
          </Button>
          <Button
            onClick={() => router.push("/billing/cancelled")}
            variant="ghost"
          >
            Cancel Subscription
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
