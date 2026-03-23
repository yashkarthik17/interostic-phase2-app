"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  ToggleSwitch,
  SectionHeader,
} from "@/components/ui/shell";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  Moon,
  Link2,
  Database,
  Trash2,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppShell hideNav>
      <ScreenHeader title="Settings" backHref="/account" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Notifications */}
        <div className="animate-fade-up delay-1">
          <SectionHeader title="Notifications" subtitle="Manage how you receive updates" />
          <Card className="!p-0 divide-y divide-border">
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light">
                <Mail size={16} className="text-brand-blue" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Email notifications</span>
              <ToggleSwitch checked={emailNotif} onChange={setEmailNotif} />
            </div>
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-green-light">
                <Bell size={16} className="text-brand-green" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Push notifications</span>
              <ToggleSwitch checked={pushNotif} onChange={setPushNotif} />
            </div>
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-light">
                <Smartphone size={16} className="text-violet" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">SMS notifications</span>
              <ToggleSwitch checked={smsNotif} onChange={setSmsNotif} />
            </div>
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-light">
                <MessageSquare size={16} className="text-teal" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Case updates</span>
              <ToggleSwitch checked={caseUpdates} onChange={setCaseUpdates} />
            </div>
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-warning-light">
                <Mail size={16} className="text-warning" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Marketing emails</span>
              <ToggleSwitch checked={marketingEmails} onChange={setMarketingEmails} />
            </div>
          </Card>
        </div>

        {/* Privacy */}
        <div className="animate-fade-up delay-2">
          <SectionHeader title="Privacy" subtitle="Control your data and security" accent="green" />
          <Card className="!p-0 divide-y divide-border">
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light">
                <Eye size={16} className="text-brand-blue" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Profile visibility</span>
              <ToggleSwitch checked={profileVisible} onChange={setProfileVisible} />
            </div>
            <Link href="/account/2fa" className="flex items-center gap-3.5 px-5 py-4 hover:bg-surface-alt transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-green-light">
                <Shield size={16} className="text-brand-green" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Two-factor authentication</span>
              <ChevronRight size={16} className="text-placeholder" />
            </Link>
          </Card>
        </div>

        {/* Appearance */}
        <div className="animate-fade-up delay-3">
          <SectionHeader title="Appearance" />
          <Card className="!p-0">
            <div className="flex items-center gap-3.5 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light">
                <Moon size={16} className="text-navy" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy">Dark mode</span>
              <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
            </div>
          </Card>
        </div>

        {/* Connected Services */}
        <div className="animate-fade-up delay-4">
          <SectionHeader title="Connected Services" />
          <Card className="!p-0">
            <button type="button" className="flex items-center gap-3.5 px-5 py-4 w-full hover:bg-surface-alt transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light">
                <Link2 size={16} className="text-brand-blue" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy text-left">Manage connections</span>
              <ChevronRight size={16} className="text-placeholder" />
            </button>
          </Card>
        </div>

        {/* Data */}
        <div className="animate-fade-up delay-5">
          <SectionHeader title="Data" accent="red" />
          <Card className="!p-0 divide-y divide-border">
            <button type="button" className="flex items-center gap-3.5 px-5 py-4 w-full hover:bg-surface-alt transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy-light">
                <Database size={16} className="text-brand-blue" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy text-left">Export my data</span>
              <ChevronRight size={16} className="text-placeholder" />
            </button>
            <Link href="/settings/delete" className="flex items-center gap-3.5 px-5 py-4 hover:bg-danger-light transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-danger-light">
                <Trash2 size={16} className="text-danger" />
              </div>
              <span className="flex-1 text-sm font-semibold text-danger text-left">Delete account</span>
              <ChevronRight size={16} className="text-placeholder" />
            </Link>
          </Card>
        </div>

        {/* App Version */}
        <div className="animate-fade-up delay-6">
          <p className="text-center text-[0.625rem] text-placeholder py-4">
            BlastTax v2.4.0 (Build 2026.03.22)
          </p>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
