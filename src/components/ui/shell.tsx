"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Shield, Scale, Briefcase, User, ChevronLeft, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/expert", icon: Shield, label: "Expert" },
  { href: "/resolve", icon: Scale, label: "Resolve" },
  { href: "/cases", icon: Briefcase, label: "Cases" },
  { href: "/account", icon: User, label: "Account" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden flex justify-around items-center px-4 pt-2 pb-5 bg-white border-t border-border shrink-0"
      style={{ boxShadow: "0 -1px 3px rgba(10,22,40,0.04)" }}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] font-bold transition-colors ${active ? "text-brand-blue" : "text-placeholder hover:text-muted"}`}>
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border shrink-0">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <Image src="/logo.png" alt="BlastTax Debt" width={140} height={48} className="h-10 w-auto" />
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-muted hover:bg-surface-alt hover:text-navy"
              }`}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-border">
        <p className="text-[10px] text-muted">BlastTax Debt v2.0</p>
      </div>
    </aside>
  );
}

export function ScreenHeader({ title, backHref, action }: { title: string; backHref?: string; action?: React.ReactNode }) {
  return (
    <header className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white border-b border-border shrink-0 z-10">
      {backHref && (
        <Link href={backHref} className="flex items-center justify-center w-10 h-10 rounded-xl text-muted hover:text-navy hover:bg-surface-alt transition-colors">
          <ChevronLeft size={20} />
        </Link>
      )}
      <div className="md:hidden mr-2">
        <Image src="/logo.png" alt="BlastTax" width={100} height={32} className="h-7 w-auto" />
      </div>
      <h1 className="text-[1.1rem] font-bold text-navy flex-1">{title}</h1>
      {action}
    </header>
  );
}

export function AppShell({ children, hideNav }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <div className="flex h-dvh bg-surface-alt">
      {!hideNav && <DesktopSidebar />}
      <div className="flex flex-col flex-1 min-w-0 bg-white">
        {children}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}

export function ScreenContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-1 overflow-y-auto overflow-x-hidden ${className || ""}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
        {children}
      </div>
    </div>
  );
}

export function ProgressBar({ value, steps, label }: { value: number; steps?: string; label?: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-1">
      {(steps || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-semibold text-muted">{label}</span>}
          {steps && <span className="text-xs font-semibold text-muted">{steps}</span>}
        </div>
      )}
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-brand-blue rounded-full transition-all duration-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function Card({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick}
      className={`bg-white border border-border rounded-2xl p-5 transition-all duration-300 ${onClick ? "cursor-pointer hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]" : ""} ${className || ""}`}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "success" | "warning" | "danger" | "info" }) {
  const styles = {
    primary: "bg-brand-blue-light text-brand-blue",
    success: "bg-brand-green-light text-brand-green",
    warning: "bg-warning-light text-amber-800",
    danger: "bg-brand-red-light text-brand-red",
    info: "bg-info-light text-info",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function Button({ children, variant = "primary", className, disabled, onClick, href, full = true }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "outline" | "ghost"; className?: string; disabled?: boolean; onClick?: () => void; href?: string; full?: boolean;
}) {
  const base = `inline-flex items-center justify-center gap-2 font-bold text-[0.9375rem] rounded-full transition-all duration-200 ${full ? "w-full" : ""} ${disabled ? "opacity-50 pointer-events-none" : "active:scale-[0.97]"}`;
  const styles = {
    primary: "bg-brand-red text-white px-7 py-4 shadow-sm hover:opacity-90",
    secondary: "bg-brand-blue text-white px-7 py-4 hover:opacity-90",
    outline: "bg-transparent border-[1.5px] border-border-strong text-navy px-7 py-3.5 hover:border-brand-blue hover:text-brand-blue",
    ghost: "bg-transparent text-muted px-4 py-2.5 hover:text-navy",
  };
  const cls = `${base} ${styles[variant]} ${className || ""}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

export function IconCircle({ icon: Icon, color = "blue", size = 40 }: { icon: React.ElementType; color?: string; size?: number }) {
  const colors: Record<string, string> = {
    blue: "bg-brand-blue-light text-brand-blue",
    green: "bg-brand-green-light text-brand-green",
    red: "bg-brand-red-light text-brand-red",
    violet: "bg-violet-light text-violet",
    teal: "bg-teal-light text-teal",
    warning: "bg-warning-light text-warning",
    navy: "bg-navy-light text-navy",
  };
  return (
    <div className={`flex items-center justify-center rounded-xl ${colors[color] || colors.blue}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.4} />
    </div>
  );
}

export function FormInput({ label, placeholder, type = "text", value, onChange, required }: {
  label: string; placeholder?: string; type?: string; value?: string; onChange?: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} required={required}
        className="w-full px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150" />
    </div>
  );
}

export function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative w-[46px] h-[26px] rounded-full transition-colors duration-200 ${checked ? "bg-brand-green" : "bg-border-strong"}`}>
      <div className={`absolute top-[3px] w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-[23px]" : "translate-x-[3px]"}`} />
    </button>
  );
}
