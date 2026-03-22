"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  ProgressBar,
  Card,
  Button,
  Badge,
} from "@/components/ui/shell";
import {
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  ChevronRight,
  Shield,
} from "lucide-react";

interface DocItem {
  name: string;
  status: "generated" | "retrieved" | "upload-needed";
  type: string;
}

const initialDocs: DocItem[] = [
  { name: "Form 656", status: "generated", type: "OIC Application" },
  {
    name: "Form 433-A(OIC)",
    status: "generated",
    type: "Financial Statement",
  },
  { name: "IRS Transcript", status: "retrieved", type: "Account Records" },
  {
    name: "Bank Statements",
    status: "upload-needed",
    type: "3 months required",
  },
  { name: "Pay Stubs", status: "upload-needed", type: "3 months required" },
  { name: "Photo ID", status: "upload-needed", type: "Government-issued" },
];

export default function HandoffPage() {
  const [docs, setDocs] = useState(initialDocs);

  const readyCount = docs.filter((d) => d.status !== "upload-needed").length;
  const totalCount = docs.length;
  const progress = Math.round((readyCount / totalCount) * 100);
  const allReady = readyCount === totalCount;

  const simulateUpload = (index: number) => {
    setDocs((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, status: "generated" as const } : d
      )
    );
  };

  return (
    <AppShell hideNav>
      <ScreenHeader title="Expert Handoff" backHref="/expert/workspace" />
      <ProgressBar
        value={25}
        steps="Step 1 of 4"
        label="Document Checklist"
      />
      <ScreenContent className="space-y-5 pt-3">
        {/* Intro */}
        <div className="animate-fade-up delay-1">
          <Card className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light shrink-0">
              <Shield size={18} className="text-navy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy">
                Prepare Your Case Package
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Your expert needs these documents to begin working on your case.
                We&apos;ve already generated and retrieved what we can.
              </p>
            </div>
          </Card>
        </div>

        {/* Progress Summary */}
        <div className="animate-fade-up delay-2">
          <div className="flex items-center justify-between p-4 bg-surface-alt rounded-2xl">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">
                Documents Ready
              </p>
              <p className="text-xl font-black text-navy">
                {readyCount} of {totalCount}
              </p>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke={allReady ? "#00A651" : "#2563EB"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 1.508} 150.8`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-navy">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="animate-fade-up delay-3">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Document Checklist
          </p>
          <Card className="!p-0 divide-y divide-border">
            {docs.map((doc, i) => (
              <div key={doc.name} className="flex items-center gap-3 px-5 py-4">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
                    doc.status !== "upload-needed"
                      ? "bg-brand-green-light"
                      : "bg-warning-light"
                  }`}
                >
                  {doc.status !== "upload-needed" ? (
                    <CheckCircle2 size={16} className="text-brand-green" />
                  ) : (
                    <Clock size={16} className="text-warning" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy">{doc.name}</p>
                  <p className="text-[0.625rem] text-muted font-semibold">
                    {doc.type}
                  </p>
                </div>
                {doc.status === "generated" && (
                  <Badge variant="success">Generated</Badge>
                )}
                {doc.status === "retrieved" && (
                  <Badge variant="success">Retrieved</Badge>
                )}
                {doc.status === "upload-needed" && (
                  <button
                    type="button"
                    onClick={() => simulateUpload(i)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white rounded-full text-[0.6875rem] font-bold hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Upload size={12} />
                    Upload
                  </button>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* Upload Zone for missing docs */}
        {!allReady && (
          <div className="animate-fade-up delay-4">
            <div className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border-strong rounded-2xl text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-light">
                <Upload size={20} className="text-navy" />
              </div>
              <p className="text-sm font-bold text-navy">
                Upload Missing Documents
              </p>
              <p className="text-xs text-muted">
                Drag &amp; drop files here or tap to browse
              </p>
              <p className="text-[0.625rem] text-placeholder mt-1">
                Supported: PDF, JPG, PNG (max 10MB each)
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="animate-fade-up delay-5 pb-2">
          <Button href="/handoff/review" disabled={!allReady}>
            Continue to Review
            <ChevronRight size={16} />
          </Button>
          {!allReady && (
            <p className="text-center text-[0.625rem] text-placeholder font-semibold mt-2">
              Upload all documents to continue
            </p>
          )}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
