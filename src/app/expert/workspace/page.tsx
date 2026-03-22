"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
  Badge,
} from "@/components/ui/shell";
import {
  Star,
  Briefcase,
  Clock,
  FileText,
  StickyNote,
  Lightbulb,
  CheckCircle2,
  Upload,
  MessageCircle,
  Phone,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type Tab = "documents" | "notes" | "recommendations";

const documents = [
  { name: "Form 656 (Offer in Compromise)", status: "complete" as const },
  { name: "Form 433-A (Collection Info)", status: "complete" as const },
  { name: "Bank Statements (3 months)", status: "pending" as const },
  { name: "Pay Stubs (3 months)", status: "pending" as const },
];

const notes = [
  {
    author: "Michael Chen",
    date: "Mar 20, 2026",
    text: "Reviewed client transcripts. CSED for 2021 expires April 2031. Strong OIC candidate based on RCP calculation. Recommend proceeding with lump sum offer.",
  },
  {
    author: "Michael Chen",
    date: "Mar 18, 2026",
    text: "Initial case review complete. Client has clean compliance history for past 3 years. First-time penalty abatement may also be applicable for 2021.",
  },
];

const recommendations = [
  {
    title: "Offer in Compromise (Primary)",
    desc: "Submit Form 656 with $8,500 lump sum offer. Based on RCP analysis, this is well within IRS acceptance range.",
    priority: "high" as const,
  },
  {
    title: "Penalty Abatement (Secondary)",
    desc: "File Form 843 for first-time penalty abatement on 2021 tax year. Could reduce balance by ~$5,300.",
    priority: "medium" as const,
  },
  {
    title: "Full Compliance Check",
    desc: "Ensure all current-year returns are filed and estimated payments are current before OIC submission.",
    priority: "low" as const,
  },
];

export default function ExpertWorkspacePage() {
  const [activeTab, setActiveTab] = useState<Tab>("documents");

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "documents", label: "Documents", icon: FileText },
    { key: "notes", label: "Notes", icon: StickyNote },
    { key: "recommendations", label: "Recs", icon: Lightbulb },
  ];

  return (
    <AppShell>
      <ScreenHeader title="Expert Workspace" backHref="/expert" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Expert Profile */}
        <div className="animate-fade-up delay-1">
          <Card className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-navy text-white font-bold text-lg shrink-0">
              MC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">Michael Chen, EA</p>
              <p className="text-xs text-muted font-semibold">
                Enrolled Agent
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-warning fill-warning" />
                  <span className="text-xs font-bold text-navy">4.9</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={12} className="text-muted" />
                  <span className="text-xs font-semibold text-muted">
                    15 years exp
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-muted" />
                  <span className="text-xs font-semibold text-muted">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Case Summary */}
        <div className="animate-fade-up delay-2">
          <Card className="bg-navy">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[0.6875rem] font-semibold text-white/50 uppercase tracking-wider">
                  Case #1042
                </p>
                <p className="text-lg font-bold text-white">
                  Offer in Compromise
                </p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  Total Debt
                </p>
                <p className="text-sm font-black text-white">$47,250</p>
              </div>
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  Offer
                </p>
                <p className="text-sm font-black text-brand-green">$8,500</p>
              </div>
              <div className="text-center p-2.5 bg-white/5 rounded-xl">
                <p className="text-[0.625rem] font-semibold text-white/50 mb-0.5">
                  Savings
                </p>
                <p className="text-sm font-black text-brand-green">82%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="animate-fade-up delay-3">
          <div className="flex bg-surface-alt rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-navy shadow-sm"
                    : "text-muted hover:text-navy"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-up delay-4">
          {activeTab === "documents" && (
            <div className="space-y-3">
              <Card className="!p-0 divide-y divide-border">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center gap-3 px-5 py-3.5"
                  >
                    <FileText size={16} className="text-muted shrink-0" />
                    <p className="text-sm font-semibold text-navy flex-1 min-w-0 truncate">
                      {doc.name}
                    </p>
                    {doc.status === "complete" ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-brand-green">
                        <CheckCircle2 size={14} />
                        Complete
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-warning">
                        <Clock size={14} />
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </Card>

              {/* Upload Zone */}
              <div className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border-strong rounded-2xl text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light">
                  <Upload size={18} className="text-navy" />
                </div>
                <p className="text-sm font-bold text-navy">Upload Documents</p>
                <p className="text-xs text-muted">
                  Drag &amp; drop or tap to browse
                </p>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-3">
              {notes.map((note, i) => (
                <Card key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-navy">{note.author}</p>
                    <p className="text-[0.625rem] font-semibold text-placeholder">
                      {note.date}
                    </p>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {note.text}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <Card key={rec.title}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb
                      size={14}
                      className={
                        rec.priority === "high"
                          ? "text-brand-green"
                          : rec.priority === "medium"
                          ? "text-warning"
                          : "text-muted"
                      }
                    />
                    <p className="text-sm font-bold text-navy">{rec.title}</p>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {rec.desc}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-up delay-5">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Quick Actions
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/expert/chat"
              className="flex flex-col items-center gap-2 p-3.5 bg-white border border-border rounded-2xl transition-all hover:border-border-strong hover:shadow-md active:scale-[0.97]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-light">
                <MessageCircle size={18} className="text-brand-green" />
              </div>
              <span className="text-[0.6875rem] font-bold text-navy">
                Message
              </span>
            </Link>
            <button className="flex flex-col items-center gap-2 p-3.5 bg-white border border-border rounded-2xl transition-all hover:border-border-strong hover:shadow-md active:scale-[0.97]">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info-light">
                <Phone size={18} className="text-info" />
              </div>
              <span className="text-[0.6875rem] font-bold text-navy">
                Schedule
              </span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3.5 bg-white border border-border rounded-2xl transition-all hover:border-border-strong hover:shadow-md active:scale-[0.97]">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light">
                <Upload size={18} className="text-navy" />
              </div>
              <span className="text-[0.6875rem] font-bold text-navy">
                Upload
              </span>
            </button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
