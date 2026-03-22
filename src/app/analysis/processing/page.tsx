"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { AppShell, ScreenContent } from "@/components/ui/shell";

const processingSteps = [
  { text: "Analyzing tax records...", duration: 1000 },
  { text: "Calculating RCP...", duration: 1000 },
  { text: "Evaluating resolution options...", duration: 1000 },
  { text: "Generating recommendations...", duration: 1000 },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 0.8;
      });
    }, 30);

    // Step progression
    let step = 0;
    const stepInterval = setInterval(() => {
      step += 1;
      if (step < processingSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(stepInterval);
      }
    }, 1000);

    // Auto redirect
    const timeout = setTimeout(() => {
      router.replace("/analysis/results");
    }, 4200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center min-h-full">
        {/* Spinner */}
        <div className="relative mb-10">
          {/* Outer ring */}
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#00A651"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-navy">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 w-full max-w-[280px]">
          {processingSteps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                i <= currentStep ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <div className={`shrink-0 transition-colors duration-300 ${i < currentStep ? "text-brand-green" : i === currentStep ? "text-navy" : "text-border"}`}>
                {i < currentStep ? (
                  <CheckCircle size={18} />
                ) : i === currentStep ? (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-navy border-t-transparent animate-spin" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-border" />
                )}
              </div>
              <span
                className={`text-sm font-semibold transition-colors duration-300 ${
                  i < currentStep ? "text-brand-green" : i === currentStep ? "text-navy" : "text-muted"
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-xs text-muted mt-8 text-center">
          Reviewing your information against IRS guidelines...
        </p>
      </ScreenContent>
    </AppShell>
  );
}
