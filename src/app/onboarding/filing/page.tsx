"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, Card, Button } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

const statuses = [
  { id: "single", label: "Single", description: "Unmarried or legally separated" },
  { id: "mfj", label: "Married Filing Jointly", description: "Filed together with spouse" },
  { id: "mfs", label: "Married Filing Separately", description: "Married but filing individually" },
  { id: "hoh", label: "Head of Household", description: "Unmarried with qualifying dependents" },
  { id: "qw", label: "Qualifying Widow(er)", description: "Spouse passed within last 2 years" },
];

export default function FilingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (!selected) return;
    const label = statuses.find((s) => s.id === selected)?.label || selected;
    setStore("onboarding_filingStatus", label);
    if (selected === "mfj") {
      router.push("/onboarding/spouse");
    } else {
      router.push("/onboarding/dependents");
    }
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Tax Info" backHref="/onboarding/email" />
      <ProgressBar value={50} steps="Step 4 of 8" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Filing Status</h2>
          <p className="text-sm text-muted mt-1">Select your tax filing status</p>
        </div>

        <div className="space-y-3 mb-8">
          {statuses.map((status, i) => {
            const active = selected === status.id;
            return (
              <div key={status.id} className={`animate-fade-up delay-${i + 2}`}>
                <Card
                  onClick={() => setSelected(status.id)}
                  className={active ? "!border-brand-blue !shadow-md ring-[3px] ring-brand-blue/10" : ""}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy">{status.label}</p>
                      <p className="text-xs text-muted mt-0.5">{status.description}</p>
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

        <div className="animate-fade-up delay-6">
          <Button onClick={handleContinue} disabled={!selected}>
            Continue
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
