"use client";
import {
  AppShell,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { XCircle, Calendar, Shield, BarChart3, MessageCircle, FileText } from "lucide-react";

const lostFeatures = [
  { icon: Shield, label: "Expert consultation access" },
  { icon: BarChart3, label: "Full tax analysis & reports" },
  { icon: MessageCircle, label: "Priority support" },
  { icon: FileText, label: "IRS form generation" },
];

export default function CancelledPage() {
  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center pt-10">
        {/* Icon */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-alt mb-4">
            <XCircle size={28} className="text-muted" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6 animate-fade-up delay-2">
          <h2 className="text-lg font-bold text-navy mb-1.5">Subscription Cancelled</h2>
          <p className="text-sm text-muted">
            Your cancellation has been confirmed.
          </p>
        </div>

        {/* Access End Info */}
        <div className="w-full animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning-light">
                <Calendar size={18} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Access until Mar 31, 2026</p>
                <p className="text-xs text-muted">
                  You can use Pro features until your billing cycle ends.
                </p>
              </div>
            </div>

            <div className="h-px bg-border mb-4" />

            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              What you&apos;ll lose
            </p>
            <div className="space-y-2.5">
              {lostFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-danger-light">
                    <Icon size={14} className="text-danger" />
                  </div>
                  <span className="text-sm text-navy/80">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="w-full mt-6 space-y-3 animate-fade-up delay-4">
          <Button href="/billing/plans" variant="primary">
            Reactivate Subscription
          </Button>
          <Button href="/dashboard" variant="ghost">
            Go to Dashboard
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
