"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { ArrowRight, DollarSign, Star, AlertTriangle, CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/store";

const originalOffer = 8500;
const counterOffer = 14200;
const totalDebt = 47250;

export default function CounterOfferPage() {
  const [choice, setChoice] = useState<"accept" | "reject" | "counter" | null>(null);

  return (
    <AppShell>
      <ScreenHeader title="IRS Counter-Offer" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Counter-Offer Alert */}
        <div className="animate-fade-up delay-1">
          <div className="bg-warning-light border border-warning/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-warning" />
              <span className="text-[0.6875rem] font-bold text-amber-800 uppercase tracking-wider">
                Counter-Offer Received
              </span>
            </div>
            <p className="text-sm text-amber-900 font-bold mb-1">
              The IRS has countered your Offer in Compromise
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              You have 30 days from the date of this notice to respond. Review the details below and choose your response.
            </p>
          </div>
        </div>

        {/* Offer Comparison */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Offer Comparison
          </p>
          <Card className="!p-4">
            <div className="flex items-center justify-between gap-3">
              {/* Your Offer */}
              <div className="flex-1 text-center p-3 bg-surface-alt rounded-xl">
                <p className="text-[0.625rem] font-semibold text-muted uppercase mb-1">Your Offer</p>
                <p className="text-lg font-black text-navy">{formatCurrency(originalOffer)}</p>
                <p className="text-[0.625rem] text-placeholder mt-0.5">
                  {Math.round((1 - originalOffer / totalDebt) * 100)}% savings
                </p>
              </div>

              <ArrowRight size={18} className="text-placeholder shrink-0" />

              {/* Counter Offer */}
              <div className="flex-1 text-center p-3 bg-warning-light rounded-xl border border-warning/20">
                <p className="text-[0.625rem] font-semibold text-amber-800 uppercase mb-1">IRS Counter</p>
                <p className="text-lg font-black text-amber-900">{formatCurrency(counterOffer)}</p>
                <p className="text-[0.625rem] text-amber-700 mt-0.5">
                  {Math.round((1 - counterOffer / totalDebt) * 100)}% savings
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Difference</span>
                <span className="text-sm font-bold text-brand-red">
                  +{formatCurrency(counterOffer - originalOffer)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-muted">Total debt</span>
                <span className="text-sm font-bold text-navy">{formatCurrency(totalDebt)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Expert Recommendation */}
        <div className="animate-fade-up delay-3">
          <div className="bg-brand-green-light border border-brand-green/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 shrink-0">
                <Star size={16} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-green-dark mb-1">Expert Recommendation</p>
                <p className="text-xs text-brand-green-dark/80 leading-relaxed">
                  The IRS counter of {formatCurrency(counterOffer)} still represents a <strong>70% reduction</strong> of your total debt. We recommend <strong>accepting the counter-offer</strong> -- it is a strong outcome and avoids further delays. Rejecting may lead to denial of your OIC entirely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Response Options */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Your Response
          </p>
          <div className="space-y-2.5">
            {/* Accept */}
            <button
              onClick={() => setChoice("accept")}
              className="w-full text-left"
            >
              <Card className={`!p-4 ${choice === "accept" ? "border-brand-green" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${choice === "accept" ? "bg-brand-green-light" : "bg-surface-alt"}`}>
                    <CheckCircle2 size={18} className={choice === "accept" ? "text-brand-green" : "text-muted"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Accept Counter-Offer</p>
                    <p className="text-xs text-muted">
                      Pay {formatCurrency(counterOffer)} to settle your {formatCurrency(totalDebt)} debt
                    </p>
                  </div>
                  {choice === "accept" && <Badge variant="success">Selected</Badge>}
                </div>
              </Card>
            </button>

            {/* Reject */}
            <button
              onClick={() => setChoice("reject")}
              className="w-full text-left"
            >
              <Card className={`!p-4 ${choice === "reject" ? "border-brand-red" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${choice === "reject" ? "bg-brand-red-light" : "bg-surface-alt"}`}>
                    <XCircle size={18} className={choice === "reject" ? "text-brand-red" : "text-muted"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Reject & Appeal</p>
                    <p className="text-xs text-muted">
                      Appeal to the IRS Office of Appeals within 30 days
                    </p>
                  </div>
                  {choice === "reject" && <Badge variant="danger">Selected</Badge>}
                </div>
              </Card>
            </button>

            {/* Counter */}
            <button
              onClick={() => setChoice("counter")}
              className="w-full text-left"
            >
              <Card className={`!p-4 ${choice === "counter" ? "border-brand-blue" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${choice === "counter" ? "bg-navy-light" : "bg-surface-alt"}`}>
                    <MessageCircle size={18} className={choice === "counter" ? "text-brand-blue" : "text-muted"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Submit Counter-Proposal</p>
                    <p className="text-xs text-muted">
                      Propose a different amount between your offer and the IRS counter
                    </p>
                  </div>
                  {choice === "counter" && <Badge variant="info">Selected</Badge>}
                </div>
              </Card>
            </button>
          </div>
        </div>

        {/* Warning for reject */}
        {choice === "reject" && (
          <div className="animate-fade-up delay-5">
            <div className="flex items-start gap-2.5 p-4 bg-danger-light border border-danger/10 rounded-2xl">
              <AlertTriangle size={14} className="text-danger shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed">
                Rejecting the counter-offer means your OIC will be denied. You will need to file an appeal within 30 days, which may take an additional 3-6 months. During this time, your CSED continues to be tolled.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="animate-fade-up delay-5 space-y-3 pt-2">
          <Button variant="primary" disabled={!choice}>
            <DollarSign size={16} />
            {choice === "accept"
              ? "Accept Counter-Offer"
              : choice === "reject"
              ? "File Appeal"
              : choice === "counter"
              ? "Submit Counter-Proposal"
              : "Select a Response"}
          </Button>
          <Button variant="ghost" href="/dashboard">
            Decide Later
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
