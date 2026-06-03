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
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="AWS Logo" width={100} height={40} className="object-contain" />
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
