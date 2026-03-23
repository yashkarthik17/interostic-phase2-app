"use client";
import { AppShell, ScreenContent, Button, EmptyState } from "@/components/ui/shell";
import { SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center text-center">
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-red-50 to-brand-red-light flex items-center justify-center">
            <SearchX size={32} className="text-brand-red" strokeWidth={1.5} />
          </div>
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
      </ScreenContent>
    </AppShell>
  );
}
