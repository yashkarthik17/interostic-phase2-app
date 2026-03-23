"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  IconCircle,
  EmptyState,
} from "@/components/ui/shell";

import {
  Briefcase,
  CreditCard,
  FileCheck,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

interface Notification {
  id: string;
  icon: React.ElementType;
  iconColor: "blue" | "green" | "red" | "violet" | "teal" | "warning" | "navy";
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: "case" | "payment" | "document" | "message";
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: Briefcase,
    iconColor: "blue",
    title: "Case Update",
    description:
      "Your Offer in Compromise (Case #1042) has been moved to IRS review stage.",
    time: "2 hours ago",
    read: false,
    category: "case",
  },
  {
    id: "2",
    icon: CreditCard,
    iconColor: "warning",
    title: "Payment Reminder",
    description:
      "Your installment agreement payment of $657 is due on March 28, 2026.",
    time: "5 hours ago",
    read: false,
    category: "payment",
  },
  {
    id: "3",
    icon: FileCheck,
    iconColor: "green",
    title: "Document Ready",
    description:
      "Your 2023 IRS Account Transcript has been processed and is ready for review.",
    time: "Yesterday",
    read: true,
    category: "document",
  },
  {
    id: "4",
    icon: MessageSquare,
    iconColor: "violet",
    title: "Expert Message",
    description:
      "Your assigned tax expert has sent you a message regarding your penalty abatement request.",
    time: "2 days ago",
    read: true,
    category: "message",
  },
  {
    id: "5",
    icon: Briefcase,
    iconColor: "blue",
    title: "Case Update",
    description:
      "Penalty Abatement (Case #985) has been resolved. $5,300 in penalties removed.",
    time: "1 week ago",
    read: true,
    category: "case",
  },
];

type Filter = "all" | "unread";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [items, setItems] = useState(notifications);

  const filtered =
    filter === "unread" ? items.filter((n) => !n.read) : items;
  const unreadCount = items.filter((n) => !n.read).length;

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <AppShell>
      <ScreenHeader
        title="Notifications"
        backHref="/dashboard"
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-colors"
            >
              Mark all read
            </button>
          ) : undefined
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-2 px-6 pb-3 shrink-0">
        {(["all", "unread"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              filter === f
                ? "bg-navy text-white shadow-[var(--shadow-card)]"
                : "bg-surface-alt text-muted hover:text-navy hover:bg-surface-warm"
            }`}
          >
            {f === "all" ? "All" : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <ScreenContent>
        {filtered.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="All caught up!"
            description="No unread notifications. We'll let you know when something needs your attention."
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((item, i) => (
              <button
                key={item.id}
                onClick={() => markRead(item.id)}
                className={`animate-fade-up w-full flex items-start gap-3.5 p-4 rounded-2xl text-left transition-all duration-200 border hover:shadow-[var(--shadow-card)] active:scale-[0.99] ${
                  !item.read
                    ? "bg-brand-blue-50 border-brand-blue/10"
                    : "bg-white border-border hover:bg-surface-alt"
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative shrink-0">
                  <IconCircle icon={item.icon} color={item.iconColor} size={42} />
                  {!item.read && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-red rounded-full border-2 border-white shadow-[var(--shadow-glow-red)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p
                      className={`text-sm font-bold truncate ${
                        !item.read ? "text-navy" : "text-navy/70"
                      }`}
                    >
                      {item.title}
                    </p>
                    <span className="text-[0.625rem] font-semibold text-placeholder whitespace-nowrap shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${!item.read ? "text-muted" : "text-muted-light"}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScreenContent>
    </AppShell>
  );
}
