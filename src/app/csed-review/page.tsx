"use client";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, SectionHeader, ContextCard } from "@/components/ui/shell";
import { Clock, AlertTriangle, Info, ChevronRight, CalendarDays, Shield } from "lucide-react";

const csedDates = [
  { year: "2021", assessed: "Apr 15, 2022", csed: "Apr 15, 2032", remaining: "6 years", amount: "$18,500" },
  { year: "2022", assessed: "Apr 18, 2023", csed: "Apr 18, 2033", remaining: "7 years", amount: "$15,250" },
  { year: "2023", assessed: "Apr 15, 2024", csed: "Apr 15, 2034", remaining: "8 years", amount: "$13,500" },
];

const tollingEvents = [
  { event: "Offer in Compromise (pending)", impact: "Tolls CSED while OIC is pending + 30 days after rejection", severity: "warning" as const },
  { event: "Installment Agreement Request", impact: "Tolls CSED while IA request is pending + 30 days", severity: "warning" as const },
  { event: "Collection Due Process Hearing", impact: "Tolls CSED while CDP hearing is pending", severity: "warning" as const },
  { event: "Bankruptcy Filing", impact: "Tolls CSED during bankruptcy + 6 months after discharge", severity: "danger" as const },
  { event: "Taxpayer Living Abroad", impact: "Tolls CSED for 6+ months of living outside the U.S.", severity: "info" as const },
  { event: "Innocent Spouse Relief Request", impact: "Tolls CSED while request is pending", severity: "info" as const },
];

const strategicImplications = [
  {
    title: "OIC may not be ideal if CSED is near",
    description: "If your collection statute expires within 2-3 years, pursuing CNC status may be more strategic than an OIC, as the OIC process itself tolls the clock.",
  },
  {
    title: "IA extends the effective collection window",
    description: "An Installment Agreement does not toll the CSED, but it does keep you making payments. Calculate whether full payoff before CSED is actually cheaper than an OIC.",
  },
  {
    title: "CNC preserves the CSED countdown",
    description: "Currently Not Collectible status does not toll the statute. If you qualify, this may be the best strategy to let the clock run while protecting your assets.",
  },
  {
    title: "Be strategic about timing",
    description: "Every action you take with the IRS can affect your CSED. Before filing any request, understand whether it will toll your statute and how that impacts your overall strategy.",
  },
];

export default function CSEDReviewPage() {
  return (
    <AppShell>
      <ScreenHeader title="CSED Review" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Explanation */}
        <div className="animate-fade-up delay-1">
          <div className="bg-navy rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-brand-green" />
              <span className="text-[0.6875rem] font-bold text-brand-green uppercase tracking-wider">
                10-Year Collection Window
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              The IRS generally has 10 years from the date of assessment to collect a tax debt. This is called the Collection Statute Expiration Date (CSED). After the CSED passes, the IRS can no longer legally collect that debt.
            </p>
          </div>
        </div>

        {/* Year-by-Year CSED Dates */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Your CSED Dates
          </p>
          <div className="space-y-2.5">
            {csedDates.map((item) => (
              <Card key={item.year} className="!p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-brand-blue" />
                    <span className="text-sm font-bold text-navy">Tax Year {item.year}</span>
                  </div>
                  <Badge variant="info">{item.remaining} left</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">Assessed</p>
                    <p className="text-xs font-bold text-navy mt-0.5">{item.assessed}</p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">Expires</p>
                    <p className="text-xs font-bold text-brand-red mt-0.5">{item.csed}</p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-semibold text-muted uppercase tracking-wider">Balance</p>
                    <p className="text-xs font-bold text-navy mt-0.5">{item.amount}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tolling Events */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Tolling Events That Extend CSED
          </p>
          <Card className="!p-0 divide-y divide-border">
            {tollingEvents.map((item) => (
              <div key={item.event} className="px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={14}
                    className={`shrink-0 mt-0.5 ${
                      item.severity === "danger"
                        ? "text-danger"
                        : item.severity === "warning"
                        ? "text-warning"
                        : "text-info"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.event}</p>
                    <p className="text-xs text-muted mt-0.5">{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Strategic Implications */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Strategic Implications
          </p>
          <div className="space-y-2.5">
            {strategicImplications.map((item) => (
              <Card key={item.title} className="!p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy-light shrink-0">
                    <Shield size={14} className="text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy mb-1">{item.title}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
