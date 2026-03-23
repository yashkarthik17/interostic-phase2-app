"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  EmptyState,
} from "@/components/ui/shell";
import { FileText, Download, Filter } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
  description: string;
}

const invoices: Invoice[] = [
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$49.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$49.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$49.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$49.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$49.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$29.00", status: "Paid", description: "Pro Plan - First Month (Promo)" },
];

const dateRanges = ["All", "Last 3 months", "Last 6 months", "2025"];

export default function InvoicesPage() {
  const [selectedRange, setSelectedRange] = useState("All");

  const filteredInvoices = invoices.filter((inv) => {
    if (selectedRange === "All") return true;
    if (selectedRange === "Last 3 months") {
      return inv.date.includes("2026");
    }
    if (selectedRange === "Last 6 months") {
      return inv.date.includes("2026") || inv.date.includes("Dec") || inv.date.includes("Nov") || inv.date.includes("Oct");
    }
    if (selectedRange === "2025") {
      return inv.date.includes("2025");
    }
    return true;
  });

  return (
    <AppShell hideNav>
      <ScreenHeader title="Invoices" backHref="/billing" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Filter */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center gap-2 mb-1">
            <Filter size={13} className="text-muted" />
            <span className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
              Filter
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dateRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedRange(range)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedRange === range
                    ? "bg-navy text-white"
                    : "bg-surface-alt text-muted border border-border hover:border-border-strong"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Invoice List */}
        <div className="animate-fade-up delay-2">
          <Card className="!p-0 divide-y divide-border">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center gap-3.5 px-5 py-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light">
                  <FileText size={18} className="text-brand-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-navy">{invoice.description}</p>
                    <Badge variant={invoice.status === "Paid" ? "success" : "warning"}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted">
                    {invoice.id} &middot; {invoice.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-navy">{invoice.amount}</span>
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface-alt transition-colors"
                  >
                    <Download size={15} className="text-brand-blue" />
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {filteredInvoices.length === 0 && (
          <EmptyState
            icon={FileText}
            title="No invoices found"
            description="Try adjusting your filter to see more invoices."
          />
        )}
      </ScreenContent>
    </AppShell>
  );
}
