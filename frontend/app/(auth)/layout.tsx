import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <header className="p-8 relative z-10">
        <Link href="/" className="flex items-center justify-center lg:justify-start">
          <Image src="/images/logo.png" alt="Logo" width={150} height={50} className="object-contain" />
        </Link>
      </header>

      {/* Content wrapper */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-white/20 text-xs uppercase tracking-[0.2em] relative z-10">
        © 2026 AWS SmartTalent. One System for All HR Needs.
      </footer>
    </div>
  );
}
