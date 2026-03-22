"use client";
import { useState, useMemo } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
} from "@/components/ui/shell";
import { Search, Info } from "lucide-react";

interface TranscriptCode {
  code: string;
  meaning: string;
  category: "filing" | "payment" | "collection" | "adjustment" | "penalty" | "other";
  important?: boolean;
}

const transcriptCodes: TranscriptCode[] = [
  { code: "TC 150", meaning: "Tax return filed -- your return has been received and processed by the IRS", category: "filing", important: true },
  { code: "TC 166", meaning: "Refund issued or overpayment applied", category: "payment" },
  { code: "TC 170", meaning: "Estimated tax payment credit", category: "payment" },
  { code: "TC 196", meaning: "Interest assessed on tax due", category: "penalty" },
  { code: "TC 240", meaning: "Miscellaneous penalty assessment", category: "penalty" },
  { code: "TC 246", meaning: "Trust Fund Recovery Penalty (TFRP) assessed -- personal liability for payroll taxes", category: "penalty", important: true },
  { code: "TC 270", meaning: "Failure to File penalty assessed (late filing)", category: "penalty" },
  { code: "TC 276", meaning: "Failure to Pay penalty assessed (late payment)", category: "penalty" },
  { code: "TC 290", meaning: "Additional tax assessment (increase in tax owed)", category: "adjustment", important: true },
  { code: "TC 291", meaning: "Tax abatement or reduction (decrease in tax owed)", category: "adjustment", important: true },
  { code: "TC 300", meaning: "Additional tax or deficiency assessment by examination", category: "adjustment" },
  { code: "TC 301", meaning: "Reduction of tax due from examination", category: "adjustment" },
  { code: "TC 340", meaning: "Interest abated (interest reduced or removed)", category: "adjustment" },
  { code: "TC 350", meaning: "Overpayment transferred to another period or liability", category: "payment" },
  { code: "TC 360", meaning: "Penalty reversal or adjustment", category: "penalty" },
  { code: "TC 420", meaning: "Examination (audit) indicator -- your return has been selected for examination", category: "collection", important: true },
  { code: "TC 421", meaning: "Examination closed -- audit completed, case closed", category: "collection" },
  { code: "TC 460", meaning: "Extension of time to file granted", category: "filing" },
  { code: "TC 480", meaning: "Offer in Compromise pending", category: "collection" },
  { code: "TC 481", meaning: "Offer in Compromise accepted", category: "collection", important: true },
  { code: "TC 520", meaning: "IRS Litigation Code / bankruptcy freeze -- collection activity suspended", category: "collection", important: true },
  { code: "TC 521", meaning: "Reversal of TC 520 -- litigation or bankruptcy freeze removed", category: "collection" },
  { code: "TC 530", meaning: "Currently Not Collectible (CNC) -- account shelved, collection paused", category: "collection", important: true },
  { code: "TC 531", meaning: "Reversal of CNC status -- collection activity may resume", category: "collection" },
  { code: "TC 570", meaning: "Additional account action pending (hold on refund or account)", category: "other", important: true },
  { code: "TC 571", meaning: "Reversal of TC 570 -- hold released", category: "other" },
  { code: "TC 582", meaning: "Federal Tax Lien filed -- a lien has been placed on your property", category: "collection", important: true },
  { code: "TC 583", meaning: "Federal Tax Lien released", category: "collection" },
  { code: "TC 610", meaning: "Payment with return (tax paid when filing)", category: "payment" },
  { code: "TC 640", meaning: "Subsequent payment received (payment made after filing)", category: "payment" },
  { code: "TC 660", meaning: "Estimated tax payment applied", category: "payment" },
  { code: "TC 670", meaning: "Subsequent payment or credit applied to balance", category: "payment" },
  { code: "TC 700", meaning: "Credit to your account (withholding credit from W-2)", category: "payment" },
  { code: "TC 706", meaning: "Excess FICA credit applied", category: "payment" },
  { code: "TC 710", meaning: "Credit applied from prior year overpayment", category: "payment" },
  { code: "TC 768", meaning: "Earned Income Credit applied", category: "payment" },
  { code: "TC 806", meaning: "W-2 or 1099 withholding credit", category: "payment" },
  { code: "TC 810", meaning: "Refund freeze -- your refund is being held pending review", category: "other", important: true },
  { code: "TC 811", meaning: "Reversal of TC 810 -- refund freeze removed", category: "other" },
  { code: "TC 826", meaning: "Overpayment transferred to another tax year", category: "payment" },
  { code: "TC 840", meaning: "Refund issued (manual refund)", category: "payment" },
  { code: "TC 846", meaning: "Refund issued (direct deposit or check mailed)", category: "payment", important: true },
  { code: "TC 898", meaning: "Refund offset to a non-IRS debt (child support, student loans, etc.)", category: "other" },
  { code: "TC 971", meaning: "Notice issued or miscellaneous transaction (check Action Code for details)", category: "other", important: true },
  { code: "TC 977", meaning: "Amended return filed (Form 1040-X received)", category: "filing" },
];

