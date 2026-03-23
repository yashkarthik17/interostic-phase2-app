"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, HelpCircle, Check, X, Minus } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Button, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore } from "@/lib/store";

interface Question {
  id: string;
  text: string;
  why: string;
}

const questions: Question[] = [
  { id: "q1", text: "Have all required tax returns been filed?", why: "Unfiled returns can limit your resolution options. Most IRS programs require compliance with filing requirements before they'll consider your case." },
  { id: "q2", text: "Have you had any bankruptcy filings?", why: "Bankruptcy can affect tax debt discharge eligibility and may impact which resolution strategies are available. Some tax debts can be discharged in bankruptcy." },
  { id: "q3", text: "Are you current on estimated tax payments?", why: "Being current on estimated payments shows good faith and is often required for resolution programs like Offers in Compromise and Installment Agreements." },
  { id: "q4", text: "Are you currently under IRS audit?", why: "An active audit may need to be resolved before certain resolution options can be pursued. It also affects the timeline for your case." },
  { id: "q5", text: "Do you have an existing installment agreement?", why: "An existing agreement may need to be modified or replaced. This affects which new options are available and the approach we recommend." },
  { id: "q6", text: "Do you have a pending Offer in Compromise?", why: "A pending OIC pauses collection activity and limits what other actions can be taken simultaneously. We need to know if one is already in progress." },
  { id: "q7", text: "Are you requesting penalty relief?", why: "Penalty abatement can significantly reduce your total debt. First-time abatement and reasonable cause are two common methods to remove penalties." },
  { id: "q8", text: "Are you currently in CNC (Currently Not Collectible) status?", why: "CNC status means the IRS has temporarily stopped collection. This affects your CSED timeline and which options make strategic sense." },
  { id: "q9", text: "Has a Notice of Federal Tax Lien been filed?", why: "A federal tax lien affects your credit and property rights. It also impacts how we prioritize resolution strategies and negotiate with the IRS." },
  { id: "q10", text: "Have you received a levy notice?", why: "Levy notices indicate escalated collection activity. This creates urgency and may require immediate action to protect your assets." },
  { id: "q11", text: "Is there an active wage garnishment?", why: "Active wage garnishment directly impacts your take-home pay and may qualify you for expedited relief options to stop the garnishment." },
  { id: "q12", text: "Is a bank levy currently in effect?", why: "A bank levy freezes your accounts and can cause severe financial hardship. This is an urgent situation that may require emergency action." },
  { id: "q13", text: "Are you a U.S. citizen or permanent resident?", why: "Citizenship status affects tax obligations and the types of resolution programs available. Some programs have different rules for non-residents." },
  { id: "q14", text: "Are you currently living abroad?", why: "Living abroad affects filing requirements, deadlines, and communication with the IRS. Special provisions may apply to your situation." },
  { id: "q15", text: "Have you transferred assets in the last 10 years?", why: "Recent asset transfers are reviewed during OIC evaluation. Transfers for less than fair market value may be added back to your Reasonable Collection Potential." },
  { id: "q16", text: "Have all state tax returns been filed?", why: "State tax compliance is separate from federal but can affect your overall resolution strategy. Many states share data with the IRS." },
];

type Answer = "yes" | "no" | "unsure";

const answerOptions: { value: Answer; label: string; icon: typeof Check; color: string; activeBg: string; activeBorder: string; cardBg: string }[] = [
  { value: "yes", label: "Yes", icon: Check, color: "text-brand-green", activeBg: "bg-brand-green-light", activeBorder: "border-brand-green", cardBg: "bg-brand-green-50" },
  { value: "no", label: "No", icon: X, color: "text-brand-red", activeBg: "bg-brand-red-light", activeBorder: "border-brand-red", cardBg: "bg-brand-red-50" },
  { value: "unsure", label: "Unsure", icon: Minus, color: "text-warning", activeBg: "bg-warning-light", activeBorder: "border-warning", cardBg: "bg-warning-light" },
];

