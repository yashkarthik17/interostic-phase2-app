"use client";
import { useState } from "react";
import {
  AppShell,
  ScreenContent,
} from "@/components/ui/shell";
import {
  ChevronLeft,
  Star,
  Paperclip,
  Send,
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: number;
  sender: "expert" | "user";
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "expert",
    text: "Hi John, I\u2019ve completed my initial review of your case. Your OIC looks strong \u2014 the RCP calculation supports an $8,500 offer against your $47,250 debt.",
    time: "10:15 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "That\u2019s great to hear! What are the chances the IRS will accept it?",
    time: "10:18 AM",
  },
  {
    id: 3,
    sender: "expert",
    text: "Based on your financials, I\u2019d say we have a strong case. Your RCP is well below your total debt, and you have a clean compliance record. The key is making sure we document everything thoroughly.",
    time: "10:20 AM",
  },
  {
    id: 4,
    sender: "expert",
    text: "I still need your bank statements and pay stubs from the last 3 months to complete Form 433-A(OIC). Can you upload those today?",
    time: "10:21 AM",
  },
  {
    id: 5,
    sender: "user",
    text: "Yes, I can get those from my bank\u2019s website. Should I include all accounts?",
    time: "10:24 AM",
  },
  {
    id: 6,
    sender: "expert",
    text: "Yes, include all checking, savings, and investment accounts. The IRS wants a complete financial picture. Don\u2019t worry \u2014 we\u2019ll present everything in the most favorable light while staying fully compliant.",
    time: "10:26 AM",
  },
];

export default function ExpertChatPage() {
  const [messages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  return (
    <AppShell hideNav>
      {/* Custom chat header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-border shrink-0">
        <Link
          href="/expert/workspace"
          className="flex items-center justify-center w-9 h-9 rounded-xl text-muted hover:text-navy hover:bg-surface-alt transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white font-bold text-sm shrink-0">
              MC
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-green rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-navy">Michael Chen</p>
              <span className="px-1.5 py-0.5 bg-navy-light rounded text-[0.5625rem] font-bold text-navy">
                EA
              </span>
            </div>
            <p className="text-[0.625rem] font-semibold text-brand-green">
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="text-warning fill-warning" />
          <span className="text-xs font-bold text-navy">4.9</span>
        </div>
      </header>

      {/* Messages */}
      <ScreenContent className="py-4 space-y-3 bg-surface-alt">
        {/* Date separator */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex-1 h-px bg-border-strong" />
          <span className="text-[0.625rem] font-semibold text-placeholder">
            Today
          </span>
          <div className="flex-1 h-px bg-border-strong" />
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-navy text-white rounded-br-md"
                  : "bg-white border border-border text-navy rounded-bl-md"
              }`}
            >
              <p className="text-[0.8125rem] leading-relaxed">{msg.text}</p>
              <p
                className={`text-[0.5625rem] font-semibold mt-1.5 ${
                  msg.sender === "user" ? "text-white/40" : "text-placeholder"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </ScreenContent>

      {/* Input Bar */}
      <div className="px-4 py-3 bg-white border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-muted hover:text-navy hover:bg-surface-alt transition-colors shrink-0">
            <Paperclip size={18} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-full text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-blue focus:outline-none focus:ring-[3px] focus:ring-brand-blue/10 transition-all"
            />
          </div>
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shrink-0 ${
              input.trim()
                ? "bg-brand-green text-white shadow-sm active:scale-95"
                : "bg-border text-placeholder"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