const categoryLabels: Record<string, { label: string; variant: "primary" | "success" | "warning" | "danger" | "info" }> = {
  filing: { label: "Filing", variant: "info" },
  payment: { label: "Payment", variant: "success" },
  collection: { label: "Collection", variant: "danger" },
  adjustment: { label: "Adjustment", variant: "warning" },
  penalty: { label: "Penalty", variant: "danger" },
  other: { label: "Other", variant: "primary" },
};

export default function TranscriptCodesPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredCodes = useMemo(() => {
    return transcriptCodes.filter((tc) => {
      const matchesSearch =
        search === "" ||
        tc.code.toLowerCase().includes(search.toLowerCase()) ||
        tc.meaning.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || tc.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, filterCategory]);

  const categories = ["all", "filing", "payment", "collection", "adjustment", "penalty", "other"];

  return (
    <AppShell>
      <ScreenHeader title="Transcript Codes" backHref="/resolve" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          IRS account transcripts use transaction codes to record every action on
          your account. Search for a code to understand what it means.
        </p>

        {/* Search */}
        <div className="animate-fade-up delay-1">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholder"
            />
            <input
              type="text"
              placeholder="Search by code or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="animate-fade-up delay-2 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filterCategory === cat
                  ? "bg-navy text-white"
                  : "bg-surface-alt text-muted hover:bg-border"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat]?.label || cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="animate-fade-up delay-2">
          <p className="text-xs font-semibold text-muted">
            {filteredCodes.length} code{filteredCodes.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Code List */}
        <div className="space-y-2.5">
          {filteredCodes.map((tc, i) => {
            const cat = categoryLabels[tc.category];
            return (
              <div
                key={tc.code}
                className={`animate-fade-up p-4 bg-white border rounded-2xl ${
                  tc.important ? "border-brand-blue/30" : "border-border"
                }`}
                style={{ animationDelay: `${Math.min(i, 10) * 0.03}s` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-black text-navy">{tc.code}</span>
                  <Badge variant={cat.variant}>{cat.label}</Badge>
                  {tc.important && <Badge variant="primary">Key Code</Badge>}
                </div>
                <p className="text-sm text-navy leading-relaxed">{tc.meaning}</p>
              </div>
            );
          })}
        </div>

        {filteredCodes.length === 0 && (
          <Card>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Search size={24} className="text-muted mb-2" />
              <p className="text-sm font-semibold text-navy">No codes found</p>
              <p className="text-xs text-muted mt-1">
                Try a different search term or category
              </p>
            </div>
          </Card>
        )}

        <div className="animate-fade-up">
          <div className="flex items-start gap-2 p-3 bg-info-light rounded-xl">
            <Info size={16} className="text-info shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-info leading-relaxed">
              Transaction codes appear on your IRS Account Transcript. Some codes
              have Action Codes (AC) that provide additional detail. For example,
              TC 971 AC 043 means an installment agreement request is pending.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
