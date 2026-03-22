"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { Shield, ChevronDown, CheckCircle2, Info, Star } from "lucide-react";

const protections = [
  {
    title: "Interest Rate Cap (6%)",
    description:
      "The SCRA caps interest on pre-service debts at 6% per year, including tax debt. If your tax debt was incurred before entering active duty, the IRS must reduce interest to 6%.",
    howToClaim: "Submit a written request to the IRS with a copy of your military orders showing active duty dates.",
  },
  {
    title: "Tax Filing Deadline Extensions",
    description:
      "Active duty service members receive automatic extensions for filing returns and paying taxes. The extension covers the period of military service plus 180 days after discharge.",
    howToClaim: "Write 'ACTIVE DUTY' on your return. Extensions are generally automatic but keep your orders as proof.",
  },
  {
    title: "Collection Activity Suspension",
    description:
      "The IRS generally will not take collection actions (levies, liens, seizures) against service members during active duty deployment and for a period after return.",
    howToClaim: "Contact the IRS and provide proof of active duty status. Request suspension of collection.",
  },
  {
    title: "Combat Zone Tax Exclusion",
    description:
      "Military pay earned while serving in a combat zone is partially or fully excluded from taxable income. For enlisted members, all combat zone pay is excluded.",
    howToClaim: "This is typically applied automatically through military payroll. Verify on your W-2.",
  },
  {
    title: "Spouse Residency Election",
    description:
      "Under the Military Spouses Residency Relief Act, a military spouse can keep their tax domicile in their home state even when living in a different state due to military orders.",
    howToClaim: "File taxes in your state of legal residence. Provide military orders as documentation if questioned.",
  },
];

const additionalBenefits = [
  "Free tax preparation through MilTax or VITA programs",
  "Earned Income Tax Credit available even if combat pay is excluded",
  "IRA contribution deadlines extended for combat zone service",
  "Joint return signing authority for deployed spouses via POA",
  "Student loan and mortgage foreclosure protections",
];

export default function MilitaryPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader title="Military SCRA Protections" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          The Servicemembers Civil Relief Act (SCRA) provides significant tax
          protections for active duty military members and their families.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-navy-light !border-transparent">
            <div className="flex items-start gap-3">
              <Star size={18} className="text-navy shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-navy">Thank You for Your Service</p>
                <p className="text-xs text-navy/70 mt-1 leading-relaxed">
                  These protections exist to ensure service members are not
                  disadvantaged by their military obligations. You have earned these
                  benefits.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          {protections.map((p, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.06}s` }}>
              <Card>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-start justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-navy shrink-0" />
                    <p className="text-sm font-bold text-navy">{p.title}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded === i && (
                  <div className="mt-3 pt-3 border-t border-border space-y-3">
                    <p className="text-sm text-navy leading-relaxed">{p.description}</p>
                    <div className="bg-surface-alt rounded-xl p-3">
                      <p className="text-xs text-muted">
                        <span className="font-bold">How to claim:</span> {p.howToClaim}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-brand-green" />
              <p className="text-sm font-bold text-navy">Additional Benefits</p>
            </div>
            <div className="space-y-2.5">
              {additionalBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{b}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
