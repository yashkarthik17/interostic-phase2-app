"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  FormInput,
  Button,
} from "@/components/ui/shell";
import { Lock, Shield } from "lucide-react";

export default function AddMethodPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);

  function handleCardGroup(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const next = [...cardNumber];
    next[index] = digits;
    setCardNumber(next);
  }

  function handleSave() {
    router.push("/billing/methods");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Add Payment Method" backHref="/billing/methods" />

      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-4">
              Card Details
            </p>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                Card Number
              </label>
              <div className="flex gap-2">
                {cardNumber.map((group, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    value={group}
                    onChange={(e) => handleCardGroup(i, e.target.value)}
                    className="w-full px-3 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-mono font-medium text-navy text-center placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
                  />
                ))}
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <FormInput
                label="Expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={setExpiry}
              />
              <FormInput
                label="CVV"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={setCvv}
              />
            </div>

            <FormInput
              label="Name on Card"
              placeholder="John Smith"
              value={name}
              onChange={setName}
            />

            {/* Set as default toggle */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
              <span className="text-sm font-semibold text-navy">Set as default</span>
              <button
                type="button"
                onClick={() => setSetAsDefault(!setAsDefault)}
                className={`relative w-[46px] h-[26px] rounded-full transition-colors duration-200 ${setAsDefault ? "bg-brand-green" : "bg-border-strong"}`}
              >
                <div className={`absolute top-[3px] w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${setAsDefault ? "translate-x-[23px]" : "translate-x-[3px]"}`} />
              </button>
            </div>
          </Card>
        </div>

        {/* Security Badge */}
        <div className="animate-fade-up delay-2">
          <div className="flex items-center justify-center gap-2 py-3">
            <Lock size={13} className="text-muted" />
            <span className="text-[0.6875rem] font-medium text-muted">
              256-bit SSL encrypted &middot; Secure storage
            </span>
            <Shield size={13} className="text-muted" />
          </div>
        </div>

        <div className="animate-fade-up delay-3">
          <Button onClick={handleSave}>Save Payment Method</Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
