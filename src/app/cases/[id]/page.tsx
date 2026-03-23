"use client";
import { use } from "react";
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
  sampleCases,
  sampleResolutions,
  formatCurrency,
} from "@/lib/store";
import {
  MessageCircle,
  Phone,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronRight,
  TrendingDown,
  Pencil,
  StickyNote,
} from "lucide-react";

const quickActions = [
  { label: "Message Expert", icon: MessageCircle, color: "green" as const, href: "/chat" },
  { label: "Call", icon: Phone, color: "blue" as const, href: "#" },
  { label: "Documents", icon: FileText, color: "violet" as const, href: "/documents" },
  { label: "More", icon: MoreHorizontal, color: "navy" as const, href: "#" },
];

interface MilestoneItem {
  label: string;
  date: string;
  status: "complete" | "current" | "upcoming";
}

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const caseData = sampleCases.find((c) => c.id === id) ?? sampleCases[0];
  const resolution = sampleResolutions.find(
    (r) => r.shortName === caseData.type
  ) ?? sampleResolutions[0];

  const statusVariant =
    caseData.status === "active"
      ? ("success" as const)
      : caseData.status === "pending"
      ? ("warning" as const)
      : ("info" as const);

  const milestones: MilestoneItem[] = [
    { label: "Case opened", date: caseData.createdAt, status: "complete" },
    { label: "Documents gathered", date: "2026-02-10", status: "complete" },
    { label: "Application submitted", date: "2026-02-28", status: caseData.progress >= 60 ? "complete" : "upcoming" },
    { label: "IRS review in progress", date: "Current", status: caseData.progress >= 60 && caseData.progress < 100 ? "current" : caseData.progress >= 100 ? "complete" : "upcoming" },
    { label: "Decision & resolution", date: "~Sep 2026", status: caseData.progress >= 100 ? "complete" : "upcoming" },
  ];

  const keyDates = [
    { label: "Case Opened", value: caseData.createdAt },
    { label: "Last Update", value: "2026-03-18" },
    { label: "Next Deadline", value: "2026-04-15" },
    { label: "Est. Resolution", value: "~Sep 2026" },
  ];

  return (
    <AppShell>
      <ScreenHeader title={`Case #${caseData.id}`} backHref="/cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Status + Type Header */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-1">
                  Resolution Type
                </p>
                <p className="text-base font-bold text-navy">
                  {resolution.name}
                </p>
              </div>
              <Badge variant={statusVariant}>
                {caseData.status.charAt(0).toUpperCase() +
                  caseData.status.slice(1)}
              </Badge>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {resolution.description}
            </p>
          </Card>
        </div>

        {/* Savings Display */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider">
                Potential Savings
              </p>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green-light">
                <TrendingDown size={13} className="text-brand-green" />
                <span className="text-[0.6875rem] font-bold text-brand-green">
                  {resolution.savingsPercent}% off
                </span>
              </div>
            </div>
            <p className="text-2xl font-black text-brand-green mb-1">
              {formatCurrency(resolution.savings)} saved
            </p>
            <p className="text-xs text-muted">
              Original debt: {formatCurrency(caseData.totalDebt)}
            </p>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[0.625rem] font-semibold text-muted">
                  Case Progress
                </span>
                <span className="text-[0.625rem] font-bold text-navy">
                  {caseData.progress}%
                </span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-700"
                  style={{ width: `${caseData.progress}%` }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Quick Actions" subtitle="Common tasks for this case" accent="green" />
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map(({ label, icon, color, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 p-3 bg-white border border-border rounded-2xl shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
              >
                <IconCircle icon={icon} color={color} size={36} />
                <span className="text-[0.5625rem] font-bold text-navy text-center leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="Timeline" subtitle="Case milestones and progress" accent="blue" />
          <Card className="!p-4">
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-3">
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        m.status === "complete"
                          ? "bg-brand-green text-white shadow-[var(--shadow-glow-green)]"
                          : m.status === "current"
                          ? "bg-brand-blue text-white ring-[3px] ring-brand-blue/20 shadow-[var(--shadow-glow-blue)]"
                          : "bg-border text-muted"
                      }`}
                    >
                      {m.status === "complete" ? (
                        <CheckCircle2
                          size={14}
                          className="text-white"
                        />
                      ) : m.status === "current" ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <Clock size={12} className="text-muted-light" />
                      )}
                    </div>
                    {i < milestones.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 min-h-6 ${
                          m.status === "complete"
                            ? "bg-brand-green/30"
                            : "bg-border"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4">
                    <p
                      className={`text-sm font-semibold ${
                        m.status === "upcoming"
                          ? "text-placeholder"
                          : "text-navy"
                      }`}
                    >
                      {m.label}
                    </p>
                    <p className="text-[0.625rem] text-muted">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Dates */}
        <div className="animate-fade-up delay-5">
          <SectionHeader title="Key Dates" accent="red" />
          <Card className="!p-0 divide-y divide-border">
            {keyDates.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-muted" />
                  <span className="text-sm font-medium text-navy">
                    {d.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-muted">
                  {d.value}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* Action Links */}
        <div className="animate-fade-up delay-6 space-y-3 pb-2">
          <Link
            href={`/submissions/${caseData.id}`}
            className="flex items-center justify-between p-4 bg-navy-light rounded-2xl transition-all duration-200 hover:bg-navy/10 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-navy" />
              <span className="text-sm font-bold text-navy">
                View Submission Status
              </span>
            </div>
            <ChevronRight size={16} className="text-navy" />
          </Link>

          <Link
            href={`/cases/${caseData.id}/notes`}
            className="flex items-center justify-between p-4 bg-surface-alt border border-border rounded-2xl transition-all duration-200 hover:border-border-strong active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <StickyNote size={18} className="text-muted" />
              <span className="text-sm font-bold text-navy">
                Case Notes
              </span>
            </div>
            <ChevronRight size={16} className="text-placeholder" />
          </Link>

          <Link
            href={`/cases/${caseData.id}/edit`}
            className="flex items-center justify-between p-4 bg-surface-alt border border-border rounded-2xl transition-all duration-200 hover:border-border-strong active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <Pencil size={18} className="text-muted" />
              <span className="text-sm font-bold text-navy">
                Edit Case Info
              </span>
            </div>
            <ChevronRight size={16} className="text-placeholder" />
          </Link>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
