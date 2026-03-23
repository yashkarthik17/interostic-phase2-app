"use client";
import { useEffect, useState } from "react";
import {
  AppShell,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { CheckCircle2, Download, FileText, Home } from "lucide-react";

export default function FilingSuccessPage() {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 300);
    const t2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const confirmationNumber = "BT-2026-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center min-h-[80dvh] text-center px-8">
        {/* Animated Checkmark */}
        <div
          className={`mb-6 ${
            showCheck
              ? "animate-celebrate"
              : "opacity-0 scale-50"
          }`}
        >
          <div className="relative">
            {/* Outer ring pulse */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-brand-green/20 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-brand-green flex items-center justify-center shadow-[var(--shadow-float)]">
              <CheckCircle2
                size={48}
                className="text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-700 delay-300 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-xl font-black text-navy mb-2">
            Return Filed Successfully!
          </h1>
          <p className="text-sm text-muted mb-6 leading-relaxed max-w-[280px]">
            Your tax return has been submitted to the IRS for processing.
          </p>

          {/* Confirmation */}
          <Card className="mb-6 text-left">
            <div className="space-y-3">
              <div>
                <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-0.5">
                  Confirmation Number
                </p>
                <p className="text-base font-black text-navy font-mono tracking-wider">
                  {confirmationNumber}
                </p>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Filed On</span>
                  <span className="font-semibold text-navy">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Status</span>
                  <span className="font-semibold text-brand-green">
                    Accepted for Processing
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Estimated Processing</span>
                  <span className="font-semibold text-navy">
                    21 business days
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6 text-left !bg-navy-light border-navy-light">
            <p className="text-xs font-bold text-navy mb-2">
              Next Steps
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-muted">
                <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                Save your confirmation number for your records.
              </li>
              <li className="flex items-start gap-2 text-xs text-muted">
                <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                The IRS will send an acceptance notice within 48 hours.
              </li>
              <li className="flex items-start gap-2 text-xs text-muted">
                <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                If expecting a refund, it typically arrives in 21 days.
              </li>
              <li className="flex items-start gap-2 text-xs text-muted">
                <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                Your filing compliance status has been updated.
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="space-y-3 w-full">
            <Button href="/documents" variant="outline">
              <Download size={16} />
              Download Copy
            </Button>
            <Button href="/dashboard">
              <Home size={16} />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
