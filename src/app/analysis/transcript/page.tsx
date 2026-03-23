"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Upload, Link2, FileCheck, CheckCircle, ArrowRight, Shield, Info } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button, ContextCard, StickyFooter } from "@/components/ui/shell";
import { getStore, setStore } from "@/lib/store";

export default function TranscriptPage() {
  const router = useRouter();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const simulateUpload = () => {
    setUploadState("uploading");
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploadState("done");
          const analysis = getStore("analysis", {});
          setStore("analysis", { ...analysis, transcriptUploaded: true });
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const handleFileClick = () => {
    setSelectedMethod("upload");
    simulateUpload();
  };

  const handleContinue = () => {
    router.push("/analysis/case-info");
  };

  const methods = [
    {
      id: "irs",
      icon: ExternalLink,
      title: "Download from IRS",
      desc: "Get your transcript directly from IRS.gov",
      color: "text-brand-blue",
      bg: "bg-brand-blue/10",
      contextVariant: "blue" as const,
    },
    {
      id: "upload",
      icon: Upload,
      title: "Upload PDF",
      desc: "Drag & drop or click to upload",
      color: "text-violet",
      bg: "bg-violet/10",
      contextVariant: "warm" as const,
    },
    {
      id: "eservices",
      icon: Link2,
      title: "Connect e-Services",
      desc: "Securely link your tax professional account",
      color: "text-teal",
      bg: "bg-teal/10",
      contextVariant: "green" as const,
    },
  ];

  return (
    <AppShell hideNav>
      <ScreenHeader title="IRS Transcript" backHref="/analysis/screening" />
      <ProgressBar value={40} label="Step 2 of 6" steps="Upload" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          {/* Context Card for explanation */}
          <div className="animate-fade-up">
            <ContextCard icon={Info} title="Why We Need Your Transcript" variant="warm">
              <p>Your IRS transcript contains the exact amounts owed, penalties, and interest for each tax year. This helps us provide the most accurate analysis and find the best resolution strategy.</p>
            </ContextCard>
          </div>

          {/* Upload Methods */}
          {methods.map((m, i) => (
            <div key={m.id} className={`animate-fade-up delay-${i + 1}`}>
              {m.id === "upload" ? (
                /* Drag & Drop Zone - warm and inviting */
                <div
                  onClick={handleFileClick}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileClick(); }}
                  className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
                    dragOver
                      ? "border-brand-blue bg-gradient-to-br from-brand-blue-50 to-brand-blue-light/60"
                      : uploadState === "done"
                      ? "border-brand-green bg-gradient-to-br from-brand-green-50 to-brand-green-light/60"
                      : "border-border-strong bg-gradient-to-br from-surface-alt to-surface-warm hover:border-brand-blue hover:from-brand-blue-50/30 hover:to-brand-blue-light/30"
                  }`}
                >
                  {uploadState === "idle" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className={`flex items-center justify-center w-14 h-14 ${m.bg} rounded-2xl`}>
                        <Upload size={24} className={m.color} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{m.title}</p>
                        <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted-light bg-surface-alt px-3 py-1 rounded-full">PDF, JPG, or PNG up to 10MB</span>
                    </div>
                  )}
                  {uploadState === "uploading" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center w-14 h-14 bg-brand-blue/10 rounded-2xl">
                        <FileCheck size={24} className="text-brand-blue animate-pulse-soft" />
                      </div>
                      <p className="text-sm font-bold text-navy">Uploading transcript...</p>
                      <div className="w-full max-w-[200px] h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-blue to-brand-blue/80 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-brand-blue">{Math.min(Math.round(uploadProgress), 100)}%</span>
                    </div>
                  )}
                  {uploadState === "done" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center w-14 h-14 bg-brand-green/10 rounded-2xl animate-celebrate">
                        <CheckCircle size={24} className="text-brand-green" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">Transcript Uploaded</p>
                        <p className="text-xs text-muted mt-0.5">IRS_Transcript_2021-2023.pdf</p>
                      </div>
                      <Badge variant="success">3 tax years detected</Badge>
                    </div>
                  )}
                </div>
              ) : (
                <Card
                  onClick={() => {
                    setSelectedMethod(m.id);
                    if (m.id === "eservices") {
                      simulateUpload();
                    }
                  }}
                  className={selectedMethod === m.id ? "!border-brand-blue" : ""}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 ${m.bg} rounded-xl shrink-0`}>
                      <m.icon size={20} className={m.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-navy">{m.title}</p>
                      <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                    </div>
                    {m.id === "irs" && (
                      <ExternalLink size={14} className="text-muted shrink-0" />
                    )}
                  </div>
                </Card>
              )}
            </div>
          ))}

          {/* Security note */}
          <div className="animate-fade-up delay-4">
            <ContextCard icon={Shield} title="Your Data is Secure" variant="green">
              <p>All documents are encrypted end-to-end. We never store your raw transcripts after analysis is complete.</p>
            </ContextCard>
          </div>

          {/* Skip link */}
          <div className="animate-fade-up delay-5 text-center">
            <button
              onClick={handleContinue}
              className="text-xs font-semibold text-muted hover:text-navy transition-colors underline underline-offset-2"
            >
              I&apos;ll do this later
            </button>
          </div>

          {/* Spacer for sticky footer */}
          <div className="h-4" />
        </div>
      </ScreenContent>

      <StickyFooter>
        <Button onClick={handleContinue}>
          Continue <ArrowRight size={16} />
        </Button>
      </StickyFooter>
    </AppShell>
  );
}
