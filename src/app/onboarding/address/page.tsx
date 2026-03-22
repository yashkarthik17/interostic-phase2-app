"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, FormInput, Button } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

const states = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

export default function AddressPage() {
  const router = useRouter();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  function handleContinue() {
    setStore("onboarding_address", { street, city, state, zip });
    // Also persist to profile format
    setStore("profile", {
      ...(() => {
        try {
          return JSON.parse(localStorage.getItem("bt_profile") || "{}");
        } catch {
          return {};
        }
      })(),
      firstName: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_firstName") || '""'); } catch { return ""; } })(),
      lastName: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_lastName") || '""'); } catch { return ""; } })(),
      email: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_email") || '""'); } catch { return ""; } })(),
      phone: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_phone") || '""'); } catch { return ""; } })(),
      dob: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_dob") || '""'); } catch { return ""; } })(),
      filingStatus: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_filingStatus") || '""'); } catch { return ""; } })(),
      situation: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_situation") || '""'); } catch { return ""; } })(),
      dependents: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_dependents") || "0"); } catch { return 0; } })(),
      incomeSource: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_incomeSource") || '""'); } catch { return ""; } })(),
      hasBusiness: (() => { try { return JSON.parse(localStorage.getItem("bt_onboarding_ownsBusiness") || '""') === "yes"; } catch { return false; } })(),
      address: { street, city, state, zip },
    });
    router.push("/onboarding/complete");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Address" backHref="/onboarding/business" />
      <ProgressBar value={100} steps="Step 8 of 8" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Home Address</h2>
          <p className="text-sm text-muted mt-1">Your current mailing address</p>
        </div>

        <div className="animate-fade-up delay-2 space-y-4 mb-8">
          <FormInput
            label="Street Address"
            placeholder="123 Main St"
            value={street}
            onChange={setStreet}
          />
          <FormInput
            label="City"
            placeholder="Los Angeles"
            value={city}
            onChange={setCity}
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
              >
                <option value="" disabled>Select</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <FormInput
                label="ZIP Code"
                placeholder="90001"
                value={zip}
                onChange={(v) => setZip(v.replace(/\D/g, "").slice(0, 5))}
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue} disabled={!street || !city || !state || !zip}>
            Complete Setup
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
