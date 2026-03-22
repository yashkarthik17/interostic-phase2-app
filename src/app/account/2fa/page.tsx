"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  Badge,
} from "@/components/ui/shell";
import { Smartphone, Copy, Eye, EyeOff, ShieldCheck } from "lucide-react";

const MANUAL_KEY = "JBSWY3DPEHPK3PXP";

const backupCodes = [
  "A1B2-C3D4",
  "E5F6-G7H8",
  "I9J0-K1L2",
  "M3N4-O5P6",
  "Q7R8-S9T0",
  "U1V2-W3X4",
];

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Two-Factor Authentication" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        {/* QR Code Placeholder */}
        <div className="animate-fade-up delay-1">
          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-light mx-auto mb-3">
              <Smartphone size={22} className="text-brand-blue" />
            </div>
            <h3 className="text-base font-bold text-navy mb-1">
              Scan QR Code
            </h3>
            <p className="text-xs text-muted mb-4">
              Open your authenticator app and scan this code.
            </p>

            {/* QR Placeholder */}
            <div className="flex items-center justify-center w-48 h-48 mx-auto rounded-2xl bg-surface-alt border-2 border-dashed border-border mb-4">
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-sm ${
                      [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18].includes(i)
                        ? "bg-navy"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Manual Key */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                  Manual Key
                </span>
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-blue"
                >
                  {showKey ? <EyeOff size={12} /> : <Eye size={12} />}
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2.5 bg-surface-alt rounded-xl font-mono text-sm text-navy">
                  {showKey ? MANUAL_KEY : "••••••••••••••••"}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(MANUAL_KEY)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-alt hover:bg-navy-light transition-colors"
                >
                  <Copy size={15} className={copied ? "text-brand-green" : "text-muted"} />
                </button>
              </div>
              {copied && (
                <p className="text-xs font-semibold text-brand-green mt-1">Copied!</p>
              )}
            </div>
          </Card>
        </div>

        {/* Verification Input */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              Verify Setup
            </p>
            <p className="text-xs text-muted mb-3">
              Enter the 6-digit code from your authenticator app.
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
            <Button onClick={() => router.push("/account")} disabled={code.length < 6}>
              <ShieldCheck size={16} />
              Enable 2FA
            </Button>
          </Card>
        </div>

        {/* Backup Codes */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                Backup Codes
              </p>
              <button
                type="button"
                onClick={() => setShowBackup(!showBackup)}
                className="text-xs font-semibold text-brand-blue"
              >
                {showBackup ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-muted mb-3">
              Save these codes in a safe place. Each can be used once if you lose access to your authenticator.
            </p>
            {showBackup && (
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((bcode) => (
                  <div
                    key={bcode}
                    className="px-3 py-2 bg-surface-alt rounded-lg text-center font-mono text-sm font-medium text-navy"
                  >
                    {bcode}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
