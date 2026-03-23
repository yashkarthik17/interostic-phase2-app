"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  IconCircle,
  SectionHeader,
} from "@/components/ui/shell";
import { FileText, ChevronRight, Scale, Shield, BookOpen } from "lucide-react";

const agreements = [
  {
    title: "Terms of Service",
    description: "General terms governing use of our platform",
    date: "Updated Jan 15, 2026",
    icon: FileText,
    color: "blue" as const,
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    date: "Updated Jan 15, 2026",
    icon: Shield,
    color: "green" as const,
  },
  {
    title: "Subscription Agreement",
    description: "Terms specific to paid subscription plans",
    date: "Updated Dec 1, 2025",
    icon: BookOpen,
    color: "violet" as const,
  },
  {
    title: "Service Level Agreement",
    description: "Uptime commitments and support response times",
    date: "Updated Nov 10, 2025",
    icon: Scale,
    color: "teal" as const,
  },
  {
    title: "Data Processing Agreement",
    description: "How we handle your tax data and sensitive information",
    date: "Updated Jan 15, 2026",
    icon: FileText,
    color: "navy" as const,
  },
];

export default function AgreementsPage() {
  return (
    <AppShell hideNav>
      <ScreenHeader title="Service Agreements" backHref="/billing" />

      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <SectionHeader title="Legal Documents" subtitle="Review the agreements that govern your use of our services" />

          <Card className="!p-0 divide-y divide-border">
            {agreements.map((agreement) => (
              <button
                key={agreement.title}
                type="button"
                className="flex items-center gap-3.5 px-5 py-4 w-full text-left hover:bg-surface-alt transition-colors"
              >
                <IconCircle icon={agreement.icon} color={agreement.color} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">{agreement.title}</p>
                  <p className="text-xs text-muted truncate">{agreement.description}</p>
                  <p className="text-[0.625rem] text-placeholder mt-0.5">{agreement.date}</p>
                </div>
                <ChevronRight size={16} className="text-placeholder shrink-0" />
              </button>
            ))}
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
