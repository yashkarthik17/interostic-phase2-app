"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { AlertTriangle, Trash2, XCircle, FileText, MessageCircle, BarChart3, Shield } from "lucide-react";

const deletedItems = [
  { icon: BarChart3, label: "All tax analyses and reports" },
  { icon: FileText, label: "Uploaded documents and transcripts" },
  { icon: MessageCircle, label: "Chat history and AI conversations" },
  { icon: Shield, label: "Case data and resolution records" },
];

export default function DeleteAccountPage() {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const isConfirmed = confirmation === "DELETE";

  return (
    <AppShell hideNav>
      <ScreenHeader title="Delete Account" backHref="/settings" />

      <ScreenContent className="space-y-4 pt-2">
        {/* Warning Card */}
        <div className="animate-fade-up delay-1">
          <div className="rounded-2xl border-[1.5px] border-brand-red overflow-hidden shadow-[var(--shadow-glow-red)]">
            <div className="bg-gradient-to-r from-brand-red to-brand-red/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Danger Zone</h3>
                  <p className="text-xs text-white/70">This action cannot be undone</p>
                </div>
              </div>
            </div>
            <div className="bg-brand-red-light px-5 py-4">
              <p className="text-sm text-brand-red leading-relaxed font-medium">
                Deleting your account will permanently remove all your data, including tax analyses, documents, case files, and chat history. This action is irreversible.
              </p>
            </div>
          </div>
        </div>

        {/* What Will Be Deleted */}
        <div className="animate-fade-up delay-2">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-3">
              What will be deleted
            </p>
            <div className="space-y-3">
              {deletedItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-danger-light">
                    <XCircle size={14} className="text-danger" />
                  </div>
                  <span className="text-sm text-navy/80">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Confirmation Input */}
        <div className="animate-fade-up delay-3">
          <Card>
            <p className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1.5">
              Confirm Deletion
            </p>
            <p className="text-xs text-muted mb-3">
              Type <span className="font-bold text-navy">DELETE</span> to confirm you want to permanently delete your account.
            </p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="w-full px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-xl text-sm font-mono font-bold text-navy placeholder:text-placeholder placeholder:font-normal focus:border-danger focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-danger/10 transition-all duration-150"
            />
          </Card>
        </div>

        {/* Actions */}
        <div className="animate-fade-up delay-4 space-y-3">
          <button
            type="button"
            disabled={!isConfirmed}
            onClick={() => router.push("/login")}
            className={`flex items-center justify-center gap-2 w-full font-bold text-[0.9375rem] rounded-full px-7 py-4 transition-all duration-200 ${
              isConfirmed
                ? "bg-danger text-white shadow-sm hover:opacity-90 active:scale-[0.97]"
                : "bg-danger/30 text-white/60 pointer-events-none"
            }`}
          >
            <Trash2 size={16} />
            Delete My Account
          </button>
          <Button href="/settings" variant="ghost">
            Cancel
          </Button>
        </div>
      </ScreenContent>
    </AppShell>
  );
}
