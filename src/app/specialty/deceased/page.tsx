"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Heart, ChevronDown, CheckCircle2, FileText, Info, Users } from "lucide-react";

const steps = [
  {
    title: "Notify the IRS",
    detail: "Send a copy of the death certificate to the IRS. If a joint return was filed, the surviving spouse should also notify the IRS of the death.",
  },
  {
    title: "Appoint a Personal Representative",
    detail: "The executor, administrator, or personal representative named in the will (or appointed by the court) handles tax matters. File Form 56 to notify the IRS of your fiduciary role.",
  },
  {
    title: "File Final Tax Return",
    detail: "The deceased's final Form 1040 covers January 1 through the date of death. Write 'DECEASED' across the top with the name and date of death.",
  },
  {
    title: "File Estate Tax Return (if needed)",
    detail: "Form 706 is required if the gross estate exceeds the filing threshold ($13.61 million for 2024). Due 9 months after date of death, with a 6-month extension available.",
  },
  {
    title: "File Estate Income Tax Return",
    detail: "Form 1041 reports income earned by the estate after the date of death until the estate is closed. This is separate from the deceased's final 1040.",
  },
  {
    title: "Request Account Transcript",
    detail: "Review the deceased's account transcripts to identify all outstanding balances, unfiled returns, and any collection activity.",
  },
];

const specialConsiderations = [
  {
    title: "Outstanding Tax Debt",
    content: "The estate is responsible for paying any tax debt the deceased owed. The debt does not transfer to family members personally, but it must be paid from estate assets before distributions to heirs.",
  },
  {
    title: "Joint Return Liability",
    content: "If a surviving spouse filed joint returns with the deceased, both spouses are liable for the full tax. The surviving spouse may qualify for innocent spouse relief if the deceased caused the liability.",
  },
  {
    title: "Refunds Owed to the Deceased",
    content: "File Form 1310, Statement of Person Claiming Refund Due a Deceased Taxpayer, to claim any refund. The personal representative or surviving spouse can file this.",
  },
  {
    title: "Collection Statute",
    content: "The CSED (10-year collection statute) continues to run after death. If the estate does not have assets to pay, the debt may expire before it can be collected.",
  },
];

export default function DeceasedPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <AppShell>
      <ScreenHeader title="Deceased Taxpayer" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Handling the tax obligations of a deceased loved one can feel
          overwhelming. Here is a clear guide to what needs to happen and in what
          order.
        </p>

        <div className="animate-fade-up delay-1">
          <ContextCard icon={Info} title="Important to Know" variant="blue">
            Tax debt does not pass to family members. The estate is responsible
            for outstanding taxes, but heirs are not personally liable unless
            they received estate assets before debts were paid.
          </ContextCard>
        </div>

        {/* Step by Step */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-sm font-bold text-navy mb-4">Steps to Follow</p>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-light text-navy text-xs font-bold flex items-center justify-center shrink-0">
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

        {/* Special Considerations */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Special Considerations
          </p>
          <div className="space-y-3">
            {specialConsiderations.map((sc, i) => (
              <Card key={i}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <p className="text-sm font-bold text-navy">{sc.title}</p>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-navy leading-relaxed">{sc.content}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Key Forms</p>
            </div>
            <div className="space-y-2">
              {[
                { form: "Form 56", desc: "Notice of Fiduciary Relationship" },
                { form: "Form 1040", desc: "Final individual return for the deceased" },
                { form: "Form 706", desc: "Estate Tax Return (if applicable)" },
                { form: "Form 1041", desc: "Estate Income Tax Return" },
                { form: "Form 1310", desc: "Claim refund due to a deceased taxpayer" },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-semibold text-navy">{f.form}</span>
                  <span className="text-xs text-muted">{f.desc}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
