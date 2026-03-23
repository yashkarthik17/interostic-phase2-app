"use client";
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
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface FilingYear {
  year: string;
  status: "filed" | "unfiled" | "sfr";
  actions: { label: string; href: string; variant: "primary" | "outline" | "ghost" }[];
}

const filingYears: FilingYear[] = [
  {
    year: "2023",
    status: "unfiled",
    actions: [
      { label: "File Now", href: "/tax-filing/2023", variant: "primary" },
    ],
  },
  {
    year: "2022",
    status: "sfr",
    actions: [
      { label: "File Now", href: "/tax-filing/2022", variant: "primary" },
      { label: "View SFR", href: "#", variant: "ghost" },
    ],
  },
  {
    year: "2021",
    status: "filed",
    actions: [
      { label: "View", href: "#", variant: "outline" },
      { label: "Amend", href: "#", variant: "ghost" },
    ],
  },
];

function statusConfig(status: FilingYear["status"]) {
  switch (status) {
    case "filed":
      return {
        badge: "success" as const,
        label: "Filed",
        icon: CheckCircle2,
        iconColor: "green" as const,
      };
    case "unfiled":
      return {
        badge: "danger" as const,
        label: "Unfiled",
        icon: AlertCircle,
        iconColor: "red" as const,
      };
    case "sfr":
      return {
        badge: "warning" as const,
        label: "SFR",
        icon: AlertTriangle,
        iconColor: "warning" as const,
      };
  }
}

export default function TaxFilingPage() {
  return (
    <AppShell>
      <ScreenHeader title="Tax Filing" backHref="/dashboard" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Info Card */}
        <div className="animate-fade-up delay-1">
          <ContextCard icon={Info} title="Filing Compliance" variant="blue">
            Filing all outstanding returns is required before the IRS will
            consider most resolution options. Let&apos;s get you current.
          </ContextCard>
        </div>

        {/* Filing Status By Year */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Filing Status by Year" subtitle="Complete any unfiled returns to qualify for resolution" />
          <div className="space-y-3">
            {filingYears.map((fy, i) => {
              const config = statusConfig(fy.status);
              return (
                <div
                  key={fy.year}
                  className={`animate-fade-up delay-${i + 2}`}
                >
                  <Card>
                    <div className="flex items-start gap-3.5 mb-3.5">
                      <IconCircle
                        icon={config.icon}
                        color={config.iconColor}
                        size={42}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-base font-bold text-navy">
                            Tax Year {fy.year}
                          </p>
                          <Badge variant={config.badge}>
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted">
                          {fy.status === "filed"
                            ? "Return filed and accepted by the IRS."
                            : fy.status === "sfr"
                            ? "IRS filed a Substitute for Return on your behalf."
                            : "No return on file. Filing is required."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {fy.actions.map((action) => (
                        <Button
                          key={action.label}
                          href={action.href}
                          variant={action.variant}
                          full={fy.actions.length === 1}
                          className="!py-2.5 !text-xs"
                        >
                          {action.variant === "primary" && (
                            <FileText size={14} />
                          )}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="animate-fade-up delay-5">
          <Card className="!bg-navy">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-black text-white">1</p>
                <p className="text-[0.5625rem] font-semibold text-white/50">
                  Filed
                </p>
              </div>
              <div>
                <p className="text-xl font-black text-brand-red">1</p>
                <p className="text-[0.5625rem] font-semibold text-white/50">
                  Unfiled
                </p>
              </div>
              <div>
                <p className="text-xl font-black text-warning">1</p>
                <p className="text-[0.5625rem] font-semibold text-white/50">
                  SFR
                </p>
              </div>
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
