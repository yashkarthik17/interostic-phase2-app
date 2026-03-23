"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, Users, Sparkles, Zap, AlertTriangle, Clock, ArrowRight, Shield } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, SectionHeader, ContextCard, Card, Badge, Button, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore } from "@/lib/store";

const entityTypes = [
  { id: "individual" as const, label: "Individual", desc: "Personal tax debt", icon: User, gradient: "from-brand-blue-50 to-brand-blue-light/80", activeBorder: "border-brand-blue", activeGlow: "shadow-[var(--shadow-glow-blue)]", color: "text-brand-blue", bg: "bg-brand-blue/10" },
  { id: "business" as const, label: "Business", desc: "Business tax debt", icon: Building2, gradient: "from-teal-light to-teal-light/60", activeBorder: "border-teal", activeGlow: "shadow-[0_0_0_3px_rgba(13,148,136,0.12)]", color: "text-teal", bg: "bg-teal/10" },
  { id: "both" as const, label: "Both", desc: "Personal & business", icon: Users, gradient: "from-violet-light to-violet-light/60", activeBorder: "border-violet", activeGlow: "shadow-[0_0_0_3px_rgba(124,58,237,0.12)]", color: "text-violet", bg: "bg-violet/10" },
];

const analysisDepths = [
  { id: "full" as const, label: "Full Analysis", desc: "Complete evaluation of all resolution options", icon: Sparkles, recommended: true },
  { id: "quick" as const, label: "Quick Estimate", desc: "Fast overview of likely outcomes", icon: Zap, recommended: false },
  { id: "penalty" as const, label: "Penalty Focus", desc: "Focused on penalty abatement options", icon: AlertTriangle, recommended: false },
  { id: "csed" as const, label: "CSED Review", desc: "Collection statute expiration analysis", icon: Clock, recommended: false },
];

type EntityType = "individual" | "business" | "both";
type DepthType = "full" | "quick" | "penalty" | "csed";

export default function AnalysisPage() {
  const router = useRouter();
  const [entity, setEntity] = useState<EntityType | null>(null);
  const [depth, setDepth] = useState<DepthType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<{ entityType: string | null; analysisDepth: string | null }>("analysis", { entityType: null, analysisDepth: null });
    if (saved.entityType) setEntity(saved.entityType as EntityType);
    if (saved.analysisDepth) setDepth(saved.analysisDepth as DepthType);
    setMounted(true);
  }, []);

  const handleBegin = () => {
    const current = getStore("analysis", {});
    setStore("analysis", { ...current, entityType: entity, analysisDepth: depth, step: 0 });
    router.push("/analysis/welcome");
  };

  if (!mounted) return null;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Tax Resolution Analysis" backHref="/dashboard" />
      <ScreenContent>
        <div className="space-y-6 pt-2">
          {/* Context */}
          <div className="animate-fade-up">
            <ContextCard icon={Shield} title="Free & Confidential" variant="warm">
              <p>Your information is secure and never shared. This analysis helps identify the best IRS resolution strategy for your situation.</p>
            </ContextCard>
          </div>

          {/* Entity Type */}
          <div className="animate-fade-up delay-1">
            <SectionHeader title="Entity Type" subtitle="Who is the tax debt for?" />
            <div className="grid grid-cols-3 gap-3">
              {entityTypes.map((t) => {
                const selected = entity === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setEntity(t.id)}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-[1.5px] transition-all duration-200 active:scale-[0.97] ${
                      selected
                        ? `${t.activeBorder} bg-gradient-to-br ${t.gradient} ${t.activeGlow}`
                        : "border-border bg-white hover:border-border-strong shadow-[var(--shadow-card)]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                        selected ? `${t.bg} ${t.color}` : "bg-surface-alt text-muted"
                      }`}
                    >
                      <t.icon size={22} />
                    </div>
                    <span className="text-xs font-bold text-navy">{t.label}</span>
                    <span className="text-[10px] text-muted leading-tight text-center">{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Analysis Depth */}
          <div className="animate-fade-up delay-2">
            <SectionHeader title="Analysis Depth" subtitle="How thorough should we go?" />
            <div className="space-y-2.5">
              {analysisDepths.map((d) => {
                const selected = depth === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDepth(d.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[1.5px] text-left transition-all duration-200 active:scale-[0.99] ${
                      selected
                        ? "border-brand-blue bg-brand-blue-50 shadow-[var(--shadow-glow-blue)]"
                        : d.recommended
                        ? "border-brand-green/30 bg-gradient-to-r from-brand-green-50/50 to-white shadow-[var(--shadow-card)] hover:border-brand-green/50"
                        : "border-border bg-white shadow-[var(--shadow-card)] hover:border-border-strong"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors ${
                        selected ? "bg-brand-blue/10 text-brand-blue" : d.recommended ? "bg-brand-green/10 text-brand-green" : "bg-surface-alt text-muted"
                      }`}
                    >
                      <d.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy">{d.label}</span>
                        {d.recommended && <Badge variant="success">Recommended</Badge>}
                      </div>
                      <p className="text-xs text-muted mt-0.5">{d.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                        selected ? "border-brand-blue bg-brand-blue" : "border-border-strong"
                      }`}
                    >
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <Button disabled={!entity || !depth} onClick={handleBegin}>
          Begin Analysis <ArrowRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
