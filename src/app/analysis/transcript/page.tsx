"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Upload, Link2, FileCheck, CheckCircle, ArrowRight, X } from "lucide-react";
import { AppShell, ScreenHeader, ScreenContent, ProgressBar, Card, Badge, Button } from "@/components/ui/shell";
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
    },
    {
      id: "upload",
      icon: Upload,
      title: "Upload PDF",
      desc: "Drag & drop or click to upload",
      color: "text-violet",
      bg: "bg-violet/10",
    },
    {
      id: "eservices",
      icon: Link2,
      title: "Connect e-Services",
      desc: "Securely link your tax professional account",
      color: "text-teal",
      bg: "bg-teal/10",
    },
  ];

  return (
    <AppShell hideNav>
      <ScreenHeader title="IRS Transcript" backHref="/analysis/screening" />
      <ProgressBar value={40} label="Step 2 of 6" steps="Upload" />

      <ScreenContent>
        <div className="space-y-4 pt-2">
          <div className="animate-fade-up">
            <h2 className="text-lg font-black text-navy mb-1">Upload Your Transcript</h2>
            <p className="text-sm text-muted leading-relaxed">
              Your IRS transcript helps us provide the most accurate analysis. Choose a method below.
            </p>
          </div>

          {/* Upload Methods */}
          {methods.map((m, i) => (
            <div key={m.id} className={`animate-fade-up delay-${i + 1}`}>
              {m.id === "upload" ? (
                /* Drag & Drop Zone */
                <div
                  onClick={handleFileClick}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileClick(); }}
                  className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
                    dragOver
                      ? "border-brand-blue bg-navy-light"
                      : uploadState === "done"
                      ? "border-brand-green bg-brand-green-light"
                      : "border-border-strong bg-white hover:border-brand-blue hover:bg-navy-light"
                  }`}
                >
                  {uploadState === "idle" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className={`flex items-center justify-center w-12 h-12 ${m.bg} rounded-xl`}>
                        <Upload size={22} className={m.color} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{m.title}</p>
                        <p className="text-xs text-muted mt-0.5">{m.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted">PDF, JPG, or PNG up to 10MB</span>
                    </div>
                  )}
                  {uploadState === "uploading" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-navy-light rounded-xl">
                        <FileCheck size={22} className="text-brand-blue animate-pulse" />
                      </div>
                      <p className="text-sm font-bold text-navy">Uploading transcript...</p>
                      <div className="w-full max-w-[200px] h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-blue rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted">{Math.min(Math.round(uploadProgress), 100)}%</span>
                    </div>
                  )}
                  {uploadState === "done" && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-brand-green/10 rounded-xl">
                        <CheckCircle size={22} className="text-brand-green" />
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
                    if (m.id === "irs") {
                      /* In production would open IRS.gov */
                    }
                    if (m.id === "eservices") {
                      simulateUpload();
                    }
                  }}
                  className={selectedMethod === m.id ? "!border-brand-blue" : ""}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-11 h-11 ${m.bg} rounded-xl shrink-0`}>
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

          {/* Skip link */}
          <div className="animate-fade-up delay-4 text-center">
            <button
              onClick={handleContinue}
              className="text-xs font-semibold text-muted hover:text-navy transition-colors underline underline-offset-2"
            >
              I&apos;ll do this later
            </button>
          </div>

          {/* Continue */}
          <div className="animate-fade-up delay-5 pt-2 pb-4">
            <Button onClick={handleContinue}>
              Continue <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
