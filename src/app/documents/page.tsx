"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import {
  Upload,
  FileText,
  Download,
  Eye,
  Lock,
  ChevronDown,
  Search,
} from "lucide-react";

const filters = ["All", "IRS Forms", "Transcripts", "Uploaded", "Generated"] as const;
type DocFilter = (typeof filters)[number];

const sortOptions = ["By date", "By type", "By name"] as const;
type SortOption = (typeof sortOptions)[number];

interface DocItem {
  id: string;
  title: string;
  type: "IRS Forms" | "Transcripts" | "Uploaded" | "Generated";
  format: "PDF" | "DOCX" | "PNG";
  size: string;
  date: string;
}

const sampleDocs: DocItem[] = [
  {
    id: "1",
    title: "Form 656 - Offer in Compromise",
    type: "IRS Forms",
    format: "PDF",
    size: "2.4 MB",
    date: "2026-03-15",
  },
  {
    id: "2",
    title: "2023 IRS Account Transcript",
    type: "Transcripts",
    format: "PDF",
    size: "1.1 MB",
    date: "2026-03-10",
  },
  {
    id: "3",
    title: "Form 433-A(OIC) - Collection Info",
    type: "IRS Forms",
    format: "PDF",
    size: "3.2 MB",
    date: "2026-03-08",
  },
  {
    id: "4",
    title: "2022 IRS Account Transcript",
    type: "Transcripts",
    format: "PDF",
    size: "980 KB",
    date: "2026-03-05",
  },
  {
    id: "5",
    title: "Pay Stubs - March 2026",
    type: "Uploaded",
    format: "PDF",
    size: "540 KB",
    date: "2026-03-01",
  },
  {
    id: "6",
    title: "Resolution Analysis Report",
    type: "Generated",
    format: "PDF",
    size: "1.8 MB",
    date: "2026-02-28",
  },
  {
    id: "7",
    title: "2021 IRS Account Transcript",
    type: "Transcripts",
    format: "PDF",
    size: "1.0 MB",
    date: "2026-02-20",
  },
  {
    id: "8",
    title: "Bank Statements - Q4 2025",
    type: "Uploaded",
    format: "PDF",
    size: "2.1 MB",
    date: "2026-02-15",
  },
];

function formatBadgeVariant(type: DocItem["type"]) {
  switch (type) {
    case "IRS Forms": return "primary" as const;
    case "Transcripts": return "info" as const;
    case "Uploaded": return "success" as const;
    case "Generated": return "warning" as const;
  }
}

function formatIconForDoc(format: DocItem["format"]) {
  const colors: Record<string, string> = {
    PDF: "text-brand-red bg-brand-red-light",
    DOCX: "text-brand-blue bg-navy-light",
    PNG: "text-brand-green bg-brand-green-light",
  };
  return colors[format] || colors.PDF;
}

export default function DocumentsPage() {
  const [filter, setFilter] = useState<DocFilter>("All");
  const [sort, setSort] = useState<SortOption>("By date");
  const [sortOpen, setSortOpen] = useState(false);

  let docs =
    filter === "All"
      ? [...sampleDocs]
      : sampleDocs.filter((d) => d.type === filter);

  // Sort
  if (sort === "By date") {
    docs.sort((a, b) => b.date.localeCompare(a.date));
  } else if (sort === "By type") {
    docs.sort((a, b) => a.type.localeCompare(b.type));
  } else {
    docs.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <AppShell>
      <ScreenHeader title="Documents" backHref="/dashboard" />

      <ScreenContent className="space-y-4 pt-1">
        {/* Upload Zone */}
        <div className="animate-fade-up delay-1">
          <button className="w-full p-8 border-2 border-dashed border-border-strong rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-200 hover:border-brand-blue hover:bg-navy-light/30 active:scale-[0.98]">
            <div className="w-12 h-12 rounded-xl bg-navy-light flex items-center justify-center">
              <Upload size={22} className="text-navy" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy mb-0.5">
                Upload Documents
              </p>
              <p className="text-xs text-muted">
                Drag & drop or tap to browse. PDF, JPG, PNG up to 25MB.
              </p>
            </div>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="animate-fade-up delay-2">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-[0.6875rem] font-bold whitespace-nowrap transition-all duration-200 ${
                  filter === f
                    ? "bg-navy text-white shadow-sm"
                    : "bg-surface-alt text-muted hover:bg-border hover:text-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="animate-fade-up delay-2 flex justify-end relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted hover:text-navy transition-colors"
          >
            {sort}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {sortOpen && (
            <div className="absolute top-8 right-0 bg-white border border-border rounded-xl shadow-lg z-20 overflow-hidden min-w-[130px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSort(opt);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                    sort === opt
                      ? "bg-navy-light text-navy"
                      : "text-muted hover:bg-surface-alt"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Document List */}
        <div className="animate-fade-up delay-3 space-y-2">
          {docs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search size={28} className="text-placeholder mb-3" />
              <p className="text-sm font-bold text-navy mb-1">
                No documents found
              </p>
              <p className="text-xs text-muted">
                No {filter.toLowerCase()} documents yet.
              </p>
            </div>
          ) : (
            docs.map((doc) => (
              <Card key={doc.id} className="!p-0">
                <div className="flex items-center gap-3.5 px-4 py-3.5">
                  {/* File Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${formatIconForDoc(
                      doc.format
                    )}`}
                  >
                    <FileText size={18} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy truncate mb-0.5">
                      {doc.title}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={formatBadgeVariant(doc.type)}>
                        {doc.type}
                      </Badge>
                      <span className="text-[0.5625rem] text-placeholder">
                        {doc.size}
                      </span>
                      <span className="text-[0.5625rem] text-placeholder">
                        {doc.date}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-navy hover:bg-surface-alt transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-navy hover:bg-surface-alt transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Security Notice */}
        <div className="animate-fade-up delay-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-brand-green-light rounded-xl">
            <Lock size={16} className="text-brand-green shrink-0" />
            <p className="text-xs text-brand-green-dark font-semibold leading-relaxed">
              All documents are encrypted and stored securely with
              bank-level AES-256 encryption.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
