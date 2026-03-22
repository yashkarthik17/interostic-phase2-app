"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card } from "@/components/ui/shell";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    q: "What is an Offer in Compromise?",
    a: "An Offer in Compromise (OIC) is an agreement between you and the IRS that settles your tax debt for less than the full amount owed. The IRS considers your ability to pay, income, expenses, and asset equity when evaluating your offer. If accepted, you pay a reduced amount and the remaining balance is forgiven. It's one of the most powerful resolution tools available for taxpayers who truly cannot afford to pay their full tax liability.",
    category: "Tax Resolution",
  },
  {
    q: "How long does the process take?",
    a: "The timeline varies depending on the resolution type. An Offer in Compromise typically takes 6-12 months for the IRS to process. Installment Agreements can be set up in 2-8 weeks. Currently Not Collectible status can be granted in 1-4 weeks. Penalty Abatement requests are usually processed in 2-6 weeks. Our platform helps you prepare everything upfront to minimize delays and avoid common mistakes that cause rejections or extensions.",
    category: "General",
  },
  {
    q: "What documents do I need?",
    a: "You'll typically need: IRS account transcripts (we help you obtain these), proof of income (pay stubs, 1099s, profit/loss statements), bank statements for the last 3-6 months, asset documentation (property values, vehicle values, retirement accounts), monthly expense records, and any prior IRS correspondence. Our guided process tells you exactly what's needed at each step so nothing is missed.",
    category: "General",
  },
  {
    q: "Can I negotiate with the IRS myself?",
    a: "Yes, you absolutely can -- and that's exactly what BlastTax helps you do. Many taxpayers successfully resolve their own tax debt without hiring an expensive tax resolution firm. Our platform provides the same analysis, forms, and strategies that professionals use, but at a fraction of the cost. We guide you through every step, from calculating your Reasonable Collection Potential to preparing your submission package.",
    category: "Tax Resolution",
  },
  {
    q: "What happens if my OIC is rejected?",
    a: "If your Offer in Compromise is rejected, you have 30 days to appeal the decision through the IRS Office of Appeals. Common reasons for rejection include incomplete documentation, undervalued assets, or an offer amount below your Reasonable Collection Potential (RCP). Our platform helps you understand the rejection reason and either strengthen your appeal or pivot to an alternative resolution strategy like an Installment Agreement or Currently Not Collectible status.",
    category: "Tax Resolution",
  },
  {
    q: "How much does expert help cost?",
    a: "BlastTax Pro is $49/month and includes unlimited AI-powered analysis, form preparation, strategy recommendations, and document generation. Compare this to traditional tax resolution firms that charge $3,000-$15,000+ for similar services. If you need direct representation by a licensed tax professional (EA, CPA, or Tax Attorney), we can connect you with vetted experts at pre-negotiated rates through our Expert Handoff feature.",
    category: "Billing",
  },
  {
    q: "Is my information secure?",
    a: "Absolutely. We use bank-level 256-bit AES encryption for all data at rest and TLS 1.3 for data in transit. Your sensitive information (SSN, financial data, tax records) is encrypted and never shared with third parties without your explicit consent. We are SOC 2 Type II compliant and undergo regular security audits. You can delete your data at any time from your account settings.",
    category: "Technical",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel your subscription at any time from your Account Settings. When you cancel, you'll retain access to your current features until the end of your billing period. Your data and case history remain accessible for 90 days after cancellation. There are no cancellation fees or long-term contracts. You can resubscribe at any time and pick up where you left off.",
    category: "Billing",
  },
  {
    q: "What if I can't pay the settlement amount?",
    a: "If you can't pay a lump sum settlement, you have options. For an OIC, you can choose a Periodic Payment Offer that spreads payments over 6-24 months (though the total offer amount may be higher). Alternatively, we may recommend switching to an Installment Agreement or pursuing Currently Not Collectible status until your financial situation improves. Our analysis automatically considers your ability to pay when recommending strategies.",
    category: "Tax Resolution",
  },
  {
    q: "Do you handle state tax issues?",
    a: "Currently, BlastTax focuses on federal IRS tax debt resolution. State tax issues have different rules, forms, and processes that vary by state. However, many of the concepts and strategies (Offer in Compromise, Installment Agreements, Penalty Abatement) have state-level equivalents. We're actively working on adding state tax resolution support and plan to roll out coverage for major states in future updates.",
    category: "General",
  },
];

const categories = ["All", "General", "Billing", "Tax Resolution", "Technical"];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      !search ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell>
      <ScreenHeader title="FAQ" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Search */}
        <div className="animate-fade-up delay-1">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="animate-fade-up delay-2 flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-navy text-white"
                  : "bg-surface-alt border border-border text-muted hover:border-border-strong"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="animate-fade-up delay-3 space-y-2.5">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle size={40} className="mx-auto text-placeholder mb-3" />
              <p className="text-sm font-semibold text-muted">No matching questions found</p>
              <p className="text-xs text-placeholder mt-1">Try a different search term or category</p>
            </div>
          )}
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Card key={i} className="!p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center gap-3 w-full text-left px-5 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy leading-snug">{faq.q}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-surface-alt text-[0.6rem] font-bold text-muted uppercase tracking-wider">
                      {faq.category}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-placeholder shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 -mt-1">
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
