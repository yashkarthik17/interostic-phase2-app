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
          <Card>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-navy text-white text-lg font-bold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-navy">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-xs text-muted truncate">{profile.email}</p>
                <div className="mt-1.5">
                  <Badge variant="success">
                    <Zap size={10} />
                    Pro Plan
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="animate-fade-up delay-2">
          <Card className="!p-0 divide-y divide-border">
            {menuItems.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3.5 px-5 py-4 hover:bg-surface-alt transition-colors"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-alt">
                  <Icon size={17} className={color} />
                </div>
                <span className="flex-1 text-sm font-semibold text-navy">{label}</span>
                <ChevronRight size={16} className="text-placeholder" />
              </Link>
            ))}
          </Card>
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
