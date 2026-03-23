"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
  IconCircle,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import {
  Building2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  Users,
  FileText,
  Info,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/store";

const resolutionOptions = [
  { title: "Dispute the Assessment", desc: "Challenge who is a responsible person or the willfulness determination" },
  { title: "Pay & Claim Refund", desc: "Pay the TFRP for one employee for one quarter, then file a refund claim" },
  { title: "Installment Agreement", desc: "Set up a payment plan for the TFRP balance" },
  { title: "Offer in Compromise", desc: "Settle the TFRP for less than the full amount" },
];

const responsiblePersonFactors = [
  "Authority to sign checks or direct payments",
  "Authority to hire and fire employees",
  "Control over financial affairs of the business",
  "Officer or director of the company",
  "Ownership interest in the business",
  "Control over payroll and tax deposits",
];

export default function TfrpPage() {
  const [showCalc, setShowCalc] = useState(false);
  const [showBankruptcy, setShowBankruptcy] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="Trust Fund Recovery Penalty" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Warning Banner */}
        <div className="animate-fade-up">
          <ContextCard icon={AlertTriangle} title="Personal Liability for Payroll Taxes" variant="red">
            The TFRP makes you personally liable for unpaid trust fund taxes,
            even if your business is a corporation or LLC. This debt follows
            you individually.
          </ContextCard>
        </div>

        {/* What Are Trust Fund Taxes */}
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">What Are Trust Fund Taxes?</p>
            <p className="text-sm text-navy leading-relaxed">
              When you withhold income taxes, Social Security, and Medicare from
              employee paychecks, that money is held "in trust" for the government.
              If those funds are not deposited with the IRS, the responsible
              person(s) can be held personally liable through the Trust Fund
              Recovery Penalty (IRC 6672).
            </p>
          </Card>
        </div>

        {/* TC 246 */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-info" />
              <p className="text-sm font-bold text-navy">TC 246 on Your Transcript</p>
            </div>
            <p className="text-sm text-navy leading-relaxed">
              Transaction Code 246 on your individual account transcript indicates
              the IRS has assessed the Trust Fund Recovery Penalty against you
              personally. This means the IRS has already completed their
              investigation and determined you are a responsible person.
            </p>
          </Card>
        </div>

        {/* Responsible Person */}
        <div className="animate-fade-up delay-3">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">Responsible Person Determination</p>
            <p className="text-xs text-muted leading-relaxed mb-3">
              The IRS looks at whether you had the duty and authority to collect,
              account for, and pay over trust fund taxes. Key factors include:
            </p>
            <div className="space-y-2 mb-4">
              {responsiblePersonFactors.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{f}</span>
                </div>
              ))}
            </div>
            <Link
              href="/specialty/tfrp/responsible-persons"
              className="flex items-center gap-2 text-sm font-bold text-brand-blue"
            >
              View full checklist <ChevronRight size={14} />
            </Link>
          </Card>
        </div>

        {/* Form 4180 */}
        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Form 4180 Interview</p>
            </div>
            <p className="text-sm text-navy leading-relaxed mb-3">
              The IRS uses Form 4180 to interview potential responsible persons.
              This is a critical step -- how you answer these questions directly
              affects whether you are assessed the TFRP.
            </p>
            <Link
              href="/specialty/tfrp/form-4180"
              className="flex items-center gap-2 text-sm font-bold text-brand-blue"
            >
              Prepare for Form 4180 <ChevronRight size={14} />
            </Link>
          </Card>
        </div>

        {/* Calculation Example */}
        <div className="animate-fade-up delay-5">
          <Card>
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-brand-green" />
                <p className="text-sm font-bold text-navy">TFRP Calculation Example</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-200 ${showCalc ? "rotate-180" : ""}`}
              />
            </button>
            {showCalc && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="space-y-2.5 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-navy">Total Payroll</span>
                    <span className="text-sm font-semibold text-navy">{formatCurrency(120000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">Employer share (not trust fund)</span>
                    <span className="text-sm text-muted">-{formatCurrency(60000)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-navy">Employee share (trust fund)</span>
                    <span className="text-sm font-bold text-brand-red">{formatCurrency(60000)}</span>
                  </div>
                </div>
                <div className="bg-surface-alt rounded-xl p-3">
                  <p className="text-xs text-muted leading-relaxed">
                    The TFRP equals the employee's share of FICA plus withheld
                    income taxes. The employer's matching share is not included in
                    the TFRP calculation.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Resolution Options */}
        <div className="animate-fade-up delay-5">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Resolution Options
          </p>
          <div className="space-y-2.5">
            {resolutionOptions.map((opt, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-light text-navy text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{opt.title}</p>
                    <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bankruptcy Warning */}
        <div className="animate-fade-up delay-5">
          <Card className="!bg-danger-light !border-transparent">
            <button
              onClick={() => setShowBankruptcy(!showBankruptcy)}
              className="flex items-start justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <XCircle size={16} className="text-danger" />
                <p className="text-sm font-bold text-danger">NOT Dischargeable in Bankruptcy</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-danger transition-transform duration-200 ${showBankruptcy ? "rotate-180" : ""}`}
              />
            </button>
            {showBankruptcy && (
              <div className="mt-3 pt-3 border-t border-danger/20">
                <p className="text-xs text-danger/80 leading-relaxed">
                  Trust fund taxes are considered "priority" debts under the
                  Bankruptcy Code. They cannot be discharged in Chapter 7 or Chapter
                  13 bankruptcy. This means even after bankruptcy, you will still owe
                  the TFRP. Planning your resolution strategy accordingly is essential.
                </p>
              </div>
            )}
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
