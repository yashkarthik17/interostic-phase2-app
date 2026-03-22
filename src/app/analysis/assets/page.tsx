"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Landmark, TrendingUp, PiggyBank, Home, Car, Heart, Bitcoin, Package, ChevronRight, ArrowRight } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button } from "@/components/ui/shell";
import { getStore, setStore, formatCurrency } from "@/lib/store";

const assetCategories = [
  { id: "bank-accounts", label: "Bank Accounts", icon: Landmark, color: "text-brand-blue", bg: "bg-brand-blue/10", defaultCount: 2, defaultTotal: 4850 },
  { id: "investments", label: "Investments", icon: TrendingUp, color: "text-violet", bg: "bg-violet/10", defaultCount: 1, defaultTotal: 12300 },
  { id: "retirement", label: "Retirement", icon: PiggyBank, color: "text-teal", bg: "bg-teal/10", defaultCount: 1, defaultTotal: 45200 },
  { id: "real-estate", label: "Real Estate", icon: Home, color: "text-brand-green", bg: "bg-brand-green/10", defaultCount: 1, defaultTotal: 285000 },
  { id: "vehicles", label: "Vehicles", icon: Car, color: "text-warning", bg: "bg-warning/10", defaultCount: 1, defaultTotal: 18500 },
  { id: "life-insurance", label: "Life Insurance", icon: Heart, color: "text-brand-red", bg: "bg-brand-red/10", defaultCount: 0, defaultTotal: 0 },
  { id: "crypto", label: "Crypto", icon: Bitcoin, color: "text-info", bg: "bg-info/10", defaultCount: 0, defaultTotal: 0 },
  { id: "other", label: "Other Assets", icon: Package, color: "text-muted", bg: "bg-surface-alt", defaultCount: 0, defaultTotal: 0 },
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
        <div className="space-y-3 pt-2">
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-navy mb-1">Your Assets</h2>
            <p className="text-sm text-muted">The IRS considers these when evaluating your Reasonable Collection Potential (RCP).</p>
          </div>

          {/* Total */}
          <div className="animate-fade-up delay-1">
            <Card className="!bg-navy">
              <div className="text-center">
                <span className="text-xs font-semibold text-white/60 uppercase">Total Asset Value</span>
                <p className="text-2xl font-black text-white mt-1">{formatCurrency(totalAssets)}</p>
              </div>
            </Card>
          </div>

          {/* Category Cards */}
          {assetCategories.map((cat, i) => {
            const data = assets[cat.id] || { count: 0, total: 0 };
            return (
              <div key={cat.id} className={`animate-fade-up delay-${Math.min(i + 2, 6)}`}>
                <Card onClick={() => router.push(`/analysis/assets/${cat.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-11 h-11 ${cat.bg} rounded-xl shrink-0`}>
                      <cat.icon size={20} className={cat.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy">{cat.label}</span>
                        {data.count > 0 && (
                          <Badge variant="primary">{data.count}</Badge>
                        )}
                      </div>
                      {data.total > 0 ? (
                        <span className="text-xs font-semibold text-muted mt-0.5 block">{formatCurrency(data.total)}</span>
                      ) : (
                        <span className="text-xs text-placeholder mt-0.5 block">No items added</span>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-muted shrink-0" />
                  </div>
                </Card>
              </div>
            );
          })}

          {/* Continue */}
          <div className="animate-fade-up delay-6 pt-2 pb-4">
            <Button onClick={() => router.push("/analysis/financials")}>
              Continue <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
