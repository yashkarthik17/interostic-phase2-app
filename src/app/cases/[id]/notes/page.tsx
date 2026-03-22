"use client";
import { use, useState } from "react";
import {
  AppShell,
  ScreenHeader,
  ScreenContent,
  Card,
  Button,
} from "@/components/ui/shell";
import { sampleCases } from "@/lib/store";
import { Send, User, Shield } from "lucide-react";

interface Note {
  id: string;
  author: string;
  role: "client" | "expert";
  content: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: "1",
    author: "Sarah Mitchell",
    role: "expert",
    content:
      "Submitted your Form 656 to the IRS Brookhaven campus. Processing typically takes 2-4 weeks before assignment to an examiner. I'll update you as soon as we hear back.",
    date: "2026-03-10",
  },
  {
    id: "2",
    author: "John Smith",
    role: "client",
    content:
      "Thanks Sarah. I received a letter from the IRS acknowledging receipt of the offer. Is that normal?",
    date: "2026-03-14",
  },
  {
    id: "3",
    author: "Sarah Mitchell",
    role: "expert",
    content:
      "Yes, that's the standard acknowledgment letter. It means your OIC is officially in the system and collection activity is paused while they review. Keep that letter for your records.",
    date: "2026-03-14",
  },
  {
    id: "4",
    author: "Sarah Mitchell",
    role: "expert",
    content:
      "Quick update: Your case has been assigned to an examiner in the Memphis office. They may request additional documentation. I'll prepare everything we need ahead of time.",
    date: "2026-03-19",
  },
];

export default function CaseNotesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const caseData = sampleCases.find((c) => c.id === id) ?? sampleCases[0];
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: String(Date.now()),
      author: "John Smith",
      role: "client",
      content: newNote.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setNotes([...notes, note]);
    setNewNote("");
  };

  return (
    <AppShell hideNav>
      <ScreenHeader title={`Notes - Case #${caseData.id}`} backHref={`/cases/${caseData.id}`} />

      <ScreenContent className="space-y-3 pt-1 pb-32">
        {notes.map((note, i) => (
          <div
            key={note.id}
            className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
          >
            <Card className={note.role === "expert" ? "!bg-navy-light border-navy-light" : ""}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    note.role === "expert"
                      ? "bg-brand-green-light"
                      : "bg-surface-alt"
                  }`}
                >
                  {note.role === "expert" ? (
                    <Shield size={13} className="text-brand-green" />
                  ) : (
                    <User size={13} className="text-muted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-navy">{note.author}</p>
                  <p className="text-[0.5625rem] text-muted">
                    {note.role === "expert" ? "Tax Expert" : "You"} &middot;{" "}
                    {note.date}
                  </p>
                </div>
              </div>
              <p className="text-sm text-navy/80 leading-relaxed">
                {note.content}
              </p>
            </Card>
          </div>
        ))}
      </ScreenContent>

      {/* Fixed Add Note Form */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            placeholder="Add a note..."
            className="flex-1 px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all"
          />
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
