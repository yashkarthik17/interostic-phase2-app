"use client";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, ArrowLeft, MessageCircle } from "lucide-react";
import { AppShell, ScreenContent, EmptyState, Button } from "@/components/ui/shell";

export default function AnalysisErrorPage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center min-h-full pt-12 pb-8">
        <div className="animate-fade-up flex flex-col items-center text-center">
          {/* EmptyState with red error icon */}
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-red-50 to-brand-red-light flex items-center justify-center">
              <AlertTriangle size={32} className="text-brand-red" strokeWidth={1.5} />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-black text-navy tracking-tight mb-2">Analysis Error</h1>
          <p className="text-sm text-muted max-w-[280px] leading-relaxed mb-8">
            We encountered an issue while processing your analysis. This is usually temporary. Please try again.
          </p>

          {/* Error Detail */}
          <div className="w-full bg-gradient-to-br from-brand-red-50 to-brand-red-light/60 border border-brand-red/15 rounded-2xl p-4 mb-8">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-brand-red/10">
                <AlertTriangle size={18} className="text-brand-red" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-bold text-navy mb-1">Error Details</p>
                <p className="text-xs text-muted font-mono leading-relaxed">
                  ANALYSIS_TIMEOUT: The analysis engine did not respond within the expected timeframe. (Code: AT-408)
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3">
            <Button onClick={() => router.push("/analysis/processing")}>
              <RotateCcw size={16} /> Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push("/analysis")}>
              <ArrowLeft size={16} /> Start Over
            </Button>
            <Button variant="ghost" onClick={() => router.push("/expert")}>
              <MessageCircle size={16} /> Contact Support
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
