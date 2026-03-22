"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, AlertTriangle, Shield, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button } from "@/components/ui/shell";
import { getStore } from "@/lib/store";

interface FlagItem {
  label: string;
  status: "pass" | "fail" | "warn";
  detail: string;
}

function getFlags(answers: Record<string, string>): {
  compliance: FlagItem[];
  collection: FlagItem[];
  special: FlagItem[];
  eligible: boolean;
  summary: string;
} {
  const a = (id: string) => answers[id] || "unsure";

  const compliance: FlagItem[] = [
    {
      label: "Tax Returns Filed",
      status: a("q1") === "yes" ? "pass" : a("q1") === "no" ? "fail" : "warn",
      detail: a("q1") === "yes" ? "All required returns have been filed" : a("q1") === "no" ? "Unfiled returns must be addressed first" : "Filing status needs to be verified",
    },
    {
      label: "Estimated Payments Current",
      status: a("q3") === "yes" ? "pass" : a("q3") === "no" ? "warn" : "warn",
      detail: a("q3") === "yes" ? "Current on all estimated payments" : "Estimated payment compliance needs review",
    },
    {
      label: "State Returns Filed",
      status: a("q16") === "yes" ? "pass" : a("q16") === "no" ? "fail" : "warn",
      detail: a("q16") === "yes" ? "All state returns are filed" : "State filing compliance needs attention",
    },
  ];

  const collection: FlagItem[] = [
    {
      label: "Federal Tax Lien",
      status: a("q9") === "no" ? "pass" : a("q9") === "yes" ? "fail" : "warn",
      detail: a("q9") === "yes" ? "Active lien on record - affects credit and property" : a("q9") === "no" ? "No federal tax lien on file" : "Lien status needs verification",
    },
    {
      label: "Levy Notice",
      status: a("q10") === "no" ? "pass" : a("q10") === "yes" ? "fail" : "warn",
      detail: a("q10") === "yes" ? "Levy notice received - urgent action needed" : a("q10") === "no" ? "No active levy notices" : "Levy status unknown",
    },
    {
      label: "Wage Garnishment",
      status: a("q11") === "no" ? "pass" : a("q11") === "yes" ? "fail" : "warn",
      detail: a("q11") === "yes" ? "Active wage garnishment in effect" : a("q11") === "no" ? "No wage garnishment" : "Garnishment status needs verification",
    },
    {
      label: "Bank Levy",
      status: a("q12") === "no" ? "pass" : a("q12") === "yes" ? "fail" : "warn",
      detail: a("q12") === "yes" ? "Bank levy is freezing accounts - emergency action recommended" : a("q12") === "no" ? "No bank levy in effect" : "Bank levy status needs verification",
    },
  ];

  const special: FlagItem[] = [
    {
      label: "Bankruptcy History",
      status: a("q2") === "no" ? "pass" : a("q2") === "yes" ? "warn" : "warn",
      detail: a("q2") === "yes" ? "Bankruptcy history may affect available options" : "No bankruptcy filings",
    },
    {
      label: "Existing IRS Agreement",
      status: a("q5") === "no" && a("q6") === "no" ? "pass" : "warn",
      detail: a("q5") === "yes" || a("q6") === "yes" ? "Existing agreement/offer will need to be reviewed" : "No existing agreements on file",
    },
    {
      label: "Asset Transfers",
      status: a("q15") === "no" ? "pass" : a("q15") === "yes" ? "warn" : "warn",
      detail: a("q15") === "yes" ? "Recent transfers may affect OIC calculation" : "No reported asset transfers",
    },
  ];

  const criticalFails = [...compliance, ...collection].filter((f) => f.status === "fail").length;
  const eligible = criticalFails < 4;

  const hasUrgent = collection.some((c) => c.status === "fail");
  const summary = hasUrgent
    ? "Urgent collection activity detected. We recommend immediate action to protect your assets."
    : criticalFails === 0
    ? "Your situation looks favorable for multiple resolution options."
    : "Some compliance issues need attention, but resolution options are available.";

  return { compliance, collection, special, eligible, summary };
}

function StatusIcon({ status }: { status: "pass" | "fail" | "warn" }) {
  if (status === "pass") return <CheckCircle size={18} className="text-brand-green" />;
  if (status === "fail") return <XCircle size={18} className="text-danger" />;
  return <AlertTriangle size={18} className="text-warning" />;
}

function FlagSection({ title, items, defaultOpen = true }: { title: string; items: FlagItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const fails = items.filter((i) => i.status === "fail").length;
  const warns = items.filter((i) => i.status === "warn").length;

  return (
    <Card className="!p-0 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-left">
        <span className="text-sm font-bold text-navy flex-1">{title}</span>
        <div className="flex items-center gap-1.5">
          {fails > 0 && <Badge variant="danger">{fails} Issue{fails > 1 ? "s" : ""}</Badge>}
          {warns > 0 && <Badge variant="warning">{warns} Review</Badge>}
          {fails === 0 && warns === 0 && <Badge variant="success">Clear</Badge>}
        </div>
        {open ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </button>
      {open && (
        <div className="border-t border-border">
          {items.map((item, i) => (
            <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < items.length - 1 ? "border-b border-border" : ""}`}>
              <div className="mt-0.5 shrink-0">
                <StatusIcon status={item.status} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-navy block">{item.label}</span>
                <span className="text-xs text-muted mt-0.5 block">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function ScreeningPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getStore<Record<string, string>>("pq_answers", {});
    setAnswers(saved);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { compliance, collection, special, eligible, summary } = getFlags(answers);
  const hasUrgent = collection.some((c) => c.status === "fail");

  return (
    <AppShell hideNav>
      <ScreenHeader title="Screening Results" backHref="/analysis/questions" />
      <ProgressBar value={25} label="Step 1 of 6" steps="Review" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          {/* Summary */}
          <div className="animate-fade-up">
            <Card className={`!border-l-4 ${hasUrgent ? "!border-l-danger" : eligible ? "!border-l-brand-green" : "!border-l-warning"}`}>
              <div className="flex items-start gap-3">
                <Shield size={20} className={hasUrgent ? "text-danger" : eligible ? "text-brand-green" : "text-warning"} />
                <div>
                  <h3 className="text-sm font-bold text-navy mb-1">
                    {hasUrgent ? "Urgent Action Needed" : eligible ? "Eligible for Resolution" : "Review Required"}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{summary}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sections */}
          <div className="animate-fade-up delay-1">
            <FlagSection title="Compliance Status" items={compliance} />
          </div>
          <div className="animate-fade-up delay-2">
            <FlagSection title="Collection Activity" items={collection} />
          </div>
          <div className="animate-fade-up delay-3">
            <FlagSection title="Special Circumstances" items={special} defaultOpen={false} />
          </div>

          {/* Continue */}
          <div className="animate-fade-up delay-4 pt-2 pb-4">
            <Button onClick={() => router.push("/analysis/transcript")}>
              Continue <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
