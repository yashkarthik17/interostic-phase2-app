"use client";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center text-center">
        {/* Error Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-warning-light mb-5">
          <AlertTriangle size={36} className="text-warning" />
        </div>

        <h1 className="text-xl font-bold text-navy mb-2">Something Went Wrong</h1>
        <p className="text-sm text-muted leading-relaxed max-w-xs mb-2">
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        {error.digest && (
          <p className="text-[0.625rem] font-mono text-placeholder mb-6">
            Error ID: {error.digest}
          </p>
        )}

        <div className="w-full space-y-3 max-w-xs">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" href="/dashboard">
            Go Home
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
