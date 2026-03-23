"use client";
import {
  AppShell,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { Check, Zap, Calendar, CreditCard } from "lucide-react";

export default function SuccessPage() {
  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center pt-8">
        {/* Checkmark with Confetti Dots */}
        <div className="relative mb-8 animate-celebrate delay-1">
          {/* Confetti dots */}
          <div className="absolute -top-3 -left-4 w-2.5 h-2.5 rounded-full bg-brand-green" style={{ animation: "confettiFloat 2s ease-in-out infinite" }} />
          <div className="absolute -top-5 right-2 w-2 h-2 rounded-full bg-brand-blue" style={{ animation: "confettiFloat 2s ease-in-out infinite 0.3s" }} />
          <div className="absolute top-0 -right-5 w-3 h-3 rounded-full bg-warning" style={{ animation: "confettiFloat 2s ease-in-out infinite 0.6s" }} />
          <div className="absolute -bottom-2 -left-3 w-2 h-2 rounded-full bg-violet" style={{ animation: "confettiFloat 2s ease-in-out infinite 0.2s" }} />
          <div className="absolute -bottom-4 right-0 w-2.5 h-2.5 rounded-full bg-brand-red" style={{ animation: "confettiFloat 2s ease-in-out infinite 0.8s" }} />
          <div className="absolute top-4 -left-6 w-1.5 h-1.5 rounded-full bg-teal" style={{ animation: "confettiFloat 2s ease-in-out infinite 0.5s" }} />

          {/* Main checkmark circle */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-brand-green-light">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-green">
              <Check size={28} className="text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-up delay-2">
          <h2 className="text-xl font-bold text-navy mb-2">Payment Successful!</h2>
          <p className="text-sm text-muted">
            Your Pro Plan subscription is now active.
          </p>
        </div>

        {/* Receipt Summary */}
        <div className="w-full animate-fade-up delay-3">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-4">
              Receipt Summary
            </p>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green-light">
                  <Zap size={16} className="text-brand-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">Pro Plan - Monthly</p>
                  <p className="text-xs text-muted">1 month subscription</p>
                </div>
                <span className="text-sm font-bold text-navy">$49.00</span>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-light">
                  <Calendar size={16} className="text-brand-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">Next billing date</p>
                  <p className="text-xs text-muted">Apr 1, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-light">
                  <CreditCard size={16} className="text-violet" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">Payment method</p>
                  <p className="text-xs text-muted">Visa ending in 4242</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full mt-6 animate-fade-up delay-4">
          <Button href="/dashboard">Go to Dashboard</Button>
        </div>

        <style>{`
          @keyframes confettiFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-8px) scale(1.2); opacity: 0.7; }
          }
        `}</style>
      </ScreenContent>
    </AppShell>
  );
}
