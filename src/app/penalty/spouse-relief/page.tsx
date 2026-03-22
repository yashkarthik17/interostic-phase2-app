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
} from "@/components/ui/shell";
import { Users, ChevronDown, CheckCircle2, AlertTriangle, FileText, ChevronRight } from "lucide-react";

const reliefTypes = [
  {
    title: "Innocent Spouse Relief (IRC 6015(b))",
    badge: "Most Common",
    badgeVariant: "success" as const,
    description:
      "If your spouse (or former spouse) improperly reported or omitted items on your joint return, you may be relieved of the tax, interest, and penalties.",
    requirements: [
      "You filed a joint return with an understatement of tax",
      "The understatement was due to your spouse's erroneous items",
      "You did not know, and had no reason to know, about the error",
      "It would be unfair to hold you responsible",
    ],
  },
  {
    title: "Separation of Liability (IRC 6015(c))",
    badge: "Divorced/Separated",
    badgeVariant: "info" as const,
    description:
      "This allocates the understatement of tax between you and your former spouse. You are only responsible for your allocated portion.",
    requirements: [
      "You are no longer married, or legally separated, or lived apart for 12 months",
      "You filed a joint return with an understatement",
      "Relief is limited to items allocable to your former spouse",
      "You must not have had actual knowledge of the erroneous items",
    ],
  },
  {
    title: "Equitable Relief (IRC 6015(f))",
    badge: "Catch-All",
    badgeVariant: "warning" as const,
    description:
      "If you do not qualify for the other types but it would be unfair to hold you liable, the IRS may grant equitable relief. This is the broadest category.",
    requirements: [
      "You do not qualify for innocent spouse or separation of liability relief",
      "It would be inequitable to hold you liable",
      "Factors considered: abuse, financial control, economic hardship",
      "Can apply to underpayments (not just understatements)",
    ],
  },
];

export default function SpouseReliefPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="Spouse Relief" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          If you filed a joint return and your spouse caused a tax problem, you
          should not have to pay for their mistakes. The IRS provides three types
          of spouse relief.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-info-light !border-transparent">
            <div className="flex items-start gap-3">
              <FileText size={18} className="text-info shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-info">Form 8857</p>
                <p className="text-xs text-info/80 mt-1 leading-relaxed">
                  All three types of spouse relief are requested using Form 8857,
                  Request for Innocent Spouse Relief. You generally must file within
                  2 years of the first IRS collection activity.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          {reliefTypes.map((type, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Users size={14} className="text-violet shrink-0" />
                      <p className="text-sm font-bold text-navy">{type.title}</p>
                    </div>
                    <Badge variant={type.badgeVariant}>{type.badge}</Badge>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border space-y-3">
                    <p className="text-sm text-navy leading-relaxed">{type.description}</p>
                    <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                      Requirements
                    </p>
                    <div className="space-y-2">
                      {type.requirements.map((req, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm text-navy">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-800 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-navy">Important to Know</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  The IRS will notify your spouse or former spouse when you file
                  Form 8857. They have the right to participate in the process.
                  This is required by law and cannot be waived.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-5">
          <Link
            href="/specialty/injured-spouse"
            className="flex items-center gap-3.5 p-4 bg-white border border-border rounded-2xl transition-all duration-200 hover:border-border-strong hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">Looking for Injured Spouse?</p>
              <p className="text-xs text-muted mt-0.5">
                If your refund was taken to pay your spouse's debt, see Form 8379
              </p>
            </div>
            <ChevronRight size={16} className="text-placeholder shrink-0" />
          </Link>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
