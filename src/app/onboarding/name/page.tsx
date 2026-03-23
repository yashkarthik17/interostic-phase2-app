"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, FormInput, Button, Card, StickyFooter } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

export default function NamePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleContinue() {
    setStore("onboarding_firstName", firstName);
    setStore("onboarding_lastName", lastName);
    router.push("/onboarding/dob");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Personal Info" backHref="/onboarding/situation" />
      <ProgressBar value={12.5} steps="Step 1 of 8" label="Personal Info" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">What&apos;s your name?</h2>
          <p className="text-sm text-muted mt-1">We&apos;ll use this on your tax documents</p>
        </div>

        <div className="animate-fade-up delay-2">
          <Card className="!p-6">
            <div className="space-y-4">
              <FormInput
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={setFirstName}
                required
              />
              <FormInput
                label="Last Name"
                placeholder="Smith"
                value={lastName}
                onChange={setLastName}
                required
              />
            </div>
          </Card>
        </div>
      </ScreenContent>

      <StickyFooter>
        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue} disabled={!firstName || !lastName}>
            Continue
          </Button>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
