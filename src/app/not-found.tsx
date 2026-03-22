"use client";
import { AppShell, ScreenContent, Button } from "@/components/ui/shell";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center text-center">
        {/* Floating 404 */}
        <div className="mb-6" style={{ animation: "float 3s ease-in-out infinite" }}>
          <span className="text-[6rem] font-black text-navy/10 leading-none select-none">
            404
          </span>
        </div>

        <h1 className="text-xl font-bold text-navy mb-2">Page Not Found</h1>
        <p className="text-sm text-muted leading-relaxed max-w-xs mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="w-full space-y-3 max-w-xs">
          <Button variant="primary" href="/dashboard">
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>

        {/* Float animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
      </ScreenContent>
    </AppShell>
  );
}
