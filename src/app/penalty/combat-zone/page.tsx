"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { Sword, CheckCircle2, Clock, Shield, Info } from "lucide-react";

const extensions = [
  { action: "Filing tax returns", extension: "180 days after leaving combat zone + remaining time" },
  { action: "Paying taxes owed", extension: "Same as filing extension" },
  { action: "Filing a claim for refund", extension: "Extended by time in combat zone" },
  { action: "Filing Tax Court petition", extension: "Extended by time in combat zone" },
  { action: "Contributing to IRA", extension: "Extended deadline to contribute" },
  { action: "Estimated tax payments", extension: "Interest and penalty waived for covered period" },
];

const qualifyingAreas = [
  "Afghanistan",
  "Kosovo",
  "Arabian Peninsula (Iraq, Kuwait, Saudi Arabia, etc.)",
  "Sinai Peninsula of Egypt",
  "Contingency operations as designated by DoD",
];

export default function CombatZonePage() {
  return (
    <AppShell>
      <ScreenHeader title="Combat Zone Relief" backHref="/penalty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Military members serving in combat zones or contingency operations
          receive automatic extensions for tax filing and payment deadlines.
          Thank you for your service.
        </p>

        <div className="animate-fade-up delay-1">
          <Card className="!bg-navy-light !border-transparent">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-navy shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-navy">Automatic Relief</p>
                <p className="text-xs text-navy/70 mt-1 leading-relaxed">
                  You typically do not need to request this relief. The IRS uses
                  Department of Defense records to identify qualifying service
                  members. However, keeping your own deployment records is important.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">Deadline Extensions</p>
            </div>
            <div className="space-y-3">
              {extensions.map((ext, i) => (
                <div key={i} className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-navy">{ext.action}</p>
                  <p className="text-xs text-muted mt-0.5">{ext.extension}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Sword size={14} className="text-brand-blue" />
              <p className="text-sm font-bold text-navy">Qualifying Combat Zones</p>
            </div>
            <div className="space-y-2">
              {qualifyingAreas.map((area, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0" />
                  <span className="text-sm text-navy">{area}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-info" />
              <p className="text-sm font-bold text-navy">Who Else Qualifies?</p>
            </div>
            <div className="space-y-2">
              {[
                "Spouse filing a joint return with a combat zone service member",
                "Military personnel hospitalized due to combat zone service",
                "Support personnel serving in contingency operations",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
