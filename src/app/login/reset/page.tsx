"use client";
import { useState } from "react";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, FormInput, Button, Card } from "@/components/ui/shell";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSend() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Reset Password" backHref="/login" />
      <ScreenContent className="py-4 sm:py-8">
        {/* Icon */}
        <div className="animate-fade-up delay-1 flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: sent
              ? "linear-gradient(135deg, rgba(0,166,81,0.12) 0%, rgba(0,166,81,0.06) 100%)"
              : "linear-gradient(135deg, rgba(30,123,200,0.12) 0%, rgba(30,123,200,0.06) 100%)" }}>
            {sent
              ? <CheckCircle2 size={30} className="text-brand-green" />
              : <KeyRound size={30} className="text-brand-blue" />
            }
          </div>
          <h2 className="text-xl font-bold text-navy">
            {sent ? "Check Your Inbox" : "Forgot Password?"}
          </h2>
          <p className="text-sm text-muted mt-2 max-w-[280px]">
            {sent
              ? "We sent a password reset link to your email"
              : "Enter your email and we\u2019ll send you a link to reset your password"}
          </p>
        </div>

        {!sent ? (
          <div className="animate-fade-up delay-2">
            <Card className="!p-6 sm:!p-8 mb-6">
              <div className="mb-6">
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </div>
              <Button onClick={handleSend} loading={loading} disabled={!email}>
                Send Reset Link
              </Button>
            </Card>
          </div>
        ) : (
          <div className="animate-fade-up delay-2">
            <Button variant="outline" href="/login">
              Back to Sign In
            </Button>
          </div>
        )}
      </ScreenContent>
    </AppShell>
  );
}
