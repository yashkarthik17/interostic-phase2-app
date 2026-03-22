"use client";
import { AppShell, ScreenHeader, ScreenContent } from "@/components/ui/shell";

const sections = [
  { id: "collection", title: "1. Data Collection" },
  { id: "usage", title: "2. How We Use Your Data" },
  { id: "sharing", title: "3. Data Sharing" },
  { id: "security", title: "4. Security" },
  { id: "rights", title: "5. Your Rights" },
  { id: "contact", title: "6. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <AppShell>
      <ScreenHeader title="Privacy Policy" backHref="/legal" />
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

          <p className="text-sm text-muted leading-relaxed mb-6">
            BlastTax, Inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your personal information when you use our Service.
          </p>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <section id="collection">
              <h2 className="text-base font-bold text-navy mb-2">1. Data Collection</h2>
              <p className="mb-2">We collect the following types of information:</p>
              <p className="font-semibold text-navy mt-3 mb-1">Personal Information</p>
              <p>
                Name, email address, phone number, date of birth, Social Security Number (encrypted), mailing address, and filing status. This information is collected during account registration and case setup.
              </p>
              <p className="font-semibold text-navy mt-3 mb-1">Financial Information</p>
              <p>
                Income details, asset information, monthly expenses, bank account data (when you connect via Plaid), tax transcripts, and IRS correspondence. This data is used to perform tax resolution analysis and generate accurate forms.
              </p>
              <p className="font-semibold text-navy mt-3 mb-1">Usage Information</p>
              <p>
                Device information, IP address, browser type, pages visited, features used, and interaction patterns. We collect this data automatically through cookies and similar technologies to improve our Service.
              </p>
            </section>

            <section id="usage">
              <h2 className="text-base font-bold text-navy mb-2">2. How We Use Your Data</h2>
              <p>We use your personal information to:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
                <li>Provide and maintain the Service, including tax analysis and form preparation</li>
                <li>Personalize your experience and provide tailored resolution recommendations</li>
                <li>Process payments and manage your subscription</li>
                <li>Communicate with you about your account, cases, and service updates</li>
                <li>Improve our algorithms, tools, and overall user experience</li>
                <li>Comply with legal obligations and respond to lawful requests</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
              </ul>
            </section>

            <section id="sharing">
              <h2 className="text-base font-bold text-navy mb-2">3. Data Sharing</h2>
              <p>We do not sell your personal information. We may share your data with:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
                <li><strong>Service Providers:</strong> Third-party vendors who assist with payment processing, data hosting, analytics, and customer support, subject to confidentiality agreements</li>
                <li><strong>Licensed Professionals:</strong> When you use our Expert Handoff feature, we share relevant case information with the tax professional you select, with your explicit consent</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority, or to protect our rights, safety, or property</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate safeguards for your data</li>
              </ul>
            </section>

            <section id="security">
              <h2 className="text-base font-bold text-navy mb-2">4. Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
                <li>256-bit AES encryption for data at rest</li>
                <li>TLS 1.3 encryption for data in transit</li>
                <li>SOC 2 Type II compliance</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for account access</li>
                <li>Role-based access controls for our team</li>
                <li>Automatic session timeouts and encryption key rotation</li>
              </ul>
              <p className="mt-2">
                While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but will promptly notify affected users in the event of a data breach.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-base font-bold text-navy mb-2">5. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data from our systems</li>
                <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Restrict Processing:</strong> Request that we limit how we use your data</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, contact us at privacy@blasttax.com. We will respond to your request within 30 days. For California residents, additional rights under the CCPA may apply.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-base font-bold text-navy mb-2">6. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, contact us at:
              </p>
              <div className="mt-2 p-3 bg-surface-alt rounded-xl">
                <p className="font-semibold text-navy">BlastTax, Inc. - Privacy Team</p>
                <p>Email: privacy@blasttax.com</p>
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
