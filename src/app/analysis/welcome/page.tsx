"use client";
import { useRouter } from "next/navigation";
import { Shield, CheckCircle, ClipboardList, Upload, DollarSign, ArrowRight } from "lucide-react";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";

const steps = [
  { icon: ClipboardList, label: "Answer Questions", time: "~5 min", desc: "Quick yes/no questions about your tax situation", color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { icon: Upload, label: "Upload Transcript", time: "~2 min", desc: "Share your IRS transcript for accurate analysis", color: "text-violet", bg: "bg-violet/10" },
  { icon: DollarSign, label: "Review Financials", time: "~3 min", desc: "Income, expenses, and assets for eligibility", color: "text-brand-green", bg: "bg-brand-green/10" },
];

export default function WelcomePage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center min-h-full pt-12 pb-8">
        {/* Hero */}
        <div className="animate-fade-up flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-brand-green/10 rounded-full border border-brand-green/20">
              <Shield size={36} className="text-brand-green" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-8 h-8 bg-brand-green rounded-full border-[3px] border-white">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Let&apos;s Analyze Your Situation</h1>
          <p className="text-sm text-muted mt-2 max-w-[280px] leading-relaxed">
            We&apos;ll walk you through a few quick steps to find the best resolution for your tax debt.
          </p>
        </div>

        {/* Steps */}
        <div className="w-full space-y-3 mb-10">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`animate-fade-up delay-${i + 2} flex items-center gap-4 p-4 bg-white border border-border rounded-2xl`}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <div className={`flex items-center justify-center w-11 h-11 ${s.bg} rounded-xl`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <div className="absolute -top-1.5 -left-1.5 flex items-center justify-center w-5 h-5 bg-navy text-white rounded-full text-[10px] font-black">
                  {i + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-navy">{s.label}</span>
                  <span className="text-[10px] font-semibold text-muted bg-surface-alt px-2 py-0.5 rounded-full">{s.time}</span>
                </div>
                <p className="text-xs text-muted mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total time */}
        <div className="animate-fade-up delay-5 flex items-center gap-2 bg-navy-light px-5 py-2.5 rounded-full mb-8">
          <span className="text-xs font-bold text-navy">Total estimated time:</span>
          <span className="text-xs font-black text-brand-blue">~10 minutes</span>
        </div>

        {/* CTA */}
        <div className="animate-fade-up delay-6 w-full">
          <Button onClick={() => router.push("/analysis/questions")}>
            Let&apos;s Begin <ArrowRight size={16} />
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
