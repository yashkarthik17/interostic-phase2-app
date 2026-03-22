"use client";
import { useState } from "react";
import { AppShell, ScreenHeader, ScreenContent, Card, Button, IconCircle, FormInput } from "@/components/ui/shell";
import { Mail, Phone, MessageCircle, Clock, Upload, Send, CheckCircle2 } from "lucide-react";

const channels = [
  {
    icon: Mail,
    color: "blue" as const,
    title: "Email Support",
    subtitle: "support@blasttax.com",
    detail: "Response within 24 hours",
  },
  {
    icon: Phone,
    color: "green" as const,
    title: "Phone Support",
    subtitle: "(800) 555-0199",
    detail: "Mon-Fri, 9am-5pm PST",
  },
  {
    icon: MessageCircle,
    color: "violet" as const,
    title: "Live Chat",
    subtitle: "Chat with our team",
    detail: "Available during business hours",
  },
];

const ticketCategories = [
  "General Question",
  "Technical Issue",
  "Billing & Subscription",
  "Tax Resolution Help",
  "Account Access",
  "Feature Request",
  "Other",
];

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (subject && category && description) {
      setSubmitted(true);
    }
  };

  return (
    <AppShell>
      <ScreenHeader title="Support" backHref="/dashboard" />
      <ScreenContent className="space-y-4 pt-2">
        {/* Support Channels */}
        <div className="animate-fade-up delay-1">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Contact Us
          </p>
          <div className="space-y-2.5">
            {channels.map((ch) => (
              <Card key={ch.title} className="!p-4">
                <div className="flex items-center gap-3.5">
                  <IconCircle icon={ch.icon} color={ch.color} size={42} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy">{ch.title}</p>
                    <p className="text-xs font-semibold text-brand-blue">{ch.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Clock size={12} className="text-placeholder" />
                    <span className="text-[0.625rem] font-semibold text-placeholder">{ch.detail}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Submit a Ticket */}
        <div className="animate-fade-up delay-2">
          <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-2.5">
            Submit a Ticket
          </p>

          {submitted ? (
            <Card>
              <div className="text-center py-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-green-light mx-auto mb-3">
                  <CheckCircle2 size={28} className="text-brand-green" />
                </div>
                <p className="text-lg font-bold text-navy mb-1">Ticket Submitted</p>
                <p className="text-sm text-muted">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => {
                    setSubmitted(false);
                    setSubject("");
                    setCategory("");
                    setDescription("");
                  }}
                >
                  Submit Another
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="space-y-4">
              <FormInput
                label="Subject"
                placeholder="Brief summary of your issue"
                value={subject}
                onChange={setSubject}
                required
              />

              <div>
                <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150 appearance-none"
                >
                  <option value="">Select a category</option>
                  {ticketCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  className="w-full px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all duration-150 resize-none"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-border-strong text-xs font-semibold text-muted hover:border-brand-blue hover:text-brand-blue transition-colors">
                <Upload size={14} />
                Attach Files
              </button>

              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!subject || !category || !description}
              >
                <Send size={16} />
                Send Message
              </Button>
            </Card>
          )}
        </div>
      </ScreenContent>
    </AppShell>
  );
}
