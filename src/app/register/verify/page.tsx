"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, Button } from "@/components/ui/shell";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const next = [...code];
    next[index] = value;
    setCode(next);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handleVerify() {
    router.push("/onboarding");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Verify Email" backHref="/register" />
      <ScreenContent className="py-4">
        {/* Icon */}
        <div className="animate-fade-up delay-1 flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-2xl mb-4">
            <Mail size={30} className="text-brand-blue" />
          </div>
          <h2 className="text-xl font-bold text-navy">Check Your Email</h2>
          <p className="text-sm text-muted mt-2 max-w-[280px]">
            We sent a 6-digit verification code to your email address
          </p>
        </div>

        {/* Code inputs */}
        <div className="animate-fade-up delay-2 flex justify-center gap-2.5 mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold text-navy bg-surface-alt border-[1.5px] border-border rounded-xl focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all"
            />
          ))}
        </div>

        {/* Verify button */}
        <div className="animate-fade-up delay-3 mb-6">
          <Button onClick={handleVerify} disabled={code.some((d) => !d)}>
            Verify Email
          </Button>
        </div>

        {/* Resend */}
        <p className="animate-fade-up delay-4 text-center text-sm text-muted">
          Didn&apos;t receive a code?{" "}
          <button className="font-bold text-brand-blue hover:underline">
            Resend Code
          </button>
        </p>
      </ScreenContent>
    </AppShell>
  );
}
