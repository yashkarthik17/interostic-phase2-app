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
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { Lock, Shield, Zap, Tag } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  function handleCardGroup(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const next = [...cardNumber];
    next[index] = digits;
    setCardNumber(next);
  }

  function handleSubmit() {
    router.push("/billing/processing");
  }

  return (
    <AppShell hideNav>
      <ScreenHeader title="Checkout" backHref="/billing/plans" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Order Summary */}
        <div className="animate-fade-up delay-1">
          <Card>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green-light">
                <Zap size={22} className="text-brand-green" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-navy">Pro Plan</h3>
                <p className="text-xs text-muted">Monthly subscription</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-navy">$49.00</p>
                <p className="text-[0.625rem] text-muted">/month</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Promo Code */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={15} className="text-muted" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                Promo Code
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
              />
              <button
                type="button"
                onClick={() => setPromoApplied(true)}
                className="px-5 py-3 bg-navy text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="mt-2 text-xs font-semibold text-brand-green">
                Promo code applied! 10% off your first month.
              </p>
            )}
          </Card>
        </div>

        {/* Payment Form */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} className="text-brand-green" />
              <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider">
                Payment Details
              </p>
            </div>

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

            <div className="mb-4">
              <FormInput
                label="Name on Card"
                placeholder="John Smith"
                value={name}
                onChange={setName}
              />
            </div>

            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3 mt-5">
              Billing Address
            </p>

            <div className="space-y-3">
              <FormInput label="Address" placeholder="123 Main St" value={address} onChange={setAddress} />
              <div className="grid grid-cols-3 gap-3">
                <FormInput label="City" placeholder="City" value={city} onChange={setCity} />
                <FormInput label="State" placeholder="CA" value={state} onChange={setState} />
                <FormInput label="ZIP" placeholder="90001" value={zip} onChange={setZip} />
              </div>
            </div>
          </Card>
        </div>

        {/* Security Badge */}
        <div className="animate-fade-up delay-4">
          <ContextCard icon={Shield} title="Secure Checkout" variant="green">
            Your payment is protected with 256-bit SSL encryption. We never store your full card number on our servers.
          </ContextCard>
        </div>

        {/* Pay Button */}
        <div className="animate-fade-up delay-5">
          <Button onClick={handleSubmit}>
            <Lock size={16} />
            Pay {promoApplied ? "$44.10" : "$49.00"} Securely
          </Button>
          <p className="text-center text-[0.625rem] text-muted mt-3">
            By proceeding, you agree to our{" "}
            <a href="/billing/agreements" className="text-brand-blue underline">Terms of Service</a>{" "}
            and{" "}
            <a href="/billing/agreements" className="text-brand-blue underline">Privacy Policy</a>.
          </p>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
