"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppShell, ScreenContent, FormInput, Button } from "@/components/ui/shell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    router.push("/dashboard");
  }

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col justify-center py-8">
        {/* Logo */}
        <div className="animate-fade-up delay-1 text-center mb-10">
          <Image src="/logo.png" alt="BlastTax Debt" width={200} height={80} className="mx-auto h-16 w-auto mb-4" priority />
          <p className="text-sm text-muted mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="animate-fade-up delay-2 space-y-4 mb-6">
          <FormInput label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
          <FormInput label="Password" type="password" placeholder="Enter your password" value={password} onChange={setPassword} />
        </div>

        {/* Forgot password */}
        <div className="animate-fade-up delay-3 text-right mb-6">
          <Link href="/login/reset" className="text-xs font-semibold text-brand-blue hover:underline">Forgot Password?</Link>
        </div>

        {/* Sign In button */}
        <div className="animate-fade-up delay-3 mb-6">
          <Button onClick={handleSignIn}>Sign In</Button>
        </div>

        {/* Divider */}
        <div className="animate-fade-up delay-4 flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[0.7rem] font-semibold text-muted uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social login */}
        <div className="animate-fade-up delay-4 flex gap-3 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-alt border border-border rounded-xl text-sm font-semibold text-navy hover:border-border-strong transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-alt border border-border rounded-xl text-sm font-semibold text-navy hover:border-border-strong transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Apple
          </button>
        </div>

        {/* Create account link */}
        <p className="animate-fade-up delay-5 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-brand-blue hover:underline">Create Account</Link>
        </p>
      </ScreenContent>
    </AppShell>
  );
}
