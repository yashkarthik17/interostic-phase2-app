"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  Button,
} from "@/components/ui/shell";
import { CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const initialMethods: PaymentMethod[] = [
  { id: "1", brand: "Visa", last4: "4242", expiry: "12/27", isDefault: true },
  { id: "2", brand: "Mastercard", last4: "8888", expiry: "06/28", isDefault: false },
];

const brandColors: Record<string, string> = {
  Visa: "text-brand-blue",
  Mastercard: "text-brand-red",
};

export default function MethodsPage() {
  const [methods, setMethods] = useState(initialMethods);
  const [removing, setRemoving] = useState<string | null>(null);

  function handleRemove(id: string) {
    if (removing === id) {
      setMethods((prev) => prev.filter((m) => m.id !== id));
      setRemoving(null);
    } else {
      setRemoving(id);
    }
  }

  function handleSetDefault(id: string) {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Payment Methods" backHref="/billing" />

      <ScreenContent className="space-y-4 pt-2">
        {methods.map((method, idx) => (
          <div key={method.id} className={`animate-fade-up delay-${idx + 1}`}>
            <Card>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-alt">
                  <CreditCard size={22} className={brandColors[method.brand] || "text-navy"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-navy">{method.brand}</p>
                    {method.isDefault && <Badge variant="success">Default</Badge>}
                  </div>
                  <p className="text-xs text-muted">
                    **** **** **** {method.last4} &middot; Expires {method.expiry}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                {!method.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(method.id)}
                    className="flex-1 py-2 text-xs font-bold text-brand-blue hover:bg-navy-light rounded-lg transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(method.id)}
                  className={`flex items-center justify-center gap-1.5 flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    removing === method.id
                      ? "bg-danger-light text-danger"
                      : "text-muted hover:text-danger hover:bg-danger-light"
                  }`}
                >
                  <Trash2 size={13} />
                  {removing === method.id ? "Tap to Confirm" : "Remove"}
                </button>
              </div>
            </Card>
          </div>
        ))}

        <div className={`animate-fade-up delay-${methods.length + 1}`}>
          <Button href="/billing/add-method" variant="outline">
            <Plus size={18} />
            Add Payment Method
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
