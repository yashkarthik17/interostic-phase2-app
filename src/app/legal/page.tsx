"use client";
import Link from "next/link";
import { AppShell, ScreenHeader, ScreenContent, Card, IconCircle } from "@/components/ui/shell";
import { FileText, Shield, AlertTriangle, ChevronRight } from "lucide-react";

const legalPages = [
  {
    href: "/legal/terms",
    icon: FileText,
    color: "blue" as const,
    title: "Terms of Service",
    subtitle: "Usage terms and conditions for BlastTax",
  },
  {
    href: "/legal/privacy",
    icon: Shield,
    color: "green" as const,
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your data",
  },
  {
    href: "/legal/disclaimer",
    icon: AlertTriangle,
    color: "warning" as const,
    title: "Legal Disclaimer",
    subtitle: "Important limitations and notices",
  },
];

export default function LegalPage() {
  return (
    <AppShell>
      <ScreenHeader title="Legal" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <p className="text-sm text-muted leading-relaxed mb-4">
            Review our legal documents below. These govern your use of BlastTax and explain how we handle your information.
          </p>
        </div>

        <div className="animate-fade-up delay-2 space-y-2.5">
          {legalPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="!p-4 mb-2.5">
                <div className="flex items-center gap-3.5">
                  <IconCircle icon={page.icon} color={page.color} size={42} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy">{page.title}</p>
                    <p className="text-xs text-muted mt-0.5">{page.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="text-placeholder shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="animate-fade-up delay-3 pt-4">
          <p className="text-[0.625rem] text-placeholder text-center leading-relaxed">
            Last updated: March 1, 2026. If you have questions about these documents, contact us at legal@blasttax.com.
          </p>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
