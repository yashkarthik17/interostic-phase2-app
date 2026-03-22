"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  Badge,
} from "@/components/ui/shell";
import {
  FileText,
  ShieldCheck,
  Eye,
  Lock,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function ExpertAgreementPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Service Agreement" backHref="/expert/pending" />
      <ScreenContent className="space-y-5 pt-2">
        {/* Intro */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-start gap-3 p-4 bg-info-light rounded-2xl">
            <Info size={18} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs text-info font-semibold leading-relaxed">
              Before we begin, your expert needs authorization to represent you
              before the IRS. These are standard IRS forms used by all tax
              professionals.
            </p>
          </div>
        </div>

        {/* Form 2848 Card */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light shrink-0">
                <FileText size={18} className="text-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-navy">Form 2848</p>
                  <Badge variant="primary">Required</Badge>
                </div>
                <p className="text-xs text-muted font-semibold">
                  Power of Attorney and Declaration of Representative
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mb-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={14} className="text-brand-green shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">What it does:</span>{" "}
                  Authorizes your tax professional to represent you before the
                  IRS, including attending meetings and signing agreements on your
                  behalf.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Eye size={14} className="text-brand-blue shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">What they can see:</span>{" "}
                  Your tax records, account transcripts, and correspondence for
                  the specific tax years listed.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock size={14} className="text-violet shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">Your protection:</span>{" "}
                  You can revoke this at any time by filing a new Form 2848 or
                  written notice to the IRS.
                </p>
              </div>
            </div>

            <div className="p-3 bg-surface-alt rounded-xl">
              <p className="text-[0.6875rem] font-semibold text-muted">Key Terms</p>
              <ul className="mt-1.5 space-y-1">
                <li className="text-xs text-muted flex items-start gap-2">
                  <span className="text-navy font-bold mt-px">&#8226;</span>
                  Covers tax years <span className="font-bold text-navy">2021, 2022, 2023</span>
                </li>
                <li className="text-xs text-muted flex items-start gap-2">
                  <span className="text-navy font-bold mt-px">&#8226;</span>
                  Valid until <span className="font-bold text-navy">revoked by you</span>
                </li>
                <li className="text-xs text-muted flex items-start gap-2">
                  <span className="text-navy font-bold mt-px">&#8226;</span>
                  Authorizes representation for <span className="font-bold text-navy">Form 1040</span> matters
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Form 8821 Card */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light shrink-0">
                <FileText size={18} className="text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-navy">Form 8821</p>
                  <Badge variant="success">Optional</Badge>
                </div>
                <p className="text-xs text-muted font-semibold">
                  Tax Information Authorization
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mb-3">
              <div className="flex items-start gap-2.5">
                <Eye size={14} className="text-brand-blue shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">What it does:</span>{" "}
                  Allows a third party to view your tax information only. Unlike
                  Form 2848, it does NOT grant authority to act on your behalf.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertCircle size={14} className="text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">When used:</span>{" "}
                  If you want a family member or financial advisor to view your
                  tax records for informational purposes only.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock size={14} className="text-violet shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-navy">Limitations:</span>{" "}
                  The designated person cannot represent you, make agreements, or
                  sign documents on your behalf.
                </p>
              </div>
            </div>

            <div className="p-3 bg-surface-alt rounded-xl">
              <p className="text-[0.6875rem] font-semibold text-muted">
                Key Difference from 2848
              </p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Form 8821 is <span className="font-bold text-navy">view-only</span>. Your
                expert already has representation rights through Form 2848.
                This form is useful if you want additional people to have access.
              </p>
            </div>
          </Card>
        </div>

        {/* Agreement Checkbox */}
        <div className="animate-fade-up delay-4">
          <Card>
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="flex items-start gap-3 w-full text-left"
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-md border-[1.5px] shrink-0 mt-0.5 transition-all ${
                  agreed
                    ? "bg-brand-green border-brand-green"
                    : "border-border-strong bg-white"
                }`}
              >
                {agreed && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <p className="text-xs text-muted leading-relaxed">
                I understand and agree to authorize my assigned tax professional
                to represent me before the IRS using Form 2848 (Power of
                Attorney) for tax years 2021-2023. I can revoke this
                authorization at any time.
              </p>
            </button>
          </Card>
        </div>

        {/* Action */}
        <div className="animate-fade-up delay-5 pb-2">
          <Button
            href="/expert/workspace"
            disabled={!agreed}
          >
            Sign &amp; Continue
            <ChevronRight size={16} />
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
