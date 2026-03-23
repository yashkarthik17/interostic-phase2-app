"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  ContextCard,
  SectionHeader,
} from "@/components/ui/shell";

import {
  Upload,
  Camera,
  FileText,
  AlertTriangle,
  Calendar,
  DollarSign,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const sampleDecoded = {
  noticeType: "CP14 - Balance Due Notice",
  amount: "$23,847.00",
  deadline: "April 15, 2026",
  requiredAction: "Payment or response required within 30 days",
  summary:
    "The IRS has determined you have an unpaid balance for tax year 2023. This notice includes penalties and interest accrued since the original due date.",
};

export default function NoticeDecoderPage() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="Notice Decoder" backHref="/resolve" />

      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <ContextCard icon={FileText} title="How it works" variant="warm">
            Upload or photograph an IRS notice and our AI will decode it,
            explaining what it means and what action you need to take.
          </ContextCard>
        </div>

        {!uploaded ? (
          <>
            {/* Upload zone — warm dashed border */}
            <div className="animate-fade-up delay-2">
              <button
                onClick={() => setUploaded(true)}
                className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-brand-blue/30 rounded-2xl bg-brand-blue-50/40 hover:border-brand-blue/50 hover:bg-brand-blue-50 transition-all duration-200 active:scale-[0.99]"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-blue-50 to-brand-blue-light rounded-2xl shadow-[var(--shadow-card)]">
                  <Upload size={24} className="text-brand-blue" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-navy">
                    Upload IRS Notice
                  </p>
                  <p className="text-xs text-muted mt-1">
                    PDF, JPG, or PNG up to 10MB
                  </p>
                </div>
              </button>
            </div>

            {/* Camera button */}
            <div className="animate-fade-up delay-3">
              <Button
                onClick={() => setUploaded(true)}
                variant="outline"
                full
              >
                <Camera size={18} />
                Take a Photo
              </Button>
            </div>

            {/* Info hint as ContextCard */}
            <div className="animate-fade-up delay-4">
              <ContextCard icon={FileText} title="What notices can we decode?" variant="blue">
                CP14, CP501, CP503, CP504, LT11, LT16, and most
                standard IRS correspondence. We identify the notice type,
                key amounts, deadlines, and required actions.
              </ContextCard>
            </div>
          </>
        ) : (
          <>
            {/* Decoded Result */}
            <div className="animate-fade-up delay-1">
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-brand-green" />
                  <p className="text-sm font-bold text-navy">
                    Notice Decoded Successfully
                  </p>
                </div>

                {/* Key info grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 p-3 bg-brand-red-light rounded-xl border border-brand-red/10">
                    <AlertTriangle
                      size={16}
                      className="text-brand-red shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                        Notice Type
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {sampleDecoded.noticeType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-warning-light rounded-xl border border-warning/10">
                    <DollarSign
                      size={16}
                      className="text-warning shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                        Amount Due
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {sampleDecoded.amount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-danger-light rounded-xl border border-danger/10">
                    <Calendar
                      size={16}
                      className="text-danger shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                        Deadline
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {sampleDecoded.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-info-light rounded-xl border border-info/10">
                    <ClipboardList
                      size={16}
                      className="text-info shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                        Required Action
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {sampleDecoded.requiredAction}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary as ContextCard-style inside the card */}
                <div className="pt-3 border-t border-border">
                  <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Summary
                  </p>
                  <p className="text-sm text-navy leading-relaxed">
                    {sampleDecoded.summary}
                  </p>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="animate-fade-up delay-2 space-y-3">
              <Button href="/analysis" variant="primary">
                Start Resolution Analysis
              </Button>
              <Button
                onClick={() => setUploaded(false)}
                variant="outline"
              >
                Decode Another Notice
              </Button>
            </div>
          </>
        )}
      </ScreenContent>
    </AppShell>
  );
}
