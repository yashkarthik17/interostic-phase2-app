"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowLeft, Phone } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, Badge, Button, SectionHeader, StickyFooter } from "@/components/ui/shell";
import { getStore, formatCurrency, sampleResolutions } from "@/lib/store";

interface ComparisonRow {
  label: string;
  values: (string | React.ReactNode)[];
}

export default function ComparePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [totalDebt, setTotalDebt] = useState(47250);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const analysis = getStore<{ totalDebt?: number }>("analysis", {});
    if (analysis.totalDebt) setTotalDebt(analysis.totalDebt);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const options = sampleResolutions; // OIC, IA, CNC, PA

  const rows: ComparisonRow[] = [
    {
      label: "Total Cost",
      values: options.map((o) =>
        o.id === "oic" ? formatCurrency(totalDebt - o.savings) : o.id === "ia" ? formatCurrency(o.monthlyPayment * 72) : o.id === "cnc" ? "$0" : formatCurrency(totalDebt - o.savings)
      ),
    },
    {
      label: "Monthly Payment",
      values: options.map((o) => (o.monthlyPayment > 0 ? `${formatCurrency(o.monthlyPayment)}/mo` : "$0/mo")),
    },
    {
      label: "Duration",
      values: options.map((o) => o.duration),
    },
    {
      label: "Savings",
      values: options.map((o) =>
        o.savings > 0 ? (
          <span className="text-brand-green font-black">{formatCurrency(o.savings)}</span>
        ) : (
          <span className="text-muted">--</span>
        )
      ),
    },
    {
      label: "Savings %",
      values: options.map((o) =>
        o.savingsPercent > 0 ? (
          <span className="text-brand-green font-black">{o.savingsPercent}%</span>
        ) : (
          <span className="text-muted">0%</span>
        )
      ),
    },
    {
      label: "Eligibility",
      values: options.map((o) =>
        o.eligible ? (
          <Badge variant="success">Eligible</Badge>
        ) : (
          <Badge variant="danger">Not Eligible</Badge>
        )
      ),
    },
    {
      label: "Pros",
      values: [
        "Largest reduction; fresh start",
        "Predictable payments; keeps assets",
        "No payments; stops collection",
        "Quick savings; can combine",
      ],
    },
    {
      label: "Cons",
      values: [
        "Strict eligibility; 5-yr compliance",
        "Full amount owed; long term",
        "Debt still accrues; temporary",
        "Only removes penalties; not tax",
      ],
    },
  ];

  return (
    <AppShell hideNav>
      <ScreenHeader title="Compare Options" backHref="/analysis/results" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          <div className="animate-fade-up">
            <SectionHeader title="Side-by-Side Comparison" subtitle="Scroll right to see all options." accent="blue" />
          </div>

          {/* Table */}
          <div className="animate-fade-up delay-1 -mx-6">
            <div ref={scrollRef} className="overflow-x-auto px-6 pb-2">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-semibold text-muted uppercase tracking-wider py-3 pr-3 w-[100px] sticky left-0 bg-white z-10" />
                    {options.map((o) => (
                      <th
                        key={o.id}
                        className={`text-center py-3 px-2 ${o.recommended ? "bg-brand-blue-50 rounded-t-xl" : ""}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-black text-navy">{o.shortName}</span>
                          {o.recommended && (
                            <Badge variant="success">
                              <Star size={8} /> Best
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-surface-alt" : "bg-white"}>
                      <td className="text-xs font-semibold text-muted py-3 pr-3 sticky left-0 bg-inherit z-10">
                        {row.label}
                      </td>
                      {row.values.map((val, ci) => (
                        <td
                          key={ci}
                          className={`text-center py-3 px-2 text-xs font-semibold text-navy ${
                            options[ci].recommended ? "bg-brand-blue-50/50" : ""
                          } ${options[ci].recommended && ri === rows.length - 1 ? "rounded-b-xl" : ""}`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="space-y-3">
          <Button variant="outline" onClick={() => router.push("/analysis/results")}>
            <ArrowLeft size={16} /> Back to Results
          </Button>
          <Button variant="secondary" onClick={() => router.push("/expert")}>
            <Phone size={16} /> Talk to Expert
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
