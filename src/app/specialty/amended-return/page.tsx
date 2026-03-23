"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { FileEdit, ChevronDown, CheckCircle2, Clock, AlertTriangle, Info } from "lucide-react";

const reasons = [
  "You made an error on your original return (income, deductions, credits)",
  "You forgot to claim a deduction or credit you were entitled to",
  "You need to change your filing status",
  "You received a corrected W-2 or 1099 after filing",
  "You need to report additional income discovered after filing",
  "A tax law change retroactively affects your return",
];

const processSteps = [
  {
    title: "Identify the Error",
    detail: "Determine exactly what needs to be changed on your original return. Only the items being corrected should appear on the amended return.",
  },
  {
    title: "Complete Form 1040-X",
    detail: "The form has three columns: Original Amount, Net Change, and Corrected Amount. Include a clear explanation of what you are changing and why.",
  },
  {
    title: "Attach Supporting Documents",
    detail: "Include any new or corrected forms (W-2c, 1099, etc.) and documentation that supports your changes.",
  },
  {
    title: "File the Return",
    detail: "Form 1040-X can now be e-filed for the current year and two prior years. If filing by mail, send to the IRS service center for your state.",
  },
  {
    title: "Track Your Amendment",
    detail: "Use the IRS 'Where's My Amended Return?' tool. Processing takes up to 16 weeks. Do not file a duplicate.",
  },
];

const importantNotes = [
  {
    title: "Deadline to File",
    content: "You generally have 3 years from the date you filed the original return, or 2 years from the date you paid the tax, whichever is later.",
  },
  {
    title: "State Returns Too",
    content: "If you amend your federal return, you may also need to amend your state return. Check your state's requirements.",
  },
  {
    title: "Does Not Trigger Audit",
    content: "Filing an amended return does not automatically trigger an audit, but the IRS may review the changes more closely than an original filing.",
  },
  {
    title: "Multiple Amendments",
    content: "You can amend a return more than once. Wait for the first amendment to be processed before filing another for the same tax year.",
  },
];

export default function AmendedReturnPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <AppShell>
      <ScreenHeader title="Amended Return" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Made a mistake on your tax return? Form 1040-X lets you correct it.
          Here is everything you need to know.
        </p>

        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileEdit size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Common Reasons to Amend</p>
            </div>
            <div className="space-y-2.5">
              {reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{reason}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileEdit size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">How to File Form 1040-X</p>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-green-light text-brand-green text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{step.title}</p>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Important Notes
          </p>
          <div className="space-y-3">
            {importantNotes.map((note, i) => (
              <Card key={i}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <p className="text-sm font-bold text-navy">{note.title}</p>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-navy leading-relaxed">{note.content}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-4">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              If you owe additional tax on the amended return, pay as much as you
              can with the filing to minimize interest and penalties on the unpaid
              amount.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
