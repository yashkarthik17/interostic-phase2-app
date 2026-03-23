"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  StepIndicator,
  Card,
  Button,
  Badge,
  SectionHeader,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  ChevronRight,
  Shield,
  FileText,
  PenTool,
  PartyPopper,
  DollarSign,
  Calendar,
  Clock,
} from "lucide-react";

export default function HandoffAcceptancePage() {
  const [signed, setSigned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <AppShell hideNav>
        <ScreenContent className="flex flex-col items-center justify-center text-center px-8">
          <div className="animate-fade-up delay-1">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-brand-green-light mb-5">
              <PartyPopper size={36} className="text-brand-green" />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">
              You&apos;re All Set!
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-[280px]">
              Your case has been officially handed off to Michael Chen, EA.
              He&apos;ll begin working on your Offer in Compromise and Penalty
              Abatement immediately.
            </p>
          </div>

          <div className="animate-fade-up delay-2 w-full">
            <Card className="text-left">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
                What Happens Next
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: FileText,
                    color: "bg-navy-light",
                    iconColor: "text-navy",
                    text: "Expert files Form 656 and Form 843 with the IRS",
                    time: "Within 48 hours",
                  },
                  {
                    icon: Shield,
                    color: "bg-brand-green-light",
                    iconColor: "text-brand-green",
                    text: "IRS assigns your case to an Offer Examiner",
                    time: "2-4 weeks",
                  },
                  {
                    icon: Clock,
                    color: "bg-info-light",
                    iconColor: "text-info",
                    text: "Expert negotiates on your behalf until resolution",
                    time: "3-9 months typical",
                  },
                ].map((step) => (
                  <div key={step.text} className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl ${step.color} shrink-0`}
                    >
                      <step.icon size={16} className={step.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted leading-relaxed">
                        {step.text}
                      </p>
                      <p className="text-[0.625rem] font-bold text-navy mt-0.5">
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="animate-fade-up delay-3 w-full mt-4 space-y-3">
            <Button href="/expert/workspace">
              Go to Expert Workspace
              <ChevronRight size={16} />
            </Button>
            <Button href="/dashboard" variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </ScreenContent>
      </AppShell>
    );
  }

  return (
    <AppShell hideNav>
      <ScreenHeader
        title="Expert Handoff"
        backHref="/handoff/recommendation"
      />
      <StepIndicator steps={["Documents", "Review", "Expert", "Accept"]} current={3} />
      <ScreenContent className="space-y-5 pt-3">
        {/* Final Strategy Summary */}
        <div className="animate-fade-up delay-1">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Final Strategy Confirmation
          </p>
          <Card className="bg-navy">
            <h3 className="text-base font-bold text-white mb-3">
              Offer in Compromise + Penalty Abatement
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <DollarSign size={16} className="text-brand-green shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">OIC Offer Amount</p>
                  <p className="text-sm font-bold text-white">$9,200</p>
                </div>
                <Badge variant="success">81% savings</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Shield size={16} className="text-brand-green shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">Penalty Abatement</p>
                  <p className="text-sm font-bold text-white">
                    ~$2,100 in penalties removed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Calendar size={16} className="text-white/50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">Tax Years</p>
                  <p className="text-sm font-bold text-white">
                    2021, 2022, 2023
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Terms */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
              By Signing You Agree To
            </p>
            <div className="space-y-2">
              {[
                "Authorize Michael Chen, EA to submit OIC and penalty abatement on your behalf",
                "Maintain full tax compliance for the next 5 years",
                "Provide any additional documents if requested by the IRS",
                "Pay the agreed $9,200 offer amount per the lump sum terms",
              ].map((term) => (
                <div key={term} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="text-brand-green shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted leading-relaxed">{term}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Digital Signature */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Digital Signature
          </p>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light shrink-0">
                <PenTool size={16} className="text-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-navy">
                  Sign to Confirm
                </p>
                <p className="text-xs text-muted">
                  Tap the signature area to apply your digital signature
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSigned(!signed)}
              className={`w-full h-24 border-2 border-dashed rounded-xl flex items-center justify-center transition-all ${
                signed
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border-strong bg-surface-alt hover:border-navy"
              }`}
            >
              {signed ? (
                <div className="flex flex-col items-center gap-1">
                  <p
                    className="text-xl text-navy"
                    style={{ fontFamily: "cursive" }}
                  >
                    John Smith
                  </p>
                  <p className="text-[0.625rem] font-semibold text-brand-green">
                    Signed on March 22, 2026
                  </p>
                </div>
              ) : (
                <p className="text-xs font-semibold text-placeholder">
                  Tap to sign
                </p>
              )}
            </button>
          </Card>
        </div>

        {/* Submit */}
        <div className="animate-fade-up delay-4 pb-2">
          <Button
            onClick={() => setSubmitted(true)}
            disabled={!signed}
          >
            Accept &amp; Proceed
            <ChevronRight size={16} />
          </Button>
          {!signed && (
            <p className="text-center text-[0.625rem] text-placeholder font-semibold mt-2">
              Please sign above to continue
            </p>
          )}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
