"use client";
import {
  AppShell,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { AlertCircle, RefreshCw, CreditCard } from "lucide-react";

export default function FailedPage() {
  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center pt-8">
        {/* Red Alert Icon */}
        <div className="animate-fade-up delay-1 mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-danger-light">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-danger">
              <AlertCircle size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-up delay-2">
          <h2 className="text-xl font-bold text-navy mb-2">Payment Failed</h2>
          <p className="text-sm text-muted max-w-[280px]">
            We couldn&apos;t process your payment. Please check your card details and try again.
          </p>
        </div>

        {/* Error Details */}
        <div className="w-full animate-fade-up delay-3">
          <Card>
            <div className="flex items-start gap-3 px-1">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-danger-light shrink-0">
                <CreditCard size={16} className="text-danger" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy mb-0.5">Card declined</p>
                <p className="text-xs text-muted leading-relaxed">
                  Your bank declined the transaction. This could be due to insufficient funds, incorrect card details, or security restrictions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="w-full mt-6 space-y-3 animate-fade-up delay-4">
          <Button href="/billing/checkout" variant="primary">
            <RefreshCw size={16} />
            Try Again
          </Button>
          <Button href="/billing/methods" variant="outline">
            <CreditCard size={16} />
            Use Different Method
          </Button>
          <Button href="/billing" variant="ghost">
            Back to Billing
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
