"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Users, CheckCircle2, XCircle, Info } from "lucide-react";

const positiveFactors = [
  "Had authority to sign checks on the business bank account",
  "Made decisions about which creditors to pay",
  "Was an officer or director of the corporation",
  "Had ownership interest (significant shareholder, partner, member)",
  "Had authority to hire and fire employees",
  "Controlled the payroll process or decided payment amounts",
  "Had access to financial records and bank statements",
  "Signed or directed the signing of tax returns",
  "Had authority to direct the flow of business funds",
  "Was responsible for day-to-day operations of the business",
];

const negativeFactors = [
  "Was a low-level employee with no check-signing authority",
  "Had no control over financial decisions",
  "Was unaware of the failure to pay trust fund taxes",
  "Was told by a superior that taxes were being paid",
  "Had no authority to hire, fire, or manage employees",
  "Did not have access to financial records",
  "Role was purely ministerial with no independent judgment",
  "Was locked out of financial systems by other officers",
];

export default function ResponsiblePersonsPage() {
  return (
    <AppShell>
      <ScreenHeader title="Responsible Persons" backHref="/specialty/tfrp" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          The IRS determines who is a "responsible person" based on authority and
          control. Use this checklist to evaluate your exposure.
        </p>

        <div className="animate-fade-up delay-1">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              The IRS can assert the TFRP against multiple responsible persons.
              Being one of several does not reduce your personal liability --
              each person can be held liable for the full amount.
            </p>
          </div>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} className="text-brand-red" />
              <p className="text-sm font-bold text-navy">Factors Indicating Responsibility</p>
            </div>
            <p className="text-xs text-muted mb-3">
              If several of these apply, the IRS is more likely to consider you a
              responsible person:
            </p>
            <div className="space-y-2.5">
              {positiveFactors.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <XCircle size={14} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{f}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-navy">Factors Supporting Non-Responsibility</p>
            </div>
            <p className="text-xs text-muted mb-3">
              These factors suggest you may not be a responsible person:
            </p>
            <div className="space-y-2.5">
              {negativeFactors.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{f}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <Card>
            <p className="text-sm font-bold text-navy mb-2">The "Willfulness" Requirement</p>
            <p className="text-sm text-navy leading-relaxed">
              Being a responsible person alone is not enough. The IRS must also
              show you acted "willfully" -- meaning you knew (or should have known)
              that trust fund taxes were not being paid and you chose to use the
              funds for other purposes, or you recklessly disregarded the
              obligation.
            </p>
            <div className="mt-3 bg-surface-alt rounded-xl p-3">
              <p className="text-xs text-muted">
                <span className="font-bold">Key defense:</span> If you can show
                you did not know about the unpaid taxes and had no reason to know,
                the willfulness requirement may not be met.
              </p>
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
