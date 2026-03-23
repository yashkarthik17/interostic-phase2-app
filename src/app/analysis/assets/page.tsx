"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Landmark, TrendingUp, PiggyBank, Home, Car, Heart, Bitcoin, Package, ChevronRight, ArrowRight, Info } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button, SectionHeader, ContextCard, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore, formatCurrency } from "@/lib/store";

const assetCategories = [
  { id: "bank-accounts", label: "Bank Accounts", icon: Landmark, color: "text-brand-blue", bg: "bg-brand-blue/10", iconBg: "bg-gradient-to-br from-brand-blue-50 to-brand-blue-light", defaultCount: 2, defaultTotal: 4850 },
  { id: "investments", label: "Investments", icon: TrendingUp, color: "text-violet", bg: "bg-violet/10", iconBg: "bg-gradient-to-br from-violet-light to-violet-light/60", defaultCount: 1, defaultTotal: 12300 },
  { id: "retirement", label: "Retirement", icon: PiggyBank, color: "text-teal", bg: "bg-teal/10", iconBg: "bg-gradient-to-br from-teal-light to-teal-light/60", defaultCount: 1, defaultTotal: 45200 },
  { id: "real-estate", label: "Real Estate", icon: Home, color: "text-brand-green", bg: "bg-brand-green/10", iconBg: "bg-gradient-to-br from-brand-green-50 to-brand-green-light", defaultCount: 1, defaultTotal: 285000 },
  { id: "vehicles", label: "Vehicles", icon: Car, color: "text-warning", bg: "bg-warning/10", iconBg: "bg-gradient-to-br from-warning-light to-warning-light/60", defaultCount: 1, defaultTotal: 18500 },
  { id: "life-insurance", label: "Life Insurance", icon: Heart, color: "text-brand-red", bg: "bg-brand-red/10", iconBg: "bg-gradient-to-br from-brand-red-50 to-brand-red-light", defaultCount: 0, defaultTotal: 0 },
  { id: "crypto", label: "Crypto", icon: Bitcoin, color: "text-info", bg: "bg-info/10", iconBg: "bg-gradient-to-br from-info-light to-info-light/60", defaultCount: 0, defaultTotal: 0 },
  { id: "other", label: "Other Assets", icon: Package, color: "text-muted", bg: "bg-surface-alt", iconBg: "bg-gradient-to-br from-surface-alt to-surface-warm", defaultCount: 0, defaultTotal: 0 },
];

interface AssetSummary {
  [key: string]: { count: number; total: number };
}

export default function AssetsPage() {
  const router = useRouter();
  const [assets, setAssets] = useState<AssetSummary>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<AssetSummary>("asset_summary", {});
    if (Object.keys(saved).length > 0) {
      setAssets(saved);
    } else {
      const defaults: AssetSummary = {};
      assetCategories.forEach((c) => {
        defaults[c.id] = { count: c.defaultCount, total: c.defaultTotal };
      });
      setAssets(defaults);
      setStore("asset_summary", defaults);
    }
    setMounted(true);
  }, []);

  const totalAssets = Object.values(assets).reduce((s, a) => s + a.total, 0);

  if (!mounted) return null;

  return (
    <AppShell hideNav>
      <ScreenHeader title="Asset Overview" backHref="/analysis/case-info" />
      <ProgressBar value={70} label="Step 4 of 6" steps="Assets" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          <div className="animate-fade-up">
            <SectionHeader title="Your Assets" subtitle="The IRS considers these when evaluating your Reasonable Collection Potential (RCP)." accent="blue" />
          </div>

          {/* Context */}
          <div className="animate-fade-up delay-1">
            <ContextCard icon={Info} title="Why Assets Matter" variant="warm">
              <p>The IRS calculates how much you can pay based on your asset equity and monthly income. Being thorough here ensures we provide accurate resolution options.</p>
            </ContextCard>
          </div>

          {/* Total */}
          <div className="animate-fade-up delay-2">
            <Card className="!bg-navy">
              <div className="text-center">
                <span className="text-xs font-semibold text-white/60 uppercase">Total Asset Value</span>
                <p className="text-2xl font-black text-white mt-1">{formatCurrency(totalAssets)}</p>
              </div>
            </Card>
          </div>

          {/* Category Cards - Grid Layout */}
          <div className="grid grid-cols-2 gap-3 animate-fade-up delay-3">
            {assetCategories.map((cat) => {
              const data = assets[cat.id] || { count: 0, total: 0 };
              return (
                <Card key={cat.id} onClick={() => router.push(`/analysis/assets/${cat.id}`)} className="!p-4">
                  <div className="flex flex-col gap-3">
                    <div className={`flex items-center justify-center w-11 h-11 ${cat.iconBg} rounded-xl shadow-[var(--shadow-card)]`}>
                      <cat.icon size={20} className={cat.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-bold text-navy">{cat.label}</span>
                        {data.count > 0 && (
                          <Badge variant="primary">{data.count}</Badge>
                        )}
                      </div>
                      {data.total > 0 ? (
                        <span className="text-xs font-semibold text-muted block">{formatCurrency(data.total)}</span>
                      ) : (
                        <span className="text-xs text-placeholder block">No items</span>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-muted-light self-end" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <Button onClick={() => router.push("/analysis/financials")}>
          Continue <ArrowRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
