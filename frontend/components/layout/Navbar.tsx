"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, clearAuth, role } = useAuthStore();
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <nav className="relative w-full z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] group-hover:scale-[1.02]">
            <Image src="/images/logoaws.png" alt="AWS Logo" width={200} height={50} className="object-contain" priority />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-base font-black text-white uppercase tracking-[0.15em] leading-tight">
              PT. AWS
            </h2>
            <p className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase mt-0.5">
              SmartTalent
            </p>
          </div>
        </Link>
        <div className="hidden lg:flex gap-8 text-[12px] font-bold uppercase tracking-widest text-white/70">
          <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
          <Link href="/solutions" className="hover:text-primary transition-colors">Solusi</Link>
          <Link href="/portfolio" className="hover:text-primary transition-colors">Portofolio</Link>
          <Link href="/news" className="hover:text-primary transition-colors">Berita</Link>
          <Link href="/careers" className="hover:text-primary transition-colors">Karir</Link>
          <Link href="/wbs" className="hover:text-primary transition-colors">WBS</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/contact" className="btn-gold !px-6 !py-2 text-[11px] uppercase tracking-widest">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}
