"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Badge,
  SectionHeader,
  ContextCard,
} from "@/components/ui/shell";
import { UserCheck, ChevronDown, AlertTriangle, CheckCircle2, Shield, Info } from "lucide-react";

const whatToExpect = [
  "Revenue Officers (ROs) are field agents who make in-person visits",
  "They have more authority than phone-based agents",
  "They can seize assets, file liens, and levy accounts without court approval",
  "An RO is assigned when your case is considered high priority",
  "ROs typically handle cases over $250,000 or with repeated non-compliance",
];

const doList = [
  "Be polite and professional at all times",
  "Verify their identity -- ask for their IRS pocket commission and HSPD-12 card",
  "Ask for their name, employee number, and manager's contact information",
  "Request time to consult with a tax professional before making statements",
  "Provide requested documents by the deadline (ask for extensions in writing)",
  "Follow up all verbal agreements in writing",
  "Keep detailed notes of every interaction including date, time, and what was discussed",
];

const dontList = [
  "Do not ignore them -- this will escalate your case",
  "Do not make verbal promises about payment amounts without professional advice",
  "Do not provide documents you have not reviewed with your representative",
  "Do not discuss other tax years beyond what they are asking about",
  "Do not let them pressure you into signing anything on the spot",
  "Do not be hostile -- they have significant enforcement power",
];

const sections = [
  {
    title: "Your Rights with a Revenue Officer",
    items: [
      "Right to representation (Power of Attorney via Form 2848)",
      "Right to a Collection Due Process hearing before property seizure",
      "Right to request your case be transferred to a different RO",
      "Right to contact the Taxpayer Advocate Service",
      "Right to record the interaction in most jurisdictions",
    ],
  },
];

export default function RevenueOfficerPage() {
  const [showDos, setShowDos] = useState(true);
  const [showDonts, setShowDonts] = useState(false);

  return (
    <AppShell>
      <ScreenHeader title="Revenue Officer Guide" backHref="/specialty" />

      <ScreenContent className="space-y-4 pt-1">
        <p className="text-sm text-muted animate-fade-up">
          Having a Revenue Officer assigned to your case is serious but
          manageable. Knowing how to interact with them properly can significantly
          affect your outcome.
        </p>

        <div className="animate-fade-up delay-1">
          <ContextCard icon={AlertTriangle} title="Get Representation Immediately" variant="red">
            If a Revenue Officer has been assigned to your case, hire a tax
            professional and file Form 2848 (Power of Attorney) as soon as
            possible. This ensures the RO communicates through your
            representative.
          </ContextCard>
        </div>

        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <UserCheck size={14} className="text-teal" />
              <p className="text-sm font-bold text-navy">What to Expect</p>
            </div>
            <div className="space-y-2.5">
              {whatToExpect.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Info size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Do's */}
        <div className="animate-fade-up delay-3">
          <Card>
            <button
              onClick={() => setShowDos(!showDos)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-green" />
                <p className="text-sm font-bold text-navy">Do This</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${showDos ? "rotate-180" : ""}`} />
            </button>
            {showDos && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                {doList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="text-sm text-navy">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Don'ts */}
        <div className="animate-fade-up delay-4">
          <Card>
            <button
              onClick={() => setShowDonts(!showDonts)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-brand-red" />
                <p className="text-sm font-bold text-navy">Avoid This</p>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${showDonts ? "rotate-180" : ""}`} />
            </button>
            {showDonts && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                {dontList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <AlertTriangle size={14} className="text-brand-red shrink-0 mt-0.5" />
                    <span className="text-sm text-navy">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Rights */}
        <div className="animate-fade-up delay-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-navy" />
              <p className="text-sm font-bold text-navy">Your Rights</p>
            </div>
            <div className="space-y-2.5">
              {sections[0].items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Shield size={14} className="text-navy shrink-0 mt-0.5" />
                  <span className="text-sm text-navy">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
