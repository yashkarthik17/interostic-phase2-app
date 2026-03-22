"use client";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, FormInput, Button } from "@/components/ui/shell";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Reset Password" backHref="/login" />
      <ScreenContent className="py-4">
        {/* Icon */}
        <div className="animate-fade-up delay-1 flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-2xl mb-4">
            <KeyRound size={30} className="text-brand-blue" />
          </div>
          <h2 className="text-xl font-bold text-navy">
            {sent ? "Check Your Inbox" : "Forgot Password?"}
          </h2>
          <p className="text-sm text-muted mt-2 max-w-[280px]">
            {sent
              ? "We sent a password reset link to your email"
              : "Enter your email and we'll send you a link to reset your password"}
          </p>
        </div>

        {!sent ? (
          <>
            <div className="animate-fade-up delay-2 mb-6">
              <FormInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />
            </div>
            <div className="animate-fade-up delay-3">
              <Button onClick={() => setSent(true)} disabled={!email}>
                Send Reset Link
              </Button>
            </div>
          </>
        ) : (
          <div className="animate-fade-up delay-2 text-center">
            <Button variant="outline" href="/login">
              Back to Sign In
            </Button>
          </div>
        )}
      </ScreenContent>
    </AppShell>
  );
}
