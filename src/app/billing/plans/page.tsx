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
import {
  Check,
  Zap,
  Crown,
  Building2,
  Star,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  recommended?: boolean;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: Star,
    iconColor: "text-muted",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Get started with basic features",
    features: [
      "Basic AI chat assistance",
      "1 tax analysis per month",
      "Limited resolution options",
      "Community support",
      "Basic document storage",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    iconColor: "text-brand-green",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Full-featured tax resolution",
    features: [
      "Unlimited AI chat assistance",
      "Full tax analysis & reports",
      "All resolution strategies",
      "Expert access & consultation",
      "IRS form generation",
      "Priority support",
      "Document vault (10GB)",
      "Case tracking & updates",
    ],
    recommended: true,
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    iconColor: "text-violet",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "Premium dedicated service",
    features: [
      "Everything in Pro",
      "Dedicated tax expert",
      "Unlimited analyses",
      "Phone & video support",
      "Custom resolution plans",
      "IRS representation",
      "Document vault (unlimited)",
      "Multi-year case management",
      "Compliance monitoring",
    ],
  },
];

export default function PlansPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Choose Your Plan" backHref="/billing" />

      <ScreenContent className="space-y-5 pt-2">
        {/* Toggle */}
        <div className="animate-fade-up delay-1">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!annual ? "text-navy" : "text-muted"}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className={`relative w-[52px] h-[28px] rounded-full transition-colors duration-200 ${annual ? "bg-brand-green" : "bg-border-strong"}`}
            >
              <div
                className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow transition-transform duration-200 ${annual ? "translate-x-[27px]" : "translate-x-[3px]"}`}
              />
            </button>
            <span className={`text-sm font-semibold ${annual ? "text-navy" : "text-muted"}`}>
              Annual
            </span>
            {annual && (
              <Badge variant="success">Save 20%</Badge>
            )}
          </div>
        </div>

        {/* Plan Cards */}
        {plans.map((plan, idx) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div key={plan.id} className={`animate-fade-up delay-${idx + 2}`}>
              <div
                className={`relative rounded-2xl border-[1.5px] p-5 transition-all duration-300 ${
                  plan.recommended
                    ? "border-brand-green bg-white shadow-lg shadow-brand-green/5"
                    : "border-border bg-white"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-green text-white text-[0.625rem] font-bold uppercase tracking-wider">
                      <Crown size={11} />
                      Recommended
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <plan.icon size={18} className={plan.iconColor} />
                      <h3 className="text-base font-bold text-navy">{plan.name}</h3>
                    </div>
                    <p className="text-xs text-muted">{plan.description}</p>
                  </div>
                  {plan.current && (
                    <Badge variant="primary">Current</Badge>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-black text-navy">${price}</span>
                  <span className="text-sm font-semibold text-muted">/mo</span>
                  {annual && plan.monthlyPrice > 0 && (
                    <span className="ml-2 text-xs text-muted line-through">
                      ${plan.monthlyPrice}/mo
                    </span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check size={15} className="text-brand-green mt-0.5 shrink-0" />
                      <span className="text-sm text-navy/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <Button variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : plan.monthlyPrice > 49 ? (
                  <Button href="/billing/checkout" variant="secondary">
                    Upgrade to {plan.name}
                  </Button>
                ) : plan.monthlyPrice === 0 ? (
                  <Button variant="ghost">
                    Downgrade to Free
                  </Button>
                ) : (
                  <Button href="/billing/checkout" variant="primary">
                    Upgrade to {plan.name}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </ScreenContent>
    </AppShell>
  );
}
