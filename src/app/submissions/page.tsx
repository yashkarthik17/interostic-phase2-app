"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  SectionHeader,
  EmptyState,
} from "@/components/ui/shell";
import { sampleCases, formatCurrency } from "@/lib/store";
import { ChevronRight, Inbox, FileText } from "lucide-react";

interface SubmissionInfo {
  caseId: string;
  caseType: string;
  resolution: string;
  submittedDate: string;
  currentStep: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
}

const submissions: SubmissionInfo[] = [
  {
    caseId: "1042",
    caseType: "OIC",
    resolution: "Offer in Compromise",
    submittedDate: "2026-02-28",
    currentStep: "Assigned to Examiner",
    progress: 60,
    totalSteps: 5,
    completedSteps: 3,
  },
  {
    caseId: "1038",
    caseType: "IA",
    resolution: "Installment Agreement",
    submittedDate: "2026-03-05",
    currentStep: "Approval Pending",
    progress: 85,
    totalSteps: 4,
    completedSteps: 3,
  },
];

function DonutProgress({ progress, size = 56 }: { progress: number; size?: number }) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-black text-navy">{progress}%</span>
      </div>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <AppShell>
      <ScreenHeader title="Submission Tracker" backHref="/dashboard" />

      <ScreenContent className="space-y-4 pt-1">
        {submissions.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No active submissions"
            description="When you submit a case to the IRS, you can track its progress here."
            actionLabel="View Cases"
            actionHref="/cases"
          />
        ) : (
          <>
            <div className="animate-fade-up delay-1">
              <SectionHeader title="Active Submissions" subtitle={`${submissions.length} submission${submissions.length > 1 ? "s" : ""} in progress`} accent="green" />
            </div>

            {submissions.map((sub, i) => (
              <Link
                key={sub.caseId}
                href={`/submissions/${sub.caseId}`}
                className="block"
              >
                <div className={`animate-fade-up delay-${i + 2}`}>
                  <Card>
                    <div className="flex gap-4">
                      <DonutProgress progress={sub.progress} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-navy">
                            {sub.resolution}
                          </p>
                          <ChevronRight
                            size={16}
                            className="text-placeholder shrink-0"
                          />
                        </div>
                        <p className="text-xs text-muted mb-2">
                          Case #{sub.caseId} &middot; Submitted{" "}
                          {sub.submittedDate}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="info">{sub.caseType}</Badge>
                          <span className="text-[0.625rem] font-semibold text-brand-green">
                            {sub.currentStep}
                          </span>
                        </div>
                        <div className="mt-2.5">
                          <div className="h-1 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-green rounded-full transition-all duration-700"
                              style={{
                                width: `${
                                  (sub.completedSteps / sub.totalSteps) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <p className="text-[0.5625rem] text-muted mt-1">
                            Step {sub.completedSteps} of {sub.totalSteps}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
            ))}
          </>
        )}
      </ScreenContent>
    </AppShell>
  );
}
