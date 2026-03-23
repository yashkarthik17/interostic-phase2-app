"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenContent,
  Card,
  Badge,
  IconCircle,
  Button,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import Image from "next/image";
import { sampleCases, formatCurrency, defaultProfile } from "@/lib/store";
import {
  Sparkles,
  BarChart3,
  Briefcase,
  FileText,
  MessageCircle,
  ChevronRight,
  Bell,
  TrendingDown,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Bot,
} from "lucide-react";

const quickActions = [
  {
    label: "New Analysis",
    href: "/analysis",
    icon: BarChart3,
    color: "blue" as const,
  },
  {
    label: "My Cases",
    href: "/cases",
    icon: Briefcase,
    color: "violet" as const,
  },
  {
    label: "Tax Filing",
    href: "/tax-filing",
    icon: FileText,
    color: "teal" as const,
  },
  {
    label: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
    color: "green" as const,
  },
];

const recentActivity = [
  {
    icon: Upload,
    iconColor: "blue" as const,
    title: "Transcript uploaded",
    subtitle: "2021-2023 IRS Account Transcripts",
    time: "2 hours ago",
  },
  {
    icon: CheckCircle2,
    iconColor: "green" as const,
    title: "Case #1042 updated",
    subtitle: "OIC application moved to review",
    time: "Yesterday",
  },
  {
    icon: AlertTriangle,
    iconColor: "warning" as const,
    title: "Payment reminder",
    subtitle: "Installment payment due Mar 28",
    time: "2 days ago",
  },
];

const suggestedPrompts = [
  "What options do I have?",
  "Explain my transcript",
  "Penalty relief options",
];

export default function DashboardPage() {
  const activeCase = sampleCases[0];
  const totalDebt = activeCase.totalDebt;
  const taxYears = activeCase.years.length;

  return (
    <AppShell>
      {/* Custom header with logo + notification bell */}
      <header className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 bg-white border-b border-border shrink-0">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="BlastTax" width={120} height={40} className="md:hidden h-8 w-auto" />
          <div>
            <p className="text-xs font-semibold text-muted">Welcome back</p>
            <h1 className="text-lg font-bold text-navy">
              {defaultProfile.firstName} {defaultProfile.lastName}
            </h1>
          </div>
        </div>
        <Link
          href="/notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-surface-alt transition-colors"
        >
          <Bell size={20} className="text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white" />
        </Link>
      </header>

      <ScreenContent className="space-y-5 pt-2">
        {/* Hero Card — warm navy gradient with brand color decorative circles */}
        <div className="animate-fade-up delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-dark p-6">
            {/* Decorative circles — brand colors */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-blue/15" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-red/15" />
            <div className="absolute top-4 right-12 w-16 h-16 rounded-full bg-brand-blue/10" />
            <div className="absolute bottom-8 right-24 w-8 h-8 rounded-full bg-brand-red/10" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-brand-green" />
                <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                  AI-Powered
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1.5">
                Start Your Tax Resolution
              </h2>
              <p className="text-sm text-white/60 mb-5 leading-relaxed">
                Get a personalized analysis of your tax situation and discover
                your best resolution options.
              </p>
              <Button href="/analysis" variant="primary" full={false}>
                Begin Analysis
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Debt Overview Card — urgent red accent */}
        <div className="animate-fade-up delay-2">
          <Card className="!border-l-[3px] !border-l-brand-red">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-1">
                  Total Tax Debt
                </p>
                <p className="text-3xl font-black text-navy tracking-tight">
                  {formatCurrency(totalDebt)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-red-light">
                <TrendingDown size={13} className="text-brand-red" />
                <span className="text-[0.6875rem] font-bold text-brand-red">
                  {taxYears} tax years
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {activeCase.years.map((year) => (
                <span
                  key={year}
                  className="px-2.5 py-1 rounded-lg bg-surface-alt text-xs font-semibold text-muted"
                >
                  {year}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Quick Actions" accent="blue" />
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, href, icon, color }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2.5 p-4 bg-white border border-border rounded-2xl shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-card)] active:scale-[0.97]"
              >
                <IconCircle icon={icon} color={color} size={44} />
                <span className="text-xs font-bold text-navy">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="Recent Activity" accent="green" />
          <Card className="!p-0 divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 px-5 py-3.5">
                <IconCircle icon={item.icon} color={item.iconColor} size={38} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted truncate">{item.subtitle}</p>
                </div>
                <span className="flex items-center gap-1 text-[0.625rem] font-semibold text-placeholder whitespace-nowrap">
                  <Clock size={10} />
                  {item.time}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* AI Assistant Preview — ContextCard with gradient */}
        <div className="animate-fade-up delay-5">
          <ContextCard icon={Bot} title="AI Assistant" variant="green">
            <p className="mb-3">Ask anything about your tax situation, IRS notices, or resolution options.</p>
            <div className="flex flex-wrap gap-2 mb-3.5">
              {suggestedPrompts.map((prompt) => (
                <Link
                  key={prompt}
                  href="/chat"
                  className="px-3 py-1.5 bg-white/80 border border-brand-green/15 rounded-full text-xs font-semibold text-navy shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:border-brand-green/30 transition-all duration-200"
                >
                  {prompt}
                </Link>
              ))}
            </div>
            <Button href="/chat" variant="outline" full>
              <MessageCircle size={16} />
              Open Chat
            </Button>
          </ContextCard>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
