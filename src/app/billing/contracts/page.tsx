"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { FileText, Calendar, DollarSign, ChevronRight } from "lucide-react";

interface Contract {
  id: string;
  name: string;
  status: "Active" | "Expired" | "Pending";
  startDate: string;
  endDate: string;
  value: string;
}

const contracts: Contract[] = [
  {
    id: "CTR-001",
    name: "Pro Plan Subscription",
    status: "Active",
    startDate: "Jan 1, 2026",
    endDate: "Dec 31, 2026",
    value: "$588.00/yr",
  },
  {
    id: "CTR-002",
    name: "Expert Consultation Package",
    status: "Active",
    startDate: "Feb 15, 2026",
    endDate: "May 15, 2026",
    value: "$299.00",
  },
  {
    id: "CTR-003",
    name: "IRS Representation Agreement",
    status: "Pending",
    startDate: "Mar 10, 2026",
    endDate: "Mar 10, 2027",
    value: "$1,500.00",
  },
];

const statusVariant: Record<string, "success" | "warning" | "info"> = {
  Active: "success",
  Expired: "warning",
  Pending: "info",
};

export default function ContractsPage() {
  return (
    <AppShell hideNav>
      <ScreenHeader title="Active Contracts" backHref="/billing" />

      <ScreenContent className="space-y-4 pt-2">
        {contracts.map((contract, idx) => (
          <div key={contract.id} className={`animate-fade-up delay-${idx + 1}`}>
            <Card>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light">
                    <FileText size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{contract.name}</p>
                    <p className="text-[0.625rem] text-placeholder">{contract.id}</p>
                  </div>
                </div>
                <Badge variant={statusVariant[contract.status]}>
                  {contract.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-muted" />
                  <div>
                    <p className="text-[0.625rem] text-placeholder">Period</p>
                    <p className="text-xs font-semibold text-navy">
                      {contract.startDate} - {contract.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={13} className="text-muted" />
                  <div>
                    <p className="text-[0.625rem] text-placeholder">Value</p>
                    <p className="text-xs font-bold text-navy">{contract.value}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-1.5 w-full mt-3 pt-3 border-t border-border text-xs font-bold text-brand-blue hover:text-navy transition-colors"
              >
                View Details
                <ChevronRight size={14} />
              </button>
            </Card>
          </div>
        ))}
      </ScreenContent>
    </AppShell>
  );
}
