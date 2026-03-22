"use client";
import { AppShell, ScreenHeader, ScreenContent } from "@/components/ui/shell";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "description", title: "2. Description of Service" },
  { id: "accounts", title: "3. User Accounts" },
  { id: "subscription", title: "4. Subscription & Billing" },
  { id: "use", title: "5. Acceptable Use" },
  { id: "ip", title: "6. Intellectual Property" },
  { id: "disclaimer", title: "7. Disclaimer of Warranties" },
  { id: "liability", title: "8. Limitation of Liability" },
  { id: "termination", title: "9. Termination" },
  { id: "governing", title: "10. Governing Law" },
  { id: "changes", title: "11. Changes to Terms" },
  { id: "contact", title: "12. Contact Information" },
];

export default function TermsPage() {
  return (
    <AppShell>
      <ScreenHeader title="Terms of Service" backHref="/legal" />
      <ScreenContent className="pt-2">
        <div className="animate-fade-up delay-1">
          <p className="text-xs font-semibold text-muted mb-4">Last Updated: March 1, 2026</p>

          {/* Table of Contents */}
          <div className="bg-surface-alt border border-border rounded-2xl p-4 mb-6">
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              Table of Contents
            </p>
            <div className="space-y-1.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm font-medium text-brand-blue hover:underline"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Content */}
          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <section id="acceptance">
              <h2 className="text-base font-bold text-navy mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using BlastTax (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service. These Terms constitute a legally binding agreement between you and BlastTax, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
              <p className="mt-2">
                Your continued use of the Service following the posting of any changes to these Terms constitutes acceptance of those changes. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section id="description">
              <h2 className="text-base font-bold text-navy mb-2">2. Description of Service</h2>
              <p>
                BlastTax is an AI-powered tax resolution platform that provides tools, calculators, and guidance for resolving federal tax debt. The Service includes tax debt analysis, resolution strategy recommendations, IRS form preparation, document generation, and educational resources.
              </p>
              <p className="mt-2">
                The Service is designed to assist individuals in understanding their tax resolution options and preparing their own submissions. BlastTax does not provide legal advice, tax advice, or representation before the IRS unless expressly stated through our Expert Handoff feature with licensed professionals.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-base font-bold text-navy mb-2">3. User Accounts</h2>
              <p>
                To use certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.
              </p>
              <p className="mt-2">
                You must be at least 18 years of age to create an account. You may not create an account on behalf of another person without their express permission. We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section id="subscription">
              <h2 className="text-base font-bold text-navy mb-2">4. Subscription & Billing</h2>
              <p>
                Certain features of the Service require a paid subscription. By subscribing, you authorize us to charge your designated payment method on a recurring basis. Subscription fees are billed in advance on a monthly basis and are non-refundable except as required by law or as described in our refund policy.
              </p>
              <p className="mt-2">
                You may cancel your subscription at any time through your Account Settings. Cancellation takes effect at the end of the current billing period. We reserve the right to change subscription fees with 30 days&apos; notice. Free trial terms, if offered, are subject to additional conditions specified at enrollment.
              </p>
            </section>

            <section id="use">
              <h2 className="text-base font-bold text-navy mb-2">5. Acceptable Use</h2>
              <p>
                You agree to use the Service only for lawful purposes. You may not: (a) use the Service to prepare fraudulent tax submissions; (b) attempt to gain unauthorized access to other users&apos; accounts or our systems; (c) reverse engineer, decompile, or disassemble any part of the Service; (d) use automated tools to scrape or collect data from the Service; or (e) resell, sublicense, or redistribute the Service without our written permission.
              </p>
            </section>

            <section id="ip">
              <h2 className="text-base font-bold text-navy mb-2">6. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, algorithms, and software, are owned by BlastTax, Inc. or its licensors and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes.
              </p>
            </section>

            <section id="disclaimer">
              <h2 className="text-base font-bold text-navy mb-2">7. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. WE DO NOT GUARANTEE ANY SPECIFIC OUTCOME FROM THE USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO THE ACCEPTANCE OF ANY OFFER IN COMPROMISE OR OTHER TAX RESOLUTION BY THE IRS.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-base font-bold text-navy mb-2">8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLASTTAX, INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-base font-bold text-navy mb-2">9. Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            <section id="governing">
              <h2 className="text-base font-bold text-navy mb-2">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Los Angeles County, California.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-base font-bold text-navy mb-2">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated through the Service or via email at least 30 days prior to taking effect. Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-base font-bold text-navy mb-2">12. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <div className="mt-2 p-3 bg-surface-alt rounded-xl">
                <p className="font-semibold text-navy">BlastTax, Inc.</p>
                <p>Email: legal@blasttax.com</p>
                <p>Phone: (800) 555-0199</p>
                <p>Address: 1234 Resolution Way, Los Angeles, CA 90001</p>
              </div>
            </section>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
