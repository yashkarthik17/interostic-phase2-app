"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { AppShell, ScreenContent, ScreenHeader, FormInput, Button } from "@/components/ui/shell";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleCreate() {
    router.push("/register/verify");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Create Account" backHref="/login" />
      <ScreenContent className="py-4">
        {/* Header */}
        <div className="animate-fade-up delay-1 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green/10 rounded-xl mb-3">
            <Shield size={22} className="text-brand-green" />
          </div>
          <h2 className="text-xl font-bold text-navy">Join BlastTax</h2>
          <p className="text-sm text-muted mt-1">Start resolving your tax debt today</p>
        </div>

        {/* Form */}
        <div className="animate-fade-up delay-2 space-y-4 mb-8">
          <FormInput
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={setName}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={setConfirm}
          />
        </div>

        {/* Button */}
        <div className="animate-fade-up delay-3 mb-6">
          <Button onClick={handleCreate}>Create Account</Button>
        </div>

        {/* Login link */}
        <p className="animate-fade-up delay-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-blue hover:underline">
            Sign In
          </Link>
        </p>
      </ScreenContent>
    </AppShell>
  );
}
