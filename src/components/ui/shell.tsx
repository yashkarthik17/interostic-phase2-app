"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Shield, Scale, Briefcase, User, ChevronLeft, ChevronRight, Loader2, Check, X, AlertTriangle, Info } from "lucide-react";
import { useState, useEffect, createContext, useContext, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════════════════════════ */

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
      style={{ boxShadow: "0 -2px 8px rgba(10,22,40,0.04)" }}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
              active
                ? "text-brand-blue"
                : "text-muted-light hover:text-muted"
            }`}>
            <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-brand-blue-50" : ""}`}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
            </div>
            <span className="text-[10px] font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-border shrink-0">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <Image src="/logo.png" alt="BlastTax Debt" width={140} height={48} className="h-10 w-auto" />
      </div>
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-brand-blue-50 text-brand-blue shadow-[inset_3px_0_0_var(--color-brand-blue)]"
                  : "text-muted hover:bg-surface-alt hover:text-navy"
              }`}>
              <Icon size={20} strokeWidth={active ? 2 : 1.6} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-border">
        <p className="text-[11px] text-muted-light">BlastTax Debt v2.0</p>
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════════════════════════════
   LAYOUT SHELLS
   ════════════════════════════════════════════════════════════════ */

export function ScreenHeader({ title, backHref, action }: { title: string; backHref?: string; action?: React.ReactNode }) {
  return (
    <header className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white border-b border-border shrink-0 z-10">
      {backHref && (
        <Link href={backHref} className="flex items-center justify-center w-10 h-10 rounded-xl text-muted hover:text-navy hover:bg-surface-alt transition-all duration-200 active:scale-95">
          <ChevronLeft size={20} />
        </Link>
      )}
      <div className="md:hidden mr-1">
        <Image src="/logo.png" alt="BlastTax" width={90} height={30} className="h-6 w-auto" />
      </div>
      <h1 className="text-[1.05rem] font-bold text-navy flex-1">{title}</h1>
      {action}
    </header>
  );
}

export function AppShell({ children, hideNav }: { children: React.ReactNode; hideNav?: boolean }) {
  return (
    <ToastProvider>
      <div className="flex h-dvh bg-surface-alt">
        {!hideNav && <DesktopSidebar />}
        <div className="flex flex-col flex-1 min-w-0 bg-white">
          {children}
          {!hideNav && <BottomNav />}
        </div>
      </div>
    </ToastProvider>
  );
}

export function ScreenContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 py-4 pb-8 min-h-full ${className || ""}`}>
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION HEADER — colored left accent bar
   ════════════════════════════════════════════════════════════════ */

