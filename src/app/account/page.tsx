"use client";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { defaultProfile } from "@/lib/store";
import {
  User,
  CreditCard,
  ExternalLink,
  Settings,
  HelpCircle,
  MessageCircle,
  Scale,
  ChevronRight,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  { label: "Edit Profile", href: "/account/edit", icon: User, color: "text-brand-blue" },
  { label: "Billing & Plans", href: "/billing", icon: CreditCard, color: "text-brand-green" },
  { label: "Payment Portal", href: "/billing/methods", icon: ExternalLink, color: "text-violet" },
  { label: "Settings", href: "/settings", icon: Settings, color: "text-muted" },
  { label: "FAQ & Help", href: "#", icon: HelpCircle, color: "text-teal" },
  { label: "Contact Support", href: "#", icon: MessageCircle, color: "text-brand-blue" },
  { label: "Legal", href: "/billing/agreements", icon: Scale, color: "text-muted" },
];

export default function AccountPage() {
  const profile = defaultProfile;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <AppShell>
      <ScreenHeader title="Account" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Profile Card */}
        <div className="animate-fade-up delay-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-navy p-6 shadow-[var(--shadow-lift)]">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
            <div className="relative z-10 flex items-center gap-4">
              {/* Avatar */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 text-white text-lg font-bold shrink-0 border border-white/20">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-xs text-white/60 truncate">{profile.email}</p>
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold bg-white/15 text-white border border-white/10">
                    <Zap size={10} />
                    Pro Plan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="animate-fade-up delay-2">
          <div className="space-y-2">
            {menuItems.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3.5 px-5 py-4 bg-white border border-border rounded-2xl shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-alt">
                  <Icon size={17} className={color} />
                </div>
                <span className="flex-1 text-sm font-semibold text-navy">{label}</span>
                <ChevronRight size={16} className="text-placeholder" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <div className="animate-fade-up delay-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-danger hover:bg-danger-light rounded-2xl transition-colors"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
