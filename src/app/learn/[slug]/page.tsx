"use client";
import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Badge,
  Card,
  Button,
} from "@/components/ui/shell";

import {
  Clock,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ArticleData {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: ArticleSection[];
  relatedSlugs: string[];
}

interface ArticleSection {
  type: "paragraph" | "bullets" | "callout";
  heading?: string;
  text?: string;
  items?: string[];
  variant?: "info" | "warning" | "success";
}

const articlesDb: Record<string, ArticleData> = {
  "understanding-your-irs-transcript": {
    title: "Understanding Your IRS Transcript",
    author: "BlastTax Team",
    date: "March 10, 2026",
    readTime: "8 min read",
    category: "Tax Basics",
    content: [
      {
        type: "paragraph",
        text: "Your IRS transcript is a detailed record of your tax account history. It contains transaction codes, dates, and amounts that tell the story of your tax situation. Understanding how to read it is the first step toward resolving your tax debt.",
      },
      {
        type: "callout",
        variant: "info",
        text: "You can request your transcript for free at IRS.gov or by calling 1-800-908-9946. BlastTax can also help decode your transcript automatically.",
      },
      {
        type: "paragraph",
        heading: "Types of Transcripts",
        text: "The IRS offers several types of transcripts, each serving a different purpose:",
      },
      {
        type: "bullets",
        items: [
          "Account Transcript - Shows your tax account activity including payments, adjustments, and penalties for a specific year",
          "Return Transcript - Contains most of the line items from your filed tax return",
          "Record of Account - Combines the Account and Return transcripts",
          "Wage & Income Transcript - Shows income reported to the IRS by third parties (W-2s, 1099s)",
        ],
      },
      {
        type: "paragraph",
        heading: "Key Transaction Codes",
        text: "Transaction codes are three-digit numbers that describe specific actions on your account. Here are the most important ones to know:",
      },
      {
        type: "bullets",
        items: [
          "150 - Tax return filed and tax assessed",
          "806 - W-2 withholding credits applied",
          "846 - Refund issued",
          "971 - Notice issued to taxpayer",
          "670 - Payment applied to account",
          "290 - Additional tax assessment",
          "300 - Additional tax assessed with penalty",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "If you see code 971 followed by 977, it means the IRS sent you a notice. Always review these notices promptly as they often contain deadlines for response.",
      },
      {
        type: "paragraph",
        heading: "Reading the Amounts",
        text: "Each transaction line includes an amount. Positive amounts increase your balance (tax owed), while negative amounts decrease it (payments, credits). The running balance shown at various points helps you understand how your debt accumulated over time.",
      },
    ],
    relatedSlugs: ["offer-in-compromise-guide", "csed-your-10-year-clock"],
  },
  "offer-in-compromise-guide": {
    title: "Offer in Compromise Guide",
    author: "BlastTax Team",
    date: "March 5, 2026",
    readTime: "12 min read",
    category: "Resolution Options",
    content: [
      {
        type: "paragraph",
        text: "An Offer in Compromise (OIC) allows you to settle your tax debt with the IRS for less than the full amount owed. It is considered when the taxpayer cannot pay the full debt, or when paying in full would create financial hardship.",
      },
      {
        type: "callout",
        variant: "success",
        text: "In 2025, the IRS accepted approximately 40% of OIC applications. Proper preparation and accurate financial documentation are key to acceptance.",
      },
      {
        type: "paragraph",
        heading: "Eligibility Requirements",
        text: "Before applying, you must meet these basic requirements:",
      },
      {
        type: "bullets",
        items: [
          "All required tax returns must be filed",
          "You must be current on estimated tax payments (if applicable)",
          "You cannot be in an open bankruptcy proceeding",
          "You must have a valid extension for the current year if applicable",
          "Employers must have current tax deposits if applicable",
        ],
      },
      {
        type: "paragraph",
        heading: "How the IRS Calculates Your Offer",
        text: "The IRS uses a formula called the Reasonable Collection Potential (RCP) to determine the minimum acceptable offer. This includes your asset equity plus your future income potential minus allowable living expenses.",
      },
      {
        type: "callout",
        variant: "info",
        text: "The RCP formula: (Asset Equity) + (Monthly Disposable Income x 12 or 24 months) = Minimum Offer Amount. Lump sum offers use 12 months; periodic payment offers use 24 months.",
      },
      {
        type: "paragraph",
        heading: "Application Process",
        text: "Submit Form 656 (Offer in Compromise) along with Form 433-A (OIC) for individuals. Include the $205 application fee and initial payment with your offer. Processing typically takes 6-12 months.",
      },
    ],
    relatedSlugs: [
      "installment-agreement-types",
      "penalty-abatement-strategies",
    ],
  },
  "installment-agreement-types": {
    title: "Installment Agreement Types",
    author: "BlastTax Team",
    date: "February 28, 2026",
    readTime: "6 min read",
    category: "Resolution Options",
    content: [
      {
        type: "paragraph",
        text: "If you cannot pay your tax debt in full, an installment agreement lets you make monthly payments. The IRS offers several types, each with different requirements and benefits.",
      },
      {
        type: "paragraph",
        heading: "Guaranteed Installment Agreement",
        text: "If you owe $10,000 or less (excluding penalties and interest) and can pay within 3 years, the IRS must approve your request. This is the easiest to obtain.",
      },
      {
        type: "paragraph",
        heading: "Streamlined Installment Agreement",
        text: "For debts up to $50,000, you can apply without providing detailed financial information. Pay the balance within 72 months or before the CSED, whichever comes first.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Setting up a Direct Debit Installment Agreement (DDIA) reduces the setup fee and may help avoid a federal tax lien filing.",
      },
      {
        type: "paragraph",
        heading: "Partial Payment Installment Agreement",
        text: "If you cannot afford to pay the full balance over time, the IRS may accept lower monthly payments. The remaining balance may be forgiven after the CSED expires.",
      },
      {
        type: "bullets",
        items: [
          "Guaranteed IA: $10,000 or less, must pay in 36 months",
          "Streamlined IA: $50,000 or less, must pay in 72 months",
          "Partial Pay IA: Any amount, payments based on ability to pay",
          "Non-Streamlined IA: Over $50,000, requires full financial disclosure",
        ],
      },
    ],
    relatedSlugs: [
      "offer-in-compromise-guide",
      "penalty-abatement-strategies",
    ],
  },
  "penalty-abatement-strategies": {
    title: "Penalty Abatement Strategies",
    author: "BlastTax Team",
    date: "February 20, 2026",
    readTime: "10 min read",
    category: "IRS Process",
    content: [
      {
        type: "paragraph",
        text: "IRS penalties can add 25% or more to your tax debt. Fortunately, the IRS offers several ways to reduce or eliminate these penalties if you qualify.",
      },
      {
        type: "paragraph",
        heading: "First-Time Abatement (FTA)",
        text: "If you have a clean compliance history for the past 3 years, you may qualify for First-Time Abatement. This can remove Failure to File, Failure to Pay, and Failure to Deposit penalties.",
      },
      {
        type: "callout",
        variant: "success",
        text: "FTA is the easiest penalty relief to obtain. You can request it by phone, letter, or through Form 843. No detailed explanation is needed if you qualify.",
      },
      {
        type: "paragraph",
        heading: "Reasonable Cause",
        text: "If you can demonstrate that your failure to comply was due to circumstances beyond your control, the IRS may grant penalty relief. Common reasonable causes include:",
      },
      {
        type: "bullets",
        items: [
          "Serious illness or incapacitation",
          "Natural disaster or casualty",
          "Death of an immediate family member",
          "Inability to obtain records",
          "Erroneous advice from the IRS",
          "Fire, flood, or other disruption",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "You must provide documentation supporting your reasonable cause claim. Keep medical records, insurance claims, and other evidence organized.",
      },
    ],
    relatedSlugs: [
      "csed-your-10-year-clock",
      "understanding-your-irs-transcript",
    ],
  },
  "csed-your-10-year-clock": {
    title: "CSED: Your 10-Year Clock",
    author: "BlastTax Team",
    date: "February 15, 2026",
    readTime: "7 min read",
    category: "IRS Process",
    content: [
      {
        type: "paragraph",
        text: "The Collection Statute Expiration Date (CSED) is arguably the most important date in tax resolution. After 10 years from the date of assessment, the IRS can no longer legally collect a tax debt. Understanding your CSED can dramatically change your resolution strategy.",
      },
      {
        type: "callout",
        variant: "info",
        text: "The 10-year clock starts when the tax is assessed (code 150 on your transcript), not when you filed the return or when the tax year ended.",
      },
      {
        type: "paragraph",
        heading: "How the CSED Works",
        text: "Each tax year has its own CSED. For example, if your 2020 return was assessed on July 15, 2021, the CSED for that year is July 15, 2031. After that date, the IRS must write off any remaining balance for that year.",
      },
      {
        type: "paragraph",
        heading: "CSED Suspensions",
        text: "Certain actions can pause or extend the 10-year clock:",
      },
      {
        type: "bullets",
        items: [
          "Submitting an Offer in Compromise (suspends CSED plus 30 days)",
          "Filing for bankruptcy (suspends CSED plus 6 months)",
          "Requesting an installment agreement (may suspend CSED)",
          "Living outside the US for 6+ continuous months",
          "Filing a Collection Due Process appeal",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Be strategic about OIC applications. If denied, you have lost time on your CSED. Always calculate your CSED before deciding on a resolution path.",
      },
    ],
    relatedSlugs: [
      "understanding-your-irs-transcript",
      "offer-in-compromise-guide",
    ],
  },
  "form-433-a-walkthrough": {
    title: "Form 433-A Walkthrough",
    author: "BlastTax Team",
    date: "February 8, 2026",
    readTime: "15 min read",
    category: "Forms & Documents",
    content: [
      {
        type: "paragraph",
        text: "Form 433-A is the Collection Information Statement for Wage Earners and Self-Employed Individuals. It is required for most resolution applications and gives the IRS a snapshot of your financial situation.",
      },
      {
        type: "paragraph",
        heading: "When You Need Form 433-A",
        text: "You will need to complete this form when applying for an Offer in Compromise, requesting Currently Not Collectible status, or setting up a non-streamlined installment agreement.",
      },
      {
        type: "paragraph",
        heading: "Key Sections",
        text: "The form has seven main sections that cover your complete financial picture:",
      },
      {
        type: "bullets",
        items: [
          "Section 1: Personal information and employment details",
          "Section 2: Personal asset information (bank accounts, investments, real estate, vehicles)",
          "Section 3: Credit card and lines of credit",
          "Section 4: Business information (if self-employed)",
          "Section 5: Monthly household income from all sources",
          "Section 6: Monthly household expenses using IRS allowable standards",
          "Section 7: Supporting documentation checklist",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "BlastTax can help you fill out Form 433-A automatically based on the financial information you enter during the analysis process.",
      },
    ],
    relatedSlugs: [
      "offer-in-compromise-guide",
      "installment-agreement-types",
    ],
  },
};

const allArticles = [
  { slug: "understanding-your-irs-transcript", title: "Understanding Your IRS Transcript", category: "Tax Basics" },
  { slug: "offer-in-compromise-guide", title: "Offer in Compromise Guide", category: "Resolution Options" },
  { slug: "installment-agreement-types", title: "Installment Agreement Types", category: "Resolution Options" },
  { slug: "penalty-abatement-strategies", title: "Penalty Abatement Strategies", category: "IRS Process" },
  { slug: "csed-your-10-year-clock", title: "CSED: Your 10-Year Clock", category: "IRS Process" },
  { slug: "form-433-a-walkthrough", title: "Form 433-A Walkthrough", category: "Forms & Documents" },
];

const categoryVariants: Record<string, "primary" | "success" | "warning" | "danger" | "info"> = {
  "Tax Basics": "primary",
  "IRS Process": "info",
  "Resolution Options": "success",
  "Forms & Documents": "warning",
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const article = articlesDb[slug];

  if (!article) {
    return (
      <AppShell>
        <ScreenHeader title="Article" backHref="/learn" />
        <ScreenContent className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-bold text-navy mb-1">Article not found</p>
          <p className="text-xs text-muted mb-4">
            This article may have been moved or removed.
          </p>
          <Button href="/learn" variant="outline" full={false}>
            Back to Learn
          </Button>
        </ScreenContent>
      </AppShell>
    );
  }

  const related = article.relatedSlugs
    .map((s) => allArticles.find((a) => a.slug === s))
    .filter(Boolean) as typeof allArticles;

  return (
    <AppShell>
      <ScreenHeader title="Article" backHref="/learn" />

      <ScreenContent className="space-y-5 pt-1">
        {/* Title + meta */}
        <div className="animate-fade-up delay-1">
          <Badge variant={categoryVariants[article.category] || "primary"}>
            {article.category}
          </Badge>
          <h1 className="text-xl font-black text-navy mt-2 mb-3 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <User size={12} />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content sections */}
        <div className="animate-fade-up delay-2 space-y-4">
          {article.content.map((section, i) => {
            if (section.type === "paragraph") {
              return (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-base font-bold text-navy mb-1.5">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-sm text-navy/80 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              );
            }
            if (section.type === "bullets") {
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {section.items?.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-navy/80 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (section.type === "callout") {
              const calloutStyles = {
                info: {
                  bg: "bg-info-light",
                  border: "border-info/20",
                  icon: AlertCircle,
                  iconColor: "text-info",
                },
                warning: {
                  bg: "bg-warning-light",
                  border: "border-warning/20",
                  icon: AlertCircle,
                  iconColor: "text-warning",
                },
                success: {
                  bg: "bg-success-light",
                  border: "border-success/20",
                  icon: CheckCircle2,
                  iconColor: "text-success",
                },
              };
              const style =
                calloutStyles[section.variant || "info"] || calloutStyles.info;
              const CalloutIcon = style.icon;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg} ${style.border}`}
                >
                  <CalloutIcon
                    size={16}
                    className={`${style.iconColor} shrink-0 mt-0.5`}
                  />
                  <p className="text-sm text-navy/80 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Feedback */}
        <div className="animate-fade-up delay-3">
          <Card className="text-center">
            <p className="text-sm font-bold text-navy mb-3">
              Was this article helpful?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setFeedback("up")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-[0.95] ${
                  feedback === "up"
                    ? "bg-brand-green text-white"
                    : "bg-surface-alt text-muted hover:text-brand-green hover:border-brand-green border border-border"
                }`}
              >
                <ThumbsUp size={16} />
                Yes
              </button>
              <button
                onClick={() => setFeedback("down")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-[0.95] ${
                  feedback === "down"
                    ? "bg-brand-red text-white"
                    : "bg-surface-alt text-muted hover:text-brand-red hover:border-brand-red border border-border"
                }`}
              >
                <ThumbsDown size={16} />
                No
              </button>
            </div>
            {feedback && (
              <p className="text-xs text-muted mt-3 animate-fade-up">
                Thanks for your feedback!
              </p>
            )}
          </Card>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="animate-fade-up delay-4">
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
              Related Articles
            </p>
            <div className="space-y-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/learn/${r.slug}`}
                  className="flex items-center gap-3 p-3.5 bg-white border border-border rounded-xl transition-all duration-200 hover:border-border-strong hover:shadow-sm active:scale-[0.99]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy truncate">
                      {r.title}
                    </p>
                    <Badge variant={categoryVariants[r.category] || "primary"}>
                      {r.category}
                    </Badge>
                  </div>
                  <ChevronRight size={16} className="text-placeholder shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </ScreenContent>

    </AppShell>
  );
}
