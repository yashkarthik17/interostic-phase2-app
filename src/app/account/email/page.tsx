"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  FormInput,
  Button,
} from "@/components/ui/shell";
import { defaultProfile } from "@/lib/store";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function ChangeEmailPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  function handleSendCode() {
    if (newEmail && password) {
      setStep("verify");
    }
  }

  function handleVerify() {
    router.push("/account");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Change Email" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        {step === "email" ? (
          <>
            {/* Current Email */}
            <div className="animate-fade-up delay-1">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light">
                    <Mail size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-semibold text-placeholder uppercase tracking-wider">
                      Current Email
                    </p>
                    <p className="text-sm font-bold text-navy">{defaultProfile.email}</p>
                  </div>
                </div>

                <div className="h-px bg-border mb-4" />

                <div className="space-y-4">
                  <FormInput
                    label="New Email Address"
                    type="email"
                    placeholder="you@newemail.com"
                    value={newEmail}
                    onChange={setNewEmail}
                  />
                  <FormInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={setPassword}
                  />
                </div>
              </Card>
            </div>

            <div className="animate-fade-up delay-2">
              <Button onClick={handleSendCode} disabled={!newEmail || !password}>
                Send Verification Code
                <ArrowRight size={16} />
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Verification Step */}
            <div className="animate-fade-up delay-1 text-center py-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-green-light mx-auto mb-3">
                <Mail size={24} className="text-brand-green" />
              </div>
              <h2 className="text-lg font-bold text-navy mb-1">Check your inbox</h2>
              <p className="text-sm text-muted">
                We sent a verification code to
              </p>
              <p className="text-sm font-bold text-navy">{newEmail}</p>
            </div>

            <div className="animate-fade-up delay-2">
              <Card>
                <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
                  Verification Code
                </p>
                <div className="flex gap-2 mb-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={code[i] || ""}
                      onChange={(e) => {
                        const digit = e.target.value.replace(/\D/g, "").slice(0, 1);
                        const next = code.split("");
                        next[i] = digit;
                        setCode(next.join(""));
                        if (digit && e.target.nextElementSibling) {
                          (e.target.nextElementSibling as HTMLInputElement).focus();
                        }
                      }}
                      className="w-full h-12 bg-surface-alt border-[1.5px] border-border rounded-xl text-lg font-mono font-bold text-navy text-center placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
                    />
                  ))}
                </div>
                <Button onClick={handleVerify} disabled={code.length < 6}>
                  Verify &amp; Update Email
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full mt-3 text-center text-xs font-semibold text-brand-blue"
                >
                  Resend code or change email
                </button>
              </Card>
            </div>
          </>
        )}
      </ScreenContent>
    </AppShell>
  );
}