export default function QuestionsPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showWhy, setShowWhy] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<Record<string, string>>("pq_answers", {});
    if (Object.keys(saved).length > 0) setAnswers(saved);
    setMounted(true);
  }, []);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const saveAnswers = useCallback(
    (updated: Record<string, string>) => {
      setAnswers(updated);
      setStore("pq_answers", updated);
      const analysis = getStore("analysis", {});
      setStore("analysis", { ...analysis, pqAnswers: updated });
    },
    []
  );

  const handleAnswer = (value: Answer) => {
    const updated = { ...answers, [q.id]: value };
    saveAnswers(updated);
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setAnimDir("right");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current + 1);
        setShowWhy(false);
        setAnimating(false);
      }, 200);
    } else {
      router.push("/analysis/screening");
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setAnimDir("left");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setShowWhy(false);
        setAnimating(false);
      }, 200);
    }
  };

  if (!mounted) return null;

  // Determine background tint based on current answer
  const currentAnswer = answers[q.id] as Answer | undefined;
  const answerConfig = currentAnswer ? answerOptions.find(o => o.value === currentAnswer) : undefined;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Preliminary Questions" backHref="/analysis/welcome" />
      <ProgressBar value={progress} steps={`${current + 1} of ${questions.length}`} label="Step 1 of 6" />

      <ScreenContent className="flex flex-col">
        <div className="flex-1 flex flex-col justify-center py-6">
          {/* Question Card */}
          <div
            className={`transition-all duration-200 ${
              animating
                ? animDir === "right"
                  ? "opacity-0 -translate-x-4"
                  : "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {/* Question number + counter */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-blue">Question {current + 1}</span>
              <span className="text-[10px] font-semibold text-muted bg-surface-alt px-2 py-0.5 rounded-full">
                {answeredCount}/{questions.length} answered
              </span>
            </div>

            <div className={`rounded-2xl p-5 mb-6 transition-colors duration-300 ${
              answerConfig ? answerConfig.cardBg : "bg-surface-alt"
            }`}>
              <h2 className="text-xl font-black text-navy leading-tight">{q.text}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {answerOptions.map((opt) => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[1.5px] transition-all duration-200 active:scale-[0.98] shadow-[var(--shadow-card)] ${
                      selected
                        ? `${opt.activeBorder} ${opt.activeBg}`
                        : "border-border bg-white hover:border-border-strong"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                        selected ? `${opt.activeBg} ${opt.color}` : "bg-surface-alt text-muted"
                      }`}
                    >
                      <opt.icon size={18} />
                    </div>
                    <span className={`text-sm font-bold ${selected ? "text-navy" : "text-muted"}`}>{opt.label}</span>
                    <div
                      className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        selected ? `${opt.activeBorder} bg-current` : "border-border-strong"
                      }`}
                    >
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Why do we ask - smooth animation */}
            <button
              onClick={() => setShowWhy(!showWhy)}
              className="flex items-center gap-2 text-xs font-semibold text-muted hover:text-navy transition-colors mb-2"
            >
              <HelpCircle size={14} />
              <span>Why do we ask?</span>
              <ChevronRight size={12} className={`transition-transform duration-200 ${showWhy ? "rotate-90" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showWhy ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-brand-blue-50 to-brand-blue-light/60 border border-brand-blue/15 rounded-xl p-4 mb-2">
                <p className="text-xs text-navy leading-relaxed">{q.why}</p>
              </div>
            </div>
          </div>
        </div>
      </ScreenContent>

      {/* Navigation - StickyFooter */}
      <StickyFooter>
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-[1.5px] border-border-strong transition-all duration-200 shrink-0 ${
              current === 0 ? "opacity-30 pointer-events-none" : "hover:border-navy active:scale-95 shadow-[var(--shadow-card)]"
            }`}
          >
            <ChevronLeft size={18} className="text-navy" />
          </button>
          <div className="flex-1">
            <Button disabled={!answers[q.id]} onClick={goNext}>
              {current === questions.length - 1 ? "Review Answers" : "Next"}{" "}
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </StickyFooter>
    </AppShell>
  );
}
