"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
} from "@/components/ui/shell";
import { FileText, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FormItem {
  number: string;
  title: string;
  status: "not-started" | "in-progress" | "complete";
  href: string;
  description: string;
}

const forms: FormItem[] = [
  {
    number: "656",
    title: "Offer in Compromise Application",
    status: "in-progress",
    href: "/forms/656",
    description:
      "Submit an offer to settle your tax debt for less than the full amount owed.",
  },
  {
    number: "433-A",
    title: "Collection Information Statement",
    status: "complete",
    href: "/forms/656",
    description:
      "Individual financial statement used to evaluate your ability to pay.",
  },
  {
    number: "433-A(OIC)",
    title: "OIC Collection Information Statement",
    status: "in-progress",
    href: "/forms/656",
    description:
      "Financial statement specifically required for Offer in Compromise applications.",
  },
  {
    number: "9465",
    title: "Installment Agreement Request",
    status: "not-started",
    href: "/forms/9465",
    description:
      "Request to pay your tax debt in monthly installments over time.",
  },
  {
    number: "843",
    title: "Claim for Refund and Request for Abatement",
    status: "not-started",
    href: "/forms/843",
    description:
      "Request a refund or abatement of certain taxes, penalties, or interest.",
  },
  {
    number: "656-L",
    title: "OIC Lump Sum Certification",
    status: "not-started",
    href: "/forms/656",
    description:
      "Certification worksheet for lump sum offer payment calculations.",
  },
  {
    number: "433-B",
    title: "Business Collection Information Statement",
    status: "not-started",
    href: "/forms/656",
    description:
      "Financial statement for business entities with outstanding tax liabilities.",
  },
];

const statusConfig = {
  "not-started": { label: "Not Started", variant: "info" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const },
  complete: { label: "Complete", variant: "success" as const },
};

export default function FormsPage() {
  const [search, setSearch] = useState("");

  const filtered = forms.filter(
    (f) =>
      f.number.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <ScreenHeader title="IRS Forms" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Search */}
        <div className="animate-fade-up delay-1">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search forms..."
              className="w-full pl-11 pr-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-success-light rounded-full">
              <span className="text-[0.625rem] font-bold text-success">
                {forms.filter((f) => f.status === "complete").length} Complete
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-warning-light rounded-full">
              <span className="text-[0.625rem] font-bold text-amber-800">
                {forms.filter((f) => f.status === "in-progress").length} In
                Progress
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-alt rounded-full">
              <span className="text-[0.625rem] font-bold text-muted">
                {forms.filter((f) => f.status === "not-started").length} Not
                Started
              </span>
            </div>
          </div>
        </div>

        {/* Form Cards */}
        <div className="space-y-3">
          {filtered.map((form, i) => (
            <div
              key={form.number}
              className={`animate-fade-up delay-${Math.min(i + 2, 6)}`}
            >
              <Card>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light shrink-0">
                    <FileText size={18} className="text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-navy">
                        Form {form.number}
                      </p>
                      <Badge variant={statusConfig[form.status].variant}>
                        {statusConfig[form.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted font-semibold">
                      {form.title}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-3">
                  {form.description}
                </p>
                <Link
                  href={form.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-navy transition-colors"
                >
                  {form.status === "complete" ? "View Form" : "Fill Out"}
                  <ChevronRight size={14} />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
