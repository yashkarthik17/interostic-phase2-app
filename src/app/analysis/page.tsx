"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, Users, Sparkles, Zap, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, Card, Badge, Button } from "@/components/ui/shell";
import { getStore, setStore } from "@/lib/store";

const entityTypes = [
  { id: "individual" as const, label: "Individual", desc: "Personal tax debt", icon: User, color: "blue" },
  { id: "business" as const, label: "Business", desc: "Business tax debt", icon: Building2, color: "teal" },
  { id: "both" as const, label: "Both", desc: "Personal & business", icon: Users, color: "violet" },
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
          {/* Entity Type */}
          <div className="animate-fade-up">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Entity Type</h2>
            <div className="grid grid-cols-3 gap-3">
              {entityTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setEntity(t.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-[1.5px] transition-all duration-200 active:scale-[0.97] ${
                    entity === t.id
                      ? "border-brand-blue bg-navy-light shadow-sm"
                      : "border-border bg-white hover:border-border-strong"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
                      entity === t.id ? "bg-brand-blue/10 text-brand-blue" : "bg-surface-alt text-muted"
                    }`}
                  >
                    <t.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-navy">{t.label}</span>
                  <span className="text-[10px] text-muted leading-tight text-center">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Depth */}
          <div className="animate-fade-up delay-2">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Analysis Depth</h2>
            <div className="space-y-2.5">
              {analysisDepths.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDepth(d.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[1.5px] text-left transition-all duration-200 active:scale-[0.99] ${
                    depth === d.id
                      ? "border-brand-blue bg-navy-light shadow-sm"
                      : "border-border bg-white hover:border-border-strong"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors ${
                      depth === d.id ? "bg-brand-blue/10 text-brand-blue" : "bg-surface-alt text-muted"
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
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      depth === d.id ? "border-brand-blue bg-brand-blue" : "border-border-strong"
                    }`}
                  >
                    {depth === d.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Begin Button */}
          <div className="animate-fade-up delay-4 pt-2 pb-4">
            <Button disabled={!entity || !depth} onClick={handleBegin}>
              Begin Analysis <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
