"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  IconCircle,
  SectionHeader,
} from "@/components/ui/shell";
import {
  CreditCard,
  Receipt,
  ArrowRightLeft,
  XCircle,
  ChevronRight,
  Zap,
  Calendar,
  DollarSign,
} from "lucide-react";

const quickLinks = [
  { label: "View Plans", href: "/billing/plans", icon: Zap, color: "blue" as const },
  { label: "Payment Methods", href: "/billing/methods", icon: CreditCard, color: "violet" as const },
  { label: "Invoices", href: "/billing/invoices", icon: Receipt, color: "teal" as const },
  { label: "Cancel Plan", href: "/billing/cancel", icon: XCircle, color: "red" as const },
];

const recentCharges = [
  { date: "Mar 1, 2026", description: "Pro Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Feb 1, 2026", description: "Pro Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Jan 1, 2026", description: "Pro Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Dec 1, 2025", description: "Pro Plan - Monthly", amount: "$49.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <AppShell>
      <ScreenHeader title="Billing" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Current Plan Card */}
        <div className="animate-fade-up delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-navy p-6">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-green/10" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-brand-green" />
                  <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                    Current Plan
                  </span>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">Pro Plan</h2>
              <p className="text-2xl font-black text-white">
                $49<span className="text-sm font-semibold text-white/50">/month</span>
              </p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <Calendar size={14} className="text-white/40" />
                <span className="text-xs font-medium text-white/50">
                  Billing cycle: Mar 1 - Mar 31, 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Manage" subtitle="Your billing options" />
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map(({ label, href, icon, color }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2.5 p-4 bg-white border border-border rounded-2xl shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
              >
                <IconCircle icon={icon} color={color} size={44} />
                <span className="text-xs font-bold text-navy">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Charges */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Recent Charges" accent="green" />
          <Card className="!p-0 divide-y divide-border">
            {recentCharges.map((charge, i) => (
              <div key={i} className="flex items-center gap-3.5 px-5 py-3.5">
                <IconCircle icon={DollarSign} color="green" size={38} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">{charge.description}</p>
                  <p className="text-xs text-muted">{charge.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-navy">{charge.amount}</p>
                  <p className="text-[0.625rem] font-semibold text-brand-green">{charge.status}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
