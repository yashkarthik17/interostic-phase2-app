"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Users } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, Button, Card, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

export default function DependentsPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  function handleContinue() {
    setStore("onboarding_dependents", count);
    router.push("/onboarding/income");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Dependents" backHref="/onboarding/filing" />
      <ProgressBar value={62.5} steps="Step 5 of 8" label="Dependents" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-8">
          <h2 className="text-xl font-bold text-navy">Dependents</h2>
          <p className="text-sm text-muted mt-1">How many dependents do you claim?</p>
        </div>

        <div className="animate-fade-up delay-2">
          <Card className="!p-8">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{ background: "linear-gradient(135deg, rgba(30,123,200,0.12) 0%, rgba(30,123,200,0.06) 100%)" }}>
                <Users size={28} className="text-brand-blue" />
              </div>

              {/* Counter */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setCount(Math.max(0, count - 1))}
                  disabled={count === 0}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl border-[1.5px] border-border-strong text-navy shadow-[var(--shadow-card)] hover:border-navy hover:bg-surface-alt hover:shadow-[var(--shadow-lift)] transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>

                <div className="w-20 text-center">
                  <span className="text-5xl font-black text-navy">{count}</span>
                </div>

                <button
                  onClick={() => setCount(count + 1)}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl border-[1.5px] border-border-strong text-navy shadow-[var(--shadow-card)] hover:border-navy hover:bg-surface-alt hover:shadow-[var(--shadow-lift)] transition-all active:scale-95"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>

              <p className="text-xs text-muted mt-4 font-medium">
                {count === 0
                  ? "No dependents"
                  : `${count} dependent${count !== 1 ? "s" : ""}`}
              </p>
            </div>
          </Card>
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
