"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell, ScreenContent } from "@/components/ui/shell";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/billing/success");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 rounded-full border-[3px] border-border" />
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand-green"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-brand-green" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
        </div>

        <h2 className="text-lg font-bold text-navy mb-2">Processing your payment...</h2>
        <p className="text-sm text-muted text-center max-w-[260px]">
          Please wait while we securely process your transaction.
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        `}</style>
      </ScreenContent>
    </AppShell>
  );
}
