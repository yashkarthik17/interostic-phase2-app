"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Shield } from "lucide-react";
import { AppShell, ScreenContent, Button, Card } from "@/components/ui/shell";
import { getStore, defaultProfile, type UserProfile } from "@/lib/store";

function ConfettiDots() {
  const [dots, setDots] = useState<{ x: number; y: number; color: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    const colors = ["#00A651", "#2563EB", "#E63946", "#F59E0B", "#7C3AED", "#0D9488"];
    const generated = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      delay: Math.random() * 1.5,
    }));
    setDots(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: 0,
            animation: `confettiFall 2s ease-out ${dot.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 0; transform: translateY(-20px) scale(0); }
          30% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(40px) scale(0.5); }
        }
      `}</style>
    </div>
  );
}

export default function CompletePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const stored = getStore<UserProfile>("profile", defaultProfile);
    setProfile(stored);
  }, []);

  return (
    <AppShell hideNav>
      <ScreenContent className="flex flex-col items-center justify-center py-8 relative">
        <ConfettiDots />

        {/* Success icon */}
        <div className="animate-fade-up delay-1 relative mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-brand-green/10 rounded-full">
            <CheckCircle2 size={44} className="text-brand-green" strokeWidth={2} />
          </div>
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 bg-brand-blue rounded-full shadow-lg">
            <Shield size={14} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-up delay-2 text-2xl font-bold text-navy text-center mb-2">
          You&apos;re All Set!
        </h1>
        <p className="animate-fade-up delay-2 text-sm text-muted text-center mb-8 max-w-[280px]">
          Your profile is ready. Let&apos;s start resolving your tax situation.
        </p>

        {/* Summary card */}
        <div className="animate-fade-up delay-3 w-full mb-8">
          <Card>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Profile Summary</h3>
            <div className="space-y-2.5">
              <SummaryRow label="Name" value={`${profile.firstName} ${profile.lastName}`} />
              <SummaryRow label="Email" value={profile.email} />
              <SummaryRow label="Filing Status" value={profile.filingStatus} />
              <SummaryRow label="Dependents" value={String(profile.dependents)} />
              <SummaryRow label="Income Source" value={profile.incomeSource} />
              {profile.address?.city && (
                <SummaryRow label="Location" value={`${profile.address.city}, ${profile.address.state}`} />
              )}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="animate-fade-up delay-4 w-full">
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
      <span className="text-xs text-muted font-medium">{label}</span>
      <span className="text-xs font-semibold text-navy text-right">{value}</span>
    </div>
  );
}
