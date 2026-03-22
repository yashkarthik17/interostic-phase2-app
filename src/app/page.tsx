"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => router.replace("/login"), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh max-w-md mx-auto bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-green/10 rounded-full blur-[100px]" />

      <div
        className={`flex flex-col items-center gap-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Shield icon with pulse */}
        <div className="relative">
          <div className="absolute inset-0 bg-brand-green/20 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
          <div className="relative flex items-center justify-center w-20 h-20 bg-brand-green/15 rounded-full border border-brand-green/30">
            <Shield size={36} className="text-brand-green" strokeWidth={2} />
          </div>
        </div>

        {/* Logo text */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Blast<span className="text-brand-green">Tax</span>
          </h1>
          <p className="mt-2 text-sm font-medium text-white/50 tracking-wide">
            Resolve Your Tax Debt
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-green/60"
            style={{
              animation: "pulse 1s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
