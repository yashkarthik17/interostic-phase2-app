"use client";
import { useEffect, useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import {
  Search,
  Clock,
  Shield,
  FileCheck,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const expectations = [
  {
    icon: FileCheck,
    title: "Case Review",
    desc: "Your expert will review all uploaded documents and transcripts",
  },
  {
    icon: MessageCircle,
    title: "Initial Consultation",
    desc: "A 30-minute call to discuss your situation and answer questions",
  },
  {
    icon: Shield,
    title: "Strategy Recommendation",
    desc: "A personalized resolution plan based on your unique circumstances",
  },
];

export default function ExpertPendingPage() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setDots((d) => (d % 3) + 1), 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Expert Matching" backHref="/expert" />
      <ScreenContent className="space-y-5 pt-4">
        {/* Searching Indicator */}
        <div className="animate-fade-up delay-1">
          <div className="flex flex-col items-center text-center py-6">
            {/* Animated search ring */}
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-full bg-brand-blue-50 flex items-center justify-center">
                <Search size={32} className="text-brand-blue" />
              </div>
              <div
                className="absolute inset-0 w-20 h-20 rounded-full border-[3px] border-transparent border-t-brand-blue"
                style={{ animation: "spin 1.2s linear infinite" }}
              />
              <style jsx>{`
                @keyframes spin {
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
            </div>

            <h2 className="text-lg font-bold text-navy mb-1">
              Finding Your Expert{".".repeat(dots)}
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-[260px]">
              We&apos;re matching you with a licensed professional who
              specializes in your type of case.
            </p>
          </div>
        </div>

        {/* Estimated Wait */}
        <div className="animate-fade-up delay-2">
          <Card className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning-light shrink-0">
              <Clock size={18} className="text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">Estimated Wait Time</p>
              <p className="text-xs text-muted">
                Usually within <span className="font-bold text-navy">2-4 hours</span> during
                business hours
              </p>
            </div>
          </Card>
        </div>

        {/* Progress Steps */}
        <div className="animate-fade-up delay-3">
          <div className="flex items-center gap-3 px-1 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center">
                <span className="text-[0.625rem] font-bold text-white">&#10003;</span>
              </div>
              <span className="text-xs font-semibold text-brand-green">Request sent</span>
            </div>
            <div className="flex-1 h-px bg-border-strong" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full bg-white"
                  style={{ animation: "pulse 1.5s ease-in-out infinite" }}
                />
                <style jsx>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                  }
                `}</style>
              </div>
              <span className="text-xs font-semibold text-navy">Matching</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center">
                <span className="text-[0.625rem] font-bold text-placeholder">3</span>
              </div>
              <span className="text-xs font-semibold text-placeholder">Assigned</span>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="What to Expect" subtitle="Your expert session includes" accent="blue" />
          <Card className="!p-0 divide-y divide-border">
            {expectations.map((item) => (
              <div key={item.title} className="flex items-start gap-3.5 px-5 py-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light shrink-0 mt-0.5">
                  <item.icon size={16} className="text-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy mb-0.5">{item.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Notification note */}
        <div className="animate-fade-up delay-5">
          <div className="text-center py-2">
            <p className="text-xs text-muted">
              We&apos;ll notify you as soon as an expert is assigned.
              <br />
              You can safely close this page.
            </p>
          </div>
        </div>

        <Button href="/expert/agreement" variant="outline">
          Skip to Agreement Preview
          <ChevronRight size={16} />
        </Button>
      </ScreenContent>
    </AppShell>
  );
}
