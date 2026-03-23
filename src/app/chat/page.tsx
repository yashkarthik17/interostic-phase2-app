"use client";
import { useState, useRef, useEffect } from "react";
import {
  AppShell,
  ScreenHeader,
  Badge,
} from "@/components/ui/shell";
import { Bot, User, Send, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "bot",
    content:
      "Hi! I'm your BlastTax AI assistant. I can help you understand your tax situation, explain IRS notices, and guide you through resolution options. What would you like to know?",
  },
  {
    id: "2",
    role: "user",
    content: "What is an Offer in Compromise?",
  },
  {
    id: "3",
    role: "bot",
    content:
      "An Offer in Compromise (OIC) is an agreement between you and the IRS that settles your tax debt for less than the full amount owed. It's one of the most powerful resolution tools available.\n\nKey points:\n\n\u2022 You can settle for as low as 10-20% of your total debt\n\u2022 The IRS considers your ability to pay, income, expenses, and asset equity\n\u2022 There's a $205 application fee (waived for low-income applicants)\n\u2022 Processing typically takes 6-12 months\n\u2022 You must be current on all filing requirements\n\nBased on your profile, an OIC could reduce your $47,250 debt to approximately $8,500. Would you like me to walk you through the eligibility requirements?",
  },
];

const quickPrompts = [
  "What options do I have?",
  "Explain my transcript",
  "Penalty relief options",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          "Thanks for your question! In a production environment, this would be answered by our AI model with personalized guidance based on your tax profile and case history. For now, I recommend exploring the Resolution Analysis tool for detailed options.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  }

  function handlePrompt(prompt: string) {
    setInput(prompt);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AppShell hideNav>
      <ScreenHeader
        title="AI Assistant"
        backHref="/dashboard"
        action={
          <Badge variant="success">
            <Sparkles size={10} />
            AI-Powered
          </Badge>
        }
      />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-surface-alt"
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 animate-fade-up ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {msg.role === "bot" && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green-light shrink-0 mt-0.5 shadow-[var(--shadow-card)]">
                <Bot size={16} className="text-brand-green" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-[var(--shadow-card)] ${
                msg.role === "user"
                  ? "bg-brand-blue text-white rounded-br-md"
                  : "bg-white text-navy rounded-bl-md border border-border"
              }`}
            >
              {msg.content.split("\n").map((line, li) => (
                <p key={li} className={li > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
            {msg.role === "user" && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue-50 shrink-0 mt-0.5 shadow-[var(--shadow-card)]">
                <User size={16} className="text-brand-blue" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick prompts */}
      <div className="px-4 py-2 bg-white border-t border-border shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePrompt(prompt)}
              className="whitespace-nowrap px-3.5 py-1.5 bg-white border border-border rounded-full text-xs font-semibold text-muted shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:border-brand-green hover:text-brand-green transition-all duration-200 shrink-0 active:scale-[0.97]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar — sticky at bottom with shadow */}
      <div className="flex items-center gap-2 px-4 pt-2 pb-5 bg-white shrink-0"
        style={{ boxShadow: "0 -4px 12px rgba(10,22,40,0.04)" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your taxes..."
          className="flex-1 px-4 py-3 bg-surface-alt border-[1.5px] border-border rounded-full text-sm font-medium text-navy placeholder:text-placeholder focus:border-brand-green focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand-green/10 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 active:scale-[0.93] ${
            input.trim()
              ? "bg-brand-green text-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:brightness-110"
              : "bg-border text-placeholder"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </AppShell>
  );
}
