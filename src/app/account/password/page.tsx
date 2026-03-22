"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  FormInput,
  Button,
} from "@/components/ui/shell";
import { Check, X } from "lucide-react";

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

function getStrength(password: string): { label: string; percent: number; color: string } {
  const passed = requirements.filter((r) => r.test(password)).length;
  if (password.length === 0) return { label: "", percent: 0, color: "bg-border" };
  if (passed <= 1) return { label: "Weak", percent: 20, color: "bg-danger" };
  if (passed <= 2) return { label: "Fair", percent: 40, color: "bg-warning" };
  if (passed <= 3) return { label: "Good", percent: 60, color: "bg-brand-blue" };
  if (passed <= 4) return { label: "Strong", percent: 80, color: "bg-brand-green" };
  return { label: "Excellent", percent: 100, color: "bg-brand-green" };
}

export default function PasswordPage() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = useMemo(() => getStrength(newPwd), [newPwd]);
  const passwordsMatch = newPwd.length > 0 && newPwd === confirm;
  const allValid = requirements.every((r) => r.test(newPwd)) && passwordsMatch && current.length > 0;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Change Password" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="space-y-4">
              <FormInput
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                value={current}
                onChange={setCurrent}
              />

              <div>
                <FormInput
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPwd}
                  onChange={setNewPwd}
                />

                {/* Strength Indicator */}
                {newPwd.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.625rem] font-semibold text-muted">Password strength</span>
                      <span className="text-[0.625rem] font-bold text-muted">{strength.label}</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <FormInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={setConfirm}
              />

              {confirm.length > 0 && !passwordsMatch && (
                <p className="text-xs font-semibold text-danger">Passwords do not match</p>
              )}
            </div>
          </Card>
        </div>

        {/* Requirements Checklist */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              Requirements
            </p>
            <div className="space-y-2.5">
              {requirements.map((req) => {
                const met = req.test(newPwd);
                return (
                  <div key={req.label} className="flex items-center gap-2.5">
                    <div
                      className={`flex items-center justify-center w-5 h-5 rounded-full ${
                        newPwd.length === 0
                          ? "bg-border"
                          : met
                          ? "bg-brand-green"
                          : "bg-danger-light"
                      }`}
                    >
                      {newPwd.length > 0 && (
                        met ? (
                          <Check size={11} className="text-white" strokeWidth={3} />
                        ) : (
                          <X size={11} className="text-danger" strokeWidth={3} />
                        )
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        newPwd.length === 0
                          ? "text-muted"
                          : met
                          ? "text-navy"
                          : "text-muted"
                      }`}
                    >
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="animate-fade-up delay-3">
          <Button onClick={() => router.push("/account")} disabled={!allValid}>
            Update Password
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
