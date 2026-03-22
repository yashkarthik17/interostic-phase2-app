"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  Badge,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  FileText,
  ChevronRight,
  Shield,
  User,
  DollarSign,
  Calendar,
} from "lucide-react";

const documents = [
  { name: "Form 656 (OIC Application)", verified: true },
  { name: "Form 433-A(OIC) (Financial Statement)", verified: true },
  { name: "IRS Account Transcripts (2021-2023)", verified: true },
  { name: "Bank Statements (3 months)", verified: true },
  { name: "Pay Stubs (3 months)", verified: true },
  { name: "Photo ID (Government-issued)", verified: true },
];

export default function HandoffReviewPage() {
  return (
    <AppShell hideNav>
      <ScreenHeader title="Expert Handoff" backHref="/handoff" />
      <ProgressBar value={50} steps="Step 2 of 4" label="Review Documents" />
      <ScreenContent className="space-y-5 pt-3">
        {/* All Verified Banner */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center gap-3 p-4 bg-brand-green-light rounded-2xl">
            <CheckCircle2 size={20} className="text-brand-green shrink-0" />
            <div>
              <p className="text-sm font-bold text-brand-green-dark">
                All Documents Verified
              </p>
              <p className="text-xs text-brand-green-dark/70 font-semibold">
                Your case package is complete and ready for expert review.
              </p>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Verified Documents
          </p>
          <Card className="!p-0 divide-y divide-border">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <CheckCircle2
                  size={16}
                  className="text-brand-green shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">
                    {doc.name}
                  </p>
                </div>
                <Badge variant="success">Verified</Badge>
              </div>
            ))}
          </Card>
        </div>

        {/* Case Summary for Expert */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Case Summary for Expert
          </p>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light shrink-0">
                <User size={16} className="text-navy" />
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">
                  Client
                </p>
                <p className="text-sm font-bold text-navy">John Smith</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-red-light shrink-0">
                <DollarSign size={16} className="text-brand-red" />
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">
                  Total Tax Debt
                </p>
                <p className="text-sm font-bold text-navy">$47,250</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-green-light shrink-0">
                <Shield size={16} className="text-brand-green" />
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">
                  Recommended Strategy
                </p>
                <p className="text-sm font-bold text-navy">
                  Offer in Compromise &mdash; $8,500
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-info-light shrink-0">
                <Calendar size={16} className="text-info" />
              </div>
              <div>
                <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">
                  Tax Years
                </p>
                <div className="flex gap-1.5 mt-0.5">
                  {["2021", "2022", "2023"].map((year) => (
                    <span
                      key={year}
                      className="px-2 py-0.5 bg-surface-alt rounded-md text-xs font-bold text-navy"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-surface-alt rounded-xl">
              <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider mb-1">
                Additional Notes
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Client has clean 3-year compliance history. W-2 employment only,
                no business income. First-time penalty abatement also
                recommended for 2021. CSED for 2021 expires April 2031.
              </p>
            </div>
          </Card>
        </div>

        {/* Submit */}
        <div className="animate-fade-up delay-4 pb-2">
          <Button href="/handoff/recommendation">
            Submit for Expert Review
            <ChevronRight size={16} />
          </Button>
          <p className="text-center text-[0.625rem] text-placeholder font-semibold mt-2">
            Your expert will review within 24 hours
          </p>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
