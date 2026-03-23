"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, X } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, Card, Button, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

export default function BusinessPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    if (!selected) return;
    setStore("onboarding_ownsBusiness", selected);
    router.push("/onboarding/address");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Business" backHref="/onboarding/income" />
      <ProgressBar value={87.5} steps="Step 7 of 8" label="Business Info" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-8">
          <h2 className="text-xl font-bold text-navy">Do you own a business?</h2>
          <p className="text-sm text-muted mt-1">This helps us determine your tax situation</p>
        </div>

        <div className="animate-fade-up delay-2 grid grid-cols-2 gap-4 mb-8">
          {/* Yes card */}
          <Card
            onClick={() => setSelected("yes")}
            className={`text-center ${
              selected === "yes"
                ? "!border-brand-blue shadow-[var(--shadow-glow-blue)] ring-[3px] ring-brand-blue/10"
                : ""
            }`}
          >
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(0,166,81,0.12) 0%, rgba(0,166,81,0.06) 100%)" }}>
                <Building size={26} className="text-brand-green" />
              </div>
              <span className="text-sm font-bold text-navy">Yes</span>
              <p className="text-[0.7rem] text-muted">I own or operate a business</p>
            </div>
          </Card>

          {/* No card */}
          <Card
            onClick={() => setSelected("no")}
            className={`text-center ${
              selected === "no"
                ? "!border-brand-blue shadow-[var(--shadow-glow-blue)] ring-[3px] ring-brand-blue/10"
                : ""
            }`}
          >
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-alt">
                <X size={26} className="text-muted" />
              </div>
              <span className="text-sm font-bold text-navy">No</span>
              <p className="text-[0.7rem] text-muted">I do not own a business</p>
            </div>
          </Card>
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue} disabled={!selected}>
            Continue
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
