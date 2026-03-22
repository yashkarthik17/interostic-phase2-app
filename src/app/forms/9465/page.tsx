"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  FormInput,
  Badge,
} from "@/components/ui/shell";
import {
  Lock,
  Info,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  CreditCard,
  Building2,
  AlertCircle,
} from "lucide-react";
import { defaultProfile, formatCurrency } from "@/lib/store";

export default function Form9465Page() {
  const [monthlyPayment, setMonthlyPayment] = useState("657");
  const [paymentMethod, setPaymentMethod] = useState<
    "ddia" | "check" | "payroll"
  >("ddia");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const taxYears = [
    { year: "2021", amount: 18500 },
    { year: "2022", amount: 15250 },
    { year: "2023", amount: 13500 },
  ];
  const total = taxYears.reduce((sum, y) => sum + y.amount, 0);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Form 9465" backHref="/forms" />
      <ProgressBar
        value={33}
        steps="Step 1 of 3"
        label="Installment Agreement"
      />
      <ScreenContent className="space-y-5 pt-3">
        {/* Guide */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-start gap-3 p-4 bg-brand-green-light rounded-2xl">
            <Info size={18} className="text-brand-green shrink-0 mt-0.5" />
            <p className="text-xs text-brand-green-dark font-semibold leading-relaxed">
              This form requests a monthly installment plan to pay your tax debt
              over time. We&apos;ve pre-filled your information to make it easy.
            </p>
          </div>
        </div>

        {/* Taxpayer Info (Pre-filled) */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Taxpayer Information
          </p>
          <Card className="space-y-3">
            {[
              {
                label: "Full Name",
                value: `${defaultProfile.firstName} ${defaultProfile.lastName}`,
              },
              { label: "SSN", value: defaultProfile.ssn },
              {
                label: "Address",
                value: `${defaultProfile.address.street}, ${defaultProfile.address.city}, ${defaultProfile.address.state} ${defaultProfile.address.zip}`,
              },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                  {field.label}
                </label>
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl">
                  <span className="text-sm font-medium text-navy flex-1">
                    {field.value}
                  </span>
                  <Lock size={14} className="text-placeholder shrink-0" />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Tax Years & Amounts */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Tax Years and Amounts Owed
          </p>
          <Card className="!p-0">
            {taxYears.map((item, i) => (
              <div
                key={item.year}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i < taxYears.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-navy bg-surface-alt px-2 py-1 rounded-lg">
                    {item.year}
                  </span>
                  <span className="text-xs text-muted font-semibold">
                    Form 1040
                  </span>
                </div>
                <span className="text-sm font-bold text-navy">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-3.5 bg-surface-alt">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                Total Owed
              </span>
              <span className="text-base font-black text-navy">
                {formatCurrency(total)}
              </span>
            </div>
          </Card>
        </div>

        {/* Proposed Monthly Payment */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Proposed Monthly Payment
          </p>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light shrink-0">
                <DollarSign size={18} className="text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <FormInput
                  label="Monthly Amount"
                  value={monthlyPayment}
                  onChange={setMonthlyPayment}
                  type="text"
                  placeholder="$657"
                />
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-surface-alt rounded-xl">
              <AlertCircle
                size={14}
                className="text-warning shrink-0 mt-0.5"
              />
              <p className="text-xs text-muted leading-relaxed">
                <span className="font-bold text-navy">IRS Minimum: $657/month</span>{" "}
                &mdash; based on a 72-month payoff period. Higher payments will
                reduce total interest and penalties.
              </p>
            </div>
          </Card>
        </div>

        {/* Payment Method */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Payment Method
          </p>
          <Card className="space-y-2.5">
            {/* DDIA */}
            <button
              type="button"
              onClick={() => setPaymentMethod("ddia")}
              className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                paymentMethod === "ddia"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border bg-white hover:border-border-strong"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                  paymentMethod === "ddia"
                    ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                    : "border-border-strong bg-white"
                }`}
              />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-navy" />
                  <p className="text-sm font-bold text-navy">
                    Direct Debit (DDIA)
                  </p>
                  <Badge variant="success">Recommended</Badge>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Automatic monthly withdrawal from your bank account. Reduces
                  user fee and avoids missed payments.
                </p>
              </div>
            </button>

            {/* Check */}
            <button
              type="button"
              onClick={() => setPaymentMethod("check")}
              className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                paymentMethod === "check"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border bg-white hover:border-border-strong"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                  paymentMethod === "check"
                    ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                    : "border-border-strong bg-white"
                }`}
              />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-navy" />
                  <p className="text-sm font-bold text-navy">
                    Check / Money Order
                  </p>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Mail monthly payments by the due date each month
                </p>
              </div>
            </button>

            {/* Payroll */}
            <button
              type="button"
              onClick={() => setPaymentMethod("payroll")}
              className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                paymentMethod === "payroll"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border bg-white hover:border-border-strong"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                  paymentMethod === "payroll"
                    ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                    : "border-border-strong bg-white"
                }`}
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-navy">
                  Payroll Deduction
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Employer deducts payment directly from your paycheck
                </p>
              </div>
            </button>
          </Card>
        </div>

        {/* Bank Account Info (for DDIA) */}
        {paymentMethod === "ddia" && (
          <div className="animate-fade-up">
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
              Bank Account Information
            </p>
            <Card className="space-y-3">
              <div className="flex items-start gap-2.5 p-3 bg-info-light rounded-xl mb-1">
                <Info size={14} className="text-info shrink-0 mt-0.5" />
                <p className="text-xs text-info font-semibold leading-relaxed">
                  Your bank details are securely transmitted directly to the IRS
                  for direct debit setup.
                </p>
              </div>
              <FormInput
                label="Routing Number"
                value={routingNumber}
                onChange={setRoutingNumber}
                placeholder="9 digits"
              />
              <FormInput
                label="Account Number"
                value={accountNumber}
                onChange={setAccountNumber}
                placeholder="Your checking account number"
              />
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-green shrink-0" />
                <span className="text-xs font-semibold text-muted">
                  Must be a checking account
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* Submit */}
        <div className="animate-fade-up delay-5 pb-2">
          <Button href="/forms">
            Submit Request
            <ChevronRight size={16} />
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
