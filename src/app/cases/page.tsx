"use client";
import { useState } from "react";
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
import { sampleCases, formatCurrency, type TaxCase } from "@/lib/store";
import { Briefcase, ChevronRight, Inbox } from "lucide-react";

const filters = ["All", "Active", "Pending", "Resolved"] as const;
type Filter = (typeof filters)[number];

function statusVariant(s: TaxCase["status"]) {
  if (s === "active") return "success" as const;
  if (s === "pending") return "warning" as const;
  return "info" as const;
}

export default function CasesPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All"
      ? sampleCases
      : sampleCases.filter(
          (c) => c.status === filter.toLowerCase()
        );

  return (
    <AppShell>
      <ScreenHeader title="My Cases" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Section Header */}
        <div className="animate-fade-up">
          <SectionHeader title="Your Cases" subtitle="Track and manage your tax resolution cases" />
        </div>

        {/* Filter Tabs */}
        <div className="animate-fade-up delay-1">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  filter === f
                    ? "bg-brand-blue text-white shadow-[var(--shadow-card)] border-brand-blue"
                    : "bg-white text-muted border-border hover:border-brand-blue hover:text-brand-blue hover:shadow-[var(--shadow-card)]"
                }`}
              >
                {f}
                {f !== "All" && (
                  <span className={`ml-1.5 text-[0.5625rem] ${filter === f ? "text-white/70" : "text-placeholder"}`}>
                    {sampleCases.filter((c) => c.status === f.toLowerCase()).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Case Cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No cases found"
            description={`No ${filter.toLowerCase()} cases to display right now. Start a resolution to create your first case.`}
            actionLabel="Start Resolution"
            actionHref="/resolve"
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <Link key={c.id} href={`/cases/${c.id}`} className="block">
                <div
                  className={`animate-fade-up delay-${i + 2}`}
                >
                  <Card className="!p-0 overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center">
                            <Briefcase
                              size={18}
                              className="text-navy"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy">
                              Case #{c.id}
                            </p>
                            <p className="text-xs text-muted">
                              {c.resolution}
                            </p>
                          </div>
                        </div>
                        <Badge variant={statusVariant(c.status)}>
                          {c.status.charAt(0).toUpperCase() +
                            c.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-0.5">
                            Total Debt
                          </p>
                          <p className="text-lg font-black text-navy">
                            {formatCurrency(c.totalDebt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.6875rem] font-semibold text-muted uppercase tracking-wider mb-0.5">
                            Tax Years
                          </p>
                          <div className="flex gap-1">
                            {c.years.map((y) => (
                              <span
                                key={y}
                                className="px-2 py-0.5 rounded-md bg-surface-alt text-[0.625rem] font-semibold text-muted"
                              >
                                {y}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-1.5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[0.625rem] font-semibold text-muted">
                            Progress
                          </span>
                          <span className="text-[0.625rem] font-bold text-navy">
                            {c.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${c.progress}%`,
                              background:
                                c.status === "resolved"
                                  ? "var(--color-brand-green)"
                                  : c.status === "active"
                                  ? "var(--color-brand-blue)"
                                  : "var(--color-warning)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[0.625rem] text-placeholder">
                          Created {c.createdAt}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-placeholder"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScreenContent>
    </AppShell>
  );
}
