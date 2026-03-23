"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Briefcase, Landmark, TrendingUp, MoreHorizontal } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, Card, Button, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

const sources = [
  { id: "w2", icon: Building2, label: "W-2 Employment", description: "Traditional employer", color: "text-brand-blue", bg: "bg-brand-blue-50" },
  { id: "self", icon: Briefcase, label: "Self-Employed", description: "1099 / freelance", color: "text-brand-green", bg: "bg-brand-green-50" },
  { id: "retirement", icon: Landmark, label: "Retirement", description: "Pension, Social Security", color: "text-violet", bg: "bg-violet-light" },
  { id: "investments", icon: TrendingUp, label: "Investments", description: "Capital gains, dividends", color: "text-teal", bg: "bg-teal-light" },
  { id: "other", icon: MoreHorizontal, label: "Other", description: "Rental, gig work, etc.", color: "text-muted", bg: "bg-surface-alt" },
];

export default function IncomePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (!selected) return;
    const label = sources.find((s) => s.id === selected)?.label || selected;
    setStore("onboarding_incomeSource", label);
    router.push("/onboarding/business");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Income" backHref="/onboarding/dependents" />
      <ProgressBar value={75} steps="Step 6 of 8" label="Income Source" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Primary Income</h2>
          <p className="text-sm text-muted mt-1">What is your primary income source?</p>
        </div>

        <div className="space-y-3 mb-8">
          {sources.map((source, i) => {
            const Icon = source.icon;
            const active = selected === source.id;
            return (
              <div key={source.id} className={`animate-fade-up delay-${i + 2}`}>
                <Card
                  onClick={() => setSelected(source.id)}
                  className={active
                    ? "!border-brand-blue shadow-[var(--shadow-glow-blue)] ring-[3px] ring-brand-blue/10"
                    : ""}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${source.bg} ${source.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy">{source.label}</p>
                      <p className="text-xs text-muted">{source.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        active ? "border-brand-blue bg-brand-blue" : "border-border-strong"
                      }`}
                    >
                      {active && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-6">
          <Button onClick={handleContinue} disabled={!selected}>
            Continue
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
