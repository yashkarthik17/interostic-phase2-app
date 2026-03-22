"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Trash2, Landmark, TrendingUp, PiggyBank, Home, Car, Heart, Bitcoin, Package, ArrowLeft } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, Card, Button, FormInput } from "@/components/ui/shell";
import { getStore, setStore, formatCurrency } from "@/lib/store";

const categoryMeta: Record<string, { label: string; icon: React.ElementType; fields: { key: string; label: string; placeholder: string; type?: string }[] }> = {
  "bank-accounts": {
    label: "Bank Accounts",
    icon: Landmark,
    fields: [
      { key: "institution", label: "Institution Name", placeholder: "Chase, Bank of America..." },
      { key: "accountType", label: "Account Type", placeholder: "Checking, Savings..." },
      { key: "balance", label: "Current Balance", placeholder: "$5,000", type: "text" },
    ],
  },
  investments: {
    label: "Investments",
    icon: TrendingUp,
    fields: [
      { key: "institution", label: "Brokerage", placeholder: "Fidelity, Schwab..." },
      { key: "accountType", label: "Account Type", placeholder: "Brokerage, Mutual Fund..." },
      { key: "balance", label: "Current Value", placeholder: "$10,000", type: "text" },
    ],
  },
  retirement: {
    label: "Retirement Accounts",
    icon: PiggyBank,
    fields: [
      { key: "institution", label: "Plan Provider", placeholder: "Fidelity, Vanguard..." },
      { key: "accountType", label: "Account Type", placeholder: "401(k), IRA, Roth IRA..." },
      { key: "balance", label: "Current Value", placeholder: "$50,000", type: "text" },
    ],
  },
  "real-estate": {
    label: "Real Estate",
    icon: Home,
    fields: [
      { key: "address", label: "Property Address", placeholder: "123 Main St..." },
      { key: "propertyType", label: "Property Type", placeholder: "Primary Residence, Rental..." },
      { key: "balance", label: "Fair Market Value", placeholder: "$300,000", type: "text" },
      { key: "mortgage", label: "Mortgage Balance", placeholder: "$200,000", type: "text" },
    ],
  },
  vehicles: {
    label: "Vehicles",
    icon: Car,
    fields: [
      { key: "description", label: "Year / Make / Model", placeholder: "2020 Toyota Camry" },
      { key: "balance", label: "Current Value", placeholder: "$18,000", type: "text" },
      { key: "loanBalance", label: "Loan Balance", placeholder: "$8,000", type: "text" },
    ],
  },
  "life-insurance": {
    label: "Life Insurance",
    icon: Heart,
    fields: [
      { key: "provider", label: "Insurance Provider", placeholder: "MetLife, Prudential..." },
      { key: "policyType", label: "Policy Type", placeholder: "Whole Life, Term..." },
      { key: "balance", label: "Cash Surrender Value", placeholder: "$5,000", type: "text" },
    ],
  },
  crypto: {
    label: "Cryptocurrency",
    icon: Bitcoin,
    fields: [
      { key: "exchange", label: "Exchange / Wallet", placeholder: "Coinbase, Ledger..." },
      { key: "holdings", label: "Holdings", placeholder: "BTC, ETH..." },
      { key: "balance", label: "Current Value", placeholder: "$3,000", type: "text" },
    ],
  },
  other: {
    label: "Other Assets",
    icon: Package,
    fields: [
      { key: "description", label: "Description", placeholder: "Art, jewelry, equipment..." },
      { key: "balance", label: "Estimated Value", placeholder: "$2,000", type: "text" },
    ],
  },
};

interface AssetItem {
  id: string;
  [key: string]: string;
}

export default function AssetTypePage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  const meta = categoryMeta[type];

  const [items, setItems] = useState<AssetItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<AssetItem[]>(`assets_${type}`, []);
    if (saved.length > 0) {
      setItems(saved);
    }
    setMounted(true);
  }, [type]);

  const saveItems = (updated: AssetItem[]) => {
    setItems(updated);
    setStore(`assets_${type}`, updated);
    // Update summary
    const summary = getStore<Record<string, { count: number; total: number }>>("asset_summary", {});
    const total = updated.reduce((s, item) => {
      const val = parseFloat((item.balance || "0").replace(/[^0-9.]/g, ""));
      return s + (isNaN(val) ? 0 : val);
    }, 0);
    summary[type] = { count: updated.length, total };
    setStore("asset_summary", summary);
  };

  const addItem = () => {
    const newItem: AssetItem = { id: Date.now().toString() };
    meta.fields.forEach((f) => (newItem[f.key] = ""));
    saveItems([...items, newItem]);
  };

  const updateItem = (id: string, key: string, value: string) => {
    saveItems(items.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const removeItem = (id: string) => {
    saveItems(items.filter((item) => item.id !== id));
  };

  if (!mounted || !meta) return null;

  const Icon = meta.icon;

  return (
    <AppShell hideNav>
      <ScreenHeader title={meta.label} backHref="/analysis/assets" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          <div className="animate-fade-up flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 bg-navy-light rounded-xl">
              <Icon size={20} className="text-navy" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy">{meta.label}</h2>
              <p className="text-xs text-muted">{items.length} item{items.length !== 1 ? "s" : ""} added</p>
            </div>
          </div>

          {/* Items */}
          {items.map((item, i) => (
            <div key={item.id} className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}>
              <Card>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase">Item {i + 1}</span>
                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-xs font-semibold text-danger hover:text-danger/80 transition-colors">
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                  {meta.fields.map((field) => (
                    <FormInput
                      key={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type || "text"}
                      value={item[field.key] || ""}
                      onChange={(v) => updateItem(item.id, field.key, v)}
                    />
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {/* Add Another */}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border-strong rounded-2xl text-sm font-bold text-muted hover:text-navy hover:border-navy transition-all duration-200"
          >
            <Plus size={16} /> Add {meta.label.replace(/s$/, "")}
          </button>

          {/* Back */}
          <div className="pt-2 pb-4">
            <Button variant="outline" onClick={() => router.push("/analysis/assets")}>
              <ArrowLeft size={16} /> Back to Overview
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