export function SectionHeader({ title, subtitle, accent = "blue" }: { title: string; subtitle?: string; accent?: "blue" | "red" | "green" }) {
  const colors = { blue: "border-brand-blue", red: "border-brand-red", green: "border-brand-green" };
  return (
    <div className={`border-l-[3px] ${colors[accent]} pl-3 mb-4`}>
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CONTEXT CARD — warm gradient info banners
   ════════════════════════════════════════════════════════════════ */

export function ContextCard({ icon: Icon, title, children, variant = "blue" }: {
  icon: React.ElementType; title: string; children: React.ReactNode; variant?: "blue" | "green" | "red" | "warm";
}) {
  const styles = {
    blue: "bg-gradient-to-br from-brand-blue-50 to-brand-blue-light/60 border-brand-blue/15",
    green: "bg-gradient-to-br from-brand-green-50 to-brand-green-light/60 border-brand-green/15",
    red: "bg-gradient-to-br from-brand-red-50 to-brand-red-light/60 border-brand-red/15",
    warm: "bg-gradient-to-br from-surface-alt to-surface-warm border-border",
  };
  const iconStyles = {
    blue: "bg-brand-blue/10 text-brand-blue",
    green: "bg-brand-green/10 text-brand-green",
    red: "bg-brand-red/10 text-brand-red",
    warm: "bg-navy/5 text-navy",
  };
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${styles[variant]}`}>
      <div className="flex gap-3.5">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${iconStyles[variant]}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-navy mb-1">{title}</p>
          <div className="text-[13px] text-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROGRESS
   ════════════════════════════════════════════════════════════════ */

export function ProgressBar({ value, steps, label }: { value: number; steps?: string; label?: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-2">
      {(steps || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-xs font-semibold text-muted">{label}</span>}
          {steps && <span className="text-xs font-bold text-brand-blue">{steps}</span>}
        </div>
      )}
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-brand-blue to-brand-blue/80 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 px-4 py-3">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                done ? "bg-brand-green text-white" :
                active ? "bg-brand-blue text-white shadow-[var(--shadow-glow-blue)]" :
                "bg-border text-muted"
              }`}>
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${active ? "text-brand-blue" : done ? "text-brand-green" : "text-muted-light"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 rounded mx-1 mt-[-14px] transition-colors duration-300 ${done ? "bg-brand-green" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CARDS
   ════════════════════════════════════════════════════════════════ */

export function Card({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick}
      className={`bg-white border border-border rounded-2xl p-5 transition-all duration-200 ${
        onClick
          ? "cursor-pointer shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-card)]"
          : "shadow-[var(--shadow-card)]"
      } ${className || ""}`}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "success" | "warning" | "danger" | "info" }) {
  const styles = {
    primary: "bg-brand-blue-50 text-brand-blue border-brand-blue/10",
    success: "bg-brand-green-light text-brand-green border-brand-green/10",
    warning: "bg-warning-light text-warning border-warning/10",
    danger: "bg-brand-red-light text-brand-red border-brand-red/10",
    info: "bg-info-light text-info border-info/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold border ${styles[variant]}`}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   BUTTONS — with loading state, active feedback
   ════════════════════════════════════════════════════════════════ */

export function Button({ children, variant = "primary", className, disabled, loading, onClick, href, full = true }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "outline" | "ghost"; className?: string; disabled?: boolean; loading?: boolean; onClick?: () => void; href?: string; full?: boolean;
}) {
  const isDisabled = disabled || loading;
  const base = `inline-flex items-center justify-center gap-2 font-bold text-[0.9375rem] rounded-full transition-all duration-200 ${full ? "w-full" : ""} ${isDisabled ? "opacity-50 pointer-events-none" : "active:scale-[0.97]"}`;
  const styles = {
    primary: "bg-brand-red text-white px-7 py-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:brightness-110",
    secondary: "bg-brand-blue text-white px-7 py-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:brightness-110",
    outline: "bg-white border-[1.5px] border-border-strong text-navy px-7 py-3.5 shadow-[var(--shadow-card)] hover:border-brand-blue hover:text-brand-blue hover:shadow-[var(--shadow-lift)]",
    ghost: "bg-transparent text-muted px-4 py-2.5 hover:text-navy hover:bg-surface-alt",
  };
  const cls = `${base} ${styles[variant]} ${className || ""}`;
  const content = loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : children;
  if (href && !isDisabled) return <Link href={href} className={cls}>{content}</Link>;
  return <button onClick={onClick} disabled={isDisabled} className={cls}>{content}</button>;
}

/* ════════════════════════════════════════════════════════════════
   ICONS & DECORATIVE
   ════════════════════════════════════════════════════════════════ */

export function IconCircle({ icon: Icon, color = "blue", size = 40 }: { icon: React.ElementType; color?: string; size?: number }) {
  const colors: Record<string, string> = {
    blue: "bg-brand-blue-50 text-brand-blue",
    green: "bg-brand-green-light text-brand-green",
    red: "bg-brand-red-light text-brand-red",
    violet: "bg-violet-light text-violet",
    teal: "bg-teal-light text-teal",
    warning: "bg-warning-light text-warning",
    navy: "bg-navy-light text-navy",
  };
  return (
    <div className={`flex items-center justify-center rounded-2xl ${colors[color] || colors.blue}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.42} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   FORM INPUTS — with error/success states
   ════════════════════════════════════════════════════════════════ */

export function FormInput({ label, placeholder, type = "text", value, onChange, required, error, hint }: {
  label: string; placeholder?: string; type?: string; value?: string; onChange?: (v: string) => void; required?: boolean; error?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} required={required}
        className={`w-full px-4 py-3 bg-surface-alt border-[1.5px] rounded-xl text-sm font-medium text-navy placeholder:text-placeholder transition-all duration-150
          ${error
            ? "border-danger bg-danger-light/30 focus:border-danger focus:ring-[3px] focus:ring-danger/10"
            : "border-border hover:border-border-strong focus:border-brand-blue focus:bg-white focus:ring-[3px] focus:ring-brand-blue/10"
          } focus:outline-none`} />
      {error && <p className="mt-1 text-xs text-danger font-medium flex items-center gap-1"><AlertTriangle size={12} />{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-muted-light">{hint}</p>}
    </div>
  );
}

export function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative w-[46px] h-[26px] rounded-full transition-colors duration-200 ${checked ? "bg-brand-green" : "bg-border-strong"}`}>
      <div className={`absolute top-[3px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? "translate-x-[23px]" : "translate-x-[3px]"}`} />
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════
   EMPTY STATE — friendly, branded
   ════════════════════════════════════════════════════════════════ */

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: {
  icon: React.ElementType; title: string; description: string; actionLabel?: string; actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-up">
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-blue-50 to-brand-blue-light flex items-center justify-center">
          <Icon size={32} className="text-brand-blue" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-[var(--shadow-card)] flex items-center justify-center">
          <ChevronRight size={14} className="text-muted-light" />
        </div>
      </div>
      <h3 className="text-base font-bold text-navy mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-[260px] leading-relaxed">{description}</p>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="secondary" full={false} className="mt-5 !px-6 !py-3 !text-sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   STICKY FOOTER CTA — always visible action button
   ════════════════════════════════════════════════════════════════ */

export function StickyFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 px-4 sm:px-6 py-4 bg-white border-t border-border"
      style={{ boxShadow: "0 -4px 12px rgba(10,22,40,0.04)" }}>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
   ════════════════════════════════════════════════════════════════ */

type Toast = { id: string; message: string; variant: "success" | "error" | "info" };

const ToastContext = createContext<{ addToast: (message: string, variant?: Toast["variant"]) => void }>({
  addToast: () => {},
});

export function useToast() { return useContext(ToastContext); }

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: Toast["variant"] = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
          {toasts.map(t => {
            const styles = {
              success: "bg-brand-green text-white",
              error: "bg-brand-red text-white",
              info: "bg-brand-blue text-white",
            };
            const icons = { success: Check, error: X, info: Info };
            const TIcon = icons[t.variant];
            return (
              <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-[var(--shadow-float)] ${styles[t.variant]}`}
                style={{ animation: "toast-in 0.3s ease" }}>
                <TIcon size={16} strokeWidth={2.5} />
                <span className="text-sm font-semibold flex-1">{t.message}</span>
                <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="opacity-70 hover:opacity-100">
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}
