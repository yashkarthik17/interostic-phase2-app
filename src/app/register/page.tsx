"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppShell, ScreenContent, ScreenHeader, FormInput, Button, Card } from "@/components/ui/shell";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    setTimeout(() => {
      router.push("/register/verify");
    }, 600);
  }

  const passwordMismatch = confirm.length > 0 && password !== confirm;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Create Account" backHref="/login" />
      <ScreenContent className="py-4 sm:py-8">
        {/* Header */}
        <div className="animate-fade-up delay-1 text-center mb-8">
          <Image src="/logo.png" alt="BlastTax Debt" width={160} height={60} className="mx-auto h-12 w-auto mb-3" priority />
          <h2 className="text-xl font-bold text-navy">Join BlastTax Debt</h2>
          <p className="text-sm text-muted mt-1">Start resolving your tax debt today</p>
        </div>

        {/* Form Card */}
        <div className="animate-fade-up delay-2">
          <Card className="!p-6 sm:!p-8 mb-6">
            <div className="space-y-4 mb-6">
              <FormInput
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={setName}
                required
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                required
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={setPassword}
                required
                hint="At least 8 characters"
              />
              <FormInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirm}
                onChange={setConfirm}
                required
                error={passwordMismatch ? "Passwords do not match" : undefined}
              />
            </div>

            {/* Button */}
            <Button
              onClick={handleCreate}
              loading={loading}
              disabled={!name || !email || !password || !confirm || passwordMismatch}
            >
              Create Account
            </Button>
          </Card>
        </div>

        {/* Login link */}
        <p className="animate-fade-up delay-3 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-blue hover:underline">
            Sign In
          </Link>
        </p>
      </ScreenContent>
    </AppShell>
  );
}
