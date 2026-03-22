"use client";
import {
  AppShell,
  ScreenContent,
  Button,
  Card,
} from "@/components/ui/shell";

import { Sparkles, Shield, ArrowRight } from "lucide-react";

export default function EmptyDashboardPage() {
  return (
    <AppShell>
      <header className="flex items-center justify-between px-6 pt-4 pb-2 bg-white shrink-0">
        <div>
          <p className="text-xs font-semibold text-muted">Welcome to</p>
          <h1 className="text-lg font-bold text-navy">BlastTax</h1>
        </div>
      </header>

      <ScreenContent className="flex flex-col items-center justify-center text-center">
        {/* Illustration area */}
        <div className="animate-fade-up delay-1">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-[60px]" />
            <div className="relative flex items-center justify-center w-28 h-28 bg-brand-green/10 rounded-full border-2 border-brand-green/20">
              <Shield size={48} className="text-brand-green" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-2 max-w-[280px]">
          <h2 className="text-2xl font-black text-navy mb-2">
            Welcome to BlastTax
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-8">
            Your AI-powered tax resolution assistant. Let&apos;s analyze your
            situation and find the best path to resolving your tax debt.
          </p>
        </div>

        <div className="animate-fade-up delay-3 w-full space-y-3">
          <Button href="/analysis" variant="primary">
            <Sparkles size={18} />
            Let&apos;s Get Started
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Feature hints */}
        <div className="animate-fade-up delay-4 w-full mt-8 space-y-3">
          {[
            {
              title: "AI-Powered Analysis",
              desc: "Get personalized resolution options in minutes",
            },
            {
              title: "IRS Transcript Decoding",
              desc: "Upload transcripts and we decode the codes",
            },
            {
              title: "Expert Guidance",
              desc: "Step-by-step help through the resolution process",
            },
          ].map((item) => (
            <Card key={item.title} className="!p-4 text-left">
              <p className="text-sm font-bold text-navy">{item.title}</p>
              <p className="text-xs text-muted mt-0.5">{item.desc}</p>
            </Card>
          ))}
        </div>
      </ScreenContent>

    </AppShell>
  );
}
