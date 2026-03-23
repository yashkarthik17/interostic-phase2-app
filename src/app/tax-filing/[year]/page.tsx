"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  FormInput,
  IconCircle,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { defaultProfile } from "@/lib/store";
import {
  User,
  Shield,
  DollarSign,
  FileText,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";

interface FilingSection {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  href: string;
  complete: boolean;
}

export default function TaxFilingYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const [step] = useState(1);
  const totalSteps = 8;

  const sections: FilingSection[] = [
    {
      id: "personal",
      label: "Personal Information",
      description: "Name, SSN, filing status, address",
      icon: User,
      iconColor: "blue",
      href: "#",
      complete: true,
    },
    {
      id: "taxpayer",
      label: "Taxpayer Details",
      description: "Dependents, spouse info, employment",
      icon: FileText,
      iconColor: "violet",
      href: "#",
      complete: false,
    },
    {
      id: "security",
      label: "Identity Verification",
      description: "PIN, prior year AGI, security questions",
      icon: Shield,
      iconColor: "navy",
      href: "#",
      complete: false,
    },
    {
      id: "income",
      label: "Income",
      description: "W-2s, 1099s, other income sources",
      icon: DollarSign,
      iconColor: "green",
      href: `/tax-filing/${year}/income`,
      complete: false,
    },
    {
      id: "deductions",
      label: "Deductions",
      description: "Standard or itemized deductions",
      icon: FileText,
      iconColor: "teal",
      href: `/tax-filing/${year}/deductions`,
      complete: false,
    },
    {
      id: "credits",
      label: "Credits",
      description: "Eligible tax credits",
      icon: DollarSign,
      iconColor: "green",
      href: `/tax-filing/${year}/credits`,
      complete: false,
    },
    {
      id: "review",
      label: "Review & Submit",
      description: "Review all info before filing",
      icon: CheckCircle2,
      iconColor: "green",
      href: `/tax-filing/${year}/review`,
      complete: false,
    },
  ];

  const completedCount = sections.filter((s) => s.complete).length;
  const progressValue = Math.round((completedCount / sections.length) * 100);

  return (
    <AppShell hideNav>
      <ScreenHeader
        title={`Tax Filing - ${year}`}
        backHref="/tax-filing"
      />

      <ProgressBar
        value={progressValue}
        steps={`Step ${step} of ${totalSteps}`}
        label={`${completedCount} of ${sections.length} complete`}
      />

      <ScreenContent className="space-y-4 pt-3">
        {/* Pre-filled Info Card */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <IconCircle icon={User} color="blue" size={38} />
              <div>
                <p className="text-sm font-bold text-navy">
                  {defaultProfile.firstName} {defaultProfile.lastName}
                </p>
                <p className="text-xs text-muted">
                  {defaultProfile.filingStatus} &middot; SSN{" "}
                  {defaultProfile.ssn}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Address</span>
                <span className="font-medium text-navy text-right">
                  {defaultProfile.address.street},{" "}
                  {defaultProfile.address.city},{" "}
                  {defaultProfile.address.state}{" "}
                  {defaultProfile.address.zip}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Filing Status</span>
                <span className="font-medium text-navy">
                  {defaultProfile.filingStatus}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Dependents</span>
                <span className="font-medium text-navy">
                  {defaultProfile.dependents}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filing Sections Navigation */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Filing Sections" subtitle={`${completedCount} of ${sections.length} sections complete`} />
          <Card className="!p-0 divide-y divide-border overflow-hidden">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-surface-alt active:bg-border/50"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    section.complete
                      ? "bg-brand-green-light"
                      : "bg-surface-alt"
                  }`}
                >
                  {section.complete ? (
                    <CheckCircle2
                      size={16}
                      className="text-brand-green"
                    />
                  ) : (
                    <Circle size={16} className="text-placeholder" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      section.complete ? "text-brand-green" : "text-navy"
                    }`}
                  >
                    {section.label}
                  </p>
                  <p className="text-[0.625rem] text-muted truncate">
                    {section.description}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-placeholder shrink-0"
                />
              </Link>
            ))}
          </Card>
        </div>

        {/* Security note */}
        <div className="animate-fade-up delay-3">
          <ContextCard icon={Lock} title="Your Data is Secure" variant="green">
            Your data is encrypted and never shared without your consent. All filings are transmitted securely.
          </ContextCard>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
