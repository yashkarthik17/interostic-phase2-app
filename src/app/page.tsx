"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => router.replace("/login"), 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0A1628 0%, #0F1F3D 40%, #132B52 70%, #0A1628 100%)" }}>
      {/* Subtle radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(30,123,200,0.12) 0%, rgba(30,123,200,0.04) 40%, transparent 70%)" }} />

      {/* Background swoosh decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[2px] border-brand-blue/15" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[2px] border-brand-red/10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full border-[2px] border-brand-green/8" />

      <div
        className={`flex flex-col items-center gap-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Logo */}
        <Image src="/logo.png" alt="BlastTax Debt" width={280} height={120} className="w-64 sm:w-72 h-auto" priority />

        {/* Tagline */}
        <p className="text-lg font-medium text-white/55 tracking-wide">
          Resolve Your Tax Debt
        </p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-brand-blue/60 animate-pulse-soft"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}
