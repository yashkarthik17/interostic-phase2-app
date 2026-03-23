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
  SectionHeader,
  StickyFooter,
  ContextCard,
} from "@/components/ui/shell";
import {
  Lock,
  Info,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { defaultProfile } from "@/lib/store";

export default function Form656Page() {
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [email, setEmail] = useState(defaultProfile.email);
  const [offerBasis, setOfferBasis] = useState<"datc" | "eta">("datc");
  const [paymentOption, setPaymentOption] = useState<"lump" | "periodic">(
    "lump"
  );
  const [selectedYears, setSelectedYears] = useState<Record<string, boolean>>({
    "2021": true,
    "2022": true,
    "2023": true,
  });

  const toggleYear = (year: string) =>
    setSelectedYears((prev) => ({ ...prev, [year]: !prev[year] }));

  return (
    <AppShell hideNav>
      <ScreenHeader title="Form 656" backHref="/forms" />
      <ProgressBar value={12.5} steps="Step 1 of 8" label="OIC Application" />
      <ScreenContent className="space-y-5 pt-3">
        {/* Guide Banner */}
        <div className="animate-fade-up delay-1">
          <ContextCard icon={Info} title="Pre-filled Information" variant="green">
            We&apos;ve pre-filled your information from your profile and analysis.
            Locked fields are pulled from IRS transcripts. Review and complete
            the remaining fields.
          </ContextCard>
        </div>

        {/* Taxpayer Info (Pre-filled / Locked) */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Taxpayer Information" subtitle="Verified from your profile" />
          <Card className="space-y-3">
            {/* Locked fields */}
            {[
              { label: "Full Name", value: `${defaultProfile.firstName} ${defaultProfile.lastName}` },
              { label: "SSN", value: defaultProfile.ssn },
              { label: "Date of Birth", value: "March 15, 1985" },
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

            {/* Editable fields */}
            <FormInput
              label="Phone Number"
              value={phone}
              onChange={setPhone}
              type="tel"
            />
            <FormInput
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
            />
          </Card>
        </div>

        {/* Spouse Info (conditional) */}
        <div className="animate-fade-up delay-3">
          <Card className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-alt shrink-0">
              <Info size={16} className="text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy">Spouse Information</p>
              <p className="text-xs text-muted">
                Filing status: <span className="font-bold text-navy">Single</span> &mdash; spouse section not required
              </p>
            </div>
          </Card>
        </div>

        {/* Tax Years */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Tax Years Included
          </p>
          <Card className="space-y-2.5">
            {[
              { year: "2021", amount: "$18,500" },
              { year: "2022", amount: "$15,250" },
              { year: "2023", amount: "$13,500" },
            ].map((item) => (
              <button
                key={item.year}
                type="button"
                onClick={() => toggleYear(item.year)}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-alt hover:bg-border transition-colors"
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-md border-[1.5px] transition-all ${
                    selectedYears[item.year]
                      ? "bg-brand-green border-brand-green"
                      : "border-border-strong bg-white"
                  }`}
                >
                  {selectedYears[item.year] && (
                    <CheckCircle2 size={14} className="text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-bold text-navy">
                    Tax Year {item.year}
                  </span>
                </div>
                <span className="text-sm font-bold text-navy">{item.amount}</span>
              </button>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                Total Selected
              </span>
              <span className="text-base font-black text-navy">$47,250</span>
            </div>
          </Card>
        </div>

        {/* Offer Basis */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Basis for Offer
          </p>
          <Card className="space-y-2.5">
            <button
              type="button"
              onClick={() => setOfferBasis("datc")}
              className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                offerBasis === "datc"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border bg-white hover:border-border-strong"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                  offerBasis === "datc"
                    ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                    : "border-border-strong bg-white"
                }`}
              />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy">
                    Doubt as to Collectibility (DATC)
                  </p>
                  {offerBasis === "datc" && (
                    <Badge variant="success">Selected</Badge>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed mt-0.5">
                  You agree you owe the tax but don&apos;t have the income or
                  assets to pay the full amount before the collection statute expires.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setOfferBasis("eta")}
              className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                offerBasis === "eta"
                  ? "border-brand-green bg-brand-green-light"
                  : "border-border bg-white hover:border-border-strong"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                  offerBasis === "eta"
                    ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                    : "border-border-strong bg-white"
                }`}
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-navy">
                  Effective Tax Administration (ETA)
                </p>
                <p className="text-xs text-muted leading-relaxed mt-0.5">
                  You may be able to pay the full amount, but doing so would
                  create economic hardship or would be unfair and inequitable.
                </p>
              </div>
            </button>
          </Card>
        </div>

        {/* Offer Amount */}
        <div className="animate-fade-up delay-4">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Offer Amount
          </p>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light shrink-0">
                <DollarSign size={18} className="text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-black text-navy">$8,500</p>
                <p className="text-xs text-muted font-semibold">
                  Recommended offer amount
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-surface-alt rounded-xl mb-3">
              <AlertCircle size={14} className="text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-muted leading-relaxed">
                <span className="font-bold text-navy">
                  Minimum offer: $33,668 RCP
                </span>{" "}
                &mdash; your calculated Reasonable Collection Potential. We
                recommend offering <span className="font-bold text-navy">$8,500</span>{" "}
                based on your special circumstances and DATC analysis.
              </p>
            </div>

            {/* Payment Options */}
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
              Payment Option
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentOption("lump")}
                className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                  paymentOption === "lump"
                    ? "border-brand-green bg-brand-green-light"
                    : "border-border bg-white hover:border-border-strong"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                    paymentOption === "lump"
                      ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                      : "border-border-strong bg-white"
                  }`}
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy">
                      Lump Sum Cash
                    </p>
                    <Badge variant="success">Recommended</Badge>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    20% deposit ($1,700) with application, remainder within 5
                    months of acceptance
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption("periodic")}
                className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-[1.5px] transition-all ${
                  paymentOption === "periodic"
                    ? "border-brand-green bg-brand-green-light"
                    : "border-border bg-white hover:border-border-strong"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-[2px] mt-0.5 shrink-0 transition-all ${
                    paymentOption === "periodic"
                      ? "border-brand-green bg-brand-green shadow-[inset_0_0_0_2px_white]"
                      : "border-border-strong bg-white"
                  }`}
                />
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-navy">
                    Periodic Payment
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    First payment with application, then monthly payments over 6-24
                    months
                  </p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Low Income Certification */}
        <div className="animate-fade-up delay-5">
          <Card className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-info-light shrink-0">
              <Info size={16} className="text-info" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy">
                Low-Income Certification
              </p>
              <p className="text-xs text-muted leading-relaxed">
                You may qualify to have the application fee and initial payment
                waived.
              </p>
            </div>
            <ExternalLink size={14} className="text-brand-blue shrink-0" />
          </Card>
        </div>

        {/* Compliance Terms */}
        <div className="animate-fade-up delay-5">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2">
              Compliance Terms
            </p>
            <div className="space-y-2">
              {[
                "File all required tax returns for the next 5 years",
                "Pay all taxes owed on time for the next 5 years",
                "Make all scheduled offer payments on time",
                "Provide updated financial information if requested",
                "Comply with all IRS laws and regulations",
              ].map((term) => (
                <div key={term} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="text-brand-green shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted leading-relaxed">{term}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </ScreenContent>
      <StickyFooter>
        <Button href="/forms">
          Save &amp; Continue
          <ChevronRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
