"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, FileText, FolderOpen, AlertTriangle, HelpCircle } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, Card, Button, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

const options = [
  { id: "back-taxes", icon: DollarSign, label: "I owe back taxes", color: "text-brand-red", bg: "bg-brand-red-light" },
  { id: "irs-notice", icon: FileText, label: "I received an IRS notice", color: "text-brand-blue", bg: "bg-brand-blue-50" },
  { id: "file-returns", icon: FolderOpen, label: "I need to file returns", color: "text-violet", bg: "bg-violet-light" },
  { id: "penalty-relief", icon: AlertTriangle, label: "I want penalty relief", color: "text-warning", bg: "bg-warning-light" },
  { id: "other", icon: HelpCircle, label: "Other", color: "text-muted", bg: "bg-surface-alt" },
];

export default function SituationPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (!selected) return;
    const label = options.find((o) => o.id === selected)?.label || selected;
    setStore("onboarding_situation", label);
    router.push("/onboarding/name");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Your Situation" backHref="/onboarding" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">What brings you here?</h2>
          <p className="text-sm text-muted mt-1">Select the option that best describes your situation</p>
        </div>

        <div className="space-y-3 mb-8">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            const active = selected === opt.id;
            return (
              <div key={opt.id} className={`animate-fade-up delay-${i + 2}`}>
                <Card
                  onClick={() => setSelected(opt.id)}
                  className={active
                    ? "!border-brand-blue shadow-[var(--shadow-glow-blue)] ring-[3px] ring-brand-blue/10"
                    : ""}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${opt.bg} ${opt.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-navy flex-1">{opt.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
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
