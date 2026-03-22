"use client";
import { AppShell, ScreenHeader, ScreenContent, Card } from "@/components/ui/shell";
import { AlertTriangle, Shield, Scale } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <AppShell>
      <ScreenHeader title="Legal Disclaimer" backHref="/legal" />
      <ScreenContent className="space-y-4 pt-2">
        <div className="animate-fade-up delay-1">
          <p className="text-xs font-semibold text-muted mb-4">Last Updated: March 1, 2026</p>
        </div>

        {/* Warning Banner */}
        <div className="animate-fade-up delay-1">
          <div className="bg-warning-light border border-warning/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning/10 shrink-0">
                <AlertTriangle size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">Not Legal or Tax Advice</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  The information and tools provided by BlastTax are for educational and informational purposes only. Nothing on this platform constitutes legal advice, tax advice, or professional representation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Disclaimer */}
        <div className="animate-fade-up delay-2">
          <Card>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-light shrink-0">
                <Shield size={20} className="text-navy" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Professional Disclaimer</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                BlastTax is a self-service software platform that provides tools, calculators, and educational content to help taxpayers understand their tax resolution options. We are not a law firm, accounting firm, or tax resolution company.
              </p>
              <p>
                The calculations, recommendations, and analysis provided by our platform are based on publicly available IRS guidelines, including the Internal Revenue Manual, IRS forms and instructions, and National Standards for allowable expenses. While we strive for accuracy, tax law is complex and individual circumstances vary.
              </p>
              <p>
                Our AI-powered tools generate recommendations based on the information you provide. The accuracy of our analysis depends on the completeness and accuracy of your inputs. We cannot verify the information you supply.
              </p>
              <p>
                Using BlastTax does not create an attorney-client relationship, CPA-client relationship, or any other professional service relationship. If you need professional tax advice or legal representation, we recommend consulting with a licensed tax professional, such as an Enrolled Agent (EA), Certified Public Accountant (CPA), or Tax Attorney.
              </p>
            </div>
          </Card>
        </div>

        {/* Limitation of Liability */}
        <div className="animate-fade-up delay-3">
          <Card>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info-light shrink-0">
                <Scale size={20} className="text-info" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Limitation of Liability</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                BlastTax, Inc. and its officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Your use of or inability to use the Service</li>
                <li>Any errors or inaccuracies in the analysis, calculations, or recommendations</li>
                <li>The rejection of any tax resolution application by the IRS</li>
                <li>Any penalties, interest, or additional tax liability resulting from actions taken based on information from the Service</li>
                <li>Unauthorized access to your account or data</li>
                <li>Any third-party actions, products, or services</li>
              </ul>
              <p>
                You acknowledge that tax resolution outcomes are not guaranteed. The IRS has sole discretion over the acceptance or rejection of any offer, application, or request submitted. Past results do not guarantee future outcomes.
              </p>
              <p>
                By using BlastTax, you agree to assume full responsibility for your tax resolution decisions and any consequences that may arise from those decisions.
              </p>
            </div>
          </Card>
        </div>

        {/* IRS Disclaimer */}
        <div className="animate-fade-up delay-4">
          <div className="bg-surface-alt border border-border rounded-2xl p-4">
            <p className="text-xs text-muted leading-relaxed">
              BlastTax is not affiliated with, endorsed by, or sponsored by the Internal Revenue Service (IRS) or any government agency. All IRS form names, numbers, and references are used for identification purposes only. IRS guidelines and standards referenced within the platform are subject to change without notice.
            </p>
          </div>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
