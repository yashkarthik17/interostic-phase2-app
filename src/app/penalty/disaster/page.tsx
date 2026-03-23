"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { CloudRain, CheckCircle2, AlertTriangle, Calendar, MapPin } from "lucide-react";

const reliefDetails = [
  {
    title: "What Qualifies",
    items: [
      "Your area was declared a federal disaster by FEMA",
      "The IRS issued a specific disaster relief notice",
      "You were affected by the disaster (lived in, worked in, or had records in the area)",
    ],
  },
  {
    title: "What Gets Extended",
    items: [
      "Filing deadlines (individual, business, estate, trust returns)",
      "Payment deadlines for taxes due",
      "Estimated tax payment deadlines",
      "Time to make IRA or HSA contributions",
      "Penalty-free time for late filing and late payment",
    ],
  },
  {
    title: "How to Claim Relief",
    items: [
      "If your address is in the disaster area, relief is often automatic",
      "If affected but outside the area, call the IRS at 866-562-5227",
      "Write the FEMA disaster declaration number on your return",
      "Keep documentation of how the disaster affected you",
    ],
  },
];

export default function DisasterPage() {
  return (
    <AppShell>
      <ScreenHeader title="Disaster Relief" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          When a federally declared disaster strikes, the IRS provides automatic
          penalty and deadline relief. If you were affected, you may qualify for
          additional time and penalty removal.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-warning-light !border-transparent">
            <div className="flex items-start gap-3">
              <CloudRain size={20} className="text-amber-800 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">
                  Disaster relief is often automatic
                </p>
                <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                  If your IRS address of record is in a covered disaster area, the
                  IRS will typically apply relief automatically. No separate request needed.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {reliefDetails.map((section, i) => (
          <div key={section.title} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
            <Card>
              <p className="text-sm font-bold text-navy mb-3">{section.title}</p>
              <div className="space-y-2.5">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="text-sm text-navy leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}

        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-muted" />
              <p className="text-sm font-bold text-navy">Recent Disaster Declarations</p>
            </div>
            <div className="space-y-3">
              {[
                { area: "California Wildfires", date: "Jan 2026", ext: "Oct 15, 2026" },
                { area: "Southeast Hurricanes", date: "Sep 2025", ext: "May 1, 2026" },
                { area: "Midwest Tornadoes", date: "Jun 2025", ext: "Feb 3, 2026" },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-muted" />
                    <div>
                      <p className="text-sm font-semibold text-navy">{d.area}</p>
                      <p className="text-xs text-muted">Declared {d.date}</p>
                    </div>
                  </div>
                  <Badge variant="info">Extended to {d.ext}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
