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
import { Scale, ChevronDown, BookOpen } from "lucide-react";

const exceptions = [
  {
    code: "IRC 6651(a)(1)",
    title: "Failure to File - Reasonable Cause",
    description:
      "The penalty can be removed if the taxpayer shows the failure was due to reasonable cause and not willful neglect. The taxpayer must have exercised ordinary business care and prudence.",
    applies: "Failure to File penalty",
  },
  {
    code: "IRC 6651(a)(2)",
    title: "Failure to Pay - Reasonable Cause",
    description:
      "The payment penalty can be abated if the taxpayer demonstrates they could not pay despite exercising ordinary care. Financial hardship documentation is key.",
    applies: "Failure to Pay penalty",
  },
  {
    code: "IRC 6654(e)(3)",
    title: "Estimated Tax - Unusual Circumstances",
    description:
      "Underpayment of estimated tax penalty can be waived if the IRS determines that the underpayment was due to casualty, disaster, or other unusual circumstances and imposing the penalty would be against equity and good conscience.",
    applies: "Estimated Tax penalty",
  },
  {
    code: "IRC 6404(f)",
    title: "IRS Erroneous Written Advice",
    description:
      "If the IRS gave you written advice that caused the penalty, the penalty must be abated. You must have provided accurate information and reasonably relied on the advice.",
    applies: "Any penalty",
  },
  {
    code: "IRC 7508A",
    title: "Federally Declared Disaster",
    description:
      "The IRS can postpone certain tax deadlines for taxpayers affected by a federally declared disaster. Penalties for actions taken during the postponement period are abated.",
    applies: "Various penalties",
  },
  {
    code: "IRC 6404(e)",
    title: "IRS Ministerial or Managerial Acts",
    description:
      "Interest and penalties can be abated when they were caused by unreasonable errors or delays by an IRS employee performing a ministerial or managerial act.",
    applies: "Interest & penalties",
  },
];

export default function StatutoryPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <AppShell>
      <ScreenHeader title="Statutory Exceptions" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Federal tax law provides specific exceptions that require the IRS to
          remove penalties when certain conditions are met. These are not
          discretionary -- if you qualify, the IRS must abate.
        </p>

        <div className="animate-fade-up delay-1">
          <ContextCard icon={BookOpen} title="Statutory Authority" variant="blue">
            These provisions come directly from the Internal Revenue Code. Having
            statutory authority makes your case stronger.
          </ContextCard>
        </div>

        <div className="space-y-3">
          {exceptions.map((ex, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Scale size={14} className="text-teal shrink-0" />
                      <Badge variant="info">{ex.code}</Badge>
                    </div>
                    <p className="text-sm font-bold text-navy">{ex.title}</p>
                    <p className="text-xs text-muted mt-0.5">Applies to: {ex.applies}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 mt-1 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-navy leading-relaxed">{ex.description}</p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
