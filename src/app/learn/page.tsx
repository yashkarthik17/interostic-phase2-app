"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Badge,
} from "@/components/ui/shell";
import { BottomNav } from "@/components/ui/shell";
import { Search, Clock, ChevronRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
}

const categories = [
  "All",
  "Tax Basics",
  "IRS Process",
  "Resolution Options",
  "Forms & Documents",
];

const articles: Article[] = [
  {
    slug: "understanding-your-irs-transcript",
    title: "Understanding Your IRS Transcript",
    description:
      "Learn how to read and interpret the codes, dates, and amounts on your IRS account transcript.",
    readTime: "8 min read",
    category: "Tax Basics",
  },
  {
    slug: "offer-in-compromise-guide",
    title: "Offer in Compromise Guide",
    description:
      "A complete walkthrough of the OIC process, eligibility requirements, and how to maximize your chances of acceptance.",
    readTime: "12 min read",
    category: "Resolution Options",
  },
  {
    slug: "installment-agreement-types",
    title: "Installment Agreement Types",
    description:
      "Compare Guaranteed, Streamlined, and Partial Payment installment agreements to find the right fit.",
    readTime: "6 min read",
    category: "Resolution Options",
  },
  {
    slug: "penalty-abatement-strategies",
    title: "Penalty Abatement Strategies",
    description:
      "How to request First-Time Abatement, Reasonable Cause relief, and statutory exceptions to reduce your balance.",
    readTime: "10 min read",
    category: "IRS Process",
  },
  {
    slug: "csed-your-10-year-clock",
    title: "CSED: Your 10-Year Clock",
    description:
      "Understanding the Collection Statute Expiration Date and how it affects your tax debt timeline.",
    readTime: "7 min read",
    category: "IRS Process",
  },
  {
    slug: "form-433-a-walkthrough",
    title: "Form 433-A Walkthrough",
    description:
      "Step-by-step guide to completing the Collection Information Statement for wage earners and self-employed.",
    readTime: "15 min read",
    category: "Forms & Documents",
  },
];

const categoryVariants: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  "Tax Basics": "primary",
  "IRS Process": "info",
  "Resolution Options": "success",
  "Forms & Documents": "warning",
};

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = articles.filter((a) => {
    const matchesCategory =
      activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell>
      <ScreenHeader title="Learn" backHref="/dashboard" />

      <div className="px-6 pb-3 shrink-0 space-y-3">
        {/* Search bar */}
        <div className="relative animate-fade-up">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholder"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10 transition-all"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-fade-up delay-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? "bg-navy text-white"
                  : "bg-surface-alt text-muted hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ScreenContent>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-up">
            <p className="text-sm font-bold text-navy mb-1">
              No articles found
            </p>
            <p className="text-xs text-muted">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((article, i) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="animate-fade-up flex flex-col gap-2.5 p-4 bg-white border border-border rounded-2xl transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
                style={{ animationDelay: `${(i + 1) * 0.06}s` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-navy flex-1">
                    {article.title}
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-placeholder shrink-0 mt-0.5"
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={categoryVariants[article.category] || "primary"}>
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-[0.625rem] font-semibold text-placeholder">
                    <Clock size={10} />
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScreenContent>

      <BottomNav />
    </AppShell>
  );
}
