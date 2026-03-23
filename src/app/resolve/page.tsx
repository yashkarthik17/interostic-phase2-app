"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  SectionHeader,
  IconCircle,
} from "@/components/ui/shell";

import {
  BarChart3,
  FileText,
  Briefcase,
  Send,
  FolderOpen,
  ScanSearch,
  ChevronRight,
} from "lucide-react";

const actionCards = [
  {
    icon: BarChart3,
    color: "blue" as const,
    title: "Tax Resolution Analysis",
    description: "AI-powered analysis of your tax situation and resolution options",
    href: "/analysis",
  },
  {
    icon: FileText,
    color: "teal" as const,
    title: "Tax Filing",
    description: "File delinquent returns or amend previous filings",
    href: "/tax-filing",
  },
  {
    icon: Briefcase,
    color: "violet" as const,
    title: "My Cases",
    description: "Track progress on your active resolution cases",
    href: "/cases",
  },
  {
    icon: Send,
    color: "green" as const,
    title: "Submission Tracker",
    description: "Monitor the status of forms and documents sent to the IRS",
    href: "/submissions",
  },
  {
    icon: FolderOpen,
    color: "warning" as const,
    title: "Document Center",
    description: "Store and organize your tax documents securely",
    href: "/documents",
  },
  {
    icon: ScanSearch,
    color: "red" as const,
    title: "Notice Decoder",
    description: "Upload an IRS notice and we decode what it means",
    href: "/resolve/notice-decoder",
  },
];

export default function ResolvePage() {
  return (
    <AppShell>
      <ScreenHeader title="Resolution Center" />

      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up">
          <SectionHeader
            title="Resolution Tools"
            subtitle="Tools and resources to help resolve your tax situation."
            accent="blue"
          />
        </div>

        {actionCards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="animate-fade-up flex items-center gap-4 p-4 bg-white border border-border rounded-2xl shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-card)] active:scale-[0.99]"
            style={{ animationDelay: `${(i + 1) * 0.06}s` }}
          >
            <IconCircle icon={card.icon} color={card.color} size={46} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">{card.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {card.description}
              </p>
            </div>
            <ChevronRight size={18} className="text-placeholder shrink-0" />
          </Link>
        ))}
      </ScreenContent>
    </AppShell>
  );
}
