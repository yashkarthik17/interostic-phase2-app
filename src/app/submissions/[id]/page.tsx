"use client";
import { use, useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { sampleCases } from "@/lib/store";
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Shield,
} from "lucide-react";

interface Milestone {
  label: string;
  description: string;
  date: string;
  status: "complete" | "current" | "upcoming";
}

const milestones: Milestone[] = [
  {
    label: "Submitted",
    description: "Your application was received by the IRS.",
    date: "Feb 28, 2026",
    status: "complete",
  },
  {
    label: "Processability Check",
    description: "IRS confirmed your application meets all requirements.",
    date: "Mar 8, 2026",
    status: "complete",
  },
  {
    label: "Assigned to Examiner",
    description: "An IRS examiner has been assigned to review your case.",
    date: "Mar 18, 2026",
    status: "current",
  },
  {
    label: "Financial Review",
    description: "Examiner reviews your financials and proposed offer amount.",
    date: "Estimated May 2026",
    status: "upcoming",
  },
  {
    label: "Decision",
    description: "IRS issues acceptance, rejection, or counter-offer.",
    date: "~Sep 2026",
    status: "upcoming",
  },
];

const faqs = [
  {
    q: "How long does the OIC process take?",
    a: "The average OIC takes 6-12 months from submission to decision. Complex cases may take longer if additional documentation is requested.",
  },
  {
    q: "Can the IRS still collect while my offer is pending?",
    a: "No. Once your OIC is accepted for processing, the IRS must suspend most collection activities until a decision is made.",
  },
  {
    q: "What if my offer is rejected?",
    a: "You have 30 days to appeal the decision. Your expert will help you prepare an appeal or explore alternative resolution options.",
  },
  {
    q: "Will the examiner contact me directly?",
    a: "Typically no. Your authorized representative handles all communication with the IRS on your behalf.",
  },
];

function LargeDonutProgress({ progress }: { progress: number }) {
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-brand-green)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-navy">{progress}%</span>
        <span className="text-[0.625rem] font-semibold text-muted">Complete</span>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left px-5 py-3.5 transition-colors hover:bg-surface-alt"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <HelpCircle size={16} className="text-brand-blue mt-0.5 shrink-0" />
          <span className="text-sm font-semibold text-navy">{q}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div className="mt-3 ml-7 mr-2">
          <div className="rounded-xl bg-gradient-to-br from-brand-blue-50 to-brand-blue-light/60 border border-brand-blue/10 px-4 py-3">
            <p className="text-xs text-navy/80 leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const caseData = sampleCases.find((c) => c.id === id) ?? sampleCases[0];
  const progress = caseData.progress;
  const currentMilestone = milestones.find((m) => m.status === "current");

  return (
    <AppShell hideNav>
      <ScreenHeader
        title="Submission Status"
        backHref={`/cases/${caseData.id}`}
      />

      <ScreenContent className="space-y-4 pt-1">
        {/* Large Donut + Current Step */}
        <div className="animate-fade-up delay-1">
          <Card className="flex flex-col items-center text-center">
            <LargeDonutProgress progress={progress} />
            <div className="mt-4">
              <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-1">
                Current Step
              </p>
              <p className="text-base font-bold text-navy">
                {currentMilestone?.label ?? "In Progress"}
              </p>
              <p className="text-xs text-muted mt-1 max-w-[260px]">
                {currentMilestone?.description}
              </p>
            </div>
          </Card>
        </div>

        {/* Vertical Timeline */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Milestones" subtitle="Your submission progress with the IRS" accent="blue" />
          <Card className="!p-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-3">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      m.status === "complete"
                        ? "bg-brand-green text-white shadow-[var(--shadow-glow-green)]"
                        : m.status === "current"
                        ? "bg-brand-blue text-white ring-[3px] ring-brand-blue/20 shadow-[var(--shadow-glow-blue)]"
                        : "bg-border/80 text-muted-light"
                    }`}
                  >
                    {m.status === "complete" ? (
                      <CheckCircle2
                        size={15}
                        className="text-white"
                      />
                    ) : m.status === "current" ? (
                      <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                    ) : (
                      <Clock size={13} className="text-muted-light" />
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-8 ${
                        m.status === "complete"
                          ? "bg-brand-green/30"
                          : "bg-border"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-5">
                  <p
                    className={`text-sm font-bold ${
                      m.status === "upcoming"
                        ? "text-placeholder"
                        : m.status === "current"
                        ? "text-brand-blue"
                        : "text-navy"
                    }`}
                  >
                    {m.label}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {m.description}
                  </p>
                  <p
                    className={`text-[0.625rem] font-semibold mt-1 ${
                      m.status === "complete"
                        ? "text-brand-green"
                        : m.status === "current"
                        ? "text-brand-blue"
                        : "text-placeholder"
                    }`}
                  >
                    {m.date}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* FAQs */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Frequently Asked Questions" subtitle="Common questions about your submission" />
          <Card className="!p-0 divide-y divide-border overflow-hidden">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </Card>
        </div>

        {/* Contact Expert CTA */}
        <div className="animate-fade-up delay-4 pb-2">
          <Card className="!bg-navy text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <Shield size={22} className="text-brand-green" />
            </div>
            <p className="text-sm font-bold text-white mb-1">
              Have questions about your submission?
            </p>
            <p className="text-xs text-white/60 mb-4">
              Your tax expert is available to help.
            </p>
            <Button href="/chat" variant="primary" full>
              <MessageCircle size={16} />
              Contact Your Expert
            </Button>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
