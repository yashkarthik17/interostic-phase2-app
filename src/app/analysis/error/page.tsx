"use client";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, ArrowLeft, MessageCircle } from "lucide-react";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";

export default function AnalysisErrorPage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center min-h-full pt-12 pb-8">
        <div className="animate-fade-up flex flex-col items-center text-center">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-danger-light rounded-full">
              <AlertTriangle size={36} className="text-danger" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-black text-navy tracking-tight mb-2">Analysis Error</h1>
          <p className="text-sm text-muted max-w-[280px] leading-relaxed mb-8">
            We encountered an issue while processing your analysis. This is usually temporary. Please try again.
          </p>

          {/* Error Detail */}
          <div className="w-full bg-danger-light border border-danger/20 rounded-2xl p-4 mb-8">
            <p className="text-xs font-semibold text-danger mb-1">Error Details</p>
            <p className="text-xs text-danger/80 font-mono">
              ANALYSIS_TIMEOUT: The analysis engine did not respond within the expected timeframe. (Code: AT-408)
            </p>
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
