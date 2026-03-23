"use client";
import { useState, useRef } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, SectionHeader } from "@/components/ui/shell";
import { Search, BookOpen } from "lucide-react";

interface GlossaryTerm {
  abbr: string;
  full: string;
  definition: string;
}

const terms: GlossaryTerm[] = [
  { abbr: "CAP", full: "Collection Appeals Program", definition: "An administrative appeal process that allows taxpayers to challenge IRS collection actions such as levies, liens, or seizures before or after they occur." },
  { abbr: "CDP", full: "Collection Due Process", definition: "A formal hearing right that gives taxpayers the opportunity to dispute a proposed levy or the filing of a Notice of Federal Tax Lien before an independent Appeals officer." },
  { abbr: "CNC", full: "Currently Not Collectible", definition: "A status the IRS places on your account when they determine you cannot afford to pay your tax debt. Collection activity is paused, though interest and penalties may still accrue." },
  { abbr: "CSED", full: "Collection Statute Expiration Date", definition: "The date after which the IRS can no longer legally collect a tax debt. Generally 10 years from the date of assessment, but certain actions can extend (toll) this deadline." },
  { abbr: "DATC", full: "Doubt as to Collectibility", definition: "One of the grounds for submitting an Offer in Compromise. It means the IRS doubts they can collect the full amount owed from you before the collection statute expires." },
  { abbr: "DATL", full: "Doubt as to Liability", definition: "A basis for an Offer in Compromise where you dispute that you actually owe the tax debt, either in whole or in part. Requires supporting evidence." },
  { abbr: "DDIA", full: "Direct Debit Installment Agreement", definition: "An installment agreement where monthly payments are automatically debited from your bank account. Offers lower user fees and may prevent a federal tax lien filing." },
  { abbr: "ETA", full: "Effective Tax Administration", definition: "A basis for an Offer in Compromise used when you technically owe the debt and could pay it, but collection would create economic hardship or be unfair due to exceptional circumstances." },
  { abbr: "FTF", full: "Failure to File Penalty", definition: "A penalty of 5% per month (up to 25%) applied when you do not file your tax return by the due date, including extensions. Also called the late filing penalty." },
  { abbr: "FTP", full: "Failure to Pay Penalty", definition: "A penalty of 0.5% per month (up to 25%) applied to unpaid taxes when you do not pay by the due date. The rate may increase to 1% per month after IRS notice." },
  { abbr: "IA", full: "Installment Agreement", definition: "A payment plan with the IRS that allows you to pay your tax debt over time in monthly installments. Several types exist including streamlined, partial pay, and non-streamlined." },
  { abbr: "MDI", full: "Monthly Disposable Income", definition: "The amount of money left each month after subtracting allowable living expenses from gross income. The IRS uses this figure to determine what you can afford to pay toward your tax debt." },
  { abbr: "NFTL", full: "Notice of Federal Tax Lien", definition: "A public document filed with local authorities that puts creditors on notice that the IRS has a legal claim against your property, including real estate, personal property, and financial assets." },
  { abbr: "OIC", full: "Offer in Compromise", definition: "An agreement with the IRS to settle your tax debt for less than the full amount you owe. The IRS evaluates your ability to pay, income, expenses, and asset equity to determine an acceptable offer amount." },
  { abbr: "POA", full: "Power of Attorney", definition: "Authorization (typically IRS Form 2848) that allows a designated individual, such as an attorney, CPA, or Enrolled Agent, to represent you before the IRS and access your tax information." },
  { abbr: "RCP", full: "Reasonable Collection Potential", definition: "The amount the IRS calculates they could collect from you, combining your asset equity plus future income over the remaining collection period. This is the minimum acceptable Offer in Compromise amount." },
  { abbr: "SFR", full: "Substitute for Return", definition: "A tax return the IRS files on your behalf when you fail to file. SFRs typically result in a higher tax liability because they do not include deductions, credits, or filing status benefits you may be entitled to." },
  { abbr: "TC", full: "Transaction Code", definition: "A three-digit code on your IRS account transcript that identifies a specific action or event on your tax account, such as a return filing, payment, penalty assessment, or refund issuance." },
  { abbr: "TFRP", full: "Trust Fund Recovery Penalty", definition: "A penalty assessed against individuals responsible for collecting and paying employment taxes (like income tax withholding and Social Security) who willfully fail to do so. Also called the 100% penalty." },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = terms.filter(
    (t) =>
      !search ||
      t.abbr.toLowerCase().includes(search.toLowerCase()) ||
      t.full.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  // Group by first letter of abbreviation
  const grouped: Record<string, GlossaryTerm[]> = {};
  filtered.forEach((t) => {
    const letter = t.abbr[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  });

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`glossary-${letter}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLetters = new Set(Object.keys(grouped));

  return (
    <AppShell>
      <ScreenHeader title="Tax Glossary" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Search */}
        <div className="animate-fade-up delay-1">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder" />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150"
            />
          </div>
        </div>

        {/* Alphabet Jump Links */}
        <div className="animate-fade-up delay-2 flex flex-wrap gap-1 justify-center">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              disabled={!activeLetters.has(letter)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-150 ${
                activeLetters.has(letter)
                  ? "bg-navy text-white hover:opacity-90 active:scale-95"
                  : "bg-surface-alt text-placeholder cursor-default"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Terms */}
        <div ref={scrollRef} className="animate-fade-up delay-3 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={40} className="mx-auto text-placeholder mb-3" />
              <p className="text-sm font-semibold text-muted">No matching terms found</p>
              <p className="text-xs text-placeholder mt-1">Try a different search term</p>
            </div>
          )}
          {Object.keys(grouped)
            .sort()
            .map((letter) => (
              <div key={letter} id={`glossary-${letter}`}>
                <p className="text-[0.72rem] font-bold text-brand-blue uppercase tracking-wider mb-2">
                  {letter}
                </p>
                <div className="space-y-2.5">
                  {grouped[letter].map((term) => (
                    <Card key={term.abbr} className="!p-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-navy-light text-navy text-xs font-black shrink-0 min-w-[48px] text-center">
                          {term.abbr}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-navy leading-snug">{term.full}</p>
                          <p className="text-xs text-muted leading-relaxed mt-1.5">{term.definition}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
