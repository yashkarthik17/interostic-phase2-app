"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
} from "@/components/ui/shell";
import { FileText, AlertTriangle, ChevronDown, CheckCircle2, Info } from "lucide-react";

const interviewSections = [
  {
    title: "Section 1: General Information",
    questions: [
      "Your role and title with the business",
      "Dates of your involvement with the business",
      "Who else was involved in business operations",
      "Business structure and ownership percentages",
    ],
    tips: [
      "Be precise about dates -- especially start and end dates of your involvement",
      "Do not volunteer information about other people's roles unless asked",
    ],
  },
  {
    title: "Section 2: Financial Authority",
    questions: [
      "Who had authority to sign checks?",
      "Who decided which bills to pay?",
      "Who controlled the business bank account(s)?",
      "Who had online banking access?",
      "Were any checks co-signed?",
    ],
    tips: [
      "If you shared authority, make that clear -- but shared authority can still mean responsibility",
      "Bank records will be compared to your answers",
    ],
  },
  {
    title: "Section 3: Tax Responsibilities",
    questions: [
      "Who was responsible for filing employment tax returns?",
      "Who was responsible for making tax deposits?",
      "Were you aware that taxes were not being paid?",
      "What did you do when you learned taxes were not paid?",
      "Did you use payroll funds for other business expenses?",
    ],
    tips: [
      "This is the most critical section for willfulness determination",
      "Your awareness and actions after learning about unpaid taxes are key",
      "Do not say you 'assumed' someone else was handling it without details",
    ],
  },
  {
    title: "Section 4: Business Operations",
    questions: [
      "Who managed day-to-day operations?",
      "Who hired and fired employees?",
      "Who negotiated contracts and leases?",
      "Who determined employee compensation?",
    ],
    tips: [
      "Operational control is a strong indicator of responsible person status",
      "If your role was limited, be specific about what you did and did not do",
    ],
  },
];

export default function Form4180Page() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="Form 4180 Preparation" backHref="/specialty/tfrp" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Form 4180 is the interview the IRS conducts to determine who is a
          responsible person for the Trust Fund Recovery Penalty. Preparation is
          critical -- your answers directly impact the outcome.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-danger-light !border-transparent">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-danger shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-danger">Get Professional Help</p>
                <p className="text-xs text-danger/80 mt-1 leading-relaxed">
                  Do not go to a Form 4180 interview alone. The answers you give
                  are used as evidence. A tax professional or attorney can represent
                  you and help protect your rights.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          {interviewSections.map((section, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-teal shrink-0" />
                    <p className="text-sm font-bold text-navy">{section.title}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border space-y-4">
                    <div>
                      <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
                        Questions They Will Ask
                      </p>
                      <div className="space-y-2">
                        {section.questions.map((q, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-navy-light text-navy text-[0.625rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            <span className="text-sm text-navy">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-brand-green-light rounded-xl p-3">
                      <p className="text-[0.72rem] font-semibold text-brand-green uppercase tracking-wider mb-1.5">
                        Preparation Tips
                      </p>
                      <div className="space-y-1.5">
                        {section.tips.map((tip, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <CheckCircle2 size={12} className="text-brand-green shrink-0 mt-0.5" />
                            <span className="text-xs text-brand-green">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-info" />
              <p className="text-sm font-bold text-navy">Your Rights During the Interview</p>
            </div>
            <div className="space-y-2">
              {[
                "You can have a representative present (and you should)",
                "You can request to reschedule if you need more time to prepare",
                "You do not have to answer questions that could incriminate you",
                "You can request a copy of the completed Form 4180",
                "You have 60 days to appeal an adverse determination",
              ].map((right, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{right}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
