"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  IconCircle,
} from "@/components/ui/shell";
import {
  PauseCircle,
  Users,
  Gavel,
  Link2,
  Plane,
  ChevronRight,
} from "lucide-react";

const reliefOptions = [
  {
    href: "/relief/cnc",
    icon: PauseCircle,
    color: "blue" as const,
    title: "Currently Not Collectible (CNC)",
    desc: "Pause IRS collections when you cannot afford to pay",
  },
  {
    href: "/penalty/spouse-relief",
    icon: Users,
    color: "violet" as const,
    title: "Spouse Relief",
    desc: "Innocent or injured spouse relief options",
  },
  {
    href: "/relief/cdp",
    icon: Gavel,
    color: "teal" as const,
    title: "CDP Hearing (Form 12153)",
    desc: "Collection Due Process hearing to challenge IRS actions",
  },
  {
    href: "/relief/lien-release",
    icon: Link2,
    color: "warning" as const,
    title: "Lien & Levy Release",
    desc: "Discharge, subordination, or withdrawal of liens and levies",
  },
  {
    href: "/relief/passport",
    icon: Plane,
    color: "red" as const,
    title: "Passport Certification",
    desc: "Resolve seriously delinquent tax debt affecting your passport",
  },
];

export default function ReliefPage() {
  return (
    <AppShell>
      <ScreenHeader title="Other Relief Options" backHref="/resolve" />

      <ScreenContent className="space-y-3 pt-1">
        <p className="text-sm text-muted mb-1 animate-fade-up">
          Beyond installment agreements and offers in compromise, the IRS provides
          several other relief options. Find the one that fits your situation.
        </p>

        {reliefOptions.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="animate-fade-up flex items-center gap-4 p-4 bg-white border border-border rounded-2xl transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
            style={{ animationDelay: `${(i + 1) * 0.06}s` }}
          >
            <IconCircle icon={item.icon} color={item.color} size={46} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">{item.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <ChevronRight size={18} className="text-placeholder shrink-0" />
          </Link>
        ))}
      </ScreenContent>
    </AppShell>
  );
}
