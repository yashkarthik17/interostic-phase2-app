"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  IconCircle,
} from "@/components/ui/shell";
import {
  Building2,
  FileX,
  Globe,
  Heart,
  Shield,
  UserCheck,
  Calculator,
  Users,
  Search,
  FileEdit,
  ChevronRight,
} from "lucide-react";

const specialtyCards = [
  {
    href: "/specialty/tfrp",
    icon: Building2,
    color: "red" as const,
    title: "Trust Fund Recovery Penalty",
    desc: "Personal liability for unpaid payroll taxes",
  },
  {
    href: "/specialty/sfr-dispute",
    icon: FileX,
    color: "warning" as const,
    title: "SFR Dispute",
    desc: "Challenge a Substitute for Return filed by the IRS",
  },
  {
    href: "/specialty/fbar",
    icon: Globe,
    color: "blue" as const,
    title: "FBAR Penalties",
    desc: "Foreign Bank Account Report penalty resolution",
  },
  {
    href: "/specialty/deceased",
    icon: Heart,
    color: "violet" as const,
    title: "Deceased Taxpayer",
    desc: "Handling tax obligations for a deceased person",
  },
  {
    href: "/specialty/military",
    icon: Shield,
    color: "navy" as const,
    title: "Military SCRA",
    desc: "Servicemembers Civil Relief Act protections",
  },
  {
    href: "/specialty/revenue-officer",
    icon: UserCheck,
    color: "teal" as const,
    title: "Revenue Officer",
    desc: "Guide to interacting with an assigned Revenue Officer",
  },
  {
    href: "/specialty/csed-calculator",
    icon: Calculator,
    color: "green" as const,
    title: "CSED Tolling Calculator",
    desc: "Calculate when your tax debt expires",
  },
  {
    href: "/specialty/injured-spouse",
    icon: Users,
    color: "violet" as const,
    title: "Injured Spouse",
    desc: "Protect your share of a joint refund (Form 8379)",
  },
  {
    href: "/specialty/audit-recon",
    icon: Search,
    color: "blue" as const,
    title: "Audit Reconsideration",
    desc: "Reopen a closed audit to present new information",
  },
  {
    href: "/specialty/amended-return",
    icon: FileEdit,
    color: "teal" as const,
    title: "Amended Return",
    desc: "Correct a previously filed return (Form 1040-X)",
  },
];

export default function SpecialtyPage() {
  return (
    <AppShell>
      <ScreenHeader title="Specialty Tax Situations" backHref="/resolve" />

      <ScreenContent className="space-y-3 pt-1">
        <p className="text-sm text-muted mb-1 animate-fade-up">
          These situations require specialized knowledge and a targeted approach.
          Select the topic that applies to you.
        </p>

        {specialtyCards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="animate-fade-up flex items-center gap-4 p-4 bg-white border border-border rounded-2xl transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
            style={{ animationDelay: `${(i + 1) * 0.06}s` }}
          >
            <IconCircle icon={card.icon} color={card.color} size={46} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">{card.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {card.desc}
              </p>
            </div>
            <ChevronRight size={18} className="text-placeholder shrink-0" />
          </Link>
        ))}
      </ScreenContent>
    </AppShell>
  );
}
