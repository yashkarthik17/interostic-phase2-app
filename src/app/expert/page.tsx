"use client";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  IconCircle,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import {
  Shield,
  Award,
  Headphones,
  Scale,
  ClipboardList,
  UserCheck,
  Target,
  ChevronRight,
  Star,
  CheckCircle2,
  Info,
} from "lucide-react";

const benefits = [
  {
    icon: Award,
    color: "blue" as const,
    title: "Licensed Professionals",
    desc: "Enrolled Agents, CPAs, and Tax Attorneys with IRS credentials",
  },
  {
    icon: Headphones,
    color: "green" as const,
    title: "Dedicated Support",
    desc: "One-on-one guidance through every step of your resolution",
  },
  {
    icon: Scale,
    color: "violet" as const,
    title: "IRS Representation",
    desc: "We speak to the IRS on your behalf so you don\u2019t have to",
  },
];

const steps = [
  {
    num: 1,
    icon: ClipboardList,
    color: "blue" as const,
    title: "Review Your Case",
    desc: "Our expert reviews your analysis, transcripts, and financials",
  },
  {
    num: 2,
    icon: UserCheck,
    color: "green" as const,
    title: "Match With Expert",
    desc: "We pair you with a licensed professional who specializes in your situation",
  },
  {
    num: 3,
    icon: Target,
    color: "violet" as const,
    title: "Guide Resolution",
    desc: "Your expert handles paperwork, IRS communication, and strategy",
  },
];

export default function ExpertPage() {
  return (
    <AppShell>
      <ScreenHeader title="Expert Help" />
      <ScreenContent className="space-y-5 pt-2">
        {/* Hero */}
        <div className="animate-fade-up delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-navy p-6 text-center">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-green/10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
                <Shield size={32} className="text-brand-green" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Get Expert Help
              </h2>
              <p className="text-sm text-white/70 leading-relaxed max-w-[260px]">
                Work with licensed tax professionals who will fight for the best
                possible outcome on your case.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Why Choose Expert Help" subtitle="Licensed professionals on your side" accent="blue" />
          <div className="space-y-3">
            {benefits.map((b) => (
              <ContextCard key={b.title} icon={b.icon} title={b.title} variant={b.color === "green" ? "green" : b.color === "violet" ? "blue" : "blue"}>
                {b.desc}
              </ContextCard>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="How It Works" subtitle="Three simple steps to resolution" accent="green" />
          <Card className="!p-0 divide-y divide-border">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-4 px-5 py-4">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-navy text-white text-xs font-bold shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy mb-0.5">{s.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Pricing */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="Pricing" accent="blue" />
          <ContextCard icon={Info} title="Expert Session Pricing" variant="warm">
            <div className="text-center mt-2">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-warning fill-warning"
                  />
                ))}
              </div>
              <p className="text-2xl font-black text-navy mb-1">$149</p>
              <p className="text-xs text-muted font-semibold mb-1">per session</p>
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <CheckCircle2 size={13} className="text-brand-green" />
                <span className="text-xs font-semibold text-brand-green">
                  Included in Pro plan
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Each session includes a full case review, strategy recommendation,
                and direct IRS representation for your matter.
              </p>
            </div>
          </ContextCard>
          <div className="mt-4">
            <Button href="/expert/pending">
              Get Started
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
