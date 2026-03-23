"use client";
import {
  AppShell,
  ScreenContent,
  Button,
  Card,
  EmptyState,
  ContextCard,
} from "@/components/ui/shell";

import { Sparkles, Shield, ArrowRight, BarChart3, FileSearch, Users } from "lucide-react";

export default function EmptyDashboardPage() {
  return (
    <AppShell>
      <header className="flex items-center justify-between px-6 pt-4 pb-2 bg-white border-b border-border shrink-0">
        <div>
          <p className="text-xs font-semibold text-muted">Welcome to</p>
          <h1 className="text-lg font-bold text-navy">BlastTax</h1>
        </div>
      </header>

      <ScreenContent className="flex flex-col items-center justify-center text-center">
        {/* Branded empty state */}
        <div className="animate-fade-up delay-1">
          <EmptyState
            icon={Shield}
            title="Welcome to BlastTax"
            description="Your AI-powered tax resolution assistant. Let's analyze your situation and find the best path to resolving your tax debt."
            actionLabel="Let's Get Started"
            actionHref="/analysis"
          />
        </div>

        {/* Feature hints as ContextCards */}
        <div className="animate-fade-up delay-3 w-full mt-6 space-y-3">
          <ContextCard icon={BarChart3} title="AI-Powered Analysis" variant="blue">
            Get personalized resolution options in minutes based on your unique tax situation.
          </ContextCard>
          <ContextCard icon={FileSearch} title="IRS Transcript Decoding" variant="warm">
            Upload transcripts and we decode the codes, amounts, and deadlines automatically.
          </ContextCard>
          <ContextCard icon={Users} title="Expert Guidance" variant="green">
            Step-by-step help through the entire resolution process, from filing to settlement.
          </ContextCard>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
