"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { FileText, CheckCircle2, MapPin, Clock, Send, AlertTriangle } from "lucide-react";

const submissionItems = [
  { name: "Form 656 - Offer in Compromise", status: "complete" as const },
  { name: "Form 433-A (OIC) - Collection Information", status: "complete" as const },
  { name: "IRS Account Transcripts (2021-2023)", status: "complete" as const },
  { name: "Income Documentation", status: "complete" as const },
  { name: "Asset Verification Documents", status: "complete" as const },
  { name: "Expense Documentation", status: "complete" as const },
  { name: "Application Fee ($205)", status: "complete" as const },
  { name: "Initial Payment (20% - $1,700)", status: "complete" as const },
];

export default function SubmissionConfirmPage() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="Confirm Submission" backHref="/resolve" />
      <ScreenContent className="space-y-4 pt-2">
        {confirmed ? (
          /* Success State */
          <div className="animate-fade-up delay-1 text-center py-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-brand-green-light mx-auto mb-4">
              <CheckCircle2 size={36} className="text-brand-green" />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Submission Complete</h2>
            <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto mb-6">
              Your Offer in Compromise package has been prepared for submission. Follow the mailing instructions below.
            </p>
            <Card className="text-left !p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-brand-blue" />
                <span className="text-xs font-bold text-navy">Mailing Address</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                IRS - MOIC<br />
                P.O. Box 24017<br />
                Fresno, CA 93779
              </p>
            </Card>
            <Card className="text-left !p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-brand-blue" />
                <span className="text-xs font-bold text-navy">Estimated Processing</span>
              </div>
              <p className="text-sm text-muted">6-12 months from receipt</p>
            </Card>
            <Button variant="primary" href="/dashboard">
              Return to Dashboard
            </Button>
          </div>
        ) : (
          /* Confirmation State */
          <>
            {/* What's Being Submitted */}
            <div className="animate-fade-up delay-1">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
                What&apos;s Being Submitted
              </p>
              <Card className="!p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-brand-blue" />
                  <span className="text-sm font-bold text-navy">Offer in Compromise Package</span>
                  <Badge variant="success">Ready</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-1">
                  <div>
                    <p className="text-[0.625rem] font-semibold text-muted uppercase">Total Debt</p>
                    <p className="text-sm font-bold text-navy">$47,250</p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-semibold text-muted uppercase">Offer Amount</p>
                    <p className="text-sm font-bold text-brand-green">$8,500</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Document Checklist */}
            <div className="animate-fade-up delay-2">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
                Included Documents
              </p>
              <Card className="!p-0 divide-y divide-border">
                {submissionItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 px-4 py-3">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    <span className="text-sm font-medium text-navy flex-1">{item.name}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* Mailing Address */}
            <div className="animate-fade-up delay-3">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
                IRS Mailing Address
              </p>
              <Card className="!p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-navy mb-1">IRS - MOIC</p>
                    <p className="text-sm text-muted">P.O. Box 24017</p>
                    <p className="text-sm text-muted">Fresno, CA 93779</p>
                    <p className="text-xs text-placeholder mt-2">Send via certified mail with return receipt</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Processing Time */}
            <div className="animate-fade-up delay-4">
              <Card className="!p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info-light shrink-0">
                    <Clock size={18} className="text-info" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Estimated Processing Time</p>
                    <p className="text-xs text-muted">6-12 months from IRS receipt</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Warning */}
            <div className="animate-fade-up delay-5">
              <div className="flex items-start gap-2.5 p-4 bg-warning-light border border-warning/20 rounded-2xl">
                <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  By confirming, you acknowledge that all information provided is accurate and complete. Submitting false information to the IRS can result in penalties.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-up delay-6 space-y-3 pt-2">
              <Button variant="primary" onClick={() => setConfirmed(true)}>
                <Send size={16} />
                Confirm & Submit
              </Button>
              <Button variant="ghost" href="/resolve">
                Go Back
              </Button>
            </div>
          </>
        )}
      </ScreenContent>
    </AppShell>
  );
}
