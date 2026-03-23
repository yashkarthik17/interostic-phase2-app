"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Shield, Map } from "lucide-react";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";

const slides = [
  {
    icon: Brain,
    gradient: "from-brand-blue/15 to-brand-blue/5",
    iconColor: "text-brand-blue",
    title: "AI-Powered Analysis",
    description:
      "Our smart technology analyzes your tax situation in minutes, identifying every possible resolution path available to you.",
  },
  {
    icon: Shield,
    gradient: "from-brand-green/15 to-brand-green/5",
    iconColor: "text-brand-green",
    title: "Expert Guidance",
    description:
      "Connect with licensed tax professionals who specialize in IRS debt resolution and can advocate on your behalf.",
  },
  {
    icon: Map,
    gradient: "from-violet/15 to-violet/5",
    iconColor: "text-violet",
    title: "Clear Resolution Path",
    description:
      "Follow a step-by-step roadmap tailored to your unique situation, from analysis to final resolution.",
  },
];

export default function OnboardingWelcomePage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  function handleNext() {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push("/onboarding/situation");
    }
  }

  function handleSkip() {
    router.push("/onboarding/situation");
  }

  const slide = slides[current];
  const Icon = slide.icon;
  const isLast = current === slides.length - 1;

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col justify-between py-8 sm:py-12">
        {/* Skip */}
        <div className="flex justify-end mb-4">
          {!isLast && (
            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-muted hover:text-navy transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-alt"
            >
              Skip
            </button>
          )}
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div key={current} className="animate-fade-up">
            {/* Icon with gradient circle */}
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 bg-gradient-to-br ${slide.gradient}`}>
              <Icon size={40} strokeWidth={1.6} className={slide.iconColor} />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3">{slide.title}</h2>
            <p className="text-[0.9375rem] text-muted leading-relaxed max-w-[320px] mx-auto">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2.5 mb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 bg-brand-blue"
                  : "w-2 bg-border-strong hover:bg-muted-light"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button onClick={handleNext}>
          {isLast ? "Get Started" : "Next"}
        </Button>
      </ScreenContent>
    </AppShell>
  );
}
