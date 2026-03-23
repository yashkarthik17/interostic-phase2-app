"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Shield, Sparkles } from "lucide-react";
import { AppShell, ScreenContent, Button, Card } from "@/components/ui/shell";
import { getStore, defaultProfile, type UserProfile } from "@/lib/store";

function ConfettiDots() {
  const [dots, setDots] = useState<{ x: number; y: number; color: string; size: number; delay: number; rotation: number }[]>([]);

  useEffect(() => {
    // Brand colors for confetti
    const colors = ["#CC2229", "#1E7BC8", "#00A651", "#F59E0B", "#7C3AED", "#0D9488"];
    const generated = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
      delay: Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));
    setDots(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            borderRadius: dot.size > 6 ? "2px" : "50%",
            opacity: 0,
            transform: `rotate(${dot.rotation}deg)`,
            animation: `confettiFall 2.5s ease-out ${dot.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 0; transform: translateY(-30px) scale(0) rotate(0deg); }
          20% { opacity: 1; transform: translateY(0) scale(1.2) rotate(90deg); }
          60% { opacity: 0.8; transform: translateY(20px) scale(1) rotate(180deg); }
          100% { opacity: 0; transform: translateY(60px) scale(0.3) rotate(360deg); }
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
        <div className="animate-celebrate relative mb-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full"
            style={{ background: "linear-gradient(135deg, rgba(0,166,81,0.15) 0%, rgba(0,166,81,0.05) 100%)" }}>
            <CheckCircle2 size={48} className="text-brand-green" strokeWidth={2} />
          </div>
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-9 h-9 rounded-full shadow-[var(--shadow-lift)]"
            style={{ background: "linear-gradient(135deg, #1E7BC8 0%, #1565A7 100%)" }}>
            <Shield size={15} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="animate-fade-up delay-2 flex items-center gap-2 mb-2">
          <Sparkles size={20} className="text-warning" />
          <h1 className="text-2xl font-bold text-navy text-center">
            You&apos;re All Set!
          </h1>
          <Sparkles size={20} className="text-warning" />
        </div>
        <p className="animate-fade-up delay-3 text-sm text-muted text-center mb-8 max-w-[300px]">
          Your profile is ready. Let&apos;s start resolving your tax situation together.
        </p>

        {/* Summary card */}
        <div className="animate-fade-up delay-4 w-full mb-8">
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
        <div className="animate-fade-up delay-5 w-full">
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
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted font-medium">{label}</span>
      <span className="text-[0.8125rem] font-semibold text-navy text-right">{value}</span>
    </div>
  );
}
