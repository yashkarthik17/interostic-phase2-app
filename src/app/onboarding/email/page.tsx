"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, FormInput, Button, Card, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

export default function EmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function handleContinue() {
    setStore("onboarding_email", email);
    setStore("onboarding_phone", phone);
    router.push("/onboarding/filing");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Contact Info" backHref="/onboarding/dob" />
      <ProgressBar value={37.5} steps="Step 3 of 8" label="Contact Details" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Contact Details</h2>
          <p className="text-sm text-muted mt-1">How can we reach you?</p>
        </div>

        <div className="animate-fade-up delay-2">
          <Card className="!p-6">
            <div className="space-y-4">
              <FormInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                required
              />
              <FormInput
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(v) => setPhone(formatPhone(v))}
                hint="Optional but recommended"
              />
            </div>
          </Card>
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue} disabled={!email}>
            Continue
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
