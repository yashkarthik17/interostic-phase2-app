"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent, ScreenHeader, ProgressBar, Button } from "@/components/ui/shell";
import { setStore } from "@/lib/store";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 18 - i));

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  return (
    <div className="flex-1">
      <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150 appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function DOBPage() {
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  function handleContinue() {
    setStore("onboarding_dob", `${month} ${day}, ${year}`);
    router.push("/onboarding/email");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Personal Info" backHref="/onboarding/name" />
      <ProgressBar value={25} steps="Step 2 of 8" />
      <ScreenContent className="py-4">
        <div className="animate-fade-up delay-1 mb-6">
          <h2 className="text-xl font-bold text-navy">Date of Birth</h2>
          <p className="text-sm text-muted mt-1">Required for IRS verification</p>
        </div>

        <div className="animate-fade-up delay-2 flex gap-3 mb-8">
          <SelectField label="Month" value={month} onChange={setMonth} options={months} placeholder="Month" />
          <SelectField label="Day" value={day} onChange={setDay} options={days} placeholder="Day" />
          <SelectField label="Year" value={year} onChange={setYear} options={years} placeholder="Year" />
        </div>

        <div className="animate-fade-up delay-3">
          <Button onClick={handleContinue} disabled={!month || !day || !year}>
            Continue
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
