"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, Button, Card } from "@/components/ui/shell";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
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

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...code];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setCode(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputs.current[focusIdx]?.focus();
  }

  function handleVerify() {
    setLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 600);
  }

  const allFilled = code.every((d) => d);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Verify Email" backHref="/register" />
      <ScreenContent className="py-4 sm:py-8">
        {/* Icon */}
        <div className="animate-fade-up delay-1 flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, rgba(30,123,200,0.12) 0%, rgba(30,123,200,0.06) 100%)" }}>
            <Mail size={30} className="text-brand-blue" />
          </div>
          <h2 className="text-xl font-bold text-navy">Check Your Email</h2>
          <p className="text-sm text-muted mt-2 max-w-[280px]">
            We sent a 6-digit verification code to your email address
          </p>
        </div>

        {/* Code inputs in a card */}
        <div className="animate-fade-up delay-2 mb-8">
          <Card className="!p-6 sm:!p-8">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 text-center">Enter verification code</p>
            <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
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
                  className={`w-12 h-14 text-center text-xl font-bold text-navy bg-surface-alt border-[1.5px] rounded-xl transition-all duration-150 focus:outline-none ${
                    digit
                      ? "border-brand-blue bg-white shadow-[var(--shadow-glow-blue)]"
                      : "border-border hover:border-border-strong focus:border-brand-blue focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10"
                  }`}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Verify button */}
        <div className="animate-fade-up delay-3 mb-6">
          <Button onClick={handleVerify} loading={loading} disabled={!allFilled}>
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
