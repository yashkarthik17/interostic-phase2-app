"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, FormInput, Button, Card, StickyFooter, ContextCard } from "@/components/ui/shell";
import { Info } from "lucide-react";
import { setStore } from "@/lib/store";

export default function SpousePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ssn, setSSN] = useState("");
  const [dob, setDOB] = useState("");

  function formatSSN(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }

  function handleContinue() {
    setStore("onboarding_spouseName", name);
    setStore("onboarding_spouseSSN", ssn);
    setStore("onboarding_spouseDOB", dob);
    router.push("/onboarding/dependents");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Spouse Info" backHref="/onboarding/filing" />
      <ProgressBar value={56} steps="Step 4b" label="Spouse Details" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Spouse Information</h2>
          <p className="text-sm text-muted mt-1">Required for joint filing</p>
        </div>

        <div className="animate-fade-up delay-2 mb-6">
          <ContextCard icon={Info} title="Why do we need this?" variant="blue">
            For joint filings, the IRS requires both spouses' information on all resolution paperwork.
          </ContextCard>
        </div>

        <div className="animate-fade-up delay-3">
          <Card className="!p-6">
            <div className="space-y-4">
              <FormInput
                label="Spouse Full Name"
                placeholder="Jane Smith"
                value={name}
                onChange={setName}
                required
              />
              <FormInput
                label="Spouse SSN"
                placeholder="123-45-6789"
                value={ssn}
                onChange={(v) => setSSN(formatSSN(v))}
                hint="Kept encrypted and secure"
              />
              <FormInput
                label="Spouse Date of Birth"
                type="date"
                placeholder="MM/DD/YYYY"
                value={dob}
                onChange={setDOB}
              />
            </div>
          </Card>
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-4">
          <Button onClick={handleContinue} disabled={!name}>
            Continue
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
