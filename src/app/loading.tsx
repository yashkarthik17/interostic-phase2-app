"use client";
import { AppShell, ScreenContent } from "@/components/ui/shell";

export default function Loading() {
  return (
    <AppShell>
      <div className="px-6 pt-4 pb-2 bg-surface-warm shrink-0">
        <div className="skeleton h-3 w-20 mb-2" />
        <div className="skeleton h-5 w-36" />
      </div>
      <ScreenContent className="space-y-4 pt-4">
        {/* Hero card skeleton */}
        <div className="skeleton h-44 w-full rounded-2xl" style={{ background: "linear-gradient(90deg, #F0F7FE 25%, #FAFBFD 50%, #F0F7FE 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.8s ease-in-out infinite" }} />

        {/* Stat card skeleton */}
        <div className="skeleton h-24 w-full rounded-2xl" />

        {/* Grid skeleton */}
        <div>
          <div className="skeleton h-3 w-24 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <div className="skeleton h-24 rounded-2xl" />
            <div className="skeleton h-24 rounded-2xl" />
            <div className="skeleton h-24 rounded-2xl" />
            <div className="skeleton h-24 rounded-2xl" />
          </div>
        </div>

        {/* List skeleton */}
        <div>
          <div className="skeleton h-3 w-28 mb-3" />
          <div className="space-y-2">
            <div className="skeleton h-16 rounded-2xl" />
            <div className="skeleton h-16 rounded-2xl" />
            <div className="skeleton h-16 rounded-2xl" />
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
